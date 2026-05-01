# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio served by GitHub Pages as a *user site* (`nithin-kumar.github.io`). There is no build step, no package manager, no tests, and no server-side code — pushing to the default branch is the deploy.

## Local preview

Any static HTTP server from the repo root works, e.g.:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Do **not** open `index.html` via `file://` — asset paths are absolute (`/static/...`), so they 404 unless served from a root.

## Architecture notes that aren't obvious from the files

- **Styling is one hand-written stylesheet: `static/css/terminal.css`.** It uses CSS custom properties (`--bg`, `--accent`, etc.) for theming. The HTML still carries the old HTML5 UP / Skel grid classes (`4u`, `8u`, `12u`, `wrapper-styleN`, `box-styleN`) — `terminal.css` re-implements them with CSS Grid, including the digit-leading selectors (`.\34 u`, `.\38 u`, `.\31 2u`). The legacy `static/css/style*.css`, `skel-noscript.css`, and `ie*.css` files are no longer loaded from `index.html` but are kept on disk as a backup.
- **Skel.js and `config.js` are no longer loaded.** Their two responsibilities have moved: responsive layout → CSS Grid in `terminal.css`; in-page anchor smooth-scroll → the second handler in `static/js/custom.js`. Only `jquery.min.js` and `custom.js` are scripted in.
- **Absolute asset paths assume root deployment.** Every `<link>`, `<script>`, and image starts with `/static/...`. This is fine for a GitHub user site (served at the domain root) but will break if the site is ever moved under a subpath.
- **Images use lazy `data-src`, not `src`.** `static/js/custom.js` preloads `data-src` and swaps it to `src`. **New `<img>` tags must use `data-src=` or they will not render** — there is no `<noscript>` fallback for images.
- **Content is hardcoded in `index.html`.** No templating, no Jekyll, no posts collection. Adding a project means editing the portfolio `<article class="box box-style2">` blocks directly. The CV link points to a static PDF at `static/resume_nit_tex.pdf`.

## Deploy

Push to the default branch on GitHub. GitHub Pages serves the repo root; there is no `_config.yml` and no Jekyll processing to worry about (no `.nojekyll` file either, but the repo also has no underscore-prefixed paths that Jekyll would skip).
