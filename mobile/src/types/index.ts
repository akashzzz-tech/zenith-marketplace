export type Role = 'client' | 'professional' | 'admin';

export interface User {
  id: string;
  email: string;
  role: Role;
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

export type Database = {
  public: {
    Tables: {
      users: { Row: User };
      profiles: { Row: Profile };
      projects: { Row: Project };
    };
  };
};
