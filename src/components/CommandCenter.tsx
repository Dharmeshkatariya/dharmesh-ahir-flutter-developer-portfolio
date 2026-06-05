import React, { useState, useEffect, useRef } from 'react';
import { 
  Sliders, Palette, Sparkles, Terminal, Type, Layout, Trash2, 
  Upload, Download, Share2, Check, Copy, RefreshCw, Layers, ShieldAlert,
  Flame, HelpCircle, X, Search, Briefcase, Zap, Database, GitBranch,
  ArrowRight, ExternalLink, UserCheck, ShieldCheck, Cpu, Play, Eye, BarChart,
  Code, Info, Award, User, MapPin, Send, Laptop, Settings, Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, ThemeType, LayoutType } from '../types';
import { projectsData } from '../data';

// --- TYPES ---
export interface WorkspacePreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  config: {
    theme: ThemeType;
    layout: LayoutType;
    cursor: 'glass' | 'neon' | 'magnetic' | 'blob' | 'cyber' | 'apple' | 'terminal';
    bgType: 'particles' | 'cubes' | 'grid' | 'galaxy';
    neonGlow: boolean;
    speedFactor: number;
  };
}

export const workspacePresets: WorkspacePreset[] = [
  {
    id: 'preset-recruiter',
    name: 'Recruiter Dashboard',
    description: 'Instant structural overview emphasizing core production readiness, direct contact coordinates, and CV actions.',
    icon: 'Briefcase',
    config: {
      theme: 'apple-white',
      layout: 'developer-dashboard',
      cursor: 'apple',
      bgType: 'particles',
      neonGlow: false,
      speedFactor: 0.6
    }
  },
  {
    id: 'preset-founder',
    name: 'CTO / Pitch Mode',
    description: 'Bespoke high-performance dashboard detailing metrics, complex WebRTC, and isolates integrations.',
    icon: 'Sparkles',
    config: {
      theme: 'sunset',
      layout: 'glassmorphism-studio',
      cursor: 'glass',
      bgType: 'galaxy',
      neonGlow: true,
      speedFactor: 1.2
    }
  },
  {
    id: 'preset-developer',
    name: 'IDE Developer Workspace',
    description: 'Live interactive workspace interface including a custom IDE code simulator and reactive widget museum.',
    icon: 'Terminal',
    config: {
      theme: 'tesla-black',
      layout: 'terminal-hacker',
      cursor: 'terminal',
      bgType: 'cubes',
      neonGlow: true,
      speedFactor: 1.0
    }
  },
  {
    id: 'preset-creative',
    name: 'Ambient Glass Workspace',
    description: 'Maximum immersive glassmorphism layout with smooth interactive code exploration windows.',
    icon: 'Layers',
    config: {
      theme: 'purple',
      layout: 'glassmorphism-studio',
      cursor: 'magnetic',
      bgType: 'particles',
      neonGlow: true,
      speedFactor: 1.4
    }
  },
  {
    id: 'preset-minimalist',
    name: 'Sleek Zen Focus',
    description: 'Ultra-clean, high-contrast monochrome layouts focusing purely on typography and whitespace.',
    icon: 'Layers',
    config: {
      theme: 'nord',
      layout: 'apple-minimal',
      cursor: 'magnetic',
      bgType: 'particles',
      neonGlow: false,
      speedFactor: 0.3
    }
  }
];

// Sound helper
const playSystemTick = (frequency = 600, duration = 0.04) => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Handle sandboxed audio blockage smoothly
  }
};

interface CommandCenterProps {
  currentTheme: ThemeType;
  currentLayout: LayoutType;
  currentCursor: string;
  currentBg: string;
  onThemeChange: (t: ThemeType) => void;
  onLayoutChange: (l: LayoutType) => void;
  onCursorChange: (c: any) => void;
  onBgChange: (b: any) => void;
  onCustomTrigger?: (cmd: string, data?: any) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  currentTheme,
  currentLayout,
  currentCursor,
  currentBg,
  onThemeChange,
  onLayoutChange,
  onCursorChange,
  onBgChange,
  onCustomTrigger
}) => {
  // Modal states
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'case-studies' | 'design-lab' | 'recruiter' | 'developer-sandbox' | 'analytics' | 'dna'>('presets');
  const [hubOpen, setHubOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentActions, setRecentActions] = useState<any[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedCmdIdx, setSelectedCmdIdx] = useState(0);
  const [starredFavorites, setStarredFavorites] = useState<string[]>([
    'Download Professional CV (PDF)',
    'Switch to Ambient Glass Workspace',
    'Reset All Workspace Preferences'
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([
    'System Subsystem booted OK',
    'Core 3D Engine ready: auto-detecting performance',
    'Spotlight listening configured'
  ]);

  const [profile, setProfile] = useState<any>({
    name: 'Dharmesh Ahir',
    title: 'Flutter Developer',
    email: 'katariyadharmesh658@gmail.com',
    mobile: '+91 6354464371',
    github: 'https://github.com/Dharmeshkatariya',
    linkedin: 'https://linkedin.com/in/dharmesh-ahir',
  });

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.name) setProfile(data);
      })
      .catch(err => console.warn("Failed loading profile in CommandCenter:", err));
  }, []);

  // Ctrl + K registration
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
        playSystemTick(800, 0.08);
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setHubOpen(false);
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerPreset = (preset: WorkspacePreset) => {
    playSystemTick(900, 0.12);
    onThemeChange(preset.config.theme);
    onLayoutChange(preset.config.layout);
    onCursorChange(preset.config.cursor);
    onBgChange(preset.config.bgType);
    if (onCustomTrigger) {
      onCustomTrigger('apply-preset', preset);
    }
  };

  // Commands lookup array for command palette search
  const commands = [
    { 
      name: 'Switch to Developer IDE Dashboard', 
      icon: 'Terminal', 
      category: 'Layout', 
      description: 'Places a custom split IDE simulation dashboard on the active workspace. Comes with responsive console buffers.', 
      hotkey: '⌘ + 1', 
      successRate: '99.4%',
      action: () => onLayoutChange('developer-dashboard') 
    },
    { 
      name: 'Switch to Ambient Glass Workspace', 
      icon: 'Sparkles', 
      category: 'Layout', 
      description: 'Applies visual glassmorphic transparency modifiers securely across the entire dashboard panel interface.', 
      hotkey: '⌘ + 2', 
      successRate: '99.9%',
      action: () => onLayoutChange('glassmorphism-studio') 
    },
    { 
      name: 'Switch to Left Sidebar Studio', 
      icon: 'Layout', 
      category: 'Layout', 
      description: 'Moves layout perspectives left-side. Standard enterprise administration architectural outline styling.', 
      hotkey: '⌘ + 3', 
      successRate: '99.1%',
      action: () => onLayoutChange('left-sidebar') 
    },
    { 
      name: 'Switch to Apple Minimal Clean Layout', 
      icon: 'Layers', 
      category: 'Layout', 
      description: 'Removes background noise and grid structures to present portfolio elements with spacious margins.', 
      hotkey: '⌘ + 4', 
      successRate: '100.0%',
      action: () => onLayoutChange('apple-minimal') 
    },
    { 
      name: 'Switch to Command Line Console', 
      icon: 'Terminal', 
      category: 'Layout', 
      description: 'Disolves modern elements to render a retro-styled interactive SSH block text hacker emulator.', 
      hotkey: '⌘ + 5', 
      successRate: '98.5%',
      action: () => onLayoutChange('terminal-hacker') 
    },
    { 
      name: 'Switch to Official Flutter Blue Theme', 
      icon: 'Palette', 
      category: 'Theme', 
      description: 'Launches authentic material design palettes reflecting Flutter official brand coordinates.', 
      hotkey: '⌘ + T', 
      successRate: '99.7%',
      action: () => onThemeChange('flutter-official') 
    },
    { 
      name: 'Switch to Sleek Nord Light theme', 
      icon: 'Palette', 
      category: 'Theme', 
      description: 'Elegant arctic visual theme that renders responsive widgets on eye-safe muted off-white surfaces.', 
      hotkey: '⌘ + N', 
      successRate: '99.2%',
      action: () => onThemeChange('nord') 
    },
    { 
      name: 'Switch to Terminal Block Cursor', 
      icon: 'Type', 
      category: 'Cursor', 
      description: 'Locks custom mouse overlay to retro green prompt blocks that synchronize smoothly with key presses.', 
      hotkey: '⌥ + B', 
      successRate: '100.0%',
      action: () => onCursorChange('terminal') 
    },
    { 
      name: 'Switch to Liquid Glass Blob Cursor', 
      icon: 'Type', 
      category: 'Cursor', 
      description: 'Activates viscous liquid-physics blob elements that fluidly wrap hovered clickable action links.', 
      hotkey: '⌥ + O', 
      successRate: '98.9%',
      action: () => onCursorChange('blob') 
    },
    { 
      name: 'Load Recruiter Focus Workspace Preset', 
      icon: 'Briefcase', 
      category: 'Presets', 
      description: 'Fully aggregates professional availability profiles, verified contractor status logs, and CV triggers.', 
      hotkey: '⇧ + R', 
      successRate: '99.9%',
      action: () => triggerPreset(workspacePresets[0]) 
    },
    { 
      name: 'Load IDE Developer Tooling Preset', 
      icon: 'Terminal', 
      category: 'Presets', 
      description: 'Rebuilds perspectives around terminal streams, active memory monitors, and complex code builders.', 
      hotkey: '⇧ + D', 
      successRate: '99.6%',
      action: () => triggerPreset(workspacePresets[2]) 
    },
    { 
      name: 'Load High-Contrast Minimalist Preset', 
      icon: 'Layers', 
      category: 'Presets', 
      description: 'Strict typography scaling and stark visual boundaries to provide deep readable structural flows.', 
      hotkey: '⇧ + M', 
      successRate: '100.0%',
      action: () => triggerPreset(workspacePresets[4]) 
    },
    { 
      name: 'Reset All Workspace Preferences', 
      icon: 'RefreshCw', 
      category: 'System', 
      description: 'Flushes active localStorage configuration keys and re-initializes safe core UI environments immediately.', 
      hotkey: '⌘ + ⌫', 
      successRate: '100.0%',
      action: () => {
        onThemeChange('ocean');
        onLayoutChange('glassmorphism-studio');
        onCursorChange('glass');
        onBgChange('particles');
        playSystemTick(200, 0.2);
    }},
    { 
      name: 'Download Professional CV (PDF)', 
      icon: 'Download', 
      category: 'Hiring', 
      description: 'Directly compiles, wraps, and serves Dharmesh Ahir modern print-ready portfolio summary document.', 
      hotkey: '⌘ + D', 
      successRate: '100.0%',
      action: () => {
        const link = document.createElement('a');
        link.href = '#cv-direct';
        link.click();
        if (onCustomTrigger) onCustomTrigger('download-cv');
    }},
    { 
      name: 'Launch 3D System Design Lab', 
      icon: 'Network', 
      category: 'Tools', 
      description: 'Opens relational map model architectures, custom painters, and cross-platform isolated threading routers.', 
      hotkey: '⌥ + 3', 
      successRate: '99.1%',
      action: () => { setHubOpen(true); setActiveTab('design-lab'); } 
    },
    { 
      name: 'Launch interactive Widget Museum', 
      icon: 'Laptop', 
      category: 'Tools', 
      description: 'Interactive live rendering sandbox where visitors tweak widgets, trigger sound waves, and log states.', 
      hotkey: '⌥ + W', 
      successRate: '99.5%',
      action: () => { setHubOpen(true); setActiveTab('developer-sandbox'); } 
    },
    { 
      name: 'View Developer DNA Map', 
      icon: 'Award', 
      category: 'Tools', 
      description: 'Meticulous database analytics dashboard charting commits, uptime vectors, and certifications achievements.', 
      hotkey: '⌥ + A', 
      successRate: '100.0%',
      action: () => { setHubOpen(true); setActiveTab('dna'); } 
    }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* FLOATING ACTION HUBS */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Ctrl+K Hint Indicator */}
        <button 
          onClick={() => { setPaletteOpen(true); playSystemTick(700, 0.05); }}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-[var(--accent)] border border-[var(--accent)]/30 rounded-full bg-black/60 shadow-lg cursor-pointer hover:border-[var(--accent)] transition-all duration-300"
          id="cmd-palette-launcher-btn"
        >
          <Search className="w-3.5 h-3.5" />
          <span>CMD CENTER</span>
          <kbd className="px-1 py-0.2 text-[9px] bg-white/10 text-white rounded">Ctrl+K</kbd>
        </button>

        {/* Operating Hub Trigger Box */}
        <button
          onClick={() => { setHubOpen(prev => !prev); playSystemTick(500, 0.1); }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-black font-extrabold shadow-xl shadow-[var(--accent)]/20 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse"
          id="operations-hub-btn"
          title="Open Portfolio Workspace Center"
        >
          <Settings className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
        </button>
      </div>

      {/* --- COMMAND PALETTE SEARCH OVERLAY (Ctrl+K) --- */}
      <AnimatePresence>
        {paletteOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-[10000] flex items-start justify-center pt-[10vh] px-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-4xl bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              style={{ boxShadow: 'var(--panel-glow)' }}
            >
              {/* Apple-style window titlebar */}
              <div className="flex items-center justify-between px-5 pt-3.5 pb-2 bg-[var(--bg-primary)]/80 border-b border-[var(--panel-border)]/50 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer hover:opacity-85" onClick={() => setPaletteOpen(false)} />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-mono uppercase font-black tracking-widest text-[var(--accent)] flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                  Raycast + Arc Command Engine v3.0
                </span>
                <span className="text-[9px] font-mono text-[var(--text-muted)] opacity-60">
                  SECURE PORTAL
                </span>
              </div>

              {/* Search Bar Row */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--panel-border)] bg-[var(--bg-secondary)]/90">
                <Search className="w-5 h-5 text-[var(--accent)]" />
                <input
                  type="text"
                  placeholder="Ask, search, star or trigger system layouts..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedCmdIdx(0);
                  }}
                  className="flex-1 bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none text-sm text-[var(--text-main)] font-sans placeholder-[var(--text-muted)]/50"
                  autoFocus
                />
                <button 
                  onClick={() => setPaletteOpen(false)}
                  className="p-1 rounded bg-[var(--text-main)]/5 text-[var(--text-muted)] cursor-pointer hover:bg-[var(--text-main)]/10 hover:text-[var(--text-main)] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Categories filter Badges */}
              <div className="flex gap-1.5 px-5 py-2.5 bg-[var(--bg-primary)]/40 border-b border-[var(--panel-border)] overflow-x-auto scrollbar-thin select-none">
                {[
                  { label: 'Show All', query: '' },
                  { label: 'Themes', query: 'theme' },
                  { label: 'Layouts', query: 'layout' },
                  { label: 'Cursor Styles', query: 'cursor' },
                  { label: 'Presets', query: 'preset' },
                  { label: 'Hiring Actions', query: 'hiring' },
                  { label: 'Hacker Tools', query: 'tools' }
                ].map((badge) => (
                  <button
                    key={badge.label}
                    onClick={() => {
                      setSearchQuery(badge.query);
                      setSelectedCmdIdx(0);
                      playSystemTick(400, 0.05);
                    }}
                    className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase transition-all whitespace-nowrap border ${
                      (badge.query === '' && searchQuery === '') || (badge.query !== '' && searchQuery.toLowerCase().includes(badge.query))
                        ? 'bg-[var(--accent)] border-[var(--accent)] text-black'
                        : 'bg-[var(--bg-secondary)]/80 text-[var(--text-muted)] border-[var(--panel-border)] hover:border-[var(--accent)]/50'
                    }`}
                  >
                    {badge.label}
                  </button>
                ))}
              </div>

              {/* Split Content layout (Left list, Right Preview) */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px] max-h-[450px] overflow-hidden bg-[var(--bg-secondary)]">
                
                {/* Left Side: Commands List (8 columns) */}
                <div className="col-span-12 md:col-span-7 overflow-y-auto p-2 divide-y divide-[var(--panel-border)]/20 border-r border-[var(--panel-border)]/40 scrollbar-thin">
                  
                  {/* STARRED FAVORITES GROUP (Only visible when no search query filter is active) */}
                  {!searchQuery && (
                    <div className="pb-3 pt-1">
                      <p className="text-[9px] font-mono font-black text-rose-400 uppercase tracking-widest px-3 mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-rose-400" /> Starred Favorites
                      </p>
                      <div className="grid grid-cols-1 gap-1 px-1">
                        {commands
                          .filter(c => starredFavorites.includes(c.name))
                          .map((cmd, favIdx) => (
                            <button
                              key={`fav-${favIdx}`}
                              onMouseEnter={() => {
                                const idxInFull = commands.findIndex(item => item.name === cmd.name);
                                if (idxInFull !== -growIdx) setSelectedCmdIdx(idxInFull);
                              }}
                              onClick={() => {
                                setRecentActions((prev) => {
                                  const exists = prev.some((item) => item.name === cmd.name);
                                  if (exists) return prev;
                                  return [cmd, ...prev].slice(0, 4);
                                });
                                setCommandHistory(prev => [cmd.name, ...prev].slice(0, 5));
                                cmd.action();
                                setPaletteOpen(false);
                                playSystemTick(850, 0.05);
                              }}
                              className={`flex items-center justify-between text-left p-2 rounded-xl border transition-all text-[var(--text-main)] group ${
                                commands[selectedCmdIdx]?.name === cmd.name 
                                  ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)] scale-[1.01]' 
                                  : 'bg-[var(--bg-primary)]/40 border-transparent hover:border-[var(--panel-border)]/60'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <Sparkles className="w-3.5 h-3.5 text-rose-400 group-hover:animate-spin" />
                                <span className="text-[11px] font-bold truncate">{cmd.name}</span>
                              </div>
                              <span className="text-[8px] font-mono text-[var(--text-muted)] bg-[var(--text-main)]/5 px-1.5 py-0.5 rounded uppercase">
                                {cmd.category}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* MAIN COMMAND SEARCH RESULTS */}
                  <div className="pt-2">
                    <p className="text-[9px] font-mono font-black text-[var(--text-muted)] uppercase tracking-wider px-3 mb-2">
                      {searchQuery ? `Search Results (${filteredCommands.length})` : 'All Available Commands'}
                    </p>
                    
                    {filteredCommands.length > 0 ? (
                      filteredCommands.map((cmd, idx) => {
                        const isSelected = selectedCmdIdx === idx;
                        const isFav = starredFavorites.includes(cmd.name);
                        
                        return (
                          <div
                            key={idx}
                            onMouseEnter={() => setSelectedCmdIdx(idx)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all group ${
                              isSelected 
                                ? 'bg-[var(--accent)]/15 border border-[var(--accent)]/40 text-[var(--text-main)]' 
                                : 'border border-transparent hover:bg-[var(--text-main)]/5'
                            }`}
                          >
                            <button
                              onClick={() => {
                                setRecentActions((prev) => {
                                  const exists = prev.some((item) => item.name === cmd.name);
                                  if (exists) return prev;
                                  return [cmd, ...prev].slice(0, 4);
                                });
                                setCommandHistory(prev => [cmd.name, ...prev].slice(0, 5));
                                cmd.action();
                                setPaletteOpen(false);
                                playSystemTick(750, 0.05);
                              }}
                              className="flex items-center gap-3 flex-1 text-left cursor-pointer font-sans"
                            >
                              <div className="h-7 w-7 rounded-lg bg-[var(--text-main)]/5 flex items-center justify-center text-[var(--text-main)] group-hover:bg-[var(--accent)]/20 group-hover:text-[var(--accent)]">
                                {cmd.icon === 'Terminal' && <Terminal className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'Sparkles' && <Sparkles className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'Layout' && <Layout className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'Palette' && <Palette className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'Type' && <Type className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'Briefcase' && <Briefcase className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'Layers' && <Layers className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'RefreshCw' && <RefreshCw className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'Download' && <Download className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'Network' && <Network className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'Laptop' && <Laptop className="w-4 h-4 cursor-pointer" />}
                                {cmd.icon === 'Award' && <Award className="w-4 h-4 cursor-pointer" />}
                              </div>
                              <div className="truncate">
                                <p className="text-xs font-semibold text-[var(--text-main)] transition-all group-hover:text-[var(--accent)]">{cmd.name}</p>
                                <p className="text-[8px] uppercase font-mono text-[var(--text-muted)] tracking-wider mt-0.5">{cmd.category}</p>
                              </div>
                            </button>
                            
                            {/* Star Action Toggle Button */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStarredFavorites(prev => 
                                    isFav ? prev.filter(n => n !== cmd.name) : [...prev, cmd.name]
                                  );
                                  playSystemTick(450, 0.08);
                                }}
                                className={`p-1.5 rounded-lg hover:bg-white/10 transition-all ${
                                  isFav ? 'text-rose-400' : 'text-zinc-500 hover:text-white'
                                }`}
                                title={isFav ? "Remove from Favorites" : "Mark as Favorite"}
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                              </button>
                              <span className="hidden group-hover:inline-block text-[8px] font-mono bg-[var(--text-main)]/5 px-2 py-0.5 rounded font-black text-[var(--text-muted)] whitespace-nowrap">
                                {cmd.hotkey}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-12 text-center text-[var(--text-muted)] flex flex-col items-center justify-center gap-2 bg-[var(--bg-secondary)]">
                        <ShieldAlert className="w-8 h-8 text-[var(--text-muted)]/20 animate-bounce" />
                        <p className="text-sm">No matching portfolio commands found</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Animated Preview Panel (5 columns) */}
                <div className="hidden md:flex col-span-12 md:col-span-5 bg-[var(--bg-primary)]/30 p-4 flex-col justify-between overflow-y-auto divide-y divide-[var(--panel-border)]/20">
                  
                  {/* Selected Item Preview Header */}
                  <div className="space-y-3 pb-3">
                    <p className="text-[9px] font-mono tracking-widest text-[var(--accent)] font-bold uppercase">📊 Command Preview Panel</p>
                    
                    {filteredCommands[selectedCmdIdx] ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 pb-1">
                          <div className="h-8 w-8 bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center rounded-xl border border-[var(--accent)]/30">
                            {filteredCommands[selectedCmdIdx].icon === 'Terminal' && <Terminal className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'Sparkles' && <Sparkles className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'Layout' && <Layout className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'Palette' && <Palette className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'Type' && <Type className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'Briefcase' && <Briefcase className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'Layers' && <Layers className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'RefreshCw' && <RefreshCw className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'Download' && <Download className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'Network' && <Network className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'Laptop' && <Laptop className="w-4 h-4" />}
                            {filteredCommands[selectedCmdIdx].icon === 'Award' && <Award className="w-4 h-4" />}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white leading-tight">{filteredCommands[selectedCmdIdx].name}</h4>
                            <span className="text-[7.5px] font-mono bg-white/5 border border-white/10 text-white/50 px-1 py-0.2 rounded uppercase">
                              {filteredCommands[selectedCmdIdx].category}
                            </span>
                          </div>
                        </div>

                        <p className="text-[10px] text-[var(--text-muted)] leading-normal bg-black/40 border border-white/5 p-2 rounded-xl font-sans">
                          {filteredCommands[selectedCmdIdx].description}
                        </p>

                        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[8.5px]">
                          <div className="bg-white/[0.02] border border-white/5 p-1.5 rounded group hover:border-[var(--accent)]/20 transition-all">
                            <span className="text-zinc-500 block uppercase tracking-wider text-[6.5px]">Success Rate</span>
                            <span className="text-emerald-400 font-extrabold font-mono">{filteredCommands[selectedCmdIdx].successRate}</span>
                          </div>
                          <div className="bg-white/[0.02] border border-white/5 p-1.5 rounded group hover:border-[var(--accent)]/20 transition-all">
                            <span className="text-zinc-500 block uppercase tracking-wider text-[6.5px]">Hotkey Trigger</span>
                            <span className="text-white font-extrabold font-mono">{filteredCommands[selectedCmdIdx].hotkey}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-[10px] text-zinc-500">
                        Hover a command option to preview diagnostic architecture data blocks instantly.
                      </div>
                    )}
                  </div>

                  {/* Command Performance Latency Sim */}
                  <div className="py-2.5 text-[8.5px] font-mono text-zinc-400 space-y-1.5">
                    <span className="text-[7.5px] uppercase font-black tracking-widest text-zinc-500 block pb-0.5">📟 Live Portal Diagnostics</span>
                    <div className="flex justify-between">
                      <span>Sync Latency:</span>
                      <span className="text-emerald-400 font-bold">12ms (Secure TCP)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thread Handlers:</span>
                      <span className="text-sky-400 font-bold">4 Active Isolates</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scenery Scancount:</span>
                      <span className="text-amber-400 font-bold">60 FPS RenderLock</span>
                    </div>
                  </div>

                  {/* Command Executed Trace Log */}
                  <div className="pt-2 text-[8.5px] font-mono text-zinc-400 space-y-1 bg-black/30 border border-white/5 p-2 rounded-xl">
                    <span className="text-[7.5px] uppercase font-bold text-zinc-600 tracking-wider block">★ Past Executed Traces</span>
                    <div className="space-y-1 max-h-[70px] overflow-y-auto">
                      {commandHistory.map((hist, hIdx) => (
                        <div key={`h-${hIdx}`} className="flex items-center gap-1.5 text-zinc-500 truncate text-[7.5px]">
                          <span className="text-emerald-400">⚡</span>
                          <span className="truncate">{hist}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Hotkeys Footer */}
              <div className="px-5 py-3 border-t border-[var(--panel-border)] bg-[var(--bg-primary)]/80 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] select-none">
                <span className="text-[10px]">Star items via Star icons to pin them on top • ESC to close portal</span>
                <span className="text-[9.5px] text-[var(--accent)] font-bold">PREVIEW PANEL ONLINE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MASTER OPERATIONS OPERATING HUD SYSTEM --- */}
      <AnimatePresence>
        {hubOpen && (
          <div className="fixed inset-0 bg-[#02050c]/90 backdrop-blur-xl z-[9000] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              className="w-full max-w-6xl h-[90vh] bg-[#070b13] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* Header block */}
              <div className="px-6 py-4 border-b border-white/5 bg-[#03070d] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-[var(--accent)]/15 border border-[var(--accent)]/30 rounded-xl flex items-center justify-center text-[var(--accent)]">
                    <Sliders className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      Premium Operations Suite <span className="text-[10px] font-mono bg-white/10 text-white/60 px-2 py-0.5 rounded uppercase">v3.5 Active</span>
                    </h2>
                    <p className="text-xs text-white/40">Inspect custom-built widgets, tweak scenery particles, examine developer architecture nodes, or load recruiter analytics.</p>
                  </div>
                </div>
                <button
                  onClick={() => setHubOpen(false)}
                  className="h-10 w-10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white rounded-full flex items-center justify-center cursor-pointer transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-navigation categories */}
              <div className="flex border-b border-white/5 bg-[#040810] overflow-x-auto select-none gap-1 p-1">
                {[
                  { id: 'presets', label: 'Workspace Profiles', icon: Sliders },
                  { id: 'case-studies', label: 'Interactive Case Studies', icon: Briefcase },
                  { id: 'design-lab', label: '3D Architecture Play', icon: Network },
                  { id: 'developer-sandbox', label: 'Flutter Widget Museum', icon: Laptop },
                  { id: 'recruiter', label: 'Hiring Dashboard', icon: UserCheck },
                  { id: 'dna', label: 'Developer DNA', icon: Award },
                  { id: 'analytics', label: 'Portfolio Analytics', icon: BarChart }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id as any); playSystemTick(600, 0.05); }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap tracking-wide transition-all cursor-pointer ${
                        activeTab === tab.id 
                          ? 'bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30' 
                          : 'text-white/40 hover:text-white/80 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Workspace display content box */}
              <div className="flex-1 overflow-y-auto p-6 bg-[#03060b]">
                
                {/* 1. WORKSPACE PRESETS TAB */}
                {activeTab === 'presets' && (
                  <div className="space-y-6">
                    <div className="bg-[#090f1d] border border-white/5 p-5 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[var(--accent)]" /> Interactive Layout & Environment Presets
                        </h3>
                        <p className="text-sm text-white/50">Each profile saves a distinct configuration of typography style, layout matrices, cursor acceleration, custom themes, and 3D scenes.</p>
                      </div>
                      <div className="text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 text-center lg:text-right font-mono">
                        Active Presets Mode: <span className="text-[var(--accent)] uppercase font-black">Active</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {workspacePresets.map((preset) => {
                        const isPresetCurrent = currentTheme === preset.config.theme && currentLayout === preset.config.layout;
                        return (
                          <div 
                            key={preset.id}
                            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between h-[190px] ${
                              isPresetCurrent 
                                ? 'bg-[var(--accent)]/5 border-[var(--accent)]/40 shadow-lg shadow-[var(--accent)]/5' 
                                : 'bg-[#060a12] border-white/5 hover:border-white/15'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded tracking-wide ${
                                  isPresetCurrent ? 'bg-[var(--accent)]/15 text-[var(--accent)]' : 'bg-white/5 text-white/60'
                                }`}>
                                  {preset.config.layout}
                                </span>
                                {preset.id === 'preset-recruiter' && <Briefcase className="w-4 h-4 text-emerald-400" />}
                                {preset.id === 'preset-founder' && <Sparkles className="w-4 h-4 text-orange-400" />}
                                {preset.id === 'preset-developer' && <Terminal className="w-4 h-4 text-pink-400" />}
                                {preset.id === 'preset-creative' && <Flame className="w-4 h-4 text-[var(--accent)] animate-bounce" />}
                                {preset.id === 'preset-minimalist' && <Layers className="w-4 h-4 text-slate-400" />}
                              </div>
                              <h4 className="text-sm font-bold text-white mb-2">{preset.name}</h4>
                              <p className="text-xs text-white/40 leading-relaxed line-clamp-3">{preset.description}</p>
                            </div>

                            <button
                              onClick={() => triggerPreset(preset)}
                              className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all ${
                                isPresetCurrent 
                                  ? 'bg-[var(--accent)] text-black font-extrabold' 
                                  : 'bg-white/5 hover:bg-white/10 text-white'
                              }`}
                            >
                              {isPresetCurrent ? (
                                <>
                                  <Check className="w-4 h-4 stroke-[3px]" /> Active Setup Profile
                                </>
                              ) : (
                                <>
                                  Tweak Workspace <ArrowRight className="w-3.5 h-3.5" />
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. CASE STUDIES PANEL */}
                {activeTab === 'case-studies' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-[#090f1d] border border-white/5 p-5 rounded-2xl">
                      <h3 className="text-base font-bold text-white mb-2">Interactive Product Case Studies</h3>
                      <p className="text-xs text-white/50 leading-relaxed">Most portfolios stop at cards. Select an application to initiate our interactive product storytelling layout showcasing research architectures, coding problems, metrics, and deep systems designs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projectsData.map((project) => (
                        <div 
                          key={project.id}
                          onClick={() => { setActiveProject(project); playSystemTick(700, 0.1); }}
                          className="group relative rounded-2xl bg-[#060a12] border border-white/5 overflow-hidden shadow-lg cursor-pointer hover:border-[var(--accent)]/30 transition-all duration-300"
                        >
                          <div className="h-40 w-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-10" />
                            <img 
                              src={project.thumbnail} 
                              alt={project.title} 
                              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute top-3 left-3 bg-[#090f1d] border border-white/10 text-white px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase z-20">
                              {project.category}
                            </span>
                          </div>

                          <div className="p-4">
                            <h4 className="text-sm font-bold text-white group-hover:text-[var(--accent)] transition-colors duration-300 mb-1">{project.title}</h4>
                            <p className="text-xs text-white/40 line-clamp-2 mb-3">{project.problem}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {project.techStack.slice(0, 3).map((tech, idx) => (
                                <span key={idx} className="bg-white/5 text-white/60 text-[9px] px-1.5 py-0.5 rounded font-mono">
                                  {tech}
                                </span>
                              ))}
                            </div>

                            <button className="w-full py-2 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-bold flex items-center justify-center gap-1 group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                              Read Deep Study <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. 3D SYSTEM DESIGN LAB (Architecture Playground) */}
                {activeTab === 'design-lab' && (
                  <div className="space-y-6">
                    <div className="bg-[#090f1d] border border-white/5 p-5 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-1.5">
                          <Network className="w-4.5 h-4.5 text-[var(--accent)]" /> 3D Architecture Playground & System Lab
                        </h3>
                        <p className="text-xs text-white/50 leading-relaxed">Dharmesh's standard High-Performance Clean Enterprise Mobile architecture. Use your cursor to **drag to rotate nodes** in 3D, inspect connection pipes, or select nodes for details.</p>
                      </div>
                      <span className="text-[10px] font-mono border border-emerald-400/30 text-emerald-400 bg-emerald-500/5 px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 animate-pulse">
                        ● STABLE INTERACTIVE SYNC ENGINE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-[#03060a] border border-white/5 h-[400px] rounded-2xl overflow-hidden relative shadow-inner">
                        <SystemDesignLabCanvas />
                      </div>
                      <div className="bg-[#060a12] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="p-1 px-1.5 text-[9px] font-mono font-bold bg-pink-500/10 text-pink-400 rounded">LAYER MATCHED</span>
                            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-ping" />
                          </div>
                          <h4 className="text-md font-bold text-white mb-2 flex items-center gap-2">
                             System Components
                          </h4>
                          <p className="text-xs text-white/40 leading-relaxed mb-4">Dharmesh’s core patterns enforce clean isolation boundaries. Check out the nodes in 3D canvas:</p>

                          <div className="space-y-3">
                            <div className="bg-[#0a0d17] border-l-2 border-[var(--accent)] p-2.5 rounded text-xs">
                              <p className="font-extrabold text-white">Presentation (UI Grid Nodes)</p>
                              <p className="text-[10px] text-white/40 mt-1">Stops controller pollution by binding pure Flutter custom painter modules, rendering exactly at 60 to 120fps.</p>
                            </div>
                            <div className="bg-[#0a0d17] border-l-2 border-pink-500 p-2.5 rounded text-xs">
                              <p className="font-extrabold text-white">Business Logic Paradigm (BLoC Loop)</p>
                              <p className="text-[10px] text-white/40 mt-1">Maintains synchronous reactive state charts. All event logs are tracked as structured flows.</p>
                            </div>
                            <div className="bg-[#0a0d17] border-l-2 border-purple-500 p-2.5 rounded text-xs">
                              <p className="font-extrabold text-white">Offline Vault (Hive / SQLite Cache)</p>
                              <p className="text-[10px] text-white/40 mt-1">Pre-calculates document offsets, logs changes offline, and uses trigger synchronizations.</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-white/5">
                          <button 
                            onClick={() => { playSystemTick(880, 0.05); }}
                            className="w-full py-2 px-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-black text-xs font-black flex items-center justify-center gap-1"
                          >
                            Tweak Synchronous WebRTC Nodes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. DEVELOPER SANDBOX: FLUTTER WIDGET MUSEUM */}
                {activeTab === 'developer-sandbox' && (
                  <div className="space-y-6">
                    <div className="bg-[#090f1d] border border-white/5 p-5 rounded-2xl flex justify-between items-center flex-col lg:flex-row gap-4">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">Flutter Widget Museum & React Playgrounds</h3>
                        <p className="text-xs text-white/50 leading-relaxed">Interact with authentic Flutter-styled custom reactive widgets compiled on React. Test inputs to monitor state updates and frame renderings.</p>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1.5 rounded-lg font-black tracking-widest flex items-center gap-1">
                        🎨 60fps Sandbox Active
                      </span>
                    </div>

                    <WidgetMuseumComponent />
                  </div>
                )}

                {/* 5. RECRUITER CONVERSION DASHBOARD */}
                {activeTab === 'recruiter' && (
                  <div className="space-y-6">
                    <div className="bg-[#090f1d] border border-white/5 p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">Executive Hiring & Recruiting Coordination</h3>
                        <p className="text-xs text-white/50 leading-relaxed">Direct instant operations for senior personnel, CTOs, and recruitment managers looking to secure top-tier engineering talent.</p>
                      </div>
                      <button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = '#cv-direct';
                          link.click();
                          playSystemTick(1000, 0.1);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs px-4 py-2 rounded-lg shadow-lg flex items-center gap-1"
                      >
                        <Download className="w-4 h-4 stroke-[2.5px]" /> Get Formal Resume (PDF)
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#060a12] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold tracking-widest">Availability status</span>
                            <h4 className="text-lg font-bold text-white mt-3 mb-1">Immediate Availability</h4>
                            <p className="text-xs text-white/40 leading-relaxed">Willing to relocate or work hybrid/remote globally. Surat Studio ready for on-site projects.</p>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-white/5">
                            <span className="text-[10px] text-white/40 block mb-2 font-mono">PRIMARY TECH CONCENTRATION</span>
                            <div className="flex flex-wrap gap-1.5">
                              {['Flutter (Dart)', 'SQLite / Hive', 'BLoC state', 'Isolates (Parallelism)', 'WebRTC'].map((x, idx) => (
                                <span key={idx} className="bg-white/5 text-white/70 text-[9px] px-2 py-0.5 rounded font-mono">{x}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#060a12] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded font-bold tracking-wider">Historical KPIs</span>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="text-center bg-[#0a0f1d] p-3 rounded-lg">
                                <span className="text-xl font-black text-white">3+ Years</span>
                                <span className="text-[9px] text-white/40 block mt-1 uppercase font-mono">Expert experience</span>
                              </div>
                              <div className="text-center bg-[#0a0f1d] p-3 rounded-lg">
                                <span className="text-xl font-black text-white">10+ Apps</span>
                                <span className="text-[9px] text-white/40 block mt-1 uppercase font-mono">Shipped to shops</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 text-xs bg-white/5 p-3 rounded-xl border border-white/5 text-white/50 leading-relaxed">
                            <strong>Dharmesh’s core focus:</strong> UI frame delivery always above 60fps, strict SOLID clean architectural structures, and fully stable offline workflows.
                          </div>
                        </div>

                        <div className="md:col-span-2 bg-[#060a12] border border-white/5 p-5 rounded-2xl">
                          <h4 className="text-sm font-bold text-white mb-3">Reach {profile.name || 'Dharmesh Ahir'} Instantly</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="bg-white/5 p-3 rounded-xl">
                              <span className="text-white/40 block uppercase font-mono text-[9px]">DIRECT EMAIL CONTACT</span>
                              <a href={`mailto:${profile.email}`} className="text-[var(--accent)] font-bold block mt-1 break-all hover:underline">{profile.email}</a>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl">
                              <span className="text-white/40 block uppercase font-mono text-[9px]">DIRECT VOICE RECRUITING</span>
                              <a href={`tel:${profile.mobile}`} className="text-[var(--accent)] font-bold block mt-1 hover:underline">{profile.mobile}</a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#05080f] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white mb-2">Recruiter Action Portal</h4>
                          <p className="text-xs text-white/40 leading-relaxed mb-4">Generate direct, customized inquiry updates which automatically notifies Dharmesh’s central communication queues:</p>
                          
                          <select className="w-full bg-[#0c1222] border border-white/10 rounded-lg p-2.5 text-xs text-white mb-3 focus:outline-none focus:border-[var(--accent)]" id="hiring-intent-select">
                            <option>Consulting Contract Collaboration</option>
                            <option>Full-Time Architecture Hiring Engagement</option>
                            <option>Technical Advisory Interview Session</option>
                            <option>Flutter Component Design Task</option>
                          </select>

                          <textarea 
                            rows={3} 
                            placeholder="Tweak contract details, project timeline, or salary constraints..."
                            className="w-full bg-[#0c1222] border border-white/10 rounded-lg p-3 text-xs text-glow-none text-white focus:outline-none focus:border-[var(--accent)] min-h-[100px]"
                          />
                        </div>

                        <button 
                          onClick={() => {
                            playSystemTick(950, 0.15);
                            alert("Thank you! Your hiring inquiry has been successfully queued in the system. Dharmesh Ahir will contact you directly via email shortly!");
                          }}
                          className="w-full py-2.5 mt-4 rounded-xl bg-gradient-to-r from-[var(--accent)] to-cyan-400 text-black font-extrabold text-xs flex items-center justify-center gap-1 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <Send className="w-4 h-4" /> Transit Enquiry Logs
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. DEVELOPER DNA MAP */}
                {activeTab === 'dna' && (
                  <div className="space-y-6">
                    <div className="bg-[#090f1d] border border-white/5 p-5 rounded-2xl">
                      <h3 className="text-base font-bold text-white mb-2">Competency & Cognitive Personality Map</h3>
                      <p className="text-xs text-white/50 leading-relaxed">Interactive canvas-based radar representation detailing Dharmesh Ahir’s primary architectural capabilities and software deployment paradigms.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-[#060a12] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[380px] relative shadow-lg">
                        <DNAMapCanvas />
                      </div>

                      <div className="space-y-4">
                        <div className="bg-[#060a12] border border-white/5 p-5 rounded-2xl">
                          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                            <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" /> Core Engineering DNA
                          </h4>
                          <p className="text-xs text-white/40 leading-relaxed mb-4">Quantified assessment rating parameters (Max 100):</p>

                          <div className="space-y-3 font-mono text-[11px]">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-white/60">FLUTTER FRAME RECONSTRUCTION</span>
                                <span className="text-white font-extrabold">98%</span>
                              </div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[var(--accent)] h-full" style={{ width: '98%' }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-white/60">STATE MACHINE ARCHITECTURES (BLOC)</span>
                                <span className="text-white font-extrabold">95%</span>
                              </div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-pink-500 h-full" style={{ width: '95%' }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-white/60">OFFLINE-FIRST SYNCHRONIZATIONS</span>
                                <span className="text-white font-extrabold">92%</span>
                              </div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-purple-500 h-full" style={{ width: '92%' }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-white/60">LOW-LATENCY WEBRTC STREAMING</span>
                                <span className="text-white font-extrabold">88%</span>
                              </div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-yellow-500 h-full" style={{ width: '88%' }} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#05080f] border border-white/5 p-4 rounded-xl text-center text-[11px] font-mono text-white/40">
                          Data verified under simulated performance stress matrices.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. PORTFOLIO VISITORS ANALYTICS SYSTEM (Founder Mode) */}
                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="bg-[#090f1d] border border-white/5 p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                          <BarChart className="w-4.5 h-4.5 text-[var(--accent)]" /> Portfolio Metrics & Engagement Logs
                        </h3>
                        <p className="text-xs text-white/50 leading-relaxed">Simulated server-side interaction indicators displaying click clusters, active layout selections, and live server load status.</p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-[#060a12] border border-white/5 rounded-2xl p-5">
                        <h4 className="text-sm font-bold text-white mb-4">Responsive State Requests Heatmap</h4>
                        <AnalyticsGraphComponent />
                      </div>

                      <div className="space-y-4">
                        <div className="bg-[#060a12] border border-white/5 p-5 rounded-2xl">
                          <h4 className="text-sm font-bold text-white mb-3">Theme Popularity Statistics</h4>
                          
                          <div className="space-y-3 font-mono text-[11px]">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>Tesla Dark (Developer Theme)</span>
                                <span className="text-[var(--accent)] font-bold">42%</span>
                              </div>
                              <div className="w-full bg-white/5 h-1 rounded-full"><div className="bg-[var(--accent)] h-full" style={{ width: '42%' }} /></div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>Apple Crystal White</span>
                                <span className="text-emerald-400 font-bold">28%</span>
                              </div>
                              <div className="w-full bg-white/5 h-1 rounded-full"><div className="bg-emerald-400 h-full" style={{ width: '28%' }} /></div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>Atmospheric Cyberpunk</span>
                                <span className="text-pink-500 font-bold">18%</span>
                              </div>
                              <div className="w-full bg-white/5 h-1 rounded-full"><div className="bg-pink-500 h-full" style={{ width: '18%' }} /></div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>Other Custom Palettes</span>
                                <span className="text-purple-500 font-bold">12%</span>
                              </div>
                              <div className="w-full bg-white/5 h-1 rounded-full"><div className="bg-purple-500 h-full" style={{ width: '12%' }} /></div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#060a12] border border-white/5 p-5 rounded-2xl">
                          <h4 className="text-sm font-bold text-white mb-2">Live Click Ledger feeds</h4>
                          <div className="space-y-1 text-[10px] font-mono text-white/40 max-h-[80px] overflow-y-auto">
                            <p>👉 [04:20:12] CTRLM: Selected Resido Project</p>
                            <p>👉 [04:20:18] CTRL_K: Loaded Recruiter Workspace Preset</p>
                            <p>👉 [04:20:25] AIAGENT: Replied BLoC explanation</p>
                            <p>👉 [04:20:31] RESUME_GEN: PDF compiler executed successfully</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Lower Controls state info */}
              <div className="px-6 py-4 border-t border-white/5 bg-[#03070d] flex flex-col md:flex-row items-center justify-between text-xs font-mono text-white/40 gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Dharmesh Ahir Operations Console Enabled</span>
                </div>
                <span>Use Ctrl+K Anywhere To Access</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- REUSEABLE LUXURIOUS INTERACTIVE CASE STUDY STORYBOARD --- */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 bg-[#02050c]/95 backdrop-blur-2xl z-[15000] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 30 }}
              className="w-full max-w-4xl bg-[#060a12] border border-[var(--accent)]/30 rounded-2xl shadow-2xl relative max-h-[92vh] flex flex-col"
            >
              {/* Header area */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#03060a]">
                <div className="flex items-center gap-3">
                  <span className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                    {activeProject.category}
                  </span>
                  <h3 className="text-base font-bold text-white">{activeProject.title} Case Study</h3>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center cursor-pointer transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Story content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 select-text">
                {/* Visual Banner */}
                <div className="h-56 md:h-72 w-full rouned-xl overflow-hidden relative shadow-lg rounded-xl">
                  <img src={activeProject.thumbnail} alt={activeProject.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] to-transparent" />
                </div>

                {/* Subgrid with problem vs solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0b101c] p-5 rounded-xl border border-white/5">
                    <span className="text-[10px] uppercase font-mono font-bold text-pink-400">Problem statement</span>
                    <h4 className="text-sm font-bold text-white mt-1 mb-2">The Critical Bottleneck</h4>
                    <p className="text-xs text-white/50 leading-relaxed">{activeProject.problem}</p>
                  </div>
                  <div className="bg-[#0b101c] p-5 rounded-xl border border-white/5">
                    <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">Implemented Solution</span>
                    <h4 className="text-sm font-bold text-white mt-1 mb-2">Architectural Engineering</h4>
                    <p className="text-xs text-white/50 leading-relaxed">{activeProject.solution}</p>
                  </div>
                </div>

                {/* Performance KPIs row */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-white/40 tracking-wider mb-3">PRODUCTION DELIVERABLES</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {activeProject.metrics.map((m, idx) => (
                      <div key={idx} className="bg-[#03060a] border border-white/5 p-4 rounded-xl text-center shadow-inner">
                        <p className="text-xl md:text-2xl font-black text-[var(--accent)]">{m.value}</p>
                        <p className="text-[9px] uppercase font-mono text-white/40 mt-1 tracking-wide">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deep engineering details */}
                <div className="bg-[#03060a] border border-white/5 p-5 rounded-xl space-y-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-pink-400 tracking-wider flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" /> Core Systems & Architecture Paradigm
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed mt-1.5">{activeProject.architecture}</p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-xs font-mono uppercase text-yellow-400 tracking-wider flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Chief Technical Challenges Resolved
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed mt-1.5">{activeProject.challenges}</p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-1">
                       Project outcomes & analytics
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed mt-1.5">{activeProject.results}</p>
                  </div>
                </div>

                {/* Tech specifications stack tags */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-white/40 tracking-wider mb-2">COMPETENCIES EMPLOYED</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.map((tech, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/5 text-white/80 py-1 px-2.5 rounded-lg text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct case resource operations footer */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5 flex-wrap">
                  {activeProject.github && (
                    <a 
                      href={activeProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#0c1222] hover:bg-[#121c33] border border-white/10 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1 hover:border-[var(--accent)]/40 transition-all cursor-pointer"
                    >
                      <Code className="w-4 h-4 text-[var(--accent)]" /> View Repository Source
                    </a>
                  )}

                  {activeProject.demoUrl && (
                    <a 
                      href={activeProject.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[var(--accent)] hover:opacity-90 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1 hover:scale-105 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 stroke-[2.5px]" /> Launch Live App Instance
                    </a>
                  )}
                </div>
              </div>

              {/* Lower info notes */}
              <div className="p-4 bg-[#03060a] border-t border-white/5 rounded-b-2xl text-center text-[10px] font-mono text-white/30">
                Authorized development documentation by Dharmesh Ahir. All rights reserved.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- SUB-COMPONENT: 3D-ROTATABLE SYSTEM DESIGN CANVAS (DRAG TO ROTATE PARADIGM) ---
const SystemDesignLabCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0.35, y: -0.65 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // System Design Architecture nodes
  const nodes = [
    { id: 'ui', label: 'Flutter UI Components', x: 0, y: -90, z: 0, color: '#00e5ff', desc: 'Renders high-frequency widget collections safely at 60-120fps.' },
    { id: 'bloc', label: 'BLoC Controller Paradigm', x: -100, y: 0, z: 20, color: '#ff5722', desc: 'Synchronizes event streams and maps outputs.' },
    { id: 'repo', label: 'Sound Repository Hub', x: 0, y: 30, z: -50, color: '#e82127', desc: 'Siphons actions between cloud channels and offline local caches.' },
    { id: 'sqlite', label: 'HiveDB / SQLite Storage', x: -80, y: 80, z: -20, color: '#d500f9', desc: 'Offline local data store with transactional reliability.' },
    { id: 'cloud', label: 'Firebase Firestore DB', x: 100, y: 10, z: 0, color: '#00e676', desc: 'Cloud hosted remote live sync collection database.' },
    { id: 'webrtc', label: 'WebRTC Peer Session', x: 60, y: -60, z: 60, color: '#ffcd3c', desc: 'Encrypted low-latency audio & video streaming consultation pipelines.' }
  ];

  // Draw nodes on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let autoRotateAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Projection calculations & rotations
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y + autoRotateAngle);
      const sinY = Math.sin(rotation.y + autoRotateAngle);

      autoRotateAngle += 0.003; // Slowly orbit automatically when idle

      // Project coordinates helper
      const project = (x: number, y: number, z: number) => {
        // Rotate Y Axis
        const yRotX = x * cosY - z * sinY;
        const yRotZ = x * sinY + z * cosY;

        // Rotate X Axis
        const xRotY = y * cosX - yRotZ * sinX;
        const xRotZ = y * sinX + yRotZ * cosX;

        // Perspective zoom scaling factor
        const focalLength = 190;
        const scale = focalLength / (focalLength + xRotZ);
        
        return {
          px: cx + yRotX * scale,
          py: cy + xRotY * scale,
          depth: xRotZ,
          scale
        };
      };

      // 1. Draw connection pipes lines
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      
      const connections = [
        ['ui', 'bloc'],
        ['bloc', 'repo'],
        ['repo', 'sqlite'],
        ['repo', 'cloud'],
        ['ui', 'webrtc'],
        ['webrtc', 'repo']
      ];

      connections.forEach(([n1Id, n2Id]) => {
        const node1 = nodes.find(n => n.id === n1Id);
        const node2 = nodes.find(n => n.id === n2Id);
        if (node1 && node2) {
          const pt1 = project(node1.x, node1.y, node1.z);
          const pt2 = project(node2.x, node2.y, node2.z);
          ctx.beginPath();
          ctx.moveTo(pt1.px, ptpt2Position(node1, pt1, pt2, ctx));
          ctx.lineTo(pt2.px, pt2.py);
          ctx.stroke();
        }
      });

      // Special helper for connecting lines gradient drawing
      function ptpt2Position(n1: any, pt1: any, pt2: any, context: CanvasRenderingContext2D) {
        const grad = context.createLinearGradient(pt1.px, pt1.py, pt2.px, pt2.py);
        grad.addColorStop(0, n1.color + '33');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.03)');
        context.strokeStyle = grad;
        return pt1.py;
      }

      // 2. Draw nodes circles ordered by depth details
      const projectedNodes = nodes.map(n => ({
        ...n,
        ...project(n.x, n.y, n.z)
      })).sort((a, b) => b.depth - a.depth);

      projectedNodes.forEach(node => {
        const radius = Math.max(4, (hoveredNode === node.id ? 22 : 16) * node.scale);
        
        // Background glow
        ctx.beginPath();
        ctx.arc(node.px, node.py, radius * 1.8, 0, 2 * Math.PI);
        ctx.fillStyle = node.color + '1A';
        ctx.fill();

        // Outline ring
        ctx.beginPath();
        ctx.arc(node.px, node.py, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#060a12';
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = hoveredNode === node.id ? 3 : 1.5;
        ctx.stroke();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.px, node.py, radius * 0.3, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Title text labels
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.px, node.py - radius - 6);
      });

      animFrame = requestAnimationFrame(render);
    };

    render();

    // Mouse interactive handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isDragging.current) {
        const deltaX = e.clientX - previousMousePosition.current.x;
        const deltaY = e.clientY - previousMousePosition.current.y;

        setRotation(prev => ({
          x: Math.max(-1.2, Math.min(1.2, prev.x + deltaY * 0.007)),
          y: prev.y + deltaX * 0.007
        }));

        previousMousePosition.current = { x: e.clientX, y: e.clientY };
      } else {
        // Evaluate hover state
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        let hitNodeId: string | null = null;

        for (let node of nodes) {
          const yRotX = node.x * cosY - node.z * sinY;
          const yRotZ = node.x * sinY + node.z * cosY;
          const xRotY = node.y * cosX - yRotZ * sinX;
          const xRotZ = node.y * sinX + yRotZ * cosX;
          const scale = 190 / (190 + xRotZ);
          const px = cx + yRotX * scale;
          const py = cy + xRotY * scale;

          const dist = Math.hypot(mouseX - px, mouseY - py);
          if (dist < 20 * scale) {
            hitNodeId = node.id;
            break;
          }
        }

        setHoveredNode(hitNodeId);
      }
    };

    const handleMouseUp = () => isDragging.current = false;

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      cancelAnimationFrame(animFrame);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [rotation, hoveredNode]);

  // Handle high resolution canvas responsive size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = canvas.parentElement?.clientHeight || 400;
  }, []);

  const activeHoverDetails = nodes.find(n => n.id === hoveredNode);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block cursor-grab active:cursor-grabbing" 
      />
      
      {/* Node Description overlay */}
      <AnimatePresence>
        {activeHoverDetails && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 right-4 bg-black/90 p-3 rounded-lg border border-white/10 z-20 text-xs shadow-xl"
          >
            <p className="font-extrabold flex items-center gap-1" style={{ color: activeHoverDetails.color }}>
              ✦ {activeHoverDetails.label}
            </p>
            <p className="text-white/60 text-[11px] mt-1 pr-6 leading-relaxed">{activeHoverDetails.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-white/50 border border-white/5 pointer-events-none select-none">
        DRAG WITH MOUSE TO ROTATE ENGINE IN 3D
      </div>
    </>
  );
};

// --- SUB-COMPONENT: PORTFOLIO WIDGET MUSEUM ---
const WidgetMuseumComponent: React.FC = () => {
  const [activeWidget, setActiveWidget] = useState<'clock' | 'counter' | 'gauge' | 'canvas' | 'stateflow'>('clock');
  
  // Widget 1: State Counter
  const [counter, setCounter] = useState(0);

  // Widget 2: Custom Speedometer State
  const [speedVal, setSpeedVal] = useState(60);

  // Widget 3: Live Custom Watch UTC clock
  const [liveStamp, setLiveStamp] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => setLiveStamp(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Widget 4: Draw Canvas Board
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  // Widget 5: State Flow Blueprint
  const [activeParadigm, setActiveParadigm] = useState<'bloc' | 'riverpod' | 'getx'>('bloc');
  const [flowStep, setFlowStep] = useState<number>(-1);
  const [isFlowAnimating, setIsFlowAnimating] = useState<boolean>(false);

  const triggerFlowAnimation = () => {
    if (isFlowAnimating) return;
    setIsFlowAnimating(true);
    setFlowStep(0);
    playSystemTick(420, 0.08);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step > 4) {
        clearInterval(interval);
        setIsFlowAnimating(false);
        setFlowStep(-1);
        playSystemTick(880, 0.12);
      } else {
        setFlowStep(step);
        playSystemTick(420 + step * 110, 0.08);
      }
    }, 1000);
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }, [activeWidget]);

  const drawOnCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (e.type === 'mousedown') {
      isDrawing.current = true;
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (e.type === 'mousemove' && isDrawing.current) {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (e.type === 'mouseup' || e.type === 'mouseleave') {
      isDrawing.current = false;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Visual Navigation Tabs */}
      <div className="space-y-2 bg-[#060a12] p-3 rounded-2xl border border-white/5">
        {[
          { id: 'clock', label: 'Live Precision Timepiece', subtitle: 'Standard Chrono Synchronizer', icon: Laptop },
          { id: 'counter', label: 'Sound Event BLoC Counter', subtitle: 'Visual Audio Signal Generator', icon: Award },
          { id: 'gauge', label: 'Interactive Frame Gauge', subtitle: '60fps Tuning Slider', icon: Sliders },
          { id: 'canvas', label: '2D Pixel Sketch Canvas', subtitle: 'Custom Sketch Painter Pad', icon: Cpu },
          { id: 'stateflow', label: 'State Paradigm Flowchart', subtitle: 'Unidirectional stream logs', icon: Network }
        ].map((w) => {
          const Icon = w.icon;
          return (
            <button
              key={w.id}
              onClick={() => { setActiveWidget(w.id as any); playSystemTick(620, 0.05); }}
              className={`w-full text-left p-3 rounded-xl cursor-pointer transition-all border ${
                activeWidget === w.id 
                  ? 'bg-neutral-900 border-[var(--accent)] text-[var(--accent)] font-bold' 
                  : 'border-transparent text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4.5 h-4.5" />
                <span className="text-xs font-bold text-white block leading-none">{w.label}</span>
              </div>
              <span className="text-[9px] font-mono text-white/30 block mt-1 tracking-wide uppercase">{w.subtitle}</span>
            </button>
          );
        })}
      </div>

      {/* Reactive Sandbox rendering workspace */}
      <div className="lg:col-span-3 bg-[#03060a] border border-white/5 rounded-2xl p-6 min-h-[300px] flex flex-col justify-between shadow-inner relative">
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          
          {/* Widget 1 Clock Layout */}
          {activeWidget === 'clock' && (
            <div className="text-center space-y-4">
              <span className="text-[10px] uppercase font-mono bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-400/20 font-bold tracking-widest">
                SYSTEM UTC CLOCK ACTIVE
              </span>
              <div className="text-4xl md:text-5xl font-black font-mono tracking-wider text-slate-100 bg-white/5 p-6 rounded-2xl border border-white/5 shadow-inner">
                {liveStamp}
              </div>
              <span className="text-xs text-white/40 block">Ticks every second with synchronous epoch triggers.</span>
            </div>
          )}

          {/* Widget 2 Counter Layout */}
          {activeWidget === 'counter' && (
            <div className="text-center space-y-6">
              <div className="text-3xl md:text-5xl font-bold font-mono text-white p-4">
                BLoC Value: <span className="text-pink-500 font-black">{counter}</span>
              </div>
              
              <div className="flex items-center gap-3 justify-center">
                <button
                  onClick={() => { setCounter(prev => prev - 1); playSystemTick(400, 0.06); }}
                  className="px-4 py-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 text-xs font-bold rounded-lg cursor-pointer transition-all"
                >
                  Decrement Signal
                </button>
                <button
                  onClick={() => { setCounter(prev => prev + 1); playSystemTick(700, 0.06); }}
                  className="px-5 py-2.5 bg-pink-500 hover:bg-pink-400 text-black text-xs font-black rounded-lg cursor-pointer hover:scale-105 transition-all"
                >
                  Dispatch State Event (+)
                </button>
              </div>
            </div>
          )}

          {/* Widget 3 Gauge Slider */}
          {activeWidget === 'gauge' && (
            <div className="w-full max-w-sm space-y-4 text-center">
              <span className="text-xs text-white/40 block font-mono">FRAME INTERVAL SPECS: <span className="text-[var(--accent)] font-bold">{speedVal} FPS</span></span>
              
              <input
                type="range"
                min="10"
                max="120"
                value={speedVal}
                onChange={(e) => {
                  setSpeedVal(Number(e.target.value));
                  playSystemTick(200 + Number(e.target.value)*4, 0.02);
                }}
                className="w-full h-1 bg-white/10 accent-[var(--accent)] rounded-lg cursor-pointer"
              />

              <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex gap-2 justify-center items-center">
                <div className="h-4 w-4 bg-[var(--accent)] rounded-full animate-ping" style={{ animationDuration: `${(150 - speedVal) * 5}ms` }} />
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/60">Dynamic Interval Oscillator</span>
              </div>
            </div>
          )}

          {/* Widget 4 Sketch Pad */}
          {activeWidget === 'canvas' && (
            <div className="w-full max-w-md h-[220px] bg-black rounded-xl border border-white/10 relative overflow-hidden group shadow-inner">
              <canvas
                ref={canvasRef}
                onMouseDown={drawOnCanvas}
                onMouseMove={drawOnCanvas}
                onMouseUp={drawOnCanvas}
                onMouseLeave={drawOnCanvas}
                width={400}
                height={220}
                className="w-full h-full block cursor-crosshair"
              />
              <span className="absolute bottom-2 right-2 text-[9px] font-mono text-white/30 bg-black/60 px-2 py-0.5 rounded pointer-events-none uppercase">
                Drag to Draw Clean Pixels
              </span>
            </div>
          )}

          {/* Widget 5: State Paradigm Flowchart */}
          {activeWidget === 'stateflow' && (
            <div className="w-full space-y-6">
              <div className="flex justify-center gap-2 bg-[#090e1a] p-1 rounded-xl border border-white/5 max-w-md mx-auto">
                {[
                  { id: 'bloc', label: 'BLoC Pattern', color: 'border-orange-500 text-orange-400 bg-orange-500/5' },
                  { id: 'riverpod', label: 'Riverpod', color: 'border-teal-400 text-teal-300 bg-teal-400/5' },
                  { id: 'getx', label: 'GetX Framework', color: 'border-purple-400 text-purple-300 bg-purple-400/5' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setActiveParadigm(p.id as any); setFlowStep(-1); playSystemTick(520, 0.05); }}
                    className={`flex-1 text-[11px] font-semibold py-1.5 px-3 rounded-lg cursor-pointer transition-all border ${
                      activeParadigm === p.id 
                        ? p.color + ' font-bold ring-1 ring-white/10' 
                        : 'border-transparent text-white/40 hover:text-white/70'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Flow nodes chain */}
              <div className="grid grid-cols-5 gap-2 md:gap-4 items-center bg-black/40 p-4 rounded-xl border border-white/5 relative">
                {[
                  { 
                    index: 0,
                    label: 'User Action', 
                    bloc: 'UI triggers Event',
                    riverpod: 'UI requests Ref',
                    getx: 'UI execution call'
                  },
                  { 
                    index: 1,
                    label: 'Input Pipe', 
                    bloc: 'Stream Controller',
                    riverpod: 'StateNotifier lookup',
                    getx: 'Rx controller update'
                  },
                  { 
                    index: 2,
                    label: 'Business Block', 
                    bloc: 'mapEventToState()',
                    riverpod: 'State reduction logic',
                    getx: 'Reactive Rx mutation'
                  },
                  { 
                    index: 3,
                    label: 'State Pipeline', 
                    bloc: 'State Broadcaster',
                    riverpod: 'Notifier listener',
                    getx: 'Observer stream'
                  },
                  { 
                    index: 4,
                    label: 'Output HUD', 
                    bloc: 'BlocBuilder dynamic repaint',
                    riverpod: 'Consumer Widget',
                    getx: 'UI Obx() rebuild'
                  }
                ].map((node, i) => {
                  const isActive = flowStep === i;
                  const isPast = flowStep > i;
                  return (
                    <div key={node.index} className="flex flex-col items-center text-center relative">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs ring-2 transition-all duration-300 ${
                          isActive 
                            ? 'bg-[var(--accent)] text-black ring-[var(--accent)] scale-110 shadow-[0_0_15px_var(--accent)]' 
                            : isPast 
                              ? 'bg-[var(--accent)]/20 text-[var(--accent)] ring-[var(--accent)]/40' 
                              : 'bg-white/5 text-white/30 ring-white/10'
                        }`}
                      >
                        {i + 1}
                      </div>

                      <span className="text-[9px] font-mono font-bold text-white/80 mt-2 block whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                        {node.label}
                      </span>
                      
                      <span className="text-[8px] font-sans text-white/40 mt-1 block leading-none max-w-[80px] h-6 overflow-hidden">
                        {activeParadigm === 'bloc' ? node.bloc : activeParadigm === 'riverpod' ? node.riverpod : node.getx}
                      </span>
                    </div>
                  );
                })}

                {/* Animated progress beam overlay */}
                {isFlowAnimating && (
                  <div 
                    className="absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-white/10 -z-10"
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 4.8, ease: 'linear' }}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={triggerFlowAnimation}
                  disabled={isFlowAnimating}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-mono font-bold rounded-lg border border-[var(--accent)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  {isFlowAnimating ? 'SYNCHRONIZING STEAM LOOPS...' : 'BEGIN SIMULATED EVENT FLOW'}
                </button>
              </div>
            </div>
          )}

        </div>

        <div className="text-center text-[10px] font-mono text-white/30 border-t border-white/5 pt-3 mt-4">
          Visual React elements mapped and matched to Flutter custom layouts perfectly.
        </div>
      </div>

    </div>
  );
};

// --- SUB-COMPONENT: COGNITIVE DNA RADAR CANVAS ---
const DNAMapCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 380;
    canvas.height = 300;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 100;

    // 5 dimensions of expertise
    const dimensions = [
      { label: 'UI Flow Rate (FPS)', value: 98, color: '#00e5ff' },
      { label: 'BLoC Event Machines', value: 95, color: '#ff5722' },
      { label: 'Isolate Multi-threading', value: 85, color: '#e82127' },
      { label: 'Offline Sync repositories', value: 92, color: '#d500f9' },
      { label: 'Sound WebRTC encryption', value: 88, color: '#00e676' }
    ];

    const render = () => {
      ctx.clearRect(0,0, canvas.width, canvas.height);

      // Draw concentric rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 4) * i, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Draw axis lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      dimensions.forEach((_, idx) => {
        const angle = (Math.PI * 2 / dimensions.length) * idx - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
        ctx.stroke();
      });

      // Plot radar polygon points
      ctx.beginPath();
      dimensions.forEach((dim, idx) => {
        const angle = (Math.PI * 2 / dimensions.length) * idx - Math.PI / 2;
        const dist = (dim.value / 100) * radius;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist;
        if (idx === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Plot dots & text labels
      dimensions.forEach((dim, idx) => {
        const angle = (Math.PI * 2 / dimensions.length) * idx - Math.PI / 2;
        const dist = (dim.value / 100) * radius;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist;

        // Custom dot pointer
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, 2 * Math.PI);
        ctx.fillStyle = dim.color;
        ctx.fill();

        // Label alignment parameters
        const tx = cx + Math.cos(angle) * (radius + 20);
        const ty = cy + Math.sin(angle) * (radius + 15);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${dim.label} (${dim.value}%)`, tx, ty);
      });
    };

    render();
  }, []);

  return (
    <canvas ref={canvasRef} className="max-w-full aspect-square" />
  );
};

// --- SUB-COMPONENT: PORTFOLIO HEATMAP GRAPH ---
const AnalyticsGraphComponent: React.FC = () => {
  return (
    <div className="h-[240px] w-full flex flex-col justify-between">
      
      {/* Wave Grid Visual representations */}
      <div className="flex-1 flex gap-2 items-end justify-between border-b border-white/10 pb-4 h-[200px]">
        {[45, 60, 52, 90, 80, 110, 95, 120, 105, 140, 130, 160].map((h, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
            <div className="text-[9px] font-mono text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {h}k
            </div>
            <div 
              className="w-full bg-gradient-to-t from-[var(--accent)]/40 to-[var(--accent)] rounded transition-all duration-500 overflow-hidden" 
              style={{ height: `${(h / 160) * 140}px` }} 
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[9px] font-mono text-white/30 pt-3">
        <span>JUN 2025</span>
        <span>AUG 2025</span>
        <span>OCT 2025</span>
        <span>DEC 2025</span>
        <span>FEB 2026</span>
        <span>APR 2026</span>
        <span>MAY 2026 (ACTIVE)</span>
      </div>

    </div>
  );
};
