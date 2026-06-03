import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Experience } from '../types';
import { BookOpen, Newspaper, Quote, Sparkles, Send, Calendar, Clock, Bookmark, ChevronRight } from 'lucide-react';

interface InteractiveMagazineViewProps {
  projects: Project[];
  experience: Experience[];
  onInspectProject: (p: Project) => void;
  onSubmitInquiry: (name: string, email: string, msg: string) => void;
  playBeep: (freq: number, dur: number) => void;
}

export const InteractiveMagazineView: React.FC<InteractiveMagazineViewProps> = ({
  projects,
  experience,
  onInspectProject,
  onSubmitInquiry,
  playBeep,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  
  // Custom scroll tracking states
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeChapter, setActiveChapter] = useState('prologue');

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById('magazine-root');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight > 0) {
        const percent = Math.min(Math.max((scrolled / totalHeight) * 100, 0), 100);
        setScrollPercent(percent);
      }

      // Check which section is in view
      const sections = ['prologue', 'projects', 'timeline', 'dispatch'];
      for (const sec of sections) {
        const el = document.getElementById(`magazine-sec-${sec}`);
        if (el) {
          const sRect = el.getBoundingClientRect();
          if (sRect.top <= 250 && sRect.bottom >= 250) {
            setActiveChapter(sec);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial tick
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubmitInquiry(name, email, msg);
    setSent(true);
    playBeep(440, 0.25);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    playBeep(880, 0.05);
  };

  return (
    <div id="magazine-root" className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-16 text-white relative">
      
      {/* Localized Sticky Magazine Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-[1000] bg-black/40 backdrop-blur-md pointer-events-none select-none">
        <div 
          className="h-full bg-gradient-to-r from-[var(--accent)] via-purple-500 to-cyan-400 transition-all duration-75 shadow-[0_2px_12px_var(--accent)]"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* MAGAZINE HEADER / BRANDING */}
      <div className="border-y-2 border-white/20 py-8 text-center space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-[9px] uppercase font-mono tracking-[0.25em] text-zinc-400 px-2 gap-2">
          <span>VOLUME III // ISSUE I</span>
          <span className="text-[var(--accent)] font-bold">● EXCLUSIVE DIGITAL DISPATCH</span>
          <span>MAY 2026 EDITION</span>
        </div>
        <h1 className="text-6xl md:text-9xl font-normal tracking-tight uppercase leading-none font-serif select-none">
          THE <span className="italic font-light text-[var(--accent)]">ARCHITECT</span>
        </h1>
        <p className="text-xs max-w-2xl mx-auto text-zinc-400 font-sans tracking-wide leading-relaxed font-normal">
          A weekly monograph surveying cross-platform engineering, custom graphics shaders, multithreaded runtime isolates, and high-performance Dart pipelines designed by Dharmesh Ahir.
        </p>
      </div>

      {/* THREE-COLUMN LAYOUT: Side Nav, Main Article, Minimap */}
      <div className="flex gap-8 items-start relative">
        
        {/* COLUMN 1: Chapter Index Side-Navigation (Left) */}
        <div className="hidden lg:block w-48 shrink-0 select-none">
          <div className="sticky top-28 space-y-4 font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-black">
            <span className="block border-b border-white/10 pb-2 text-zinc-400 font-black">// CHAPTER INDEX</span>
            {[
              { id: 'prologue', label: '01. Prologue / Op-Ed' },
              { id: 'projects', label: '02. Case Chronicles' },
              { id: 'timeline', label: '03. Historical Log' },
              { id: 'dispatch', label: '04. Write Publisher' }
            ].map((ch) => (
              <button
                key={ch.id}
                onClick={() => document.getElementById(`magazine-sec-${ch.id}`)?.scrollIntoView({ behavior: 'smooth' })}
                className={`block w-full text-left transition-all hover:text-[var(--accent)] cursor-pointer ${
                  activeChapter === ch.id 
                    ? 'text-[var(--accent)] pl-2 border-l-2 border-[var(--accent)] font-extrabold' 
                    : 'border-l-2 border-transparent pl-2'
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>
        </div>

        {/* COLUMN 2: Main Magazine Reading Frame (Center) */}
        <div className="flex-1 min-w-0 space-y-24">
          
          {/* CHAPTER 1: Prologue Editorial Opinion & Animated Pull Quote */}
          <div id="magazine-sec-prologue" className="space-y-10 scroll-mt-24">
            
            <div className="space-y-6 max-w-3xl leading-relaxed select-text">
              <span className="text-[9.5px] uppercase font-mono tracking-widest text-[var(--accent)] font-black block">// 01. EDITORIAL PROLOGUE</span>
              
              {/* Premium serif dropcap text */}
              <p className="text-lg md:text-xl font-serif font-light text-zinc-200 leading-relaxed">
                <span className="text-5xl font-normal text-[var(--accent)] float-left mr-2.5 line-height-none mt-1 font-serif select-none">I</span>
                n modern cross-platform engineering, clean application architecture isn't about formatting code; it is the art of securing state integrity under hostile network channels.
              </p>
              
              <p className="text-sm font-sans text-zinc-400 leading-relaxed">
                A mobile client is inherently unpredictable. Applications operate inside subways, rural areas, and secure vaults. When mutation calls fail due to transient drops, an architecture lacking synchronized SQLite buffers and event loops will inevitably lose data.
              </p>
            </div>

            {/* Premium Animated Pull Quote */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-y border-white/10 py-8 my-6 relative overflow-hidden max-w-4xl"
            >
              <Quote className="absolute top-2 left-2 w-20 h-20 text-white/[0.02] -z-10 select-none pointer-events-none" />
              <blockquote className="text-2xl md:text-4xl font-serif italic text-white/90 font-light leading-snug pl-6 border-l-4 border-[var(--accent)] pr-4">
                "Writing clean state operations eliminates runtime failures. By separating event streams from UI elements, developers build platforms that scale predictably."
              </blockquote>
              <cite className="block text-[9.5px] font-mono uppercase tracking-widest text-[var(--accent)] mt-4 pl-6 font-bold">
                — Dharmesh Ahir, Architectural Principles
              </cite>
            </motion.div>

            {/* Visual Specs grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                <span className="text-[8px] font-mono uppercase text-zinc-550 font-black tracking-widest block">// DESIGN SPECS</span>
                <h4 className="text-sm font-bold font-serif text-white">Rendering Latency Control</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Mitigating rendering stuttering on high refresh-rate panels by offloading heavy JSON parsing and local synchronizations to secondary thread workers.
                </p>
              </div>
              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                <span className="text-[8px] font-mono uppercase text-zinc-550 font-black tracking-widest block">// PERFORMANCE RATIO</span>
                <h4 className="text-sm font-bold font-serif text-white">Immutability Loop</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Enforcing strict state mutations via predictable event loops, preventing race conditions during simultaneous SQLite writes.
                </p>
              </div>
            </div>

          </div>

          {/* CHAPTER 2: Project Chronicles (Projects Catalog) */}
          <div id="magazine-sec-projects" className="space-y-10 scroll-mt-24">
            
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <span className="text-[9.5px] uppercase font-mono tracking-widest text-[var(--accent)] font-black block">// 02. CASE SPECIFICATIONS</span>
                <h3 className="text-3xl font-serif font-light text-white uppercase tracking-tight mt-1">Executive Project Chronicle</h3>
              </div>
              <span className="text-[9px] font-mono text-zinc-400 font-bold hidden sm:inline">({projects.length} SPEC FEED ARTICLES)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((p, index) => (
                <motion.div
                  key={p.id}
                  onClick={() => { playBeep(261 + index * 40, 0.08); onInspectProject(p); }}
                  className="flex flex-col justify-between p-6 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[var(--accent)]/40 rounded-2xl transition-all cursor-pointer group min-h-[380px] shadow-lg relative overflow-hidden"
                  whileHover={{ y: -6 }}
                >
                  {/* Glossy Reflective Accent Layer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="space-y-5">
                    <div className="flex justify-between items-center font-mono text-[9px] text-[var(--accent)] font-bold">
                      <span className="bg-[var(--accent)]/10 px-2 py-0.5 rounded uppercase tracking-wider">SECTOR: {p.category}</span>
                      <button 
                        onClick={(e) => toggleBookmark(p.id, e)} 
                        className="hover:scale-125 transition-all p-1 relative z-25"
                        title="Bookmark Article"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked.includes(p.id) ? 'fill-current text-amber-400' : 'text-zinc-500 hover:text-white'}`} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-bold font-serif leading-tight text-white group-hover:text-[var(--accent)] transition-colors">
                        {p.title}
                      </h4>
                      <div className="flex gap-4 text-[9px] font-mono text-zinc-450 uppercase font-black tracking-wider">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Q2 2026</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Read: {p.perfScore > 98 ? '7 min' : '5 min'}</span>
                      </div>
                    </div>

                    <p className="text-xs font-sans text-zinc-400 leading-relaxed line-clamp-4 select-text">
                      {p.problem}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] group-hover:translate-x-1 duration-200 transition-transform flex items-center gap-1 font-bold">
                      Examine Spec Sheets <ChevronRight className="w-3 h-3" />
                    </span>
                    <span className="text-[9.5px] font-mono font-black bg-white/5 border border-white/5 px-2 py-0.5 rounded text-zinc-350">
                      Perf: {p.perfScore}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* CHAPTER 3: Biographical Timeline */}
          <div id="magazine-sec-timeline" className="space-y-10 scroll-mt-24">
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-white/10 pb-4 gap-2">
              <div>
                <span className="text-[9.5px] uppercase font-mono tracking-widest text-[var(--accent)] font-black block">// 03. CHRONICLES OF ENGAGEMENT</span>
                <h3 className="text-3xl font-serif font-light text-white uppercase tracking-tight mt-1">Biographical Timeline</h3>
              </div>
              <p className="text-xs font-sans text-zinc-400 max-w-sm leading-relaxed md:text-right">
                Verified milestones representing senior roles deploying Flutter/Dart enterprise clients.
              </p>
            </div>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col md:flex-row gap-6 items-start hover:bg-white/[0.02] hover:border-white/10 transition-all select-text">
                  <div className="w-36 shrink-0 font-mono text-[10.5px] text-[var(--accent)] font-black uppercase tracking-wider mt-1 border-l-2 border-[var(--accent)] pl-3">
                    {exp.period}
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-lg font-bold font-serif text-white">{exp.role}</h4>
                    <div className="text-xs font-bold text-rose-300 font-sans tracking-wide">{exp.company} — {exp.location}</div>
                    <p className="text-xs font-sans text-zinc-400 leading-relaxed mt-2">{exp.details[0]}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.tags.slice(0, 4).map((t, tIdx) => (
                        <span key={tIdx} className="bg-white/5 px-2 py-0.5 rounded text-[8.5px] font-mono text-zinc-450 uppercase font-bold">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* CHAPTER 4: Write to Publisher (Contact Form) */}
          <div id="magazine-sec-dispatch" className="space-y-10 scroll-mt-24">
            
            <div className="max-w-2xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-6 font-sans relative overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
              
              <div className="text-center space-y-2 select-none">
                <BookOpen className="w-8 h-8 mx-auto text-[var(--accent)] animate-pulse" />
                <h3 className="text-2xl font-serif font-light text-white tracking-tight uppercase">Write to the Publisher</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Have questions about custom component integration, contract schedules, or remote consulting? Submit your inquiry payload.
                </p>
              </div>

              {sent ? (
                <div className="p-5 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-2xl text-center text-xs font-mono text-[var(--accent)] animate-fade-in font-bold">
                  ✉️ PAYLOAD CONCLUDED SECURELY. TIMELY CORRESPONDENCE SCHEDULED.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold font-mono">Pen Name / Company ID</label>
                      <input
                        type="text"
                        required
                        placeholder="E.g., Margaret Sterling"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 p-3 rounded-xl text-white outline-none focus:border-[var(--accent)] transition-all font-sans text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold font-mono">Datalink / Email address</label>
                      <input
                        type="email"
                        required
                        placeholder="margaret@sterling.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 p-3 rounded-xl text-white outline-none focus:border-[var(--accent)] transition-all font-sans text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold font-mono">Inquiry Briefing Payload</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline specialized project goals, code assessments, or contract constraints..."
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 p-3 rounded-xl text-white outline-none focus:border-[var(--accent)] transition-all resize-none font-sans leading-relaxed text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-white hover:bg-zinc-100 text-black font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer hover:scale-[1.01] active:scale-95"
                  >
                    transmit dispatch card &gt;
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* COLUMN 3: Visual Reading Minimap Sidebar (Right) */}
        <div className="hidden xl:block w-16 shrink-0 select-none">
          <div className="sticky top-28 flex flex-col items-center gap-2 p-2 px-2.5 bg-white/[0.01] border border-white/5 rounded-xl">
            <span className="text-[7.5px] font-mono text-zinc-550 mb-1 uppercase font-black tracking-widest text-center">Map</span>
            {[
              { id: 'prologue', height: 40, label: 'Hero Section' },
              { id: 'projects', height: 60, label: 'Project Catalog' },
              { id: 'timeline', height: 50, label: 'Chronicle History' },
              { id: 'dispatch', height: 35, label: 'Publisher Dispatch' }
            ].map((mapItem) => (
              <button
                key={mapItem.id}
                onClick={() => document.getElementById(`magazine-sec-${mapItem.id}`)?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-2 rounded-sm transition-all duration-350 cursor-pointer ${
                  activeChapter === mapItem.id 
                    ? 'bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] ring-1 ring-[var(--accent)]/50' 
                    : 'bg-white/10 hover:bg-white/30'
                }`}
                style={{ height: `${mapItem.height}px` }}
                title={`Jump to: ${mapItem.label}`}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
