import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, Database, Save, RotateCcw, Bell, Clock, Cpu, 
  Sparkles, ShieldCheck, ArrowRight, X, Volume2, VolumeX,
  Smartphone, Monitor, Eye, Trash2, CheckCircle2, AlertCircle
} from 'lucide-react';
import { LayoutType, ThemeType, WorkspaceSnapshot, SystemNotification, ActivityLogItem } from '../types';

interface PortfolioOSDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  currentLayout: LayoutType;
  onLayoutChange: (l: LayoutType) => void;
  currentTheme: ThemeType;
  onThemeChange: (t: ThemeType) => void;
  currentCursorStyle: any;
  onCursorStyleChange: (c: any) => void;
  isMuted: boolean;
  onMuteToggle: (m: boolean) => void;
  motionIntensity: number;
  onMotionIntensityChange: (v: number) => void;
  glowIntensity: number;
  onGlowIntensityChange: (v: number) => void;
  particleDensity: number;
  onParticleDensityChange: (v: number) => void;
  notifications: SystemNotification[];
  activityLogs: ActivityLogItem[];
  onTriggerNotification: (title: string, message: string, category: 'info' | 'success' | 'warn' | 'system') => void;
  onAddActivityLog: (action: string, details: string, category: 'workspace' | 'theme' | 'ai' | 'portfolio' | 'operational') => void;
  onChatPrompt: (q: string) => void;
  playBeep: (freq: number, dur: number) => void;
}

export const PortfolioOSDashboard: React.FC<PortfolioOSDashboardProps> = ({
  isOpen,
  onClose,
  currentLayout,
  onLayoutChange,
  currentTheme,
  onThemeChange,
  currentCursorStyle,
  onCursorStyleChange,
  isMuted,
  onMuteToggle,
  motionIntensity,
  onMotionIntensityChange,
  glowIntensity,
  onGlowIntensityChange,
  particleDensity,
  onParticleDensityChange,
  notifications,
  activityLogs,
  onTriggerNotification,
  onAddActivityLog,
  onChatPrompt,
  playBeep
}) => {
  const [activeTab, setActiveTab] = useState<'snapshots' | 'atmosphere' | 'timeline' | 'notifications'>('snapshots');
  const [newSnapshotName, setNewSnapshotName] = useState('');
  const [savedSnapshots, setSavedSnapshots] = useState<WorkspaceSnapshot[]>([]);
  const [soundProfile, setSoundProfile] = useState<'glass' | 'digital' | 'ambient'>('glass');
  const [deviceRecommendation, setDeviceRecommendation] = useState<string>('');

  // Hydrate local snapshots
  useEffect(() => {
    try {
      const stored = localStorage.getItem('os_workspace_snapshots_v1');
      if (stored) {
        setSavedSnapshots(JSON.parse(stored));
      } else {
        // Pre-populate with default presets
        const defaultSnapshots: WorkspaceSnapshot[] = [
          {
            id: 'preset-recruiter',
            name: 'My Recruiter Workspace',
            layout: 'left-sidebar',
            theme: 'nord',
            particleSettings: { density: 80, motion: 70 },
            cursorStyle: 'glass',
            aiPanelState: { isOpen: true, mode: 'bubble' },
            dockState: { muted: false },
            createdAt: new Date().toISOString()
          },
          {
            id: 'preset-founder',
            name: 'My Founder Workspace',
            layout: 'glassmorphism-studio',
            theme: 'sunset',
            particleSettings: { density: 120, motion: 100 },
            cursorStyle: 'ring',
            aiPanelState: { isOpen: true, mode: 'sidebar' },
            dockState: { muted: false },
            createdAt: new Date().toISOString()
          },
          {
            id: 'preset-minimalist',
            name: 'Minimal Focus Workspace',
            layout: 'apple-minimal',
            theme: 'apple-white',
            particleSettings: { density: 30, motion: 20 },
            cursorStyle: 'none',
            aiPanelState: { isOpen: false, mode: 'bubble' },
            dockState: { muted: true },
            createdAt: new Date().toISOString()
          }
        ];
        localStorage.setItem('os_workspace_snapshots_v1', JSON.stringify(defaultSnapshots));
        setSavedSnapshots(defaultSnapshots);
      }
    } catch {
      // Safe boundary bypass
    }

    // Capture screen aspect-ratios to recommend visual settings
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setDeviceRecommendation('Mobile touch layout recommended: Classic Compact Dock, Sunset Accent, 30 Particle Ratio.');
      } else {
        setDeviceRecommendation('High definition desktop resolved: Developer IDE Workspace, Tesla Matte palette, 100 Particle Ratio.');
      }
    }
  }, []);

  const playLocalBeep = (freq: number, dur: number) => {
    if (!isMuted) {
      if (soundProfile === 'digital') {
        // Synthesizer square dual frequency pulses
        playBeep(freq, dur * 0.5);
        setTimeout(() => playBeep(freq * 1.5, dur * 0.4), 15);
      } else if (soundProfile === 'ambient') {
        // Soft sine hum
        playBeep(freq / 2, dur * 1.5);
      } else {
        // Clean default click
        playBeep(freq, dur);
      }
    }
  };

  // Create Workspace snapshot
  const handleSaveSnapshot = () => {
    const title = newSnapshotName.trim() || `Workspace Snapshot #${savedSnapshots.length + 1}`;
    playLocalBeep(880, 0.12);

    const snapshot: WorkspaceSnapshot = {
      id: `snapshot-${Date.now()}`,
      name: title,
      layout: currentLayout,
      theme: currentTheme,
      particleSettings: { density: particleDensity, motion: motionIntensity },
      cursorStyle: currentCursorStyle,
      aiPanelState: { isOpen: false, mode: 'bubble' },
      dockState: { muted: isMuted },
      createdAt: new Date().toISOString()
    };

    const nextList = [snapshot, ...savedSnapshots];
    setSavedSnapshots(nextList);
    localStorage.setItem('os_workspace_snapshots_v1', JSON.stringify(nextList));
    setNewSnapshotName('');

    onTriggerNotification(
      'Snapshot Captured', 
      `Saved layout [${currentLayout}] and theme [${currentTheme}] elements successfully!`,
      'success'
    );
    onAddActivityLog(
      'Workspace Snapshot Saved',
      `Captured Snapshot: "${title}"`,
      'workspace'
    );
  };

  // Restore Workspace snapshot
  const handleLoadSnapshot = (snapshot: WorkspaceSnapshot) => {
    playLocalBeep(587, 0.15);
    setTimeout(() => playLocalBeep(880, 0.1), 100);

    onLayoutChange(snapshot.layout);
    onThemeChange(snapshot.theme);
    onParticleDensityChange(snapshot.particleSettings.density);
    onMotionIntensityChange(snapshot.particleSettings.motion);
    onCursorStyleChange(snapshot.cursorStyle);
    onMuteToggle(snapshot.dockState.muted);

    onTriggerNotification(
      'Snapshot Restored',
      `Applied workspace configuration: "${snapshot.name}"`,
      'system'
    );

    onAddActivityLog(
      'Workspace Snapshot Restored',
      `Applied configuration details from "${snapshot.name}" snapshot record.`,
      'workspace'
    );
  };

  // Delete workspace snapshot record
  const handleDeleteSnapshot = (id: string, name: string) => {
    playLocalBeep(220, 0.18);
    const filter = savedSnapshots.filter(s => s.id !== id);
    setSavedSnapshots(filter);
    localStorage.setItem('os_workspace_snapshots_v1', JSON.stringify(filter));

    onTriggerNotification(
      'Snapshot Deleted',
      `Erased snapshot workspace "${name}" from local storage cache.`,
      'warn'
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2500] bg-black/60 backdrop-blur-md flex justify-end">
          {/* Backdrop dismiss */}
          <div className="absolute inset-0 z-0 cursor-default" onClick={onClose} />

          {/* Sliding sidebar wrapper */}
          <motion.div
            initial={{ opacity: 0, x: 420 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 420 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-full max-w-md bg-neutral-950/95 border-l border-white/10 h-full relative z-10 shadow-2xl flex flex-col justify-between font-sans select-none overflow-hidden"
            style={{
              boxShadow: '-30px 0 50px rgba(0,0,0,0.8)'
            }}
          >
            {/* Header capsule details */}
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-neutral-950/80 sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-1 px-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-md font-mono text-[9px] font-black tracking-widest leading-none">
                  PORTFOLIO OS
                </div>
                <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 font-sans uppercase">
                  <Database className="w-4 h-4 text-[var(--accent)]" /> Control Workspace Hub
                </h2>
              </div>
              <button 
                onClick={() => { playLocalBeep(440, 0.05); onClose(); }}
                className="p-1.5 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub headers quick switcher tabs */}
            <div className="flex px-4 py-2 bg-neutral-950/40 border-b border-white/[0.04] overflow-x-auto gap-1 text-[10px] uppercase font-mono font-bold font-sans tracking-wide shrink-0">
              {[
                { id: 'snapshots', label: 'Snapshots', icon: Save },
                { id: 'atmosphere', label: 'Atmospheres', icon: Cpu },
                { id: 'timeline', label: 'OS Timeline', icon: Clock },
                { id: 'notifications', label: 'System Logs', icon: Bell }
              ].map(tb => {
                const TabIcon = tb.icon;
                const active = activeTab === tb.id;
                return (
                  <button
                    key={tb.id}
                    onClick={() => { setActiveTab(tb.id as any); playLocalBeep(450, 0.03); }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border whitespace-nowrap transition-all ${
                      active ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]' : 'bg-transparent border-transparent text-white/50 hover:text-white/80'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tb.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Scrollable spec content region */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
              
              {activeTab === 'snapshots' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-white/40 block tracking-widest">// SAVE CURRENT PREFERENCES STATE</span>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={newSnapshotName}
                        onChange={(e) => setNewSnapshotName(e.target.value)}
                        placeholder="E.g. Fullscreen Presenter Layout..."
                        maxLength={32}
                        className="w-full bg-black border border-white/10 px-3.5 py-2 rounded-xl text-xs text-white placeholder-white/30 outline-none focus:border-[var(--accent)]/50 font-sans"
                      />
                      <button 
                        onClick={handleSaveSnapshot}
                        className="px-4 py-2 bg-[var(--accent)] text-black font-mono text-[10px] font-extrabold uppercase rounded-xl hover:scale-105 transition-all flex items-center gap-1 shrink-0"
                      >
                        <Save className="w-3.5 h-3.5" /> CAPTURE
                      </button>
                    </div>
                  </div>

                  {/* Adaptive device recommendation alert layout */}
                  <div className="p-3.5 rounded-xl border border-blue-500/10 bg-blue-950/20 text-blue-300 font-sans text-[10.5px] leading-relaxed flex gap-2.5 items-start">
                    <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <span className="font-bold uppercase tracking-wider text-[9px] text-blue-400 block font-mono">Recommended Device Spec</span>
                      <p className="mt-0.5">{deviceRecommendation}</p>
                    </div>
                  </div>

                  {/* Saved Snapshot listings */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-white/40 block tracking-widest uppercase">// PERSISTED SLOTS RECORD ({savedSnapshots.length})</span>
                    <div className="space-y-2.5">
                      {savedSnapshots.map((snap) => (
                        <div 
                          key={snap.id}
                          className="p-3.5 rounded-2xl border border-white/5 bg-black/40 hover:bg-white/[0.01] transition-all flex items-center justify-between gap-4"
                        >
                          <div className="min-w-0 space-y-1">
                            <span className="text-[11.5px] text-white font-extrabold leading-snug block truncate max-w-[190px]">{snap.name}</span>
                            <div className="flex flex-wrap gap-1 items-center font-mono text-[8px] text-neutral-400">
                              <span className="px-1 bg-white/5 rounded text-[var(--accent)] uppercase font-bold leading-none py-0.5">{snap.layout}</span>
                              <span className="px-1 bg-white/5 rounded text-neutral-400 uppercase font-bold leading-none py-0.5">{snap.theme}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button 
                              onClick={() => handleLoadSnapshot(snap)}
                              className="p-2 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-[var(--accent)] rounded-lg text-[9px] font-mono font-bold flex items-center gap-1 uppercase border border-[var(--accent)]/20 transition-all active:scale-95"
                              title="Restore preference variables"
                            >
                              <RotateCcw className="w-3 h-3" /> RESTORE
                            </button>
                            
                            {!snap.id.startsWith('preset-') && (
                              <button 
                                onClick={() => handleDeleteSnapshot(snap.id, snap.name)}
                                className="p-2 border border-white/5 hover:border-rose-500/20 text-white/40 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                                title="Delete Snapshot"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'atmosphere' && (
                <div className="space-y-6">
                  {/* Dynamic sound identity profile selector */}
                  <div className="space-y-3 p-4 rounded-2xl border border-white/[0.04] bg-neutral-950/60 relative">
                    <span className="text-[10px] font-mono text-white/40 block tracking-widest uppercase">// THEME SOUND IDENTITIES</span>
                    <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">
                      Select theme specific auditory harmonics that modulate click and transition sound effects.
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono uppercase font-bold text-center">
                      {[
                        { id: 'glass', label: 'Apple White', desc: 'Glass ticks', freq: 660 },
                        { id: 'digital', label: 'Cyberpunk', desc: 'Digital pulse', freq: 880 },
                        { id: 'ambient', label: 'Nord Snowy', desc: 'Calm sine', freq: 440 }
                      ].map(sound => (
                        <button
                          key={sound.id}
                          onClick={() => { setSoundProfile(sound.id as any); playBeep(sound.freq, 0.08); }}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                            soundProfile === sound.id 
                              ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] shadow-md' 
                              : 'border-white/5 bg-black/40 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span className="text-[10px] font-black">{sound.label}</span>
                          <span className="text-[7.5px] text-neutral-500 mt-1">{sound.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Physical atmosphere controller dimensions */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-white/40 block tracking-widest uppercase">// AMBIENT SYSTEM DIMENSIONS</span>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center text-[10.5px] font-mono text-neutral-400">
                          <span>Particle Density Rendering</span>
                          <span className="text-white font-extrabold">{particleDensity}%</span>
                        </div>
                        <input 
                          type="range" 
                          min={20} 
                          max={150}
                          value={particleDensity}
                          onChange={(e) => onParticleDensityChange(Number(e.target.value))}
                          className="w-full accent-[var(--accent)] h-1 rounded-full mt-1.5 focus:outline-none"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-[10.5px] font-mono text-neutral-400">
                          <span>Motion Canvas Velocity</span>
                          <span className="text-white font-extrabold">{motionIntensity}%</span>
                        </div>
                        <input 
                          type="range" 
                          min={10} 
                          max={150}
                          value={motionIntensity}
                          onChange={(e) => onMotionIntensityChange(Number(e.target.value))}
                          className="w-full accent-[var(--accent)] h-1 rounded-full mt-1.5 focus:outline-none"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-[10.5px] font-mono text-neutral-400">
                          <span>Accents Glow Width</span>
                          <span className="text-white font-extrabold">{glowIntensity}%</span>
                        </div>
                        <input 
                          type="range" 
                          min={20} 
                          max={150}
                          value={glowIntensity}
                          onChange={(e) => onGlowIntensityChange(Number(e.target.value))}
                          className="w-full accent-[var(--accent)] h-1 rounded-full mt-1.5 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Empty State simulation / Diagnostics card representation */}
                  <div className="p-4 rounded-xl border border-white/5 bg-black/40 text-center font-sans space-y-2">
                    <div className="flex justify-center text-[var(--accent)]">
                      <Cpu className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                    </div>
                    <span className="text-[11px] text-white font-extrabold block">GPU Acceleration Diagnostics</span>
                    <p className="text-[9.5px] text-neutral-500 leading-relaxed max-w-xs mx-auto">
                      Refractions and depth layers execute directly on hardware framebuffers. Ensure hardware threading is enabled inside browser flags.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/40 block tracking-widest uppercase">// RECENT OPERATIONS TIMELINE</span>
                    <span className="text-[8px] font-mono bg-white/5 border border-white/10 text-neutral-400 px-1.5 rounded uppercase font-bold leading-none py-0.5">MONITOR ACTIVE</span>
                  </div>

                  <div className="border border-white/15 rounded-2xl p-4 bg-black/60 relative overflow-hidden h-[330px] overflow-y-auto scrollbar-thin">
                    <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t border-r border-[#00ffcc]/20 rounded-tr-2xl" />
                    
                    <div className="space-y-4 relative z-10 font-mono text-[9.5px]">
                      {activityLogs.length > 0 ? (
                        activityLogs.map((log) => (
                          <div key={log.id} className="flex gap-2.5 items-start text-neutral-300 relative pl-4 border-l border-white/10 py-0.5">
                            <span className="absolute left-[3.5px] -translate-x-1/2 top-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                            <div className="space-y-0.5 flex-1 select-text">
                              <div className="flex justify-between items-center text-white font-black leading-none">
                                <span className="uppercase text-[var(--accent)]">{log.action}</span>
                                <span className="text-neutral-500 font-bold font-sans text-[7.5px]">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                              </div>
                              <p className="text-neutral-400 leading-snug">{log.details}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-white/30 font-sans">
                          <Clock className="w-8 h-8 text-white/10" />
                          <span className="text-xs font-mono">No operations executed this turn.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-white/40 block tracking-widest uppercase">// LOCAL SYSTEM NOTIFICATION CORES</span>

                  <div className="space-y-3 max-h-[330px] overflow-y-auto pr-1">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          className={`p-3 rounded-xl border flex gap-3 items-start transform transition-all ${
                            notif.category === 'success' ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300' :
                            notif.category === 'warn' ? 'bg-rose-950/20 border-rose-500/20 text-rose-300 font-bold' :
                            'bg-neutral-900/60 border-white/[0.08] text-neutral-300'
                          }`}
                        >
                          {notif.category === 'success' ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                          ) : notif.category === 'warn' ? (
                            <AlertCircle className="w-4.5 h-4.5 text-rose-400 shrink-0 mt-0.5" />
                          ) : (
                            <Bell className="w-4.5 h-4.5 text-cyan-400 shrink-0 mt-0.5" />
                          )}

                          <div className="space-y-1 font-sans text-xs">
                            <span className="font-extrabold text-white block select-text leading-tight">{notif.title}</span>
                            <p className="text-[10px] text-neutral-400 select-text leading-relaxed mt-0.5">{notif.message}</p>
                            <span className="text-[8px] font-mono text-neutral-500 block pt-1">{notif.timestamp}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center flex flex-col items-center justify-center gap-2 text-white/30">
                        <Bell className="w-8 h-8 text-white/10" />
                        <span className="text-xs font-mono">Logs clearing active. Standard stack idle.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Quick Action Floating Bar Footer coordinates inside OS Panel */}
            <div className="p-4 border-t border-white/[0.08] bg-black flex items-center justify-between text-[8px] font-mono text-neutral-400 shrink-0">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SECURED INTEGRATION SSL 256</span>
              <span className="text-[var(--accent)] uppercase hover:underline cursor-pointer flex items-center gap-0.5 font-bold font-sans" onClick={() => onChatPrompt('Generate technical overview')}>
                GUIDED TOUR <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
