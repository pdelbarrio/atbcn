export default function Home() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const data = await getData(weekOffset);
      setEvents(data);
    }
    fetchEvents();
  }, [weekOffset]);

  function handlePrevWeek() {
    setWeekOffset((prev) => prev - 1);
  }

  function handleNextWeek() {
    setWeekOffset((prev) => prev + 1);
  }

  return (
    <div className="max-w-screen-sm mx-auto px-4">
      <div className="flex justify-between my-4">
        <button onClick={handlePrevWeek}>Prev Week</button>
        <button onClick={handleNextWeek}>Next Week</button>
      </div>
      {events.length > 0 ? (
        events.map((event) => <EventRow key={event.id} event={event} />)
      ) : (
        <p>No events to display for this week.</p>
      )}
    </div>
  );
}
