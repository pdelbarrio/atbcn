import { motion } from "framer-motion";

interface Props {
  setShowModal: (newValue: boolean) => void;
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

const ModalInfo = ({ setShowModal }: Props) => {
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
        <div>
          Bienvenid@ a <span className="font-bold"> atbcn</span>. Agenda de
          eventos culturales de Barcelona. Aquí podrás descubrir y compartir
          información de eventos culturales en Barcelona y cercanías.
          <br />
          <br />
          Para empezar, regístrate (es muy sencillo si usas Gmail) y comparte
          tus propios eventos. Que sean eventos alternativos, contraculturales,
          experimentales, etc. Ya sabes.
          <br />
          <br />
          Al introducir un evento, ten en cuenta que algunos campos del
          formulario tienen una limitación de caracteres. Esta restricción se
          implementa para garantizar la correcta visualización de la
          información. Si necesitas agregar más detalles, te recomendamos
          incluir un enlace que dirija a una página con la información completa
          del evento.
          <br />
          <br />
          Si tienes cualquier duda, problema o sugerencia puedes escribir a
          <span className="font-bold"> atbcnapp@gmail.com</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalInfo;
