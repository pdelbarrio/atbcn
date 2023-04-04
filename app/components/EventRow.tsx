import { EventType } from "@/types/types";
import React from "react";

interface Props {
  event: EventType;
}
const EventRow = ({ event }: Props) => {
  return (
    <div className="bg-gray-300 rounded-lg shadow-lg overflow-hidden mb-2">
      <div className="flex">
        <div className="w-3/4 p-4">
          <div className="flex justify-between mb-2">
            <div className="w-1/2">
              <p className="font-bold text-gray-700">{event.date}</p>
              <p className="text-gray-600">21:00h</p>
            </div>
            <div className="w-1/2 text-right">
              <p className="font-bold text-gray-700">{event.name}</p>
              <p className="text-gray-600"></p>
            </div>
          </div>
          <div className="h-10 flex items-center">
            <span className="px-2 py-1 bg-gray-600 rounded-full text-xs font-semibold text-white mr-2">
              Musica
            </span>
            <span className="px-2 py-1 bg-gray-600 rounded-full text-xs font-semibold text-white  mr-2">
              Metal
            </span>
            <span className="px-2 py-1 bg-gray-600 rounded-full text-xs font-semibold text-white ">
              Electronica
            </span>
          </div>
        </div>
        <div className="w-1/4 bg-gray-300 text-gray-700 p-4 text-center">
          <p className="text-gray-600">{event.location}</p>
          <p className="text-2xl font-bold">{event.price}</p>
        </div>
      </div>
    </div>
  );
};

export default EventRow;
