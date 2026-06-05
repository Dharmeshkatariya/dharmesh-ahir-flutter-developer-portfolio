import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, X, Sparkles, Folder, FileText, Award, Layers, Palette, Terminal, 
  ArrowRight, Download, Mail, Github, Linkedin, AudioLines, Monitor, Cpu
} from 'lucide-react';
import { Project, ThemeType, LayoutType, BlogPost, AchievementBadge } from '../types';
import { projectsData, blogPosts, achievementBadges } from '../data';

interface SpotlightOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeChange: (t: ThemeType) => void;
  onLayoutChange: (l: LayoutType) => void;
  onInspectProject: (p: Project) => void;
  onChatPrompt: (q: string) => void;
  onDownloadResume: () => void;
  onContactTrigger: () => void;
  playBeep: (freq: number, dur: number) => void;
  currentTheme: ThemeType;
  currentLayout: LayoutType;
}

export const SpotlightOverlay: React.FC<SpotlightOverlayProps> = ({
  isOpen,
  onClose,
  onThemeChange,
  onLayoutChange,
  onInspectProject,
  onChatPrompt,
  onDownloadResume,
  onContactTrigger,
  playBeep,
  currentTheme,
  currentLayout
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'commands' | 'projects' | 'blogs' | 'skills' | 'achievements'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Optional Adaptive Audio FX preferences
  const [audioFx, setAudioFx] = useState(() => {
    try {
      const saved = localStorage.getItem('sound_effects_enabled');
      return saved ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const toggleAudioFx = () => {
    const nextVal = !audioFx;
    setAudioFx(nextVal);
    localStorage.setItem('sound_effects_enabled', JSON.stringify(nextVal));
    playLocalBeep(nextVal ? 640 : 500, 0.08);
  };

  const playLocalBeep = (freq: number, dur: number) => {
    if (audioFx) {
      playBeep(freq, dur);
    }
  };

  // Keyboard shortcut listener (⌘K, Ctrl+K, /)
  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if ((e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        playLocalBeep(523, 0.08);
        if (isOpen) {
          onClose();
        } else {
          // Focus input shortly after mounting
          setTimeout(() => inputRef.current?.focus(), 50);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDownGlobal);
    return () => window.removeEventListener('keydown', handleKeyDownGlobal);
  }, [isOpen]);

  // Refocus input whenever spotlight opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Track cursor on dialog to generate premium light reflection
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Static commands index
  const systemCommands = [
    { id: 'mode-dev', name: 'Open IDE Developer Workspace', desc: 'Mock IDE, custom compilers, system indicators', category: 'Perspective', action: () => { onLayoutChange('developer-dashboard'); onClose(); } },
    { id: 'mode-rec', name: 'Activate Recruiter HR Platform', desc: 'Hiring readiness dashboard & candidate summary keynotes', category: 'Perspective', action: () => { onLayoutChange('left-sidebar'); onChatPrompt('Show Recruiter executive skills summary'); onClose(); } },
    { id: 'mode-fnd', name: 'Load Founder KPI Dashboard', desc: 'Business value indicators & delivery velocities', category: 'Perspective', action: () => { onLayoutChange('glassmorphism-studio'); onChatPrompt('Display startup values assessment'); onClose(); } },
    { id: 'layout-classic', name: 'Switch style: Classic Dock Layout', desc: 'Floating navigation panel with clean responsive flows', category: 'LayoutStyle', action: () => { onLayoutChange('classic'); onClose(); } },
    { id: 'layout-clean', name: 'Switch style: Apple Clean Minimalist', desc: 'Elegant typography grids with maximum negative spaces', category: 'LayoutStyle', action: () => { onLayoutChange('apple-minimal'); onClose(); } },
    { id: 'layout-editorial', name: 'Switch style: Editorial Portfolio Mag', desc: 'Newspaper columns, modular details and split frames', category: 'LayoutStyle', action: () => { onLayoutChange('interactive-magazine'); onClose(); } },
    { id: 'layout-story', name: 'Switch style: Screen Scroll Narrative', desc: 'Full-bleed storytelling sections synced to scrollbars', category: 'LayoutStyle', action: () => { onLayoutChange('fullscreen-scroll-story'); onClose(); } },
    { id: 'theme-sunset', name: 'Theme palette: Sunset Orange Glow', desc: 'Warm active indicators and cosmic dark backdrops', category: 'ThemeConfig', action: () => { onThemeChange('sunset'); onClose(); } },
    { id: 'theme-cyber', name: 'Theme palette: Cyberpunk Neon Hue', desc: 'Electrifying fuchsia outlines and neon radar waves', category: 'ThemeConfig', action: () => { onThemeChange('cyberpunk'); onClose(); } },
    { id: 'theme-nord', name: 'Theme palette: Nord Snowy Calm', desc: 'Chilled polar silvers and pastel cyan state lights', category: 'ThemeConfig', action: () => { onThemeChange('nord'); onClose(); } },
    { id: 'theme-tesla', name: 'Theme palette: Tesla Obsidian Matte', desc: 'Pure black carbon panels with crisp electric whites', category: 'ThemeConfig', action: () => { onThemeChange('tesla-black'); onClose(); } },
    { id: 'theme-apple', name: 'Theme palette: Apple Light Ceramic', desc: 'High-contrast studio polar lights and obsidian text', category: 'ThemeConfig', action: () => { onThemeChange('apple-white'); onClose(); } },
    { id: 'action-resume', name: 'Propagate direct PDF resume download', desc: 'Download modern Dharmesh_Ahir_Resume.pdf locally', category: 'Operational', action: () => { onDownloadResume(); onClose(); } },
    { id: 'action-ask', name: 'Initiate AI consultation query...', desc: 'Send customized questions to companion copilot companion', category: 'Operational', action: () => { onChatPrompt(''); onClose(); setTimeout(() => { window.dispatchEvent(new CustomEvent('open_ai_chat')); }, 120); } },
    { id: 'action-github', name: 'Access GitHub repository indexes', desc: 'Review latest codebases, Flutter plugins, and architectures', category: 'External', action: () => { window.open('https://github.com/Dharmeshkatariya', '_blank'); onClose(); } },
    { id: 'action-linkedin', name: 'Connect on LinkedIn network', desc: 'Network directly with Dharmesh Ahir on professional streams', category: 'External', action: () => { window.open('https://linkedin.com/in/dharmesh-ahir', '_blank'); onClose(); } }
  ];

  // Static skills index
  const skillsList = [
    { id: 'sk-flutter', name: 'Flutter Web/Mobile development', desc: 'Expert cross-platform compiles, isolating threads, rendering 120fps pipelines', category: 'Core Expert' },
    { id: 'sk-webrtc', name: 'HIPAA-Compliant WebRTC Stream sync', desc: 'STUN/TURN peers, buffer management, teleconsultation relays', category: 'Stream Expert' },
    { id: 'sk-state', name: 'State Sovereignty (BLoC, Riverpod, GetX)', desc: 'MVC repository wraps, dependency injectors, complex reactive boards', category: 'Architecture' },
    { id: 'sk-offline', name: 'Offline-First Local DB Sync engines', desc: 'Hive wrappers, local SQLite query optimizations, transactional conflict resolves', category: 'Data Expert' },
    { id: 'sk-firebase', name: 'Serverless architecture (Firebase/Firestore)', desc: 'Live database triggers, security rules audit, cloud buckets', category: 'Cloud Expert' },
    { id: 'sk-system', name: 'Cross-platform native bridges', desc: 'Native Java/Kotlin plugins, Swift native bindings, isolate pipelines', category: 'Native Bridge' }
  ];

  // Consolidate searchable indices
  const getFilteredItems = () => {
    const q = query.toLowerCase().trim();

    // 1. Filter Commands
    const filteredCmds = systemCommands.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.desc.toLowerCase().includes(q) || 
      c.category.toLowerCase().includes(q)
    );

    // 2. Filter Projects
    const filteredProjs = projectsData.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.problem.toLowerCase().includes(q) || 
      p.solution.toLowerCase().includes(q) || 
      p.techStack.some(t => t.toLowerCase().includes(q))
    );

    // 3. Filter Blogs
    const filteredBlogs = blogPosts.filter(b => 
      b.title.toLowerCase().includes(q) || 
      b.summary.toLowerCase().includes(q) || 
      b.category.toLowerCase().includes(q)
    );

    // 4. Filter Skills
    const filteredSkills = skillsList.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.desc.toLowerCase().includes(q) || 
      s.category.toLowerCase().includes(q)
    );

    // 5. Filter Achievements
    const filteredBadges = achievementBadges.filter(a => 
      a.name.toLowerCase().includes(q) || 
      a.description.toLowerCase().includes(q)
    );

    let list: any[] = [];

    if (activeCategory === 'all' || activeCategory === 'commands') {
      list = [...list, ...filteredCmds.map(item => ({ ...item, type: 'command', icon: Terminal, badge: 'CMD', color: 'text-purple-400' }))];
    }
    if (activeCategory === 'all' || activeCategory === 'projects') {
      list = [...list, ...filteredProjs.map(item => ({ id: item.id, name: item.title, desc: item.problem, type: 'project', data: item, icon: Folder, badge: 'PROJECT', color: 'text-amber-400' }))];
    }
    if (activeCategory === 'all' || activeCategory === 'blogs') {
      list = [...list, ...filteredBlogs.map(item => ({ id: item.id, name: item.title, desc: item.summary, type: 'blog', data: item, icon: FileText, badge: 'BLOG', color: 'text-sky-400' }))];
    }
    if (activeCategory === 'all' || activeCategory === 'skills') {
      list = [...list, ...filteredSkills.map(item => ({ id: item.id, name: item.name, desc: item.desc, type: 'skill', icon: Cpu, badge: 'SKILL', color: 'text-emerald-400' }))];
    }
    if (activeCategory === 'all' || activeCategory === 'achievements') {
      list = [...list, ...filteredBadges.map(item => ({ id: item.id, name: item.name, desc: item.description, type: 'achievement', icon: Award, badge: 'MEDAL', color: 'text-yellow-400' }))];
    }

    return list;
  };

  const filteredItems = getFilteredItems();

  // Keyboard navigation inside result list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      playLocalBeep(330, 0.02);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      playLocalBeep(380, 0.02);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelectItem(filteredItems[selectedIndex]);
      }
    }
  };

  const handleSelectItem = (item: any) => {
    playLocalBeep(880, 0.15);
    
    // Log active search to unified system activity
    try {
      const activityLog = JSON.parse(localStorage.getItem('system_activity_log') || '[]');
      activityLog.unshift({
        timestamp: new Date().toISOString(),
        action: `Universal Search Execute: Triggered item [${item.name}]`,
        details: `Type: ${item.type} | Filter: ${activeCategory}`
      });
      localStorage.setItem('system_activity_log', JSON.stringify(activityLog.slice(0, 50)));
      window.dispatchEvent(new Event('activity_log_updated'));
    } catch {
      // safe bypass
    }

    if (item.type === 'command') {
      item.action();
    } else if (item.type === 'project') {
      onInspectProject(item.data);
      onClose();
    } else if (item.type === 'blog') {
      // Pre-prompt AI to display summary of the selected blog post
      onChatPrompt(`Please summarize your publication titled "${item.name}"`);
      onClose();
    } else if (item.type === 'skill') {
      onChatPrompt(`Explain your professional expertise in: ${item.name}`);
      onClose();
    } else if (item.type === 'achievement') {
      onChatPrompt(`How did you unlock the "${item.name}" badge?`);
      onClose();
    }
  };

  // Reset indices on query or filter shift
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[3000] bg-black/75 backdrop-blur-md flex items-start justify-center p-4 pt-16 md:pt-28 select-none"
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop Close Click */}
          <div className="absolute inset-0 z-0 bg-transparent" onClick={onClose} />

          {/* Spotlight dialog frame */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, scale: 0.96, y: -20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.96, y: -20, filter: 'blur(5px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="w-full max-w-2xl bg-neutral-950/90 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative z-10 font-sans backdrop-blur-xl"
            style={{
              boxShadow: '0 30px 70px rgba(0,0,0,0.9), 0 0 40px rgba(224,64,251,0.03)'
            }}
          >
            {/* Ambient dynamic cursor gradient refraction inside spotlight */}
            <div 
              className="absolute pointer-events-none rounded-full blur-[80px]"
              style={{
                width: '180px',
                height: '180px',
                left: `${mousePos.x - 90}px`,
                top: `${mousePos.y - 90}px`,
                background: 'radial-gradient(circle, var(--accent) 0%, rgba(139, 92, 246, 0.15) 100%)',
                opacity: 0.14,
                transition: 'opacity 0.3s'
              }}
            />

            {/* Spotlight header input search zone */}
            <div className="flex items-center gap-4.5 px-5 py-4 border-b border-white/[0.08] relative z-10 bg-neutral-950/80">
              <Search className="w-5 h-5 text-white/50 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, achievements, command presets (⌘K /)..."
                className="w-full bg-transparent border-none text-white outline-none text-sm placeholder-white/30 font-sans tracking-wide pr-4"
              />
              
              <div className="flex items-center gap-2">
                {/* Adaptive Audio Toggle Icon */}
                <button 
                  onClick={toggleAudioFx}
                  className={`p-1.5 rounded-lg border flex items-center justify-center transition-all ${audioFx ? 'bg-[var(--accent)]/15 border-[var(--accent)]/30 text-[var(--accent)]' : 'bg-black/40 border-white/5 text-white/30 hover:text-white/60'}`}
                  title={audioFx ? "Sfx feedback active" : "Audio sfx standard quiet"}
                >
                  <AudioLines className="w-3.5 h-3.5" />
                </button>

                <button 
                  onClick={onClose}
                  className="p-1.5 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-all transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category tabs filters */}
            <div className="flex gap-1.5 px-4 py-2 border-b border-white/[0.04] overflow-x-auto bg-neutral-950/40 shrink-0 relative z-10 relative">
              {[
                { id: 'all', label: 'All Indices' },
                { id: 'commands', label: 'Commands / Modes' },
                { id: 'projects', label: 'Case Studies' },
                { id: 'skills', label: 'Expertise' },
                { id: 'blogs', label: 'Publications' },
                { id: 'achievements', label: 'Badges' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id as any); playLocalBeep(450, 0.02); }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider font-bold uppercase transition-all whitespace-nowrap shrink-0 border ${
                    activeCategory === cat.id 
                      ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)] font-extrabold shadow-sm' 
                      : 'bg-black/30 border-transparent text-white/50 hover:text-white/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Results body section with unified scroll state */}
            <div className="max-h-[350px] overflow-y-auto p-2.5 relative z-10 font-sans space-y-1 scrollbar-thin">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {
                  const ItemIcon = item.icon || Terminal;
                  const isSel = idx === selectedIndex;
                  return (
                    <div
                      key={item.id || idx}
                      onMouseEnter={() => { setSelectedIndex(idx); playLocalBeep(320, 0.01); }}
                      onClick={() => handleSelectItem(item)}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-4 border relative group/entry ${
                        isSel 
                          ? 'bg-gradient-to-r from-white/[0.04] to-transparent border-white/10 shadow-lg' 
                          : 'bg-transparent border-transparent'
                      }`}
                    >
                      {/* Active glowing accent border overlay */}
                      {isSel && (
                        <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-[var(--accent)] rounded-r" />
                      )}

                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`p-2 rounded-xl bg-white/5 border border-white/5 ${item.color || 'text-white/70'} flex shrink-0 justify-center items-center ${isSel ? 'scale-105 border-white/15' : 'scale-100'}`}>
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-black tracking-wide text-white font-sans truncate">{item.name}</span>
                            <span className={`text-[8px] font-extrabold px-1.5 py-0.2 rounded-md font-mono border select-none ${
                              item.badge === 'CMD' ? 'bg-purple-950/30 border-purple-500/20 text-purple-400' :
                              item.badge === 'PROJECT' ? 'bg-amber-950/30 border-amber-500/20 text-amber-400' :
                              item.badge === 'BLOG' ? 'bg-sky-950/30 border-sky-500/20 text-sky-400' :
                              'bg-emerald-900/20 border-emerald-500/20 text-emerald-400'
                            }`}>
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[9.5px] text-white/50 font-mono tracking-tight mt-1 truncate max-w-[420px]">{item.desc}</p>
                        </div>
                      </div>

                      {/* Unified spring visual indicator on hover */}
                      <AnimatePresence>
                        {isSel && (
                          <motion.div 
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            className="flex items-center gap-2 font-mono text-[9px] text-[var(--accent)] font-extrabold"
                          >
                            <span>SELECT</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-white/30 font-sans">
                  <Monitor className="w-8 h-8 text-white/10 animate-pulse" />
                  <span className="text-xs font-mono">No indices match your prompt query.</span>
                  <span className="text-[10px] text-white/20 font-mono mt-1">Try typing: "sunset", "Isolate", "WebRTC", "resume" or "magazine".</span>
                </div>
              )}
            </div>

            {/* macOS spotlight keycap footer instructions */}
            <div className="bg-neutral-950 px-5 py-3.5 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-white/40 shrink-0">
              <div className="flex items-center gap-3.5">
                <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded font-bold font-mono">↑↓</span> Move scope</span>
                <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded font-bold font-mono">Enter ↵</span> Process transaction</span>
                <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded font-bold font-mono">Esc</span> Dismiss</span>
              </div>
              <div className="text-[8.5px] text-[var(--accent)] font-bold font-sans uppercase tracking-widest hidden sm:flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[var(--accent)]" /> OPERATING SYSTEM CONSOLE
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
