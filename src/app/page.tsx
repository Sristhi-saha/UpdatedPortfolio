'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GsapScrollProgress } from '../components/GsapScrollProgress';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { Projects } from '../components/Projects';
import { ResumeSection } from '../components/ResumeSection';
import { SkillsMatrix } from '../components/SkillsMatrix';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { LightMode } from '../components/DynamicLighting';

// Dynamically import client-only browser interactive widgets
const CyberPet = dynamic(
  () => import('../components/CyberPet').then((mod) => mod.CyberPet),
  { ssr: false }
);

const DynamicLighting = dynamic(
  () => import('../components/DynamicLighting').then((mod) => mod.DynamicLighting),
  { ssr: false }
);

const InteractiveTerminal = dynamic(
  () => import('../components/InteractiveTerminal').then((mod) => mod.InteractiveTerminal),
  { ssr: false }
);

export default function HomePage() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  // Dynamic lighting & companion animal states
  const [lightColor, setLightColor] = useState('#06b6d4');
  const [lightIntensity, setLightIntensity] = useState(1.0);
  const [lightMode, setLightMode] = useState<LightMode>('ambient');

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-[#050711] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
      } relative transition-colors duration-300 selection:bg-indigo-500/30 selection:text-cyan-300`}
    >
      {/* GSAP ScrollTrigger Scrub Progress Bar */}
      <GsapScrollProgress />

      {/* Background Cyber Grid & Radial Overlay */}
      <div
        className={`fixed inset-0 cyber-grid ${
          theme === 'dark' ? 'opacity-70' : 'opacity-40'
        } pointer-events-none z-0`}
      />
      {theme === 'dark' && (
        <div className="fixed inset-0 bg-radial-gradient from-transparent via-[#050711]/60 to-[#050711] pointer-events-none z-0" />
      )}

      {/* Dynamic Cursor Light & Flashlight System */}
      {mounted && (
        <DynamicLighting
          lightColor={lightColor}
          setLightColor={setLightColor}
          lightIntensity={lightIntensity}
          setLightIntensity={setLightIntensity}
          lightMode={lightMode}
          setLightMode={setLightMode}
        />
      )}

      {/* Interactive Cursor Companion Animal (Follows mouse cursor) */}
      {mounted && (
        <CyberPet
          lightColor={lightColor}
          lightIntensity={lightIntensity}
        />
      )}

      {/* Floating Modern Header */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        lightMode={lightMode}
        setLightMode={setLightMode}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Layout with GSAP ScrollTrigger Sections */}
      <main className="relative z-10">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <About />
        <ExperienceTimeline />
        <Projects />
        <ResumeSection />
        <SkillsMatrix />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive Terminal CLI Modal */}
      {mounted && (
        <InteractiveTerminal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />
      )}
    </div>
  );
}
