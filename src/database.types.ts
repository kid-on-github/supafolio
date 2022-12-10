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
      user_profiles: {
        Row: {
          user_id: string
          full_name: string
          email: string
          cell: string
          company: string
          company_website: string
          linkedin: string
          instagram: string
          facebook: string
          twitter: string
        }
        Insert: {
          user_id: string
          full_name: string
          email: string
          cell: string
          company: string
          company_website: string
          linkedin: string
          instagram: string
          facebook: string
          twitter: string
        }
        Update: {
          user_id?: string
          full_name?: string
          email?: string
          cell?: string
          company?: string
          company_website?: string
          linkedin?: string
          instagram?: string
          facebook?: string
          twitter?: string
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
  }
}