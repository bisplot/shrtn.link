#!/usr/bin/env python3
"""Serve the Shrtn website and its pre-launch API on loopback."""

import argparse
from contextlib import closing
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import mimetypes
import os
from pathlib import Path
import re
import shutil
import sqlite3
from threading import Lock
import time
from urllib.parse import unquote, urlsplit

SITE_ORIGIN = "https://shrtn.link"
FORM_VERSION = "2026-11-11-v1"
INTENTS = {"free", "premium", "premium-unverified", "subdomain", "signin"}
EMAIL = re.compile(r"[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+")
PING_ID = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}")
MAX_BODY = 4096
SCHEMA = """
CREATE TABLE IF NOT EXISTS subscribers (
    email TEXT NOT NULL,
    intent TEXT NOT NULL,
    requested_at TEXT NOT NULL,
    form_version TEXT NOT NULL,
    privacy_version TEXT NOT NULL,
    marketing_requested INTEGER NOT NULL CHECK (marketing_requested IN (0, 1)),
    PRIMARY KEY (email, intent)
);
CREATE TABLE IF NOT EXISTS pings (
    id TEXT PRIMARY KEY NOT NULL,
    received_at TEXT NOT NULL
);
"""


def timestamp():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class ApiServer(ThreadingHTTPServer):
    def __init__(self, port, database, site, privacy_version, privacy_url):
        self.database = database
        self.site = site
        self.privacy_version = privacy_version
        self.privacy_url = privacy_url
        self.lock = Lock()
        self.limits = {}
        super().__init__(("127.0.0.1", port), Handler)

    def allow_write(self, path):
        # The reverse proxy can enforce per-client limits when it is configured.
        minute = int(time.monotonic() // 60)
        with self.lock:
            window, count = self.limits.get(path, (minute, 0))
            if window != minute:
                count = 0
            if count >= 60:
                return False
            self.limits[path] = (minute, count + 1)
            return True


class Handler(BaseHTTPRequestHandler):
    timeout = 5
    server_version = "Shrtn"
    sys_version = ""

    def log_message(self, *_args):
        # Do not log visitor IPs or URLs at the application layer.
        pass

    def origin_allowed(self):
        return self.headers.get_all("Origin") == [SITE_ORIGIN]

    def respond(self, status, body=None):
        payload = json.dumps(body, ensure_ascii=False).encode("utf-8") if body is not None else b""
        self.send_response(status)
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Vary", "Origin")
        if self.origin_allowed():
            self.send_header("Access-Control-Allow-Origin", SITE_ORIGIN)
        if status == 204:
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
        else:
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        if payload:
            self.wfile.write(payload)

    def error(self, status, message):
        self.respond(status, {"error": message})

    def do_OPTIONS(self):
        if self.path not in {"/api/subscribe", "/api/ping"}:
            return self.error(404, "Endpoint non disponibile.")
        if not self.origin_allowed():
            return self.error(403, "Origine non consentita.")
        self.respond(204)

    def serve_page(self, head=False):
        if not self.server.site:
            return self.error(404, "Endpoint non disponibile.")
        path = unquote(self.path.partition("?")[0]).lstrip("/")
        candidate = (self.server.site / path).resolve()
        if candidate.is_dir():
            candidate = candidate / "index.html"
        if not candidate.is_relative_to(self.server.site) or not candidate.is_file():
            return self.error(404, "Pagina non trovata.")
        if candidate.suffix not in {".html", ".css", ".js", ".json", ".svg", ".woff2", ".txt"}:
            return self.error(404, "Pagina non trovata.")
        content_type = mimetypes.guess_type(candidate)[0] or "application/octet-stream"
        with candidate.open("rb") as source:
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(candidate.stat().st_size))
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            if not head:
                shutil.copyfileobj(source, self.wfile)

    def do_HEAD(self):
        self.serve_page(head=True)

    def do_GET(self):
        if self.path == "/api/config":
            return self.respond(200, {"privacyVersion": self.server.privacy_version,
                                      "privacyUrl": self.server.privacy_url})
        if self.path == "/healthz":
            return self.respond(200, {"ok": True})
        if self.path != "/api/ping":
            return self.serve_page()
        try:
            with closing(sqlite3.connect(self.server.database)) as db:
                count = db.execute("SELECT count(*) FROM pings").fetchone()[0]
        except sqlite3.Error:
            return self.error(503, "Conteggio al momento non disponibile.")
        self.respond(200, {"count": count})

    def read_json(self):
        if self.headers.get_content_type() != "application/json":
            self.error(415, "Formato non supportato.")
            return None
        lengths = self.headers.get_all("Content-Length", [])
        if self.headers.get("Transfer-Encoding") or len(lengths) != 1 or not re.fullmatch(r"[0-9]{1,10}", lengths[0]):
            self.error(400, "Richiesta non valida.")
            return None
        length = int(lengths[0])
        if not 0 < length <= MAX_BODY:
            self.error(413, "Richiesta troppo grande.")
            return None
        try:
            data = json.loads(self.rfile.read(length))
            if isinstance(data, dict):
                return data
        except (ValueError, RecursionError):
            pass
        except TimeoutError:
            self.error(408, "Richiesta scaduta.")
            return None
        self.error(400, "Richiesta non valida.")
        return None

    def do_POST(self):
        if self.path not in {"/api/subscribe", "/api/ping"}:
            return self.error(404, "Endpoint non disponibile.")
        if not self.origin_allowed():
            return self.error(403, "Origine non consentita.")
        if self.path == "/api/subscribe" and not self.server.privacy_version:
            return self.error(503, "Le iscrizioni non sono ancora aperte.")
        if not self.server.allow_write(self.path):
            return self.error(429, "Troppe richieste. Riprova tra un minuto.")
        data = self.read_json()
        if data is None:
            return
        try:
            if self.path == "/api/ping":
                self.save_ping(data)
            else:
                self.save_subscriber(data)
        except sqlite3.Error:
            self.error(503, "Salvataggio non disponibile. Riprova tra poco.")

    def save_ping(self, data):
        ping_id = data.get("id")
        if not isinstance(ping_id, str) or not PING_ID.fullmatch(ping_id):
            return self.error(400, "Ping non valido.")
        with closing(sqlite3.connect(self.server.database)) as db, db:
            db.execute("INSERT INTO pings VALUES (?, ?) ON CONFLICT(id) DO NOTHING", (ping_id, timestamp()))
            count = db.execute("SELECT count(*) FROM pings").fetchone()[0]
        self.respond(200, {"count": count})

    def save_subscriber(self, data):
        email = data.get("email")
        intent = data.get("intent")
        marketing = data.get("marketing")
        email = email.strip() if isinstance(email, str) else ""
        if (len(email) > 254 or not EMAIL.fullmatch(email) or not isinstance(intent, str)
                or intent not in INTENTS or data.get("privacy") is not True
                or type(marketing) is not bool or data.get("formVersion") != FORM_VERSION
                or data.get("privacyVersion") != self.server.privacy_version):
            return self.error(400, "Controlla l’email e conferma di aver letto l’informativa corrente.")
        with closing(sqlite3.connect(self.server.database)) as db, db:
            # A second unauthenticated submission cannot change an earlier consent choice.
            db.execute(
                """INSERT INTO subscribers VALUES (?, ?, ?, ?, ?, ?)
                   ON CONFLICT(email, intent) DO NOTHING""",
                (email.lower(), intent, timestamp(), FORM_VERSION, self.server.privacy_version, marketing),
            )
        self.respond(200, {"saved": True})


def initialize(database):
    database.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    if database.parent.stat().st_mode & 0o077:
        raise SystemExit("The database directory must be private (mode 0700).")
    if database.is_symlink() or (database.exists() and database.stat().st_mode & 0o077):
        raise SystemExit("The database must be a private file.")
    with closing(sqlite3.connect(database)) as db, db:
        db.execute("PRAGMA journal_mode=WAL")
        db.executescript(SCHEMA)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", default=4181, type=int)
    parser.add_argument("--site", type=Path, help="Serve the generated website from this directory.")
    parser.add_argument("--database", type=Path, default=Path(__file__).resolve().parent / "data" / "shrtn.sqlite3")
    parser.add_argument("--counts", action="store_true", help="Print aggregate counts from an existing database.")
    options = parser.parse_args()
    os.umask(0o077)
    if options.counts:
        with closing(sqlite3.connect(options.database.resolve().as_uri() + "?mode=ro", uri=True)) as db:
            subscribers = db.execute("SELECT count(DISTINCT email) FROM subscribers").fetchone()[0]
            pings = db.execute("SELECT count(*) FROM pings").fetchone()[0]
        print(json.dumps({"subscribers": subscribers, "pings": pings}))
        return
    site = options.site.resolve() if options.site else None
    if site and not (site / "index.html").is_file():
        raise SystemExit("Build the website before serving it.")
    privacy_version = os.environ.get("SHRTN_PRIVACY_VERSION")
    privacy_url = os.environ.get("SHRTN_PRIVACY_URL")
    if privacy_version or privacy_url:
        url = urlsplit(privacy_url or "")
        if not privacy_version or url.scheme != "https" or not url.hostname or url.username or url.password:
            raise SystemExit("Set both the approved HTTPS privacy URL and its version.")
    initialize(options.database)
    with ApiServer(options.port, options.database, site, privacy_version, privacy_url) as server:
        print(f"Listening on http://127.0.0.1:{server.server_port}", flush=True)
        server.serve_forever()


if __name__ == "__main__":
    main()
