import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Project, Experience } from '../types';
import { BookOpen, Newspaper, Quote, Sparkles, Send, Calendar, Clock, Bookmark } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-20 text-white font-serif relative">
      
      {/* MAGAZINE HEADER / BRANDING */}
      <div className="border-y-2 border-white/25 py-8 text-center space-y-4">
        <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-[0.25em] text-white/50 px-2">
          <span>VOLUME III // ISSUE I</span>
          <span>EST. 2023 // STATE SYNCED</span>
          <span>MAY 2026 EDITION</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-normal tracking-tight uppercase leading-none font-serif">
          THE <span className="italic select-none font-light">ARCHITECT</span>
        </h1>
        <p className="text-xs max-w-xl mx-auto text-white/60 font-sans tracking-wide leading-relaxed">
          A publication surveying the modern cross-platform engineering achievements of Dharmesh Ahir. Intersecting robust offline databases, multithreading, and beautiful visual UI frames.
        </p>
      </div>

      {/* FEATURE ARTICLE: LEADING QUOTE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/10 pb-12">
        <div className="md:col-span-7 space-y-6">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--accent)] font-black text-xs block">// EDITORIAL OPINION</span>
          <h2 className="text-3xl md:text-5xl font-light leading-snug">
            "Software architecture is not about typing templates; it is the art of securing integrity under hostile channels."
          </h2>
          <p className="text-sm font-sans text-white/70 leading-relaxed">
            In modern mobile ecosystems, the average user triggers over two hundred database mutation events on erratic trains, remote sites, or secure basement warehouses. If your storage synchronization loop lacks persistent retry architecture and thread safety, your app suffers user attrition.
          </p>
        </div>
        <div className="md:col-span-5 bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden backdrop-blur-md">
          <Quote className="absolute top-4 right-4 w-24 h-24 text-white/5 -z-10" />
          <div className="space-y-4 font-sans text-xs">
            <h3 className="text-sm font-bold font-serif uppercase tracking-wider text-rose-300">Fast Facts & Metrics</h3>
            <div className="divide-y divide-white/5">
              <div className="py-2.5 flex justify-between">
                <span className="text-white/50">Developer Identity</span>
                <span className="font-bold">Dharmesh Ahir</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-white/50">Core Ecosystem Focus</span>
                <span className="font-bold text-cyan-400">Flutter Cross-Platform</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-white/50">SQLite Sync Speed</span>
                <span className="font-bold font-mono text-emerald-400">&lt; 0.4ms latencies</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-white/50">Direct PlayStore reach</span>
                <span className="font-bold font-mono">50,000+ Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THREE-COLUMN CHRONICLE JOURNAL */}
      <div className="space-y-8">
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <h3 className="text-xl font-normal uppercase tracking-wider flex items-center gap-2 font-serif">
            <Newspaper className="w-5 h-5 text-indigo-400" /> Executive Project Studies
          </h3>
          <span className="text-xs font-mono text-white/50 font-bold hidden sm:inline">({projects.length} FEATURING STUDY SECTIONS)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <motion.div
              key={p.id}
              onClick={() => { playBeep(261 + index * 40, 0.08); onInspectProject(p); }}
              className="flex flex-col justify-between p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all cursor-pointer group min-h-[340px]"
              whileHover={{ y: -6 }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center font-mono text-[9px] text-[var(--accent)] font-bold">
                  <span>SECTOR: {p.category.toUpperCase()}</span>
                  <button 
                    onClick={(e) => toggleBookmark(p.id, e)} 
                    className="hover:scale-125 transition-transform p-1"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked.includes(p.id) ? 'fill-current text-amber-400' : 'text-white/40'}`} />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold font-serif leading-tight text-white group-hover:text-[var(--accent)] transition-colors">
                    {p.title}
                  </h4>
                  <div className="flex gap-4 text-[9px] font-mono text-white/40">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Q2 2026</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Read: {p.perfScore > 98 ? '7 min' : '5 min'}</span>
                  </div>
                </div>

                <p className="text-[11px] font-sans text-white/60 leading-relaxed line-clamp-4">
                  {p.problem}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] group-hover:translate-x-1 duration-200 transition-transform flex items-center gap-1">
                  Examine Feature Article &gt;&gt;
                </span>
                <span className="text-xs font-mono font-bold bg-white/10 px-2 py-0.5 rounded text-white/70">
                  {p.perfScore}% Score
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ROADMAP TIMELINE AS A BIOGRAPHICAL EXPOSITION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-16">
        <div className="lg:col-span-4 space-y-4 font-sans">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--accent)] font-black">// RECORDED CHRONICLES</span>
          <h3 className="text-3xl font-serif font-extralight text-white uppercase tracking-tight">Biographical Roadmap</h3>
          <p className="text-xs text-white/50 leading-relaxed">
            Dharmesh Ahir's deployment matrix lists prestigious engagements directing clean architecture layers, optimization cascades, and scalable multi-threading isolates interfaces.
          </p>
        </div>
        
        <div className="lg:col-span-8 space-y-6">
          {experience.map((exp, idx) => (
            <div key={idx} className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col md:flex-row gap-4 items-start hover:border-white/20 transition-all">
              <div className="w-32 shrink-0 font-mono text-[10px] text-zinc-400 font-bold uppercase mt-1">
                {exp.period}
              </div>
              <div className="space-y-2">
                <span className="text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 bg-white/5 border border-white/10 text-[var(--accent)] rounded-full">HIST_RECORD</span>
                <h4 className="text-lg font-bold font-serif text-white">{exp.role}</h4>
                <div className="text-xs font-semibold text-rose-300 font-sans">{exp.company}</div>
                <p className="text-xs font-sans text-white/60 leading-relaxed mt-2">{exp.details[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBSCRIBE TO THE PUBLISHER (CONTACT FORM) */}
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 font-sans relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl -z-10" />
        <div className="text-center space-y-2">
          <BookOpen className="w-8 h-8 mx-auto text-[var(--accent)]" />
          <h3 className="text-2xl font-serif font-light text-white tracking-tight uppercase">Write to the Publisher</h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
            Have questions about strategic Flutter deployments, local SQLite synchronize matrices, or enterprise contract pricing? Submit an inquiry card directly.
          </p>
        </div>

        {sent ? (
          <div className="p-4 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-2xl text-center text-xs font-mono text-[var(--accent)] animate-fade-in">
            ✉️ MESSAGE TRANSMITTED TO DHARMESH'S DESK SECURELY. TIMELY CORRESPONDENCE SCHEDULED.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-white/50 font-bold font-mono">Your Pen Name / Corporate Identity</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Margaret Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 p-3 rounded-xl text-white outline-none focus:border-[var(--accent)] transition-all font-sans"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-wider text-white/50 font-bold font-mono">Secure Transmission Datalink Mail</label>
                <input
                  type="email"
                  required
                  placeholder="margaret@sterling-consulting.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 p-3 rounded-xl text-white outline-none focus:border-[var(--accent)] transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-wider text-white/50 font-bold font-mono">Inquiry Narrative Payload</label>
              <textarea
                required
                rows={4}
                placeholder="Inquire on full-time options, architecture reviews, or specialized consulting contracts..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full bg-black/60 border border-white/15 p-3 rounded-xl text-white outline-none focus:border-[var(--accent)] transition-all resize-none font-sans leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-white hover:bg-white/90 text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all"
            >
              transmit card &gt;
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
