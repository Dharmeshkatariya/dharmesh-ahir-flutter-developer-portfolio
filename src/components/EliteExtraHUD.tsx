import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Mail, 
  Send, 
  Youtube, 
  FileText, 
  MessageCircle, 
  Calendar, 
  Download, 
  Briefcase, 
  Clock, 
  Sparkles, 
  Sliders, 
  ChevronRight, 
  ChevronLeft,
  X, 
  Award, 
  ArrowUp, 
  Compass, 
  UserPlus, 
  CheckCircle, 
  Cpu, 
  Globe, 
  BookOpen, 
  Info,
  Layers,
  Zap,
  Users
} from 'lucide-react';

// --- PREMIUM HUD SYNTHESIZER ---
const playEliteSound = (type: 'tick' | 'click' | 'success' | 'hover' | 'open') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'tick') {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'hover') {
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      gain.gain.setValueAtTime(0.005, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'open') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    // Audio engine fallback
  }
};

interface SocialItem {
  id: string;
  name: string;
  username: string;
  status: string;
  href: string;
  icon: React.ComponentType<any>;
  glowColor: string;
  hide?: boolean;
}

const SOCIAL_ITEMS: SocialItem[] = [
  { id: 'github', name: 'GitHub', username: '@Dharmeshkatariya', status: 'Open Source Active', href: 'https://github.com/Dharmeshkatariya', icon: Github, glowColor: 'rgba(0, 229, 255, 0.4)' },
  { id: 'linkedin', name: 'LinkedIn', username: 'dharmesh-katariya-63268b20b', status: 'Professional Core', href: 'https://linkedin.com/in/dharmesh-katariya-63268b20b', icon: Linkedin, glowColor: 'rgba(56, 189, 248, 0.4)' },
  { id: 'gmail', name: 'Gmail', username: 'katariyadharmesh658@gmail.com', status: 'Official Enquiries', href: 'mailto:katariyadharmesh658@gmail.com', icon: Mail, glowColor: 'rgba(239, 68, 68, 0.4)' },
  { id: 'whatsapp', name: 'WhatsApp', username: '+91 6354464371', status: 'Instant Direct Sync', href: 'https://wa.me/916354464371', icon: MessageCircle, glowColor: 'rgba(34, 197, 94, 0.4)' },
  { id: 'twitter', name: 'X / Twitter', username: '@dharmesh_ahir', status: 'Tech Updates', href: 'https://twitter.com/dharmesh_ahir', icon: Twitter, glowColor: 'rgba(244, 63, 94, 0.4)', hide: true },
  { id: 'telegram', name: 'Telegram', username: '@dharmesh_ahir', status: 'Low Latency Ping', href: 'https://t.me/dharmesh_ahir', icon: Send, glowColor: 'rgba(14, 165, 233, 0.4)', hide: true },
  { id: 'discord', name: 'Discord', username: 'dharmesh_ahir', status: 'Developer Guild', href: 'https://discord.com', icon: Users, glowColor: 'rgba(139, 92, 246, 0.4)', hide: true },
  { id: 'youtube', name: 'YouTube', username: '@dharmesh_ahir', status: 'Coding Stream Casts', href: 'https://youtube.com', icon: Youtube, glowColor: 'rgba(244, 63, 94, 0.4)', hide: true },
  { id: 'medium', name: 'Medium', username: '@dharmesh_ahir', status: 'Architecture Logs', href: 'https://medium.com', icon: BookOpen, glowColor: 'rgba(16, 185, 129, 0.4)', hide: true },
  { id: 'instagram', name: 'Instagram', username: '@dharmesh._.ahir', status: 'Moments & Stories', href: 'https://instagram.com/dharmesh._.ahir', icon: Instagram, glowColor: 'rgba(236, 72, 153, 0.4)', hide: true },
];

interface Achievement {
  id: string;
  title: string;
  group: string;
  details: string;
  unlocked: boolean;
  score: number;
  glow: string;
}

const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: 'flutter', title: 'Flutter Expert', group: 'expert.dart.flutter', details: 'Architected 5+ production scale hybrid structures with custom native bridges', unlocked: true, score: 98, glow: 'from-blue-500 to-cyan-400' },
  { id: 'firebase', title: 'Firebase Specialist', group: 'cloud.firebase.db', details: 'Designed security rule scopes, transaction buffers and real-time ledger layers', unlocked: true, score: 95, glow: 'from-orange-500 to-amber-400' },
  { id: 'ai', title: 'AI Builder', group: 'model.agent.ai', details: 'Engineered server-side state-safe LLM bridges and multidimensional UI models', unlocked: true, score: 90, glow: 'from-indigo-500 to-purple-400' },
  { id: 'arch', title: 'Architecture Engineer', group: 'clean.architecture', details: 'Configured unidirectional streams, reactive caches and low-latency decodes', unlocked: true, score: 94, glow: 'from-teal-500 to-emerald-400' },
  { id: 'os', title: 'Open Source Contributor', group: 'git.open.source', details: 'Active core libraries, diagnostic scripts and system extensions published', unlocked: true, score: 88, glow: 'from-pink-500 to-rose-400' },
];

const GITHUB_SQUARES = Array.from({ length: 98 }, (_, i) => {
  const intensities = [0, 1, 1, 2, 2, 3, 3, 4];
  const intensity = intensities[(i * 3 + Math.floor(i / 7)) % intensities.length];
  const date = new Date();
  date.setDate(date.getDate() - (97 - i));
  const commits = intensity * 2 + (intensity > 0 ? Math.floor(Math.random() * 3) : 0);
  return { id: i, intensity, date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), commits };
});

const getLucideIcon = (name: string) => {
  const map: { [key: string]: React.ComponentType<any> } = {
    Github: Github,
    Linkedin: Linkedin,
    Instagram: Instagram,
    Twitter: Twitter,
    Mail: Mail,
    Send: Send,
    Youtube: Youtube,
    FileText: FileText,
    MessageCircle: MessageCircle,
    Calendar: Calendar,
    Download: Download,
    Briefcase: Briefcase,
    Clock: Clock,
    Sparkles: Sparkles,
    Sliders: Sliders,
    ChevronRight: ChevronRight,
    ChevronLeft: ChevronLeft,
    X: X,
    Award: Award,
    ArrowUp: ArrowUp,
    Compass: Compass,
    UserPlus: UserPlus,
    CheckCircle: CheckCircle,
    Cpu: Cpu,
    Globe: Globe,
    BookOpen: BookOpen,
    Info: Info,
    Layers: Layers,
    Zap: Zap,
    Users: Users
  };
  return map[name] || Globe;
};

export interface EliteExtraHUDProps {
  profile?: {
    name?: string;
    title?: string;
    email?: string;
    mobile?: string;
    github?: string;
    linkedin?: string;
    bio?: string;
  };
  socials?: Array<{
    id: string;
    name: string;
    username: string;
    status: string;
    href: string;
    iconName: string;
    glowColor: string;
    hide?: boolean;
  }>;
}

export const EliteExtraHUD: React.FC<EliteExtraHUDProps> = ({ profile: propProfile, socials: propSocials }) => {
  // Stateful profile details and socials synced with backend db.json in real time
  const [profile, setProfile] = useState<any>({
    name: 'Dharmesh Ahir',
    title: 'Flutter Developer',
    email: 'katariyadharmesh658@gmail.com',
    mobile: '+91 6354464371',
    github: 'https://github.com/Dharmeshkatariya',
    linkedin: 'https://linkedin.com/in/dharmesh-ahir',
  });
  
  const [socials, setSocials] = useState<SocialItem[]>(SOCIAL_ITEMS);

  useEffect(() => {
    if (propProfile) {
      setProfile(propProfile);
    }
  }, [propProfile]);

  useEffect(() => {
    if (propSocials && propSocials.length > 0) {
      const mapped = propSocials.map(item => ({
        id: item.id,
        name: item.name,
        username: item.username,
        status: item.status,
        href: item.href,
        icon: getLucideIcon(item.iconName),
        glowColor: item.glowColor,
        hide: item.hide
      }));
      setSocials(mapped);
    }
  }, [propSocials]);

  // Secondary dynamic loading safeguards
  useEffect(() => {
    if (!propProfile || !propSocials) {
      fetch('/api/profile')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.name) setProfile(data);
        })
        .catch(err => console.warn("Fallback direct profile load:", err));

      fetch('/api/socials')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const mapped = data.map(item => ({
              id: item.id,
              name: item.name,
              username: item.username,
              status: item.status,
              href: item.href,
              icon: getLucideIcon(item.iconName),
              glowColor: item.glowColor,
              hide: item.hide
            }));
            setSocials(mapped);
          }
        })
        .catch(err => console.warn("Fallback direct socials load:", err));
    }
  }, [propProfile, propSocials]);

  // Configured dock and sub-managers
  const [dockExpanded, setDockExpanded] = useState(true);
  const [activeHoveredDockIdx, setActiveHoveredDockIdx] = useState<number | null>(null);
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  
  // Interactive menus registered within HUD Manager
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [smartActionsOpen, setSmartActionsOpen] = useState(false);

  // Scroll tracking and triggers
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showRocket, setShowRocket] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Scheduler popup trigger & configuration states
  const [showScheduler, setShowScheduler] = useState(false);
  const [schedulerStep, setSchedulerStep] = useState(1);
  const [schedulerDate, setSchedulerDate] = useState('2026-06-05');
  const [schedulerTime, setSchedulerTime] = useState('14:30');
  const [schedulerEmail, setSchedulerEmail] = useState('');
  const [schedulerError, setSchedulerError] = useState('');
  
  const [liveClock, setLiveClock] = useState('');

  const statuses = [
    { label: 'Available for Projects', color: 'bg-emerald-500' },
    { label: 'In Deep Work Mode', color: 'bg-amber-400' },
    { label: 'Building AI Systems', color: 'bg-cyan-400' },
    { label: 'Currently Offline', color: 'bg-rose-500' }
  ];

  // Tick clock and manage status cycles
  useEffect(() => {
    const statusTImer = setInterval(() => {
      setActiveStatusIdx((prev) => (prev + 1) % statuses.length);
    }, 15000);

    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLiveClock(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const clockTimer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(statusTImer);
      clearInterval(clockTimer);
    };
  }, []);

  // Sync scroll coordinates for Back-to-Top and timelines
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);
      setShowRocket(winScroll > 600);

      const sections = ['hero', 'about', 'laboratory', 'portfolio', 'blog', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAnchor = (id: string) => {
    playEliteSound('click');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const notifyDirectTrigger = (eventName: string) => {
    playEliteSound('open');
    window.dispatchEvent(new Event(eventName));
  };

  return (
    <>
      {/* 1. SCROLL PROGRESS DECK */}
      <div className="fixed top-0 left-0 right-0 h-[4px] z-[999] pointer-events-none origin-left overflow-hidden select-none">
        <div 
          className="h-full bg-gradient-to-r from-[var(--accent)] via-purple-500 to-emerald-400 transition-all duration-75 shadow-[0_2px_10px_var(--accent)]"
          style={{ width: `${scrollProgress}%` }}
        />
        <div 
          className="absolute h-full w-4 bg-white/60 blur-[3px]"
          style={{ left: `calc(${scrollProgress}% - 8px)` }}
        />
      </div>

      {/* 2. MILESTONE RAIL SCROLLER */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[150] hidden xl:flex flex-col gap-4 items-end pointer-events-none">
        {[
          { id: 'hero', label: 'Launchdeck', desc: 'Core Matrix' },
          { id: 'about', label: 'Engineering CV', desc: 'Tech Experience' },
          { id: 'laboratory', label: 'Bespoke Labs', desc: 'Precision HUDs' },
          { id: 'portfolio', label: 'Showcase Nodes', desc: 'Active Solutions' },
          { id: 'blog', label: 'System Logs', desc: 'Tech Insights' },
          { id: 'contact', label: 'Secure Signal', desc: 'Hub Gateway' }
        ].map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <div 
              key={sec.id} 
              className="flex items-center gap-3 group/timeline cursor-pointer pointer-events-auto select-none"
              onClick={() => scrollToAnchor(sec.id)}
              onMouseEnter={() => playEliteSound('hover')}
            >
              <div className="opacity-0 group-hover/timeline:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/timeline:translate-x-0 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex flex-col items-end shadow-xl pointer-events-none">
                <span className="text-[10px] font-mono font-black uppercase text-[var(--accent)] tracking-widest">{sec.label}</span>
                <span className="text-[8px] font-mono text-white/50">{sec.desc}</span>
              </div>
              <div className="relative flex items-center justify-center w-6 h-6">
                <div 
                  className={`rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'w-3 h-3 bg-[var(--accent)] shadow-[0_0_12px_var(--accent)] ring-4 ring-[var(--accent)]/20' 
                      : 'w-1.5 h-1.5 bg-white/20 group-hover/timeline:bg-white/60 group-hover/timeline:scale-125'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. LENS FLARES & MOTION ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-30 select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10%" cy="20%" r="2" fill="var(--accent)" opacity="0.3" className="animate-pulse" style={{ animationDuration: '6s' }} />
          <circle cx="85%" cy="15%" r="1" fill="#fff" opacity="0.4" className="animate-pulse" style={{ animationDuration: '4s' }} />
          <circle cx="45%" cy="80%" r="3" fill="var(--accent)" opacity="0.2" className="animate-pulse" style={{ animationDuration: '9s' }} />
        </svg>
        <div className="absolute top-[8%] left-[12%] w-[120px] h-[120px] rounded-full bg-[var(--accent)]/15 blur-[50px]" />
      </div>

      {/* 4. PREMIUM SOCIAL COMMAND DOCK 3.0 (Centered, unified, glass panel, reflections & sparkles) */}
      <div className="fixed bottom-6 left-1/2 -track-x-1/2 -translate-x-1/2 z-[1000] max-w-[95vw] pointer-events-auto select-none">
        <div className="flex flex-col items-center gap-2.5">
          
          <AnimatePresence>
            {dockExpanded && (
              <motion.div 
                initial={{ opacity: 0, y: 35, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 35, scale: 0.92 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex items-center gap-1 xl:gap-2 bg-black/75 border border-white/10 backdrop-blur-3xl px-3.5 xl:px-5 py-2.5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,229,255,0.06)] relative overflow-visible"
              >
                {/* Live Online Status Beacon Tag */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-black/90 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="text-[7.5px] font-mono font-black text-emerald-400 uppercase tracking-widest leading-none">LIVE RESPONSE ENABLED</span>
                </div>

                {/* A. SOCIAL PLATFORMS */}
                <div className="flex items-end gap-1.5 md:gap-2.5 pb-1">
                  {socials.filter(item => !item.hide).map((item, idx) => {
                    const Icon = item.icon;
                    // Elastic scale spring modifier
                    let scaleValue = 1;
                    let yDelta = 0;
                    if (activeHoveredDockIdx !== null) {
                      const distance = Math.abs(idx - activeHoveredDockIdx);
                      if (distance === 0) {
                        scaleValue = 1.35;
                        yDelta = -10;
                      } else if (distance === 1) {
                        scaleValue = 1.18;
                        yDelta = -4;
                      }
                    }

                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex flex-col items-center group/item hover:no-underline"
                        onClick={() => playEliteSound('click')}
                        onMouseEnter={() => {
                          setActiveHoveredDockIdx(idx);
                          playEliteSound('hover');
                        }}
                        onMouseLeave={() => setActiveHoveredDockIdx(null)}
                        style={{
                          transform: `scale(${scaleValue}) translateY(${yDelta}px)`,
                          transformOrigin: 'bottom center',
                          transition: 'transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        }}
                      >
                        {/* Premium Glass Tooltip System 3.0 (Responsive to Active Theme Colors) */}
                        <div className="absolute bottom-[58px] left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-3 group-hover/item:translate-y-0 w-44 z-[1010]">
                          <div className="bg-[var(--card)] backdrop-blur-2xl border border-[var(--border)] p-2.5 rounded-xl text-center relative shadow-2xl">
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--card)] border-b border-r border-[var(--border)] rotate-45" />
                            <p className="text-[10px] font-sans font-black uppercase text-[var(--accent)] tracking-widest">{item.name}</p>
                            <p className="text-[8.5px] font-mono text-[var(--text-main)] opacity-80 truncate">{item.username}</p>
                            <div className="h-[1px] bg-[var(--border)] my-1" />
                            <p className="text-[8px] font-mono text-emerald-400 font-bold flex items-center justify-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              {item.status}
                            </p>
                          </div>
                        </div>

                        {/* Interactive floating sparks / hover particles */}
                        {activeHoveredDockIdx === idx && (
                          <div className="absolute inset-0 pointer-events-none -top-4 overflow-visible">
                            <span className="absolute w-1 h-1 bg-[var(--accent)] rounded-full left-1 animate-bounce opacity-80" style={{ animationDelay: '0ms' }} />
                            <span className="absolute w-1 h-1 bg-white rounded-full right-1 animate-bounce opacity-80" style={{ animationDelay: '100ms' }} />
                            <span className="absolute w-0.5 h-0.5 bg-[var(--accent)] rounded-full left-1/2 animate-ping" />
                          </div>
                        )}

                        {/* Glass Icon Vessel */}
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.09] transition-all relative overflow-hidden shrink-0"
                          style={{
                            boxShadow: activeHoveredDockIdx === idx ? `0 0 16px ${item.glowColor}` : 'none'
                          }}
                        >
                          <Icon 
                            className="w-5 h-5 text-white/75 group-hover/item:text-white transition-colors"
                            style={{
                              color: activeHoveredDockIdx === idx ? 'var(--accent)' : 'inherit'
                            }}
                          />
                        </div>

                        {/* Traditional MacOS Icon Glass Reflection Layer */}
                        <div className="absolute top-[44px] w-8 h-4 opacity-15 pointer-events-none scale-y-[-1] overflow-hidden select-none mask-gradient transition-opacity group-hover/item:opacity-25">
                          <Icon className="w-5 h-5 text-white/40 mx-auto" />
                        </div>

                        {/* Micro active dot indicator */}
                        <div className="w-1 h-1 rounded-full bg-white/25 mt-1 transition-all group-hover/item:bg-[var(--accent)] group-hover/item:scale-125" />
                      </a>
                    );
                  })}
                </div>

                {/* B. SLATE VERTICAL DIVIDER */}
                <div className="w-[1px] h-8 bg-white/10 self-center mx-1.5 md:mx-3 shrink-0" />

                {/* C. UNIFIED SYSTEM TRIGGERS (Smart Action Center, Active Panels, AI Copilot, Config Studio) */}
                <div className="flex items-center gap-1.5 md:gap-2.5">
                  
                  {/* C1. SMART ACTION CENTER TRIGGER */}
                  <div className="relative group/actiontrigger">
                    <button
                      onClick={() => {
                        setSmartActionsOpen(!smartActionsOpen);
                        setDashboardOpen(false);
                        playEliteSound('open');
                      }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        smartActionsOpen 
                          ? 'bg-[var(--accent)] border-[var(--accent)] text-black' 
                          : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20'
                      }`}
                    >
                      <Zap className="w-5 h-5" />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2 opacity-0 group-hover/actiontrigger:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-3 group-hover/actiontrigger:translate-y-0 w-36 text-center">
                      <div className="bg-black/95 backdrop-blur-md border border-white/10 p-2 rounded-xl text-[8px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest relative">
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black border-b border-r border-white/5 rotate-45" />
                        Smart Actions Center
                      </div>
                    </div>
                  </div>

                  {/* C2. DEPLOYMENT MATRIX / GITHUB PORTAL & ACCUMULATOR */}
                  <div className="relative group/synthesi">
                    <button
                      onClick={() => {
                        setDashboardOpen(!dashboardOpen);
                        setSmartActionsOpen(false);
                        playEliteSound('open');
                      }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        dashboardOpen 
                          ? 'bg-[var(--accent)] border-[var(--accent)] text-black' 
                          : 'bg-blue-500/10 border-blue-500/25 text-blue-400 hover:bg-blue-500/20'
                      }`}
                    >
                      <Award className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2 opacity-0 group-hover/synthesi:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-3 group-hover/synthesi:translate-y-0 w-36 text-center">
                      <div className="bg-black/95 backdrop-blur-md border border-white/10 p-2 rounded-xl text-[8px] font-mono text-blue-400 font-extrabold uppercase tracking-widest relative">
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black border-b border-r border-white/5 rotate-45" />
                        Developer Badges Sync
                      </div>
                    </div>
                  </div>

                  {/* C3. AI CHAT COMPANION SHORT-LINK */}
                  <div className="relative group/aicop">
                    <button
                      onClick={() => notifyDirectTrigger('toggle_ai_chat')}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 hover:bg-cyan-400/20 transition-all"
                    >
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </button>
                    <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2 opacity-0 group-hover/aicop:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-3 group-hover/aicop:translate-y-0 w-32 text-center">
                      <div className="bg-black/95 backdrop-blur-md border border-white/10 p-2 rounded-xl text-[8px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest relative">
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black border-b border-r border-white/5 rotate-45" />
                        AI Representative
                      </div>
                    </div>
                  </div>

                  {/* C4. CONFIG STUDIO DRAW SLIDER */}
                  <div className="relative group/configst">
                    <button
                      onClick={() => notifyDirectTrigger('toggle_config_studio')}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/10 border border-purple-500/25 text-purple-400 hover:bg-purple-500/20 transition-all"
                    >
                      <Sliders className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2 opacity-0 group-hover/configst:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-3 group-hover/configst:translate-y-0 w-32 text-center">
                      <div className="bg-black/95 backdrop-blur-md border border-white/10 p-2 rounded-xl text-[8px] font-mono text-purple-400 font-extrabold uppercase tracking-widest relative">
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black border-b border-r border-white/5 rotate-45" />
                        Properties Config
                      </div>
                    </div>
                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* D. MASTER TOGGLE COMPACT INTERFACE BAR */}
          <button
            onClick={() => {
              setDockExpanded(!dockExpanded);
              if (dockExpanded) {
                setSmartActionsOpen(false);
                setDashboardOpen(false);
              }
              playEliteSound('open');
            }}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-black/85 backdrop-blur-xl hover:border-white/25 transition-all text-[8px] font-mono text-white/50 hover:text-white tracking-widest uppercase flex items-center gap-1.5 shadow-md cursor-pointer pointer-events-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            {dockExpanded ? 'COMPACT MASTER DECK' : 'EXPAND OPERATIONAL RADAR'}
          </button>
          
        </div>
      </div>

      {/* 5. UNIFIED SMART ACTION DRAWER / CONTROL CENTER (Integrated right above Social Dock) */}
      <AnimatePresence>
        {smartActionsOpen && (
          <div className="fixed inset-x-0 bottom-32 z-[900] flex justify-center p-4 pointer-events-none select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full max-w-lg bg-black/95 border border-white/10 backdrop-blur-3xl rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_20px_rgba(0,229,255,0.05)] text-white space-y-4 pointer-events-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4.5 h-4.5 text-emerald-400" />
                  <div>
                    <h4 className="text-xs font-mono font-black uppercase tracking-wider text-white">Unified Action Hub</h4>
                    <p className="text-[8px] font-mono text-white/40">Secure signals, file routes & schedules</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setSmartActionsOpen(false); playEliteSound('click'); }}
                  className="p-1 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* GRID OF SECURE COMMANDS (Premium 7 Action Suite) */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 pt-1">
                
                {/* Email Sync */}
                <a
                  href={`mailto:${profile.email || 'katariyadharmesh658@gmail.com'}`}
                  className="flex flex-col items-center justify-center text-center p-3.5 bg-white/[0.02] border border-white/5 hover:border-red-500/30 rounded-xl transition-all hover:bg-white/[0.04] group relative overflow-hidden"
                  onClick={() => playEliteSound('click')}
                >
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-center w-full">
                    <span className="block text-[9.5px] font-black uppercase text-white tracking-widest">Connect Email</span>
                    <span className="text-[7.5px] font-mono text-white/40 truncate block max-w-full px-1">{profile.email || 'katariyadharmesh658@gmail.com'}</span>
                  </div>
                  <div className="absolute inset-0 bg-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </a>

                {/* WhatsApp Secure Signal */}
                <a
                  href={`https://wa.me/${profile.mobile?.replace(/[^0-9]/g, '') || '916354464371'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center text-center p-3.5 bg-white/[0.02] border border-white/5 hover:border-green-500/30 rounded-xl transition-all hover:bg-white/[0.04] group relative overflow-hidden"
                  onClick={() => playEliteSound('click')}
                >
                  <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-center w-full">
                    <span className="block text-[9.5px] font-black uppercase text-white tracking-widest">WhatsApp Direct</span>
                    <span className="text-[7.5px] font-mono text-green-400 font-bold block truncate max-w-full px-1">{profile.mobile || '+91 6354464371'}</span>
                  </div>
                  <div className="absolute inset-0 bg-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </a>

                {/* LinkedIn Core */}
                <a
                  href={profile.linkedin || 'https://linkedin.com/in/dharmesh-ahir'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center text-center p-3.5 bg-white/[0.02] border border-white/5 hover:border-blue-500/30 rounded-xl transition-all hover:bg-white/[0.04] group relative overflow-hidden"
                  onClick={() => playEliteSound('click')}
                >
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-center w-full">
                    <span className="block text-[9.5px] font-black uppercase text-white tracking-widest">LinkedIn Synced</span>
                    <span className="text-[7.5px] font-mono text-white/40 truncate block max-w-full px-1">
                      {profile.linkedin?.split('/').pop() || 'dharmesh-ahir'}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </a>

                {/* GitHub Node */}
                <a
                  href={profile.github || 'https://github.com/Dharmeshkatariya'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center text-center p-3.5 bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 rounded-xl transition-all hover:bg-white/[0.04] group relative overflow-hidden"
                  onClick={() => playEliteSound('click')}
                >
                  <div className="p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-center w-full">
                    <span className="block text-[9.5px] font-black uppercase text-white tracking-widest">GitHub Profile</span>
                    <span className="text-[7.5px] font-mono text-white/40 truncate block max-w-full px-1">
                      {profile.github?.split('/').pop() || 'Dharmeshkatariya'}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </a>

                {/* Schedule Sync Call */}
                <button
                  onClick={() => {
                    setShowScheduler(true);
                    setSchedulerStep(1);
                    setSmartActionsOpen(false);
                    playEliteSound('open');
                  }}
                  className="flex flex-col items-center justify-center text-center p-3.5 bg-white/[0.02] border border-white/5 hover:border-yellow-500/30 rounded-xl transition-all hover:bg-white/[0.04] group relative overflow-hidden"
                >
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="block text-[9.5px] font-black uppercase text-white tracking-widest">Schedule Meeting</span>
                    <span className="text-[7.5px] font-mono text-white/40 block">Lock IST Calendar</span>
                  </div>
                  <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </button>

                {/* Download CV File */}
                <a
                  href="/api/cv/download"
                  download="Dharmesh_Ahir_Flutter_Resume.pdf"
                  onClick={() => {
                    setSmartActionsOpen(false);
                    playEliteSound('success');
                  }}
                  className="flex flex-col items-center justify-center text-center p-3.5 bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 rounded-xl transition-all hover:bg-white/[0.04] group relative overflow-hidden"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="block text-[9.5px] font-black uppercase text-white tracking-widest">Download Resume</span>
                    <span className="text-[7.5px] font-mono text-white/40 block">PDF Stream CV File</span>
                  </div>
                  <div className="absolute inset-0 bg-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </a>

                {/* Export Portfolio PDF */}
                <a
                  href="/api/cv/download"
                  download="Dharmesh_Ahir_Flutter_Resume.pdf"
                  onClick={() => {
                    playEliteSound('success');
                  }}
                  className="col-span-2 md:col-span-3 flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--accent)]/10 to-purple-500/10 border border-[var(--accent)]/20 hover:border-[var(--accent)]/50 p-3 rounded-xl transition-all hover:bg-white/[0.03] group relative overflow-hidden"
                >
                  <div className="p-2 rounded-lg bg-[var(--accent)]/25 text-[var(--accent)] group-hover:scale-110 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-black uppercase text-white tracking-widest">Download Static Resume PDF</span>
                    <span className="text-[7.5px] font-mono text-white/50 block">Instant access to primary CV dossier</span>
                  </div>
                </a>

              </div>
              
              <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[7.5px] font-mono text-white/30 tracking-widest uppercase">
                <span>SYSTEM DISPATCH PROTOCOL SUCCESS</span>
                <span>V2.0 STABLE SECURE LAYER</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. DYNAMIC BACKEND PORTAL & STATS DASHBOARD (Unified right above Social Dock) */}
      <AnimatePresence>
        {dashboardOpen && (
          <div className="fixed inset-x-0 bottom-32 z-[900] flex justify-center p-4 pointer-events-none select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full max-w-lg bg-black/95 border border-white/10 backdrop-blur-3xl rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_20px_rgba(0,229,255,0.05)] text-white space-y-4 max-h-[62vh] overflow-y-auto custom-scrollbar pointer-events-auto"
            >
              {/* Header metrics */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4.5 h-4.5 text-blue-400" />
                  <div>
                    <h4 className="text-xs font-mono font-black uppercase tracking-wider text-white">Active Developer Matrix</h4>
                    <p className="text-[8px] font-mono text-white/40">Verified stats & cloud engine telemetry</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setDashboardOpen(false); playEliteSound('click'); }}
                  className="p-1 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Real time indicators */}
              <div className="bg-[#030712] border border-white/5 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Surat Local Time</p>
                  <p className="text-[13px] font-mono font-black text-cyan-400">{liveClock || '12:00:00 AM'}</p>
                </div>
                {/* State cycling indicator */}
                <div 
                  onClick={() => {
                    setActiveStatusIdx((prev) => (prev + 1) % statuses.length);
                    playEliteSound('tick');
                  }}
                  className="bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-all select-none"
                >
                  <span className={`w-2 h-2 rounded-full ${statuses[activeStatusIdx].color} animate-pulse relative`}>
                    <span className={`absolute -inset-0.5 rounded-full ${statuses[activeStatusIdx].color} animate-ping opacity-60`} />
                  </span>
                  <span className="text-[9px] font-mono font-black uppercase text-white/80">{statuses[activeStatusIdx].label}</span>
                </div>
              </div>

              {/* CODE COMMITS HEATMAP */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                  <span>GitHub Contributions Ledger</span>
                  <span className="text-[8.5px] text-[var(--accent)]">1,452 Commits this year</span>
                </div>
                <div className="bg-[#01050c]/60 border border-white/5 p-3 rounded-xl space-y-2">
                  <div className="grid grid-cols-14 gap-0.5 md:gap-1">
                    {GITHUB_SQUARES.map((sq) => (
                      <div
                        key={sq.id}
                        className="aspect-square rounded-[1.5px] transition-all hover:scale-125 relative group/gitsq cursor-crosshair"
                        style={{
                          backgroundColor: sq.intensity === 4 ? 'var(--accent)' : sq.intensity === 3 ? 'rgb(16 185 129)' : sq.intensity === 2 ? 'rgb(4 120 87)' : sq.intensity === 1 ? 'rgb(6 95 70)' : 'rgba(255,255,255,0.04)'
                        }}
                        onMouseEnter={() => playEliteSound('hover')}
                      >
                        <div className="absolute bottom-6 left-1/2 -track-x-1/2 -translate-x-1/2 opacity-0 group-hover/gitsq:opacity-100 transition-opacity bg-black border border-white/10 px-2 py-1 rounded text-[7px] font-mono text-white z-50 pointer-events-none whitespace-nowrap">
                          {sq.commits} commits on {sq.date}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary grid stats */}
                  <div className="grid grid-cols-4 gap-1 pt-1.5 font-mono text-center text-xs leading-none">
                    <div className="bg-white/[0.02] border border-white/5 p-1 rounded">
                      <span className="block font-black text-[var(--accent)] text-[11px]">24</span>
                      <span className="text-[7px] text-white/30 uppercase tracking-widest">Repos</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-1 rounded">
                      <span className="block font-black text-yellow-400 text-[11px]">128</span>
                      <span className="text-[7px] text-white/30 uppercase tracking-widest">Stars</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-1 rounded">
                      <span className="block font-black text-purple-400 text-[11px]">180</span>
                      <span className="text-[7px] text-white/30 uppercase tracking-widest">Followers</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-1 rounded">
                      <span className="block font-black text-green-400 text-[11px]">99.8%</span>
                      <span className="text-[7px] text-white/30 uppercase tracking-widest">Uptime</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING VERIFIED CREDENTIAL PANEL */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-black uppercase text-zinc-400 tracking-widest block">Credentials Shelf</span>
                <div className="grid gap-2">
                  {ACHIEVEMENTS_DATA.map((ach) => (
                    <div 
                      key={ach.id}
                      className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-2 rounded-xl group/badge hover:border-blue-500/20 transition-all"
                    >
                      <div className={`p-1.5 rounded bg-gradient-to-br ${ach.glow} text-black font-bold text-center flex shrink-0`}>
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] font-black text-white group-hover/badge:text-[var(--accent)] transition-colors">{ach.title}</span>
                          <span className="text-[7px] text-white/30 font-mono bg-white/5 px-1 rounded truncate max-w-[80px]">{ach.group}</span>
                        </div>
                        <p className="text-[8px] text-white/55 truncate">{ach.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. PRESET INTERACTIVE SCHEDULER POPUP MODAL */}
      <AnimatePresence>
        {showScheduler && (
          <div className="fixed inset-0 z-[2030] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setShowScheduler(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-md bg-[#04080c] border border-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[var(--accent)]" />
                  <div>
                    <h3 className="text-xs font-mono font-black uppercase text-white tracking-widest">Schedule Sync Session</h3>
                    <p className="text-[8px] font-mono text-white/40">Surat, IN Live Sync Gateway</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowScheduler(false)}
                  className="p-1 hover:bg-white/5 border border-white/10 hover:border-[var(--accent)] text-white/40 hover:text-white rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {schedulerStep === 1 ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-white/50">Choose Focus</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['15m Quick Catchup', '30m Tech Alignment', '60m Architecture Jam'].map((slot, i) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => playEliteSound('tick')}
                          className="p-2.5 rounded-lg border border-white/5 text-[9.5px] bg-white/[0.02] text-left hover:border-[var(--accent)]/30 hover:bg-white/[0.04] transition-all"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-white/50">Select Date</label>
                      <input 
                        type="date" 
                        value={schedulerDate}
                        onChange={(e) => setSchedulerDate(e.target.value)}
                        className="w-full bg-black/60 border border-white/5 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-white/50">Select Time (IST)</label>
                      <input 
                        type="time" 
                        value={schedulerTime}
                        onChange={(e) => setSchedulerTime(e.target.value)}
                        className="w-full bg-black/60 border border-white/5 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-white/50">Your Email Address</label>
                    <input 
                      type="email" 
                      placeholder="you@company.com"
                      value={schedulerEmail}
                      onChange={(e) => {
                        setSchedulerEmail(e.target.value);
                        setSchedulerError('');
                      }}
                      className="w-full bg-black/60 border border-white/5 rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[var(--accent)] font-bold placeholder:text-zinc-650"
                    />
                    {schedulerError && (
                      <p className="text-[8px] font-mono text-rose-400 uppercase tracking-widest block">{schedulerError}</p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (!schedulerEmail || !schedulerEmail.includes('@')) {
                        setSchedulerError('Please input a valid email address');
                        playEliteSound('click');
                        return;
                      }
                      setSchedulerStep(2);
                      playEliteSound('success');
                    }}
                    className="w-full py-2.5 bg-[var(--accent)] text-black font-mono font-black text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer hover:opacity-90"
                  >
                    Confirm Synchronization Request
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-mono font-black uppercase text-emerald-400 tracking-wider">Sync Requested!</h4>
                    <p className="text-[9px] font-mono text-white/70">Calendar routes synced to:</p>
                    <p className="text-[10px] font-bold text-white/90 underline">{schedulerEmail}</p>
                    <p className="text-[7.5px] font-mono text-white/30 mt-2">Time Slot: {schedulerDate} @ {schedulerTime} (IST)</p>
                  </div>
                  <button
                    onClick={() => setShowScheduler(false)}
                    className="px-5 py-1.5 bg-white/5 border border-white/10 text-[8px] font-mono font-bold uppercase tracking-widest rounded-lg"
                  >
                    Close Gateway Connection
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. ROCKET UP ELEMENT */}
      <AnimatePresence>
        {showRocket && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 15 }}
            onClick={() => {
              playEliteSound('success');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="fixed bottom-24 right-5 z-[500] w-9.5 h-9.5 rounded-lg bg-black/90 border border-white/10 hover:border-emerald-400/40 hover:text-emerald-400 backdrop-blur-md flex items-center justify-center text-white/50 transition-all cursor-pointer pointer-events-auto"
            onMouseEnter={() => playEliteSound('hover')}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
