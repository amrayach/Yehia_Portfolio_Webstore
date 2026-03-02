# UI Rules (Monochrome Minimal System)

## Design Direction
- Editorial minimalism with strong typography and high contrast.
- UI chrome stays monochrome; artwork/photos provide visual richness.
- Remove decorative noise; every visual element must have a purpose.

## Design Tokens
```css
:root {
  --color-bg: #ffffff;
  --color-fg: #0a0a0a;
  --color-muted: #666666;
  --color-soft: #f2f2f2;
  --color-hairline: #d9d9d9;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  --container-sm: 760px;
  --container-md: 1040px;
  --container-lg: 1280px;

  --radius-sm: 4px;
  --radius-md: 10px;
  --duration-fast: 140ms;
  --duration-base: 220ms;
  --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

## Color Rules
- Allowed UI colors: black/white/grays only.
- CTA emphasis uses contrast and weight, not bright accent colors.
- Product/editorial images can keep native color.
- Avoid tinted overlays unless strictly grayscale.

## Hairline and Surface Rules
- Default separators and borders are `1px` hairlines.
- Prefer subtle separators over cards with heavy shadows.
- Box shadows are discouraged; if needed, keep them soft and neutral.
- Use negative space before adding lines.

## Typography Rules
- Use one expressive display face + one readable text face.
- Recommended stack:
  - Display: `Syne, "Arial Narrow", sans-serif`
  - Body/UI: `"Instrument Sans", "Helvetica Neue", Arial, sans-serif`
- Headings are short (1-2 lines) and high impact.
- Body text target line length: ~60-75 characters.
- Keep uppercase labels tight and sparse; avoid over-tracking.

## Motion Rules
- Motion supports comprehension, not decoration.
- Home 3D logo rotates slowly and continuously, with low-amplitude interaction response.
- No-scroll pages transition between frames via fade/slide.
- Scroll pages can use subtle reveal transitions.
- Respect `prefers-reduced-motion`:
  - Disable non-essential animations.
  - Replace motion with instant state changes.

## Layout Rules
- Hero fold should contain at most:
  - Main statement
  - Secondary line
  - Primary action
- Use generous whitespace; avoid crowded grids on desktop.
- Keep strong alignment lines across sections.

## Navigation Rules
- Persistent top navigation on all routes.
- Keep nav minimal: no dropdown mega-menus in MVP.
- On no-scroll pages, show frame controls without obscuring content.
- Active item uses contrast/weight changes only.
- Mobile nav should be simple and fast (sheet or full-screen minimal menu).

## Component Rules
- Buttons:
  - Primary: filled black on white pages.
  - Secondary: ghost/outlined hairline.
- Forms:
  - Clean labels, no noisy placeholder-only fields.
  - Always show clear success/error state.
- Cards:
  - Prefer flat surfaces, hairline borders, and strong typography hierarchy.
