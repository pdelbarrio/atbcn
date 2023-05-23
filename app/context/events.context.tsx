"use client";

import { createContext, useContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { EventContextType, PreviewEventType } from "@/types/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface props {
  children: React.ReactNode;
}

const GlobalContext = createContext({} as EventContextType);

export const GlobalContextProvider = ({ children }: props) => {
  const [previewEvent, setPreviewEvent] = useState<PreviewEventType | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadedPoster, setUploadedPoster] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [supabase] = useState(() => createClient(supabaseUrl, supabaseAnonKey));

  return (
    <GlobalContext.Provider
      value={{
        previewEvent,
        setPreviewEvent,
        showModal,
        setShowModal,
        uploadedPoster,
        setUploadedPoster,
        tags,
        setTags,
        supabase,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
