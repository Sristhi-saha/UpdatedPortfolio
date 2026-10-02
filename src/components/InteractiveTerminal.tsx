'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'init',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">SRISTHI SAHA // FULL-STACK & AI KERNEL v4.2.0</p>
          <p>Type <span className="text-indigo-400 font-semibold">&apos;help&apos;</span> to inspect available terminal routines.</p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    sounds.playClick();
    let response: React.ReactNode;

    switch (cmd) {
      case 'help':
        response = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-cyan-300 font-semibold mb-2">Available Terminal Commands:</p>
            <p><span className="text-indigo-400 w-28 inline-block font-semibold">about</span> - Display developer profile and ethos</p>
            <p><span className="text-indigo-400 w-28 inline-block font-semibold">skills</span> - List Frontend, Backend, AI & Database skills</p>
            <p><span className="text-indigo-400 w-28 inline-block font-semibold">projects</span> - Print catalog of deployed AI & Full-Stack applications</p>
            <p><span className="text-indigo-400 w-28 inline-block font-semibold">education</span> - Display academic credentials and CGPA</p>
            <p><span className="text-indigo-400 w-28 inline-block font-semibold">achievements</span> - Display competitive programming & leadership awards</p>
            <p><span className="text-indigo-400 w-28 inline-block font-semibold">contact</span> - Output direct comms channels (Phone/Email/LinkedIn)</p>
            <p><span className="text-indigo-400 w-28 inline-block font-semibold">matrix</span> - Launch sensory cyber matrix pulse</p>
            <p><span className="text-indigo-400 w-28 inline-block font-semibold">date</span> - View current local timestamp</p>
            <p><span className="text-indigo-400 w-28 inline-block font-semibold">clear</span> - Flush terminal buffer</p>
          </div>
        );
        break;

      case 'about':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-400 font-bold">{PORTFOLIO_DATA.profile.name} — {PORTFOLIO_DATA.profile.title}</p>
            <p className="text-slate-300">Frontend Developer at Orbital Webworks (React.js & Next.js)</p>
            <p className="text-slate-400">Location: {PORTFOLIO_DATA.profile.location}</p>
            <p className="text-emerald-400">Status: {PORTFOLIO_DATA.profile.status}</p>
          </div>
        );
        break;

      case 'skills':
        response = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-semibold">PRIMARY RUNTIME CAPABILITIES:</p>
            <div className="grid grid-cols-2 gap-1 text-slate-300">
              <p>• React.js & Next.js (95%)</p>
              <p>• NestJS & Node.js (92%)</p>
              <p>• Gemini AI API & RAG (94%)</p>
              <p>• TypeScript & JavaScript (92%)</p>
              <p>• MongoDB & PostgreSQL (93%)</p>
              <p>• RabbitMQ & Redis (88%)</p>
            </div>
          </div>
        );
        break;

      case 'education':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-semibold">ACADEMIC BACKGROUND:</p>
            <p className="text-white font-bold">{PORTFOLIO_DATA.education.degree}</p>
            <p className="text-slate-300">{PORTFOLIO_DATA.education.institution} ({PORTFOLIO_DATA.education.period})</p>
            <p className="text-emerald-400 font-bold">CGPA: {PORTFOLIO_DATA.education.cgpa}</p>
          </div>
        );
        break;

      case 'achievements':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-semibold">NOTABLE MILESTONES:</p>
            {PORTFOLIO_DATA.achievements.map((a, i) => (
              <p key={i} className="text-slate-300">• <span className="text-white font-semibold">{a.title}</span>: {a.description}</p>
            ))}
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-semibold">DEPLOYED PLATFORMS & SYSTEMS:</p>
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <div key={i} className="border-l-2 border-indigo-500 pl-2">
                <span className="text-white font-semibold">{p.title}</span> ({p.category})
                <p className="text-slate-400">{p.metrics}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-semibold">DIRECT COMMUNICATIONS:</p>
            <p>Email: <span className="text-white">{PORTFOLIO_DATA.profile.socials.email}</span></p>
            <p>Phone: <span className="text-white">{PORTFOLIO_DATA.profile.phone}</span></p>
            <p>LinkedIn: <span className="text-indigo-400">{PORTFOLIO_DATA.profile.socials.linkedin}</span></p>
            <p>GitHub: <span className="text-indigo-400">{PORTFOLIO_DATA.profile.socials.github}</span></p>
            <p>LeetCode: <span className="text-cyan-400">{PORTFOLIO_DATA.profile.socials.leetcode}</span></p>
          </div>
        );
        break;

      case 'date':
        response = <p className="text-xs text-cyan-300">SYSTEM TIME: {new Date().toLocaleString()}</p>;
        break;

      case 'matrix':
        sounds.playWarp();
        response = (
          <p className="text-xs font-mono text-emerald-400 animate-pulse">
            01010011 01010010 01001001 01010011 01010100 01001000 01001001 // WELCOME TO SRISTHI'S WORKSPACE.
          </p>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        response = (
          <p className="text-xs text-rose-400 font-mono">
            command not found: &apos;{input}&apos;. Type &apos;help&apos; for list of commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: input, output: response }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="terminal-window relative w-full max-w-2xl h-[500px] bg-[#0b0f19] border border-cyan-500/40 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Terminal Header */}
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              bash — sristhi@dev-station: ~
            </span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-sm space-y-4">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="text-cyan-400 font-bold">sristhi@dev:~$</span>
                <span className="text-white">{h.command}</span>
              </div>
              <div className="pl-4">{h.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <form
          onSubmit={handleCommand}
          className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center space-x-2"
        >
          <span className="text-xs font-mono text-cyan-400 font-bold pl-2">sristhi@dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'projects', 'skills'..."
            className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-white placeholder-slate-600 focus:ring-0"
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-cyan-300 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
