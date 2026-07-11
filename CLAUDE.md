# CLAUDE.md

Guidance for AI agents (and humans) working in this repo. Keep it up to date when
architecture or conventions change.

## What this is
Marketing + hire website for the music producer/composer **CRATERMUS**. Goal: win
**commission work** — original soundtracks for indie games, copyright-safe music for
streamers, and custom music for creative projects. Tone: "bring your story to life
through music" (tagline **"Stories from music."**). The Music section is his
portfolio/proof; the Hire section is the conversion point. Frontend-first, with room
for a backend later. Deployed as a Docker image on **Google Cloud Run**.

> History: this started as a **DJ booking** site and was pivoted to producer-for-hire.
> Keep copy focused on music **production/commissions**, not DJing/gigs.

## Tech stack
- **Next.js (App Router)** + **TypeScript**, `output: "standalone"` (see `next.config.js`).
- **Tailwind CSS v3** (`tailwind.config.ts`) — dark theme with custom color tokens.
- **React 19**, Node 22 in the Docker image. No database; content is file-driven.
- Fonts via `next/font` (Oswald for display, Inter for body) in `app/layout.tsx`.

## The core idea: content is config-driven
Non-developers edit files in `content/` — **no code changes** to update the site.
This is the most important convention; preserve it.

- `content/site.ts` — brand name, tagline, hero copy, bio, `contactEmail`, `services[]`
  (the "What I Make" cards), and `socials[]` (label, url, icon). Also SEO/OG config.
- `content/music.ts` — `tracks[]` (his portfolio). Paste a YouTube / Spotify /
  SoundCloud **share URL**; platform is auto-detected. Fields: `title?`, `url`,
  `platform?`, `featured?`.
- `content/events.ts` — `events[]` upcoming shows. Empty ⇒ the whole Events section
  **and** its nav link disappear automatically. (Legacy from the DJ version; kept but
  unused — leave empty unless he starts doing live dates.)

### Adding a service
Edit `services[]` in `content/site.ts` (title, description, `icon`). Icon keys live in
the `ICONS` map in `components/Services.tsx` (`game` | `stream` | `custom`) — add a new
SVG there to support another key.

### Adding a music platform
`lib/embeds.ts` turns a share URL into an embed. To support a new platform: extend
`Platform` in `content/music.ts`, add detection in `detectPlatform()`, and add a
`case` in `resolveEmbed()` that builds the iframe URL. Unparseable URLs return
`null` and are silently skipped.

### Adding a social icon
Two edits: add the key to the `icon` union in `content/site.ts`, then add the SVG
component + register it in the `MAP` in `components/icons.tsx` (`SocialIcon`).

## Layout & components
Single-page scroll (`app/page.tsx`): Header → Hero → **Services** → MusicSection →
About → Events (hidden) → **Hire** → Footer. All in `components/`.
- `Services.tsx` — the "What I Make" cards, driven by `site.services`; has its own
  local `ICONS` map (not the social `SocialIcon`).
- `Hire.tsx` — the commission/contact section (`id="hire"`). `mailto:` with a
  project-brief template + `MusicLinks`. This replaced the old `Booking.tsx`.
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

The logo (`public/logo.png`, transparent RGBA, ~340px/48KB, padding trimmed) has the RGB-split glitch **baked into
the artwork**, so it's rendered plainly with just a red `drop-shadow` glow — do NOT
re-apply `.chromatic`/`shadow-chromatic` to it (that double-glitches). Rings/rounded
boxes were removed since the mark is transparent, not an opaque square.

Glitch is applied **sparingly** as detailing — keep red dominant. Current usages:
- `.chromatic` (in `app/globals.css`) — RGB-split filter (no longer used on the logo
  now that the new logo bakes it in; kept for reuse).
- `shadow-chromatic` — chromatic glow on the play buttons.
- `GlitchRule.tsx` — small red/green/blue offset-bar divider under the hero tagline
  and each section heading.
- A few eyebrow labels tinted (`text-glitch-blue` on "Listen", `text-glitch-green` on
  "About" and "What I Make"); "Hire" stays red. Ambient blue/green glow blobs in
  Hero/About/Hire. `MusicLinks.tsx` icons hover blue/green (Music, Hire, Footer).

History (don't re-try without asking): glitch on **body text** and on **buttons** was
tried and the owner rejected both — keep buttons/text clean.

## Hire / contact
Currently **contact-only**: `Hire.tsx` has a `mailto:` "Email to Hire" button with a
pre-filled **project-brief** template (project type, scope, references, deadline,
budget, usage), plus the `MusicLinks`. A scheduling/intake tool (Cal.com, hosted +
`@calcom/embed-react`, "requires confirmation" gate) was discussed for the old DJ
version but is **not implemented**; for commissions a project intake form is the more
natural next step.

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

## Source control
Git repo with remote **`origin`** → `https://github.com/Retcor/cratermus.git`
(default branch `main`). `.idea/` and `.vscode/` are gitignored.

## Not set up
No test suite and no linter config beyond `next lint`.
