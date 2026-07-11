import type { ReactElement, SVGProps } from "react";
import { site, type Service } from "@/content/site";
import GlitchRule from "./GlitchRule";

type IconProps = SVGProps<SVGSVGElement>;

const iconBase = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function GameIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <path d="M6 11h4M8 9v4" />
      <path d="M15.5 11.5h.01M18 9.5h.01" />
      <path d="M17.5 6H8a5 5 0 0 0-5 4.5l-.9 5.6A2.5 2.5 0 0 0 4.6 19c1 0 1.6-.5 2.2-1.2l.9-1.1a2 2 0 0 1 1.6-.7h5.4a2 2 0 0 1 1.6.7l.9 1.1c.6.7 1.2 1.2 2.2 1.2a2.5 2.5 0 0 0 2.5-2.9l-.9-5.6A5 5 0 0 0 17.5 6Z" />
    </svg>
  );
}

function StreamIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4" />
      <path d="M5 5a10 10 0 0 0 0 14M19 19a10 10 0 0 0 0-14" />
    </svg>
  );
}

function CustomIcon(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="16" cy="16" r="2.5" />
      <path d="M19 3.5 19.6 5l1.5.6-1.5.6L19 7.7l-.6-1.5L16.9 5.6 18.4 5 19 3.5Z" />
    </svg>
  );
}

const ICONS: Record<Service["icon"], (p: IconProps) => ReactElement> = {
  game: GameIcon,
  stream: StreamIcon,
  custom: CustomIcon,
};

export default function Services() {
  const services = site.services;
  if (services.length === 0) return null;

  return (
    <section id="services" className="section">
      <div className="container-x">
        <div className="mb-12 text-center">
          <span className="eyebrow text-glitch-green">What I Make</span>
          <h2 className="heading">Music for Your Story</h2>
          <GlitchRule className="mt-5" />
          <p className="mx-auto mt-5 max-w-xl text-muted">
            Original, made-to-order music — no stock libraries, no copyright
            strikes, just a sound that&apos;s yours.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = ICONS[s.icon] ?? CustomIcon;
            return (
              <div
                key={s.title}
                className="card group p-6 transition-colors hover:border-accent/50"
              >
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent transition-colors group-hover:border-accent/60">
                  <Icon />
                </span>
                <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a href="#hire" className="btn-primary">
            Start a Project
          </a>
        </div>
      </div>
    </section>
  );
}
