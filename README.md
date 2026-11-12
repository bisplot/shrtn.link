# Shrtn website

This repository contains the pre-launch site, the existing short-link and QR
pages, and the signup and ping API. The strategy, economic model and previous
tracking templates live in
[ten_m](https://github.com/bisplot/ten_m/tree/master/strategy/venture-building/shrtn).

GitHub Actions publishes the static website to GitHub Pages from `main`. The
Pages build includes the link demo and legacy routes. The signup and ping controls
are enabled by the server build once the API is connected.

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
