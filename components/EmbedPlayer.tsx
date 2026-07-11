"use client";

import { useState } from "react";
import type { ResolvedEmbed } from "@/lib/embeds";
import { PLATFORM_LABELS } from "@/lib/embeds";
import { SocialIcon } from "./icons";

const PLATFORM_ICON = {
  youtube: "youtube",
  spotify: "spotify",
  soundcloud: "soundcloud",
} as const;

/**
 * Renders a platform embed. To keep the page fast, embeds are not mounted
 * until the user clicks play (a lightweight "facade"). Video (YouTube) uses a
 * 16:9 box; audio embeds (Spotify/SoundCloud) use their native height.
 */
export default function EmbedPlayer({
  embed,
  featured = false,
}: {
  embed: ResolvedEmbed;
  featured?: boolean;
}) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`card group overflow-hidden transition-shadow hover:shadow-glow-sm ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="text-accent">
            <SocialIcon name={PLATFORM_ICON[embed.platform]} />
          </span>
          <span className="truncate text-sm font-medium text-ink">
            {embed.title}
          </span>
        </div>
        <a
          href={embed.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted transition-colors hover:text-accent"
        >
          {PLATFORM_LABELS[embed.platform]} ↗
        </a>
      </div>

      {embed.isVideo ? (
        <div className="relative aspect-video w-full bg-black">
          {active ? (
            <iframe
              src={`${embed.embedUrl}&autoplay=1`}
              title={embed.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <Facade label={embed.title} onClick={() => setActive(true)} />
          )}
        </div>
      ) : active ? (
        <iframe
          src={embed.embedUrl}
          title={embed.title}
          className="w-full"
          style={{ height: embed.height }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <div style={{ height: embed.height }} className="relative bg-surface-2">
          <Facade label={embed.title} onClick={() => setActive(true)} />
        </div>
      )}
    </div>
  );
}

function Facade({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Play ${label}`}
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-2 to-surface transition-colors hover:from-surface hover:to-surface-2"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-chromatic transition-transform group-hover:scale-105">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
