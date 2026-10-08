# Portfolio validation — 8 October 2026

Validated the production build locally, using Chromium and Lighthouse mobile simulation.

- `npm run build`: passes TypeScript compilation and static generation.
- `npm run lint`: passes with no warnings or errors.
- `npm run test:e2e`: five browser tests pass.
- Layout widths: 360, 390, 768, 1440, and 1920 pixels; document width equals viewport width.
- Theme defaults to light, switches to dark, and persists after reload.
- Mobile menu closes with Escape, restores focus, and supports navigation.
- Video plays muted when sufficiently visible, supports explicit sound/captions/play/pause, pauses outside the hero, and respects reduced motion.
- ID card works with keyboard and pointer; skills filtering, project panels, résumé responses, email copy, desktop achievements scrolling, and optional AI-lab launch/close are checked.
- Axe checks both themes against WCAG 2 A/AA and WCAG 2.1 AA: no automated violations.
- Lighthouse mobile: performance 95, accessibility 100; FCP 0.9s, LCP 2.9s, TBT 80ms, CLS 0. These are local measurements, not guarantees for hosted devices/networks.
- Desktop (1440×900) and mobile (390×844) screenshots visually inspected in both themes.
- Fonts, logos, PDFs, and media are served locally. The inaccessible legacy DeliverIQ GitHub URL was removed. The Crop Doctor repository link was verified.

The existing chat backend is not configured in this test environment, so live AI responses were not validated. Its API proxy and backend configuration were preserved. The generated clip is an accepted still-avatar lip-sync video, not a verified seamless loop.
