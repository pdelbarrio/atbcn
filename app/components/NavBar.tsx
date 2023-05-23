"use client";

import Link from "next/link";

import { useAuthContext } from "../context/auth.context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [signOutButton, setSignOutButton] = useState(false);
  const { supabaseclient } = useAuthContext();

  const router = useRouter();

  const handleSignout = async () => {
    const { error } = await supabaseclient.auth.signOut();
    if (error) throw new Error("Error durante el cierre de sesión");
    router.refresh();
    console.log("refreshing?", router);
    console.log("signOutButton", signOutButton);
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseclient.auth.onAuthStateChange((event: any, session: any) => {
      console.log("session from NavBar", session);
      if (session) {
        setSignOutButton(true);
        router.refresh();

        console.log("signOutButton", signOutButton);
      } else {
        setSignOutButton(false);
        router.refresh();

        console.log("signOutButton", signOutButton);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabaseclient, router]);

  return (
    <nav className="bg-gray-500 max-w-xl mx-auto p-2 md:max-w-1/2">
      <div className="flex flex-col justify-start">
        <div className="flex justify-between mx-8 mt-2">
          <div className="flex flex-col">
            <Link href="/" className="font-bold text-gray-800 text-2xl">
              @bcn
            </Link>
          </div>
          <div className="flex flex-col">
            <Link
              href="/add-event"
              className="bg-gray-300 text-gray-800 font-bold p-2 px-4 rounded-lg text-lg flex-grow"
            >
              add event
            </Link>
            {signOutButton && (
              <button
                onClick={handleSignout}
                className="bg-black text-white text-xs p-2 px-2 mt-2 rounded-lg flex-grow"
              >
                SIGN OUT
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
