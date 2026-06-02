import React from 'react';
import { motion } from 'motion/react';

interface FloatingCodeSystemProps {
  playBeep: (freq: number, dur: number) => void;
  accent: string;
}

export const FloatingCodeSystem: React.FC<FloatingCodeSystemProps> = ({ playBeep, accent }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* CARD 1: Dharmesh FlutterArchitect class declaration */}
      <motion.div 
        className="glass-panel p-4 rounded-xl border border-white/10 shadow-2xl font-mono text-[9px] w-60 bg-black/65 backdrop-blur-md absolute top-[12vh] left-[5vw] pointer-events-auto hidden xl:block cursor-grab"
        drag
        dragConstraints={{ left: -100, right: 300, top: -100, bottom: 400 }}
        whileHover={{ scale: 1.05, rotate: -2, y: -4 }}
        onDragStart={() => playBeep(260, 0.05)}
        onClick={() => playBeep(520, 0.08)}
      >
        <div className="flex gap-1.5 mb-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 block"></span>
          <span className="w-2 h-2 rounded-full bg-amber-400 block"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 block"></span>
        </div>
        <p><span className="text-purple-400 font-bold">class</span> <span className="text-amber-300">Dharmesh</span> <span className="text-purple-400">extends</span> <span className="text-cyan-400">FlutterArchitect</span> &#123;</p>
        <p className="pl-4 text-emerald-400">String experience = <span className="text-amber-200">"3+ Years"</span>;</p>
        <p className="pl-4 text-emerald-400">List&lt;String&gt; values = ["CleanCode", "Isolates"];</p>
        <p>&#125;</p>
      </motion.div>

      {/* CARD 2: App state initialiser scope */}
      <motion.div 
        className="glass-panel p-4 rounded-xl border border-white/10 shadow-2xl font-mono text-[9px] w-56 bg-black/65 backdrop-blur-md absolute top-[30vh] right-[4vw] pointer-events-auto hidden lg:block cursor-grab"
        drag
        dragConstraints={{ left: -300, right: 100, top: -100, bottom: 400 }}
        whileHover={{ scale: 1.05, rotate: 1, y: -3 }}
        onDragStart={() => playBeep(330, 0.05)}
        onClick={() => playBeep(660, 0.08)}
      >
        <div className="flex gap-1 mb-2 text-white/40 justify-between items-center text-[8px]">
          <span>state_manager.dart</span>
          <span>● active</span>
        </div>
        <p><span className="text-purple-400 font-bold">void</span> <span className="text-cyan-400">runApp</span>(<span className="text-amber-200">AppScope</span>(</p>
        <p className="pl-4 text-cyan-400">child: <span className="text-yellow-400">StateProvider</span>(</p>
        <p className="pl-8 text-cyan-400">builder: (c) =&gt; <span className="text-amber-300">BLoC_Engine</span>()</p>
        <p className="pl-4">)));</p>
      </motion.div>

      {/* CARD 3: Secure database async connector box */}
      <motion.div 
        className="glass-panel p-4 rounded-xl border border-white/10 shadow-2xl font-mono text-[9px] w-64 bg-black/65 backdrop-blur-md absolute bottom-[18vh] left-[4vw] pointer-events-auto hidden xl:block cursor-grab"
        drag
        dragConstraints={{ left: -100, right: 400, top: -300, bottom: 100 }}
        whileHover={{ scale: 1.05, rotate: -1, y: -5 }}
        onDragStart={() => playBeep(440, 0.05)}
        onClick={() => playBeep(880, 0.08)}
      >
        <p className="text-blue-400"><span className="text-purple-400">await</span> <span className="text-cyan-400">Firebase.initializeApp</span>();</p>
        <p className="text-blue-400"><span className="text-purple-400">await</span> <span className="text-cyan-400">Hive.openBox</span>(<span className="text-amber-200">'ledger_db'</span>);</p>
        <p className="text-emerald-500">// Sync Stream state fully operational</p>
      </motion.div>

      {/* CARD 4: Additional dynamic technology badges floating */}
      <motion.div 
        className="glass-panel px-3 py-1.5 rounded-full border border-white/15 shadow-xl font-mono text-[8px] bg-black/55 backdrop-blur text-[var(--accent)] absolute top-[44vh] left-[45vw] pointer-events-auto hidden md:block cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 10, y: -5 }}
        onClick={() => playBeep(494, 0.1)}
      >
        🧬 StreamSubscription&lt;LedgerEvent&gt;
      </motion.div>

      <motion.div 
        className="glass-panel px-3 py-1.5 rounded-full border border-white/15 shadow-xl font-mono text-[8px] bg-black/55 backdrop-blur text-purple-300 absolute top-[28vh] left-[32vw] pointer-events-auto hidden md:block cursor-pointer"
        whileHover={{ scale: 1.1, rotate: -8, y: -5 }}
        onClick={() => playBeep(587, 0.1)}
      >
        ⚡ WebRTC.signaledCandidate
      </motion.div>

      <motion.div 
        className="glass-panel px-3 py-1.5 rounded-full border border-white/15 shadow-xl font-mono text-[8px] bg-black/55 backdrop-blur text-emerald-300 absolute bottom-[24vh] right-[10vw] pointer-events-auto hidden lg:block cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 6, y: -5 }}
        onClick={() => playBeep(659, 0.1)}
      >
        🛡️ HIPAA.cryptSecure256
      </motion.div>

    </div>
  );
};
