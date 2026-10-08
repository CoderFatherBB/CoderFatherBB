# Portfolio validation — 8 October 2026

Validated the production build locally, using Chromium and Lighthouse mobile simulation.

- `npm run build`: passes TypeScript compilation and static generation.
- `npm run lint`: passes with no warnings or errors.
- `npm run test:e2e`: thirteen browser tests pass.
- Layout widths: 360, 390, 768, 1440, and 1920 pixels; document width equals viewport width.
- Theme defaults to light, switches to dark, and persists after reload.
- Mobile menu closes with Escape, restores focus, and supports navigation.
- Video requests audible autoplay with captions enabled when sufficiently visible. Browser rejection falls back to muted playback, with sound retried on interaction. Sound/captions/play/pause controls, visibility pausing, and reduced motion are checked.
- ID card works with keyboard and pointer; skills filtering, project panels, résumé responses, email copy, desktop achievements scrolling, and optional AI-lab movement, discovery, chapter access, and close are checked.
- Axe checks the main page, assistant, and AI-lab introduction in both themes against WCAG 2 A/AA and WCAG 2.1 AA.
- Earlier design-pass Lighthouse mobile: performance 95, accessibility 100; FCP 0.9s, LCP 2.9s, TBT 80ms, CLS 0. These are local measurements, not guarantees for hosted devices/networks.
- Desktop (1440×900) and mobile (390×844) screenshots visually inspected in both themes.
- Fonts, logos, the single ATS résumé, original ID portrait, and media are served locally. The inaccessible legacy DeliverIQ GitHub URL was removed. The Crop Doctor repository link was verified.

The existing chat backend is not configured in this test environment, so live AI responses were not validated. Mocked responses and failures were tested; its API proxy and provider configuration were preserved. The assistant context and instructions now use CV-grounded facts. The generated clip is an accepted still-avatar lip-sync video, not a verified seamless loop.

Refinement audit: fixed assistant viewport bounds and stacking above the navigation, keyboard skill selection, cross-tab theme updates, scrollable short-screen navigation, and lab contrast in both themes. All filters and project panels were exercised. The original portrait was visually reviewed on the ID card in desktop and mobile layouts. Dataset contributions and papers in preparation are labeled separately. Python backend syntax compilation passes.

Mobile regression: touch-tested every stack tile and every category filter in both themes with normal motion. Tile visibility persists after selections; six distinct category backgrounds progress from deeper to lighter blue. Audible autoplay is tested both with browser permission and simulated rejection. Manual mute remains muted after further interaction.

Experience redesign: persistent robot/gamepad circles stack vertically on phones and horizontally on desktops. Launch/close/reopen and focus restoration are tested. Conversations and lab discoveries survive closing; CV highlights work with the AI request route blocked. Guided tour exposes all seven chapters, including learning and mentoring. Assistant scrolling is keyboard-accessible, and modal focus stays within each experience. Free-form streaming and error responses use mocked endpoints; live provider responses remain unverified locally. Both experiences use the main portfolio’s theme variables.
