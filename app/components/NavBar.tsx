"use client";

import Link from "next/link";

import { useAuthContext } from "../context/auth.context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InfoButton } from "./Icons";
import { AnimatePresence } from "framer-motion";
import ModalInfo from "./ModalInfo";
import ThemeSwitcher from "../context/ThemeSwitcher";

export default function NavBar() {
  const [signOutButton, setSignOutButton] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { supabaseclient } = useAuthContext();

  const router = useRouter();

  const handleSignout = async () => {
    const { error } = await supabaseclient.auth.signOut();
    router.push("/");
    if (error) throw new Error("Error durante el cierre de sesión");
    router.push("/");
  };

  const handleRedirect = () => {
    const {
      data: { subscription },
    } = supabaseclient.auth.onAuthStateChange((event: any, session: any) => {
      if (session) {
        router.push("/add-event");
      } else {
        setSignOutButton(false);
        router.push("/login");
      }
    });
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseclient.auth.onAuthStateChange((event: any, session: any) => {
      if (session) {
        setSignOutButton(true);
        router.refresh();
      } else {
        setSignOutButton(false);
        router.refresh();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabaseclient, router]);

  return (
    <nav className="bg-gray-500 dark:bg-black max-w-xl mx-auto p-2 md:max-w-1/2">
      <div className="flex flex-col justify-start h-[120px]">
        {/* <div className="flex justify-between mx-8 mt-2"> */}
        <div className="flex justify-between mt-2">
          <div className="flex flex-col">
            <Link href="/" className="font-bold text-gray-800 text-2xl dark:text-glow">
              @bcn
            </Link>
          </div>
          <div>
            <button onClick={() => setShowModal(!showModal)}>
              <InfoButton />
            </button>
          </div>
          <div>
            <ThemeSwitcher />
          </div>
          <div className="flex flex-col">
            <button
              onClick={handleRedirect}
              className="bg-gray-300 dark:bg-glow text-gray-800 font-bold px-4 py-1 rounded-lg text-base"
            >
              add event
            </button>
            {signOutButton && (
              <button
                onClick={handleSignout}
                className="bg-black dark:bg-glow text-white dark:text-black text-xs p-2 px-2 mt-2 rounded-lg"
              >
                SIGN OUT
              </button>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <ModalInfo setShowModal={setShowModal} />}
      </AnimatePresence>
    </nav>
  );
}
