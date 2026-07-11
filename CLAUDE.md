# CLAUDE.md

Guidance for AI agents (and humans) working in this repo. Keep it up to date when
architecture or conventions change.

## What this is
Marketing + booking website for the DJ/producer **CRATERMUS**. Goals: showcase his
music (to grow recognition) and let people reach him to book gigs (parties &
festivals). Frontend-first, with room for a backend later. Deployed as a Docker
image on **Google Cloud Run**.

## Tech stack
- **Next.js (App Router)** + **TypeScript**, `output: "standalone"` (see `next.config.js`).
- **Tailwind CSS v3** (`tailwind.config.ts`) — dark theme with custom color tokens.
- **React 19**, Node 22 in the Docker image. No database; content is file-driven.
- Fonts via `next/font` (Oswald for display, Inter for body) in `app/layout.tsx`.

## The core idea: content is config-driven
Non-developers edit files in `content/` — **no code changes** to update the site.
This is the most important convention; preserve it.

- `content/site.ts` — brand name, tagline, hero copy, bio, `bookingEmail`, and
  `socials[]` (label, url, icon). Also SEO/OG config.
- `content/music.ts` — `tracks[]`. Paste a YouTube / Spotify / SoundCloud **share
  URL**; platform is auto-detected. Fields: `title?`, `url`, `platform?`, `featured?`.
- `content/events.ts` — `events[]` upcoming shows. Empty ⇒ the whole Events section
  **and** its nav link disappear automatically.

### Adding a music platform
`lib/embeds.ts` turns a share URL into an embed. To support a new platform: extend
`Platform` in `content/music.ts`, add detection in `detectPlatform()`, and add a
`case` in `resolveEmbed()` that builds the iframe URL. Unparseable URLs return
`null` and are silently skipped.

### Adding a social icon
Two edits: add the key to the `icon` union in `content/site.ts`, then add the SVG
component + register it in the `MAP` in `components/icons.tsx` (`SocialIcon`).

## Layout & components
Single-page scroll (`app/page.tsx`): Header → Hero → MusicSection → About → Events →
Booking → Footer. All in `components/`.
- `EmbedPlayer.tsx` — client component; renders a lightweight "click-to-load" facade
  so many third-party iframes don't tank page load. Videos use 16:9; audio embeds use
  a fixed height from `lib/embeds.ts`.
- `Header.tsx` — client; sticky, transparent→solid on scroll. Nav shows the **Events**
  link only when `hasUpcomingEvents` (`lib/events.ts`) is true, so nav and section
  never disagree.
- `lib/events.ts` — shared `getUpcomingEvents()` / `hasUpcomingEvents`; used by both
  `Events.tsx` and `Header.tsx`. Reuse it, don't re-implement the date filter.

## Design system (logo-derived)
Palette lives in `tailwind.config.ts`. Base is near-black `#0B0B0C` with **crimson red
`#E11414` (accent) dominant**. The logo has a subtle RGB-split "glitch," so two
secondary accents exist: `glitch-blue #4CC9F0` and `glitch-green #6EE7B7`.

Glitch is applied **sparingly** as detailing — keep red dominant. Current usages:
- `.chromatic` (in `app/globals.css`) — RGB-split filter on the logo (Hero, About).
- `shadow-chromatic` — chromatic glow on the logo and the play buttons.
- `GlitchRule.tsx` — small red/green/blue offset-bar divider under the hero tagline
  and each section heading.
- A few eyebrow labels tinted (`text-glitch-blue` on "Listen", `text-glitch-green` on
  "About"); "Booking" stays red. Ambient blue/green glow blobs in Hero/About/Booking.

History (don't re-try without asking): glitch on **body text** and on **buttons** was
tried and the owner rejected both — keep buttons/text clean.

## Booking
Currently **contact-only**: `Booking.tsx` has a `mailto:` "Email to Book" button (with
a pre-filled inquiry template) plus social links. A scheduling tool (Cal.com, hosted +
`@calcom/embed-react`, using its "requires confirmation" approval gate) has been
discussed as the next step but is **not implemented**.

## Commands
- Dev: `npm run dev` → http://localhost:3000
- Prod build (also type-checks): `npm run build`
- Type-check only: `npx tsc --noEmit`
- Docker: `docker build -t cratermus . && docker run -p 8080:8080 -e PORT=8080 cratermus`

## Deploy (Google Cloud Run)
Image goes to **Artifact Registry**, repo `web` in region **`us-west1`**, project id
**`cratermus`**. The hostname prefix MUST match the repo region:
`us-west1-docker.pkg.dev/cratermus/web/<image>:<tag>`. Auth once with
`gcloud auth configure-docker us-west1-docker.pkg.dev`. See `README.md` for full steps.

## Gotchas (learned this project)
- **Windows / PowerShell** environment. A Bash tool is also available for POSIX scripts.
- **Standalone server binds to `HOSTNAME`.** The Dockerfile sets `HOSTNAME=0.0.0.0`
  (correct for Cloud Run). Running `node .next/standalone/server.js` locally without it
  binds to the machine hostname, so `localhost` refuses the connection — set
  `HOSTNAME=0.0.0.0` for local standalone tests.
- **`metadataBase`** is driven by `NEXT_PUBLIC_SITE_URL` (falls back to localhost). Set
  it at deploy time so OG/Twitter share images resolve to absolute URLs.
- **Next.js version:** was pinned to 15.1.6, which had a CVE; upgraded to 16.x. Stay on
  a patched release.
- **Visual verification:** Playwright is available. Install once with
  `npx playwright install chromium`, then
  `npx playwright screenshot --full-page --viewport-size=1280,900 http://localhost:3000 out.png`
  (and `--viewport-size=390,844` for mobile) to eyeball changes.

## Not set up
No test suite, no linter config beyond `next lint`, and this directory is **not a git
repo**. Don't assume git operations work.
