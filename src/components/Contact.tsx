'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Copy, Check, Send, Github, Linkedin, MessageSquare, Sparkles, Code2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';
import { gsap } from '../utils/gsapSetup';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack SaaS / Next.js Architecture',
    message: '',
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-left', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.contact-right', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.socials.email);
    sounds.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playWarp();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      sounds.playSuccess();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#6366f1', '#10b981'],
      });
    }, 1000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Social Channels */}
          <div className="contact-left lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMMUNICATION TRANSMITTER</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Let&apos;s Build <br />
                <span className="cyber-gradient-text">High-Impact Software</span> Together.
              </h2>
              <p className="text-slate-400 text-base mt-4 leading-relaxed">
                Currently exploring full-time Frontend & Full-Stack software engineering opportunities, generative AI platforms, and creative web experiences.
              </p>
            </div>

            {/* Quick Copy Email & Phone Box */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">
                      DIRECT INBOX
                    </span>
                    <span className="text-sm font-mono text-white truncate block">
                      {profile.socials.email}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all shrink-0 ml-3"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </motion.button>
              </div>

              {/* Direct Phone / WhatsApp */}
              <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <span className="text-base">📞</span>
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">
                      PHONE // WHATSAPP
                    </span>
                    <span className="text-sm font-mono text-white truncate block">
                      {profile.phone}
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${profile.phone}`}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all shrink-0 ml-3 text-xs font-mono text-cyan-400"
                >
                  Call
                </a>
              </div>
            </div>

            {/* Social Links Network */}
            <div>
              <span className="text-xs font-mono text-slate-400 block mb-3 uppercase tracking-wider">
                VERIFIED PROFILES & REPOSITORIES
              </span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'GitHub', href: profile.socials.github, icon: Github, handle: 'SristhiSaha' },
                  { name: 'LinkedIn', href: profile.socials.linkedin, icon: Linkedin, handle: 'in/sristhi-saha' },
                  { name: 'LeetCode', href: profile.socials.leetcode, icon: Code2, handle: '120+ Solved' },
                  { name: 'GeeksforGeeks', href: profile.socials.geeksforgeeks, icon: Trophy, handle: 'Sristhi Saha' },
                ].map((s, idx) => (
                  <motion.a
                    whileHover={{ scale: 1.02, x: 2 }}
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playClick()}
                    className="p-3.5 rounded-2xl glass-panel border border-slate-800/80 hover:border-cyan-400/40 hover:bg-slate-900/60 transition-all flex items-center space-x-3 group"
                  >
                    <s.icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {s.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 truncate">
                        {s.handle}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-right lg:col-span-7">
            <div className="rounded-3xl glass-panel-glow border border-indigo-500/30 p-6 sm:p-10 relative">
              {isSent ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Transmission Received!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. Your packet has been logged into my queue. I typically reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setIsSent(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: 'Full-Stack SaaS / Next.js Architecture',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-2">Initiate Transmission</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1.5 uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Hiring Manager / Recruiter"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1.5 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="recruiter@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1.5 uppercase">
                      Opportunity / Role
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                    >
                      <option value="Frontend Developer Role">Frontend Developer (React / Next.js / TypeScript)</option>
                      <option value="Full-Stack Application">Full-Stack SaaS / AI Engineer</option>
                      <option value="Creative Web Developer">Creative Web Developer (GSAP / Framer Motion)</option>
                      <option value="Contract / Freelance">Contract / High-Impact Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1.5 uppercase">
                      Message / Project Scope
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about the role, team, and technology stack..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium text-sm flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition-transform disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="font-mono text-xs animate-pulse">TRANSMITTING PACKET...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Transmission</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
