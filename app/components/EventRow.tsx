"use client";

import { EventType } from "@/types/types";
import React, { useState } from "react";
import Tag from "./Tag";
import { AnimatePresence } from "framer-motion";
import EventModal from "./EventModal";
import { formattedDate } from "@/utils/utils";

interface Props {
  event: EventType;
}

const EventRow = ({ event }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const formattedDateStr = formattedDate(
    event.date,
    "eeee, dd/MM/yyyy HH:mm'h'"
  );

  const close = () => setShowModal(false);
  const open = () => setShowModal(true);

  return (
    <div
      onClick={() => (showModal ? close() : open())}
      className="bg-gray-300 dark:bg-black rounded-lg dark:border dark:border-glow shadow-lg overflow-hidden mb-3 cursor-pointer touch:bg-gray-500"
    >
      <div className="flex">
        <div className="w-3/4 p-4">
          <div className="flex justify-between mb-2">
            <div className="w-1/2">
              <p className="font-bold text-gray-700 dark:text-glow">{formattedDateStr}</p>
            </div>
            <div className="w-1/2 text-right">
              <p className="md:text-2xl font-bold text-gray-700 dark:text-glow">
                {event.name}
              </p>
              <p className="text-gray-600"></p>
            </div>
          </div>
          <div className="h-10 flex items-center">
            {event.tags
              ? event.tags.map((tag, id) => {
                  return <Tag key={id} tag={tag} />;
                })
              : null}
          </div>
        </div>
        <div className="w-1/4 bg-gray-300 dark:bg-black text-gray-700 dark:text-glow px-2 py-4 text-right mr-2">
          <p className="text-gray-600 dark:text-glow">{event.location}</p>
          <p className=" font-bold">{event.price}</p>
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <EventModal setShowModal={setShowModal} event={event} />}
      </AnimatePresence>
    </div>
  );
};

export default EventRow;
