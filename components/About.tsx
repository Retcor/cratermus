import Image from "next/image";
import { site } from "@/content/site";
import GlitchRule from "./GlitchRule";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x grid items-center gap-12 md:grid-cols-2">
        <div className="relative mx-auto flex w-full max-w-sm items-center justify-center py-6">
          <div className="absolute -left-4 -top-4 -z-10 h-40 w-40 rounded-full bg-glitch-green/10 blur-2xl" />
          <div className="absolute -bottom-4 -right-4 -z-10 h-40 w-40 rounded-full bg-glitch-blue/10 blur-2xl" />
          <div className="absolute inset-6 -z-10 rounded-full bg-accent/10 blur-3xl" />
          <Image
            src="/logo.png"
            alt={`${site.name} logo`}
            width={340}
            height={348}
            className="h-auto w-full max-w-[260px] drop-shadow-[0_0_36px_rgba(225,20,20,0.4)]"
          />
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
          <a href="#hire" className="btn-primary mt-8">
            Hire Me
          </a>
        </div>
      </div>
    </section>
  );
}
