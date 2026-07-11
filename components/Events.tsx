import { getUpcomingEvents } from "@/lib/events";

function formatDate(iso: string): { day: string; mon: string; year: string } {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return { day: "--", mon: "", year: "" };
  return {
    day: String(d.getDate()).padStart(2, "0"),
    mon: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    year: String(d.getFullYear()),
  };
}

export default function Events() {
  const upcoming = getUpcomingEvents();

  // Section is hidden entirely when there are no upcoming shows.
  if (upcoming.length === 0) return null;

  return (
    <section id="events" className="section">
      <div className="container-x">
        <div className="mb-12 text-center">
          <span className="eyebrow text-glitch-blue">Live</span>
          <h2 className="heading">Upcoming Shows</h2>
        </div>

        <ul className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {upcoming.map((e, i) => {
            const d = formatDate(e.date);
            return (
              <li
                key={`${e.date}-${i}`}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg border border-accent/40 bg-accent/5">
                    <span className="font-display text-2xl font-bold leading-none text-accent">
                      {d.day}
                    </span>
                    <span className="text-[10px] font-semibold tracking-widest text-muted">
                      {d.mon}
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold uppercase tracking-wide">
                      {e.name}
                    </p>
                    <p className="text-sm text-muted">
                      {e.venue} · {e.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:justify-end">
                  {e.status && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {e.status}
                    </span>
                  )}
                  {e.ticketUrl && (
                    <a
                      href={e.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !px-4 !py-2"
                    >
                      Tickets
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
