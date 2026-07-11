import Image from "next/image";
import { site } from "@/content/site";
import { SocialIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-center gap-6 py-12 sm:flex-row sm:justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt={`${site.name} logo`}
            width={340}
            height={348}
            className="h-6 w-auto"
          />
          <span className="font-display text-base font-bold uppercase tracking-widest">
            {site.name}
          </span>
        </a>

        <div className="flex gap-3">
          {site.socials.map((s, i) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={`text-muted transition-colors ${
                i % 2 === 0
                  ? "hover:text-glitch-blue"
                  : "hover:text-glitch-green"
              }`}
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
