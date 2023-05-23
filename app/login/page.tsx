"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/auth.context";
import { userSchema } from "../../utils/utils";
import { AuthFormErrors } from "@/types/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const router = useRouter();

  const { supabaseclient } = useAuthContext();

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSignIn = async () => {
    setIsValidating(true);

    try {
      await userSchema.validate({ email, password }, { abortEarly: false });

      console.log("handleSignIn", email, password);
      const { data, error } = await supabaseclient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.log("problem signing in");
        console.log(error.message); // TODO: Manejar el error con Toastify
      } else if (data) {
        // TODO: Manejar éxito con Toastify, añadir loading en PROD
        console.log("data en handleSignIn", data);
        router.replace("/add-event");
      }
    } catch (error: any) {
      // La validación falla, mostrar los errores al usuario
      const yupErrors: AuthFormErrors = {};

      error.inner.forEach((validationError: any) => {
        yupErrors[validationError.path] = validationError.message;
      });

      setErrors(yupErrors);
    }

    setIsValidating(false);
  };

  const handleSignUp = async () => {
    setIsValidating(true);

    try {
      await userSchema.validate({ email, password }, { abortEarly: false });
      // La validación es exitosa, continuar con el registro
      const { data, error } = await supabaseclient.auth.signUp({
        email,
        password,
        options: { data: { role: "user" } },
      });
      if (error) {
        console.log(error.message); // TODO: Manejar el error con Toastify
      } else if (data) {
        // Manejar éxito con Toastify, "te ha llegado un mail de verificación bla bla"
        router.replace("/add-event");
      }
    } catch (error: any) {
      // La validación falla, mostrar los errores al usuario
      const yupErrors: AuthFormErrors = {};

      error.inner.forEach((validationError: any) => {
        yupErrors[validationError.path] = validationError.message;
      });

      setErrors(yupErrors);
    }

    setIsValidating(false);
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
      console.log("data", data);
      if (error) throw new Error(error.message);
      else if (data) {
        router.replace("/add-event");
      }
    } catch (error) {
      console.log(error);
    }
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
              className="bg-gray-300 text-gray-800 font-bold p-2 px-4 rounded mb-2"
              onClick={() => handleSignIn()}
            >
              Inicia sesión
            </button>
            <button
              className="bg-gray-800 text-gray-300 font-bold p-2 px-4 rounded mb-2"
              type="button"
              onClick={() => handleSignUp()}
            >
              Registrate
            </button>
            <button
              onClick={handleSignInWithGoogle}
              className="bg-gray-300 text-gray-800 font-bold p-2 px-4 rounded mb-2"
            >
              Inicia sesión con Google
            </button>

            <button
              className="font-bold py-2"
              type="button"
              onClick={handleRecoverPassword}
            >
              ¿Olvidaste la contraseña?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
