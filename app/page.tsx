import EventRow from "./components/EventRow";
import supabase from "@/utils/supabase";
// import { events } from "../data/mockEvents";

async function getData() {
  const { data: events, error } = await supabase.from("Event").select();

  return events;
}

export default async function Home() {
  const events = await getData();
  return (
    <div className="max-w-screen-sm mx-auto px-4">
      {events?.map((event) => (
        <EventRow key={event.id} event={event} />
      ))}
    </div>
  );
}
