import { EventType } from "@/types/types";
import { motion } from "framer-motion";
import Tag from "./Tag";

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
                src={event.poster}
                alt={event.name}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M12 2c-4.418 0-8 3.582-8 8 0 5.25 8 14 8 14s8-8.75 8-14c0-4.418-3.582-8-8-8zm0 11.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
              </svg>
              <p className="ml-2 text-gray-700 text-sm">{event.location}</p>
            </div>
            <div className="flex items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <circle cx="12" cy="12" r="11" fill="#000" />
                <line
                  x1="12"
                  y1="12"
                  x2="12"
                  y2="6"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-opacity="0.8"
                />
                <line
                  x1="12"
                  y1="12"
                  x2="16.5"
                  y2="16.5"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-opacity="0.8"
                />
              </svg>

              <p className="ml-2 text-gray-700 text-sm">{event.date}</p>
            </div>
            <div className="flex items-center mt-2">
              <svg
                width="29"
                height="31.000000000000004"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <g>
                  <path
                    stroke="null"
                    d="m-0.18003,19.51941l14.35624,-13.88462c0.12403,0.01527 0.25483,-0.02181 0.34955,-0.11342c0.09472,-0.09161 0.13531,-0.21811 0.11727,-0.33806l2.97453,-2.87682c0.31347,-0.30317 0.82538,-0.30317 1.13885,0l2.35211,2.27703c-0.61791,0.97493 -0.48937,2.26612 0.38337,3.11019c0.87274,0.84407 2.20778,0.96621 3.21583,0.37078l2.35211,2.27484c0.31347,0.30317 0.31347,0.79827 0,1.10144l-2.97453,2.87682c-0.12403,-0.01527 -0.25258,0.02181 -0.34955,0.11342c-0.09472,0.09161 -0.13531,0.21811 -0.11727,0.33806l-14.35399,13.88244c-0.31347,0.30317 -0.82538,0.30317 -1.13885,0l-2.33858,-2.25958c0.67203,-0.98366 0.55928,-2.31847 -0.33376,-3.18435c-0.89529,-0.86588 -2.27544,-0.97275 -3.29251,-0.3228l-2.34084,-2.26394c-0.31347,-0.30317 -0.31347,-0.79827 0,-1.10144l0,0l0,0zm22.82881,-6.13968c0.16237,-0.15704 0.42622,-0.15704 0.58859,0c0.16237,0.15704 0.16237,0.41222 0,0.56926c-0.16237,0.15704 -0.42622,0.15704 -0.58859,0c-0.16237,-0.15704 -0.16237,-0.41222 0,-0.56926l0,0zm-1.08923,-1.05345c0.16237,-0.15704 0.42622,-0.15704 0.58859,0c0.16237,0.15704 0.16237,0.41222 0,0.56926c-0.16237,0.15704 -0.42622,0.15704 -0.58859,0c-0.16237,-0.15704 -0.16237,-0.41222 0,-0.56926l0,0zm-1.08923,-1.05345c0.16237,-0.15704 0.42622,-0.15704 0.58859,0c0.16237,0.15704 0.16237,0.41222 0,0.56926c-0.16237,0.15704 -0.42622,0.15704 -0.58859,0c-0.16237,-0.15704 -0.16237,-0.41222 0,-0.56926l0,0zm-1.08923,-1.05345c0.16237,-0.15704 0.42622,-0.15704 0.58859,0c0.16237,0.15704 0.16237,0.41222 0,0.56926c-0.16237,0.15704 -0.42622,0.15704 -0.58859,0c-0.16237,-0.15704 -0.16237,-0.41222 0,-0.56926l0,0zm-1.08923,-1.05345c0.16237,-0.15704 0.42622,-0.15704 0.58859,0c0.16237,0.15704 0.16237,0.41222 0,0.56926c-0.16237,0.15704 -0.42622,0.15704 -0.58859,0c-0.16237,-0.15704 -0.16237,-0.41222 0,-0.56926l0,0zm-1.08923,-1.05345c0.16237,-0.15704 0.42622,-0.15704 0.58859,0c0.16237,0.15704 0.16237,0.41222 0,0.56926c-0.16237,0.15704 -0.42622,0.15704 -0.58859,0c-0.16237,-0.15704 -0.16237,-0.41222 0,-0.56926l0,0zm-1.08923,-1.05345c0.16237,-0.15704 0.42622,-0.15704 0.58859,0c0.16237,0.15704 0.16237,0.41222 0,0.56926c-0.16237,0.15704 -0.42622,0.15704 -0.58859,0c-0.16237,-0.15704 -0.16237,-0.41222 0,-0.56926l0,0zm-1.08923,-1.05345c0.16237,-0.15704 0.42622,-0.15704 0.58859,0c0.16237,0.15704 0.16237,0.41222 0,0.56926c-0.16237,0.15704 -0.42622,0.15704 -0.58859,0c-0.16237,-0.15704 -0.16237,-0.41222 0,-0.56926l0,0z"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    id="svg_2"
                  />
                  <text
                    stroke="#000000"
                    fill="#ffffff"
                    stroke-width="0"
                    x="-15.92355"
                    y="3.04514"
                    id="svg_5"
                    font-size="24"
                    font-family="'Nunito ExtraBold'"
                    text-anchor="start"
                    font-weight="normal"
                    font-style="normal"
                    transform="matrix(0.47586 0 0 0.457577 17.1033 17.9614)"
                  >
                    €
                  </text>
                </g>
              </svg>

              <p className="ml-2 text-gray-700 text-sm">{event.price}</p>
            </div>
            <div className="flex items-center mt-2">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24px"
                height="24px"
                viewBox="0 0 512 512"
                enable-background="new 0 0 512 512"
              >
                <path
                  fill="#010101"
                  d="M459.654,233.373l-90.531,90.5c-49.969,50-131.031,50-181,0c-7.875-7.844-14.031-16.688-19.438-25.813
	l42.063-42.063c2-2.016,4.469-3.172,6.828-4.531c2.906,9.938,7.984,19.344,15.797,27.156c24.953,24.969,65.563,24.938,90.5,0
	l90.5-90.5c24.969-24.969,24.969-65.563,0-90.516c-24.938-24.953-65.531-24.953-90.5,0l-32.188,32.219
	c-26.109-10.172-54.25-12.906-81.641-8.891l68.578-68.578c50-49.984,131.031-49.984,181.031,0
	C509.623,102.342,509.623,183.389,459.654,233.373z M220.326,382.186l-32.203,32.219c-24.953,24.938-65.563,24.938-90.516,0
	c-24.953-24.969-24.953-65.563,0-90.531l90.516-90.5c24.969-24.969,65.547-24.969,90.5,0c7.797,7.797,12.875,17.203,15.813,27.125
	c2.375-1.375,4.813-2.5,6.813-4.5l42.063-42.047c-5.375-9.156-11.563-17.969-19.438-25.828c-49.969-49.984-131.031-49.984-181.016,0
	l-90.5,90.5c-49.984,50-49.984,131.031,0,181.031c49.984,49.969,131.031,49.969,181.016,0l68.594-68.594
	C274.561,395.092,246.42,392.342,220.326,382.186z"
                />
              </svg>

              <p className="ml-2 text-gray-700 text-sm">
                <a href={event.link} target="_blank">
                  {event.link}
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
