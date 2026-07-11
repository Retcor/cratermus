/**
 * SITE CONFIG — edit this file to update the DJ's info, booking contact,
 * and social links. No code changes required.
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

export interface SiteConfig {
  name: string;
  tagline: string;
  /** Short line under the logo in the hero. */
  heroSubtitle: string;
  /** Multi-paragraph bio. Each string is one paragraph. */
  bio: string[];
  /** Where booking inquiries should be sent. */
  bookingEmail: string;
  /** City / region shown near booking (optional). */
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
    "DJ · Producer · Selector — bringing deep cuts and heavy energy to parties and festivals.",
  bio: [
    "CRATERMUS is a DJ and producer digging through genres to build sets that move a room from the first drop to the last record. From intimate warehouse nights to festival main stages, the focus is the same: energy, flow, and tracks you won't hear anywhere else.",
    "Rooted in crate-digging culture, every set blends the familiar with the unearthed — a mix of originals, edits, and rare finds tuned to the moment and the crowd.",
  ],
  bookingEmail: "cratermus.music@gmail.com",
  socials: [
    { label: "YouTube", url: "https://www.youtube.com/channel/UCNkQaAKe-bqGwtSouu_FshA", icon: "youtube" },
    { label: "Spotify", url: "https://open.spotify.com/artist/0f26WRdsplzpGKUfbosN7Y", icon: "spotify" },
    { label: "Apple Music", url: "https://music.apple.com/us/artist/cratermus/1703497745", icon: "applemusic" },
    { label: "Pandora", url: "https://www.pandora.com/artist/cratermus/ARwj9jJJx4pp5c9", icon: "pandora" },
  ],
  seo: {
    title: "CRATERMUS — DJ & Producer",
    description:
      "Official site of CRATERMUS — DJ and producer. Listen to tracks and mixes, and book him for your party or festival.",
    ogImage: "/logo.jpg",
  },
};
