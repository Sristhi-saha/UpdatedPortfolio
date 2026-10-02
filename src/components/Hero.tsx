'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowRight, Terminal, Sparkles, Check, Copy, Laptop, Cpu, FileText } from 'lucide-react';
import { sounds } from '../utils/audio';
import { gsap } from '../utils/gsapSetup';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const { profile } = PORTFOLIO_DATA;
  const [copiedCode, setCopiedCode] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', { opacity: 0, y: -20, duration: 0.7 })
        .from('.hero-title', { opacity: 0, y: 35, duration: 0.9 }, '-=0.4')
        .from('.hero-desc', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
        .from('.hero-btn', { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, '-=0.4')
        .from('.hero-stat', { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, '-=0.3')
        .from('.hero-code-card', { opacity: 0, scale: 0.94, duration: 1, ease: 'back.out(1.2)' }, '-=0.7');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const copySnippet = () => {
    sounds.playClick();
    const code = `const developer = {
  name: "Sristhi Saha",
  role: "Frontend Developer @ Orbital Webworks",
  education: "BCA (CGPA: 8.5/10.0)",
  dsaSolved: "120+ (LeetCode & GFG)",
  coreStack: ["React.js", "Next.js", "GSAP", "Framer Motion", "Gemini AI"],
  openToWork: true
};`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & CTA */}
          <div className="lg:col-span-6 space-y-6">
            {/* Availability Pill */}
            <div className="hero-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile.status}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Frontend Developer <br />
                <span className="cyber-gradient-text">& AI Architect</span>
              </h1>
              <p className="hero-desc text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                Hello, I&apos;m <span className="text-slate-900 dark:text-white font-semibold">{profile.name}</span> — Frontend Developer at Orbital Webworks, crafting high-performance Next.js interfaces with GSAP ScrollTrigger, Framer Motion, and autonomous Gemini AI architectures.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2"style={{opacity:1}}>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                onClick={() => sounds.playClick()}
                style={{opacity:1}}
                className="hero-btn group relative inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-cyan-500/40 transition-all"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={profile.resumeUrl || "/Sristhi_Saha_Resume.pdf"}
                target="_blank"
                rel="noreferrer"
                style={{opacity:1}}
                onClick={() => sounds.playClick()}
                className="hero-btn inline-flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold transition-all shadow-sm"
              >
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Resume / CV</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{opacity:1}}
                onClick={() => {
                  sounds.playWarp();
                  onOpenTerminal();
                }}
                className="hero-btn inline-flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 text-sm font-mono font-medium transition-all shadow-sm"
              >
                <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Terminal</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#contact"
                onClick={() => sounds.playClick()}
                className="hero-btn inline-flex items-center space-x-2 px-4 py-3.5 rounded-2xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm font-semibold transition-colors"
              >
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Contact</span>
              </motion.a>
            </div>

            {/* Real-time Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/80">
              {profile.stats.map((stat, idx) => (
                <div key={idx} className="hero-stat space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean, Minimalist Interactive Developer Card */}
          <div className="lg:col-span-6 relative">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="hero-code-card code-window rounded-3xl bg-[#090d16] border border-indigo-500/30 p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
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
                <p className="pl-4"><span className="text-slate-400">frameworks:</span> [<span className="text-amber-300">&quot;Next.js&quot;</span>, <span className="text-amber-300">&quot;React.js&quot;</span>, <span className="text-amber-300">&quot;NestJS&quot;</span>],</p>
                <p className="pl-4"><span className="text-slate-400">motionStack:</span> [<span className="text-cyan-300">&quot;GSAP&quot;</span>, <span className="text-cyan-300">&quot;ScrollTrigger&quot;</span>, <span className="text-cyan-300">&quot;Framer Motion&quot;</span>],</p>
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
                    <span className="text-slate-500 block text-[10px]">MOTION & AI</span>
                    <span className="text-white font-semibold">GSAP + Gemini AI</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
