export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: 'super_admin' | 'manager' | 'content_editor' | 'viewer'
          created_at: string
          last_login: string | null
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          role?: 'super_admin' | 'manager' | 'content_editor' | 'viewer'
          created_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: 'super_admin' | 'manager' | 'content_editor' | 'viewer'
          created_at?: string
          last_login?: string | null
        }
      }
      homepage_content: {
        Row: {
          id: string
          section: string
          content: Json
          is_active: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          section: string
          content?: Json
          is_active?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          section?: string
          content?: Json
          is_active?: boolean
          updated_at?: string
          updated_by?: string | null
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          subscribed_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          subscribed_at?: string
          is_active?: boolean
        }
      }
      marketing_campaigns: {
        Row: {
          id: string
          name: string
          platform: string
          spend: number
          revenue: number
          start_date: string
          end_date: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          platform: string
          spend?: number
          revenue?: number
          start_date: string
          end_date?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          platform?: string
          spend?: number
          revenue?: number
          start_date?: string
          end_date?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      activity_log: {
        Row: {
          id: string
          admin_id: string | null
          action: string
          details: Json
          created_at: string
        }
        Insert: {
          id?: string
          admin_id?: string | null
          action: string
          details?: Json
          created_at?: string
        }
        Update: {
          id?: string
          admin_id?: string | null
          action?: string
          details?: Json
          created_at?: string
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
