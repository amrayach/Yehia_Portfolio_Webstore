# Route Map and Scroll Policy

## Routing Principles
- Keep URL structure explicit and stable.
- No-scroll pages use frame-based navigation (no vertical scroll).
- Scroll pages use normal document flow and can be long-form.
- Keep all pages static-renderable by default.

## Route Contract
| Path | Page Intent | Scroll Mode | Render Mode | Content Source | Notes |
|---|---|---|---|---|---|
| `/` | Yehia Moldan landing + rotating 3D logo | No-scroll | Static | Local content + assets | Full viewport stage |
| `/editorial` | Editorial index / chapter chooser | No-scroll | Static | `src/content/editorial` | Frame navigation |
| `/editorial/[piece]/[chapter]` | Single editorial chapter | No-scroll | Static | `src/content/editorial` | URL-addressable chapter frames |
| `/shop` | Collection overview (all out-of-stock) | Scroll | Static | `src/content/shop` | Inquiry CTA only |
| `/shop/[collection]` | Collection detail | Scroll | Static | `src/content/shop` | No checkout widget in MVP |
| `/text` | Text/article index | Scroll | Static | `src/content/text` | Includes PDF links |
| `/text/[slug]` | Text article page | Scroll | Static | `src/content/text` | Reading-optimized layout |
| `/work` | Work category index | Scroll | Static | `src/content/work` | Links to categories |
| `/work/tattoos` | Tattoos gallery | Scroll | Static | `src/content/work` | Grid/list layout |
| `/work/logos` | Logos gallery + PDF/Behance links | Scroll | Static | `src/content/work` | External links allowed |
| `/work/jewellery` | Jewellery gallery | Scroll | Static | `src/content/work` | Editorial image rhythm |
| `/contact` | Contact + inquiry form | Scroll | Static | Local config | Simple form + links |
| `/inquiry/success` | Post-submit confirmation | Scroll | Static | Local content | Lightweight success state |
| `/404` | Not found | Scroll | Static | Local content | Minimal fallback |

## No-Scroll Behavior (Required)
- Applies only to:
  - `/`
  - `/editorial`
  - `/editorial/[piece]/[chapter]`
- Content lives inside full-viewport frames.
- Navigation controls:
  - Previous / Next buttons
  - Keyboard arrows (`Left`, `Right`)
  - Touch swipe on mobile
- Keep `Esc` mapped to close overlays/lightboxes if present.
- Update URL when frame/chapter changes for shareability.

## Scroll Behavior (Required)
- Applies to:
  - `/shop*`, `/text*`, `/work*`, `/contact`, `/inquiry/success`, `/404`
- Standard vertical scroll with sensible section spacing.
- Preserve clear section anchors for long pages where helpful.

## Navigation Rules
- Primary nav appears on all pages.
- Active route indication must remain monochrome.
- On no-scroll routes, nav must not interfere with frame controls.
- Keep top-level nav items stable: `Yehia Moldan`, `Editorial`, `Shop`, `Text`, `Work`, `Contact`.
