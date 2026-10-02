'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { FileText, Download, ExternalLink, Printer, Check, Copy, GraduationCap, Briefcase, Trophy, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';
import { gsap } from '../utils/gsapSetup';
import { motion } from 'framer-motion';

export const ResumeSection: React.FC = () => {
  const { profile, education, experiences } = PORTFOLIO_DATA;
  const [downloaded, setDownloaded] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.resume-hub-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    sounds.playSuccess();
    setDownloaded(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#06b6d4', '#10b981'],
    });
    setTimeout(() => setDownloaded(false), 3000);
  };

  const copyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(profile.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="resume" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-4 tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>CURRICULUM VITAE // VERIFIED PROFILE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Download <span className="cyber-gradient-text">Official Resume</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Review my complete credentials, live production experience at Orbital Webworks, academic standing at Chandannagar Institute, and project architectures.
          </p>
        </div>

        {/* Central Document Card & Action Hub */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="resume-hub-card glass-panel-glow rounded-3xl border border-indigo-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Top Bar with Document Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Sristhi_Saha_Resume.pdf
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      ATS Verified
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Format: PDF • Updated: October 2026 • Verified Profile
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={profile.resumeUrl || "/Sristhi_Saha_Resume.pdf"}
                  download="Sristhi_Saha_Resume.pdf"
                  onClick={handleDownload}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-mono text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-transform"
                >
                  {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{downloaded ? 'Downloaded!' : 'Download PDF'}</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={profile.resumeUrl || "/Sristhi_Saha_Resume.pdf"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs flex items-center space-x-1.5 transition-colors"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View</span>
                </motion.a>

                {profile.resumeDriveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={profile.resumeDriveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playClick()}
                    className="py-2.5 px-3.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-xs flex items-center space-x-1.5 transition-colors"
                    title="Open Google Drive link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Drive Link</span>
                  </motion.a>
                )}

                <button
                  onClick={() => {
                    sounds.playClick();
                    window.print();
                  }}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white font-mono text-xs flex items-center space-x-1.5 transition-colors hidden sm:flex"
                  title="Print document"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Quick Resume Snapshot Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Education Box */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    DEGREE & INSTITUTION
                  </span>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {education.degree}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {education.institution} ({education.period})
                  </div>
                  <div className="text-[11px] font-mono font-bold text-emerald-400 mt-1">
                    CGPA: {education.cgpa}
                  </div>
                </div>
              </div>

              {/* Experience Box */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    CURRENT PRODUCTION ROLE
                  </span>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {experiences[0].role}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {experiences[0].company} • {experiences[0].location}
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400 mt-1">
                    {experiences[0].period}
                  </div>
                </div>
              </div>

              {/* DSA Problem Solving */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    COMPETITIVE PROGRAMMING
                  </span>
                  <div className="text-xs font-bold text-white mt-0.5">
                    120+ DSA Problems Solved
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Active practice across LeetCode & GeeksforGeeks
                  </div>
                </div>
              </div>

              {/* Core Competencies */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    CORE SPECIALIZATION
                  </span>
                  <div className="text-xs font-bold text-white mt-0.5">
                    Next.js, React.js, GSAP, NestJS & Gemini AI
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Full-Stack MERN, Modular Monolith, LangGraph
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Pill Bar */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-slate-400">Direct Inquiries:</span>
                <span className="text-xs font-mono text-white font-medium">{profile.socials.email}</span>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                <span>Tel: <a href={`tel:${profile.phone}`} className="text-cyan-400 hover:underline">{profile.phone}</a></span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
