/**
 * Small decorative divider made of three offset bars in the brand red plus the
 * light green/blue "glitch" accents — a subtle nod to the logo's RGB split.
 * Purely visual, so it's hidden from assistive tech.
 */
export default function GlitchRule({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center gap-1 ${className}`}
    >
      <span className="h-[3px] w-9 rounded-full bg-accent" />
      <span className="h-[3px] w-4 -translate-y-[3px] rounded-full bg-glitch-green" />
      <span className="h-[3px] w-6 translate-y-[3px] rounded-full bg-glitch-blue" />
    </span>
  );
}
