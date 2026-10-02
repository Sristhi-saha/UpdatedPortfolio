'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Boxes, Code2, Sparkles, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/audio';
import { gsap } from '../utils/gsapSetup';
import { motion } from 'framer-motion';

export const SkillsMatrix: React.FC = () => {
  const { skillCategories } = PORTFOLIO_DATA;
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
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
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-cyan-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-indigo-400" />;
      case 'Cpu':
      default:
        return <Cpu className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-4 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE PROFICIENCIES // TECH MATRIX</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Specialized <span className="cyber-gradient-text">Competencies & Capabilities</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg mt-3">
            A battle-tested arsenal bridging Next.js, GSAP ScrollTrigger, Framer Motion, reactive client architectures, and distributed AI systems.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              key={idx}
              className="skill-card rounded-3xl glass-panel border border-slate-800 p-6 md:p-8 flex flex-col justify-between hover:border-indigo-500/40 transition-all hover:shadow-xl hover:shadow-indigo-950/40"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-inner">
                    {getIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{category.title}</h3>
                    <p className="text-xs text-slate-400">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-5 pt-4">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      onMouseEnter={() => {
                        sounds.playHover();
                        setHoveredSkill(skill.name);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="group cursor-default"
                    >
                      <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                        <span className="text-slate-200 group-hover:text-cyan-300 transition-colors font-medium">
                          {skill.name}
                        </span>
                        <span className="text-slate-500 group-hover:text-indigo-400 transition-colors">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar with Glow */}
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-[1px]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-1000 ease-out shadow-sm"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <div className="text-[11px] text-slate-500 mt-1 font-mono">
                        {skill.tags}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom pill badge */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>VERIFIED PRODUCTION-READY</span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Quick Tech Cloud */}
        <div className="mt-14 p-6 rounded-3xl glass-panel-glow border border-indigo-500/20 text-center">
          <span className="text-xs font-mono text-cyan-400 block mb-3 uppercase tracking-wider">
            ADDITIONAL TOOLS, LIBRARIES & PROTOCOLS
          </span>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {[
              'Next.js', 'React.js', 'GSAP', 'ScrollTrigger', 'Framer Motion', 'TypeScript',
              'Node.js', 'NestJS', 'MongoDB', 'PostgreSQL', 'RabbitMQ', 'Gemini AI API',
              'LangChain', 'LangGraph', 'Redis', 'Drizzle ORM', 'Docker', 'Git & GitHub',
              'Tailwind CSS', 'WebSockets', 'WCAG Accessibility'
            ].map((tech, idx) => (
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                key={idx}
                onClick={() => sounds.playClick()}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-400/40 text-xs font-mono text-slate-300 hover:text-cyan-300 cursor-pointer transition-all"
              >
                #{tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
