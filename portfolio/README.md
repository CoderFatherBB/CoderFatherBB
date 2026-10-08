# Bhavin Baldota — talking portfolio

A light-by-default personal portfolio with a matching dark theme, restrained blue accents, and Bhavin's generated talking avatar. Built on the existing Next.js 16 / React 19 / TypeScript project; the original AI-lab game and assistant are available on demand from Contact.

## Run and verify

```bash
npm ci
npm run dev
```

For the production build and browser checks:

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
npm run start
```

The browser suite starts a production server automatically, checks layouts from 360px to 1920px, verifies theme persistence, mobile-menu keyboard behavior, ID-card interactions, skill filtering, project panels, PDF downloads, video playback, clipboard behavior, and automated accessibility in both themes.

## Content and sections

All new profile data lives in `src/lib/data.ts`. Facts and metrics come from the two CVs supplied by Bhavin. Existing portfolio links provide the LinkedIn, project repository, and published-work URLs. Dataset contributions are described as contributions; in-progress papers remain clearly marked as in preparation. No certificate titles, client endorsements, or missing project links were invented.

| Section | Experience |
| --- | --- |
| Hero | Research/develop/deploy positioning; talking avatar with sound and captions enabled by default; explicit sound, playback, captions, and transcript controls |
| About | Profile, swaying/flippable ID card, quick facts, original portrait and one industry résumé download |
| Skills | Periodic-table tiles, family filters, local brand logos, and a skill/project inspector |
| Work | Expanding project panels with labeled illustrative workflows |
| Research | Agent reliability interests, papers in preparation, and published dataset contributions |
| Certifications | Known certification and an aggregate learning record, with ink-fill hover/focus |
| Experience | Education, research, engineering, and mentoring in a chronological timeline |
| Achievements | Desktop sticky horizontal gallery and count-up milestones; touch-scroll gallery on mobile |
| Contact | Email/copy, phone, GitHub, LinkedIn, optional AI lab and assistant |

Light is the default. Theme preference is saved in `localStorage` under `portfolio-theme`. A small pre-paint script restores it without a flash of the opposite theme. Decorative animation, smooth scrolling, autoplay, and desktop pinning respect reduced-motion preferences. Sound and English captions are enabled by default. If the browser blocks audible autoplay, the video plays muted with a sound hint and retries audio on the first interaction while visible. A deliberate mute stays muted. The introduction pauses when the video is less than half visible, the tab becomes hidden, or the visitor pauses it.

The legacy game is preserved rather than rewritten. Its existing content/components remain under `src/components/`. Both the game and chat UI are dynamically imported only when requested. The assistant still uses the existing `/api/chat` proxy and requires the existing backend, selected with `BACKEND_API_URL`; no credentials are included in this repository.

## Updating the introduction

Assets live in `public/hero/`: `hero.mp4` (H.264/AAC), `hero.webm` (VP9/Opus), `poster.webp`, and default-on English `captions.vtt`. The 14-second video animates a still avatar's mouth; it is not a full-body motion animation or a verified seamless speech loop. It uses a synthetic male US English voice, not a recording or clone of Bhavin's voice.

The reproducible Piper → Wav2Lip rendering workflow and source avatar are in [Bhavin's Lip_Sync branch](https://github.com/CoderFatherBB/Deep_Learning/tree/codex/bhavin-portfolio-lipsync/Lip_Sync/bhavin-portfolio). Render there, then copy `intro.mp4` and `intro.webm` into this project's hero folder under the names above. Update the transcript in `PROFILE.transcript` and caption timings when changing the narration.

```bash
ffmpeg -i avatar.png -vf 'scale=1280:720' -frames:v 1 public/hero/poster.webp
```

MP4 includes faststart for web playback. Captions are optional, and the full transcript works even without video playback. The strongest industry ATS résumé is bundled in `public/resumes/` so download links work without third-party hosting.

## Credits and licenses

- Inter Tight, Instrument Serif, and JetBrains Mono are bundled as WOFF2 and loaded with `next/font/local`. Their SIL Open Font License texts are in `src/fonts/`.
- Brand SVGs come from [Devicon](https://github.com/devicons/devicon) and are stored locally in `public/logos/tech/` with its MIT license. Brand marks remain the property of their respective owners; official logo colors are retained.
- The avatar was generated from Bhavin's supplied photo and approved by him. The video uses Wav2Lip pretrained weights restricted to personal/research/noncommercial use. The Piper Ryan model card lists the voice dataset as CC BY-NC-SA 4.0. Review the linked source project's license notes before reusing these assets commercially.
- Lenis provides smooth scrolling. Other page motion uses CSS and browser APIs; the original game's dependencies are loaded only on demand.

## Review and deployment

Changes are prepared on `codex/talking-portfolio`. The existing Vercel deployment configuration is retained. Review the branch (or its Vercel preview, when available) before merging; pushing this branch does not merge it into `main`.

The ID card uses Bhavin’s original supplied portrait. All résumé downloads serve the industry ATS CV, which best connects research to production engineering and measured impact.

Profile and interactive-lab content share `src/lib/data.ts`. After updating these verified facts, synchronize the backend assistant context with `node --experimental-strip-types scripts/sync-knowledge.mjs` (Node 22+). Keep metrics attached to their role or project; dataset contributions and unpublished papers have separate labels.

Stack tiles use six progressively lighter blue category shades in each theme. Selecting or filtering never hides a tile; categories outside the active filter remain visible but disabled. Interactive tiles do not use the one-shot reveal animation, so React selection updates cannot reset them to an invisible state.
