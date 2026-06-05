import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Server, Sparkles, Database, Check } from 'lucide-react';

interface GlobalLoadingOSProps {
  onComplete: () => void;
  playBeep: (freq: number, dur: number) => void;
}

export const GlobalLoadingOS: React.FC<GlobalLoadingOSProps> = ({ onComplete, playBeep }) => {
  const [progress, setProgress] = useState(0);
  const [logIdx, setLogIdx] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    'INTEGRATION STREAM OFFLINE CACHE DETECTED',
    'READING LOCAL SESSION CONFIGURATION ENGINES',
    'RENDERING THREE.JS SHADER CANVAS PLATFORMS',
    'PRE-HEATING COGNITIVE AI CONTEXT VECTORS',
    'SYNCHRONIZING RECRUITER & FOUNDER MATRIX CHANNELS',
    'PORTFOLIO OPERATING SYSTEM READY FOR VISITATION'
  ]);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    // Initial audio trigger: a soft electronic chime
    setTimeout(() => {
      try {
        playBeep(330, 0.25);
        setTimeout(() => playBeep(523, 0.4), 120);
      } catch (_) {}
    }, 400);

    // Incremental progress
    let timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            playBeep(880, 0.15); // Completion chime
            onComplete();
          }, 450);
          return 100;
        }
        let step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onComplete, playBeep]);

  // Handle appending typewriter diagnostics logs incrementally
  useEffect(() => {
    if (progress >= (logIdx + 1) * 16 && logIdx < logs.length) {
      setVisibleLogs((prev) => [...prev, logs[logIdx]]);
      setLogIdx((prev) => prev + 1);
      try {
        playBeep(400 + logIdx * 80, 0.03); // Typist click sound
      } catch (_) {}
    }
  }, [progress, logIdx, logs, playBeep]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col justify-between p-8 font-mono select-none overflow-hidden">
      {/* Background visual atmosphere glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full filter blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Top logo header details */}
      <div className="flex justify-between items-center border-b border-white/[0.04] pb-5">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-black tracking-widest text-white uppercase">Dharmesh Ahir / Core Lab</span>
        </div>
        <span className="text-[9px] text-[#00ffcc] font-black animate-pulse uppercase tracking-wider">// LOCALHOST ENGINE ACTIVE</span>
      </div>

      {/* Middle dashboard load percentage indices */}
      <div className="max-w-xl mx-auto w-full space-y-8 flex flex-col justify-center">
        
        <div className="space-y-3.5 text-center">
          <div className="flex justify-center mb-1">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="w-11 h-11 rounded-xl border border-[#00ffcc]/35 bg-emerald-950/20 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,172,255,0.1)]"
            >
              <div className="absolute inset-2 border-t-2 border-r-2 border-[#00ffcc] rounded-lg animate-ping" style={{ animationDuration: '3s' }} />
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </motion.div>
          </div>
          <h2 className="text-sm font-extrabold uppercase font-sans tracking-widest text-slate-400">Loading Portfolio OS Sandbox</h2>
          <div className="text-4xl font-extrabold text-white font-mono tracking-tighter">
            {progress}%
          </div>
        </div>

        {/* Real Tesla-style progress track loading indicator */}
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/[0.04]">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500 transition-all duration-100 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Live diagnostics scrolling terminal box */}
        <div className="border border-white/5 bg-black/50 p-4 rounded-xl space-y-1.5 h-[130px] overflow-y-auto text-[8.5px] text-neutral-400 font-mono scrollbar-none select-text">
          {visibleLogs.map((log, index) => (
            <div key={index} className="flex gap-2 items-center text-left leading-normal">
              <span className="text-emerald-400 font-extrabold font-sans">
                {index === visibleLogs.length - 1 ? '➢' : '✓'}
              </span>
              <span className={index === visibleLogs.length - 1 ? 'text-white font-bold tracking-wider' : 'opacity-80'}>
                {log}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom telemetry indicators */}
      <div className="flex justify-between items-center text-[8.5px] border-t border-white/[0.04] pt-5 text-neutral-500 uppercase tracking-widest leading-none">
        <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-zinc-600" /> STABLE DESKTOP FRAMEWORK SHADERS READY</span>
        <span>NODE CONTAINER BUILD COMPLIANT</span>
      </div>
    </div>
  );
};
