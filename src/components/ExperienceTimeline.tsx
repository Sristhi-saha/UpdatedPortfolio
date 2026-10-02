'use client';

import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, MapPin, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/audio';
import { gsap } from '../utils/gsapSetup';
import { motion } from 'framer-motion';

export const ExperienceTimeline: React.FC = () => {
  const { experiences } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: -30,
        stagger: 0.25,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRAJECTORY // MILESTONES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Work Experience & <span className="cyber-gradient-text">Leadership</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg mt-3">
            Proven track record delivering high-performance Next.js interfaces, responsive React components at Orbital Webworks, and AI agent platforms.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-indigo-500/30 ml-4 md:ml-32 space-y-12">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sounds.playHover()}
              className="timeline-item relative pl-8 md:pl-10 group"
            >
              {/* Glowing Timeline Marker */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/50" />

              {/* Date pill on left for desktop */}
              <div className="md:absolute md:-left-36 top-1 text-xs font-mono text-cyan-400 mb-2 md:mb-0">
                {exp.period}
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-3xl glass-panel border border-slate-800 p-6 md:p-8 hover:border-indigo-500/40 transition-all hover:shadow-xl hover:shadow-indigo-950/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-indigo-400 font-mono">
                      {exp.company}
                    </span>
                  </div>
                  <div className="flex items-center text-xs font-mono text-slate-400 gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2.5 my-4">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-xs sm:text-sm text-slate-300 flex items-start space-x-2">
                      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}

          {/* Education Timeline Node */}
          <div
            onMouseEnter={() => sounds.playHover()}
            className="timeline-item relative pl-8 md:pl-10 group"
          >
            {/* Glowing Marker */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-400 group-hover:scale-125 group-hover:bg-indigo-400 transition-all shadow-md shadow-indigo-500/50" />

            {/* Date pill on left for desktop */}
            <div className="md:absolute md:-left-36 top-1 text-xs font-mono text-indigo-400 mb-2 md:mb-0">
              {PORTFOLIO_DATA.education.period}
            </div>

            {/* Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-3xl glass-panel border border-slate-800 p-6 md:p-8 hover:border-indigo-500/40 transition-all hover:shadow-xl hover:shadow-indigo-950/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {PORTFOLIO_DATA.education.degree}
                  </h3>
                  <span className="text-sm font-semibold text-indigo-400 font-mono">
                    {PORTFOLIO_DATA.education.institution}
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold self-start sm:self-auto">
                  CGPA: {PORTFOLIO_DATA.education.cgpa}
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2.5 my-4">
                {PORTFOLIO_DATA.education.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="text-xs sm:text-sm text-slate-300 flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                {['Data Structures & Algorithms', 'OOP', 'Operating Systems', 'DBMS', 'Computer Networks'].map((course, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
