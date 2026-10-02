'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  X, 
  Heart, 
  Bot, 
  FileText, 
  Cpu, 
  CheckCircle,
  Smartphone,
  Globe,
  MessageSquare,
  Network,
  ShoppingBag,
  Cloud
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';
import { gsap } from '../utils/gsapSetup';
import { motion, AnimatePresence } from 'framer-motion';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'AI & Machine Learning', '3D Web & Creative', 'Full-Stack & Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  // GSAP ScrollTrigger executes strictly once on section mount to avoid breaking reactive card states
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.projects-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
        return <Bot className="w-6 h-6 text-indigo-600 dark:text-purple-400" />;
      case 'mockmate-ai':
        return <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
      case 'apple-clone':
        return <Smartphone className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'serum-site':
        return <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'aduarchive':
        return <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'black5-creatives':
        return <Globe className="w-6 h-6 text-violet-600 dark:text-violet-400" />;
      case 'chat-app':
        return <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'social-media-microservices':
        return <Network className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />;
      case 'e-commerce-app':
        return <ShoppingBag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'dropnest':
        return <Cloud className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
      default:
        return <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="projects-header flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-cyan-500/10 border border-indigo-200 dark:border-cyan-500/30 text-indigo-700 dark:text-cyan-400 text-xs font-mono font-semibold mb-4 tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>FEATURED WORK // {PORTFOLIO_DATA.projects.length} REPOSITORIES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Production & <span className="cyber-gradient-text">Core Projects</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-2 max-w-xl">
              Engineered across Agentic AI, high-performance WebGL/3D interfaces, microservices, and live production SaaS.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {cat}
                {cat === 'All' && ` (${PORTFOLIO_DATA.projects.length})`}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project Grid with Framer Motion AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const currentLikes = likes[project.id] || 0;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  whileHover={{ y: -6 }}
                  key={project.id}
                  onClick={() => {
                    sounds.playWarp();
                    setActiveModalProject(project);
                  }}
                  className="project-card group relative rounded-3xl bg-white dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-500/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer overflow-hidden"
                >
                  <div>
                    {/* Clean Card Top Bar */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50/70 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                          {getProjectIcon(project.id)}
                        </div>
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-[10px] font-mono font-semibold text-indigo-700 dark:text-cyan-300">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleLike(e, project.id)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-pink-500 transition-colors flex items-center space-x-1"
                        title="Like project"
                      >
                        <Heart className={`w-3.5 h-3.5 ${currentLikes > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                        {currentLikes > 0 && <span className="text-[10px] font-mono text-pink-500 font-semibold">{currentLikes}</span>}
                      </button>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Benchmark Metrics Pill */}
                    <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-slate-800 text-[11px] font-mono text-indigo-900 dark:text-cyan-300 font-semibold mb-4 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{project.metrics}</span>
                    </div>
                  </div>

                  {/* Tech Stack Badges */}
                  <div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/70 flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 5).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-400 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 5 && (
                        <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-[10px] font-mono text-slate-500 font-medium">
                          +{project.tech.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Direct Action Buttons: Live Link & GitHub */}
                    <div className="flex items-center gap-2 pt-1">
                      {project.liveUrl ? (
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
                          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-mono text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-600/20 transition-transform"
                        >
                          <span>Live Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </motion.a>
                      ) : null}

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
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 hover:border-slate-400 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold flex items-center justify-center space-x-1.5 transition-transform shadow-sm"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal with Framer Motion */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-indigo-500/40 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveModalProject(null);
                }}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-cyan-500/10 border border-indigo-200 dark:border-cyan-500/30 text-indigo-700 dark:text-cyan-400 text-xs font-mono font-semibold mb-2">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {activeModalProject.title}
                </h3>
              </div>

              {/* Deep Dive Description */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-mono text-indigo-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                  Architecture & Implementation Details
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {activeModalProject.longDescription}
                </p>
              </div>

              {/* Metrics */}
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-500/30 text-xs font-mono text-indigo-900 dark:text-cyan-300 mb-6 flex items-center justify-between font-semibold">
                <span>SYSTEM HIGHLIGHT:</span>
                <span className="font-bold text-slate-900 dark:text-white">{activeModalProject.metrics}</span>
              </div>

              {/* Tech Stack Full */}
              <div className="mb-8">
                <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-300 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links in Modal */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                {activeModalProject.liveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playClick()}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-mono text-xs font-semibold shadow-md shadow-indigo-600/30 transition-transform"
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
                  className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold transition-colors shadow-sm"
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
