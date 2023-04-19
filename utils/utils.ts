import { EventType } from "@/types/types";

export function sortEventsByDateAndHour(events: EventType[]): EventType[] {
  return events.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA.getTime() === dateB.getTime()) {
      // If the events occur on the same day, sort by hour
      const hourA = dateA.getHours();
      const hourB = dateB.getHours();
      return hourA - hourB;
    } else {
      // Otherwise, sort by date
      return dateA.getTime() - dateB.getTime();
    }
  });
}

export function formattedDate(date: string): string {
  const eventDate = new Date(date);
  const options = {
    dateStyle: "long" as const,
    timeStyle: "short" as const,
    // timeZone: "Europe/Madrid",
  };
  const formatter = new Intl.DateTimeFormat("es-ES", options);
  return formatter.format(eventDate);
}
