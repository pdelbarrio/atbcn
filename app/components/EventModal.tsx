import { EventType } from "@/types/types";
import { motion } from "framer-motion";

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

const EventModal = ({ setShowModal, event }: Props) => {
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
        <h3 className="text-lg md:text-2xl text-black font-bold mb-2 md:mb-4">
          {event.name}
        </h3>
        <p className="text-base md:text-lg text-black mb-2 md:mb-4"></p>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
