"use client";

import { motion } from "framer-motion";
import Tag from "./Tag";
import { ClockIcon, LinkIcon, LocationIcon, TicketIcon } from "./Icons";
import { useGlobalContext } from "../context/events.context";
import { useRouter } from "next/navigation";

import { formattedDate } from "@/utils/utils";
import { ToastContainer } from "react-toastify";
import { setErrorToast, setSuccessToast } from "@/utils/toasts";

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

const PreviewModal = () => {
  const router = useRouter();
  const {
    previewEvent,
    setPreviewEvent,
    setShowModal,
    uploadedPoster,
    setUploadedPoster,
    setTags,
    supabase,
  } = useGlobalContext();

  const formattedDateStr = previewEvent?.date
    ? formattedDate(previewEvent.date, "PPPPp")
    : "";

  async function postEvent() {
    try {
      const { data, error } = await supabase.from("events").insert([
        {
          name: previewEvent?.name,
          date: previewEvent?.date,
          tags: previewEvent?.tags,
          location: previewEvent?.location,
          price: previewEvent?.price,
          description: previewEvent?.description,
          poster: uploadedPoster,
          link: previewEvent?.link,
          created_by: previewEvent?.created_by,
          validated: true, //FIXME: Temporalmente a true solo en desarrollo
          completed: false,
        },
      ]);

      if (error) {
        throw new Error("Error inserting data into database.");
      }
      setUploadedPoster(null);
      setPreviewEvent(null);
      setTags([]);
      setSuccessToast("Evento creado correctamente");
      router.push("/");
      return "Data inserted successfully!";
    } catch (error) {
      setErrorToast(
        "Error al crear el evento vuelve a intentarlo en unos minutos"
      );
      throw error;
    }
  }

  const handleConfirm = async () => {
    try {
      const result = await postEvent();

      setShowModal(false);

      // Mensaje informativo con toaster. Se ha enviado a validación blabla (AUN NO)
    } catch (error) {
      setShowModal(false);
      // handle error here

      // Mensaje informativo de error con toaster.
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {previewEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 bottom-0 right-0 h-full w-full bg-black bg-opacity-50 z-20"
        >
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative top-20 m-auto max-w-full md:max-w-3xl bg-gray-300 dark:bg-black dark:border dark:border-glow  p-4 md:p-8 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-glow">
                {previewEvent.name}
              </h2>
            </div>

            <div className="mt-6">
              <div className="flex items-start">
                <div className="w-2/3 pr-4">
                  <p className="text-gray-700 dark:text-glow text-base">
                    {previewEvent.description}
                  </p>
                  <div className="mt-4">
                    <div className="flex flex-wrap mb-4">
                      <div className="h-10 flex items-center">
                        {previewEvent.tags
                          ? previewEvent.tags.map((tag, id) => {
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
                    src={uploadedPoster ? uploadedPoster : defaultPoster}
                    alt={previewEvent.name}
                  />
                </div>
              </div>

              <div className="mt-6 mb-2">
                <div className="flex items-center dark:bg-glow dark:rounded-lg">
                  <LocationIcon />
                  <p className="ml-2 text-gray-700 dark:text-black text-sm">
                    {previewEvent.location}
                  </p>
                </div>
                <div className="flex items-center mt-2 dark:bg-glow dark:rounded-lg">
                  <ClockIcon />
                  <p className="ml-2 text-gray-700 dark:text-black text-sm">
                    {formattedDateStr}
                  </p>
                </div>
                <div className="flex items-center mt-2 dark:bg-glow dark:rounded-lg">
                  <TicketIcon />
                  <p className="ml-2 text-gray-700 dark:text-black text-sm">
                    {previewEvent.price}
                  </p>
                </div>
                {previewEvent.link && (
                  <div className="flex items-center mt-2 dark:bg-glow dark:rounded-lg">
                    <LinkIcon />

                    <p className="ml-2 text-gray-700 dark:text-black text-sm">
                      <a href={previewEvent.link} target="_blank">
                        Link del evento
                      </a>
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  className="bg-gray-600 text-white dark:bg-glow dark:text-gray-800 font-bold p-2 px-4 rounded justify-start"
                  onClick={handleCancel}
                >
                  Volver
                </button>
                <button
                  className="bg-gray-600 text-white dark:bg-glow dark:text-gray-800 font-bold p-2 px-4 rounded justify-end"
                  onClick={handleConfirm}
                >
                  Confirmar
                </button>
              </div>
              <ToastContainer />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default PreviewModal;
