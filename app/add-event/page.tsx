"use client";

import { SetStateAction, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Axios from "axios";

import { AnimatePresence } from "framer-motion";
import { eventSchema } from "@/utils/utils";
import PreviewModal from "../components/PreviewModal";
import { EventFormType, EventFormErrors } from "@/types/types";
import { useGlobalContext } from "../context/events.context";
import { useAuthContext } from "../context/auth.context";
// import { useFileUpload } from "../hooks/useFileUpload";

const AddEvent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [link, setLink] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayFile, setDisplayFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [nameLength, setNameLength] = useState(0);
  const [createdBy, setCreatedBy] = useState<string | undefined>(undefined);

  // const { onSubmitFile } = useFileUpload();

  const {
    setPreviewEvent,
    showModal,
    setShowModal,
    uploadedPoster,
    setUploadedPoster,
    tags,
    setTags,
  } = useGlobalContext();

  const { supabaseclient } = useAuthContext();

  useEffect(() => {
    async function fetchSession() {
      const { data: session, error } = await supabaseclient.auth.getSession();

      if (error) {
        console.log("Error fetching session:", error.message);
        return;
      }

      if (session) {
        console.log("Session:", session.session?.user.email);
        setCreatedBy(session.session?.user.email);
      } else {
        console.log("No session");
      }
    }

    fetchSession();
  }, []);

  const openModal = () => {
    setShowModal(true);
    const formattedDate = date ? date.toISOString() : null;
    const eventDetails = {
      name: name,
      description: description,
      tags: tags,
      location: location,
      price: price,
      date: formattedDate,
      link: link,
      poster: uploadedPoster,
      created_by: createdBy,
    };
    setPreviewEvent(eventDetails);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errors = await validateForm({
      name,
      description,
      tags,
      location,
      price,
      link,
    });
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
    }
  };

  const validateForm = async (values: EventFormType) => {
    try {
      await eventSchema.validate(values, { abortEarly: false });
      return {};
    } catch (error: any) {
      const errors: EventFormErrors = {};
      let tagLength = 0;
      error.inner.forEach((e: any) => {
        if (
          e.path === "tags[0]" ||
          e.path === "tags[1]" ||
          e.path === "tags[2]"
        ) {
          tagLength++;
          if (tagLength === 1) {
            errors.tags = [e.message];
          }
        } else {
          errors[e.path] = e.message;
        }
      });
      return errors;
    }
  };

  const onSubmitFile = async (file: any) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "posterevents");

    try {
      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dl5hp1axh/image/upload",
        formData
      );

      if (response.data) {
        setSelectedFile(null);
        setUploadedPoster(response.data.secure_url);
        setDisplayFile(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e: any) => {
    const { files } = e.target;
    setSelectedFile(files[0]);
    setDisplayFile(
      URL.createObjectURL(files[0]) as unknown as SetStateAction<null>
    );
  };

  const handleTagsChange = (e: any) => {
    const { value } = e.target;
    setInputTag(value);
  };

  const handleAddTag = (e: any) => {
    e.preventDefault();
    const trimmedInput = inputTag.trim();

    if (trimmedInput.length && !tags.includes(trimmedInput)) {
      setTags((prevState) => [...prevState, trimmedInput]);
      setInputTag("");
    }
  };

  const deleteTag = (index: number) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-gray-500 p-8 rounded-md">
          <div className="mb-4">
            <input
              type="text"
              placeholder="nombre"
              id="name"
              className="w-full border border-gray-400 p-2 rounded-md"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameLength(e.target.value.length);
              }}
            />
            {(errors as EventFormErrors).name && (
              <span className="text-red-500 font-bold italic text-xs">
                {(errors as EventFormErrors).name}
              </span>
            )}
            <span className="block text-right text-gray-400 text-xs">
              {nameLength}/50
            </span>
          </div>

          <div className="mb-4">
            <textarea
              id="description"
              placeholder="descripción"
              className="w-full border border-gray-400 p-2 rounded-md"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionLength(e.target.value.length);
              }}
            ></textarea>
            {(errors as EventFormErrors).description && (
              <span className="text-red-500 font-bold italic text-xs">
                {(errors as EventFormErrors).description}
              </span>
            )}
            <span className="block text-right text-gray-400 text-xs">
              {descriptionLength}/150
            </span>
          </div>

          <div className="flex flex-col justify-center mb-4">
            <div className="flex flex-wrap items-start min-h-12 w-100 px-2 border border-gray-300 rounded-md font-thin">
              <ul className="flex flex-wrap p-0 mt-8">
                {tags?.map((tag, index) => (
                  <li
                    key={index}
                    className="inline-flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-gray-800 rounded-md mr-2 mb-2"
                  >
                    <span className="mb-1">{tag}</span>
                    <span
                      onClick={() => deleteTag(index)}
                      className="block w-4 h-4 leading-4 text-center text-sm text-gray-800 bg-white rounded-full cursor-pointer ml-2"
                    >
                      X
                    </span>
                  </li>
                ))}
              </ul>

              <input
                value={inputTag}
                placeholder="Máximo 3 tags"
                onChange={handleTagsChange}
                className="w-full min-w-1/2 border-none rounded-md py-4 px-2 mb-2 mt-2"
              />
              <button
                onClick={handleAddTag}
                className="bg-gray-300 text-gray-800 font-bold p-2 px-4 rounded ml-auto mb-2"
              >
                Agregar tag
              </button>
            </div>
            {(errors as EventFormErrors).tags && (
              <span className="text-red-500 font-bold italic text-xs">
                {(errors as EventFormErrors).tags}
              </span>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="ubicación"
              id="location"
              className="w-full border border-gray-400 p-2 rounded-md"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {(errors as EventFormErrors).location && (
              <span className="text-red-500 font-bold italic text-xs">
                {(errors as EventFormErrors).location}
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 mb-4 text-left">
              <input
                type="text"
                placeholder="precio"
                id="price"
                className="w-full border border-gray-400 p-2 rounded-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {(errors as EventFormErrors).price && (
                <span className="text-red-500 font-bold italic text-xs">
                  {(errors as EventFormErrors).price}
                </span>
              )}
            </div>

            <div className="w-1/2 mb-4 text-right">
              <DatePicker
                className="w-full border border-gray-400 p-2 rounded-md"
                minDate={new Date()}
                showTimeSelect
                selected={date}
                onChange={(date) => setDate(date)}
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yy HH:mm"
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="link del evento"
              id="link"
              className="w-full border border-gray-400 p-2 rounded-md"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            {(errors as EventFormErrors).link && (
              <span className="text-red-500 font-bold italic text-xs">
                {(errors as EventFormErrors).link}
              </span>
            )}
          </div>
          <div className="mb-4">
            <div className="w-full border border-gray-400 p-2 rounded-md text-center">
              <div>
                <div className="">
                  {uploadedPoster ? null : (
                    <div>
                      {displayFile ? (
                        <p className="text-xs mb-2">
                          Esta es la <span className="font-bold">PREVIEW</span>{" "}
                          del poster de tu evento, haz click en el botón de{" "}
                          <span className="font-bold">UPLOAD</span> o selecciona
                          otro poster.
                        </p>
                      ) : (
                        <p>Selecciona un poster para tu evento</p>
                      )}
                      {uploadedPoster ? null : (
                        <input
                          type="file"
                          className="mb-2"
                          onChange={onChange}
                        />
                      )}
                    </div>
                  )}
                  {displayFile ? (
                    <img className="preview" alt="preview" src={displayFile} />
                  ) : null}
                </div>

                {uploadedPoster && (
                  <img
                    alt="preview"
                    className="uploaded"
                    src={uploadedPoster}
                  />
                )}
                {uploadedPoster ? null : (
                  <button
                    className="bg-gray-300 text-gray-800 font-bold mt-2 mb-2 p-2 px-4 rounded"
                    onClick={() => onSubmitFile(selectedFile)}
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-gray-300 text-gray-800 font-bold p-2 px-4 rounded"
              onClick={openModal}
            >
              Preview
            </button>
          </div>
        </form>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && Object.keys(errors).length === 0 && <PreviewModal />}
      </AnimatePresence>
    </div>
  );
};

export default AddEvent;
