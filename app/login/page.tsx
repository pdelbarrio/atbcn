"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAuthContext } from "../context/auth.context";
import { userSchema } from "../../utils/utils";
import { AuthFormErrors } from "@/types/types";
import { GoogleSignInButton } from "../components/Icons";
import { setErrorToast, setSuccessToast } from "@/utils/toasts";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { supabaseclient } = useAuthContext();

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      await userSchema.validate({ email, password }, { abortEarly: false });

      const { data, error } = await supabaseclient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorToast(error.message);
      } else if (data) {
        setSuccessToast("Inicio de sesión correcto");
        redirect("/add-event");
      }
    } catch (error: any) {
      // La validación falla, mostrar los errores al usuario
      const yupErrors: AuthFormErrors = {};

      error.inner.forEach((validationError: any) => {
        yupErrors[validationError.path] = validationError.message;
      });

      setErrors(yupErrors);
    }

    setIsLoading(false);
  };

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      await userSchema.validate({ email, password }, { abortEarly: false });
      // La validación es exitosa, continuar con el registro
      const { data, error } = await supabaseclient.auth.signUp({
        email,
        password,
        options: { data: { role: "user" } },
      });
      console.log(data);
      if (error) {
        setErrorToast(error.message);
      } else if (data) {
        setSuccessToast("Te has registrado correctamente, revisa tu correo");
        setEmail(""); // Limpiar el campo de email
        setPassword(""); // Limpiar el campo de contraseña
      }
    } catch (error: any) {
      // La validación falla, mostrar los errores al usuario
      const yupErrors: AuthFormErrors = {};
      error.inner.forEach((validationError: any) => {
        yupErrors[validationError.path] = validationError.message;
      });
      setErrors(yupErrors);
    }
    setIsLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    try {
      const { data, error } = await supabaseclient.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw new Error(error.message);
      else if (data) {
      }
    } catch (error: any) {
      setErrorToast(error.message);
    }
    // redirect("/add-event");
    router.push("/add-event");
  };

  const handleRecoverPassword = () => {
    router.push("/recover");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-sm">
        <div className="px-8 pb-8 mb-4">
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
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {(errors as AuthFormErrors).password && (
              <p className="text-red-500 text-xs font-bold italic">
                {(errors as AuthFormErrors).password}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <button
              type="button"
              className="h-[40px] bg-gray-300 dark:bg-glow text-gray-800 font-bold p-2 px-4 rounded mb-2"
              onClick={() => handleSignIn()}
            >
              Inicia sesión
            </button>
            <button
              className="h-[40px] bg-gray-800 dark:bg-black dark:border dark:border-glow text-gray-300 dark:text-glow font-bold p-2 px-4 rounded mb-2"
              type="button"
              onClick={() => handleSignUp()}
            >
              Regístrate
            </button>
            <button
              onClick={handleSignInWithGoogle}
              className="h-[40px] flex items-center justify-start bg-white text-gray-800 font-bold p-2 px-4 rounded mb-2"
            >
              <div className="mr-2">
                <GoogleSignInButton />
              </div>
              <span>Inicia sesión con Google</span>
            </button>
            <button
              className="font-bold py-2"
              type="button"
              onClick={handleRecoverPassword}
            >
              ¿Olvidaste la contraseña?
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
