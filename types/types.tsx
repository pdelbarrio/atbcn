// export type EventType = {
//   id: number;
//   name: string;
//   date: string;
//   tags: string[] | null;
//   location: string;
//   price: string;
//   description: string | null;
//   poster: string | null;
//   link: string | null;
//   validated: boolean;
//   created_by: number | null;
//   created_at: string;
//   completed: boolean;
// };

export interface EventType {
  id: number;
  name: string;
  description: string | null;
  date: string;
  location: string;
  price: string;
  link: string | null;
  poster: string | null;
  tags: string[] | null;
  validated: boolean;
  completed: boolean;
  created_at: string;
  created_by: number | null;
}
