'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Menu, X, Flashlight, Sun, Moon } from 'lucide-react';
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
      setScrolled(window.scrollY > 25);
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

  const isLight = theme === 'light';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isLight
            ? 'py-3.5 bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-md shadow-slate-200/40'
            : 'py-3.5 bg-slate-950/85 backdrop-blur-xl border-b border-indigo-500/20 shadow-xl shadow-black/50'
          : isLight
          ? 'py-5 bg-white/60 backdrop-blur-md border-b border-slate-200/50'
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] transition-transform group-hover:scale-105 shadow-sm">
              <div
                className={`w-full h-full rounded-[10px] flex items-center justify-center font-mono font-bold text-sm ${
                  isLight ? 'bg-indigo-50 text-indigo-700' : 'bg-[#050711] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300'
                }`}
              >
                SS
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-sm tracking-widest uppercase flex items-center gap-1.5 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                SRISTHI SAHA
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span
                className={`text-[10px] font-mono tracking-wider font-semibold ${
                  isLight ? 'text-indigo-600' : 'text-cyan-400/90'
                }`}
              >
                FRONTEND & FULL-STACK AI
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div
            className={`hidden md:flex items-center space-x-1 lg:space-x-2 p-1.5 rounded-full border backdrop-blur-md transition-colors ${
              isLight
                ? 'bg-slate-100/90 border-slate-200 shadow-sm'
                : 'bg-slate-900/60 border-slate-800/80'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => sounds.playClick()}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                  isLight
                    ? 'text-slate-700 hover:text-indigo-700 hover:bg-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
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
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className={`p-2 rounded-xl border transition-all shadow-sm ${
                isLight
                  ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                  : 'border-slate-800 hover:border-amber-400/50 bg-slate-900/80 text-amber-400 hover:text-amber-300'
              }`}
            >
              <div className="flex items-center space-x-1 px-1">
                {isLight ? (
                  <Moon className="w-4 h-4 text-indigo-600" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
                <span
                  className={`text-[11px] font-mono font-medium ${
                    isLight ? 'text-slate-800' : 'text-slate-300'
                  }`}
                >
                  {isLight ? 'DARK' : 'LIGHT'}
                </span>
              </div>
            </button>

            {/* Light Beam Mode Toggle */}
            <button
              onClick={cycleLightMode}
              title={`Light Mode: ${lightMode}. Click to cycle.`}
              className={`p-2 rounded-xl border transition-all shadow-sm ${
                isLight
                  ? lightMode !== 'off'
                    ? 'bg-cyan-50 border-cyan-300 text-cyan-900'
                    : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800'
                  : lightMode !== 'off'
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-1.5 px-1">
                <Flashlight
                  className={`w-4 h-4 ${
                    lightMode === 'flashlight'
                      ? 'animate-pulse text-cyan-500'
                      : isLight
                      ? 'text-cyan-700'
                      : 'text-cyan-400'
                  }`}
                />
                <span className="text-[11px] font-mono font-medium uppercase">{lightMode}</span>
              </div>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
              className={`p-2 rounded-xl border transition-all shadow-sm ${
                isLight
                  ? soundEnabled
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-900'
                    : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800'
                  : soundEnabled
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? (
                <div className="flex items-center space-x-1.5 px-1">
                  <Volume2 className={`w-4 h-4 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
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
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-mono font-semibold transition-all shadow-md shadow-indigo-600/30 hover:scale-105"
            >
              <Terminal className="w-4 h-4" />
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
              className={`p-2 rounded-lg border text-xs ${
                isLight ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-slate-900 border-slate-800 text-amber-400'
              }`}
              title="Toggle Theme"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={cycleLightMode}
              className={`p-2 rounded-lg border text-xs ${
                isLight ? 'bg-cyan-50 border-cyan-300 text-cyan-800' : 'bg-slate-900 border-slate-800 text-cyan-400'
              }`}
              title="Toggle Light"
            >
              <Flashlight className="w-4 h-4" />
            </button>
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border text-xs ${
                isLight ? 'bg-indigo-50 border-indigo-300 text-indigo-800' : 'bg-slate-900 border-slate-800 text-cyan-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border ${
                isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-6 mt-3 space-y-4 border-b ${
            isLight
              ? 'bg-white/95 border-slate-200 shadow-xl'
              : 'glass-panel-glow border-indigo-500/30'
          }`}
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`text-sm font-medium transition-colors py-1 ${
                  isLight ? 'text-slate-800 hover:text-indigo-600' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className={`pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'} flex flex-col space-y-3`}>
            <button
              onClick={() => {
                sounds.playWarp();
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white flex items-center justify-center space-x-2 text-xs font-mono font-semibold shadow-md"
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
