"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { hasUpcomingEvents } from "@/lib/events";

// "Events" only appears when there are upcoming shows in content/events.ts;
// otherwise the link would jump nowhere (the section auto-hides when empty).
const NAV = [
  { label: "Services", href: "#services" },
  { label: "Music", href: "#music" },
  { label: "About", href: "#about" },
  ...(hasUpcomingEvents ? [{ label: "Events", href: "#events" }] : []),
  { label: "Hire", href: "#hire" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt={`${site.name} logo`}
            width={340}
            height={348}
            className="h-6 w-auto"
            priority
          />
          <span className="font-display text-lg font-bold uppercase tracking-widest">
            {site.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wider text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a href="#hire" className="btn-primary !px-4 !py-2">
            Hire Me
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg/95 px-5 py-4 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium uppercase tracking-wider text-muted hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
