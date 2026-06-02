import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Experience } from '../types';
import { 
  Folder, 
  FileCode, 
  Play, 
  Terminal as TermIcon, 
  Database, 
  Cpu, 
  Activity, 
  Sparkles, 
  Send,
  Check,
  Code2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ChevronRight,
  Maximize2,
  Minimize2,
  Bug,
  Layout,
  Terminal,
  Server
} from 'lucide-react';

interface DeveloperDashboardViewProps {
  projects: Project[];
  experience: Experience[];
  onInspectProject: (p: Project) => void;
  onSubmitInquiry: (name: string, email: string, msg: string) => void;
  accent: string;
  playBeep: (freq: number, dur: number) => void;
  isolateCount: number;
  triggerIsolate: () => void;
  sqliteLatency: number;
  contacts?: any[];
}

const FILES_MAP: { [key: string]: string } = {
  'main.dart': `import 'package:flutter/material.dart';
import 'package:riverpod/riverpod.dart';
import 'package:helix_care/services/webrtc_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  
  runApp(
    ProviderScope(
      child: MemoryLeakDetector(
        child: DharmeshPortfolioApp(),
      ),
    ),
  );
}`,
  'ledger_bloc.dart': `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:khata_ledger/models/transaction.dart';

class LedgerBloc extends Bloc<LedgerEvent, LedgerState> {
  final SQLiteRepository _sqlite;
  
  LedgerBloc(this._sqlite) : super(LedgerInitial()) {
    on<SyncTransactionLocal>((event, emit) async {
      emit(SyncingInProgress());
      try {
        await _sqlite.writeOffline(event.entry);
        emit(SyncSuccess(event.entry));
      } catch (e) {
        emit(SyncFailure(e.toString()));
      }
    });
  }
}`,
  'sqlite_sync.dart': `import 'package:sqflite/sqflite.dart';
import 'package:webrtc/connectivity_listener.dart';

class OfflineSynchronizer {
  final Database _db;
  final ConnectivityListener _network;

  OfflineSynchronizer(this._db, this._network) {
    _network.onStatusChanged.listen((status) {
      if (status == Online) {
        _flushOfflineBuffers();
      }
    });
  }

  Future<void> _flushOfflineBuffers() async {
    final offlineRows = await _db.query('ledger_queue');
    for (var r in offlineRows) {
      await _transmitGateway(r);
    }
  }
}`
};

export const DeveloperDashboardView: React.FC<DeveloperDashboardViewProps> = ({
  projects,
  onInspectProject,
  onSubmitInquiry,
  playBeep,
  isolateCount,
  triggerIsolate,
  sqliteLatency,
  contacts = [],
}) => {
  const [activeFile, setActiveFile] = useState('main.dart');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[SYSTEM] Boot environment established successfully.',
    '[PORTAL] Local developer container listening on port 3000.',
    '[STABLE] SQLite cache memory allocated (4MB bucket).',
    '[DVM] Native isolations initialized.'
  ]);
  const [activeBottomTab, setActiveBottomTab] = useState<'projects' | 'contact' | 'inbox'>('projects');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLogLine, setSelectedLogLine] = useState<number | null>(null);

  useEffect(() => {
    const logs = [
      '[SYNC] Flushed local transaction buffers (0.5ms).',
      '[MEM] Executed Dart GC iteration. Reclaimed 1.4 MB memory.',
      '[ISOLATE] Re-routing multithreading background stream.',
      '[SIGNAL] STUN/TURN connection established with 11ms latency.',
      '[RENDER] UI Thread frame loop validated: stable at 120 FPS.'
    ];

    const iv = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setConsoleLogs((prev) => [...prev.slice(-6), `${new Date().toLocaleTimeString()} ${randomLog}`]);
    }, 4500);

    return () => clearInterval(iv);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubmitInquiry(name, email, msg);
    setSent(true);
    setConsoleLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} [CRM] Secure dvm inquiries synchronized.`]);
    playBeep(880, 0.12);
  };

  const handleFileSelect = (fname: string) => {
    setActiveFile(fname);
    playBeep(620, 0.05);
    setConsoleLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} [IDE] Switch active target context to '${fname}'`]);
  };

  const compileAppletCode = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    playBeep(784, 0.12);
    setConsoleLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} [BUILD] Triggering Flutter Native build routine...`]);
    setTimeout(() => {
      setIsCompiling(false);
      playBeep(1046, 0.2);
      setConsoleLogs((prev) => [
        ...prev, 
        `${new Date().toLocaleTimeString()} [SUCCESS] compilation target resolved: stable apk generated.`,
        `${new Date().toLocaleTimeString()} [DEPLOY] Live assets proxy loaded onto web preview server.`
      ]);
    }, 1600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-4 font-sans text-neutral-200 pb-16 relative">
      <div className="absolute inset-0 bg-radial-gradient from-purple-950/20 via-transparent to-transparent opacity-40 pointer-events-none -z-10" />

      {/* 3-COLUMN INTERACTIVE PREMIUM IDE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* COLUMN 1: SIDEBAR WORKSPACE EXPLORER - Premium glass, customized controls */}
        <div className="lg:col-span-3 rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md group hover:border-purple-500/20 transition-all duration-300">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Folder className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 font-mono">DART_WORKSPACE</span>
              </div>
              <span className="text-[8px] px-1.5 py-0.5 bg-neutral-900 text-neutral-400 rounded-md border border-white/5 font-mono">3 Files</span>
            </div>
            
            <div className="space-y-1 font-mono text-[11px]">
              <span className="text-[8px] text-neutral-500 block uppercase font-bold tracking-widest px-1.5 mb-1.5">Project Files</span>
              {Object.keys(FILES_MAP).map((fname) => (
                <button
                  key={fname}
                  onClick={() => handleFileSelect(fname)}
                  className={`w-full text-left py-2 px-2.5 rounded-xl flex items-center justify-between transition-all group/file ${
                    activeFile === fname 
                      ? 'bg-purple-950/30 text-white font-bold border border-purple-500/30 shadow-[0_0_15px_rgba(224,64,251,0.1)]' 
                      : 'hover:bg-neutral-900/60 text-neutral-400 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className={`w-3.5 h-3.5 transition-colors ${activeFile === fname ? 'text-purple-400' : 'text-neutral-500 group-hover/file:text-neutral-300'}`} />
                    <span>{fname}</span>
                  </div>
                  <ChevronRight className={`w-3 h-3 text-neutral-600 transition-transform ${activeFile === fname ? 'translate-x-0.5 text-purple-400' : 'opacity-0 group-hover/file:opacity-100'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] mt-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Compiler Tunnel</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <button
              onClick={compileAppletCode}
              disabled={isCompiling}
              className={`w-full py-2.5 px-4 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2 font-mono relative overflow-hidden group/btn ${
                isCompiling 
                  ? 'bg-neutral-900 text-neutral-500 cursor-not-allowed border border-white/5' 
                  : 'bg-[var(--accent)] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98]'
              }`}
            >
              <Play className={`w-3 h-3 ${isCompiling ? 'animate-spin' : 'transition-transform group-hover/btn:scale-110'}`} />
              {isCompiling ? 'Compiling Build...' : 'Execute main.dart'}
            </button>
          </div>
        </div>

        {/* COLUMN 2: TABULAR TEXT EDITOR - Professional IDE visuals with rich margins */}
        <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-neutral-950/70 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md hover:border-purple-500/20 transition-all duration-300">
          
          <div className="w-full flex items-center bg-neutral-950/90 border-b border-white/[0.06] overflow-x-auto select-none">
            {Object.keys(FILES_MAP).map((fname) => (
              <button
                key={fname}
                onClick={() => handleFileSelect(fname)}
                className={`px-3.5 py-3 border-r border-white/[0.06] text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 relative ${
                  activeFile === fname 
                    ? 'bg-neutral-950 text-white font-bold' 
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/10'
                }`}
              >
                {activeFile === fname && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]" />
                )}
                <Code2 className="w-3.5 h-3.5 text-purple-400" />
                {fname}
              </button>
            ))}
          </div>

          {/* HIGH-FIDELITY CODE EDITOR LINES & MONOSPACED PAIRINGS */}
          <div className="p-4 flex-grow font-mono text-[10.5px] leading-relaxed overflow-auto max-h-[290px] min-h-[240px] bg-neutral-950 flex">
            {/* Real IDE line numbers gutter */}
            <div className="text-right pr-3.5 select-none text-neutral-600 space-y-0.5 border-r border-white/[0.03] select-none text-[10px]">
              {FILES_MAP[activeFile].split('\n').map((_, i) => (
                <div key={i} className="h-[15.75px] pr-0.5">{i + 1}</div>
              ))}
            </div>
            
            {/* Code presentation and highlighting styles */}
            <pre className="pl-3 text-neutral-300 flex-grow scrollbar-thin select-text">
              <code className="block whitespace-pre">
                {FILES_MAP[activeFile].split('\n').map((line, i) => {
                  // Basic regex styling simulation for extreme craft look
                  let coloredLine = line;
                  coloredLine = line
                    .replace(/(class|void|import|async|await|try|catch|final|future|const|return)/gi, '<span class="text-pink-400">$1</span>')
                    .replace(/(DharmeshPortfolioApp|WidgetsFlutterBinding|Firebase|ProviderScope|MemoryLeakDetector|LedgerBloc|SQLiteRepository|Database|OfflineSynchronizer|ConnectivityListener)/g, '<span class="text-cyan-400 font-bold">$1</span>')
                    .replace(/('([^'\\]|\\.)*')/g, '<span class="text-amber-300">$1</span>');

                  return (
                    <div 
                      key={i} 
                      className="hover:bg-purple-950/10 h-[15.75px] px-1 rounded transition-colors"
                      dangerouslySetInnerHTML={{ __html: coloredLine }} 
                    />
                  );
                })}
              </code>
            </pre>
          </div>

          {/* COMPILER DIAGNOSTIC STATUS BAR */}
          <div className="bg-neutral-950 border-t border-white/[0.06] py-2 px-4 text-[9px] font-mono text-neutral-500 flex justify-between items-center">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SDK COMPATIBLE (v3.12)
            </span>
            <div className="flex gap-4">
              <span>Lines: {FILES_MAP[activeFile].split('\n').length}</span>
              <span className="text-neutral-400">LF</span>
              <span className="text-neutral-400">UTF-8</span>
            </div>
          </div>
        </div>

        {/* COLUMN 3: LIVE OPERATIONS DIAGNOSSTIC TERMINAL */}
        <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-neutral-950/70 p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md hover:border-purple-500/20 transition-all duration-300">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <TermIcon className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 font-mono">DIAGNOSTIC_CONSOLE</span>
              </div>
              <span className="text-[8px] uppercase tracking-wider text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/20 font-mono">Stream Live</span>
            </div>

            {/* INTERACTIVE CONSOLE LIST & ACCENT TICK SOUND */}
            <div className="space-y-1.5 max-h-[220px] overflow-auto font-mono text-[9px] text-[#00ffcc] scrollbar-thin select-none">
              {consoleLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  onClick={() => { playBeep(440, 0.05); setSelectedLogLine(idx === selectedLogLine ? null : idx); }}
                  className={`flex gap-1.5 items-start leading-relaxed p-1.5 border rounded cursor-pointer transition-all ${
                    idx === selectedLogLine 
                      ? 'bg-purple-950/30 border-purple-500/50 text-white shadow-[0_0_10px_rgba(168,85,247,0.1)]' 
                      : 'bg-neutral-900/30 border-white/5 hover:bg-neutral-900/60'
                  }`}
                >
                  <span className="text-purple-500 shrink-0 select-none">&gt;</span>
                  <span className="break-all tracking-tight">{log}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TELEMETRY METRIC PULSES */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.06] mt-4">
            <div className="bg-neutral-950 p-2.5 rounded-xl border border-white/5 text-center group/pulse hover:border-purple-500/20 transition-all">
              <span className="text-[8px] text-neutral-500 uppercase font-mono block mb-0.5">Thread Core</span>
              <span className="text-xs font-bold text-cyan-400 font-mono transition-transform group-hover/pulse:scale-105 inline-block">{sqliteLatency}ms</span>
            </div>
            <div className="bg-neutral-950 p-2.5 rounded-xl border border-white/5 text-center group/pulse hover:border-purple-500/20 transition-all">
              <span className="text-[8px] text-neutral-500 uppercase font-mono block mb-0.5">Multi Thread</span>
              <span className="text-xs font-bold text-purple-400 font-mono transition-transform group-hover/pulse:scale-105 inline-block">{isolateCount} Spawn</span>
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM HUB: PROJECT SECTORS LOG & ENCRYPTED INQUIRY CHANNEL */}
      <div className="bg-neutral-950/40 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-md mt-4">
        
        {/* NAV HEADERS with interactive hover sliding glow */}
        <div className="flex bg-neutral-950/90 border-b border-white/[0.06] overflow-x-auto select-none">
          {[
            { id: 'projects', label: `Deliverable Matrix [${projects.length}]`, icon: Layout },
            { id: 'contact', label: 'Inbound Conduit Tunnel', icon: Server },
            { id: 'inbox', label: `Reconciled Streams (${contacts.length})`, icon: Bug }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveBottomTab(item.id as any); playBeep(330, 0.05); }}
              className={`px-5 py-3.5 text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 relative border-r border-white/[0.04] ${
                activeBottomTab === item.id 
                  ? 'text-[var(--accent)] font-bold bg-neutral-950/50' 
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {activeBottomTab === item.id && (
                <span className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
              )}
              <item.icon className="w-3.5 h-3.5 text-purple-400" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* FEED DETAILS CONTAINER WITH FLUID ENHANCED ANIMATIONS */}
        <div className="p-5">
          <AnimatePresence mode="wait">
            {activeBottomTab === 'projects' && (
              <motion.div
                key="projects-matrix"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {projects.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => { playBeep(523, 0.08); onInspectProject(p); }}
                    className="p-5 bg-neutral-950 border border-white/[0.04] hover:border-purple-500/20 rounded-xl cursor-pointer transition-all flex flex-col justify-between min-h-[160px] group relative overflow-hidden"
                    whileHover={{ y: -3, bg: 'rgba(255, 255, 255, 0.01)' }}
                  >
                    <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500/30 rounded-bl" />
                    <div>
                      <span className="text-[8px] font-mono text-[var(--accent)] uppercase tracking-wider block mb-1">{p.category}</span>
                      <h4 className="text-sm font-bold text-neutral-100 group-hover:text-[var(--accent)] transition-colors">{p.title}</h4>
                      <p className="text-neutral-400 text-xs leading-relaxed mt-2 line-clamp-2">{p.problem}</p>
                    </div>
                    <div className="text-[10px] text-purple-400 font-bold flex items-center gap-1.5 mt-4 border-t border-white/[0.04] pt-3.5 group-hover:text-white transition-colors">
                      Explore spec diagnostics <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeBottomTab === 'inbox' && (
              <motion.div
                key="inbound-list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3.5 max-w-2xl mx-auto font-mono text-[11px]"
              >
                {contacts.length === 0 ? (
                  <div className="p-8 bg-neutral-950 border border-white/[0.04] text-center text-neutral-500 rounded-xl">
                    &gt; LOG_PORT: NO SECURE PACKETS RETRIEVED FROM EXTERNAL CLIENT STREAM.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {contacts.slice().reverse().map((msg: any, i: number) => (
                      <div key={msg.id || i} className="p-4 bg-neutral-950 border border-white/[0.06] rounded-xl space-y-2 hover:border-purple-500/30 transition-all">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-purple-400 font-bold">&gt;&gt; HOST: {msg.name} ({msg.email})</span>
                          <span className="text-neutral-500 font-bold">{new Date(msg.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-neutral-300 leading-relaxed pl-2.5 border-l-2 border-purple-500">{msg.message}</p>
                        <div className="flex justify-between items-center text-[8px] text-neutral-500 pt-1">
                          <span>Payload Source: {msg.layoutType || "ide_dashboard"}</span>
                          <span className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />
                            Synchronized Stable
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeBottomTab === 'contact' && (
              <motion.div
                key="contact-routine"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-xl mx-auto"
              >
                {sent ? (
                  <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-xl text-center text-purple-400 font-mono text-xs">
                    ✔ TRANSMISSION DISPATCHED SECURELY. COMPILE TUNNEL REPLICATED.
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Ident Value (Name)" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-neutral-950 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-500/40 transition-all font-mono placeholder:text-neutral-600"
                      />
                      <input 
                        type="email" 
                        placeholder="Communication Email Address" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-neutral-950 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-500/40 transition-all font-mono placeholder:text-neutral-600"
                      />
                    </div>
                    <textarea 
                      placeholder="Specify system integrations parameters or project timeline requirements..." 
                      required
                      value={msg}
                      rows={3}
                      onChange={(e) => setMsg(e.target.value)}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-500/40 transition-all resize-none font-mono placeholder:text-neutral-600"
                    />
                    <button 
                      type="submit" 
                      className="w-full py-3 bg-[var(--accent)] hover:bg-white text-black font-extrabold uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-[0_4px_12px_rgba(168,85,247,0.15)] focus:scale-[0.99]"
                    >
                      transmit secure packet inquiries
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};
