import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Experience } from '../types';
import { Sparkles, Terminal, Shield, ChevronUp, ChevronDown, Award, Lightbulb, Send, MessageSquare } from 'lucide-react';

interface FullscreenScrollStoryViewProps {
  projects: Project[];
  experience: Experience[];
  onInspectProject: (p: Project) => void;
  onSubmitInquiry: (name: string, email: string, msg: string) => void;
  playBeep: (freq: number, dur: number) => void;
}

export const FullscreenScrollStoryView: React.FC<FullscreenScrollStoryViewProps> = ({
  projects,
  experience,
  onInspectProject,
  onSubmitInquiry,
  playBeep,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedProjIdx, setSelectedProjIdx] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const slides = [
    { id: 'intro', label: '1. Identity Vision' },
    { id: 'stats', label: '2. Impact Quantified' },
    { id: 'products', label: '3. Masterpieces Portal' },
    { id: 'roadmap', label: '4. Bio Roadmap' },
    { id: 'secure-link', label: '5. Direct Sync link' }
  ];

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide((prev) => prev + 1);
      playBeep(400 + (activeSlide + 1) * 100, 0.12);
    }
  };

  const handlePrev = () => {
    if (activeSlide > 0) {
      setActiveSlide((prev) => prev - 1);
      playBeep(400 + (activeSlide - 1) * 100, 0.12);
    }
  };

  const handleGoTo = (idx: number) => {
    setActiveSlide(idx);
    playBeep(500 + idx * 50, 0.08);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubmitInquiry(name, email, msg);
    setSent(true);
    playBeep(980, 0.3);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-sans text-white relative min-h-[82vh] flex gap-4">
      
      {/* 1. FLOATING NAVIGATION DOTS DOTBAR RAILS */}
      <div className="hidden md:flex flex-col justify-center items-center gap-4 border-r border-white/10 pr-6 select-none font-mono text-[9px]">
        <span className="text-white/30 text-[8px] tracking-widest block uppercase">// INDEX</span>
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => handleGoTo(i)}
            className="flex items-center gap-3 group w-full text-left"
          >
            <span className={`w-2.5 h-2.5 rounded-full transition-all ${activeSlide === i ? 'bg-[var(--accent)] scale-125 shadow-[0_0_8px_var(--accent)]' : 'bg-white/20 group-hover:bg-white/55'}`} />
            <span className={`transition-all tracking-wider uppercase font-bold text-nowrap ${activeSlide === i ? 'text-[var(--accent)]' : 'text-white/40 group-hover:text-white/70'}`}>
              {s.label}
            </span>
          </button>
        ))}
        
        {/* Navigation Arrow triggers */}
        <div className="flex gap-2 pt-6">
          <button
            onClick={handlePrev}
            disabled={activeSlide === 0}
            className="p-2 border border-white/15 rounded-xl bg-black/40 hover:bg-white/5 duration-150 disabled:opacity-30"
          >
            <ChevronUp className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeSlide === slides.length - 1}
            className="p-2 border border-white/15 rounded-xl bg-black/40 hover:bg-white/5 duration-150 disabled:opacity-30"
          >
            <ChevronDown className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* 2. TRANSITIONAL CONTENT WINDOW CONTAINER */}
      <div className="flex-1 min-w-0 bg-black/40 border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col justify-between min-h-[72vh] relative overflow-hidden backdrop-blur-md">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-[100px] -z-10" />

        {/* Dynamic slides title header tracker */}
        <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest border-b border-white/5 pb-4 text-white/50">
          <span>STORY MODE // SECURE DATA_DECK</span>
          <span className="font-bold text-[var(--accent)] font-mono">PANEL {activeSlide + 1} OF {slides.length}</span>
        </div>

        <div className="my-auto py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              
              {/* SLIDE 1: INTRODUCTION PORTAL */}
              {activeSlide === 0 && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full text-[9px] uppercase tracking-wider text-[var(--accent)] font-bold">
                    <Sparkles className="w-3 h-3 text-[var(--accent)] animate-pulse" /> 01. The Engineering Thesis
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
                    Crafting Clean, Cross-Platform Systems & Dynamic Universes
                  </h2>
                  <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl font-sans">
                    Dharmesh Ahir blends structured state paradigms (BLoC, Riverpod) with custom low-level painting systems, optimized asynchronous task isolates threading, and secure SQLite sync engines. The result: flawless apps operating correctly under any cellular context.
                  </p>
                  <p className="text-xs font-mono text-cyan-400">
                    -- Currently operating immediately out of Surat, India. Full-time remote active.
                  </p>
                </div>
              )}

              {/* SLIDE 2: HARD KPI METRICS */}
              {activeSlide === 1 && (
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[9px] uppercase tracking-wider text-purple-400 font-bold">
                    <Award className="w-3 h-3 text-purple-400" /> 02. Measured Project Impact
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase tracking-tight font-sans">Tangible Business Performance Results</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { factor: 'Downloads volume', score: '50K+', review: 'Across PlayStore / AppStore systems' },
                      { factor: 'SQLite DB Query synchronization', score: '< 0.4ms', review: 'Lock mitigation and conflict queues' },
                      { factor: 'Memory allocation optimization', score: '35% reduction', review: 'Achieved through custom garbage isolate layers' },
                    ].map((m, idx) => (
                      <div key={idx} className="p-5 border border-white/10 bg-black/40 rounded-2xl">
                        <div className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider">{m.factor}</div>
                        <div className="text-2xl font-black text-[var(--accent)] mt-1.5 font-mono">{m.score}</div>
                        <p className="text-[10px] text-white/60 mt-1 leading-relaxed font-sans">{m.review}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 3: MASTERPIECES GATEWAY */}
              {activeSlide === 2 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[9px] uppercase tracking-wider text-cyan-400 font-bold">
                      <Terminal className="w-3 h-3 text-cyan-400" /> 03. Selected Software Solutions
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white/50">{selectedProjIdx + 1} OF {projects.length} CASE STUDY</span>
                  </div>

                  {/* MINI SELECTOR ROW */}
                  <div className="flex flex-wrap gap-2">
                    {projects.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedProjIdx(idx); playBeep(200 + idx * 80, 0.08); }}
                        className={`text-[9px] uppercase font-mono font-bold px-3 py-1.5 rounded-lg border transition-all ${selectedProjIdx === idx ? 'bg-[var(--accent)] text-black font-extrabold border-[var(--accent)]' : 'bg-black/40 text-white/60 border-white/10 hover:text-white'}`}
                      >
                        {p.title.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* ACTIVE COMPRESSED CARD */}
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                    <div className="flex justify-between text-[10px] font-mono text-[var(--accent)] font-bold">
                      <span>SECTOR: {projects[selectedProjIdx].category.toUpperCase()}</span>
                      <span>PERF SCORE: {projects[selectedProjIdx].perfScore}%</span>
                    </div>
                    <h4 className="text-xl font-bold uppercase text-white font-sans">{projects[selectedProjIdx].title}</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">{projects[selectedProjIdx].problem}</p>
                    <div className="flex gap-4 pt-1 text-[9px] font-mono text-cyan-300">
                      <div>STACK: {projects[selectedProjIdx].techStack.slice(0, 3).join(', ')}</div>
                    </div>
                    <button
                      onClick={() => { playBeep(980, 0.05); onInspectProject(projects[selectedProjIdx]); }}
                      className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-black hover:translate-x-1 duration-150 transition-transform block mt-4"
                    >
                      :: Examine full architecture specs &gt;&gt;
                    </button>
                  </div>
                </div>
              )}

              {/* SLIDE 4: HISTORICAL ROLES TIMELINE */}
              {activeSlide === 3 && (
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[9px] uppercase tracking-wider text-amber-400 font-bold">
                    <Award className="w-3 h-3 text-amber-400" /> 04. Career Engagements Matrix
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase tracking-tight">Verified Corporate Experience Record</h3>

                  <div className="space-y-3">
                    {experience.map((exp, idx) => (
                      <div key={idx} className="p-4 bg-black/40 border border-white/10 rounded-xl hover:border-white/25 transition-all">
                        <div className="flex justify-between items-center text-[10px] font-mono text-white/40 font-bold">
                          <span>{exp.company} // {exp.location}</span>
                          <span className="text-[var(--accent)]">{exp.period}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white uppercase mt-1 font-sans">{exp.role}</h4>
                        <p className="text-[11px] text-white/60 leading-relaxed mt-1 font-sans line-clamp-1">{exp.details[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 5: TRANSMISSION CONTACT CARD */}
              {activeSlide === 4 && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                    <MessageSquare className="w-3 h-3 text-emerald-400" /> 05. Secure Partnership Datalink
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase tracking-tight">Initiate Consulting Sync Operations</h3>

                  {sent ? (
                    <div className="p-6 border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 rounded-2xl text-xs font-mono text-center leading-relaxed">
                      🚀 TRANSACTION COMPLETED SUCCESS. <br />
                      Dharmesh's CRM alert has been triggered instantly. <br />
                      A pristine corporate consultation link is headed to you.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Identity/Company Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-black/50 border border-white/10 p-2.5 rounded-xl text-white outline-none focus:border-[var(--accent)] font-sans"
                        />
                        <input
                          type="email"
                          required
                          placeholder="your-email@corporate.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-black/50 border border-white/10 p-2.5 rounded-xl text-white outline-none focus:border-[var(--accent)] font-sans"
                        />
                      </div>
                      <textarea
                        required
                        rows={3}
                        placeholder="Inquire on pricing models, hourly consulting consultation tracks, or full-time remote roles..."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 p-2.5 rounded-xl text-white outline-none focus:border-[var(--accent)] resize-none font-sans"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-[var(--accent)] to-teal-400 text-black font-extrabold uppercase tracking-widest text-[10px] rounded-xl hover:opacity-95 duration-150"
                      >
                        broadcast inquiry payload
                      </button>
                    </form>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic slides footer indicators */}
        <div className="flex justify-between items-center text-[9px] font-mono text-white/30 border-t border-white/5 pt-4">
          <span>SURAT HEADQUARTERS COORDINATES // INDIA TIMEZONE</span>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={activeSlide === 0}
              className="hover:text-[var(--accent)] transition-colors disabled:opacity-20"
            >
              &lt; BACK
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={handleNext}
              disabled={activeSlide === slides.length - 1}
              className="hover:text-[var(--accent)] transition-colors disabled:opacity-20"
            >
              NEXT &gt;
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
