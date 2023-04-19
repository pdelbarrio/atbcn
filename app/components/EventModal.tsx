import { EventType } from "@/types/types";
import { motion } from "framer-motion";
import Tag from "./Tag";
import { ClockIcon, LinkIcon, LocationIcon, TicketIcon } from "./Icons";
import { formattedDate } from "@/utils/utils";

interface Props {
  setShowModal: (newValue: boolean) => void;
  event: EventType;
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const defaultPoster =
  "https://res.cloudinary.com/getoutbcn/image/upload/v1680721784/samples/poster_sh7xqa.jpg";

const EventModal = ({ setShowModal, event }: Props) => {
  const formattedDateStr = formattedDate(event.date);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 bottom-0 right-0 h-full w-full bg-black bg-opacity-50 z-20"
      onClick={() => setShowModal(false)}
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative top-20 m-auto max-w-full md:max-w-3xl bg-gray-300 p-4 md:p-8 rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">{event.name}</h2>
        </div>

        <div className="mt-6">
          <div className="flex items-start">
            <div className="w-2/3 pr-4">
              <p className="text-gray-700 text-base">{event.description}</p>
              <div className="mt-4">
                <div className="flex flex-wrap mb-4">
                  <div className="h-10 flex items-center">
                    {event.tags
                      ? event.tags.map((tag, id) => {
                          return <Tag key={id} tag={tag} />;
                        })
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <img
                className="w-full rounded-lg"
                src={event.poster ? event.poster : defaultPoster}
                alt={event.name}
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center">
              <LocationIcon />
              <p className="ml-2 text-gray-700 text-sm">{event.location}</p>
            </div>
            <div className="flex items-center mt-2">
              <ClockIcon />
              <p className="ml-2 text-gray-700 text-sm">{formattedDateStr}</p>
            </div>
            <div className="flex items-center mt-2">
              <TicketIcon />
              <p className="ml-2 text-gray-700 text-sm">{event.price}</p>
            </div>
            {event.link && (
              <div className="flex items-center mt-2">
                <LinkIcon />

                <p className="ml-2 text-gray-700 text-sm">
                  <a href={event.link} target="_blank">
                    Link of the event
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
