import EventRow from "./components/EventRow";
import { events } from "../data/mockEvents";

export default function Home() {
  return (
    <div className="max-w-screen-sm mx-auto px-4">
      {events.map((event) => (
        <EventRow key={event.id} event={event} />
      ))}
    </div>
  );
}
