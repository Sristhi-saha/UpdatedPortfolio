'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export const Footer: React.FC<{ onOpenTerminal: () => void }> = ({ onOpenTerminal }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerEasterEgg = () => {
    sounds.playWarp();
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.9 },
      colors: ['#06b6d4', '#6366f1', '#ec4899', '#10b981'],
    });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl relative z-10 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-900">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm">
              SS
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white tracking-wider">
                SRISTHI SAHA
              </div>
              <div className="text-xs font-mono text-indigo-600 dark:text-cyan-400 font-semibold">
                FRONTEND & FULL-STACK AI DEVELOPER
              </div>
            </div>
          </div>

          {/* Live System Time */}
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>LOCAL_TIME //</span>
            <span className="text-indigo-700 dark:text-cyan-300 font-bold">{time || '00:00:00 UTC'}</span>
          </div>

          {/* Back to top + Easter Egg */}
          <div className="flex items-center space-x-3">
            <button
              onClick={triggerEasterEgg}
              className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-600/10 dark:hover:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-cyan-300 transition-all text-xs font-mono flex items-center space-x-1.5 shadow-sm"
              title="Trigger Quantum Pulse"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">WARP PULSE</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shadow-sm"
              title="Return to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Sristhi Saha. Built with React, Next.js & Tailwind CSS.</p>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <button
              onClick={() => {
                sounds.playWarp();
                onOpenTerminal();
              }}
              className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL</span>
            </button>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% LIGHTHOUSE READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
