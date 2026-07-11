import { events, type EventItem } from "@/content/events";

/** Return YYYY-MM-DD for "today" in local time. */
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Upcoming shows (today or later), sorted soonest-first. Empty when none. */
export function getUpcomingEvents(): EventItem[] {
  const today = todayISO();
  return events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Whether the Events section/nav should be shown. Both the Header nav and the
 * Events section rely on this so they never disagree.
 */
export const hasUpcomingEvents = getUpcomingEvents().length > 0;
