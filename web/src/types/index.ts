export * from './database.types';

export interface MatchScoreBreakdown {
  skills: number;        // 0-35
  experience: number;    // 0-25
  industry: number;      // 0-15
  timezone: number;      // 0-15
  rate: number;          // 0-10
  total: number;         // 0-100
  reasons: string[];     // e.g. ["12 YOE in Mechanical Engineering", "CAD & SolidWorks Certified"]
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  error: string | null;
}
