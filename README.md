# CRATERMUS

Official website for the DJ **CRATERMUS** — a music showcase and booking site.
Built with Next.js (App Router) + TypeScript + Tailwind CSS, containerized for
Google Cloud Run.

The design follows the logo: a deep-black base with a crimson-red accent.

---

## ✏️ Editing content (no coding required)

All content the DJ cares about lives in the [`content/`](content/) folder. Edit
these files, then redeploy (see below) to publish changes.

| File | What it controls |
| --- | --- |
| [`content/music.ts`](content/music.ts) | **The music player.** Paste YouTube / Spotify / SoundCloud share URLs here and they render as playable embeds automatically. |
| [`content/site.ts`](content/site.ts) | DJ name, tagline, bio, booking email, and social links. |
| [`content/events.ts`](content/events.ts) | Upcoming shows / tour dates. Leave it empty to hide the Events section. |

### Adding a song or mix

Open [`content/music.ts`](content/music.ts) and add an entry to the `tracks`
array with a share URL — that's it:

```ts
export const tracks: Track[] = [
  { title: "Summer Festival Set", url: "https://youtu.be/XXXXXXXX", featured: true },
  { title: "New Single",          url: "https://open.spotify.com/track/XXXX" },
  { title: "Late Night Mix",      url: "https://soundcloud.com/cratermus/late-night" },
];
```

- **Platform is auto-detected** from the URL. (You can force it with
  `platform: "youtube" | "spotify" | "soundcloud"` if ever needed.)
- `title` is optional; `featured: true` spotlights one track at the top.
- Supported URL shapes: `youtube.com/watch?v=`, `youtu.be/`, YouTube Shorts/Live,
  Spotify `track`/`album`/`playlist`/`episode`, and any `soundcloud.com/...` link.

---

## 🧑‍💻 Local development

Requires Node 18+ (Node 22 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build check:

```bash
npm run build && npm start
```

---

## 🐳 Docker

The `Dockerfile` produces a small, standalone image and honors the `PORT`
environment variable (Cloud Run sets this; defaults to `8080`).

```bash
docker build -t cratermus .
docker run -p 8080:8080 -e PORT=8080 cratermus
```

Open http://localhost:8080.

---

## ☁️ Deploy to Google Cloud

For changes, build the image from either the server or client folder where the Dockerfile is: `docker build -t us-docker.pkg.dev/<kubernetes-project-id>/web/<image-name>:<version> .`

Push the image up to Google Registry. This requires access to the gcloud project and gcloud authorization as well as
docker config settings updated to communicate with that project. To switch projects do: `gcloud config set project cratermus` 
and then deploy with: `docker push us-docker.pkg.dev/<kubernetes-project-id>/web/<image-name>:<version>`

---

## 📁 Project structure

```
app/                 Next.js App Router (layout, page, global styles)
components/          UI: Header, Hero, Services, MusicSection, EmbedPlayer, About, Events, Hire, Footer
content/             ← edit these: site.ts, music.ts, events.ts
lib/embeds.ts        Turns share URLs into platform embeds
public/logo.png      Logo (also used for favicon + social share image)
Dockerfile           Multi-stage build for Cloud Run
```

---

## 🔮 Future ideas (not built yet)

- Booking **form** with email delivery (via a Next.js API route or a service
  like Formspree/Resend) — the UI is structured to drop this in.
- Mailing-list signup.
- Press kit / EPK download and a photo gallery.
- Headless CMS for content editing without redeploys.
```
