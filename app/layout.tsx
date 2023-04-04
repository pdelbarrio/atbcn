import NavBar from "./components/NavBar";
import "./globals.css";

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
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
