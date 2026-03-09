# Task: Initialize Astro + TS + Tailwind + MDX for Cloudflare Pages

## Plan
- [x] Read project context and route/UI constraints (`docs/PROJECT_CONTEXT.md`, `docs/ROUTES.md`, `docs/UI_RULES.md`, `docs/CONTENT_MODEL.md`, `docs/DEV_PLAYBOOK.md`).
- [x] Define minimal scaffold scope and exact file changes for Astro + TypeScript + Tailwind + MDX + Cloudflare Pages adapter.
- [x] Create project scaffold files and required folder skeleton.
- [x] Configure Tailwind tokens via CSS variables and wire global styles.
- [x] Validate build and checks with `pnpm astro check` and `pnpm build`.
- [x] Document review results and run commands.

## Progress Notes
- Plan established from repository constraints and docs.
- Added Astro scaffold and configuration files.
- Added Cloudflare adapter + MDX + Tailwind dependencies and scripts.
- Added `src/layouts`, `src/components`, `src/pages`, `src/content`, `public/assets`, and `public/pdfs` skeleton paths.
- Added no-scroll placeholders for `/` and `/editorial`.
- Updated README with local development and build commands.

## Verification
- [x] `pnpm install` (via dependency add operations)
- [x] `pnpm astro check`
- [x] `pnpm build`
- [x] Confirm `/` and `/editorial` enforce `100vh` and `overflow: hidden` (via page/layout classes)

## Review
- Build and checks are passing with Astro + TypeScript + Tailwind + MDX + Cloudflare adapter.
- Non-blocking warnings remain because content directories are intentionally empty skeletons (no `.md/.mdx` entries yet).
- Cloudflare adapter emits an informational note about optional `SESSION` KV binding for runtime sessions; this does not block static prerender/build.

---

# Task: Integrate rotating 3D homepage logo from `mashallah_avav_logo.glb`

## Plan
- [x] Add a dedicated Three.js homepage logo component that loads `/assets/mashallah_avav_logo.glb`.
- [x] Replace homepage placeholder content with the rotating logo stage while preserving no-scroll behavior.
- [x] Keep only `.glb` in public assets and move/remove Blender source artifacts from `public/assets`.
- [x] Add ignore protection for Blender backup files (`*.blend1`).
- [x] Run checks and document verification outcomes.

## Progress Notes
- Added `src/components/HomeLogoScene.astro` with custom scene setup, GLB loading, auto-rotation, pointer tilt, reduced-motion handling, resize handling, and cleanup.
- Updated `src/pages/index.astro` to use a centered 3D stage + concise hero copy while preserving no-scroll.
- Moved `public/assets/mashallah_avav_logo.blend` to `Refrence_Material/logo/mashallah_avav_logo.blend`.
- Removed `public/assets/mashallah_avav_logo.blend1` from public assets.
- Added `*.blend1` to `.gitignore`.
- npm registry was unreachable in this environment, so Three.js runtime files were vendored locally under `public/vendor/three` and imported from local paths (`/vendor/three/...`) with no CDN dependency.
- Added `DRACOLoader` + local decoder assets under `public/vendor/three/draco` and wired `GLTFLoader.setDRACOLoader(...)` so Draco-compressed GLB files load at runtime.

## Verification
- [x] `pnpm --store-dir /home/amay/.local/share/pnpm/store/v10 install --offline`
- [x] `pnpm astro check`
- [x] `pnpm build`
- [x] Served `dist` via `python3 -m http.server` and confirmed homepage output includes the 3D scene markup (`data-home-logo-scene`, `/assets/mashallah_avav_logo.glb`) and no-scroll shell classes (`h-screen overflow-hidden`)

## Review
- Homepage now includes the rotating 3D GLB scene and keeps route-level no-scroll behavior.
- Public assets now expose only the `.glb`; Blender source artifacts were removed from public delivery.
- Validation passed for type/build and static output smoke checks.

---

# Task: Implement static editorial system (`/editorial` + `/editorial/[piece]/[chapter]`)

## Plan
- [x] Read editorial/content/UI constraints and inspect current route/content implementation.
- [x] Define editorial content collection schema and grouped data helpers.
- [x] Replace `/editorial` placeholder with no-scroll editorial piece index cards.
- [x] Add generated chapter routes at `/editorial/[piece]/[chapter]` with left rail + content panel.
- [x] Add minimal keyboard navigation (`ArrowLeft`/`ArrowRight`) and prev/next links.
- [x] Add one demo piece with 3 MDX chapters under `src/content/editorial/<piece>/`.
- [x] Update docs contracts (`docs/ROUTES.md`, `docs/CONTENT_MODEL.md`) to reflect the new editorial route/content shape.
- [x] Run `pnpm build` and capture verification + review notes.

## Progress Notes
- Plan created from approved implementation spec and repository constraints.
- Added an editorial content collection schema in `src/content.config.ts` with frontmatter validation for chapter metadata and publish state.
- Added `src/lib/editorial.ts` helpers to parse IDs (`<piece>/<chapter>`), build chapter URLs, and group/sort pieces and chapters.
- Replaced `src/pages/editorial.astro` placeholder with a no-scroll editorial piece card index that links to each piece's first chapter.
- Added `src/pages/editorial/[piece]/[chapter].astro` static route generation, left-rail chapter navigation, chapter content rendering, prev/next controls, and `ArrowLeft`/`ArrowRight` keyboard navigation.
- Added demo content piece `self-mashallah` with three chapters in `src/content/editorial/self-mashallah/*.mdx`.
- Updated route and content contract docs for nested editorial paths and chapter organization.

## Verification
- [x] `pnpm check`
- [x] `pnpm build`
- [x] `pnpm check`

## Review
- Editorial pages now render from static MDX content with URL-addressable chapter routes at `/editorial/[piece]/[chapter]`.
- `/editorial` and chapter pages both remain fixed viewport (`100vh`) and monochrome, matching no-scroll constraints.
- `pnpm build` and `pnpm check` both pass; build prerenders all demo chapter routes.

---

# Task: Implement Text section (`/text` + `/text/[slug]`)

## Plan
- [x] Add `text` content collection schema to `src/content.config.ts`.
- [x] Add two published sample MDX text articles in `src/content/text`.
- [x] Add a placeholder PDF file in `public/pdfs` and wire links.
- [x] Add text data helper for listing + URL mapping.
- [x] Create `/text` index with exactly 2 article cards + 1 PDF card.
- [x] Create `/text/[slug]` static article route with reading-mode typography and PDF download.
- [x] Run `pnpm build` and confirm success.

## Progress Notes
- Added `text` collection schema in `src/content.config.ts` with `TextArticle` frontmatter fields and slug regex validation.
- Added two published MDX entries: `line-as-prayer.mdx` and `studio-notes-on-absence.mdx`.
- Added static placeholder file at `public/pdfs/text-placeholder.pdf`.
- Added `src/lib/text.ts` helper for published filtering, deterministic sorting, and route URL mapping.
- Added `/text` index route with two article cards and one dedicated PDF card in monochrome style.
- Added `/text/[slug]` static route with `getStaticPaths`, MDX `render()`, PDF download link, and reading-mode text measure/line-height.

## Verification
- [x] `pnpm build`

## Review
- `/text` now prerenders with exactly three cards in current content state (2 article cards + 1 PDF card).
- `/text/[slug]` prerenders for both sample MDX articles and exposes a PDF download link on each page.
- Scroll behavior remains enabled on `/text*` routes (no `noScroll` usage), while Home/Editorial no-scroll routes remain unchanged.

---

# Task: Editorial mobile swipe navigation parity

## Plan
- [x] Add touch swipe navigation to `/editorial/[piece]/[chapter]`.
- [x] Keep keyboard + prev/next navigation unchanged.
- [x] Preserve no-scroll behavior for editorial routes.
- [x] Run `pnpm build` and verify prerender output.

## Progress Notes
- Added horizontal touch swipe handling in the chapter page inline script.
- Swipe logic ignores interactive elements, enforces minimum horizontal distance, and rejects off-axis gestures.
- Right swipe navigates to previous chapter when available; left swipe navigates to next chapter when available.
- Existing arrow-key and Prev/Next button behavior remains unchanged.

## Verification
- [x] `pnpm build`

## Review
- Editorial route behavior now matches route policy controls across keyboard, button, and touch interactions.
- Build remains green and prerenders editorial and text routes successfully.

---

# Task: Implement static Work section + confirm Text sample content

## Plan
- [x] Re-read route/UI/content contracts and inspect current repo state for `text` and `work`.
- [x] Verify plan with user before implementation.
- [x] Add `work` collection schema and typed helper utilities for category + slug routing.
- [x] Add static Work routes for index, tattoos, jewellery, logos index, and logos detail.
- [x] Add sample static Work content entries and placeholder local assets (images + logo PDF path).
- [x] Keep Text static sample setup intact (2 MDX sample articles + placeholder PDF path) and only adjust if required.
- [x] Run validation commands (`pnpm check`, `pnpm build`) and confirm route output.
- [x] Document progress, verification evidence, and short review.

## Progress Notes
- Planning complete; implementation beginning with content schema + helper layer.
- Added `work` collection schema to `src/content.config.ts` with validation enforcing local PDF-only logo entries and required local images for gallery categories.
- Added `src/lib/work.ts` for deterministic category sorting/filtering and static route URL mapping.
- Added static routes for `/work`, `/work/tattoos`, `/work/jewellery`, `/work/logos`, and `/work/logos/[slug]`.
- Added sample work content under `src/content/work/{tattoos,jewellery,logos}` with one logo PDF entry and four gallery entries.
- Added placeholder local assets in `public/images/work/...` and `public/pdfs/work/mashallah-monogram-sheet.pdf`.
- Kept existing text sample content unchanged (`2` sample MDX entries + `/pdfs/text-placeholder.pdf`).

## Verification
- [x] `pnpm check`
- [x] `pnpm build`

## Review
- Work section is now fully static and content-driven with all required routes prerendered.
- Logos section uses local PDF assets only (index list + detail page with embed + download), with schema-level guardrails against external links.
- `pnpm check` and `pnpm build` pass with generated pages for all new `/work*` routes.

---

# Task: Implement static Shop inquiry-only flow (`/shop` + `/shop/[collection]`)

## Plan
- [x] Re-read route/UI/content constraints and inspect current repo state before changes.
- [x] Add `shop` content collection schema and sample collection content entries.
- [x] Add shop helper layer for collection sorting, item derivation, and inquiry link generation.
- [x] Add shared inquiry CTA component with high-contrast primary and minimal secondary actions.
- [x] Implement `/shop` collections grid route.
- [x] Implement `/shop/[collection]` items grid route with sold-out badges and inquiry CTAs.
- [x] Run verification checks (`pnpm check`, `pnpm build`) and confirm routes prerender.
- [x] Add review notes including what changed and local testing steps.

## Progress Notes
- Added a new `shop` collection schema in `src/content.config.ts` with `out_of_stock` status enforcement.
- Added four static sample shop collections under `src/content/shop` (`Love`, `Love Classic`, `Shams`, `Prints`).
- Added `src/lib/shop.ts` with deterministic sorting, route URL mapping, item derivation from gallery assets, and encoded Instagram/email inquiry links.
- Added `src/components/InquiryCtaGroup.astro` to keep inquiry CTAs consistent across item cards.
- Implemented `/shop` index route as a scrollable collections grid.
- Implemented `/shop/[collection]` static route with item cards, `SOLD OUT` state, primary `DM to inquire`, and secondary email fallback.

## Verification
- [x] `pnpm check`
- [x] `pnpm build`

## Review
- Shop is now fully static and content-driven with prerendered routes for `/shop` and all four collection pages.
- Every derived shop item displays `SOLD OUT` and exposes inquiry-only CTAs (`DM to inquire` + email fallback), with no payment or checkout UI.
- Local test flow: run `pnpm dev`, open `/shop`, then open each collection (`/shop/love`, `/shop/love-classic`, `/shop/shams`, `/shop/prints`) and verify CTA links encode a prefilled inquiry message.

---

# Task: Finalize Cloudflare Pages deployment readiness

## Plan
- [x] Confirm Astro adapter/build output settings are Cloudflare Pages compatible and keep static-first output.
- [x] Add global SEO defaults (title template + description + OpenGraph baseline metadata).
- [x] Add sitemap generation and a static `robots.txt` entry that references sitemap output.
- [x] Add a static `404` page route.
- [x] Document Cloudflare Pages settings (build command, output directory, Node version assumption) in project docs.
- [x] Run `pnpm build` and record verification + review notes.

## Progress Notes
- Updated `astro.config.mjs` to keep static-first output while explicitly setting `outDir: dist` and a canonical `site` value resolved from `PUBLIC_SITE_URL` (or `CF_PAGES_URL` fallback).
- Expanded `BaseLayout.astro` with default SEO metadata: canonical URL, robots tag, OpenGraph tags, and Twitter card tags.
- Added default OpenGraph image asset at `public/images/og-default.svg`.
- Added `src/pages/sitemap.xml.ts` to generate sitemap entries for static top-level routes plus editorial, shop, text, and logo detail routes.
- Added `src/pages/robots.txt.ts` referencing the generated sitemap URL.
- Added `src/pages/404.astro` as a static not-found page with `noindex`.
- Updated Cloudflare Pages deployment notes in `docs/DEV_PLAYBOOK.md` and `README.md` to include Node LTS assumption and `PUBLIC_SITE_URL` guidance.

## Verification
- [x] `pnpm build`

## Review
- Build succeeds with Cloudflare adapter + static output and prerenders `404`, `robots.txt`, and `sitemap.xml` into `dist/`.
- SEO defaults now apply site-wide without per-page duplication while preserving page-specific titles/descriptions where provided.
- Sitemap and robots are generated from current content, and deployment docs now explicitly describe Pages build/output/node assumptions.

---

# Task: Fix blocked site navigation (global primary nav)

---

# Task: Apply full website improvement pass (SEO, inquiry, a11y, performance, guardrails)

## Plan
- [x] Replace placeholder contact/inquiry values with environment-driven configuration and safe fallbacks.
- [x] Enforce non-placeholder production site URL behavior for canonical/robots/sitemap safety.
- [x] Implement a real inquiry form flow from `/contact` to `/inquiry/success` with validation and clear messaging.
- [x] Remove hardcoded text listing limits and placeholder-PDF coupling from text routes.
- [x] Add accessibility essentials: skip link, visible focus states, safer external-link attributes.
- [x] Make editorial routes scroll-safe for longer content while preserving navigation.
- [x] Optimize homepage 3D loading strategy via deferred/lazy module loading.
- [x] Add engineering guardrails (lint/test scripts + CI workflow + docs updates).
- [x] Run verification (`pnpm lint`, `pnpm test`, `pnpm build`) and document review results.

## Progress Notes
- Added `src/lib/site.ts` and `.env.example` to remove hardcoded inquiry placeholders and centralize contact channel behavior.
- Updated shop inquiry URL generation to use configured channels with contact-form fallback when a channel is unavailable.
- Replaced `/contact` placeholder flow with a validated inquiry form and query-prefill support from shop links.
- Reworked `/inquiry/success` into a real review/send step that validates submitted fields and generates prefilled email/Instagram actions.
- Removed hardcoded text listing limits and removed placeholder PDF coupling from text pages and article content.
- Added global accessibility basics: skip link, visible focus styles, and secure external link attributes.
- Changed editorial index/detail routes to scroll-safe layouts for longer chapter content.
- Deferred homepage 3D initialization with IntersectionObserver + requestIdleCallback and dynamic module imports.
- Added `lint`, `test`, and `verify` scripts, plus GitHub Actions CI workflow at `.github/workflows/ci.yml`.
- Updated docs (`README.md`, `docs/DEV_PLAYBOOK.md`, `docs/ROUTES.md`, `docs/UI_RULES.md`) to reflect new env vars and route behavior.

## Verification
- [x] `pnpm lint`
- [x] `pnpm test`
- [x] `pnpm build`

## Review
- All planned improvements were applied and verified in a passing local pipeline.
- Remaining non-blocking warning: Cloudflare adapter still reports optional image optimization guidance (`imageService: "compile"`).

## Plan
- [x] Add a persistent top navigation in the shared layout for top-level routes.
- [x] Implement active-route styling so users can see their current location.
- [x] Add missing `/contact` page so all primary nav links resolve.
- [x] Verify navigation behavior in build output and confirm checks pass.

## Progress Notes
- Root cause identified: no global nav exists in `BaseLayout`, so users cannot move between major sections from most pages.
- Added a persistent primary nav in `BaseLayout` with route items (`/`, `/editorial`, `/shop`, `/text`, `/work`, `/contact`).
- Added active route highlighting (`aria-current="page"` + monochrome contrast state) for current section visibility.
- Added `src/pages/contact.astro` and `src/pages/inquiry/success.astro` to complete basic contact/inquiry navigation flow.
- Updated sitemap static routes to include `/contact`.
- Verified generated HTML includes primary nav links across routes and active link state per page.

## Verification
- [x] `pnpm check`
- [x] `pnpm build`

## Review
- Navigation is now available on all pages through a persistent top bar, resolving the blocked user flow.
- Contact and inquiry success routes are now present and prerendered in static output.
- Type/check/build pipelines remain green after the navigation fix.

---

# Task: Add global black/white inversion toggle

## Plan
- [x] Add inverse theme token overrides controlled by a root `data-theme` attribute.
- [x] Add a `Black / White` toggle button in the shared top navigation.
- [x] Implement `localStorage` persistence with pre-paint theme application.
- [x] Ensure toggle state updates button accessibility (`aria-pressed`) and visual state.
- [x] Run `pnpm check` and `pnpm build` to verify no regressions.

## Progress Notes
- Added `html[data-theme='inverse']` color token overrides in `src/styles/tokens.css` so all token-driven UI surfaces invert globally.
- Added a compact `Black / White` button to the right side of the fixed primary nav in `src/layouts/BaseLayout.astro`.
- Added pre-paint theme restore script in `<head>` using `localStorage` key `ym_theme_mode` to avoid initial flicker.
- Added runtime toggle script that flips `data-theme`, persists mode, and updates `aria-pressed`.
- Added `.theme-toggle` active/inactive styles in `src/styles/global.css` for consistent monochrome feedback.

## Verification
- [x] `pnpm check`
- [x] `pnpm build`

## Review
- Site-wide black/white inversion now works through token swapping with persistent user preference.
- Toggle is available across all routes from the shared nav and keeps state after navigation/reload.
- Type/build checks passed with no regressions.

---

# Task: Implement UI/UX Enhancement Plan (Astro 5.18 corrected)

## Plan
- [x] Phase 1: foundation updates (`ClientRouter`, transitions, prefetch policy, hover utilities, CTA a11y labels, typography loading).
- [x] Phase 2: shared components (`Breadcrumb`, `Lightbox`, `ReadingProgress`) and transition-safe script lifecycle handling.
- [x] Phase 3: page-level enhancements across Home, Shop, Editorial, Text, Work, Contact, Inquiry Success, and 404.
- [x] Phase 4: image/PDF/a11y/performance hardening and docs/task updates.
- [x] Run verification (`pnpm lint`, `pnpm test`, `pnpm build`) and capture review notes.

## Progress Notes
- Replaced incorrect transition setup with Astro 5.18-compatible `ClientRouter` in `BaseLayout` and added route-level fade animation.
- Added explicit prefetch policy in `astro.config.mjs` and opt-in prefetch attributes on primary nav links.
- Downloaded and self-hosted Syne + Instrument Sans (`woff2`, latin subset) in `public/fonts/`, then switched to local `@font-face` declarations in `src/styles/global.css`.
- Added reusable global polish utilities in `global.css`: card hover lift, image hover zoom, field focus transitions, and shared fade-in animation utility.
- Added reusable components:
  - `src/components/Breadcrumb.astro`
  - `src/components/Lightbox.astro` (`<dialog>` modal with keyboard navigation and focus return)
  - `src/components/ReadingProgress.astro` (top fixed progress indicator, `prefers-reduced-motion` aware)
- Added `src/lib/reading.ts` and extended `src/lib/editorial.ts`/`src/lib/text.ts` with reading-time metadata for consistent display.
- Replaced ad-hoc back links with breadcrumbs on detail routes (`shop/[collection]`, `editorial/[piece]/[chapter]`, `text/[slug]`, `work/tattoos`, `work/jewellery`, `work/logos/index`, `work/logos/[slug]`).
- Enhanced page-level UX:
  - Home: staged fade-in text and GLB loading shimmer/skeleton.
  - Shop/Work/Text/Editorial lists: hover states, richer metadata, and contextual CTA `aria-label`s.
  - Work galleries: lightbox integration for tattoos/jewellery image viewing.
  - Text + Editorial detail pages: reading progress and reading-time metadata.
  - Contact: required indicators, live character counter, custom Constraint Validation API messaging, and `data-astro-reload` form reliability mode.
  - Inquiry success: polite live summary container and alert semantics for missing send channels.
  - Logos PDF detail: loading overlay, timeout/error fallback message, responsive iframe sizing.
  - 404: sitemap-style section links and subtle heading entrance animation.
- Hardened script lifecycle for client routing by adding `data-astro-rerun` where needed and cleanup handlers on `astro:before-swap`.
- Updated `docs/DEV_PLAYBOOK.md` with explicit image handling policy for current SVG assets vs future raster assets.
- Added a lessons entry in `tasks/lessons.md` for transition API verification and client-router script lifecycle planning.

## Verification
- [x] `pnpm lint`
- [x] `pnpm test`
- [x] `pnpm build`

## Review
- All planned UX enhancements were implemented and the full verification pipeline passed.
- `pnpm verify` succeeded end-to-end with zero diagnostics errors/warnings in `astro check`.
- Remaining non-blocking warning remains unchanged from baseline: Cloudflare adapter note about optional `imageService: "compile"` optimization.

---

# Task: Commit and push current repository changes

## Plan
- [x] Inspect repo status, remotes, and verification scripts to confirm scope.
- [x] Run the repository verification pipeline and review failures if any appear.
- [ ] Create a single commit for the current tracked and untracked changes.
- [ ] Push the current branch to `origin` and record the outcome.

## Progress Notes
- Verified the branch is `main`, reviewed the current diff footprint, and confirmed `origin` is configured.
- Ran `pnpm verify`; `astro check` passed in both lint/test phases and the Astro build completed successfully.

## Verification
- [x] `pnpm verify`
- [x] `git status --short --branch`
- [ ] `git push origin main`

## Review
- The repository is verified and ready for a single commit/push covering the current UX, content, config, and workflow changes.
