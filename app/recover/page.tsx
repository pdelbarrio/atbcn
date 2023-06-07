"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/auth.context";

import { userSchema } from "@/utils/utils";
import { AuthFormErrors } from "@/types/types";
import { ToastContainer } from "react-toastify";
import { setErrorToast, setSuccessToast } from "@/utils/toasts";

const Recover = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const { supabaseclient } = useAuthContext();

  const handleEmailChange = (e: any) => setEmail(e.target.value);

  const recoverPassword = async () => {
    // setErrorToast(
    //   "Reseteo temporalmente inhabilitado, pide reseteo manual enviando mail a atbcnapp@gmail.com"
    // );
    try {
      await userSchema.validate({ email }, { abortEarly: false });

      const { data, error } = await supabaseclient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: "https://localhost:3000/update-user",
        }
      );

      //TODO: Manejar success con toastify "Si el correo se encuentra en la base de datos recibirás un mail con un enlace para resetear la contraseña"
      if (error) {
        setErrorToast(error.message);
      } else if (data) {
        setSuccessToast(
          "Si el correo se encuentra en la base de datos recibirás un mail con un enlace para resetear la contraseña"
        );

        router.replace("/");
      }
    } catch (error: any) {
      const yupErrors: AuthFormErrors = {};

      error.inner.forEach((validationError: any) => {
        yupErrors[validationError.path] = validationError.message;
      });

      setErrors(yupErrors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-sm">
        <div className="px-8 pb-8 mb-4">
          <p className="text-xs  text-gray-800 font-bold mb-4">
            Recibirás un email para restablecer tu contraseña
          </p>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {(errors as AuthFormErrors).email && (
              <p className="text-red-500 text-xs italic font-bold">
                {(errors as AuthFormErrors).email}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <button
              type="button"
              className="bg-gray-800 text-gray-300 font-bold p-2 px-4 rounded mb-2"
              onClick={() => recoverPassword()}
            >
              Send
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Recover;
