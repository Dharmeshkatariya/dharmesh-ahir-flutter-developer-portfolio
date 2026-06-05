import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Layout,
  Palette,
  Sun,
  Moon,
  Download,
  X,
  Send,
  Eye,
  ArrowRight,
  Database,
  Cpu,
  Zap,
  Globe,
  Award,
  Terminal,
  Code,
  Briefcase,
  Layers,
  CheckCircle,
  TrendingUp,
  Volume2,
  VolumeX,
  Phone,
  Mail,
  MapPin,
  Flame,
  FileText,
  MousePointer,
  Play,
  Github,
  Maximize2,
  ExternalLink,
  MessageSquare,
  BookOpen,
  Keyboard,
  Info,
  Sliders,
  DollarSign,
  UserCheck,
  Search,
  Check,
  Mic,
  Compass,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThreeBackground } from './components/ThreeBackground';
import { CustomCursor } from './components/CustomCursor';
import { TerminalHacker } from './components/TerminalHacker';
import { DeveloperDashboardView } from './components/DeveloperDashboardView';
import { AppleMinimalView } from './components/AppleMinimalView';
import { FloatingCodeSystem } from './components/FloatingCodeSystem';
import { ProjectArchitectureAccordion } from './components/ProjectArchitectureAccordion';
import { SpotlightOverlay } from './components/SpotlightOverlay';
import { InteractiveMagazineView } from './components/InteractiveMagazineView';
import { FullscreenScrollStoryView } from './components/FullscreenScrollStoryView';
import { CustomStudioEngine, defaultStudioConfig, StudioConfig, themePresets } from './components/CustomStudioEngine';
import { CommandCenter } from './components/CommandCenter';
import { EliteExtraHUD } from './components/EliteExtraHUD';
import { PortfolioOSDashboard } from './components/PortfolioOSDashboard';
import { GlobalLoadingOS } from './components/GlobalLoadingOS';
import { GlintCard } from './components/GlintCard';
import { WorkspaceSnapshot, SystemNotification, ActivityLogItem } from './types';

// --- TYPES ---
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

export type ModeType = 'developer' | 'recruiter' | 'founder';

export type CursorStyleType =
  | 'dot'
  | 'glass'
  | 'neon'
  | 'magnetic'
  | 'blob'
  | 'cyber'
  | 'apple'
  | 'terminal';

export type Background3DType =
  | 'particles'
  | 'cubes'
  | 'grid'
  | 'galaxy';

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  results: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  downloads?: string;
  github?: string;
  demoUrl?: string;
  perfScore: number;
  screenshots?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  criteria: string;
  icon: string;
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

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
}

// --- STATIC DATA ---
export const projectsList: Project[] = [
  {
    id: 'helix-care',
    title: 'Helix Care (HelixDoc)',
    category: 'Healthcare',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    problem: 'Healthcare consultation systems was highly fragmented with insecure streams and low patient validation.',
    solution: 'Constructed HIPAA-compliant, interactive WebRTC video structure supporting instant slot bookings and secure payments.',
    architecture: 'Decoupled Clean Architecture coupled with highly robust BLoC pattern separating presentation from core socket servers.',
    challenges: 'Achieving low-latency live consultation parameters on fluctuating 3G/4G bandwidth frames.',
    results: 'Enabled uninterrupted 60fps streaming metrics, capturing excellent client appreciation metrics.',
    metrics: [
      { label: 'Latency Drop', value: '45%' },
      { label: 'Users Reached', value: '25,000+' },
      { label: 'App Store Rate', value: '4.9⭐' }
    ],
    techStack: ['Flutter Web/Mobile', 'Dart', 'WebRTC', 'Firebase', 'REST API', 'Stripe Integration', 'RBAC System'],
    demoUrl: 'https://qa.helixdoc.com',
    github: 'https://github.com/Dharmeshkatariya/helix-care',
    downloads: '25,000+',
    perfScore: 99,
    screenshots: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'resido-property',
    title: 'Resido Property Manager',
    category: 'Real Estate',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    problem: 'Building administrators struggled to log unit inventories when operating offline inside secure basements.',
    solution: 'Designed and engineered automated SQLite database synchronization triggered once internet connectivity resumes.',
    architecture: 'GetX MVC state architecture representing clean repositories combined with high-frequency SQL statements.',
    challenges: 'Maintaining precise synchronicity metrics between concurrent multi-tenant data updates.',
    results: 'Achieved 100% database conflict mitigation metrics since release, avoiding data loss completely.',
    metrics: [
      { label: 'Accurate Sync', value: '100%' },
      { label: 'Query Latency', value: '<4ms' },
      { label: 'Units Tracked', value: '45k+' }
    ],
    techStack: ['Flutter Web', 'GetX Controllers', 'SQLite', 'Firestore Sync', 'Admin Dashboard'],
    demoUrl: 'https://resido-dev.helixbeat.com',
    github: 'https://github.com/Dharmeshkatariya/resido-property',
    downloads: '5,000+',
    perfScore: 98,
    screenshots: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'khata-ledger',
    title: 'Khata Cash Book Ledger',
    category: 'Finance',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    problem: 'Traditional ledger books led to massive credit slip losses for micro-merchants in rural areas.',
    solution: 'Asynchronously generated automatic ledger backup lists connected to SMS messaging scheduler endpoints.',
    architecture: 'High-speed object-oriented HiveDB database layers wrapped in decoupled Riverpod providers for absolute state encapsulation.',
    challenges: 'Designing dynamic layout interfaces that consume minimal battery assets on low-end mobile hardware.',
    results: 'Drastically simplified customer billing cycles by eliminating paper bookkeeping slips.',
    metrics: [
      { label: 'Active Merchants', value: '20k+' },
      { label: 'Offline Query Duration', value: '<2ms' },
      { label: 'SMS Response Rate', value: '99.5%' }
    ],
    techStack: ['Flutter Mobile', 'HiveDB', 'REST API', 'SMS Scheduler', 'Localization i18n'],
    demoUrl: 'https://play.google.com/store/apps/details?id=com.shree.khata',
    github: 'https://github.com/Dharmeshkatariya/khata-app',
    downloads: '20,000+',
    perfScore: 97,
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'samaj-portal',
    title: 'Patel Samaj Community',
    category: 'Directories',
    thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    problem: 'Large communities had no secure network framework and search indexes to trace member verification codes.',
    solution: 'Designed robust real-time profiles verification databases backed with Cloud storage and secure filters.',
    architecture: 'Clean MVVM layout triggered by Riverpod, linking directly to Cloud Firestore listeners.',
    challenges: 'Optimizing continuous deep collection parameters on high-loaded indices under modest budgets.',
    results: 'Created rapid index lookup systems delivering instant search computations.',
    metrics: [
      { label: 'Verified Members', value: '8,000+' },
      { label: 'Index Query', value: '<8ms' },
      { label: 'Daily active loops', value: '4,000+' }
    ],
    techStack: ['Flutter Mobile', 'Firebase Auth', 'Cloud Firestore', 'Cloud Storage', 'Riverpod Hooks'],
    demoUrl: 'https://play.google.com/store/apps/details?id=com.dhasagam.patelsamaj',
    github: 'https://github.com/Dharmeshkatariya/patel-samaj',
    downloads: '8,000+',
    perfScore: 96,
    screenshots: [
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'vision-news',
    title: 'Vision Magazine Publisher',
    category: 'Media',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    problem: 'Rich magazine components and nested web layouts caused severe scrolling freezes on legacy devices.',
    solution: 'Constructed double view components running heavy HTML content parser filters inside Dart execution isolates.',
    architecture: 'Threaded isolate handlers returning parsed element widgets directly, keeping painting bounds highly reactive.',
    challenges: 'Balancing nested grid renderers with custom gesture pagination streams.',
    results: 'Sustained flawless and continuous 60fps-120fps readings during deep text parses.',
    metrics: [
      { label: 'Active Readers', value: '500k+' },
      { label: 'Rendering Speed', value: '120 FPS' },
      { label: 'Parse isolation', value: '100% Safe' }
    ],
    techStack: ['Flutter Mobile', 'Dart Isolates', 'HTML Content Parser', 'REST API', 'Dual Layouts'],
    demoUrl: 'https://play.google.com/store/apps/details?id=tw.com.gvm.dailynews',
    github: 'https://github.com/Dharmeshkatariya/vision-news',
    downloads: '100k+',
    perfScore: 97,
    screenshots: [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'roommatik-booking',
    title: 'Roommatik Roommate Finder',
    category: 'Real Estate',
    thumbnail: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    problem: 'College students struggled to search matches and book secure apartments with real-time keys.',
    solution: 'Engineered a modern roommate-matching and room reservation portal with QR-code entry triggers and biometric authentication.',
    architecture: 'Decoupled web modules deployed on highly reliable CDN setups linked to high-frequency booking streams.',
    challenges: 'Synchronizing real-time hostel vacancies and matches globally in real-time.',
    results: 'Drastically reduced matches and room locator timeline for several university groups.',
    metrics: [
      { label: 'Roommate Matches', value: '10k+' },
      { label: 'Booking to Key Time', value: '<3m' },
      { label: 'Active listings', value: '450+' }
    ],
    techStack: ['Flutter Web', 'Firebase Hosting', 'QR Validation Sdk', 'Biometric Auth'],
    demoUrl: 'https://roommatik-eae91.web.app',
    github: 'https://github.com/Dharmeshkatariya/roommatik',
    downloads: '15k+',
    perfScore: 95,
    screenshots: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'viosa-learning',
    title: 'Viosa Code Coach AI',
    category: 'Healthcare',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    problem: 'Static online learning boards lacked specialized real-time technical interview response testing algorithms.',
    solution: 'Designed a smart AI career coach app providing live mock interviews, real-time response assessment, custom resume builders, and secure local PDF exports.',
    architecture: 'Tightly coupled LLM integrations mediated by node security proxies, compiling resume streams dynamically.',
    challenges: 'Executing custom resume styling formats directly under strict iOS sandbox guidelines.',
    results: 'Accelerated job prep timelines with incredible self-prep ratings and high success ratios.',
    metrics: [
      { label: 'Resume Downloads', value: '12k+' },
      { label: 'Response Accuracy', value: '94%' },
      { label: 'Interview Mock loops', value: '8,000+' }
    ],
    techStack: ['Flutter Mobile', 'AI Model Integration', 'REST Web Services', 'PDF Rendering Engine'],
    demoUrl: 'https://play.google.com/store/apps/details?id=com.viosa.app',
    github: 'https://github.com/Dharmeshkatariya/viosa',
    downloads: '12,000+',
    perfScore: 98,
    screenshots: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'mtz-corp',
    title: 'MTZ Web & Cloud Agency',
    category: 'Real Estate',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    problem: 'A software studio required an immersive, highly graphical corporate platform displaying their cross-platform capabilities.',
    solution: 'Custom designed and developed a fast, responsive company website utilizing adaptive layouts and hardware-accelerated transitions.',
    architecture: 'Optimized asset chunking and CDN deployment targeting low bounce rates.',
    challenges: 'Handling extensive SVG asset parsing cleanly across both legacy web-drawers and Safari engines.',
    results: 'Sustained perfect 100/100 Core Web Vitals and first paint benchmarks under a sub-second load frame.',
    metrics: [
      { label: 'Core Web Vital', value: '100/100' },
      { label: 'First Contentful Paint', value: '<0.8s' },
      { label: 'Inbound Inquiries', value: '3x Gain' }
    ],
    techStack: ['Flutter Web', 'Firebase Cloud Deploy', 'Responsive Assets Engine'],
    demoUrl: 'https://mtzinfotech.com/#/',
    github: 'https://github.com/Dharmeshkatariya/mtz-infotech',
    downloads: '1k+',
    perfScore: 96,
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const experienceTimeline = [
  {
    id: 'exp-senior',
    role: 'Flutter Developer',
    company: 'Shree Software Solution',
    period: 'Sep 2023 - Present',
    location: 'Surat, Gujarat, India',
    details: [
      'Developed and engineered multiple high-performance cross-platform mobile applications using Flutter.',
      'Constructed highly responsive and polished client interface architectures, boosting fluid user response speed.',
      'Integrated unified REST API endpoints to drive secure, seamless back-end server communication channels.',
      'Diagnosed complex runtime memory anomalies, maintaining and fixing native legacy repositories.'
    ],
    tags: ['Flutter SDK', 'Dart Isolates', 'REST Web Services', 'State Architecture', 'Figma Integration']
  },
  {
    id: 'exp-developer',
    role: 'Flutter Developer',
    company: 'Mtz infotech',
    period: 'Sep 2022 - Sep 2023',
    location: 'Surat, Gujarat, India',
    details: [
      'Designed, built, and launched enterprise Android and iOS mobile applications utilizing a clean Flutter codebase.',
      'Collaborated in high-velocity agile pods to translate product requirement papers into responsive products.',
      'Managed end-to-end continuous mobile distribution operations with Apple TestFlight and Google Developer panels.',
      'Crafted fluid, reactive web applications with Flutter on serverless architectures.'
    ],
    tags: ['Flutter SDK', 'Dart', 'GetX Controllers', 'TestFlight Deployments', 'Mobile UX Design']
  }
];

export const badgesList: AchievementBadge[] = [
  { id: 'badge-ui', name: 'UI Architect Extraordinaire', description: 'Apply multiple dynamic responsive layout formats with rich parallax.', unlocked: true, criteria: 'Switch layouts in dashboard', icon: 'Layers' },
  { id: 'badge-state', name: 'State Flow Sovereign', description: 'Analyze performance benchmark records between BLoC, GetX and Riverpod.', unlocked: true, criteria: 'Interact with Lab state switcher', icon: 'Cpu' },
  { id: 'badge-sync', name: 'Offline Master', description: 'Sync offline ledger caches with cloud servers successfully.', unlocked: false, criteria: 'Trigger digital synchronization in Lab', icon: 'Database' },
  { id: 'badge-talk', name: 'Hologram Communicator', description: 'Consult AI companion with voice commands or trigger project review.', unlocked: false, criteria: 'Interact with AI Assistant', icon: 'Sparkles' }
];

export const blogPosts: BlogPost[] = [
  { id: 'p1', title: 'Deep dive into Flutter Isolates Threading model', category: 'High Performance', readTime: '5 min read', summary: 'How to safely run heavy SQLite parse actions on secondary Dart execution streams without locking the main painting thread.' },
  { id: 'p2', title: 'Clean Architecture with dynamic Flutter UI', category: 'Architecture', readTime: '8 min read', summary: 'Constructing robust presentation, domain and database layer architectures that remain perfectly decoupled.' },
  { id: 'p3', title: 'Optimizing high frequency SQLite offline syncs', category: 'Databases', readTime: '6 min read', summary: 'Mitigating database update lock challenges through automated queue retry systems inside low internet areas.' }
];

const getLocalConfig = <T,>(key: string, defVal: T): T => {
  if (typeof window === 'undefined') return defVal;
  const stored = localStorage.getItem(key);
  if (stored === null) return defVal;
  try {
    return JSON.parse(stored) as T;
  } catch (_) {
    return stored as unknown as T;
  }
};

export default function App() {
  // Stateful Dynamic Backend Data Arrays
  const [profile, setProfile] = useState<any>({
    name: "Dharmesh Ahir",
    title: "Flutter Developer",
    email: "katariyadharmesh658@gmail.com",
    mobile: "+91 6354464371",
    github: "https://github.com/Dharmeshkatariya",
    linkedin: "https://linkedin.com/in/dharmesh-ahir",
    address: "419, 4th Floor, Nilkanth Plaza, Yogi Chowk, Chikuwadi, Nana Varachha, Surat, Gujarat 395010",
    bio: "Senior Flutter Developer with 3+ years of expert engineering experience crafting high-performance, multithreaded cross-platform mobile apps using clean BLoC/Riverpod setups.",
    metrics: {
      latencyReduction: "45%",
      renderingRate: "120 FPS",
      activeUsers: "25k+"
    },
    typewriterSequence: ['Mobile Apps', 'iOS & Android', 'State Machines', 'Creative Architect'],
    downloadCvLabel: "Download CV",
    cvFilename: "Dharmesh_Ahir_Flutter_Resume.pdf",
    availabilityStatus: "Available for projects"
  });

  // --- TYPEWRITER CONFIG ---
  const typingSequence = profile?.typewriterSequence || ['Mobile Apps', 'iOS & Android', 'State Machines', 'Creative Architect'];
  const [typedText, setTypedText] = useState('Mobile ');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(130);

  useEffect(() => {
    if (!typingSequence || typingSequence.length === 0) return;
    let timer: any;
    const tick = () => {
      const safeWordIdx = wordIdx % typingSequence.length;
      const activeWord = typingSequence[safeWordIdx] || '';
      if (!isDeleting) {
        setTypedText(activeWord.substring(0, typedText.length + 1));
        setTypeSpeed(110);
        if (typedText === activeWord) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setTypedText(activeWord.substring(0, typedText.length - 1));
        setTypeSpeed(50);
        if (typedText === '') {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % typingSequence.length);
          return;
        }
      }
      timer = setTimeout(tick, typeSpeed);
    };
    timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIdx, typeSpeed, typingSequence]);

  // --- STATE MATRIX ---
  // --- PORTFOLIO OS CONFIGS ---
  const [showOsPanel, setShowOsPanel] = useState<boolean>(false);
  const [isEngineLoading, setIsEngineLoading] = useState<boolean>(() => {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('os_engine_booted_v1') !== 'true';
    }
    return true;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    return [
      {
        id: 'boot-notif',
        title: 'Portfolio OS Loaded',
        message: 'Successfully mounted dynamic components. Welcome back to Dharmesh Ahir\'s high-performance laboratory.',
        category: 'success',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() => {
    return [
      {
        id: 'log-boot',
        action: 'BOOT_SYSTEM',
        details: 'Mounted dynamic background shader systems & initialized WebRTC channels.',
        timestamp: new Date().toISOString(),
        category: 'operational'
      }
    ];
  });

  const [showResumeSessionAlert, setShowResumeSessionAlert] = useState<boolean>(false);
  const [lastSessionRecord, setLastSessionRecord] = useState<any>(null);

  const addNotification = (title: string, message: string, category: 'info' | 'success' | 'warn' | 'system') => {
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      category,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 49)]);
  };

  const addActivityLog = (action: string, details: string, category: 'workspace' | 'theme' | 'ai' | 'portfolio' | 'operational') => {
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}`,
      action,
      details,
      timestamp: new Date().toISOString(),
      category
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 99)]);
  };

  const [studioConfig, setStudioConfigState] = useState<StudioConfig>(() => {
    return getLocalConfig<StudioConfig>('portfolio_studio_config_v5', defaultStudioConfig);
  });

  const [layout, setLayoutState] = useState<LayoutType>(() => getLocalConfig<LayoutType>('portfolio_layout', 'classic'));
  const [canvasScale, setCanvasScale] = useState<number>(100);
  const [perspectiveAngle, setPerspectiveAngle] = useState<number>(45);
  const [theme, setThemeState] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('init_theme_royal_dark_v5')) {
      localStorage.setItem('init_theme_royal_dark_v5', 'true');
      localStorage.setItem('portfolio_layout', JSON.stringify('classic'));
      localStorage.setItem('portfolio_theme', JSON.stringify('purple'));
      localStorage.setItem('portfolio_dark', JSON.stringify(true));
      return 'purple';
    }
    return getLocalConfig<ThemeType>('portfolio_theme', 'purple');
  });
  const [mode, setModeState] = useState<ModeType>(() => getLocalConfig<ModeType>('portfolio_mode', 'developer'));
  const [cursorStyle, setCursorStyleState] = useState<CursorStyleType>(() => getLocalConfig<CursorStyleType>('portfolio_cursor', 'glass'));
  const [bgType, setBgTypeState] = useState<Background3DType>(() => getLocalConfig<Background3DType>('portfolio_bg', 'particles'));
  const [threeDimensionMode, setThreeDimensionModeState] = useState<'auto' | 'enabled' | 'disabled'>(() => getLocalConfig<'auto' | 'enabled' | 'disabled'>('portfolio_three_d_mode', 'auto'));
  const [isLowEndDeviceDetected, setIsLowEndDeviceDetected] = useState<boolean>(false);

  const setThreeDimensionMode = (val: 'auto' | 'enabled' | 'disabled') => {
    setThreeDimensionModeState(val);
    localStorage.setItem('portfolio_three_d_mode', JSON.stringify(val));
    addNotification('Environment Shift', `Adjusted 3D hardware canvas mode to ${val.toUpperCase()}`, 'info');
    addActivityLog('ADJUST_ENVIRONMENT', `3D canvas mode switched to ${val}`, 'system');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slowCpu = (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4);
      const slowGpu = (window.innerWidth < 768);
      if (slowCpu || slowGpu) {
        setIsLowEndDeviceDetected(true);
        if (threeDimensionMode === 'auto') {
          addNotification('Adaptive Engine Mode', 'Lower end system capabilities sensed. 3D engine scaled back to assure perfect viewport frames.', 'system');
        }
      }
    }
  }, [threeDimensionMode]);

  const startThreeDActive = threeDimensionMode === 'enabled' || (threeDimensionMode === 'auto' && !isLowEndDeviceDetected);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('init_theme_royal_dark_v5')) {
      return true;
    }
    return getLocalConfig<boolean>('portfolio_dark', true);
  });
  const [isMuted, setIsMuted] = useState<boolean>(() => getLocalConfig<boolean>('portfolio_muted', true));

  // Visual control slidables
  const [motionIntensity, setMotionIntensity] = useState<number>(() => getLocalConfig<number>('portfolio_motion_density', 80));
  const [glowIntensity, setGlowIntensity] = useState<number>(() => getLocalConfig<number>('portfolio_glow_density', 85));
  const [glassStrength, setGlassStrength] = useState<number>(() => getLocalConfig<number>('portfolio_glass_density', 75));
  const [blurAmount, setBlurAmount] = useState<number>(() => getLocalConfig<number>('portfolio_blur_density', 70));
  const [shadowDepth, setShadowDepth] = useState<number>(() => getLocalConfig<number>('portfolio_shadow_density', 60));
  const [particleDensity, setParticleDensity] = useState<number>(() => getLocalConfig<number>('portfolio_particle_density', 100));
  const [animationMode, setAnimationMode] = useState<'reduced' | 'cinematic' | 'extreme'>(() => getLocalConfig<'reduced' | 'cinematic' | 'extreme'>('portfolio_anim_density', 'cinematic'));
  
  // Workspace tabs
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<string>('hero');

  // Resume Download Tracking States
  const [cvDownloadState, setCvDownloadState] = useState<'idle' | 'downloading' | 'success'>('idle');
  const [cvProgress, setCvProgress] = useState<number>(0);

  // Custom setters for persistence
  const setLayout = (val: LayoutType) => {
    localStorage.setItem('portfolio_layout', JSON.stringify(val));
    setLayoutState(val);
    addActivityLog('UPDATE_LAYOUT', `Switched viewport perspective layout to: [${val}].`, 'workspace');
    addNotification('Viewport Transformed', `Applied [${val}] skin representation successfully.`, 'info');
  };
  const setTheme = (val: ThemeType) => {
    localStorage.setItem('portfolio_theme', JSON.stringify(val));
    setThemeState(val);
    addActivityLog('UPDATE_THEME', `Color spectral atmosphere re-aligned to [${val}].`, 'theme');
    addNotification('Atmosphere Shifted', `Selected [${val}] theme colors schema successfully.`, 'success');

    const mapping: { [key: string]: string } = {
      'cyberpunk-neon': 'cyberpunk',
      'purple': 'purple',
      'ocean': 'ocean',
      'sunset': 'sunset',
      'forest': 'forest',
      'nord': 'nord',
      'amoled': 'amoled',
      'flutter-official': 'flutter',
      'tesla-black': 'tesla'
    };
    const mapped = mapping[val] || val;
    const defaultColors = themePresets[mapped]?.customColors;
    if (defaultColors) {
      setStudioConfigState(prev => {
        const next = {
          ...prev,
          activeThemePreset: mapped,
          customColors: { ...defaultColors }
        };
        localStorage.setItem('portfolio_studio_config_v5', JSON.stringify(next));
        return next;
      });
    }
  };
  const setMode = (val: ModeType) => {
    localStorage.setItem('portfolio_mode', JSON.stringify(val));
    setModeState(val);
  };
  const setCursorStyle = (val: CursorStyleType) => {
    localStorage.setItem('portfolio_cursor', JSON.stringify(val));
    setCursorStyleState(val);

    setStudioConfigState(prev => {
      const next = { ...prev, cursorStyleType: val };
      localStorage.setItem('portfolio_studio_config_v5', JSON.stringify(next));
      return next;
    });
  };
  const setBgType = (val: Background3DType) => {
    localStorage.setItem('portfolio_bg', JSON.stringify(val));
    setBgTypeState(val);

    setStudioConfigState(prev => {
      const next = { ...prev, activeScene: val };
      localStorage.setItem('portfolio_studio_config_v5', JSON.stringify(next));
      return next;
    });
  };

  const setStudioConfig = (newConfig: StudioConfig) => {
    localStorage.setItem('portfolio_studio_config_v5', JSON.stringify(newConfig));
    setStudioConfigState(newConfig);

    if (newConfig.activeScene) {
      setBgTypeState(newConfig.activeScene as any);
    }
    if (newConfig.cursorStyleType) {
      setCursorStyleState(newConfig.cursorStyleType as any);
    }
    if (newConfig.activeThemePreset && newConfig.activeThemePreset !== 'custom') {
      const inverseMaps: { [key: string]: ThemeType } = {
        'cyberpunk': 'cyberpunk-neon' as any,
        'flutter': 'flutter-official' as any,
        'tesla': 'tesla-black' as any
      };
      const originalLegacyTheme = inverseMaps[newConfig.activeThemePreset] || newConfig.activeThemePreset as ThemeType;
      setThemeState(originalLegacyTheme);
    }
  };

  // Panels & Drawers
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [aiLayoutMode, setAiLayoutMode] = useState<'orb' | 'bubble' | 'dock' | 'sidebar'>('bubble');
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Assistant Chat States
  const [aiHistory, setAiHistory] = useState<ChatMessage[]>([]);
  const [aiInput, setAiInput] = useState<string>('');
  const [aiTyping, setAiTyping] = useState<boolean>(false);
  const [aiPresence, setAiPresence] = useState<'listening' | 'reasoning' | 'searching' | 'memory recall' | 'generating' | 'ready'>('ready');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isAiMaximized, setIsAiMaximized] = useState<boolean>(false);
  const [aiMemory, setAiMemory] = useState<string[]>([
    'Default Engine: Gemini-2.5-Flash',
    'Location Scope: Surat, Gujarat, IN',
    'Response Latency Optimize: Enabled',
  ]);

  // Global Central Floating HUD Event Bus
  useEffect(() => {
    const handleToggleAi = () => setIsAiOpen(prev => !prev);
    const handleOpenAi = () => setIsAiOpen(true);
    const handleToggleSettings = () => setShowSettings(prev => !prev);
    
    window.addEventListener('toggle_ai_chat', handleToggleAi);
    window.addEventListener('open_ai_chat', handleOpenAi);
    window.addEventListener('toggle_config_studio', handleToggleSettings);
    
    return () => {
      window.removeEventListener('toggle_ai_chat', handleToggleAi);
      window.removeEventListener('open_ai_chat', handleOpenAi);
      window.removeEventListener('toggle_config_studio', handleToggleSettings);
    };
  }, []);

  // --- PORTFOLIO OS SESSIONS MEMORY MATRIX ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedRecord = localStorage.getItem('portfolio_last_sessions_v1');
        if (storedRecord) {
          const record = JSON.parse(storedRecord);
          if (record.layout && record.theme && record.mode) {
            // Only fire memory recovery challenge if it matches non-trivial settings
            if (record.layout !== 'classic' || record.theme !== 'purple' || record.mode !== 'developer') {
              setLastSessionRecord(record);
              setShowResumeSessionAlert(true);
              setTimeout(() => {
                try { playBeep(523, 0.12); } catch (_) {}
              }, 1200);
            }
          }
        }
      } catch (_) {}
    }
  }, []);

  // Sync state tracking changes for session memory
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const record = {
        layout,
        theme,
        mode,
        timestamp: Date.now()
      };
      localStorage.setItem('portfolio_last_sessions_v1', JSON.stringify(record));
    }
  }, [layout, theme, mode]);

  // Command Palette Search State
  const [cmdSearchQuery, setCmdSearchQuery] = useState<string>('');

  // Interactive Lab playground
  const [labStateBenchmark, setLabStateBenchmark] = useState<'GetX' | 'BLoC' | 'Riverpod'>('BLoC');
  const [labIsolateTask, setLabIsolateTask] = useState<boolean>(false);
  const [labConsoleLines, setLabConsoleLines] = useState<string[]>([
    'System active. Port: 3000 mapped.',
    'Dart VM initialized successfully. Click run isolate to test isolates.'
  ]);
  const [firebaseActiveSync, setFirebaseActiveSync] = useState<boolean>(false);
  const [firebaseProgress, setFirebaseProgress] = useState<number>(0);
  const [webrtcActiveStream, setWebrtcActiveStream] = useState<boolean>(false);

  // Contact States
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');
  const [sentMessageNotify, setSentMessageNotify] = useState<string>('');

  // Stateful Dynamic Backend Data Arrays
  const [projects, setProjects] = useState<Project[]>(projectsList);
  const [experience, setExperience] = useState<Experience[]>(() => {
    return experienceTimeline.map((exp: any) => ({
      ...exp,
      skills: exp.skills || exp.tags || [],
      tags: exp.tags || exp.skills || []
    }));
  });
  const [contacts, setContacts] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);

  // Real-time server sync operation
  useEffect(() => {
    async function loadBackendData() {
      try {
        const projRes = await fetch("/api/projects");
        if (projRes.ok) {
          const fetchedProj = await projRes.json();
          if (Array.isArray(fetchedProj) && fetchedProj.length > 0) {
            setProjects(fetchedProj);
          }
        }
      } catch (err) {
        console.warn("Failed loading live backend projects fallback used:", err);
      }

      try {
        const expRes = await fetch("/api/experience");
        if (expRes.ok) {
          const fetchedExp = await expRes.json();
          if (Array.isArray(fetchedExp) && fetchedExp.length > 0) {
            const normalized = fetchedExp.map((exp: any) => ({
              ...exp,
              skills: exp.skills || exp.tags || [],
              tags: exp.tags || exp.skills || []
            }));
            setExperience(normalized);
          }
        }
      } catch (err) {
        console.warn("Failed loading live backend experience fallback used:", err);
      }

      try {
        const contactsRes = await fetch("/api/contacts");
        if (contactsRes.ok) {
          const fetchedContacts = await contactsRes.json();
          if (Array.isArray(fetchedContacts)) {
            setContacts(fetchedContacts);
          }
        }
      } catch (err) {
        console.warn("Failed loading live backend messages:", err);
      }

      try {
        const profileRes = await fetch("/api/profile");
        if (profileRes.ok) {
          const fetchedProfile = await profileRes.json();
          if (fetchedProfile && fetchedProfile.name) {
            setProfile(fetchedProfile);
          }
        }
      } catch (err) {
        console.warn("Failed loading live backend profile fallback used:", err);
      }

      try {
        const socialsRes = await fetch("/api/socials");
        if (socialsRes.ok) {
          const fetchedSocials = await socialsRes.json();
          if (Array.isArray(fetchedSocials) && fetchedSocials.length > 0) {
            setSocials(fetchedSocials);
          }
        }
      } catch (err) {
        console.warn("Failed loading live backend socials fallback used:", err);
      }
    }
    loadBackendData();
  }, []);

  const handleDynamicInquirySubmit = async (name: string, email: string, msg: string, layoutSource: string = "classic") => {
    setContactName(name);
    setContactEmail(email);
    setContactMsg(msg);
    setSentMessageNotify(`[SYNC] Connecting secure channels to record payload...`);
    playBeep(520, 0.1);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg, layoutType: layoutSource })
      });

      if (response.ok) {
        const resData = await response.json();
        setSentMessageNotify(`[SUCCESS] Verified securely in real-time db! Thank you ${name}.`);
        playBeep(880, 0.2);
        
        // Reload contacts list
        const contactsRes = await fetch("/api/contacts");
        if (contactsRes.ok) {
          const fetchedContacts = await contactsRes.json();
          if (Array.isArray(fetchedContacts)) {
            setContacts(fetchedContacts);
          }
        }
      } else {
        setSentMessageNotify(`[LOCAL_ONLY] Recorded inquiry locally. Thanks ${name}!`);
      }
    } catch (err) {
      setSentMessageNotify(`[LOCAL_ONLY] Connected channel fallback registered. Thank you ${name}!`);
    }
  };

  // Narrative states
  const [aboutActiveSubTab, setAboutActiveSubTab] = useState<'work' | 'skills' | 'badges'>('work');

  // Mouse vector coordination for index tracking and dynamic tilt values
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseRelative, setMouseRelative] = useState({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Achievements State
  const [badges, setBadges] = useState<AchievementBadge[]>(badgesList);

  // Category filter state for projects catalog
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState<'all' | 'Mobile Apps' | 'Web Services'>('all');

  // HTML5 Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const thoughtTimersRef = useRef<{ [key: string]: any }>({});

  // Welcome chat initialisation
  useEffect(() => {
    setAiHistory([
      { id: 'welcome', role: 'model', text: "Hello, I am Dharmesh AI, representing Dharmesh Ahir. Ask me about custom isolates, state management, HIPAA WebRTC or download my CV!", timestamp: '19:02' }
    ]);
  }, []);

  // Synchronize dynamic light-mode / dark-mode and theme classes with document.body DOM layer
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const allThemeClasses = [
        'theme-ocean-blue', 'theme-sunset-orange', 'theme-forest-green',
        'theme-royal-purple', 'theme-cyberpunk-neon', 'theme-mono',
        'theme-flutter-official', 'theme-material-you', 'theme-apple-white',
        'theme-amoled', 'theme-nord', 'theme-dev-dark', 'theme-tesla-black',
        'theme-matrix-green'
      ];
      allThemeClasses.forEach(c => document.body.classList.remove(c));
      const themeClass = getThemeClass();
      document.body.classList.add(themeClass);

      if (isDarkMode) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light-mode');
      }
    }
  }, [isDarkMode, theme]);

  // --- SOUND SYNTHESIZER ---
  const playBeep = (freq: number, dur: number) => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + dur);
    } catch (_) {}
  };

  const alertSynth = () => {
    playBeep(440, 0.15);
  };

  // --- KEYBOARD CONFIGS ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCmdPaletteOpen(false);
        setIsAiOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMuted]);

  // --- MOUSE TRACKER COORDINATORS ---
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const width = window.innerWidth;
      const height = window.innerHeight;
      const relX = (e.clientX / width - 0.5) * 2;
      const relY = (e.clientY / height - 0.5) * 2;
      setMouseRelative({ x: relX, y: relY });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // --- HTML5 PERFORMANCE PHYSICS CANVAS SYSTEM ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const count = 120;

    const getPrimaryHexColor = () => {
      switch (theme) {
        case 'forest': return '#00e676';
        case 'sunset': return '#ff5722';
        case 'purple': return '#d500f9';
        case 'cyberpunk': return '#ff007f';
        case 'nord': return '#88c0d0';
        default: return '#00e5ff';
      }
    };

    const colorHex = getPrimaryHexColor();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: colorHex
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (bgType === 'particles') {
        // Particles Universe
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx + mouseRelative.x * 0.2;
          p.y += p.vy - mouseRelative.y * 0.2;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Connective nodes logic
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 229, 255, ${1 - dist / 100})`;
              ctx.lineWidth = 0.45;
              ctx.stroke();
            }
          }
        }
      } else if (bgType === 'grid') {
        // Perspective Matrix Grid
        ctx.strokeStyle = `rgba(0, 229, 255, 0.15)`;
        ctx.lineWidth = 0.5;

        // Horizontals
        for (let y = height / 2; y < height; y += 25) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Perspective Verticals
        const centerX = width / 2;
        for (let x = -width; x < width * 2; x += 100) {
          ctx.beginPath();
          ctx.moveTo(centerX, height / 3);
          ctx.lineTo(x + mouseRelative.x * 120, height);
          ctx.stroke();
        }
      } else if (bgType === 'cubes') {
        // Floating Wireframe boxes simulated in 2D
        ctx.strokeStyle = colorHex;
        ctx.lineWidth = 0.8;
        const time = Date.now() * 0.001;

        for (let i = 0; i < 8; i++) {
          const cx = (width / 8) * i + Math.sin(time + i) * 30 + width * 0.05 + mouseRelative.x * 40;
          const cy = height / 2 + Math.cos(time + i * 2) * 80 - mouseRelative.y * 40;
          const size = 30 + Math.sin(time + i) * 10;

          ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);
          ctx.strokeRect(cx - size / 1.5, cy - size / 1.5, size, size);
        }
      } else if (bgType === 'galaxy') {
        // Concentric Orbital pathways
        ctx.strokeStyle = `rgba(0, 229, 255, 0.08)`;
        ctx.lineWidth = 1;
        const centerX = width / 2 + mouseRelative.x * 50;
        const centerY = height / 2.5 - mouseRelative.y * 50;
        const time = Date.now() * 0.0005;

        for (let r = 80; r < 400; r += 60) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
          ctx.stroke();

          // Orbit planet indicator dot
          const angle = time * (150 / r);
          const px = centerX + Math.cos(angle) * r;
          const py = centerY + Math.sin(angle) * r;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = colorHex;
          ctx.fill();
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [bgType, theme, mouseRelative.x, mouseRelative.y]);

  // --- ACTIONS SYSTEM SPECTRUM ---
  const changeLayout = (lay: LayoutType) => {
    setLayout(lay);
    playBeep(220, 0.1);
  };

  const changeTheme = (th: ThemeType) => {
    setTheme(th);
    playBeep(330, 0.15);
  };

  const askGuideQuestion = (q: string) => {
    setAiInput(q);
    triggerAIPortfolioQuery(q);
  };

  const handleSpeechInput = () => {
    handleVoiceConsult();
  };

  const startRtcChannel = () => {
    if (webrtcActiveStream) {
      setWebrtcActiveStream(false);
      setLabConsoleLines((prev) => [...prev, '>> WebRTC session terminated securely. [OK]']);
      return;
    }
    setWebrtcActiveStream(true);
    setLabConsoleLines((prev) => [...prev, '>> Peer signaling established. Requesting ICE Candidate codes STUN/TURN...', '>> SDP description negotiated. Remote peer connected securely at 62FPS locked.']);
  };

  const printCV = () => {
    if (cvDownloadState !== 'idle') return;
    playBeep(220, 0.1);
    setCvDownloadState('downloading');
    setCvProgress(0);
    
    // Broadcast initial download event to notifications & telemetry
    addNotification('PDF Download Initiated', 'Retrieving Dharmesh_Ahir_Resume.pdf from static storage assets...', 'info');
    addActivityLog('CV_DOWNLOAD_START', 'Secure direct byte fetch triggered for Dharmesh_Ahir_Resume.pdf', 'user');

    // Simulate interactive micro-ticks with status pulse
    let currentPrg = 0;
    const intervalRef = setInterval(() => {
      currentPrg += 10;
      setCvProgress(currentPrg);
      
      // Trigger tick sound
      playBeep(300 + currentPrg * 4, 0.02);
      
      if (currentPrg >= 100) {
        clearInterval(intervalRef);
        
        // Directly download the static PDF from physical storage paths as specified
        const link = document.createElement('a');
        link.href = '/assets/resume/Dharmesh_Ahir_Resume.pdf';
        link.download = 'Dharmesh_Ahir_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Transition to success state
        setCvDownloadState('success');
        playBeep(880, 0.2);
        
        // Success toasts and logging telemetry as requested
        addNotification('CV Direct Delivery Complete', 'Dharmesh_Ahir_Resume.pdf successfully downloaded to regional local storage.', 'success');
        addActivityLog('CV_DOWNLOAD_SUCCESS', 'Transmission secure. Received 100% of PDF byte array stream over local proxy lanes.', 'system');

        // Reset state after show concludes
        setTimeout(() => {
          setCvDownloadState('idle');
          setCvProgress(0);
        }, 3000);
      }
    }, 120);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.email || 'katariyadharmesh658@gmail.com');
    setCopiedEmail(true);
    alertSynth();
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'ocean': return 'theme-ocean-blue';
      case 'sunset': return 'theme-sunset-orange';
      case 'forest': return 'theme-forest-green';
      case 'purple': return 'theme-royal-purple';
      case 'cyberpunk': return 'theme-cyberpunk-neon';
      default: return `theme-${theme}`;
    }
  };

  const inspectProject = (p: Project) => {
    setSelectedProject(p);
    playBeep(600, 0.08);
  };

  const triggerAIPortfolioQuery = async (overrideMsg?: string) => {
    const messageToSend = overrideMsg || aiInput;
    if (!messageToSend.trim()) return;

    // Reset and initiate multi-layered AI thought cycle animation parameters
    setAiPresence('reasoning');
    if (thoughtTimersRef.current) {
      Object.values(thoughtTimersRef.current).forEach(clearTimeout);
      thoughtTimersRef.current = {};
    }
    
    thoughtTimersRef.current.t1 = setTimeout(() => setAiPresence('searching'), 450);
    thoughtTimersRef.current.t2 = setTimeout(() => setAiPresence('memory recall'), 1100);
    thoughtTimersRef.current.t3 = setTimeout(() => setAiPresence('generating'), 1900);

    // Add user message to history
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: messageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiHistory((prev) => [...prev, userMsg]);
    setAiInput('');
    setAiTyping(true);
    playBeep(440, 0.1);

    // AI Portfolio Agent - Client-Side Action Interceptor
    const query = messageToSend.toLowerCase();
    
    // Adaptive Layout Intelligence - Recruiter Presence Detection
    if (query.includes('hire') || query.includes('recruit') || query.includes('job') || query.includes('interview') || query.includes('salary')) {
      if (mode !== 'recruiter') {
        setTimeout(() => {
          try {
            addNotification('Adaptive Intelligence', 'Detected recruiter presence. Automatic switch to Recruiter Focus Workspace applied.', 'system');
            setMode('recruiter');
            setLayout('classic'); 
            addActivityLog('ADAPTIVE_TRIGGER', 'Automating parameters preset to match Recruiter expectations.', 'workspace');
            playBeep(987, 0.1);
          } catch (_) {}
        }, 800);
      }
    }

    let actionExecuted = false;
    let agentFeedback = '';

    if (query.includes('cyberpunk') && (query.includes('theme') || query.includes('style') || query.includes('preset'))) {
      setTheme('cyberpunk');
      setBgType('grid');
      setCursorStyle('cyber');
      actionExecuted = true;
      agentFeedback = "👾 **Cyberpunk Neon Theme** fully online! System design grids in custom matrix backgrounds and custom neon particle shaders have been loaded successfully.";
      setAiMemory((prev) => Array.from(new Set([...prev, 'Active Theme: Cyberpunk'])));
    } else if (query.includes('flutter') && query.includes('theme')) {
      setTheme('flutter-official');
      setBgType('particles');
      setCursorStyle('glass');
      actionExecuted = true;
      agentFeedback = "💙 **Flutter Official Custom Theme** fully activated! Embedded sound indices and beautiful material color overlays have been deployed.";
      setAiMemory((prev) => Array.from(new Set([...prev, 'Active Theme: Flutter Official'])));
    } else if (query.includes('dark') && (query.includes('theme') || query.includes('style')) || query.includes('amoled') || query.includes('tesla')) {
      setTheme('tesla-black');
      setBgType('cubes');
      setCursorStyle('terminal');
      actionExecuted = true;
      agentFeedback = "🎬 **Tesla Black Theme** loaded! High-contrast vectors rendered beautifully on adaptive dark canvas modules.";
      setAiMemory((prev) => Array.from(new Set([...prev, 'Active Theme: Tesla Black'])));
    } else if (query.includes('founder') || query.includes('pitch') || query.includes('cto')) {
      setTheme('sunset');
      setLayout('glassmorphism-studio');
      setBgType('galaxy');
      actionExecuted = true;
      agentFeedback = "🚀 **CTO / Pitch Mode** initialized instantly! Presenting structural startup components, WebRTC streaming consultation layers, and funding pitches analytics dashboards.\n\n[FOUNDER_SUMMARY_CARD]";
      setAiMemory((prev) => Array.from(new Set([...prev, 'Active Mode: Startup Founder'])));
    } else if (query.includes('developer') || query.includes('workspace')) {
      setTheme('tesla-black');
      setLayout('terminal-hacker');
      setCursorStyle('terminal');
      setBgType('cubes');
      actionExecuted = true;
      agentFeedback = "💻 **Developer Workspace** fully configured! Custom terminal commands console, active thread analyzers, and interactive sandboxes now online.\n\n[ARCH_REVIEW_CARD]";
      setAiMemory((prev) => Array.from(new Set([...prev, 'Active Mode: Developer Workspace'])));
    } else if (query.includes('recruiter') || query.includes('hire') || query.includes('job') || query.includes('work')) {
      setTheme('apple-white');
      setLayout('developer-dashboard');
      setCursorStyle('apple');
      setBgType('particles');
      actionExecuted = true;
      agentFeedback = "👔 **Recruiter Focus Dashboard** fully configured! Critical performance stats, structured timeline blocks, and direct quick-contact actions laid out cleanly.\n\n[RECRUITER_SUMMARY_CARD]";
      setAiMemory((prev) => Array.from(new Set([...prev, 'Active Mode: Recruiter Focus'])));
    } else if (query.includes('cv') || query.includes('resume') || query.includes('download')) {
      const link = document.createElement('a');
      link.href = '#cv-direct';
      link.click();
      actionExecuted = true;
      agentFeedback = "📁 Initiated premium **Resume (PDF)** download successfully! The system has compiled and generated a modern print-ready portfolio summary.\n\n[RECRUITER_SUMMARY_CARD]";
      setAiMemory((prev) => Array.from(new Set([...prev, 'Document Triggered: Resume PDF'])));
    } else if (query.includes('project') || query.includes('show') || query.includes('case')) {
      if (query.includes('helix') || query.includes('doctor') || query.includes('care') || query.includes('health') || query.includes('tele')) {
        const btn = document.getElementById('operations-hub-btn');
        if (btn) btn.click();
        actionExecuted = true;
        agentFeedback = "🏥 Opening **Helix Care Telehealth Interactive Case Study**! Explore its clean design structures, HIPAA-compliant WebRTC consultation nodes, and low-latency rendering outcomes.";
        setAiMemory((prev) => Array.from(new Set([...prev, 'Browsed Project: Helix Care'])));
      } else if (query.includes('resido') || query.includes('property') || query.includes('estate') || query.includes('asset')) {
        const btn = document.getElementById('operations-hub-btn');
        if (btn) btn.click();
        actionExecuted = true;
        agentFeedback = "🏠 Opening **Resido Real Estate Asset Case Study**! Review its advanced offline-first SQLite caches, version synchronizations, and concurrent conflict control systems.";
        setAiMemory((prev) => Array.from(new Set([...prev, 'Browsed Project: Resido'])));
      } else if (query.includes('khata') || query.includes('ledger') || query.includes('finance')) {
        const btn = document.getElementById('operations-hub-btn');
        if (btn) btn.click();
        actionExecuted = true;
        agentFeedback = "📈 Opening **Khata Digital Ledger Case Study**! Code repositories and SQLite models optimized for mid-range systems loaded into your layout.";
        setAiMemory((prev) => Array.from(new Set([...prev, 'Browsed Project: Khata'])));
      }
    }

    const startStreaming = (responseRawText: string) => {
      if (thoughtTimersRef.current) {
        Object.values(thoughtTimersRef.current).forEach(clearTimeout);
        thoughtTimersRef.current = {};
      }
      setAiPresence('generating');

      let accum = '';
      const words = responseRawText.split(' ');
      let currentWordIdx = 0;
      const streamMsgId = `stream-${Date.now()}`;
      
      const emptyModelMsg: ChatMessage = {
        id: streamMsgId,
        role: 'model',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setAiHistory((prev) => [...prev, emptyModelMsg]);
      setAiTyping(false);
      
      const streamTimer = setInterval(() => {
        if (currentWordIdx < words.length) {
          accum += (currentWordIdx > 0 ? ' ' : '') + words[currentWordIdx];
          setAiHistory((prev) => 
            prev.map((msg) => msg.id === streamMsgId ? { ...msg, text: accum } : msg)
          );
          currentWordIdx++;
        } else {
          clearInterval(streamTimer);
          setAiPresence('ready');
          playBeep(660, 0.12);
        }
      }, 30);
    };

    if (actionExecuted) {
      setTimeout(() => {
        startStreaming(agentFeedback);
      }, 600);
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          history: aiHistory,
          workspaceContext: {
            layout,
            theme,
            mode,
            selectedProject: selectedProject ? selectedProject.title : 'None',
            activeTab: activeWorkspaceTab
          }
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const rawTextResponse = data.text || 'I apologize, I could not parse your response context.';
      startStreaming(rawTextResponse);

      // Log activity state
      addActivityLog('AI_CHAT_ASSIST', `Synced dialogue query: "${messageToSend.substring(0, 32)}..."`, 'ai');
      addNotification('AI Synced Workspace', 'Representative formulated query response with active telemetry awareness.', 'system');

      // Unlock AI communication badge
      setBadges((prev) =>
        prev.map((b) => (b.id === 'badge-talk' ? { ...b, unlocked: true } : b))
      );
    } catch (err: any) {
      console.error('AI Chat Error:', err);
      const errResponseText = `Interface Outbound channel offline or key unconfigured: ${err.message || 'connection failed'}`;
      
      const errResponse: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: errResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setAiHistory((prev) => [...prev, errResponse]);
      playBeep(180, 0.3);
    } finally {
      setAiTyping(false);
      if (thoughtTimersRef.current) {
        Object.values(thoughtTimersRef.current).forEach(clearTimeout);
        thoughtTimersRef.current = {};
      }
      setAiPresence('ready');
    }
  };

  const handleVoiceConsult = () => {
    if (typeof window === 'undefined') return;
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      setLabConsoleLines((prev) => [
        ...prev,
        '>> Speech Recognition channel not supported in this local browser agent.'
      ]);
      playBeep(180, 0.25);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        playBeep(520, 0.08);
        setLabConsoleLines((prev) => [...prev, '>> Listening channel active. Speak into your microphone...']);
      };

      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setAiInput(text);
        setLabConsoleLines((prev) => [...prev, `>> Recognized voice vector: "${text}"`]);
        triggerAIPortfolioQuery(text);
      };

      recognition.onerror = (e: any) => {
        setLabConsoleLines((prev) => [...prev, `>> Speech Capture fault: ${e.error || 'unspecified'}`]);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err: any) {
      console.error(err);
      setIsListening(false);
    }
  };

  const handleRunIsolate = () => {
    if (labIsolateTask) return;
    setLabIsolateTask(true);
    playBeep(400, 0.1);
    setLabConsoleLines((prev) => [
      ...prev,
      '>> Spawning main Flutter worker Isolate thread [worker_id: 0x2b4c1]...',
      '>> Allocating separate Dart memory space with 0% Shared overhead...'
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step += 25;
      if (step <= 100) {
        setLabConsoleLines((prev) => [
          ...prev,
          `>> Isolate computational load loop: ${step}% parsed successfully.`
        ]);
        playBeep(400 + step * 1.5, 0.05);
      } else {
        clearInterval(interval);
        setLabIsolateTask(false);
        setLabConsoleLines((prev) => [
          ...prev,
          '>> Background SQLite ledger indices compiled in secondary thread.',
          '>> Main isolate successfully cleared. Thread joined [OK].'
        ]);
        playBeep(880, 0.15);

        // Unlock state management badge
        setBadges((prev) =>
          prev.map((b) => (b.id === 'badge-state' ? { ...b, unlocked: true } : b))
        );
      }
    }, 450);
  };

  const triggerDataSynchronizationSync = () => {
    if (firebaseActiveSync) return;
    setFirebaseActiveSync(true);
    setFirebaseProgress(0);
    playBeep(350, 0.1);
    setLabConsoleLines((prev) => [
      ...prev,
      '>> Establishing Hive client cache snapshot channel...',
      '>> Requesting offline synchronization metrics with Firestore cloud DB...'
    ]);

    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setFirebaseProgress(current);

      if (current < 100) {
        if (current === 50) {
          setLabConsoleLines((prev) => [
            ...prev,
            '>> Syncing duplicate dynamic key indexes. Adapting local SQLite fields...'
          ]);
        }
        playBeep(300 + current * 2, 0.04);
      } else {
        clearInterval(interval);
        setFirebaseActiveSync(false);
        setFirebaseProgress(100);
        setLabConsoleLines((prev) => [
          ...prev,
          '>> Cloud system completely aligned! 140 documents pushed securely.',
          '>> Cache synced with Firestore [SUCCESS].'
        ]);
        playBeep(980, 0.15);

        // Unlock synchronize badge
        setBadges((prev) =>
          prev.map((b) => (b.id === 'badge-sync' ? { ...b, unlocked: true } : b))
        );
      }
    }, 250);
  };

  const getStateManagementDetails = () => {
    switch (labStateBenchmark) {
      case 'GetX':
        return {
          title: 'GetX MVC State Structure',
          pros: 'Exceptional startup execution speed, fully contextless controller registry, no boilerplate classes.',
          cons: 'Global bindings directory may cause collision risks on heavy concurrent multithread loops.',
          latency: '0.11ms transition frequency'
        };
      case 'Riverpod':
        return {
          title: 'Riverpod Declarative Provider',
          pros: 'Perfect compile-time validation, decoupled modular providers, fully safe caching states.',
          cons: 'Notifier setup requires strict state-immutable updates.',
          latency: '0.07ms build refresh'
        };
      default: // BLoC
        return {
          title: 'BLoC Event-Driven Core',
          pros: 'Unmatched scale predictability, perfect separation of business interfaces, fully transparent telemetry logs.',
          cons: 'Requires substantial initial setup mappings with dense event streams.',
          latency: '0.16ms transition cycle'
        };
    }
  };

  const handleContactSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) return;
    const submittedName = contactName;
    await handleDynamicInquirySubmit(contactName, contactEmail, contactMsg, 'glassmorphism-studio');
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  const executeCommand = (cmd: string) => {
    playBeep(440, 0.1);
    setIsCmdPaletteOpen(false);

    switch (cmd) {
      case 'dev-mode':
        setMode('developer');
        setLabConsoleLines((prev) => [...prev, '>> Perspective mode toggled to Developer Scope.']);
        break;
      case 'rec-mode':
        setMode('recruiter');
        setAboutActiveSubTab('work');
        break;
      case 'fnd-mode':
        setMode('founder');
        setAboutActiveSubTab('badges');
        break;
      case 'layout-classic':
        changeLayout('classic');
        break;
      case 'layout-bento':
        changeLayout('developer-dashboard');
        break;
      case 'theme-sunset':
        changeTheme('sunset');
        break;
      case 'cv':
        printCV();
        break;
      default:
        break;
    }
  };

  if (isEngineLoading) {
    return (
      <GlobalLoadingOS
        onComplete={() => {
          setIsEngineLoading(false);
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('os_engine_booted_v1', 'true');
          }
        }}
        playBeep={playBeep}
      />
    );
  }

  return (
    <div className={`transition-all duration-700 min-h-screen relative text-glow-none ${getThemeClass()} ${isDarkMode ? 'dark' : 'light-mode'}`}>
      
      {/* PERFORMANCE CANVAS FOR 3D PARTICLES / GRID UNIVERSE */}
      {startThreeDActive ? (
        <ThreeBackground bgType={bgType} theme={theme} mousePos={mousePos} mouseRelative={mouseRelative} customConfig={studioConfig} />
      ) : (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-neutral-950">
          {/* Elegant premium ambient gradients & Aurora effects */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[140px] animate-pulse" style={{ animationDuration: '14s' }} />
          <div className="absolute bottom-[-10%] right-[-15%] w-[70%] h-[70%] rounded-full bg-cyan-500/10 blur-[160px] animate-pulse" style={{ animationDuration: '20s' }} />
          <div className="absolute top-[30%] right-[10%] w-[45%] h-[45%] rounded-full bg-[var(--accent)]/5 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
          
          {/* Subtle light rays */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-indigo-900 to-transparent pointer-events-none" />
          
          {/* Elegant ambient particles moving */}
          <div className="absolute inset-0 opacity-[0.15]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="particle-glow-2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="15%" cy="25%" r="3" fill="url(#particle-glow-2)" className="animate-pulse" style={{ animationDuration: '4s' }} />
              <circle cx="45%" cy="12%" r="2" fill="url(#particle-glow-2)" className="animate-pulse" style={{ animationDuration: '6s' }} />
              <circle cx="75%" cy="38%" r="4" fill="url(#particle-glow-2)" className="animate-pulse" style={{ animationDuration: '5s' }} />
              <circle cx="85%" cy="85%" r="1.5" fill="url(#particle-glow-2)" className="animate-pulse" style={{ animationDuration: '8s' }} />
              <circle cx="25%" cy="70%" r="3.5" fill="url(#particle-glow-2)" className="animate-pulse" style={{ animationDuration: '7s' }} />
              <circle cx="60%" cy="65%" r="2" fill="url(#particle-glow-2)" className="animate-pulse" style={{ animationDuration: '4.5s' }} />
            </svg>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />

      {/* ADVANCED CUSTOM INTEGRAL CURSOR ENGINE */}
      <CustomCursor cursorStyle={cursorStyle} theme={theme} customConfig={studioConfig} />

      {/* CUSTOM STUDIO PERSONALIZATION & CUSTOMIZATION ENGINE */}
      <CustomStudioEngine config={studioConfig} onChange={setStudioConfig} />

      {/* ELITE SUITE OPERATIONS: COMMAND PALETTE + INTERACTIVE LABS */}
      <CommandCenter
        currentTheme={theme}
        currentLayout={layout}
        currentCursor={cursorStyle}
        currentBg={bgType}
        onThemeChange={setTheme}
        onLayoutChange={setLayout}
        onCursorChange={setCursorStyle}
        onBgChange={setBgType}
      />

      {/* ADDITIONAL ELITE PREMIUM OVERLAY LAYERS & FLOATING HUD WIDGETS */}
      <EliteExtraHUD profile={profile} socials={socials} />

      {/* PORTFOLIO OS CONTROL PANEL */}
      <PortfolioOSDashboard
        isOpen={showOsPanel}
        onClose={() => setShowOsPanel(false)}
        currentLayout={layout}
        onLayoutChange={setLayout}
        currentTheme={theme}
        onThemeChange={setTheme}
        currentCursorStyle={cursorStyle}
        onCursorStyleChange={setCursorStyle}
        isMuted={isMuted}
        onMuteToggle={setIsMuted}
        motionIntensity={motionIntensity}
        onMotionIntensityChange={setMotionIntensity}
        glowIntensity={glowIntensity}
        onGlowIntensityChange={setGlowIntensity}
        particleDensity={particleDensity}
        onParticleDensityChange={setParticleDensity}
        notifications={notifications}
        activityLogs={activityLogs}
        onTriggerNotification={addNotification}
        onAddActivityLog={addActivityLog}
        onChatPrompt={(q) => {
          setIsAiOpen(true);
          setAiInput(q);
        }}
        playBeep={playBeep}
      />

      {/* WELCOME BACK SESSIONS POPUP */}
      <AnimatePresence>
        {showResumeSessionAlert && lastSessionRecord && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-[2600] max-w-sm border border-emerald-500/30 bg-[#070c19]/95 text-slate-100 p-5 rounded-2xl shadow-2xl backdrop-blur-2xl"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1 px-2.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[8.5px] uppercase font-mono font-black rounded-lg leading-none">
                  MEMORY SYNC
                </div>
                <span className="text-xs font-bold text-white tracking-tight uppercase">Session Memory Detected</span>
              </div>
              
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                A saved preference matrix was recovered from your previous turn:
                <span className="block mt-2 pl-2 border-l-2 border-[#00ffcc] text-white font-mono text-[9px] leading-relaxed">
                  • Layout perspective: <span className="text-[var(--accent)] uppercase font-bold">{lastSessionRecord.layout}</span><br />
                  • Color scheme spectrum: <span className="text-[var(--accent)] uppercase font-bold">{lastSessionRecord.theme}</span><br />
                  • Active profile mode: <span className="text-[var(--accent)] uppercase font-bold">{lastSessionRecord.mode}</span>
                </span>
              </p>

              <div className="flex gap-2 text-[9px] font-mono font-black uppercase text-center">
                <button
                  onClick={() => {
                    setLayout(lastSessionRecord.layout);
                    setTheme(lastSessionRecord.theme);
                    setMode(lastSessionRecord.mode);
                    setShowResumeSessionAlert(false);
                    try { playBeep(880, 0.15); } catch (_) {}
                    addNotification('Session Recovered', 'Successfully synced preference variables from your last turn!', 'success');
                  }}
                  className="flex-grow py-2.5 bg-[#00ffcc] hover:bg-white text-slate-950 rounded-xl transition-all font-extrabold cursor-pointer"
                >
                  RESUME SESSION
                </button>
                
                <button
                  onClick={() => {
                    setShowResumeSessionAlert(false);
                    localStorage.removeItem('portfolio_last_sessions_v1');
                    try { playBeep(220, 0.12); } catch (_) {}
                    addNotification('Session Dismissed', 'Reset local session trace to system presets layout.', 'warn');
                  }}
                  className="py-2.5 px-3 border border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white rounded-xl transition-all cursor-pointer"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AMBIENT GLOW CHANNELS */}
      <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden" style={{ opacity: glowIntensity / 100 }}>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[180px]" />
      </div>

      {/* CINEMATIC FLOATING CODE CARDS (Apple Event Visuals) */}
      <FloatingCodeSystem playBeep={playBeep} accent="var(--accent)" />

      {/* --- HEADER NAVIGATION ZONE --- */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <a href="#hero" className="flex flex-col">
            <span className="text-2xl font-black text-glow tracking-tighter text-white">
              Dharmesh<span className="text-[var(--accent)]">.</span>
            </span>
            <span className="text-[9px] tracking-widest text-[#88ddff] font-bold uppercase">Creative Flutter Architect</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-white">
            <a href="#hero" className="hover:text-[var(--accent)] transition-colors">Home</a>
            <a href="#about" className="hover:text-[var(--accent)] transition-colors">Narrative</a>
            <a href="#laboratory" className="hover:text-[var(--accent)] transition-colors">Lab Workspace</a>
            <a href="#portfolio" className="hover:text-[var(--accent)] transition-colors">Case Studies</a>
            <a href="#contact" className="hover:text-[var(--accent)] transition-colors">Get In Touch</a>

            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full select-none text-[9px] font-black tracking-widest uppercase truncate animate-pulse relative">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 relative flex shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </span>
              <span>{profile?.availabilityStatus || 'Available for projects'}</span>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <button
              id="download-cv-btn"
              onClick={printCV}
              className="bg-gradient-to-r from-[var(--accent)] to-indigo-500 text-black px-4 py-2 font-black tracking-widest uppercase text-[10px] rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" /> {profile.downloadCvLabel || 'Download CV'}
            </button>

            {/* Dark & Light Theme Toggle Slider trigger */}
            <button
              onClick={() => {
                const nextVal = !isDarkMode;
                setIsDarkMode(nextVal);
                localStorage.setItem('portfolio_dark', JSON.stringify(nextVal));
                playBeep(nextVal ? 640 : 740, 0.08);
              }}
              className="p-2 border border-white/15 hover:border-[var(--accent)] rounded-lg text-white bg-black/40 flex items-center justify-center transition-colors"
              title="Toggle Dark / Light Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="p-2 border border-white/15 hover:border-[var(--accent)] rounded-lg text-[var(--accent)] bg-black/40"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* LOCALIZED MULTI-LAYOUT DISPATCHER CHANNELS WITH LUXURY SPRING TRANSTIONS */}
      {(!['classic', 'glassmorphism-studio'].includes(layout)) ? (
        <motion.div 
          key={layout}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          className="pt-6 pb-24"
        >
          {layout === 'terminal-hacker' && (
            <div className="max-w-4xl mx-auto px-6 py-12">
              <div className="mb-6 flex justify-between items-center bg-black/40 border border-emerald-500/20 p-4 rounded-2xl font-mono">
                <div>
                  <h1 className="text-sm font-mono text-[#00ff3c] font-black tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ff3c] animate-ping" /> DHARMESH TERMINAL v3.5
                  </h1>
                  <p className="text-[10px] text-white/50 mt-1">Run standard command sequences or return back to visual console</p>
                </div>
                <button onClick={() => setLayout('classic')} className="px-3 py-1 bg-[#00ff3c]/15 text-[#00ff3c] hover:bg-[#00ff3c]/35 transition-colors rounded-lg font-mono text-[10px] border border-[#00ff3c]/30">
                  exit terminal
                </button>
              </div>
              <TerminalHacker 
                projects={projects} 
                experience={experience} 
                playBeep={playBeep} 
                onExecuteCommand={(cmd) => {
                  if (cmd.startsWith('layout-')) {
                    const lName = cmd.replace('layout-', '') as LayoutType;
                    setLayout(lName);
                  }
                }} 
                onSubmitContact={(name, email, msg) => {
                  handleDynamicInquirySubmit(name, email, msg, 'terminal');
                }}
              />
            </div>
          )}

          {layout === 'developer-dashboard' && (
            <DeveloperDashboardView 
              projects={projects} 
              experience={experience} 
              onInspectProject={(p) => setSelectedProject(p)} 
              onSubmitInquiry={(name, email, msg) => {
                handleDynamicInquirySubmit(name, email, msg, 'developer-dashboard');
              }}
              accent="var(--accent)"
              playBeep={playBeep}
              isolateCount={labIsolateTask ? 4 : 1}
              triggerIsolate={() => setLabIsolateTask(true)}
              sqliteLatency={firebaseProgress > 0 ? 0.3 : 1.2}
              contacts={contacts}
            />
          )}

          {layout === 'apple-minimal' && (
            <AppleMinimalView 
              projects={projects} 
              experience={experience} 
              onInspectProject={(p) => setSelectedProject(p)} 
              onSubmitInquiry={(name, email, msg) => {
                handleDynamicInquirySubmit(name, email, msg, 'apple-minimal');
              }}
              playBeep={playBeep}
            />
          )}

          {layout === 'interactive-magazine' && (
            <InteractiveMagazineView
              projects={projects}
              experience={experience}
              onInspectProject={(p) => setSelectedProject(p)}
              onSubmitInquiry={(name, email, msg) => {
                handleDynamicInquirySubmit(name, email, msg, 'magazine');
              }}
              playBeep={playBeep}
            />
          )}

          {layout === 'fullscreen-scroll-story' && (
            <FullscreenScrollStoryView
              projects={projects}
              experience={experience}
              onInspectProject={(p) => setSelectedProject(p)}
              onSubmitInquiry={(name, email, msg) => {
                handleDynamicInquirySubmit(name, email, msg, 'scroll-story');
              }}
              playBeep={playBeep}
            />
          )}

          {/* Sidebar tabs layouts */}
          {layout === 'left-sidebar' && (
            <div className="flex flex-col lg:flex-row min-h-[80vh] max-w-7xl mx-auto px-6 gap-8">
              {/* LEFT SIDEBAR STUDIO - Linear & Cursor IDE styling */}
              <aside className="w-full lg:w-64 bg-black border border-white/[0.06] p-5 rounded-3xl shrink-0 self-start shadow-2xl">
                <div className="mb-4 pb-3 border-b border-white/[0.05] flex items-center justify-between text-[#88ddff]">
                  <span className="text-[10px] uppercase font-bold tracking-widest font-mono">// STUDIO WORKSPACE</span>
                  <span className="text-[8px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-neutral-400 font-bold">ACTIVE</span>
                </div>
                <div className="flex flex-col gap-1 font-sans">
                  {[
                    { id: 'hero', label: '1. Identity Hub', shortcut: '⌥1' },
                    { id: 'about', label: '2. Career Log', shortcut: '⌥2' },
                    { id: 'laboratory', label: '3. Isolate Bench', shortcut: '⌥3' },
                    { id: 'portfolio', label: '4. Case Specs', shortcut: '⌥4' },
                    { id: 'blog', label: '5. Reads', shortcut: '⌥5' },
                    { id: 'contact', label: '6. Live Inquire', shortcut: '⌥6' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveWorkspaceTab(tab.id); playBeep(330, 0.05); }}
                      className={`w-full py-2 px-3 rounded-xl flex items-center justify-between transition-all text-[11px] font-mono font-bold uppercase ${
                        activeWorkspaceTab === tab.id 
                          ? 'bg-[var(--accent)] text-black font-extrabold shadow-lg' 
                          : 'hover:bg-white/[0.03] text-neutral-400'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[8px] font-mono font-medium px-1.5 py-0.5 rounded border ${
                        activeWorkspaceTab === tab.id 
                          ? 'bg-black/15 border-black/10 text-black font-bold' 
                          : 'bg-white/[0.02] border-white/[0.05] text-neutral-500'
                      }`}>{tab.shortcut}</span>
                    </button>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/[0.05] mt-6 space-y-2">
                  <div className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider font-bold">Sync metrics</div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#00ffcc] p-2 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                    <span>Live Sync:</span>
                    <span className="font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-ping" />
                      Active
                    </span>
                  </div>
                </div>
              </aside>

              <main className="flex-1 min-w-0 bg-[var(--card)]/40 border border-[var(--border)]/55 p-6 rounded-3xl transition-all duration-300">
                {activeWorkspaceTab === 'hero' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#88ddff] font-mono font-bold block mb-1">// WORKSPACE ACTIVE // ID_DEV PORTAL</span>
                      <h2 className="text-2xl font-black text-white uppercase font-sans tracking-tight">Dharmesh Ahir</h2>
                      <p className="text-zinc-400 text-xs mt-1">Lead Cross-Platform Mobile Architect & Dart/Flutter Systems Specialist</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="p-5 bg-black/60 border border-white/5 rounded-2xl space-y-4">
                        <span className="text-[9px] font-mono uppercase text-[#00ffcc] font-bold block">// THREADS DELEGATOR MONITOR</span>
                        
                        <div className="space-y-3 font-mono text-xs">
                          <div className="flex justify-between text-zinc-400">
                            <span>Thread Pool Size:</span>
                            <span className="text-white font-bold">{labIsolateTask ? '4 active threads' : '1 primary thread'}</span>
                          </div>
                          
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#00ffcc] transition-all duration-500" 
                              style={{ width: labIsolateTask ? '100%' : '25%' }} 
                            />
                          </div>

                          <div className="flex justify-between text-zinc-500 text-[10px]">
                            <span>CPU Workload:</span>
                            <span>{labIsolateTask ? '89% (Spawning isolates...)' : '18%'}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setLabIsolateTask(true);
                            playBeep(440, 0.25);
                          }}
                          disabled={labIsolateTask}
                          className={`w-full py-2 rounded-lg text-[9px] font-mono font-extrabold tracking-widest uppercase transition-all ${
                            labIsolateTask 
                              ? 'bg-zinc-800 border border-zinc-700 text-zinc-500 cursor-not-allowed' 
                              : 'bg-[#00ffcc] text-black hover:opacity-90 shadow-md'
                          }`}
                        >
                          {labIsolateTask ? 'Isolates Engaged' : 'Spawn Parallel Isolate Threads'}
                        </button>
                      </div>

                      <div className="p-5 bg-black/60 border border-white/5 rounded-2xl space-y-4">
                        <span className="text-[9px] font-mono uppercase text-[#ff55cc] font-bold block">// PERSISTENCE SPEEDBENCH</span>
                        
                        <div className="space-y-3 font-mono text-xs">
                          <div className="flex justify-between text-zinc-400">
                            <span>Database Latency:</span>
                            <span className="text-white font-bold">{firebaseProgress > 0 ? '0.3 ms' : '1.2 ms'}</span>
                          </div>
                          
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#ff55cc] transition-all duration-500" 
                              style={{ width: firebaseProgress > 0 ? '90%' : '40%' }} 
                            />
                          </div>

                          <div className="flex justify-between text-zinc-500 text-[10px]">
                            <span>Sync Mode:</span>
                            <span>{firebaseProgress > 0 ? 'Durable Firestore Synchronized' : 'Local SQLite In-Memory'}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setFirebaseProgress(100);
                            playBeep(660, 0.2);
                          }}
                          disabled={firebaseProgress > 0}
                          className={`w-full py-2 rounded-lg text-[9px] font-mono font-extrabold tracking-widest uppercase transition-all ${
                            firebaseProgress > 0 
                              ? 'bg-zinc-800 border border-zinc-700 text-zinc-500 cursor-not-allowed' 
                              : 'bg-[#ff55cc] text-white hover:opacity-90 shadow-md'
                          }`}
                        >
                          {firebaseProgress > 0 ? 'Fast Database Active' : 'Overdrive Sync (Durable Firestore)'}
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                      <h4 className="text-xs uppercase font-mono font-bold text-neutral-300 tracking-wider">// SYSTEM OVERVIEW</h4>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        Welcome to the Left Sidebar interactive workspace. This console brings high-fidelity system modules directly into a fast, desktop-caliber layout. Feel free to use the sidebar commands to inspect real-time logs, benchmark multi-threading isolates, or review published papers.
                      </p>
                    </div>
                  </div>
                )}

                {activeWorkspaceTab === 'about' && (
                  <AppleMinimalView 
                    projects={projects} 
                    experience={experience} 
                    onInspectProject={(p) => setSelectedProject(p)} 
                    onSubmitInquiry={(name, email, msg) => {
                      handleDynamicInquirySubmit(name, email, msg, 'workspace-apple');
                    }}
                    playBeep={playBeep}
                  />
                )}

                {activeWorkspaceTab === 'laboratory' && (
                  <DeveloperDashboardView 
                    projects={projects} 
                    experience={experience} 
                    onInspectProject={(p) => setSelectedProject(p)} 
                    onSubmitInquiry={(name, email, msg) => {
                      handleDynamicInquirySubmit(name, email, msg, 'workspace-developer');
                    }}
                    accent="var(--accent)"
                    playBeep={playBeep}
                    isolateCount={labIsolateTask ? 4 : 1}
                    triggerIsolate={() => setLabIsolateTask(true)}
                    sqliteLatency={firebaseProgress > 0 ? 0.3 : 1.2}
                    contacts={contacts}
                  />
                )}

                {activeWorkspaceTab === 'portfolio' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#00ffcc] font-mono font-bold block mb-1">// DELIVERABLES REGISTER</span>
                      <h2 className="text-lg font-black text-white uppercase tracking-wider font-mono">Case Specifications</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projects.map((p) => (
                        <div 
                          key={p.id}
                          onClick={() => {
                            setSelectedProject(p);
                            playBeep(400, 0.05);
                          }}
                          className="bg-black/60 border border-white/5 p-5 rounded-2xl hover:border-[#00ffcc]/5
                          5 transition-all cursor-pointer space-y-3 shadow-lg hover:-translate-y-0.5 duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[8px] font-mono tracking-widest px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-neutral-400 font-bold uppercase">{p.category}</span>
                            <span className="text-[10px] font-mono text-[#00ffcc] bg-[#00ffcc]/10 border border-[#00ffcc]/20 px-1.5 py-0.5 rounded-lg">98% Perf</span>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wide font-mono mt-2">{p.title}</h4>
                            <p className="text-zinc-400 text-[11px] mt-1 line-clamp-2 leading-relaxed">{p.brief}</p>
                          </div>

                          <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[9px] font-mono text-zinc-500">
                            <span>Inspect Deliverable</span>
                            <span className="text-[#00ffcc] font-bold">CLICK_TO_EXPAND &gt;&gt;</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeWorkspaceTab === 'blog' && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-sm font-black text-[var(--text-main)] uppercase font-mono tracking-widest">// RECENT_PUBLICATIONS_FEED</h3>
                    {blogPosts.map((bp) => (
                      <div key={bp.id} className="p-5 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)] transition-colors cursor-pointer">
                        <span className="text-[9px] uppercase font-mono tracking-wider text-[var(--accent)]">{bp.category} // {bp.readTime}</span>
                        <h4 className="text-base font-bold text-[var(--text-main)] mt-1">{bp.title}</h4>
                        <p className="text-[var(--text-main)]/70 text-xs mt-2">{bp.summary}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeWorkspaceTab === 'contact' && (
                  <div className="max-w-2xl mx-auto bg-black/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden shadow-2xl backdrop-blur-md animate-fade-in">
                    <div className="absolute top-0 right-0 py-2 px-3 text-[10px] text-[#ff55cc]/30 font-bold border-l border-b border-white/[0.06] bg-black/50 select-none font-mono">WORKSPACE_SECURE_TUNNEL</div>
                    <h3 className="text-sm font-black uppercase text-white tracking-widest mb-6 flex items-center gap-2 font-mono">
                      <span className="w-2 h-2 rounded-full bg-[#ff55cc] animate-ping" />
                      [:: WORKSPACE DIRECT TRANSMISSION]
                    </h3>

                    {sentMessageNotify ? (
                      <div className="p-6 bg-[#ff55cc]/10 border border-[#ff55cc]/30 rounded-xl text-center text-[#ff55cc] font-extrabold tracking-widest uppercase text-xs animate-pulse font-mono">
                        {sentMessageNotify}
                      </div>
                    ) : (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!contactName || !contactEmail || !contactMsg) return;
                        playBeep(880, 0.4);
                        handleDynamicInquirySubmit(contactName, contactEmail, contactMsg, 'workspace-contact');
                        setSentMessageNotify('✔ TRANSMISSION CONCLUDED SECURELY.');
                      }} className="space-y-5 font-mono">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <span className="text-[9px] text-neutral-400 font-bold tracking-widest block uppercase">[IDENTITY]</span>
                            <input 
                              type="text" 
                              placeholder="E.g. AGENT_RECRUITER" 
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className="w-full bg-black/50 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#ff55cc] transition-all text-xs"
                            />
                          </div>
                          <div className="space-y-2">
                            <span className="text-[9px] text-neutral-400 font-bold tracking-widest block uppercase">[DATALINK]</span>
                            <input 
                              type="email" 
                              placeholder="E.g. CLIENT@PORTAL.COM" 
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              className="w-full bg-black/50 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#ff55cc] transition-all text-xs"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <span className="text-[9px] text-neutral-400 font-bold tracking-widest block uppercase">[PAYLOAD]</span>
                          <textarea 
                            placeholder="E.g. Spec requirement overview or consultation brief..." 
                            required
                            rows={3}
                            value={contactMsg}
                            onChange={(e) => setContactMsg(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#ff55cc] transition-all text-xs resize-none"
                          />
                        </div>
                        
                        <button 
                          type="submit" 
                          className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-black font-extrabold uppercase tracking-widest transition-all rounded-xl text-[10px]"
                        >
                          [ PROPAGATE WORKSPACE MESSAGING ]
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </main>
            </div>
          )}

          {/* Fallbacks */}
          {!['terminal-hacker', 'developer-dashboard', 'apple-minimal', 'left-sidebar', 'interactive-magazine', 'fullscreen-scroll-story'].includes(layout) && (
            <div className="max-w-4xl mx-auto py-12 px-6">
              <DeveloperDashboardView 
                projects={projects} 
                experience={experience} 
                onInspectProject={(p) => setSelectedProject(p)} 
                onSubmitInquiry={(name, email, msg) => {
                  handleDynamicInquirySubmit(name, email, msg, 'fallback');
                }}
                accent="var(--accent)"
                playBeep={playBeep}
                isolateCount={labIsolateTask ? 4 : 1}
                triggerIsolate={() => setLabIsolateTask(true)}
                sqliteLatency={firebaseProgress > 0 ? 0.3 : 1.2}
                contacts={contacts}
              />
            </div>
          )}
        </motion.div>
      ) : (
        <>
          {/* --- HERO NARRATIVE PANEL --- */}
          <section id="hero" className="relative min-h-[92vh] flex items-center max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              
              <div className="lg:col-span-7 space-y-6">
                
                {/* Dynamic visual spotlight badge */}
                <div className={`inline-block py-1.5 px-4 rounded-full text-xs font-semibold tracking-wide select-none ${isDarkMode ? 'bg-white/5 border border-white/10 text-white/80' : 'bg-white/80 border border-slate-200/90 text-slate-700 shadow-sm'}`}>
                  Surat, Gujarat, India
                </div>

                <div className="space-y-4">
                  <h1 className={`text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] select-text ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Hello, I'm <br />
                    Dharmesh Ahir <br />
                    <span className="text-[var(--accent)] font-black text-glow tracking-tighter">
                      {typedText}
                    </span>
                    <span className="animate-pulse font-light ml-1 text-[var(--accent)]">|</span>
                  </h1>
                  <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
                    Senior Flutter Developer with 3+ Years of Experience building robust, pixel-perfect, and high-performance cross-platform applications.
                  </p>
                </div>

                {/* THREE-WAY PERSONA TOGGLERS */}
                <div className={`border p-1.5 rounded-2xl max-w-xl grid grid-cols-3 gap-2 ${isDarkMode ? 'bg-black/60 border-white/10' : 'bg-white/80 border-slate-200/90 shadow-sm'}`}>
                  <button
                    onClick={() => { setMode('developer'); playBeep(220, 0.1); }}
                    className={`py-2 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${mode === 'developer' ? 'bg-[var(--accent)] text-black shadow-lg font-extrabold' : `${isDarkMode ? 'text-white/75 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}`}
                  >
                    <Terminal className="w-3.5 h-3.5" /> Developer
                  </button>
                  <button
                    onClick={() => { setMode('recruiter'); playBeep(330, 0.1); }}
                    className={`py-2 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${mode === 'recruiter' ? 'bg-[var(--accent)] text-black shadow-lg font-extrabold' : `${isDarkMode ? 'text-white/75 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}`}
                  >
                    <UserCheck className="w-3.5 h-3.5" /> Recruiter
                  </button>
                  <button
                    onClick={() => { setMode('founder'); playBeep(440, 0.1); }}
                    className={`py-2 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${mode === 'founder' ? 'bg-[var(--accent)] text-black shadow-lg font-extrabold' : `${isDarkMode ? 'text-white/75 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}`}
                  >
                    <DollarSign className="w-3.5 h-3.5" /> Founder Mode
                  </button>
                </div>

                {/* INTERACTIVE PERSPECTIVE DETAILS */}
                <div className={`border rounded-2xl p-6 max-w-xl ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-slate-200/90 shadow-sm'}`}>
                  {mode === 'developer' && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-black tracking-wider uppercase text-[var(--accent)] flex items-center gap-2"><Code className="w-4 h-4" /> Active Stack Parameters</h4>
                      <p className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>BLoC Immutable events loop, custom painting engine, and RESTful channels parsing.</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {['Isolates Threading', 'Custom Codecs SDK', 'STUN/TURN signaling', 'HiveDB indexing'].map((s, idx) => (
                          <span key={idx} className={`border text-[9px] font-mono px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-black/50 border-white/10 text-cyan-400' : 'bg-slate-100 border-slate-200 text-cyan-700'}`}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {mode === 'recruiter' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-1 border-b border-white/[0.06]">
                        <h4 className="text-xs font-black tracking-wider uppercase text-[var(--accent)] flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-emerald-400" /> Executive summary & Hiring Index
                        </h4>
                        <span className="text-[8px] px-1.5 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-mono rounded font-black animate-pulse">● CONTRACT SIGNING ACTIVE</span>
                      </div>

                      {/* Recruiter executive summary keynote card */}
                      <div className={`p-4 rounded-xl border relative overflow-hidden bg-black/50 border-white/[0.08]`}>
                        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t border-r border-[var(--accent)]/30 rounded-tr-xl" />
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[12px] font-extrabold text-white">Dharmesh Ahir (Lead Flutter Architect)</span>
                            <span className="text-[8px] font-mono text-neutral-400">3+ Yrs Commercial</span>
                          </div>
                          <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">
                            Specializes in high performance rendering, low-latency WebRTC streams, offline sync databases, and multi-threaded backgrounds isolate design. Perfect fit for senior mobile roles or complex multi-tier integrations.
                          </p>
                          <div className="pt-2 flex flex-wrap items-center gap-3">
                            <button 
                              onClick={printCV}
                              className="px-3 py-1.5 bg-[var(--accent)] text-black font-mono text-[9px] font-black uppercase rounded-lg hover:bg-white transition-all flex items-center gap-1 shadow-md cursor-pointer"
                            >
                              <Download className="w-3 h-3" /> EXPORT FULL DOSSIER (PDF)
                            </button>
                            <button 
                              onClick={() => {
                                setIsAiOpen(true);
                                triggerAIPortfolioQuery("Please formulate a tailored Candidate Dossier Report for me. Break this evaluation down into four distinct strategic layers: 1. Executive Summary 2. Tech Stack & Architecture Core (Flutter, Dart, Hive, SQLite) 3. Deliverability & Communication leadership 4. Startup Agility & Rapid MVPs scaling. Render with precise and highly professional markdown.");
                              }}
                              className="px-3 py-1.5 border border-emerald-500/40 bg-emerald-950/25 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-mono text-[9px] font-black uppercase rounded-lg transition-all flex items-center gap-1 shadow-md cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> SUMMARIZE CANDIDATE (AI)
                            </button>
                            <span className="text-[9px] font-mono text-neutral-500">25+ Case Studies Deployed</span>
                          </div>
                        </div>
                      </div>

                      {/* Hiring readiness grid metrics */}
                      <span className="text-[9px] font-mono uppercase text-white/40 block tracking-widest pt-1">// REAL-TIME CANDIDATE PARAMETERS</span>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="p-2.5 rounded-lg border border-white/5 bg-neutral-950/70">
                          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono block">Availability</span>
                          <span className="text-[10.5px] font-bold text-emerald-400 block mt-0.5">Immediate (Direct)</span>
                        </div>
                        <div className="p-2.5 rounded-lg border border-white/5 bg-neutral-950/70">
                          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono block">Weekly Capacity</span>
                          <span className="text-[10.5px] font-bold text-white block mt-0.5">Max 38 hr / Week</span>
                        </div>
                        <div className="p-2.5 rounded-lg border border-white/5 bg-neutral-950/70 col-span-2 md:col-span-1">
                          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono block">Timezone Alignment</span>
                          <span className="text-[10.5px] font-bold text-cyan-400 block mt-0.5">EST / GMT Overlap</span>
                        </div>
                        <div className="p-2.5 rounded-lg border border-white/5 bg-neutral-950/70">
                          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono block">Contract Classes</span>
                          <span className="text-[10px] font-bold text-white block mt-0.5">C2C, W2, Independent</span>
                        </div>
                        <div className="p-2.5 rounded-lg border border-white/5 bg-neutral-950/70">
                          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono block">Response Latency</span>
                          <span className="text-[10.5px] font-bold text-purple-400 block mt-0.5">&lt; 3 Hours Verified</span>
                        </div>
                        <div className="p-2.5 rounded-lg border border-white/5 bg-neutral-950/70 col-span-2 md:col-span-1">
                          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono block">Preferred Roles</span>
                          <span className="text-[9px] font-bold text-yellow-400 block mt-0.5 truncate">Lead Flutter Architect</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === 'founder' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-1 border-b border-white/[0.06]">
                        <h4 className="text-xs font-black tracking-wider uppercase text-[var(--accent)] flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-emerald-400" /> STARTUP BUSINESS VALUE INDEX
                        </h4>
                        <span className="text-[8px] px-1.5 py-0.5 bg-yellow-950/40 border border-yellow-500/20 text-yellow-400 font-mono rounded font-black">● FRACTIONAL CTO ELIGIBLE</span>
                      </div>

                      <p className={`text-xs ${isDarkMode ? 'text-white/70' : 'text-slate-600'} leading-relaxed`}>
                        Building early products requires fast shipping times, zero rewrites, and high cost efficiency. Dharmesh brings pre-built production architecture setups that accelerate project lifecycle indexes immediately.
                      </p>

                      {/* Founder mode metrics table */}
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        <div className="bg-neutral-950/80 p-3 rounded-xl border border-white/5">
                          <span className="text-[8px] font-mono text-neutral-500 block uppercase">Product Launch Cycle</span>
                          <span className="text-xs font-black text-[var(--accent)] block mt-0.5">2X Faster Store Delivery</span>
                          <span className="text-[7.5px] text-emerald-400 font-mono select-none">▲ Verified by 25+ deploys</span>
                        </div>

                        <div className="bg-neutral-950/80 p-3 rounded-xl border border-white/5">
                          <span className="text-[8px] font-mono text-neutral-500 block uppercase">Arch Rewrite Overhead</span>
                          <span className="text-xs font-black text-rose-400 block mt-0.5">0.0% Structural Lag</span>
                          <span className="text-[7.5px] text-neutral-500 font-mono select-none">Decoupled Repository setup</span>
                        </div>

                        <div className="bg-neutral-950/80 p-3 rounded-xl border border-white/5 col-span-2 lg:col-span-1">
                          <span className="text-[8px] font-mono text-neutral-500 block uppercase">Developer Time Saved</span>
                          <span className="text-xs font-black text-cyan-400 block mt-0.5">120+ Hrs Boilerplate</span>
                          <span className="text-[7.5px] text-[#00ffcc] font-mono select-none">Ready-to-use isolate templates</span>
                        </div>

                        <div className="bg-neutral-950/80 p-3 rounded-xl border border-white/5">
                          <span className="text-[8px] font-mono text-neutral-500 block uppercase">Threading Security</span>
                          <span className="text-xs font-black text-white block mt-0.5">99.9% Uptime SLA</span>
                          <span className="text-[7.5px] text-neutral-500 font-mono select-none">SQLite thread conflict blocks</span>
                        </div>

                        <div className="bg-neutral-950/80 p-3 rounded-xl border border-white/5 col-span-2 lg:col-span-2 flex flex-col justify-center">
                          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">// ADVISORY CAPABILITIES</span>
                          <p className="text-[9.5px] text-neutral-400 mt-1">
                            Available for fractional Chief Technology Officer representation, security auditing, and system architecture planning.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 select-none pt-2">
                  <a href="#portfolio" className="bg-[var(--accent)] text-black px-6 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform inline-flex items-center gap-2 text-xs uppercase tracking-wider">
                    Explore Work <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsAiOpen(true)}
                    className={`px-6 py-3.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider flex items-center gap-2 border ${isDarkMode ? 'bg-black/40 border-white/10 text-white hover:border-[var(--accent)]' : 'bg-white/80 border-slate-200/90 text-slate-800 hover:border-slate-400 shadow-sm'}`}
                  >
                    Let's Create Together
                  </button>
                </div>

              </div>

              <div className="lg:col-span-5 relative flex justify-center items-center py-10 lg:py-0">
                <div className="relative w-[310px] h-[310px] flex items-center justify-center">
                  
                  {/* 1. Behind Glow Layer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/20 to-fuchsia-500/10 rounded-[40px] blur-2xl transform scale-95 opacity-80" />
                  
                  {/* 2. Floating Snippet CS-1 (Top Left) */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-[-42px] top-[-26px] z-20 bg-[#121824] border border-white/10 rounded-xl p-3 shadow-2xl font-mono text-[9px] text-[#a6accd] select-none pointer-events-none"
                  >
                    <div className="flex items-center gap-1.5 border-b border-white/5 pb-1 mb-1.5 opacity-50">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="ml-1 text-[8px]">developer.dart</span>
                    </div>
                    <pre><code className="block leading-relaxed">
                      <span className="text-[#c792ea]">class</span> <span className="text-[#ffcb6b]">Dharmesh</span> <span className="text-[#c792ea]">extends</span> <span className="text-[#ff966c]">Developer</span> {'{'}<br />
                      &nbsp;&nbsp;<span className="text-[#88ddff]">String</span> role = <span className="text-[#c3e88d]">'Flutter Senior'</span>;<br />
                      {'}'}
                    </code></pre>
                  </motion.div>

                  {/* 3. Floating Snippet CS-2 (Bottom Right) */}
                  <motion.div 
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute right-[-24px] bottom-[-24px] z-20 bg-[#121824] border border-white/10 rounded-xl p-3 shadow-2xl font-mono text-[9px] text-[#a6accd] select-none pointer-events-none"
                  >
                    <div className="flex items-center gap-1.5 border-b border-white/5 pb-1 mb-1.5 opacity-50">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="ml-1 text-[8px]">main.dart</span>
                    </div>
                    <pre><code className="block leading-relaxed">
                      <span className="text-[#c792ea]">void</span> <span className="text-[#82aaff]">main</span>() {'{'}<br />
                      &nbsp;&nbsp;<span className="text-[#82aaff]">runApp</span>(<span className="text-[#ffcb6b]">AwesomeWidget</span>());<br />
                      {'}'}
                    </code></pre>
                  </motion.div>

                  {/* 4. Core Card Container in the Middle */}
                  <div className={`relative w-full h-full rounded-[40px] p-6 border flex flex-col justify-between overflow-hidden shadow-xl ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/80 border-slate-200/90'}`}>
                    
                    {/* Abstract Floating Vector Core or Flutter Dynamic Svg */}
                    <div className="m-auto w-36 h-36 flex items-center justify-center relative">
                      <div className="absolute inset-x-0 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-[20px] shrink-0 animate-pulse" />
                      
                      <svg className="w-20 h-20 relative hover:scale-110 duration-500 transition-all cursor-pointer animate-bounce" style={{ animationDuration: '5s' }} viewBox="0 0 100 100">
                        <path d="M 64.26,3 L 34.33,33 L 49.3,47.96 L 79.23,18.03 Z" fill="var(--accent)" />
                        <path d="M 79.23,47.96 L 49.3,77.9 L 34.33,62.93 L 64.26,33 Z" fill={isDarkMode ? "#ffffff" : "#0d1b2a"} />
                        <path d="M 49.3,77.9 L 34.33,92.86 L 4.4,62.93 L 19.36,47.96 Z" fill="var(--accent)" opacity="0.8" />
                      </svg>
                    </div>

                  </div>

                  {/* 5. Left Floating Metrics: 25+ Projects */}
                  <motion.div 
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`absolute bottom-[35px] left-[-38px] z-30 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl shadow-xl border backdrop-blur-md ${isDarkMode ? 'bg-black/90 border-white/10 text-white' : 'bg-white/95 border-slate-200/95 text-slate-800'}`}
                  >
                    <div className="w-6.5 h-6.5 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black tracking-tight text-[var(--accent)] leading-none mb-0.5">25+</span>
                      <span className="text-[7.5px] uppercase font-bold text-slate-400 tracking-wider">Projects</span>
                    </div>
                  </motion.div>

                  {/* 6. Right Floating Metrics: 3+ Years Exp */}
                  <motion.div 
                    animate={{ scale: [1, 0.98, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    className={`absolute top-[45px] right-[-32px] z-30 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl shadow-xl border backdrop-blur-md ${isDarkMode ? 'bg-black/90 border-white/10 text-white' : 'bg-white/95 border-slate-200/95 text-slate-800'}`}
                  >
                    <div className="w-6.5 h-6.5 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black tracking-tight text-[var(--accent)] leading-none mb-0.5">3+ Years</span>
                      <span className="text-[7.5px] uppercase font-bold text-slate-400 tracking-wider">Exp Record</span>
                    </div>
                  </motion.div>

                </div>
              </div>

            </div>
          </section>

          {/* --- NARRATIVE ARCHITECT CORE --- */}
          <section id="about" className="max-w-7xl mx-auto px-6 py-24 w-full border-t border-white/10">
        
        <div className="space-y-4 mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">About Dharmesh Ahir</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold italic tracking-tighter text-white">Narrative & Competence</h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Clean code structures aren't about formatting; they preserve logical scaling frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
            
            {/* Internal navigation tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-3 overflow-x-auto">
              <button
                onClick={() => { setAboutActiveSubTab('work'); playBeep(260, 0.08); }}
                className={`py-2 text-[11px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${aboutActiveSubTab === 'work' ? 'border-b-2 border-[var(--accent)] text-white' : 'text-white/60 hover:text-white'}`}
              >
                Work History
              </button>
              <button
                onClick={() => { setAboutActiveSubTab('skills'); playBeep(280, 0.08); }}
                className={`py-2 text-[11px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${aboutActiveSubTab === 'skills' ? 'border-b-2 border-[var(--accent)] text-white' : 'text-white/60 hover:text-white'}`}
              >
                Skills Spectrum
              </button>
              <button
                onClick={() => { setAboutActiveSubTab('badges'); playBeep(300, 0.08); }}
                className={`py-2 text-[11px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${aboutActiveSubTab === 'badges' ? 'border-b-2 border-[var(--accent)] text-white' : 'text-white/60 hover:text-white'}`}
              >
                Achievements
              </button>
            </div>

            <div className="space-y-6 pt-2">
              {aboutActiveSubTab === 'work' && (
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l border-white/10 group">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--accent)] group-hover:scale-125 transition-transform" />
                      <div className="flex flex-col md:flex-row md:justify-between mb-2">
                        <h4 className="text-base font-bold text-white">{exp.role}</h4>
                        <span className="text-[10px] font-mono font-black text-[var(--accent)] bg-black/40 border border-white/10 px-3 py-1 rounded-full">{exp.period}</span>
                      </div>
                      <p className="text-[11px] text-white/50 font-black uppercase tracking-wider mb-2">{exp.company} | {exp.location}</p>
                      <ul className="text-xs text-white/70 space-y-2 list-disc pl-4 leading-relaxed">
                        {exp.details.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-3">
                        {exp.tags.map((tag, idx) => (
                          <span key={idx} className="bg-black/40 border border-white/10 px-2 py-0.5 rounded text-[9px] font-mono text-cyan-400">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {aboutActiveSubTab === 'skills' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/70 block uppercase">Flutter Rendering & Painting Core</span>
                    <div className="h-2 bg-black/40 border border-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '96%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/70 block uppercase">State Controllers Integration (BLoC / GetX / Riverpod)</span>
                    <div className="h-2 bg-black/40 border border-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '94%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/70 block uppercase">Offline Document sync (HiveDB / SQLite / Firestore)</span>
                    <div className="h-2 bg-black/40 border border-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/70 block uppercase">Telemedicine video streams (WebRTC / HIPAA)</span>
                    <div className="h-2 bg-black/40 border border-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                </div>
              )}

              {aboutActiveSubTab === 'badges' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {badges.map((badge) => {
                    const isUnlocked = badge.unlocked;
                    return (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        className={`border rounded-xl p-4.5 space-y-3 relative overflow-hidden transition-all duration-300 cursor-pointer ${
                          isUnlocked
                            ? 'border-[var(--accent)]/35 bg-black/40 shadow-[0_0_20px_rgba(224,64,251,0.06)] hover:border-[var(--accent)]/60'
                            : 'border-white/5 bg-black/20 opacity-75 hover:opacity-100 hover:border-white/10'
                        }`}
                        onClick={() => {
                          if (isUnlocked) playBeep(660, 0.08);
                          else playBeep(220, 0.12);
                        }}
                      >
                        {/* Radiant Background Glow for Unlocked Badges */}
                        {isUnlocked && (
                          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)]/15 to-purple-500/5 blur-xl pointer-events-none" />
                        )}

                        <div className="flex gap-3 items-start relative z-10">
                          {/* Beautiful Circular Glass Ring for Icon */}
                          <div className={`p-2 rounded-lg shrink-0 border flex items-center justify-center transition-all ${
                            isUnlocked
                              ? 'bg-purple-500/10 border-purple-500/30 shadow-[0_0_15px_rgba(224,64,251,0.15)] ring-2 ring-purple-500/5'
                              : 'bg-white/[0.02] border-white/10 text-neutral-500'
                          }`}>
                            {badge.id === 'badge-ui' && <Layers className={`w-4 h-4 ${isUnlocked ? 'text-[var(--accent)]' : 'text-neutral-500'}`} />}
                            {badge.id === 'badge-state' && <Cpu className={`w-4 h-4 ${isUnlocked ? 'text-[#bf5af2]' : 'text-neutral-500'}`} />}
                            {badge.id === 'badge-sync' && <Database className={`w-4 h-4 ${isUnlocked ? 'text-emerald-400' : 'text-neutral-500'}`} />}
                            {badge.id === 'badge-talk' && <Sparkles className={`w-4 h-4 ${isUnlocked ? 'text-cyan-400' : 'text-neutral-500'}`} />}
                          </div>

                          <div className="space-y-1.5 flex-1">
                            <div className="flex justify-between items-center gap-2">
                              <h4 className="text-[10.5px] font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                                {badge.name}
                              </h4>
                              <span className={`text-[7.5px] font-mono font-bold uppercase py-0.5 px-1.5 rounded-full border transition-all ${
                                isUnlocked 
                                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
                                  : 'bg-neutral-900 text-neutral-500 border-white/5'
                              }`}>
                                {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-400 leading-relaxed font-normal">{badge.description}</p>
                            
                            <div className="pt-2 flex items-center gap-2">
                              <span className="text-[7.5px] font-mono text-neutral-500 font-bold uppercase tracking-widest bg-black/30 border border-white/5 px-2 py-0.5 rounded-md">
                                Objective: {badge.criteria}
                              </span>
                              {isUnlocked && (
                                <span className="flex items-center gap-1 text-[8px] font-mono text-purple-400 font-black animate-pulse uppercase">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block animate-ping" />
                                  +100 EXP
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-black/30 border border-white/10 p-6 rounded-2xl relative overflow-hidden shadow-inner">
              <h3 className="text-sm font-black uppercase tracking-wide text-white mb-2">Architectural Principles</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                "Writing clean state operations eliminates runtime failures. By separating model logic from view layers, maintainability instantly increases."
              </p>
              <div className="mt-4 border-t border-white/10 pt-4 flex justify-between text-center">
                <div>
                  <div className="text-xl font-extrabold text-[var(--accent)]">120Hz</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/50">Frame rate</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[var(--accent)]">0%</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/50">Isolate leak</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[var(--accent)]">Clean</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/50">Design</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FLUTTER LAB PLAYGROUND --- */}
      <section id="laboratory" className="max-w-7xl mx-auto px-6 py-24 w-full border-t border-white/10">
        
        <div className="space-y-4 mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">Experimental Lab sandbox</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold italic tracking-tighter text-white">Flutter Engineering Lab</h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Test actual asynchronous compiler console logs, state transitions benchmarks, database synchronizations or interactive RTC streams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            
            <button
              onClick={() => { setLabStateBenchmark('BLoC'); playBeep(240, 0.1); }}
              className={`w-full text-left p-5 border rounded-2xl transition-all ${labStateBenchmark === 'BLoC' ? 'bg-[var(--accent)]/10 border-[var(--accent)]' : 'bg-black/30 border-white/10 hover:border-cyan-500/40'}`}
            >
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-black/40 rounded-xl text-[var(--accent)]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">BLoC Stream flow</h4>
                  <p className="text-[11px] text-white/50">Compare stream-based events</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => { setLabStateBenchmark('GetX'); playBeep(240, 0.1); }}
              className={`w-full text-left p-5 border rounded-2xl transition-all ${labStateBenchmark === 'GetX' ? 'bg-[var(--accent)]/10 border-[var(--accent)]' : 'bg-black/30 border-white/10 hover:border-cyan-500/40'}`}
            >
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-black/40 rounded-xl text-[var(--accent)]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">GetX reactive controller</h4>
                  <p className="text-[11px] text-white/50">Trace contextless dependency controllers</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => { setLabStateBenchmark('Riverpod'); playBeep(240, 0.1); }}
              className={`w-full text-left p-5 border rounded-2xl transition-all ${labStateBenchmark === 'Riverpod' ? 'bg-[var(--accent)]/10 border-[var(--accent)]' : 'bg-black/30 border-white/10 hover:border-cyan-500/40'}`}
            >
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-black/40 rounded-xl text-[var(--accent)]">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Riverpod Provider setup</h4>
                  <p className="text-[11px] text-white/50">Evaluate compile-time safety structures</p>
                </div>
              </div>
            </button>

          </div>

          <div className="lg:col-span-8 bg-black/40 border border-white/10 rounded-2xl p-6 space-y-6 shadow-inner">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono tracking-widest text-[var(--accent)] uppercase font-bold">Lab Controller Output</span>
              <div className="flex gap-3">
                <button
                  onClick={handleRunIsolate}
                  disabled={labIsolateTask}
                  className="bg-black/60 border border-white/10 hover:border-[var(--accent)] text-white text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-lg transition-colors"
                >
                  {labIsolateTask ? 'Running Isolate...' : 'Run main isolate'}
                </button>
                <button
                  onClick={triggerDataSynchronizationSync}
                  className="bg-gradient-to-r from-[var(--accent)] to-indigo-500 text-black text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-lg"
                >
                  Sync hive database cache
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2 font-mono text-[11px] text-white/60 bg-black/80 p-4 rounded-xl border border-white/10 h-44 overflow-y-auto select-all">
                <div className="text-cyan-400 font-bold mb-1">// Console alerts simulator:</div>
                {labConsoleLines.map((line, idx) => (
                  <div key={idx}>$ {line}</div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{getStateManagementDetails().title}</h4>
                <div className="space-y-1">
                  <span className="text-[9px] text-white/50 uppercase block">Pros spectrum</span>
                  <div className="text-xs text-emerald-400 leading-relaxed font-mono">{getStateManagementDetails().pros}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-white/50 uppercase block">Challenges spectrum</span>
                  <div className="text-xs text-rose-400 leading-relaxed font-mono">{getStateManagementDetails().cons}</div>
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-[var(--accent)] pt-1">
                  <Zap className="w-4 h-4" /> dispatch latency: {getStateManagementDetails().latency}
                </div>
              </div>

            </div>

            {/* Simulated database modules */}
            <div className="border-t border-white/10 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 p-4 rounded-xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">HiveDB Synchronizer</span>
                  <span className="text-[10px] font-mono text-[var(--accent)]">{firebaseProgress}%</span>
                </div>
                <div className="h-2 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)] transition-all" style={{ width: `${firebaseProgress}%` }} />
                </div>
                <p className="text-[10px] text-white/50 italic">Synchronize local client Hive indexes with Firestore cloud slots safely.</p>
              </div>

              <div className="bg-black/30 p-4 rounded-xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">WebRTC stream system</span>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${webrtcActiveStream ? 'bg-emerald-500/20 text-emerald-400 animate-pulse font-extrabold' : 'bg-black/45 text-white/50'}`}>
                    {webrtcActiveStream ? 'Stream Active' : 'Offline'}
                  </span>
                </div>
                <button
                  onClick={startRtcChannel}
                  className="w-full py-2 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-[var(--accent)] text-white text-[10px] uppercase font-black tracking-widest rounded-lg transition-colors"
                >
                  {webrtcActiveStream ? 'Disconnect stream' : 'Connect consultative channel'}
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- PORTFOLIO CASE STUDIES --- */}
      <section id="portfolio" className="max-w-7xl mx-auto px-6 py-24 w-full border-t border-white/10">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">Interactive Case Studies</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold italic tracking-tighter text-white">Case Portfolio</h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
              Each card acts representation with spec telemetry matrices, database schema, and core lessons learned.
            </p>
          </div>

          <div className="flex bg-black/40 border border-white/10 p-1 rounded-2xl gap-2 h-11 items-center px-2 select-none self-start shrink-0">
            {['all', 'Mobile Apps', 'Web Services'].map((c) => (
              <button
                key={c}
                onClick={() => { setPortfolioCategoryFilter(c as any); playBeep(210, 0.08); }}
                className={`px-4 py-1.5 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all ${portfolioCategoryFilter === c ? 'bg-[var(--accent)] text-black font-extrabold' : 'text-white/60 hover:text-white'}`}
              >
                {c === 'all' ? 'All' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects
            .filter(p => portfolioCategoryFilter === 'all' || p.category === portfolioCategoryFilter)
            .map((proj) => (
              <motion.div
                key={proj.id}
                className="bg-black/40 rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative flex flex-col justify-between group cursor-pointer pointer-events-auto"
                whileHover={{ y: -6 }}
                onClick={() => inspectProject(proj)}
              >
                <div className="aspect-[16/10] overflow-hidden relative border-b border-white/10">
                  <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-black/80 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-[var(--accent)] flex items-center gap-1.5 shadow-lg font-bold">
                    <Zap className="w-3.5 h-3.5" /> score: {proj.perfScore}%
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase text-cyan-400 tracking-wider bg-black/40 px-3 py-1 rounded-full border border-white/10">{proj.category}</span>
                    {proj.downloads && <span className="text-[10px] text-white/50">Downloads: {proj.downloads}</span>}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{proj.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed line-clamp-2 select-text">{proj.problem}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.techStack.slice(0, 3).map((stack, idx) => (
                      <span key={idx} className="bg-black/40 border border-white/10 px-2 py-0.5 rounded text-[9px] font-mono text-cyan-400">{stack}</span>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-black/45 border border-white/10 hover:border-[var(--accent)] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 mt-4">
                    Review Architecture <Eye className="w-4 h-4 text-[var(--accent)]" />
                  </button>
                </div>
              </motion.div>
            ))}
        </div>

      </section>

      {/* --- BLOG NEWS --- */}
      <section id="blog" className="max-w-7xl mx-auto px-6 py-24 w-full border-t border-white/10">
        
        <div className="space-y-4 mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">Publications & resources</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold italic tracking-tighter text-white">Articles & Newsletters</h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Read comprehensive technical writeups on isolates concurrency threading systems and cloud ledgers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="border border-white/10 bg-black/25 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-mono text-white/50">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight hover:text-[var(--accent)] transition-colors cursor-pointer">{post.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed select-text">{post.summary}</p>
              </div>
              <button 
                onClick={() => askGuideQuestion(`Explain your publication: "${post.title}"`)}
                className="text-xs font-bold text-[var(--accent)] flex items-center gap-2 hover:underline cursor-pointer"
              >
                Discuss with AI <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          ))}
        </div>

      </section>

      {/* --- CONTACT PANEL --- */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-24 w-full border-t border-white/10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">Dialogue endpoints</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold italic tracking-tighter text-white">Connect Securely</h2>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Engage directly on software architecture setups, HIPAA compliance, responsive designs implementation, or general consultancy indicators.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 bg-black/20 border border-white/10 p-4 rounded-xl cursor-pointer hover:border-[var(--accent)] transition-colors" onClick={copyEmailToClipboard}>
                <div className="p-3 bg-black/40 rounded-lg text-[var(--accent)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/50">Secure Direct Email</div>
                  <div className="text-xs font-bold text-white font-mono">{profile.email || 'katariyadharmesh658@gmail.com'}</div>
                  {copiedEmail && <div className="text-[9px] text-emerald-400 font-bold uppercase mt-1">📧 Copied!</div>}
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black/20 border border-white/10 p-4 rounded-xl">
                <div className="p-3 bg-black/40 rounded-lg text-[var(--accent)]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/50">Direct WhatsApp / Mobile</div>
                  <div className="text-xs font-bold text-white font-mono">{profile.mobile || '+91 6354464371'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black/20 border border-white/10 p-4 rounded-xl">
                <div className="p-3 bg-black/40 rounded-lg text-[var(--accent)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/50">Location</div>
                  <div className="text-xs font-bold text-white">Nana Varachha, Surat, Gujarat 395010</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8">
            <form onSubmit={handleContactSubmitForm} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-white/60">Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 hover:border-cyan-500/40 focus:border-[var(--accent)] outline-none rounded-xl px-4 py-3 text-xs text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-white/60">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 hover:border-cyan-500/40 focus:border-[var(--accent)] outline-none rounded-xl px-4 py-3 text-xs text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-white/60">Your Inquiry details</label>
                <textarea
                  required
                  rows={4}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 hover:border-cyan-500/40 focus:border-[var(--accent)] outline-none rounded-xl px-4 py-3 text-xs text-white"
                  placeholder="Describe your timeline, parameters or scaling requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[var(--accent)] to-indigo-500 text-black font-black uppercase text-xs tracking-wider rounded-xl transition-all hover:scale-105 font-mono flex items-center justify-center gap-2"
              >
                Submit securing parameters <Send className="w-4 h-4" />
              </button>

              {sentMessageNotify && (
                <p className="text-[11px] font-mono text-[var(--accent)] text-center animate-pulse pt-2 font-bold">{sentMessageNotify}</p>
              )}
            </form>
          </div>

        </div>

      </section>
        </>
      )}

      {/* --- FOOTER REGION --- */}
      <footer className="border-t border-white/10 bg-black/60 py-12 relative z-10 text-center text-white/50">
        <p className="text-xs tracking-wider">
          &copy; 2026 Dharmesh Ahir. All Rights Reserved. Built securely with custom particles and Clean Architecture standards.
        </p>
      </footer>

      {/* --- CONFIGURATION SETTINGS SIDEBAR DRAWER --- */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-0 right-0 h-screen w-80 bg-black/95 border-l border-white/10 z-[2000] p-6 shadow-2xl overflow-y-auto space-y-6 backdrop-blur-md"
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-xs uppercase font-black text-white tracking-widest flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[var(--accent)]" /> Configure Studio
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 border border-white/10 hover:border-[var(--accent)] rounded text-white/50 bg-black/40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Experience Perspective Mode Selection */}
            <div className="space-y-2 border-b border-white/5 pb-4">
              <span className="text-[10px] font-bold text-white/50 uppercase block">PERSPECTIVE FOCUS MODE</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'developer', label: 'Tech Dev' },
                  { id: 'recruiter', label: 'Recruit' },
                  { id: 'founder', label: 'Business' }
                ].map((mOption) => (
                  <button
                    key={mOption.id}
                    onClick={() => { setMode(mOption.id as ModeType); playBeep(200, 0.1); }}
                    className={`py-1.5 text-[8px] uppercase tracking-wider font-extrabold rounded-md border text-center transition-colors ${mode === mOption.id ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/35 text-white/60 border-white/10'}`}
                  >
                    {mOption.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark & Light Theme Toggle Slider trigger */}
            <div className="space-y-2 border-b border-white/5 pb-4">
              <span className="text-[10px] font-bold text-white/50 uppercase block">UI Canvas Luminosity</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    setIsDarkMode(true);
                    localStorage.setItem('portfolio_dark', JSON.stringify(true));
                    playBeep(640, 0.08);
                  }}
                  className={`py-1.5 text-[8px] uppercase tracking-wider font-extrabold rounded-md border text-center transition-colors ${isDarkMode ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/35 text-white/60 border-white/10'}`}
                >
                  🌙 Deep Dark
                </button>
                <button
                  onClick={() => {
                    setIsDarkMode(false);
                    localStorage.setItem('portfolio_dark', JSON.stringify(false));
                    playBeep(740, 0.08);
                  }}
                  className={`py-1.5 text-[8px] uppercase tracking-wider font-extrabold rounded-md border text-center transition-colors ${!isDarkMode ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/35 text-white/60 border-white/10'}`}
                >
                  ☀️ Clean Light
                </button>
              </div>
            </div>

            {/* Layout options */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white/50 uppercase block">Layout Style Pattern</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'classic', name: 'Classic Dock' },
                  { id: 'glassmorphism-studio', name: 'Ambient Glass' },
                  { id: 'left-sidebar', name: 'Left Sidebar' },
                  { id: 'developer-dashboard', name: 'Mock IDE' },
                  { id: 'apple-minimal', name: 'Apple Clean' },
                  { id: 'terminal-hacker', name: 'Command Line' },
                  { id: 'interactive-magazine', name: 'Editorial Mag' },
                  { id: 'fullscreen-scroll-story', name: 'Scroll Story' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setLayout(item.id as LayoutType); playBeep(523, 0.05); }}
                    className={`p-1.5 text-[8px] uppercase font-black tracking-wider rounded-lg border text-center transition-colors ${layout === item.id ? 'bg-[var(--accent)] text-black font-extrabold border-[var(--accent)]' : 'bg-black/40 text-white/85 hover:text-[var(--accent)] border-white/10'}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Palette switches */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white/50 uppercase block">Atmospheric Palette</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'ocean', label: 'Ocean' },
                  { id: 'sunset', label: 'Sunset' },
                  { id: 'forest', label: 'Forest' },
                  { id: 'purple', label: 'Royal' },
                  { id: 'nord', label: 'Nord' },
                  { id: 'amoled', label: 'AMOLED' },
                  { id: 'cyberpunk-neon', label: 'Neon' },
                  { id: 'dev-dark', label: 'DevDark' },
                  { id: 'tesla-black', label: 'Tesla' }
                ].map((palette) => (
                  <button
                    key={palette.id}
                    onClick={() => { setTheme(palette.id as ThemeType); playBeep(980, 0.05); }}
                    className={`py-1 text-[8px] uppercase tracking-wider font-extrabold rounded-md border text-center whitespace-nowrap transition-colors ${theme === palette.id ? 'border-[var(--accent)] text-[var(--accent)] bg-black/40' : 'bg-black/25 text-white/60 border-white/10'}`}
                  >
                    {palette.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Environment Controller */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white/50 uppercase block">3D Environment Controller</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'auto', label: '🛡️ Auto' },
                  { id: 'enabled', label: '✨ Enabled' },
                  { id: 'disabled', label: '💤 Disabled' }
                ].map((modeOption) => (
                  <button
                    key={modeOption.id}
                    onClick={() => { setThreeDimensionMode(modeOption.id as 'auto' | 'enabled' | 'disabled'); playBeep(220, 0.1); }}
                    className={`py-1.5 text-[8px] uppercase tracking-widest text-center rounded-lg border transition-all ${threeDimensionMode === modeOption.id ? 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)] font-extrabold' : 'bg-black/30 text-white/70 border-white/10'}`}
                  >
                    {modeOption.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom 3D backgrounds Option Switcher */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white/50 uppercase block">3D Canvas Universe</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'particles', desc: 'Flutter Particles' },
                  { id: 'cubes', desc: 'Glass Cubes' },
                  { id: 'grid', desc: 'Neon Grid' },
                  { id: 'galaxy', desc: 'Flutter Galaxy' },
                  { id: 'neural', desc: 'AI Neural Net' }
                ].map((bgOption) => (
                  <button
                    key={bgOption.id}
                    onClick={() => { setBgType(bgOption.id as Background3DType); playBeep(260, 0.1); }}
                    className={`py-1.5 text-[8px] uppercase tracking-widest text-center rounded-lg border transition-all ${bgType === bgOption.id ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)] font-extrabold' : 'bg-black/30 text-white/70 border-white/10'}`}
                  >
                    {bgOption.desc}
                  </button>
                ))}
              </div>
            </div>

            {/* Selectable Cursors */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white/50 uppercase block">Advanced Cursor Style State</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'glass', label: 'Frosted Ring' },
                  { id: 'dot', label: 'Pixel Dot' },
                  { id: 'neon', label: 'Neon glowing' },
                  { id: 'apple', label: 'Apple Link' },
                  { id: 'magnetic', label: 'Magnetic Blob' },
                  { id: 'terminal', label: 'CLI Terminal' }
                ].map((cursorOption) => (
                  <button
                    key={cursorOption.id}
                    onClick={() => { setCursorStyle(cursorOption.id as CursorStyleType); playBeep(330, 0.1); }}
                    className={`p-1.5 text-[8px] uppercase font-black tracking-widest rounded-lg border transition-colors ${cursorStyle === cursorOption.id ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]' : 'bg-black/20 text-white/60 border-white/10'}`}
                  >
                    {cursorOption.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High Fidelity Slidables Visual Engine Section */}
            <div className="space-y-3 border-t border-white/5 pt-4">
              <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider block flex items-center gap-1">
                <Zap className="w-3 h-3 text-[var(--accent)]" /> Visual Fidelity Tuning
              </span>
              
              <div className="space-y-1">
                <div className="flex justify-between text-[8px] text-white/50 font-bold uppercase">
                  <span>Motion Inertia Scale</span>
                  <span>{motionIntensity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={motionIntensity} 
                  onChange={(e) => {
                    const nextVal = parseInt(e.target.value);
                    setMotionIntensity(nextVal);
                    localStorage.setItem('portfolio_motion_density', JSON.stringify(nextVal));
                  }}
                  className="w-full accent-[var(--accent)] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[8px] text-white/50 font-bold uppercase">
                  <span>Glow Intensity Scalar</span>
                  <span>{glowIntensity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={glowIntensity} 
                  onChange={(e) => {
                    const nextVal = parseInt(e.target.value);
                    setGlowIntensity(nextVal);
                    localStorage.setItem('portfolio_glow_density', JSON.stringify(nextVal));
                  }}
                  className="w-full accent-[var(--accent)] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[8px] text-white/50 font-bold uppercase">
                  <span>Glassmorphic Strength</span>
                  <span>{glassStrength}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={glassStrength} 
                  onChange={(e) => {
                    const nextVal = parseInt(e.target.value);
                    setGlassStrength(nextVal);
                    localStorage.setItem('portfolio_glass_density', JSON.stringify(nextVal));
                  }}
                  className="w-full accent-[var(--accent)] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[8px] text-white/50 font-bold uppercase">
                  <span>Isolates Particles Capacity</span>
                  <span>{particleDensity}k</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  value={particleDensity} 
                  onChange={(e) => {
                    const nextVal = parseInt(e.target.value);
                    setParticleDensity(nextVal);
                    localStorage.setItem('portfolio_particle_density', JSON.stringify(nextVal));
                  }}
                  className="w-full accent-[var(--accent)] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Audio configuration toggler */}
            <div className="flex justify-between items-center bg-black/40 border border-white/10 p-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white">
              <span>Holographic Audio Feed</span>
              <button
                onClick={() => {
                  const nextMuted = !isMuted;
                  setIsMuted(nextMuted);
                  localStorage.setItem('portfolio_muted', JSON.stringify(nextMuted));
                  playBeep(880, 0.1);
                }}
                className="p-1 px-3 border border-white/10 text-[9px] text-[var(--accent)] bg-black/20 rounded"
              >
                {isMuted ? 'MUTE ENABLED' : 'SOUND SIGNAL ACTIVE'}
              </button>
            </div>

            <p className="text-[8px] text-white/40 italic text-center leading-relaxed font-sans pt-1">
              *All parameters instantly saved in Local Storage. Hot restarts persist configurations flawlessly.
            </p>

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- COLLABORATIVE COMPANION AI CHAT DRAWER --- */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            className={`fixed border border-[var(--border)] z-[2020] overflow-hidden flex flex-col justify-between shadow-2xl backdrop-blur-3xl pointer-events-auto transition-all duration-300 ${
              isAiMaximized 
                ? 'inset-6 rounded-[28px] bg-black/95' 
                : aiLayoutMode === 'sidebar' 
                ? 'top-0 right-0 h-screen w-[380px] md:w-[440px] rounded-none border-l bg-black/95' 
                : aiLayoutMode === 'dock' 
                ? 'bottom-28 right-12 w-[340px] md:w-[380px] h-[480px] rounded-2xl bg-black/95' 
                : 'bottom-24 right-6 w-[360px] md:w-[420px] h-[520px] rounded-3xl bg-black/95'
            }`}
          >
            <div className="flex flex-col bg-black/40 border-b border-[var(--border)]">
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Sparkles className="w-5 h-5 text-[var(--accent)] animate-pulse" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase text-white tracking-widest">Dharmesh AI Copilot</h3>
                    <span className={`text-[8.5px] font-mono uppercase tracking-widest font-black flex items-center gap-1.5 transition-colors duration-350 ${
                      aiPresence === 'reasoning' ? 'text-fuchsia-400' :
                      aiPresence === 'searching' ? 'text-teal-400' :
                      aiPresence === 'memory recall' ? 'text-indigo-400' :
                      aiPresence === 'generating' ? 'text-yellow-400' :
                      'text-emerald-400 animate-pulse'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-350 ${
                        aiPresence === 'reasoning' ? 'bg-fuchsia-400 animate-pulse' :
                        aiPresence === 'searching' ? 'bg-teal-400 animate-[spin_1.5s_linear_infinite]' :
                        aiPresence === 'memory recall' ? 'bg-indigo-400' :
                        aiPresence === 'generating' ? 'bg-yellow-400 animate-ping' :
                        'bg-emerald-400 animate-pulse'
                      }`} />
                      {aiPresence === 'reasoning' && '🧠 SYSTEM COGNITIVE REASONING'}
                      {aiPresence === 'searching' && '⚡ CACHE & SYNAPSE SEARCHING'}
                      {aiPresence === 'memory recall' && '💾 RECALLING ASSOCIATIVE MEMORY'}
                      {aiPresence === 'generating' && '✍️ GENERATING SYNTHESIZED ARRAY'}
                      {aiPresence === 'ready' && '🌐 COMPANION STATION READY'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Maximizer / Fullscreen icon button */}
                  <button
                    onClick={() => {
                      setIsAiMaximized(!isAiMaximized);
                      playBeep(520, 0.05);
                    }}
                    className="p-1 px-1.5 text-[8px] font-mono border border-white/15 rounded text-white/50 hover:text-[var(--accent)] bg-black/30"
                    title={isAiMaximized ? 'Minimize Window' : 'Maximize Window'}
                  >
                    {isAiMaximized ? 'COMPACT' : 'FULLSCREEN'}
                  </button>
                  <button
                    onClick={() => setIsAiOpen(false)}
                    className="p-1 border border-white/10 hover:border-rose-400 rounded text-white/50 bg-black/40"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* HIGH FIDELITY LAYOUT PERSPECTIVE CONFIGURATION MODE SELECTOR */}
              <div className="flex items-center justify-between px-4 pb-2.5 text-[8px] pt-1.5 border-t border-white/5 bg-black/20 select-none">
                <span className="font-mono font-black text-white/40 tracking-wider">PERSPECTIVE OVERLAY:</span>
                <div className="flex gap-1.5">
                  {[
                    { id: 'bubble', label: 'BUBBLE' },
                    { id: 'sidebar', label: 'SIDEBAR' },
                    { id: 'dock', label: 'DOCK' }
                  ].map((modeOpt) => (
                    <button
                      key={modeOpt.id}
                      onClick={() => {
                        setAiLayoutMode(modeOpt.id as any);
                        setIsAiMaximized(false);
                      }}
                      className={`px-2 py-0.5 font-mono text-[7px] font-black rounded border transition-all ${
                        aiLayoutMode === modeOpt.id && !isAiMaximized
                          ? 'bg-[var(--accent)] text-black border-[var(--accent)]' 
                          : 'bg-black/30 border-white/5 text-white/50 hover:text-white'
                      }`}
                    >
                      {modeOpt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic AI Context Memory Vault LEDGER Display */}
            <div className="bg-[#030712] border-b border-white/5 p-2 px-4 flex flex-col gap-1 select-none font-mono text-[7.5px]">
              <span className="text-white/40 font-black tracking-widest uppercase">// AI CONTEXTUAL SEED MEMORIES:</span>
              <div className="flex flex-wrap gap-1.5">
                {aiMemory.map((mem, i) => (
                  <span key={i} className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] px-1.5 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1 h-1 bg-[var(--accent)] rounded-full animate-pulse" />
                    {mem}
                  </span>
                ))}
              </div>
            </div>

            {/* Chat history representation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans bg-black/5 custom-scrollbar">
              {aiHistory.length <= 1 && (
                <div className="flex flex-col items-center justify-center py-5 text-center space-y-6 max-w-sm mx-auto select-none">
                  
                  {/* PROCESSING RINGS, ORBIT NODES & NEURAL ORB SYNC */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Ring 1 - Spinning mesh */}
                    <div className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
                      aiPresence !== 'ready' ? 'border-[var(--accent)] animate-spin opacity-80' : 'border-white/10 animate-[spin_30s_linear_infinite]'
                    }`} />
                    
                    {/* Ring 2 - Double reverse spinning outline */}
                    <div className={`absolute inset-2 rounded-full border border-double transition-all duration-1000 ${
                      aiPresence !== 'ready' ? 'border-amber-400/40 animate-[spin_8s_linear_infinite_reverse]' : 'border-white/5 animate-[spin_40s_linear_infinite_reverse]'
                    }`} />
                    
                    {/* Dynamic atmosphere lighting filter */}
                    <div className={`absolute w-14 h-14 rounded-full blur-xl opacity-35 transition-all duration-500 ${
                      aiPresence === 'reasoning' ? 'bg-fuchsia-500 scale-130' :
                      aiPresence === 'searching' ? 'bg-teal-500 scale-115 animate-pulse' :
                      aiPresence === 'memory recall' ? 'bg-indigo-500 scale-110 opacity-70' :
                      aiPresence === 'generating' ? 'bg-yellow-400 scale-125 animate-ping' : 'bg-cyan-400'
                    }`} />

                    {/* Outer companion satellite particles */}
                    <div className="absolute w-2 h-2 rounded-full bg-[var(--accent)] -top-1 animate-bounce" />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-white -bottom-0.5 animate-pulse" />

                    {/* Deep Central Glass brain node */}
                    <div className={`w-12 h-12 rounded-full bg-black/80 border flex items-center justify-center text-lg z-10 shadow-lg transition-transform ${
                      aiPresence !== 'ready' ? 'border-[var(--accent)] scale-110 animate-bounce' : 'border-white/20 hover:border-[var(--accent)] hover:scale-105'
                    }`}>
                      {aiPresence === 'reasoning' && '🧠'}
                      {aiPresence === 'searching' && '⚡'}
                      {aiPresence === 'memory recall' && '💾'}
                      {aiPresence === 'generating' && '✍️'}
                      {aiPresence === 'ready' && '🌐'}
                    </div>
                  </div>

                  {/* INTRO TITLE TEXTS */}
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest font-mono">[ COGNITIVE COMMAND CENTRE ]</h5>
                    <p className="text-[10px] text-white/50 leading-relaxed px-4">
                      Dharmesh AI is ready to synthesize secure code arrays, benchmark multithreaded Dart Isolates, or draft consultation papers.
                    </p>
                  </div>

                  {/* FLOATING NEURAL KNOWLEDGE GRAPH (Interactive Synapse Nodes) */}
                  <div className="w-full bg-black/50 border border-white/5 rounded-[20px] p-3.5 space-y-3.5 backdrop-blur-md">
                    <div className="flex items-center justify-between font-mono text-[8px] border-b border-white/5 pb-2">
                      <span className="text-white/40 tracking-widest">// KNOWLEDGE CONSTELLATION NETWORK:</span>
                      <span className="text-[var(--accent)] animate-pulse uppercase tracking-wider font-extrabold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                        Graph Active
                      </span>
                    </div>
                    
                    {/* Connected Knowledge Graph Nodes */}
                    <div className="relative w-full h-56 bg-zinc-950/80 rounded-2xl border border-white/5 overflow-hidden">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {/* Connected synapse pathways */}
                        <line x1="30%" y1="25%" x2="70%" y2="20%" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="30%" y1="25%" x2="50%" y2="48%" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1" />
                        <line x1="70%" y1="20%" x2="50%" y2="48%" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1" />
                        <line x1="50%" y1="48%" x2="18%" y2="65%" stroke="rgba(255, 110, 64, 0.12)" strokeWidth="1" />
                        <line x1="50%" y1="48%" x2="82%" y2="56%" stroke="rgba(213, 0, 249, 0.12)" strokeWidth="1" />
                        <line x1="50%" y1="48%" x2="48%" y2="82%" stroke="rgba(0, 230, 118, 0.15)" strokeWidth="1" />
                        <line x1="48%" y1="82%" x2="18%" y2="65%" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="2 2" />
                      </svg>

                      {[
                        { text: 'Flutter', short: 'ui.eng', q: 'Explain Dharmesh expertise structure in Flutter UI modules and layout architectures', x: '30%', y: '25%', color: 'from-cyan-400 to-blue-500' },
                        { text: 'Dart', short: 'iso.core', q: 'Tell me about multi-threaded Dart isolates and performance telemetry analysis', x: '70%', y: '20%', color: 'from-blue-500 to-indigo-500' },
                        { text: 'Firebase', short: 'db.sync', q: 'Explain real-time low-latency cache structures using Firebase integrations', x: '18%', y: '65%', color: 'from-amber-500 to-orange-400' },
                        { text: 'Architecture', short: 'clean.core', q: 'Explain clean architecture layers and reactive flow management models', x: '50%', y: '48%', color: 'from-emerald-400 to-teal-500' },
                        { text: 'WebRTC', short: 'rtc.sec', q: 'Explain HIPAA secure WebRTC video signaling protocols built by Dharmesh', x: '82%', y: '56%', color: 'from-pink-500 to-violet-500' },
                        { text: 'SQLite', short: 'cache.db', q: 'How does Khata app execute local syncing databases with SQLite structures', x: '48%', y: '82%', color: 'from-indigo-400 to-cyan-500' }
                      ].map((node, idx) => (
                        <button
                          key={idx}
                          onClick={() => { triggerAIPortfolioQuery(node.q); playBeep(600 + idx * 80, 0.05); }}
                          style={{ left: node.x, top: node.y }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center cursor-pointer z-10"
                        >
                          {/* Pulsing glow node */}
                          <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${node.color} flex items-center justify-center p-[2px] shadow-lg group-hover:scale-125 transition-transform duration-300 relative`}>
                            <div className="w-full h-full rounded-full bg-zinc-950 animate-ping absolute inset-0 opacity-45 group-hover:opacity-100" />
                            <div className="w-full h-full rounded-full bg-zinc-950 z-10" />
                          </div>
                          
                          {/* Micro labels */}
                          <div className="mt-1 bg-black/90 border border-white/5 group-hover:border-[var(--accent)] px-1.5 py-0.5 rounded text-[7px] font-mono whitespace-nowrap text-zinc-300 group-hover:text-white transition-all shadow-md">
                            <span className="font-black text-[7.5px] block leading-none">{node.text}</span>
                            <span className="text-zinc-500 text-[5px] uppercase tracking-widest">{node.short}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <p className="text-[7.5px] font-mono text-zinc-500 text-center uppercase tracking-widest">
                      [ Interactive connected neural map complete ]
                    </p>
                  </div>

                </div>
              )}
              {aiHistory.map((h) => {
                const textWithoutTags = h.text
                  .replace('[RECRUITER_SUMMARY_CARD]', '')
                  .replace('[FOUNDER_SUMMARY_CARD]', '')
                  .replace('[ARCH_REVIEW_CARD]', '')
                  .replace('[PROJECT_REC_CARD]', '')
                  .trim();

                const isRecruiterCard = h.text.includes('[RECRUITER_SUMMARY_CARD]');
                const isFounderCard = h.text.includes('[FOUNDER_SUMMARY_CARD]');
                const isArchCard = h.text.includes('[ARCH_REVIEW_CARD]');
                const isProjectCard = h.text.includes('[PROJECT_REC_CARD]');

                return (
                  <div key={h.id} className={`flex flex-col ${h.role === 'user' ? 'items-end' : 'items-start'} space-y-2 mb-4`}>
                    <div className={`p-3 rounded-2xl max-w-[85%] text-[11px] leading-relaxed relative ${
                      h.role === 'user' 
                        ? 'bg-[var(--accent)] text-black font-semibold shadow-md' 
                        : 'bg-white/[0.03] border border-white/10 text-white shadow-sm'
                    }`}>
                      {textWithoutTags}
                      
                      {/* --- RECRUITER SUMMARY CARD --- */}
                      {isRecruiterCard && (
                        <div className="mt-3 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl space-y-2 font-sans text-white text-left shadow-lg backdrop-blur-xl">
                          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
                            <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-extrabold uppercase">👔 Recruiter Focus Desk</span>
                            <span className="bg-emerald-500/20 text-emerald-300 text-[6.5px] font-black px-1.5 py-0.5 rounded border border-emerald-500/30">VERIFIED CONTRACTOR</span>
                          </div>
                          <div className="space-y-1 text-[9.5px]">
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Total Industry Exp:</span>
                              <span className="font-bold text-emerald-300">3.5+ Years Professional</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Prime Core Capability:</span>
                              <span className="font-bold text-white">Flutter Lead Architect</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Active Notice / Availability:</span>
                              <span className="font-bold text-emerald-300 animate-pulse">Immediate Joiner</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            <button 
                              onClick={() => {
                                const directLink = document.createElement('a');
                                directLink.href = 'mailto:katariyadharmesh658@gmail.com';
                                directLink.click();
                                playBeep(520, 0.1);
                              }}
                              className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-[7.5px] text-emerald-300 font-black uppercase tracking-wider py-1 rounded transition-all cursor-pointer"
                            >
                              📧 Direct Email
                            </button>
                            <button 
                              onClick={printCV}
                              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-[7.5px] text-white font-black uppercase tracking-wider py-1 rounded transition-all cursor-pointer"
                            >
                              Download CV
                            </button>
                          </div>
                        </div>
                      )}

                      {/* --- FOUNDER SUMMARY CARD --- */}
                      {isFounderCard && (
                        <div className="mt-3 p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl space-y-2 font-sans text-white text-left shadow-lg backdrop-blur-xl">
                          <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
                            <span className="text-[9px] font-mono tracking-widest text-amber-400 font-extrabold uppercase">🚀 CTO & Founder Hub</span>
                            <span className="bg-amber-500/20 text-amber-300 text-[6.5px] font-black px-1.5 py-0.5 rounded border border-amber-500/30">SCALE READY</span>
                          </div>
                          <div className="space-y-1 text-[9.5px]">
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Product Scaling:</span>
                              <span className="font-bold text-amber-300">0 to 1 MVP velocity</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Security / Compliance:</span>
                              <span className="font-bold text-white">HIPAA secure channels</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Sync Masterclass:</span>
                              <span className="font-bold text-amber-300">Khata Syncing engines</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            <button 
                              onClick={() => {
                                const directLink = document.createElement('a');
                                directLink.href = 'tel:+916354464371';
                                directLink.click();
                                playBeep(520, 0.1);
                              }}
                              className="w-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[7.5px] text-amber-300 font-black uppercase tracking-wider py-1 rounded transition-all cursor-pointer"
                            >
                              📞 Direct Call
                            </button>
                            <button 
                              onClick={() => {
                                setTheme('sunset');
                                setLayout('glassmorphism-studio');
                                setBgType('galaxy');
                                playBeep(260, 0.1);
                              }}
                              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-[7.5px] text-white font-black uppercase tracking-wider py-1 rounded transition-all cursor-pointer"
                            >
                              Launch Pitch Mode
                            </button>
                          </div>
                        </div>
                      )}

                      {/* --- ARCHITECTURE REVIEW CARD --- */}
                      {isArchCard && (
                        <div className="mt-3 p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl space-y-2 font-sans text-white text-left shadow-lg backdrop-blur-xl">
                          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
                            <span className="text-[9px] font-mono tracking-widest text-cyan-400 font-extrabold uppercase">🧠 Clean Architecture Node</span>
                            <span className="bg-cyan-500/20 text-cyan-300 text-[6.5px] font-black px-1.5 py-0.5 rounded border border-cyan-500/30">COMPILER OK</span>
                          </div>
                          <div className="space-y-1 text-[9.5px]">
                            <div className="flex justify-between">
                              <span className="text-zinc-400">State Handlers:</span>
                              <span className="font-bold text-cyan-300">BLoC, Riverpod, GetX</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Isolation Layer:</span>
                              <span className="font-bold text-white">Full core decoupling</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Concurrent Sync:</span>
                              <span className="font-bold text-cyan-300">Active SQLite queues</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            <button 
                              onClick={() => {
                                setTheme('tesla-black');
                                setLayout('terminal-hacker');
                                setCursorStyle('terminal');
                                playBeep(520, 0.1);
                              }}
                              className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-[7.5px] text-cyan-400 font-black uppercase tracking-wider py-1 rounded transition-all cursor-pointer"
                            >
                              💻 Hacker Terminal
                            </button>
                            <button 
                              onClick={() => {
                                const el = document.getElementById('config-studio-btn');
                                if (el) el.click();
                                playBeep(260, 0.1);
                              }}
                              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-[7.5px] text-white font-black uppercase tracking-wider py-1 rounded transition-all cursor-pointer"
                            >
                              Config Studio
                            </button>
                          </div>
                        </div>
                      )}

                      {/* --- PROJECT RECOMMENDATION CARD --- */}
                      {isProjectCard && (
                        <div className="mt-3 p-3 bg-fuchsia-950/40 border border-fuchsia-500/30 rounded-xl space-y-2 font-sans text-white text-left shadow-lg backdrop-blur-xl">
                          <div className="flex items-center justify-between border-b border-fuchsia-500/20 pb-1.5">
                            <span className="text-[9px] font-mono tracking-widest text-fuchsia-400 font-extrabold uppercase">📈 Project Recommender</span>
                            <span className="bg-fuchsia-500/20 text-fuchsia-300 text-[6.5px] font-black px-1.5 py-0.5 rounded border border-fuchsia-500/30">ALGORITHMIC</span>
                          </div>
                          <div className="space-y-1 text-[9.5px]">
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Match Helix Care:</span>
                              <span className="font-bold text-fuchsia-300">98% Fit Rating</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Database Offline:</span>
                              <span className="font-bold text-white">Khata Ledger (SQLite)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400">Enterprise Scale:</span>
                              <span className="font-bold text-fuchsia-300">Resido property admin</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            <button 
                              onClick={() => {
                                const btn = document.getElementById('operations-hub-btn');
                                if (btn) btn.click();
                                playBeep(520, 0.1);
                              }}
                              className="w-full bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border border-fuchsia-500/40 text-[7.5px] text-fuchsia-300 font-black uppercase tracking-wider py-1 rounded transition-all cursor-pointer"
                            >
                              🏥 Operations Hub
                            </button>
                            <button 
                              onClick={() => {
                                const btn = document.getElementById('spotlight-search-btn');
                                if (btn) btn.click();
                                playBeep(260, 0.1);
                              }}
                              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-[7.5px] text-white font-black uppercase tracking-wider py-1 rounded transition-all cursor-pointer"
                            >
                              Spotlight Search
                            </button>
                          </div>
                        </div>
                      )}

                      <span className={`absolute -bottom-4 text-[7px] font-mono text-white/35 ${h.role === 'user' ? 'right-1' : 'left-1'}`}>
                        {h.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
              {aiTyping && (
                <div className="flex items-center gap-2 px-2 text-[10px] text-white/50 font-mono animate-pulse">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
                  </span>
                  <span>Streaming tokens... compiling response context...</span>
                </div>
              )}
            </div>

            {/* Suggested Chips (Premium Floating System Actions) */}
            <div className="p-2 border-t border-white/10 flex gap-2 overflow-x-auto bg-black/20 select-none custom-scrollbar">
              {[
                { label: 'Developer Mode', query: 'Configure Developer Workspace mode' },
                { label: 'Pitch / CTO Layout', query: 'Switch theme to Pitch founder sunset preset' },
                { label: 'Download Resume', query: 'Send me the download Link for custom CV Resume' },
                { label: 'Cyberpunk Theme', query: 'Load cyberpunk neon cyberpunk theme preset' }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerAIPortfolioQuery(chip.query)}
                  className="bg-white/5 hover:bg-[var(--accent)]/15 border border-white/10 hover:border-[var(--accent)]/30 text-[8px] font-bold uppercase tracking-widest text-zinc-300 hover:text-[var(--accent)] px-3 py-1.5 rounded-full whitespace-nowrap transition-all"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Chat Input form */}
            <div className="p-3 border-t border-white/10 bg-black/60 flex gap-2 items-center">
              <button 
                onClick={handleVoiceConsult} 
                className={`p-2 bg-black/40 border border-white/10 rounded-xl hover:border-[var(--accent)] transition-all ${isListening ? 'animate-bounce text-rose-500 border-rose-500/50' : 'text-cyan-400'}`}
                title={isListening ? 'Speech active... speak now' : 'Initiate voice sync consultation'}
              >
                <Mic className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') triggerAIPortfolioQuery(); }}
                placeholder="Query metrics, sqlite architecture or print CV files..."
                className="flex-1 bg-black/40 border border-white/10 focus:border-[var(--accent)] rounded-xl outline-none px-4 py-2 text-xs text-white placeholder:text-zinc-650"
              />
              <button 
                onClick={() => triggerAIPortfolioQuery()} 
                className="p-2.5 bg-[var(--accent)] text-black rounded-xl hover:scale-105 active:scale-95 transition-transform shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PREMIUM AI ORB MODE LAUNCHER (HUD-integrated, non-colliding design) --- */}
      {!isAiOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, shadow: '0 0 25px rgba(0,229,255,0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAiOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-black/85 border border-[var(--accent)]/30 rounded-full flex items-center justify-center cursor-pointer z-[2010] shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:border-[var(--accent)] group overflow-hidden"
          title="Consult Dharmesh AI Agent Representative"
        >
          {/* Animated custom neon mesh inside orb */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/30 via-indigo-500/20 to-transparent animate-pulse group-hover:scale-125 transition-transform" />
          <div className="absolute w-6 h-6 rounded-full bg-[var(--accent)]/20 blur-[6px] group-hover:scale-150 transition-all pointer-events-none" />
          <Sparkles className="w-5 h-5 text-[var(--accent)] animate-pulse relative z-10 transition-transform group-hover:rotate-12" />
        </motion.div>
      )}

      {/* --- INSTANT PORTFOLIO INSPECTION DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[2050] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black/95 border border-white/10 w-full max-w-2xl rounded-[30px] overflow-hidden flex flex-col justify-between shadow-2xl h-[85vh] p-6 md:p-8 space-y-6 overflow-y-auto"
            >
              
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <span className="text-[9px] font-mono uppercase text-[var(--accent)] tracking-wider block">{selectedProject.category} | target performance {selectedProject.perfScore}%</span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{selectedProject.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 border border-white/10 hover:border-[var(--accent)] rounded text-white/50 bg-black/40"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Detail fields */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black text-white/50 tracking-wider block">The Core Problem scenario</span>
                  <p className="text-xs text-white/70 leading-relaxed select-text">{selectedProject.problem}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black text-white/50 tracking-wider block">Dharmeshes customized Solution</span>
                  <p className="text-xs text-white leading-relaxed select-text">{selectedProject.solution}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black text-white/50 tracking-wider block">Decoupled Architecture description</span>
                  <p className="text-xs text-cyan-400 font-mono bg-black/40 border border-white/10 p-3 rounded-lg leading-relaxed select-all">{selectedProject.architecture}</p>
                </div>

                <ProjectArchitectureAccordion techStack={selectedProject.techStack} category={selectedProject.category} />

                {/* CASE STUDY INTELLIGENCE LAYER */}
                <div className="border border-white/5 p-4 rounded-[20px] bg-black/50 space-y-3 shadow-inner">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    <span className="text-[8.5px] uppercase font-mono tracking-widest text-[#00ffcc] font-black">// ARCHITECTURAL PERFORMANCE COEFFICIENT</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="flex justify-between items-center text-[8.5px] font-mono mb-1 text-slate-400">
                        <span>DIFFICULTY</span>
                        <span className="text-white font-extrabold">
                          {selectedProject.id === 'helix-care' ? 94 : selectedProject.id === 'resido-property' ? 88 : selectedProject.id === 'khata-ledger' ? 85 : 80}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-rose-500 rounded-full transition-all duration-1000" 
                          style={{ width: `${selectedProject.id === 'helix-care' ? 94 : selectedProject.id === 'resido-property' ? 88 : selectedProject.id === 'khata-ledger' ? 85 : 80}%` }} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center text-[8.5px] font-mono mb-1 text-slate-400">
                        <span>IMPACT LEVEL</span>
                        <span className="text-emerald-400 font-extrabold">
                          {selectedProject.id === 'helix-care' ? 98 : selectedProject.id === 'resido-property' ? 92 : selectedProject.id === 'khata-ledger' ? 96 : 88}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-400 rounded-full transition-all duration-1000" 
                          style={{ width: `${selectedProject.id === 'helix-care' ? 98 : selectedProject.id === 'resido-property' ? 92 : selectedProject.id === 'khata-ledger' ? 96 : 88}%` }} 
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[8.5px] font-mono mb-1 text-slate-400">
                        <span>COMPLEXITY</span>
                        <span className="text-amber-400 font-extrabold">
                          {selectedProject.id === 'helix-care' ? 96 : selectedProject.id === 'resido-property' ? 85 : selectedProject.id === 'khata-ledger' ? 90 : 78}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full transition-all duration-1000" 
                          style={{ width: `${selectedProject.id === 'helix-care' ? 96 : selectedProject.id === 'resido-property' ? 85 : selectedProject.id === 'khata-ledger' ? 90 : 78}%` }} 
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[8.5px] font-mono mb-1 text-slate-400">
                        <span>SCALE RATING</span>
                        <span className="text-cyan-400 font-extrabold">
                          {selectedProject.id === 'helix-care' ? 95 : selectedProject.id === 'resido-property' ? 87 : selectedProject.id === 'khata-ledger' ? 94 : 85}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-400 rounded-full transition-all duration-1000" 
                          style={{ width: `${selectedProject.id === 'helix-care' ? 95 : selectedProject.id === 'resido-property' ? 87 : selectedProject.id === 'khata-ledger' ? 94 : 85}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenges & Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-white/10 bg-black/10 p-3 rounded-xl">
                    <span className="text-[9px] uppercase font-bold text-rose-400 block mb-1">Key Challenges</span>
                    <p className="text-[11px] text-white/60 leading-relaxed">{selectedProject.challenges}</p>
                  </div>
                  <div className="border border-white/10 bg-black/10 p-3 rounded-xl">
                    <span className="text-[9px] uppercase font-bold text-emerald-400 block mb-1">Measurable Outcome</span>
                    <p className="text-[11px] text-white/60 leading-relaxed">{selectedProject.results}</p>
                  </div>
                </div>

                {/* Specs */}
                <div className="bg-black/30 p-4 rounded-xl border border-white/10 grid grid-cols-3 gap-2 text-center">
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-base font-bold text-[var(--accent)]">{m.value}</div>
                      <div className="text-[9px] uppercase text-white/50 tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 select-none">
                {selectedProject.demoUrl && (
                  <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="flex-1 py-3 text-center bg-[var(--accent)] text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    Visit live project <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex-1 py-3 text-center bg-black/40 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:border-[var(--accent)] transition-colors flex items-center justify-center gap-2">
                    Analyze code <Github className="w-4 h-4 text-[var(--accent)]" />
                  </a>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CMD PALETTE DIALOG SEARCH --- */}
      <SpotlightOverlay
        isOpen={isCmdPaletteOpen}
        onClose={() => setIsCmdPaletteOpen(false)}
        onThemeChange={setTheme}
        onLayoutChange={setLayout}
        onInspectProject={inspectProject}
        onChatPrompt={triggerAIPortfolioQuery}
        onDownloadResume={printCV}
        onContactTrigger={() => {
          triggerAIPortfolioQuery("How can we reach Dharmesh directly? Provide email channels.");
        }}
        playBeep={playBeep}
        currentTheme={theme}
        currentLayout={layout}
      />

      {/* Floating Download CV Glass Notification Overlay */}
      <AnimatePresence>
        {cvDownloadState !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[3500] max-w-sm w-80 bg-black/85 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-3 font-sans text-white overflow-hidden"
          >
            {/* Ambient lighting inside notification */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-[var(--accent)]/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${cvDownloadState === 'success' ? 'text-emerald-400 border-emerald-500/30' : 'text-[var(--accent)] border-[var(--accent)]/30'}`}>
                  {cvDownloadState === 'downloading' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <CheckCircle className="w-4 h-4 animate-bounce" />
                  )}
                </div>
                <div>
                  <h4 className="text-[11px] uppercase font-black tracking-widest text-white leading-none">
                    {cvDownloadState === 'downloading' ? 'Downloading CV' : 'Download Complete'}
                  </h4>
                  <p className="text-[9px] text-white/50 tracking-wide font-mono mt-1.5 truncate max-w-[170px]">
                    Dharmesh_Ahir_Resume.pdf
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold font-mono text-[var(--accent)]">
                {cvDownloadState === 'downloading' ? `${cvProgress}%` : 'READY'}
              </span>
            </div>

            {/* Simulated interactive linear progression track */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--accent)] to-indigo-500 rounded-full transition-all duration-155"
                style={{ width: `${cvProgress}%` }}
              />
            </div>

            <div className="text-[8px] text-white/40 font-mono flex items-center justify-between">
              <span>Channel: SECURED (SSL)</span>
              <span>Rate: ~1.2 MB/s</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
   );
 }
