"use client";

import { createContext, useContext, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { AuthContextType } from "@/types/types";

const AuthContext = createContext({} as AuthContextType);

interface props {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: props) => {
  const [supabaseclient] = useState(() => createPagesBrowserClient());

  return (
    <AuthContext.Provider
      value={{
        supabaseclient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
