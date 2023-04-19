export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          completed: boolean
          created_at: string
          created_by: number | null
          date: string
          description: string | null
          id: number
          link: string | null
          location: string
          name: string
          poster: string | null
          price: string
          tags: string[] | null
          validated: boolean
        }
        Insert: {
          completed: boolean
          created_at?: string
          created_by?: number | null
          date: string
          description?: string | null
          id?: number
          link?: string | null
          location: string
          name: string
          poster?: string | null
          price: string
          tags?: string[] | null
          validated: boolean
        }
        Update: {
          completed?: boolean
          created_at?: string
          created_by?: number | null
          date?: string
          description?: string | null
          id?: number
          link?: string | null
          location?: string
          name?: string
          poster?: string | null
          price?: string
          tags?: string[] | null
          validated?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

