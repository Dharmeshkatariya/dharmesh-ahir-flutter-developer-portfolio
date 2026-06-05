export type LayoutType =
  | 'classic'
  | 'left-sidebar'
  | 'apple-minimal'
  | 'glassmorphism-studio'
  | 'developer-dashboard'
  | 'interactive-magazine'
  | 'terminal-hacker'
  | 'fullscreen-scroll-story';

export type ThemeType =
  | 'ocean'
  | 'forest'
  | 'sunset'
  | 'purple'
  | 'cyberpunk'
  | 'nord'
  | 'amoled'
  | 'flutter-official'
  | 'material-you'
  | 'apple-white'
  | 'dev-dark'
  | 'tesla-black';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  results: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  downloads?: string;
  github?: string;
  demoUrl?: string;
  screenshots: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  details: string[];
  skills?: string[];
  tags?: string[];
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  criteria: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface WorkspaceSnapshot {
  id: string;
  name: string;
  layout: LayoutType;
  theme: ThemeType;
  particleSettings: { density: number; motion: number };
  cursorStyle: string;
  aiPanelState: { isOpen: boolean; mode: string };
  dockState: { muted: boolean };
  createdAt: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  category: 'info' | 'success' | 'warn' | 'system';
  timestamp: string;
  duration?: number;
}

export interface ActivityLogItem {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  category: 'workspace' | 'theme' | 'ai' | 'portfolio' | 'operational';
}
