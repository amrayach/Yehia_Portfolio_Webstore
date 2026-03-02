# Project Context

## Purpose
Build a portfolio/store website for Yehia Moldan that prioritizes brand presence, editorial storytelling, and inquiry-led product demand.

## Non-Negotiables
- English-only content for MVP.
- Deploy via GitHub -> Cloudflare Pages (free plan) on the existing domain.
- Static-first architecture (minimal runtime/server dependencies).
- Monochrome UI system (black, white, gray only for UI chrome).
- Landing page includes a rotating 3D logo centerpiece.
- `Yehia Moldan` and `Editorial` experiences must have no vertical scroll.
- `Shop`, `Text`, and `Work` pages can use vertical scroll.
- Shop is inquiry/DM-only in MVP; no active checkout flow.
- Keep implementation and operations simple.

## MVP Scope
- Core routes: Home, Editorial, Shop, Text, Work, Contact, Inquiry Success.
- Out-of-stock collection presentation for:
  - Love collection
  - Love classic collection
  - Shams collection
  - Prints
- Work categories:
  - Tattoos
  - Logos (PDF or Behance link)
  - Jewellery
- Text section supports article pages and downloadable PDFs.

## Out of Scope (Phase 2+)
- Live stablecoin checkout integration (Triple-A or equivalent).
- BTCPay/self-hosted payment stack.
- Automated edition/cap enforcement and advanced inventory workflows.
- Multilingual support (Arabic/RTL).
- Full CMS admin panel before core launch.

## Technical Baseline
- Framework: Astro + TypeScript.
- Rendering: static-first (`astro build` output to `dist/`).
- Hosting: Cloudflare Pages.
- Forms: lightweight inquiry endpoint/service (can start with external form handling if needed).
- Assets: optimized images in `public/images`, PDFs in `public/pdfs`.

## Content and Design Inputs
- Vision and structure: `Refrence_Material/Client-Brief-vision.txt`.
- Research and constraints: `Refrence_Material/Project-Research.txt`.
- Brand and visual references:
  - `Refrence_Material/logo/*`
  - `Refrence_Material/images/*`
  - `Refrence_Material/Love_حب_Limited_Edition_Registry.pdf`

## Decision Log
- 2026-03-02: English-only locked for MVP.
- 2026-03-02: Cloudflare Pages + static-first delivery locked.
- 2026-03-02: No-scroll pattern locked as slide frames on Home/Editorial.
- 2026-03-02: Shop locked to inquiry-only MVP.

## Session Reset Rule
Every Codex session must read, in order:
1. `docs/PROJECT_CONTEXT.md`
2. `docs/ROUTES.md`
3. `docs/UI_RULES.md`
4. `docs/CONTENT_MODEL.md`
5. `docs/DEV_PLAYBOOK.md`
