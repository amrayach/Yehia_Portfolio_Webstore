# Yehia Portfolio Webstore

Minimal Astro scaffold configured for:
- TypeScript
- Tailwind (CSS variable token approach)
- MDX support
- Cloudflare Pages adapter

## Local development

```bash
pnpm install
pnpm dev
```

## Checks and build

```bash
pnpm lint
pnpm test
pnpm build
pnpm preview
```

## Cloudflare Pages settings

- Build command: `pnpm build`
- Output directory: `dist`
- Node version: active LTS (set `NODE_VERSION` in Pages if you need to pin)
- Build-time env vars:
  - `PUBLIC_SITE_URL=https://<your-production-domain>`
  - `PUBLIC_INQUIRY_EMAIL=hello@<your-production-domain>`
  - `PUBLIC_INSTAGRAM_HANDLE=<your_instagram_handle>`
