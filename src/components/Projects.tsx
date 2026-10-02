'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ExternalLink, Github, Sparkles, Layers, ArrowUpRight, X, Heart, Bot, FileText, Cpu, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';
import { gsap } from '../utils/gsapSetup';
import { motion, AnimatePresence } from 'framer-motion';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'AI & Spatial', 'Full-Stack SaaS', '3D Web & WebGL'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    sounds.playSuccess();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#6366f1', '#10b981'],
    });
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'zyra-ai':
        return <Bot className="w-6 h-6 text-purple-400" />;
      case 'mockmate-ai':
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
      case 'aduarchive':
        return <FileText className="w-6 h-6 text-emerald-400" />;
      default:
        return <Cpu className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>FEATURED WORK // REPOSITORIES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Production & <span className="cyber-gradient-text">Core Projects</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat === 'AI & Spatial' ? 'Agentic AI' : cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const currentLikes = likes[project.id] || 0;

            return (
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                key={project.id}
                onClick={() => {
                  sounds.playWarp();
                  setActiveModalProject(project);
                }}
                className="project-card group relative rounded-3xl glass-panel border border-slate-800/80 hover:border-indigo-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/40 cursor-pointer overflow-hidden"
              >
                <div>
                  {/* Clean Card Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                        {getProjectIcon(project.id)}
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-mono text-cyan-300">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleLike(e, project.id)}
                      className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-pink-400 transition-colors flex items-center space-x-1"
                      title="Like project"
                    >
                      <Heart className={`w-3.5 h-3.5 ${currentLikes > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                      {currentLikes > 0 && <span className="text-[10px] font-mono text-pink-400">{currentLikes}</span>}
                    </button>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Benchmark Metrics Pill */}
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-cyan-300 mb-4 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{project.metrics}</span>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="pt-3 border-t border-slate-800/70 flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 5).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="px-2 py-1 rounded-lg bg-slate-900 text-[10px] font-mono text-slate-500">
                      +{project.tech.length - 5}
                    </span>
                  )}
                </div>

                {/* Direct Action Buttons: Live Link & GitHub */}
                <div className="flex items-center gap-2 pt-1">
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-mono text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-600/20 transition-transform"
                    >
                      <span>Live Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                  )}

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playClick();
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-mono text-xs font-medium flex items-center justify-center space-x-1.5 transition-transform"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal with Framer Motion */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel-glow border border-indigo-500/40 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveModalProject(null);
                }}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {activeModalProject.title}
                </h3>
              </div>

              {/* Deep Dive Description */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Architecture & Implementation Details
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalProject.longDescription}
                </p>
              </div>

              {/* Metrics */}
              <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs font-mono text-cyan-300 mb-6 flex items-center justify-between">
                <span>SYSTEM HIGHLIGHT:</span>
                <span className="font-semibold text-white">{activeModalProject.metrics}</span>
              </div>

              {/* Tech Stack Full */}
              <div className="mb-8">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links in Modal */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
                {activeModalProject.liveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playClick()}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-mono text-xs font-medium shadow-lg shadow-indigo-600/30 transition-transform"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Link</span>
                  </motion.a>
                )}

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-medium transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
