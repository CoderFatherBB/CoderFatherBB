# Portfolio validation — 8 October 2026

Validated the production build locally, using Chromium and Lighthouse mobile simulation.

- `npm run build`: passes TypeScript compilation and static generation.
- `npm run lint`: passes with no warnings or errors.
- `npm run test:e2e`: twenty-three Chromium browser/API checks pass, plus six targeted WebKit checks.
- Layout widths: 360, 390, 768, 1440, and 1920 pixels; document width equals viewport width.
- Theme defaults to light, switches to dark, and persists after reload.
- Mobile menu closes with Escape, restores focus, and supports navigation.
- Video requests audible autoplay with captions enabled when sufficiently visible. Browser rejection falls back to muted playback, with sound retried on interaction. Sound/captions/play/pause controls, visibility pausing, and reduced motion are checked.
- ID card works with keyboard and pointer; skills filtering, project panels, résumé responses, email copy, desktop achievements scrolling, and optional AI-lab movement, discovery, chapter access, and close are checked.
- Axe checks the main page, assistant, and AI-lab introduction in both themes against WCAG 2 A/AA and WCAG 2.1 AA.
- Earlier design-pass Lighthouse mobile: performance 95, accessibility 100; FCP 0.9s, LCP 2.9s, TBT 80ms, CLS 0. These are local measurements, not guarantees for hosted devices/networks.
- Desktop (1440×900) and mobile (390×844) screenshots visually inspected in both themes.
- Fonts, logos, the single ATS résumé, original ID portrait, and media are served locally. The inaccessible legacy DeliverIQ GitHub URL was removed. The Crop Doctor repository link was verified.

The existing chat backend is not configured in this test environment, so live AI responses were not validated. Mocked responses and failures were tested; The proxy now supplies current server-owned facts and grounding instructions; the provider model is unchanged and its temperature is lowered to 0.2. The assistant context and instructions now use CV-grounded facts. The generated clip is an accepted still-avatar lip-sync video, not a verified seamless loop.

Refinement audit: fixed assistant viewport bounds and stacking above the navigation, keyboard skill selection, cross-tab theme updates, scrollable short-screen navigation, and lab contrast in both themes. All filters and project panels were exercised. The original portrait was visually reviewed on the ID card in desktop and mobile layouts. Dataset contributions and papers in preparation are labeled separately. Python backend syntax compilation passes.

Mobile regression: touch-tested every stack tile and every category filter in both themes with normal motion. Tile visibility persists after selections; six distinct category backgrounds progress from deeper to lighter blue. Audible autoplay is tested both with browser permission and simulated rejection. Manual mute remains muted after further interaction.

Experience redesign: persistent robot/gamepad circles stack vertically on phones and horizontally on desktops. Launch/close/reopen and focus restoration are tested. Conversations and lab discoveries survive closing; CV highlights work with the AI request route blocked. Guided tour exposes all seven chapters, including learning and mentoring. Assistant scrolling is keyboard-accessible, and modal focus stays within each experience. Free-form streaming and error responses use mocked endpoints; live provider responses remain unverified locally. Both experiences use the main portfolio’s theme variables.

9 October correction audit: replayed the erroneous Provilac answer and the user’s correction, then an elliptical follow-up. The earlier software role stays separate from AI/ML work; both the earlier role and degree are full-time. Proxy tests verify full conversation history, server-owned current facts, and removal of client system messages. Four expanded workflows were checked at 390px and 1440px in both themes and screenshots inspected. Live model accuracy is not proven by the mocked provider check.

Hero and ID-card audit: the return hint stays inside the back face at 360, 390, 768, and 1440px in both themes. The watermark is visible above the picture; controls and sound hint occupy a separate surface below the video and native captions. The player prefers H.264/AAC MP4, preloads the clip, and keeps a poster overlay until a decoded frame is submitted. Delayed loading and actual first-pass decoded pixels are tested; enabling sound restarts the narration and Web Audio detects its signal. Caption mode is explicitly synchronized when the track loads or playback starts, fixing WebKit's disabled default track. Build and lint pass. WebKit tests run in Linux emulation, not on a physical iPhone; audible autoplay still depends on browser permission and reduced-motion preferences are honored.
