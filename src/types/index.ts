// 基础类型定义

export interface Location {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

export interface PollutionEvent {
  id: string;
  title: string;
  description: string;
  location: Location;
  date: Date;
  type: PollutionType;
  severity: SeverityLevel;
  impact: string;
  images?: string[];
  sources?: string[];
}

export enum PollutionType {
  PLASTIC = 'plastic',
  OIL_SPILL = 'oil_spill',
  CHEMICAL = 'chemical',
  INDUSTRIAL = 'industrial',
  SEWAGE = 'sewage',
  MICROPLASTICS = 'microplastics',
  NOISE = 'noise',
  THERMAL = 'thermal'
}

export enum SeverityLevel {
  LOW = 1,
  MODERATE = 2,
  HIGH = 3,
  SEVERE = 4,
  CATASTROPHIC = 5
}

export interface StatisticData {
  year: number;
  pollutionType: PollutionType;
  amount: number;
  unit: string;
  region: string;
}

export interface ExpertProfile {
  id: string;
  name: string;
  title: string;
  organization: string;
  expertise: string[];
  bio: string;
  image: string;
  contactInfo?: {
    email?: string;
    website?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
    };
  };
}

export interface ResearchInstitute {
  id: string;
  name: string;
  location: Location;
  description: string;
  website: string;
  focusAreas: string[];
  image: string;
  established: number;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  completed: boolean;
  progress: number; // 0-100
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export interface AnimationConfig {
  speed: number;
  duration: number;
  particles: number;
  showTrails: boolean;
}

export interface MapMarker {
  id: string;
  position: Location;
  type: PollutionType;
  severity: SeverityLevel;
  data: PollutionEvent;
  popup?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface UserProgress {
  completedModules: string[];
  quizScores: { [quizId: string]: number };
  totalTimeSpent: number;
  achievements: string[];
  favoriteTopics: string[];
}

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon: string;
  description: string;
  featured?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishDate: Date;
  author: string;
  category: string;
  tags: string[];
  image: string;
  source: string;
} 