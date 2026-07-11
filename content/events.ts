/**
 * EVENTS CONFIG — upcoming gigs / tour dates.
 *
 * Add shows here and they'll appear in the Events section, sorted by date.
 * Past events (date before today) are hidden automatically.
 * If this list is empty, the Events section is not shown at all.
 *
 * date format: "YYYY-MM-DD"
 */

export interface EventItem {
  date: string;
  name: string;
  venue: string;
  city: string;
  /** Optional link to buy tickets / RSVP. */
  ticketUrl?: string;
  /** Optional label, e.g. "Sold Out", "Free". */
  status?: string;
}

export const events: EventItem[] = [
  // Example entries — replace with real shows:
  // {
  //   date: "2026-08-15",
  //   name: "Warehouse Sessions",
  //   venue: "The Foundry",
  //   city: "Brooklyn, NY",
  //   ticketUrl: "https://example.com/tickets",
  // },
];
