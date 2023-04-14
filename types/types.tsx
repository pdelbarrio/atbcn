export type EventType = {
  id: number;
  name: string;
  date: string;
  tags: string[] | null;
  location: string;
  price: string;
  description: string | null;
  poster: string | null;
  link: string | null;
  validated: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
  completed: boolean;
};
