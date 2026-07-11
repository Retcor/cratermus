import Image from "next/image";
import { site } from "@/content/site";
import { SocialIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-center gap-6 py-12 sm:flex-row sm:justify-between">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt={`${site.name} logo`}
            width={32}
            height={32}
            className="rounded-md ring-1 ring-line"
          />
          <span className="font-display text-base font-bold uppercase tracking-widest">
            {site.name}
          </span>
        </a>

        <div className="flex gap-3">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-muted transition-colors hover:text-accent"
            >
              <SocialIcon name={s.icon} />
            </a>
          ))}
        </div>

        <p className="text-xs text-muted">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
