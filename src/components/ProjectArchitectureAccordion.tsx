import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Cpu, Server, Database, GitBranch, ShieldCheck, Play } from 'lucide-react';

interface ProjectArchitectureAccordionProps {
  techStack: string[];
  category: string;
}

export const ProjectArchitectureAccordion: React.FC<ProjectArchitectureAccordionProps> = ({ techStack, category }) => {
  const [activeTier, setActiveTier] = useState<string | null>(null);

  const tiers = [
    {
      id: 'frontend',
      title: '1. Presentation Layer (Frontend App)',
      icon: Cpu,
      mainTech: techStack.filter(t => t.toLowerCase().includes('flutter') || t.toLowerCase().includes('dart') || t.toLowerCase().includes('ui') || t.toLowerCase().includes('web') || t.toLowerCase().includes('mobile')),
      details: 'Renders the cross-platform viewport. Incorporates custom gesture-driven layouts, safe isolations, and localized offline caches in Riverpod/GetX widgets.',
      performance: '60 - 120 FPS'
    },
    {
      id: 'backend',
      title: '2. Integration Conduit (Backend & API)',
      icon: Server,
      mainTech: techStack.filter(t => t.toLowerCase().includes('api') || t.toLowerCase().includes('webrtc') || t.toLowerCase().includes('rest') || t.toLowerCase().includes('server') || t.toLowerCase().includes('gateway')),
      details: 'Secures remote data-channels. Proxies direct API communications, manages low-latency STUN/TURN negotiations, and parses HTML variables cleanly.',
      performance: '<12ms Latency'
    },
    {
      id: 'database',
      title: '3. Persistence Storage (Local/Cloud DB)',
      icon: Database,
      mainTech: techStack.filter(t => t.toLowerCase().includes('firestore') || t.toLowerCase().includes('sqlite') || t.toLowerCase().includes('hive') || t.toLowerCase().includes('firebase') || t.toLowerCase().includes('db')),
      details: 'Coordinates multi-tenant document queries. Leverages local database partitions to write instant transactions offline and synchronize with cloud datastores.',
      performance: '<4ms Cache Query'
    },
    {
      id: 'continuous',
      title: '4. Delivery Tunnel (CI/CD & Deploy)',
      icon: GitBranch,
      mainTech: techStack.filter(t => t.toLowerCase().includes('deploy') || t.toLowerCase().includes('testflight') || t.toLowerCase().includes('auth') || t.toLowerCase().includes('integration')),
      details: 'Launches automated pipelines. Bundles builds inside containerized workflows and propagates compiled mobile/web payloads securely downstream.',
      performance: 'OAuth TLS 1.3'
    }
  ];

  const handleToggle = (id: string) => {
    setActiveTier(activeTier === id ? null : id);
  };

  return (
    <div className="space-y-2 mt-4">
      <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider block">// INTERACTIVE COMPONENT BLUEPRINT STRUCTURE</span>
      
      <div className="border border-white/10 rounded-2xl bg-neutral-950/40 divide-y divide-white/5 overflow-hidden font-sans text-xs">
        {tiers.map((tier) => {
          const TierIcon = tier.icon;
          const isExpanded = activeTier === tier.id;
          return (
            <div key={tier.id} className="transition-colors hover:bg-white/[0.01]">
              <button
                type="button"
                onClick={() => handleToggle(tier.id)}
                className="w-full p-3.5 flex items-center justify-between text-left outline-none text-white font-semibold transition"
              >
                <div className="flex items-center gap-2.5">
                  <TierIcon className={`w-4 h-4 transition-transform ${isExpanded ? 'text-[var(--accent)] scale-110' : 'text-neutral-500'}`} />
                  <span className="text-[11px] font-sans font-bold tracking-wide">{tier.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">{tier.performance}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-neutral-400" /> : <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-black/60 border-t border-white/5 text-neutral-300 space-y-3 font-sans text-[11px] leading-relaxed">
                      <p>{tier.details}</p>
                      
                      {/* Dynamic highlights based on actual code metrics */}
                      {tier.mainTech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 items-center pt-1.5">
                          <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-neutral-500">Active Packages:</span>
                          {tier.mainTech.map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[9px] text-[var(--accent)] leading-none">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Animated data packet simulation tracer */}
                      <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent animate-[shimmer_2s_infinite]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
