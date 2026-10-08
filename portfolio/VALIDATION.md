# Portfolio validation — 8 October 2026

Validated the production build locally, using Chromium and Lighthouse mobile simulation.

- `npm run build`: passes TypeScript compilation and static generation.
- `npm run lint`: passes with no warnings or errors.
- `npm run test:e2e`: eight browser tests pass.
- Layout widths: 360, 390, 768, 1440, and 1920 pixels; document width equals viewport width.
- Theme defaults to light, switches to dark, and persists after reload.
- Mobile menu closes with Escape, restores focus, and supports navigation.
- Video plays muted when sufficiently visible, supports explicit sound/captions/play/pause, pauses outside the hero, and respects reduced motion.
- ID card works with keyboard and pointer; skills filtering, project panels, résumé responses, email copy, desktop achievements scrolling, and optional AI-lab movement, discovery, chapter access, and close are checked.
- Axe checks the main page, assistant, and AI-lab introduction in both themes against WCAG 2 A/AA and WCAG 2.1 AA.
- Earlier design-pass Lighthouse mobile: performance 95, accessibility 100; FCP 0.9s, LCP 2.9s, TBT 80ms, CLS 0. These are local measurements, not guarantees for hosted devices/networks.
- Desktop (1440×900) and mobile (390×844) screenshots visually inspected in both themes.
- Fonts, logos, the single ATS résumé, original ID portrait, and media are served locally. The inaccessible legacy DeliverIQ GitHub URL was removed. The Crop Doctor repository link was verified.

The existing chat backend is not configured in this test environment, so live AI responses were not validated. Mocked responses and failures were tested; its API proxy and provider configuration were preserved. The assistant context and instructions now use CV-grounded facts. The generated clip is an accepted still-avatar lip-sync video, not a verified seamless loop.

Refinement audit: fixed assistant viewport bounds and stacking above the navigation, keyboard skill selection, cross-tab theme updates, scrollable short-screen navigation, and lab contrast in both themes. All filters and project panels were exercised. The original portrait was visually reviewed on the ID card in desktop and mobile layouts. Dataset contributions and papers in preparation are labeled separately. Python backend syntax compilation passes.
