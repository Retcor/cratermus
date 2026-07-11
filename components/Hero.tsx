import Image from "next/image";
import { site } from "@/content/site";
import GlitchRule from "./GlitchRule";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient accent shapes echoing the logo's red slash and glitch split. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute right-10 top-1/2 h-56 w-56 rounded-full bg-glitch-blue/10 blur-[100px]" />
        <div className="absolute left-8 top-1/3 h-52 w-52 rounded-full bg-glitch-green/10 blur-[100px]" />
      </div>

      <div className="container-x flex min-h-[92vh] flex-col items-center justify-center py-28 text-center">
        <div className="mb-8 animate-fade-up">
          <Image
            src="/logo.png"
            alt={`${site.name} logo`}
            width={340}
            height={348}
            priority
            className="mx-auto h-56 w-auto drop-shadow-[0_0_40px_rgba(225,20,20,0.45)]"
          />
        </div>

        <h1 className="animate-fade-up font-display text-6xl font-bold uppercase leading-none tracking-tight sm:text-7xl md:text-8xl">
          {site.name}
        </h1>

        <p className="mt-4 animate-fade-up font-display text-lg uppercase tracking-[0.35em] text-accent">
          {site.tagline}
        </p>

        <GlitchRule className="mt-6 animate-fade-up" />

        <p className="mt-6 max-w-2xl animate-fade-up text-balance text-base text-muted sm:text-lg">
          {site.heroSubtitle}
        </p>

        <div className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row">
          <a href="#hire" className="btn-primary">
            Hire Me
          </a>
          <a href="#music" className="btn-ghost">
            Hear My Work
          </a>
        </div>
      </div>

      {/* Bottom fade into the page body. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg" />
    </section>
  );
}
