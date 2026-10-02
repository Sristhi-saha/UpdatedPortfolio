import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Menu, X, Sparkles, Flashlight, Sun, Moon } from 'lucide-react';
import { sounds } from '../utils/audio';
import { LightMode } from './DynamicLighting';

interface NavbarProps {
  onOpenTerminal: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  lightMode: LightMode;
  setLightMode: (m: LightMode) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTerminal,
  soundEnabled,
  setSoundEnabled,
  lightMode,
  setLightMode,
  theme,
  toggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleSound = () => {
    const nextState = !soundEnabled;
    sounds.enabled = nextState;
    setSoundEnabled(nextState);
    if (nextState) {
      sounds.playSuccess();
    }
  };

  const cycleLightMode = () => {
    sounds.playFlashlight();
    if (lightMode === 'ambient') setLightMode('flashlight');
    else if (lightMode === 'flashlight') setLightMode('aurora');
    else if (lightMode === 'aurora') setLightMode('off');
    else setLightMode('ambient');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-slate-950/80 backdrop-blur-xl border-b border-indigo-500/20 shadow-xl shadow-black/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            onClick={() => sounds.playClick()}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#050711] rounded-[10px] flex items-center justify-center font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 text-sm">
                SS
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-widest uppercase text-white flex items-center gap-1.5">
                SRISTHI SAHA
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[10px] font-mono text-cyan-400/90 tracking-wider">
                FRONTEND & FULL-STACK AI
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => sounds.playClick()}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full transition-all hover:bg-slate-800/70"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action buttons (Light + Sound + Terminal) */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                toggleTheme();
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl border border-slate-800 hover:border-amber-400/50 bg-slate-900/80 text-amber-400 hover:text-amber-300 transition-all shadow-sm"
            >
              <div className="flex items-center space-x-1 px-1">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                <span className="text-[11px] font-mono font-medium text-slate-300">
                  {theme === 'dark' ? 'LIGHT' : 'DARK'}
                </span>
              </div>
            </button>

            {/* Light Toggle */}
            <button
              onClick={cycleLightMode}
              title={`Light Mode: ${lightMode}. Click to cycle.`}
              className={`p-2 rounded-xl border transition-all ${
                lightMode !== 'off'
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-1.5 px-1">
                <Flashlight className={`w-4 h-4 ${lightMode === 'flashlight' ? 'animate-pulse text-cyan-400' : ''}`} />
                <span className="text-[11px] font-mono font-medium uppercase">{lightMode}</span>
              </div>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sci-Fi Audio' : 'Enable Sci-Fi Audio'}
              className={`p-2 rounded-xl border transition-all ${
                soundEnabled
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? (
                <div className="flex items-center space-x-1.5 px-1">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-medium">AUDIO ON</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 px-1">
                  <VolumeX className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-medium">MUTED</span>
                </div>
              )}
            </button>

            {/* Cyber Terminal Launcher */}
            <button
              onClick={() => {
                sounds.playWarp();
                onOpenTerminal();
              }}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-mono transition-all shadow-lg shadow-indigo-600/20 hover:scale-105"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>TERMINAL</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => {
                sounds.playClick();
                toggleTheme();
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 text-xs"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={cycleLightMode}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 text-xs"
              title="Toggle Light"
            >
              <Flashlight className="w-4 h-4" />
            </button>
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 text-xs"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel-glow border-b border-indigo-500/30 px-6 py-6 mt-3 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col space-y-3">
            <button
              onClick={() => {
                sounds.playWarp();
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-cyan-300 flex items-center justify-center space-x-2 text-xs font-mono"
            >
              <Terminal className="w-4 h-4" />
              <span>LAUNCH TERMINAL</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
