import { site } from "@/content/site";
import { SocialIcon } from "./icons";
import GlitchRule from "./GlitchRule";
import MusicLinks from "./MusicLinks";

export default function Booking() {
  const subject = encodeURIComponent(`Booking inquiry — ${site.name}`);
  const bodyLines = [
    "Hi,",
    "",
    "I'd like to book CRATERMUS. Details:",
    "",
    "• Event type (party / festival / club):",
    "• Date:",
    "• Location / venue:",
    "• Expected crowd size:",
    "• Set length:",
    "• Budget:",
    "",
    "Thanks!",
  ].join("\n");
  const mailto = `mailto:${site.bookingEmail}?subject=${subject}&body=${encodeURIComponent(
    bodyLines,
  )}`;

  return (
    <section id="booking" className="section">
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
              <span className="eyebrow">Booking</span>
              <h2 className="heading">
                Make new stories with{" "}
                <span className="text-accent">CRATERMUS</span> as your DJ
              </h2>
              <GlitchRule className="mt-5" />
              <p className="mt-5 max-w-md text-muted">
                Available for parties, clubs, and festivals. Send the details
                and let&apos;s write the next one together.
              </p>
              {site.basedIn && (
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-muted">
                  {site.basedIn}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <a href={mailto} className="btn-primary w-full">
                <SocialIcon name="email" width={18} height={18} />
                Email to Book
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
                  href={`mailto:${site.bookingEmail}`}
                  className="font-medium text-ink underline decoration-accent/50 underline-offset-4 hover:text-accent"
                >
                  {site.bookingEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
