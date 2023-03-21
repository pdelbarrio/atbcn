import { EventType } from "@/types/types";
import React from "react";

interface Props {
  event: EventType;
}
const EventRow = ({ event }: Props) => {
  return (
    <div className="bg-white text-blue-500 border border-blue-500 p-2 mb-2 rounded-md shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="font-bold text-sm">{event.date}</div>
        <div className="font-bold text-sm">{event.name}</div>
        <div className="font-bold text-sm">{event.price}</div>
        <div className="text-sm">{event.location}</div>
        <div className="text-sm">{event.type}</div>
      </div>
    </div>
  );
};

export default EventRow;
