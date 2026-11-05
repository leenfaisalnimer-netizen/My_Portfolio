# Deploying the portfolio

## How it works

| Branch | Role |
|---|---|
| `claude/busy-mayer-dyvdb3` | Working branch. Changes land here first for review. Nothing here is public. |
| `main` | Live branch. Every push to `main` publishes the site automatically. |

`.github/workflows/deploy-pages.yml` publishes only the public site files:
`index.html`, `style.css`, `script.js` and `assets/` (plus `CNAME` if present).
`BUILD-PLAN.md`, `DEPLOY.md` and `Media/` are not published.

**Temporary URL:** https://leenfaisalnimer-netizen.github.io/My_Portfolio/

## Update workflow

1. Changes are made on the working branch.
2. Leen reviews and approves.
3. The working branch is merged into `main`, which deploys automatically.
4. The live URL is tested and confirmed.

## One-time setup (GitHub)

Repository → **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Connecting a custom domain later (no rebuild)

All asset paths are relative, so the site works on any domain or subpath.

1. Buy the domain.
2. Repository → **Settings → Pages → Custom domain** → enter it (e.g. `leennimer.com`) and save.
3. At the domain's DNS provider add:
   - Apex domain: four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: a `CNAME` record to `leenfaisalnimer-netizen.github.io`
4. Tick **Enforce HTTPS** once the certificate is issued.
5. In `index.html`, replace `https://leenfaisalnimer-netizen.github.io/My_Portfolio/` in the three social-preview tags (`og:url`, `og:image`, `twitter:image`) with the new domain.

If the domain is later hosted on Hostinger instead, upload the same four items
(`index.html`, `style.css`, `script.js`, `assets/`) to `public_html`; nothing else changes.

## Adding the generated videos later

Put the encoded clips and posters in `assets/video/` (names and ffmpeg steps in
`BUILD-PLAN.md` §5.5), then set `data-ready="true"` on the three `data-scene`
blocks in `index.html`. Until then the designed placeholders stay in place.
