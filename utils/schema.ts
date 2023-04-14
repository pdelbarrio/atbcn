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
      Event: {
        Row: {
          completed: boolean
          created_at: string
          created_by: number
          date: string
          description: string | null
          id: number
          link: string | null
          location: string
          name: string
          poster: string | null
          price: string
          tags: string[] | null
          updated_at: string
          validated: boolean
        }
        Insert: {
          completed?: boolean
          created_at?: string
          created_by: number
          date: string
          description?: string | null
          id?: number
          link?: string | null
          location: string
          name: string
          poster?: string | null
          price: string
          tags?: string[] | null
          updated_at?: string
          validated?: boolean
        }
        Update: {
          completed?: boolean
          created_at?: string
          created_by?: number
          date?: string
          description?: string | null
          id?: number
          link?: string | null
          location?: string
          name?: string
          poster?: string | null
          price?: string
          tags?: string[] | null
          updated_at?: string
          validated?: boolean
        }
      }
      User: {
        Row: {
          created_at: string
          email: string
          id: number
          password: string
          updated_at: string
          user_name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          password: string
          updated_at: string
          user_name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          password?: string
          updated_at?: string
          user_name?: string
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

