import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';

interface TerminalHackerProps {
  projects: Project[];
  experience: any[];
  onExecuteCommand: (cmd: string) => void;
  playBeep: (freq: number, dur: number) => void;
  onSubmitContact: (name: string, email: string, msg: string) => void;
}

export const TerminalHacker: React.FC<TerminalHackerProps> = ({
  projects,
  experience,
  onExecuteCommand,
  playBeep,
  onSubmitContact,
}) => {
  const [history, setHistory] = useState<string[]>([
    'DHARMESH_CORE SECURE CLIENT PROTOCOL TERMINAL [v4.50] - REGION: SU_IN',
    'SYSTEM METRICS: CORES x8 // HARDWARE: AMD_RYZEN_ARM64 // RAM: ALL_SYS_STABLES',
    '========================================================================',
    'Secure command channel verified. Type "help" to list available instruction parameters.',
    '',
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent, rawCmd?: string) => {
    if (e) e.preventDefault();
    const command = (rawCmd !== undefined ? rawCmd : inputVal).trim();
    if (!command) return;

    playBeep(480, 0.06);
    const newHistory = [...history, `guest@dharmesh-ahir:~$ ${command}`];
    const parts = command.toLowerCase().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1).join(' ');

    let cmdOutput: string[] = [];

    switch (cmd) {
      case 'help':
        cmdOutput = [
          'AVAILABLE SYNOPSIS PARAMETERS:',
          '  help               - Display command reference parameters',
          '  about              - Print narrative developer profile details',
          '  experience         - Show timeline of corporate engineering roles',
          '  projects           - Display digital case studies catalog list',
          '  project [id]       - Drill down architecture detail for a project id',
          '  contact            - Submit secure inquiry (Format: contact [Name];[Email];[Message])',
          '  clear              - Wipe console terminal history logs',
          '  layout [type]      - Switch layouts (classic, bento, apple, workspace)',
          '  sound              - Trigger oscillator synth test frequency',
          '  exit               - Exit hacker console and return to classic dock',
          '',
          '>> TIP: You can click the green highlighted shortcuts below to execute instantly.'
        ];
        break;

      case 'about':
        cmdOutput = [
          'DEVELOPER DOSSIER: DHARMESH AHIR',
          '---------------------------------------',
          'Location       : Surat, Gujarat, India (Remote Ready)',
          'Core Focus     : High-Performance cross-platform mobile apps, bespoke Flutter UI, and sound asynchronous systems.',
          'Experience     : 3+ Years verified professional engineering experience.',
          'Active Toolset : Flutter/Dart, Bloc, Riverpod, SQLite Offline Sync Loops, WebRTC Video Consult Channels.',
        ];
        break;

      case 'experience':
        cmdOutput = ['PROFESSIONAL WORKSPACE RECORDS:', '------------------------------'];
        experience.forEach((exp) => {
          cmdOutput.push(`[${exp.period}] ${exp.role} @ ${exp.company}`);
          exp.details.forEach((d: string) => cmdOutput.push(`  * ${d}`));
        });
        break;

      case 'projects':
        cmdOutput = ['CASE STUDIES INDEXED:', '---------------------'];
        projects.forEach((proj) => {
          cmdOutput.push(`* ID: "${proj.id}" -> ${proj.title} [Perf: ${proj.perfScore}%]`);
          cmdOutput.push(`  Stack: ${proj.techStack.join(', ')}`);
        });
        cmdOutput.push('', 'Type "project [id]" to view full architecture specifications.');
        break;

      case 'project':
        if (!args) {
          cmdOutput = ['Error: Must specify project ID. Usage: "project helix-care"'];
        } else {
          const match = projects.find((p) => p.id === args);
          if (match) {
            cmdOutput = [
              `PROJECT ANALYSIS: ${match.title.toUpperCase()}`,
              '------------------------------------------------',
              `Category      : ${match.category}`,
              `Problem/Scope : ${match.problem}`,
              `Solution      : ${match.solution}`,
              `Architecture  : ${match.architecture}`,
              `Stats Outcomes: ${match.metrics.map((m) => `${m.label}: ${m.value}`).join(' | ')}`,
            ];
          } else {
            cmdOutput = [`Error: Project ID "${args}" not registered. Type "projects" to list IDs.`];
          }
        }
        break;

      case 'contact':
        if (!args || !args.includes(';')) {
          cmdOutput = [
            'Usage: contact [Your Name];[Your Email];[Inquiry Details]',
            'Example: contact John;recruiter@corp.com;Let\'s interview!',
          ];
        } else {
          const contactParts = args.split(';');
          const name = contactParts[0] || 'Guest Hacker';
          const email = contactParts[1] || 'hacker@terminal.io';
          const msg = contactParts[2] || 'Direct pipeline established';

          onSubmitContact(name, email, msg);
          cmdOutput = [
            '>> Syncing packets with CRM Gateway...',
            `>> Synchronized query registered: "${name}" (${email})`,
            '>> Transmission closed [SUCCESS]. Direct callback generated.',
          ];
        }
        break;

      case 'sound':
        playBeep(880, 0.2);
        cmdOutput = ['>> Triggering 880Hz Oscillator Beep Wave. Sync Check OK.'];
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'layout':
        if (!args) {
          cmdOutput = ['Error: Format is: "layout [classic|dev|apple|workspace]"'];
        } else {
          let layoutTarget = args;
          if (args === 'dev') layoutTarget = 'developer-dashboard';
          if (args === 'apple') layoutTarget = 'apple-minimal';
          if (args === 'workspace') layoutTarget = 'left-sidebar';

          onExecuteCommand(`layout-${layoutTarget}`);
          cmdOutput = [`>> Moving layout stream coordinates to "${layoutTarget}" v4...`];
        }
        break;

      case 'exit':
        onExecuteCommand('layout-classic');
        cmdOutput = ['>> Ending console session. Moving back to visual dock...'];
        break;

      default:
        cmdOutput = [`Command not found: "${cmd}". Type "help" to list valid instructions.`];
        break;
    }

    setHistory([...newHistory, ...cmdOutput, '']);
    setInputVal('');
  };

  const executeShortcut = (cmdText: string) => {
    handleCommandSubmit(null as any, cmdText);
  };

  return (
    <div className="w-full bg-black/85 border border-[var(--accent)]/30 rounded-3xl overflow-hidden shadow-[0_0_35px_rgba(var(--accent-rgb),0.07)] h-[70vh] flex flex-col justify-between hover:border-[var(--accent)]/50 transition-all duration-300 relative font-mono backdrop-blur-md">
      {/* SCANLINE EFFECTS LAYER */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.22)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-25" />
      
      {/* TERMINAL TOP DECORATION WINDOW HEADER */}
      <div className="bg-black/40 border-b border-[var(--accent)]/15 px-4 py-3 flex items-center justify-between select-none shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block border border-red-600/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block border border-yellow-600/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/20" />
        </div>
        <div className="text-[10px] font-bold text-[var(--accent)]/70 max-w-sm truncate uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          CONSOLE // SECURE_GUEST_LINK // DVM v4.50
        </div>
        <div className="text-[8px] font-mono font-black text-[var(--accent)]/30 tracking-widest">DVM_ACTIVE</div>
      </div>

      {/* CORE LOG CONTENT WINDOW */}
      <div className="flex-1 overflow-y-auto space-y-2.5 p-6 select-text scrollbar-thin scrollbar-thumb-[var(--accent)]/10">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed text-[var(--accent)] text-[11px] drop-shadow-[0_0_2px_rgba(var(--accent-rgb),0.3)]">
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* CLICKABLE COMMON HELPER SHORTCUTS */}
      <div className="px-5 py-3 border-t border-[var(--accent)]/15 bg-black/45 flex flex-wrap gap-2 items-center text-[9px] select-none text-neutral-400 shrink-0">
        <span className="uppercase text-[var(--accent)]/60 font-black tracking-widest font-mono mr-1.5">[QUICK_SHORTCUTS]:</span>
        {[
          { label: 'System Help', cmd: 'help' },
          { label: 'Dossier Profile', cmd: 'about' },
          { label: 'Experience Logs', cmd: 'experience' },
          { label: 'Project Matrix', cmd: 'projects' },
          { label: 'Oscillator Beep', cmd: 'sound' },
          { label: 'Default Layout', cmd: 'layout classic' }
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => executeShortcut(btn.cmd)}
            className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black border border-[var(--accent)]/20 hover:border-[var(--accent)]/50 rounded-lg font-mono text-[9px] font-extrabold transition-all active:scale-95 duration-200"
          >
            &gt; {btn.label}
          </button>
        ))}
      </div>

      {/* FORM INPUT STYLES with typing prompt */}
      <form onSubmit={(e) => handleCommandSubmit(e)} className="flex gap-2 border-t border-[var(--accent)]/15 p-4 shrink-0 bg-neutral-950/90 relative z-10">
        <span className="text-[var(--accent)] animate-pulse font-black">&gt; guest@dharmesh-ahir:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-transparent border-none text-[var(--accent)] outline-none font-mono focus:ring-0 p-0 text-[11px] drop-shadow-[0_0_2px_rgba(var(--accent-rgb),0.3)] placeholder:text-[var(--accent)]/20"
          autoFocus
          placeholder="System command input..."
        />
      </form>
    </div>
  );
};
