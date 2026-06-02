import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Project, Experience } from '../types';
import { ChevronRight, ExternalLink, ArrowUpRight } from 'lucide-react';

interface AppleMinimalViewProps {
  projects: Project[];
  experience: Experience[];
  onInspectProject: (p: Project) => void;
  onSubmitInquiry: (name: string, email: string, msg: string) => void;
  playBeep: (freq: number, dur: number) => void;
}

export const AppleMinimalView: React.FC<AppleMinimalViewProps> = ({
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

  const handleInquire = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubmitInquiry(name, email, msg);
    setSent(true);
    playBeep(1000, 0.1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-24 text-white font-sans selection:bg-neutral-800">
      
      {/* HERO HERO TITLE */}
      <motion.section 
        className="text-center py-16 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-xs uppercase tracking-widest text-[#a1a1a6] font-bold">Concept. Design. Execution.</span>
        <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tight leading-[1.05] text-white">
          Dharmesh Ahir. <br />
          <span className="bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">Creative Flutter Architect.</span>
        </h1>
        <p className="text-lg text-[#a1a1a6] max-w-xl mx-auto leading-relaxed font-sans">
          Engineering smooth rendering pipelines and offline-first data engines with a singular obsession for elegant, micro-animated user interfaces.
        </p>
      </motion.section>

      {/* PORTFOLIO GRID CASE STUDIES */}
      <section className="space-y-12">
        <h2 className="text-xl font-bold text-center tracking-tight text-[#f5f5f7]">The Portfolios Catalog.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, idx) => (
            <motion.div
              key={p.id}
              className="group cursor-pointer bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:bg-[#1c1c1e] transition-all flex flex-col justify-between min-h-[260px]"
              whileHover={{ y: -8 }}
              onClick={() => { playBeep(440, 0.05); onInspectProject(p); }}
            >
              <div>
                <span className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-widest">{p.category}</span>
                <h3 className="text-xl font-extrabold mt-2 text-white flex items-center justify-between">
                  {p.title}
                  <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                </h3>
                <p className="text-[#86868b] text-[12px] leading-relaxed mt-3 line-clamp-3 font-sans">
                  {p.problem}
                </p>
              </div>
              <div className="text-[11px] font-bold text-white group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1 mt-6">
                Explore architectural specification <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NARRATIVE EXPERIENCE ROLES */}
      <section className="space-y-12 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-center tracking-tight text-[#f5f5f7]">The Narrative Roadmap.</h2>
        <div className="space-y-10">
          {experience.map((exp, idx) => (
            <div key={idx} className="border-b border-neutral-800 pb-8 last:border-b-0">
              <span className="text-[11px] font-mono text-[#86868b]">{exp.period}</span>
              <h3 className="text-lg font-bold text-white mt-1">{exp.role}</h3>
              <p className="text-sm font-bold text-[var(--accent)]/80 mb-2">{exp.company}</p>
              <ul className="space-y-1.5 text-xs text-[#86868b] list-disc list-inside">
                {exp.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* INQUIRY SECTION */}
      <section className="max-w-md mx-auto glass-panel p-8 border border-neutral-800 rounded-3xl bg-neutral-900/60 backdrop-blur-md">
        <h2 className="text-lg font-bold text-center text-white mb-4">Request a Consultation</h2>
        {sent ? (
          <div className="text-center text-emerald-400 font-sans text-xs py-4">
            Thank you. Your consultation payload has been registered successfully on Dharmesh's secure terminal. Email transmission pending in &lt; 4 hours.
          </div>
        ) : (
          <form onSubmit={handleInquire} className="space-y-3 text-xs">
            <input 
              type="text" 
              placeholder="Name" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl text-white outline-none focus:border-white text-xs font-sans"
            />
            <input 
              type="email" 
              placeholder="eMail Address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl text-white outline-none focus:border-white text-xs font-sans"
            />
            <textarea 
              placeholder="Details" 
              required
              rows={3}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl text-white outline-none focus:border-white text-xs font-sans resize-none"
            />
            <button type="submit" className="w-full py-2.5 bg-white text-black font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors">
              Request Connection
            </button>
          </form>
        )}
      </section>

    </div>
  );
};
