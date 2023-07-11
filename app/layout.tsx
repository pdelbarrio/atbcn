import NavBar from "./components/NavBar";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { GlobalContextProvider } from "./context/events.context";
import { AuthContextProvider } from "./context/auth.context";
import Providers from "./context/theme.context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <main className="bg-gray-500 dark:bg-black min-h-screen w-screen">
          <AuthContextProvider>
            <GlobalContextProvider>
              <NavBar />
              {children}
            </GlobalContextProvider>
          </AuthContextProvider>
        </main>
        </Providers>
      </body>
    </html>
  );
}
