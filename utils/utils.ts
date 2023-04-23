import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formattedDate(date: string, formatStr = "PPp"): string {
  const eventDate = new Date(date);
  return format(eventDate, formatStr, { locale: es, timeZone: "UTC" } as any);
}
