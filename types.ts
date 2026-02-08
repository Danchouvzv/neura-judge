
export enum FirstProgram {
  FTC = 'FTC',
  FRC = 'FRC',
  FLL = 'FLL'
}

export interface AuditCategory {
  name: string;
  score: number; // 1-5
  reasoning: string;
  evidence: string[];
  gaps: string[];
  suggestions: string[];
}

export interface WaterDetection {
  originalText: string;
  reasoning: string;
  suggestion: string;
}

export interface Checklist {
  today: string[];
  thisWeek: string[];
  beforeSeason: string[];
}

export interface AuditReport {
  overallScore: number;
  categories: AuditCategory[];
  waterDetection: WaterDetection[];
  checklist: Checklist;
  summary: string;
}

export interface SavedAudit {
  id: string;
  date: string;
  program: FirstProgram;
  fileName: string;
  report: AuditReport;
}
