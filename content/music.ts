/**
 * MUSIC CONFIG — this is the "properties file" for the site's player.
 *
 * To add a song/mix: copy a share URL from YouTube, Spotify, or SoundCloud
 * and add an entry below. The site figures out the platform and renders a
 * playable embed automatically — no other code changes needed.
 *
 * Supported `platform` values: "youtube" | "spotify" | "soundcloud"
 *   - You can also omit `platform` and it will be auto-detected from the URL.
 *
 * Optional fields:
 *   - title:    display name (falls back to a generic label if omitted)
 *   - featured: set true to spotlight one track at the top of the section
 *
 * Example URLs that work:
 *   YouTube:    https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *               https://youtu.be/dQw4w9WgXcQ
 *   Spotify:    https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT
 *               https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
 *   SoundCloud: https://soundcloud.com/artist/track-name
 */

export type Platform = "youtube" | "spotify" | "soundcloud";

export interface Track {
  title?: string;
  url: string;
  platform?: Platform;
  featured?: boolean;
}

export const tracks: Track[] = [
  {
    title: "The Call",
    url: "https://youtu.be/0OyEKls3RE4?si=fsCfWWsWp7YeSTHG",
    featured: true,
  },
  {
    title: "Forgetting Cynthia",
    url: "https://youtu.be/KaZEpw5eJDU?si=JY0Z_N9gcEIGKBRo",
  },
  {
    title: "The Dawn of Time",
    url: "https://youtu.be/NU3ltIV0eW8?si=bcvMdoBD7JWYRaB5",
  },
  {
    title: "Infinite Echoes",
    url: "https://youtu.be/XSnea8Ur-B4?si=wpNesYCyGGBXdYCI",
  },
];
