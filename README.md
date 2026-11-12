# Shrtn website

This repository contains the pre-launch site, the existing short-link and QR
pages, and the signup and ping API. The strategy, economic model and previous
tracking templates live in
[ten_m](https://github.com/bisplot/ten_m/tree/master/strategy/venture-building/shrtn).

Run `npm run validate` and `npm run build` with Node.js 20 or later. Serve the
generated site and API together with Python 3.12:

```sh
python3 apps/api/server.py --site dist --port 4182
```

The service binds to `127.0.0.1`. Set `--database` to the persistent SQLite
database path on the VPS. Only the generated website directory is served. Run
`python3 apps/api/server.py --database /srv/shrtn/api/data/shrtn.sqlite3 --counts`
for aggregate reporting.

Pings use `/api/ping`. The launch signup form becomes available once
`SHRTN_PRIVACY_URL` and `SHRTN_PRIVACY_VERSION` identify the approved notice.
Email delivery and confirmation are separate. The web origin for writes is
`https://shrtn.link`.

The Bisplot VPS stages releases within `/srv/shrtn`. Public hosting requires a
reverse proxy and TLS configuration, and a DNS cutover from the current host.

## Architecture

[`docs/architecture.md`](docs/architecture.md) is the draft target architecture for
`shrtn.link` and `shrtnfree.link`, every tier included (12 November 2026). Its §11
lists the decisions for the session with Davide and Matteo; nothing in it is decided
yet.
