# Lessons

## 2026-03-03: Avoid network-dependent runtime imports for core UI
- What went wrong:
  - The homepage 3D component imported Three.js and `GLTFLoader` from `esm.sh`, which failed in this environment due DNS/network resolution issues.
- Why it happened:
  - I optimized for quick implementation when `pnpm add three` was blocked, but that moved dependency risk from install-time to user runtime.
- Rule for next time:
  - For critical UI functionality, prefer local/runtime-self-contained dependencies (workspace package or vendored local module) and avoid CDN/runtime imports unless the user explicitly accepts that risk.

## 2026-03-03: Validate GLB compression requirements before shipping
- What went wrong:
  - The model failed at runtime because it required Draco decoding, and the initial loader setup used only `GLTFLoader` without `DRACOLoader`.
- Why it happened:
  - I assumed the GLB was plain (non-Draco) and did not validate decoder requirements with a real browser/runtime pass before handoff.
- Rule for next time:
  - For new 3D assets, verify codec/compression requirements (`Draco`, `KTX2`, etc.) and wire required loaders/decoder assets before declaring the integration complete.

## 2026-03-03: Verify current framework APIs before planning implementation details
- What went wrong:
  - The plan used `ViewTransitions` instead of Astro's current `ClientRouter` API and did not fully account for script lifecycle behavior under client routing.
- Why it happened:
  - I leaned on stale memory of older transition patterns instead of anchoring every implementation detail to current docs before drafting the execution plan.
- Rule for next time:
  - For framework-level APIs (routing/transitions/assets), verify against current official docs first and include explicit lifecycle/cleanup requirements in the initial plan.
