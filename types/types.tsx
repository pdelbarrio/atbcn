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

export interface PreviewEventType {
  name: string;
  description: string | null;
  location: string;
  price: string;
  link: string | null;
  poster: string | null;
  tags: string[] | null;
  date: string | null;
  // completed: boolean;
  // created_at: string;
  // created_by: number | null;
}

export interface EventContextType {
  previewEvent: PreviewEventType | null;
  setPreviewEvent: React.Dispatch<
    React.SetStateAction<PreviewEventType | null>
  >;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedPoster: string | null;
  setUploadedPoster: React.Dispatch<React.SetStateAction<string | null>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  supabase: any;
}

export interface EventFormType {
  name: string;
  description: string;
  tags: string[];
  location: string;
  price: string;
  link: string;
}

export interface FormErrors {
  tags?: string[];
  [key: string]: string | string[] | undefined;
  name?: string;
  description?: string;
  location?: string;
  price?: string;
  link?: string;
}
