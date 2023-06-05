import NavBar from "./components/NavBar";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import { GlobalContextProvider } from "./context/events.context";
import { AuthContextProvider } from "./context/auth.context";

const APP_NAME = "@bcn";
const APP_DESCRIPTION = "Encuentra y añade eventos de Barcelona";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  twitter: {
    card: "summary_large_image",
    creator: "@imamdev_",
    images: "https://example.com/og.png",
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#FFFFFF",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png" },
    { rel: "shortcut icon", url: "/favicon.ico" },
  ],
  keywords: ["nextjs", "pwa", "next-pwa"],
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
          <AuthContextProvider>
            <GlobalContextProvider>
              <NavBar />
              {children}
            </GlobalContextProvider>
          </AuthContextProvider>
        </main>
      </body>
    </html>
  );
}
