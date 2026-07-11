import { tracks } from "@/content/music";
import { resolveTracks } from "@/lib/embeds";
import EmbedPlayer from "./EmbedPlayer";
import GlitchRule from "./GlitchRule";
import MusicLinks from "./MusicLinks";

export default function MusicSection() {
  const embeds = resolveTracks(tracks);

  // A full-width featured player only looks balanced when the total count is odd
  // (it takes its own row, leaving an even number to fill the 2-column grid).
  // With an even count, keep every card equal so none sits alone at the bottom.
  const spanFeatured = tracks.some((t) => t.featured) && embeds.length % 2 === 1;

  return (
    <section id="music" className="section">
      <div className="container-x">
        <div className="mb-12 text-center">
          <span className="eyebrow text-glitch-blue">Listen</span>
          <h2 className="heading">The Music</h2>
          <GlitchRule className="mt-5" />
          <p className="mx-auto mt-5 max-w-xl text-muted">
            Original tracks and mixes. Hit play and dig in.
          </p>
        </div>

        {embeds.length === 0 ? (
          <p className="text-center text-muted">
            Music coming soon — check back shortly.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {embeds.map((embed, i) => (
              <EmbedPlayer
                key={`${embed.platform}-${embed.embedUrl}-${i}`}
                embed={embed}
                featured={i === 0 && spanFeatured}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
            Hear more on
          </p>
          <MusicLinks />
        </div>
      </div>
    </section>
  );
}
