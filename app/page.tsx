import supabase from "@/utils/supabase";
import EventList from "./components/EventList";
import { EventType } from "@/types/types";
import { Metadata } from "next";

const APP_NAME = "@bcn";
const APP_DESCRIPTION = "Encuentra y añade eventos de Barcelona";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  twitter: {
    card: "summary_large_image",
    creator: "@pablo_delbarrio",
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
  themeColor: "#757b8a",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png" },
    { rel: "shortcut icon", url: "/favicon.ico" },
  ],
  keywords: ["bcn", "barcelona", "eventos", "conciertos", "agenda"],
};

export const revalidate = 60;

async function getData(): Promise<EventType[]> {
  const currentDate = new Date();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .gt("date", currentDate.toISOString())
    .order("date", { ascending: true });

  if (events === null) {
    return [];
  }

  return events;
}

export default async function Home() {
  const events = await getData();

  return (
    <div className="max-w-screen-sm mx-auto px-4">
      <EventList events={events} />
    </div>
  );
}
