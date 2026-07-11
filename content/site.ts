/**
 * SITE CONFIG — edit this file to update the artist's info, contact address,
 * services, and links. No code changes required.
 */

export interface SocialLink {
  label: string;
  url: string;
  /** Icon key — see components/icons.tsx for supported values. */
  icon:
    | "instagram"
    | "soundcloud"
    | "youtube"
    | "spotify"
    | "applemusic"
    | "pandora"
    | "tiktok"
    | "email";
}

export interface Service {
  title: string;
  description: string;
  /** Icon key — see components/Services.tsx for supported values. */
  icon: "game" | "stream" | "custom";
}

export interface SiteConfig {
  name: string;
  tagline: string;
  /** Short line under the logo in the hero. */
  heroSubtitle: string;
  /** The kinds of work available to commission (Services section). */
  services: Service[];
  /** Multi-paragraph bio. Each string is one paragraph. */
  bio: string[];
  /** Where hire/commission inquiries should be sent. */
  contactEmail: string;
  /** City / region shown near the hire section (optional). */
  basedIn?: string;
  socials: SocialLink[];
  seo: {
    title: string;
    description: string;
    /** Absolute or root-relative URL to the OG image. */
    ogImage: string;
  };
}

export const site: SiteConfig = {
  name: "CRATERMUS",
  tagline: "Stories from music.",
  heroSubtitle:
    "Music producer & composer. I write original soundtracks and copyright-safe tracks that bring your story — your game, your stream, your project — to life.",
  services: [
    {
      icon: "game",
      title: "Game Soundtracks",
      description:
        "Original scores tuned to your game's world — themes, moods, and motifs that make players feel every moment.",
    },
    {
      icon: "stream",
      title: "Music for Streams & Content",
      description:
        "Copyright-safe tracks made just for you, so your streams and videos never get muted, flagged, or claimed.",
    },
    {
      icon: "custom",
      title: "Custom Commissions",
      description:
        "Films, trailers, ads, or something entirely new — bespoke music composed around your story and vision.",
    },
  ],
  bio: [
    "CRATERMUS is a music producer and composer who scores stories. Whether it's an original soundtrack for an indie game, copyright-safe music for a streamer, or a custom track for a creative project, the goal is the same: music that fits your world and makes people feel it.",
    "Every commission starts with your vision. I write, produce, and master original music built around the mood, pacing, and identity of your project — so the sound is unmistakably yours, and never a copyright headache.",
  ],
  contactEmail: "cratermus.music@gmail.com",
  socials: [
    { label: "YouTube", url: "https://www.youtube.com/channel/UCNkQaAKe-bqGwtSouu_FshA", icon: "youtube" },
    { label: "Spotify", url: "https://open.spotify.com/artist/0f26WRdsplzpGKUfbosN7Y", icon: "spotify" },
    { label: "Apple Music", url: "https://music.apple.com/us/artist/cratermus/1703497745", icon: "applemusic" },
    { label: "Pandora", url: "https://www.pandora.com/artist/cratermus/ARwj9jJJx4pp5c9", icon: "pandora" },
  ],
  seo: {
    title: "CRATERMUS — Music Producer & Composer",
    description:
      "CRATERMUS is a music producer and composer creating original soundtracks and copyright-safe music for indie games, streamers, and creative projects. Hire him to bring your story to life.",
    ogImage: "/logo.png",
  },
};
