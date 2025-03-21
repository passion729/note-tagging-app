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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          content: string;
          tags: string[];
        };
        Update: {
          title?: string;
          content?: string;
          tags?: string[];
          updated_at?: string;
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
          note_id: number;
          content: string;
        };
        Update: {
          note_id?: number;
          content?: string;
          created_at?: string;
        };
      };
      images: {
        Row: {
          id: number;
          note_id: number;
          url: string;
          created_at: string;
        };
        Insert: {
          note_id: number;
          url: string;
        };
        Update: {
          note_id?: number;
          url?: string;
          created_at?: string;
        };
      };
      tag_data: {
        Row: {
          id: number;
          note_id: number;
          note_opinion: 'agree' | 'disagree' | 'neutral';
          comment_opinions: ('agree' | 'disagree' | 'neutral')[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          note_id: number;
          note_opinion: 'agree' | 'disagree' | 'neutral';
          comment_opinions: ('agree' | 'disagree' | 'neutral')[];
        };
        Update: {
          note_id?: number;
          note_opinion?: 'agree' | 'disagree' | 'neutral';
          comment_opinions?: ('agree' | 'disagree' | 'neutral')[];
          updated_at?: string;
        };
      };
    };
  };
}; 