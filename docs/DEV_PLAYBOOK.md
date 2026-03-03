# Development Playbook

## Session Bootstrap (Always)
Read these files first in every Codex session:
1. `docs/PROJECT_CONTEXT.md`
2. `docs/ROUTES.md`
3. `docs/UI_RULES.md`
4. `docs/CONTENT_MODEL.md`
5. `docs/DEV_PLAYBOOK.md`

## Stack Baseline
- Framework: Astro + TypeScript.
- Package manager: `pnpm` (default).
- Deployment: Cloudflare Pages (free plan) via GitHub.
- Build output: `dist/`.

## Local Commands
```bash
# install
pnpm install

# local dev
pnpm dev

# type/content/build checks
pnpm astro check
pnpm build

# local preview of production build
pnpm preview
```

If `pnpm` is unavailable:
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Branch Naming
- Features: `feat/<scope>-<short-desc>`
- Fixes: `fix/<scope>-<short-desc>`
- Docs-only: `docs/<scope>-<short-desc>`

Examples:
- `feat/routes-editorial-frames`
- `fix/contact-form-validation`
- `docs/context-reset-files`

## Build and Deployment Notes (Cloudflare Pages)
- Connect GitHub repository to Cloudflare Pages.
- Production branch: `main`.
- Build command: `pnpm build`
- Output directory: `dist`
- Node version: use active LTS in Pages settings (assume LTS baseline; set `NODE_VERSION` if your Pages project is pinned).
- Astro deployment mode is static-first: `output: static`, `outDir: dist`, `@astrojs/cloudflare` adapter.
- Set `PUBLIC_SITE_URL` in Pages environment variables so canonical, OpenGraph, and sitemap URLs resolve to the production domain.
- Keep environment vars minimal for MVP (inquiry-only architecture).

## Pre-Merge Checklist
- All updated docs remain consistent with non-negotiables.
- No-scroll behavior unchanged on Home and Editorial routes.
- Shop remains inquiry-only (no active checkout UI/code path).
- Mobile and desktop layouts verified.
- No broken internal links or missing assets.

## Release Checklist
- Build succeeds in CI/local.
- Confirm Cloudflare preview deploy renders core routes.
- Smoke test:
  - `/`
  - `/editorial`
  - `/shop`
  - `/text`
  - `/work`
  - `/contact`
- Confirm inquiry success route works after test submission.

## Deployment Guardrails
- Prioritize static pages and content collections over runtime features.
- Avoid introducing server-side dependencies unless explicitly approved.
- Add new third-party integrations only with clear operational ownership.

## Future Phase Notes
- Payment phase can introduce stablecoin checkout (e.g., Triple-A) later.
- If inquiry volume grows, move inquiry storage to managed DB/service.
- If frequent content updates are required, introduce a CMS in a controlled phase.
