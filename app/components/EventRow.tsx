import { EventType } from "@/types/types";
import React from "react";
import Tag from "./Tag";

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
              {/* <p className="text-gray-600">21:00h</p> */}
            </div>
            <div className="w-1/2 text-right">
              <p className="text-2xl font-bold text-gray-700">{event.name}</p>
              <p className="text-gray-600"></p>
            </div>
          </div>
          <div className="h-10 flex items-center">
            {event.tags
              ? event.tags.map((tag) => {
                  return <Tag tag={tag} />;
                })
              : null}
          </div>
        </div>
        <div className="w-1/4 bg-gray-300 text-gray-700 p-4 text-center">
          <p className="text-gray-600">{event.location}</p>
          <p className=" font-bold">{event.price}</p>
        </div>
      </div>
    </div>
  );
};

export default EventRow;
