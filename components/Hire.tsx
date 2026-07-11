import { site } from "@/content/site";
import { SocialIcon } from "./icons";
import GlitchRule from "./GlitchRule";
import MusicLinks from "./MusicLinks";

export default function Hire() {
  const subject = encodeURIComponent(`Project inquiry — ${site.name}`);
  const bodyLines = [
    "Hi,",
    "",
    "I'd like to commission original music. Here are the details:",
    "",
    "• Project type (game / stream / film / ad / other):",
    "• About the project:",
    "• What you need (a track, full soundtrack, theme, etc.):",
    "• Mood / references:",
    "• Where the music will be used:",
    "• Deadline:",
    "• Budget:",
    "",
    "Thanks!",
  ].join("\n");
  const mailto = `mailto:${site.contactEmail}?subject=${subject}&body=${encodeURIComponent(
    bodyLines,
  )}`;

  return (
    <section id="hire" className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-glitch-blue/10 blur-3xl"
          />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="eyebrow">Hire</span>
              <h2 className="heading">
                Bring your story to life with{" "}
                <span className="text-accent">CRATERMUS</span>
              </h2>
              <GlitchRule className="mt-5" />
              <p className="mt-5 max-w-md text-muted">
                Working on a game, a stream, a film, or anything that needs its
                own sound? Tell me about it and let&apos;s create something
                original — made for you, and cleared for you.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <a href={mailto} className="btn-primary w-full">
                <SocialIcon name="email" width={18} height={18} />
                Email to Hire
              </a>

              <div className="text-center">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                  Hear more on
                </p>
                <MusicLinks />
              </div>

              <p className="text-center text-sm text-muted">
                Direct:{" "}
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="font-medium text-ink underline decoration-accent/50 underline-offset-4 hover:text-accent"
                >
                  {site.contactEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
