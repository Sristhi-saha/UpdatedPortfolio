import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Projects } from './components/Projects';
import { ResumeSection } from './components/ResumeSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { CyberPet } from './components/CyberPet';
import { DynamicLighting, LightMode } from './components/DynamicLighting';

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Dynamic light & creature states
  const [lightColor, setLightColor] = useState('#06b6d4');
  const [lightIntensity, setLightIntensity] = useState(1.0);
  const [lightMode, setLightMode] = useState<LightMode>('ambient');

  React.useEffect(() => {
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050711] text-slate-100' : 'bg-[#f8fafc] text-slate-900'} relative transition-colors duration-300 selection:bg-indigo-500/30 selection:text-cyan-300`}>
      {/* Background Cyber Grid & Radial Gradient */}
      <div className={`fixed inset-0 cyber-grid ${theme === 'dark' ? 'opacity-70' : 'opacity-40'} pointer-events-none z-0`} />
      {theme === 'dark' && (
        <div className="fixed inset-0 bg-radial-gradient from-transparent via-[#050711]/60 to-[#050711] pointer-events-none z-0" />
      )}

      {/* Dynamic Cursor Light & Flashlight System */}
      <DynamicLighting
        lightColor={lightColor}
        setLightColor={setLightColor}
        lightIntensity={lightIntensity}
        setLightIntensity={setLightIntensity}
        lightMode={lightMode}
        setLightMode={setLightMode}
      />

      {/* Chotasa Animal / Companion that follows mouse wherever it goes */}
      <CyberPet
        lightColor={lightColor}
        lightIntensity={lightIntensity}
      />

      {/* Floating Header */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        lightMode={lightMode}
        setLightMode={setLightMode}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <About />
        <ExperienceTimeline />
        <Projects />
        {/* <ResumeSection /> */}
        <SkillsMatrix />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive Terminal Modal */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
