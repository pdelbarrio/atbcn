"use client";

import React, { useState } from "react";
import { startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";
import { EventType } from "@/types/types";
import { formattedDate } from "@/utils/utils";
import EventRow from "./EventRow";

interface Props {
  events: EventType[];
}

export default function EventList({ events }: Props) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const currentWeekStart = startOfWeek(currentWeek);
  const currentWeekEnd = endOfWeek(currentWeek);

  const eventsThisWeek = events.filter((event: EventType) => {
    const eventDate = new Date(event.date);
    return eventDate >= currentWeekStart && eventDate <= currentWeekEnd;
  });

  const isFirstWeek =
    currentWeekStart.getTime() === startOfWeek(new Date()).getTime();

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const previousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  return (
    <>
      <div className="bg-gray-300 rounded-lg shadow-lg overflow-hidden mb-3 text-center py-2">
        <p className="text-gray-800 font-bold">
          del {formattedDate(currentWeekStart.toISOString(), "d MMMM")} al{" "}
          {formattedDate(currentWeekEnd.toISOString(), "d MMMM, yyyy")}
        </p>
      </div>
      <div>
        {eventsThisWeek.length > 0 ? (
          <div>
            {eventsThisWeek.map((event) => (
              <EventRow event={event} key={event.id} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-300 rounded-lg shadow-lg overflow-hidden mb-3">
            <p className="text-center p-10 text-gray-800 font-bold">
              No hay eventos introducidos para esta semana
            </p>
          </div>
        )}
      </div>
      <div className="max-w-screen-sm mx-auto px-4">
        <div className="flex justify-between py-4">
          <button
            className="bg-gray-300 text-gray-800 font-bold p-2 px-4 rounded"
            onClick={previousWeek}
            disabled={isFirstWeek}
          >
            {isFirstWeek ? "estás al principio" : "semana previa"}
          </button>

          <button
            className="bg-gray-300 text-gray-800 font-bold p-2 px-4 rounded"
            onClick={nextWeek}
          >
            semana siguiente
          </button>
        </div>
      </div>
    </>
  );
}
