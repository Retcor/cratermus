import type { Platform, Track } from "@/content/music";

export interface ResolvedEmbed {
  platform: Platform;
  /** The iframe src to render. */
  embedUrl: string;
  /** Display title. */
  title: string;
  /** Original share URL, for a fallback "open on platform" link. */
  sourceUrl: string;
  /** Preferred iframe height in px (embeds have platform-specific sizes). */
  height: number;
  /** true for 16:9 video players (rendered with aspect ratio instead of fixed height). */
  isVideo: boolean;
}

/** Detect the platform from a raw URL when it isn't explicitly provided. */
export function detectPlatform(url: string): Platform | null {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("spotify.com")) return "spotify";
  if (u.includes("soundcloud.com")) return "soundcloud";
  return null;
}

/** Extract the YouTube video ID from the common URL shapes. */
function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1).split("/")[0] || null;
    }
    // youtube.com/watch?v=<id>
    const v = u.searchParams.get("v");
    if (v) return v;
    // youtube.com/embed/<id> or /shorts/<id> or /live/<id>
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.findIndex((p) =>
      ["embed", "shorts", "live", "v"].includes(p),
    );
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    return null;
  } catch {
    return null;
  }
}

/**
 * Build a Spotify embed URL for track/album/playlist/episode/show URLs.
 * open.spotify.com/track/ID -> open.spotify.com/embed/track/ID
 */
function spotifyEmbed(
  url: string,
): { embedUrl: string; height: number } | null {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    // Handle locale-prefixed paths like /intl-de/track/ID
    const typeIdx = parts.findIndex((p) =>
      ["track", "album", "playlist", "episode", "show", "artist"].includes(p),
    );
    if (typeIdx < 0 || !parts[typeIdx + 1]) return null;
    const type = parts[typeIdx];
    const id = parts[typeIdx + 1].split("?")[0];
    // Single tracks look best compact; collections are taller.
    const height = type === "track" || type === "episode" ? 152 : 380;
    return {
      embedUrl: `https://open.spotify.com/embed/${type}/${id}`,
      height,
    };
  } catch {
    return null;
  }
}

/** Build a SoundCloud player embed from any soundcloud.com track/set URL. */
function soundcloudEmbed(url: string): string {
  const params = new URLSearchParams({
    url,
    color: "#e11414",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    visual: "false",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

/**
 * Resolve a Track config entry into a renderable embed.
 * Returns null if the URL can't be understood (caller should skip it).
 */
export function resolveEmbed(track: Track): ResolvedEmbed | null {
  const platform = track.platform ?? detectPlatform(track.url);
  if (!platform) return null;

  const title = track.title?.trim() || defaultTitle(platform);
  const sourceUrl = track.url;

  switch (platform) {
    case "youtube": {
      const id = youtubeId(track.url);
      if (!id) return null;
      return {
        platform,
        title,
        sourceUrl,
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
        height: 0,
        isVideo: true,
      };
    }
    case "spotify": {
      const s = spotifyEmbed(track.url);
      if (!s) return null;
      return {
        platform,
        title,
        sourceUrl,
        embedUrl: s.embedUrl,
        height: s.height,
        isVideo: false,
      };
    }
    case "soundcloud": {
      return {
        platform,
        title,
        sourceUrl,
        embedUrl: soundcloudEmbed(track.url),
        height: 166,
        isVideo: false,
      };
    }
    default:
      return null;
  }
}

function defaultTitle(platform: Platform): string {
  switch (platform) {
    case "youtube":
      return "YouTube";
    case "spotify":
      return "Spotify";
    case "soundcloud":
      return "SoundCloud";
  }
}

/** Resolve all tracks, dropping any that fail to parse. Featured first. */
export function resolveTracks(tracks: Track[]): ResolvedEmbed[] {
  const resolved = tracks
    .map((t) => ({ track: t, embed: resolveEmbed(t) }))
    .filter((x): x is { track: Track; embed: ResolvedEmbed } => x.embed !== null)
    .sort((a, b) => Number(b.track.featured ?? false) - Number(a.track.featured ?? false))
    .map((x) => x.embed);
  return resolved;
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  youtube: "YouTube",
  spotify: "Spotify",
  soundcloud: "SoundCloud",
};
