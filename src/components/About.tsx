'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, Award, CheckCircle2, FileText, Code2, Globe, Trophy, Users } from 'lucide-react';
import { sounds } from '../utils/audio';
import { gsap } from '../utils/gsapSetup';
import { motion, AnimatePresence } from 'framer-motion';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'achievements'>('education');
  const { profile, education, achievements, languages, csFundamentals } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-card-left', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.about-content-right', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: 40,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hologram Card / Identity side */}
          <div className="about-card-left lg:col-span-5 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-indigo-500/30 via-cyan-500/20 to-transparent">
              <div className="rounded-[22px] bg-slate-950/90 p-6 md:p-8 backdrop-blur-xl border border-indigo-500/20 shadow-2xl relative overflow-hidden">
                {/* Holographic Scanlines overlay */}
                <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />

                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5">
                      <div className="w-full h-full rounded-[14px] bg-[#070b1e] flex items-center justify-center font-mono font-bold text-2xl text-cyan-300">
                        ⚡SS
                      </div>
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                    <p className="text-xs font-mono text-cyan-400">{profile.title}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-indigo-400" />
                      {profile.location}
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed font-light mb-6">
                  <p>
                    Frontend developer at <span className="text-cyan-300 font-medium">Orbital Webworks</span> with deep experience engineering responsive, mobile-first web applications using <span className="text-indigo-300 font-medium">Next.js, React.js, and GSAP</span>.
                  </p>
                  <p>
                    Passionate about building autonomous agentic AI architectures (LangChain, LangGraph, NestJS) and full-stack platforms powered by <span className="text-cyan-300 font-medium">Google Gemini AI</span>.
                  </p>
                </div>

                {/* Identity Specs Pill Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-6">
                  <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-300">
                    <span className="text-slate-500 block text-[10px]">CURRENT ROLE</span>
                    Frontend Dev @ Orbital
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-300">
                    <span className="text-slate-500 block text-[10px]">EDUCATION</span>
                    BCA (CGPA: 8.5/10.0)
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-300">
                    <span className="text-slate-500 block text-[10px]">DSA SOLVED</span>
                    120+ on LeetCode/GFG
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-300">
                    <span className="text-slate-500 block text-[10px]">AI EXPERTISE</span>
                    Gemini AI API & RAG
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#resume"
                    onClick={() => sounds.playClick()}
                    className="py-3 px-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-xs flex items-center justify-center space-x-1.5 transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>View Resume</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#contact"
                    onClick={() => sounds.playClick()}
                    className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-xs flex items-center justify-center space-x-1.5 transition-all hover:border-cyan-400/50"
                  >
                    <span>Contact Me</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Content */}
          <div className="about-content-right lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-4">
                <Code2 className="w-3.5 h-3.5" />
                <span>PROFILE // QUALIFICATIONS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Engineering Modern Frontends & <span className="cyber-gradient-text">Autonomous AI Systems</span>
              </h2>
            </div>

            {/* Nav Tabs */}
            <div className="flex space-x-2 border-b border-slate-800 pb-2">
              {[
                { id: 'education', label: 'Academic & CS' },
                { id: 'experience', label: 'Work Highlights' },
                { id: 'achievements', label: 'Achievements' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab(tab.id as unknown as 'education' | 'experience' | 'achievements');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600/20 text-cyan-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Framer Motion Animated Tab Transitions */}
            <AnimatePresence mode="wait">
              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-2xl glass-panel-glow border border-indigo-500/20">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base">{education.degree}</h4>
                          <p className="text-xs font-mono text-cyan-400">{education.institution}</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                        CGPA: {education.cgpa}
                      </div>
                    </div>

                    <p className="text-xs font-mono text-slate-400 mb-4">{education.period}</p>

                    <ul className="space-y-2 text-xs text-slate-300">
                      {education.highlights.map((h, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CS Fundamentals & Languages pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl glass-panel border border-slate-800">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                        Languages
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {languages.map((lang, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl glass-panel border border-slate-800">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                        CS Fundamentals
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {csFundamentals.map((cs, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                            {cs}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-2xl glass-panel border border-slate-800">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div>
                        <h4 className="font-bold text-white text-base">Frontend Developer</h4>
                        <p className="text-xs font-mono text-indigo-400">Orbital Webworks • Remote, India</p>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        July 2025 — Present
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-300 my-4">
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Optimized live React.js and Next.js applications, boosting page load speeds via lazy loading, code splitting, and image optimization.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Engineered responsive, mobile-first websites with custom React components, adhering to strict WCAG accessibility and cross-browser standards.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Partnered with designers and backend architects to deliver pixel-perfect, accessible, and high-performance UI systems.</span>
                      </li>
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                      {['Next.js', 'React.js', 'GSAP', 'Tailwind CSS', 'WordPress', 'JavaScript', 'WCAG'].map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  {achievements.map((item, idx) => (
                    <motion.div
                      whileHover={{ scale: 1.01, x: 4 }}
                      key={idx}
                      className="p-4 rounded-2xl glass-panel border border-slate-800/80 flex items-start space-x-3.5 hover:border-cyan-500/30 transition-all"
                    >
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                        {idx === 0 && <Trophy className="w-4 h-4" />}
                        {idx === 1 && <Award className="w-4 h-4" />}
                        {idx === 2 && <Users className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
