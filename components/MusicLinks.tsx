import { site } from "@/content/site";
import { SocialIcon } from "./icons";

/**
 * Row of streaming-platform links (from site.socials) framed as "go listen to
 * more music" rather than contact methods. Icons alternate a light blue / green
 * glitch tint on hover to tie into the accent palette. Reused in the Music and
 * Booking sections.
 */
export default function MusicLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {site.socials.map((s, i) => {
        const hover =
          i % 2 === 0
            ? "hover:border-glitch-blue hover:text-glitch-blue"
            : "hover:border-glitch-green hover:text-glitch-green";
        return (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} — listen`}
            title={s.label}
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors ${hover}`}
          >
            <SocialIcon name={s.icon} />
          </a>
        );
      })}
    </div>
  );
}
