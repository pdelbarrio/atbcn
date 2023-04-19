import { EventType } from "@/types/types";
import EventRow from "./components/EventRow";
import supabase from "@/utils/supabase";
import { sortEventsByDateAndHour } from "@/utils/utils";

export const revalidate = 60;

async function getData(): Promise<EventType[]> {
  const { data: events } = await supabase.from("events").select();

  const sortedEvents = events ? sortEventsByDateAndHour(events) : [];

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
