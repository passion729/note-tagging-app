import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 数据库类型定义
export type Database = {
  public: {
    Tables: {
      notes: {
        Row: {
          id: number;
          title: string;
          content: string;
          tags: string[];
          image_list: string[];
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          content: string;
          tags?: string[];
          image_list?: string[];
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          content?: string;
          tags?: string[];
          image_list?: string[];
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: number;
          note_id: number;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          note_id: number;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          note_id?: number;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      opinions: {
        Row: {
          id: number;
          note_id: number;
          comment_id: number | null;
          opinion: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          note_id: number;
          comment_id?: number | null;
          opinion: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          note_id?: number;
          comment_id?: number | null;
          opinion?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}; 