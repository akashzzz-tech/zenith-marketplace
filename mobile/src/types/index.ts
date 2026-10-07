export type Role = 'client' | 'professional' | 'admin';
export type UserRole = Role;

export interface MatchScoreBreakdown {
  total: number;
  reasons: string[];
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  title?: string;
  bio?: string;
  country?: string;
  is_verified: boolean;
}

export interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string;
  status: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
  budget_min: number;
  budget_max: number;
  created_at: string;
}

export interface MessageRow {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'file' | 'system';
  is_read: boolean;
  created_at: string;
}

export interface MessageInsert {
  id?: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type?: 'text' | 'file' | 'system';
  is_read?: boolean;
  created_at?: string;
}

export type Database = {
  public: {
    Tables: {
      users: { Row: User; Insert: Partial<User> };
      profiles: { Row: Profile; Insert: Partial<Profile> };
      projects: { Row: Project; Insert: Partial<Project> };
      messages: { Row: MessageRow; Insert: MessageInsert };
    };
  };
};
