# Public Assets

This directory contains static assets that are served at the root URL. Files here are copied as-is to the build output and are not processed by the bundler.

## Folder structure (production-grade)

- **`/logo/`** – Brand assets (app logo used in side panel, top nav fallback, etc.)
  - `deep-sync-logo.jpg` – Main Deep Sync logo (side panel, above “Home”)
  - Prefer SVG or PNG for scalability; JPG is supported.
- Other static assets (favicons, manifests, etc.) can live at the root of `public/` or in subfolders such as `/images/`, `/fonts/` as needed.

## Logo usage

- **Side panel:** The logo in `public/logo/deep-sync-logo.jpg` is shown in the gap above “Home” in the side panel. Reference it as `/logo/deep-sync-logo.jpg`.
- **Top navigation:** Top nav looks for `logo.svg` or `logo.png` in `public/` for the main header; if missing, it falls back to the text “Deep Sync Cloud Platform”.

Best practice: Keep logos and other static brand assets under `public/logo/` (or `public/images/logo/`) so paths are consistent and easy to change per environment.
