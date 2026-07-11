import Image from "next/image";
import { site } from "@/content/site";
import GlitchRule from "./GlitchRule";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x grid items-center gap-12 md:grid-cols-2">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -left-4 -top-4 -z-10 h-40 w-40 rounded-full bg-glitch-green/10 blur-2xl" />
          <div className="absolute -bottom-4 -right-4 -z-10 h-40 w-40 rounded-full bg-glitch-blue/10 blur-2xl" />
          <div className="absolute -inset-3 -z-10 rounded-2xl bg-accent/10 blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-line bg-surface p-8">
            <Image
              src="/logo.jpg"
              alt={`${site.name} logo`}
              width={320}
              height={320}
              className="chromatic mx-auto rounded-xl ring-1 ring-accent/30"
            />
          </div>
        </div>

        <div>
          <span className="eyebrow text-glitch-green">About</span>
          <h2 className="heading">{site.name}</h2>
          <GlitchRule className="mt-5" />
          <div className="mt-6 space-y-4 text-muted">
            {site.bio.map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          <a href="#booking" className="btn-primary mt-8">
            Book a Set
          </a>
        </div>
      </div>
    </section>
  );
}
