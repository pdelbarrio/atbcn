import NavBar from "./components/NavBar";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContextProvider } from "./context/events.context";

export const metadata = {
  title: "@bcn",
  description: "find events in the city",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="bg-gray-500 min-h-screen w-screen">
          <GlobalContextProvider>
            <NavBar />
            {children}
          </GlobalContextProvider>
          <ToastContainer theme="colored" />
        </main>
      </body>
    </html>
  );
}
