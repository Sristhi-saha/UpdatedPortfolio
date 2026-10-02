import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowRight, Terminal, Sparkles, Check, Copy, Code2, Globe, Cpu, Laptop, FileText } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const { profile } = PORTFOLIO_DATA;
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `const developer = {
  name: "Sristhi Saha",
  role: "Frontend Developer",
  company: "Orbital Webworks",
  education: "BCA (CGPA: 8.5/10.0)",
  dsaSolved: "120+ Problems",
  coreStack: ["React.js", "Next.js", "NestJS", "Gemini AI"],
  availableForHire: true
};`;

  const copySnippet = () => {
    sounds.playClick();
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & CTA */}
          <div className="lg:col-span-6 space-y-6">
            {/* Availability Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile.status}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Frontend Developer <br />
                <span className="cyber-gradient-text">& AI Architect</span>
              </h1>
              <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                Hello, I&apos;m <span className="text-white font-medium">{profile.name}</span> — Frontend Developer at Orbital Webworks, crafting high-performance React/Next.js interfaces, distributed backend architectures, and Gemini AI agentic systems.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="group relative inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#resume"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium transition-all hover:scale-[1.02]"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Resume / CV</span>
              </a>

              <button
                onClick={() => {
                  sounds.playWarp();
                  onOpenTerminal();
                }}
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 text-sm font-mono transition-all hover:scale-[1.02]"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Terminal</span>
              </button>

              <a
                href="#contact"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center space-x-2 px-4 py-3.5 rounded-2xl text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Contact</span>
              </a>
            </div>

            {/* Real-time Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              {profile.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean, Minimalist Interactive Developer Card */}
          <div className="lg:col-span-6 relative">
            <div className="code-window rounded-3xl bg-[#090d16] border border-indigo-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">sristhi.config.ts</span>
                </div>

                <button
                  onClick={copySnippet}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
                  title="Copy code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code Presentation */}
              <div className="font-mono text-xs md:text-sm text-slate-300 space-y-1.5 leading-relaxed overflow-x-auto pb-4">
                <p><span className="text-indigo-400">const</span> <span className="text-cyan-300">developer</span> = &#123;</p>
                <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-emerald-300">&quot;Sristhi Saha&quot;</span>,</p>
                <p className="pl-4"><span className="text-slate-400">currentRole:</span> <span className="text-emerald-300">&quot;Frontend Developer @ Orbital Webworks&quot;</span>,</p>
                <p className="pl-4"><span className="text-slate-400">education:</span> <span className="text-emerald-300">&quot;BCA • CGPA 8.5/10.0&quot;</span>,</p>
                <p className="pl-4"><span className="text-slate-400">dsaSolved:</span> <span className="text-cyan-400">&quot;120+ (LeetCode & GFG)&quot;</span>,</p>
                <p className="pl-4"><span className="text-slate-400">languages:</span> [<span className="text-amber-300">&quot;JavaScript&quot;</span>, <span className="text-amber-300">&quot;TypeScript&quot;</span>, <span className="text-amber-300">&quot;C++&quot;</span>, <span className="text-amber-300">&quot;Java&quot;</span>],</p>
                <p className="pl-4"><span className="text-slate-400">coreTech:</span> [<span className="text-cyan-300">&quot;React.js&quot;</span>, <span className="text-cyan-300">&quot;Next.js&quot;</span>, <span className="text-cyan-300">&quot;NestJS&quot;</span>, <span className="text-cyan-300">&quot;Gemini AI&quot;</span>],</p>
                <p className="pl-4"><span className="text-slate-400">openToWork:</span> <span className="text-emerald-400">true</span></p>
                <p>&#125;;</p>
              </div>

              {/* Interactive Quick Badges */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center space-x-2.5">
                  <Laptop className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px]">EXPERIENCE</span>
                    <span className="text-white font-semibold">Orbital Webworks</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center space-x-2.5">
                  <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px]">AGENTIC AI</span>
                    <span className="text-white font-semibold">Gemini + LangGraph</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
