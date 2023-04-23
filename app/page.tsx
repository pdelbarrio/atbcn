import supabase from "@/utils/supabase";
import EventList from "./components/EventList";
import { EventType } from "@/types/types";

export const revalidate = 60;

async function getData(): Promise<EventType[]> {
  const currentDate = new Date();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .gt("date", currentDate.toISOString())
    .order("date", { ascending: true });

  if (events === null) {
    return [];
  }

  return events;
}

export default async function Home() {
  const events = await getData();

  return (
    <div className="max-w-screen-sm mx-auto px-4">
      <EventList events={events} />
    </div>
  );
}
