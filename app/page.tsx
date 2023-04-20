import { EventType } from "@/types/types";
import EventRow from "./components/EventRow";
import supabase from "@/utils/supabase";
import { sortEventsByDateAndHour } from "@/utils/utils";

export const revalidate = 60;

async function getData(weekOffset: number = 0): Promise<EventType[]> {
  const { data: events } = await supabase.from("events").select();

  const currentDate = new Date();
  const currentWeekStart =
    currentDate.getTime() + weekOffset * 7 * 24 * 60 * 60 * 1000;
  const currentWeekEnd = currentWeekStart + 7 * 24 * 60 * 60 * 1000;

  const filteredEvents = (events ?? []).filter((event) => {
    const eventDate = new Date(event.date);
    const eventTime = eventDate.getTime();
    return eventTime >= currentWeekStart && eventTime < currentWeekEnd;
  });
  const sortedEvents = sortEventsByDateAndHour(
    filteredEvents,
    currentDate,
    weekOffset
  );

  return sortedEvents;
}

export default async function Home() {
  const events = await getData();
  console.log("events", events);

  return (
    <div className="max-w-screen-sm mx-auto px-4">
      {events ? (
        events.map((event) => <EventRow key={event.id} event={event} />)
      ) : (
        <p>no events to display at this time</p>
      )}
    </div>
  );
}
