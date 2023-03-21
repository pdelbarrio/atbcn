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
      <body>{children}</body>
    </html>
  );
}
