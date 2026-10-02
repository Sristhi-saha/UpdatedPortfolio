'use client';

import React, { useEffect, useState, useRef } from 'react';
import { sounds } from '../utils/audio';
import { Flashlight, Sun, Moon, Sparkles, Sliders, Palette } from 'lucide-react';

export type LightMode = 'ambient' | 'flashlight' | 'aurora' | 'off';

interface DynamicLightingProps {
  lightColor: string;
  setLightColor: (c: string) => void;
  lightIntensity: number;
  setLightIntensity: (i: number) => void;
  lightMode: LightMode;
  setLightMode: (m: LightMode) => void;
}

export const DynamicLighting: React.FC<DynamicLightingProps> = ({
  lightColor,
  setLightColor,
  lightIntensity,
  setLightIntensity,
  lightMode,
  setLightMode,
}) => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [showControls, setShowControls] = useState(false);
  const targetPos = useRef({ x: -500, y: -500 });
  const currentPos = useRef({ x: -500, y: -500 });
  const animFrameId = useRef<number | null>(null);

  // Smooth mouse coordinates tracking with lerping
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const updateLight = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;
      setMousePos({ x: currentPos.current.x, y: currentPos.current.y });
      animFrameId.current = requestAnimationFrame(updateLight);
    };

    animFrameId.current = requestAnimationFrame(updateLight);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const colorPalettes = [
    { label: 'Cyan Pulse', hex: '#06b6d4' },
    { label: 'Hyper Violet', hex: '#a855f7' },
    { label: 'Amber Lantern', hex: '#f59e0b' },
    { label: 'Emerald Flare', hex: '#10b981' },
    { label: 'Solar Pink', hex: '#ec4899' },
    { label: 'Pure White', hex: '#f8fafc' },
  ];

  return (
    <>
      {/* 1. Dynamic Cursor Spotlight Layer */}
      {lightMode !== 'off' && (
        <div
          className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            background:
              lightMode === 'flashlight'
                ? `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.18), ${lightColor}33 40%, transparent 90%)`
                : lightMode === 'aurora'
                ? `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, ${lightColor}25, rgba(99, 102, 241, 0.12) 50%, transparent 80%)`
                : `radial-gradient(circle 480px at ${mousePos.x}px ${mousePos.y}px, ${lightColor}1f, transparent 70%)`,
            mixBlendMode: lightMode === 'flashlight' ? 'screen' : 'normal',
          }}
        />
      )}

      {/* 2. Tactical Flashlight Vignette (Dims edges for true flashlight feel when in flashlight mode) */}
      {lightMode === 'flashlight' && (
        <div
          className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px, transparent 180px, rgba(5, 7, 17, 0.75) 380px, rgba(5, 7, 17, 0.92) 100%)`,
          }}
        />
      )}

      {/* 3. Floating Light Controls Dock (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {showControls && (
            <div className="absolute bottom-14 right-0 w-64 glass-panel-glow border border-cyan-500/40 rounded-2xl p-4 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Flashlight className="w-3.5 h-3.5 text-cyan-400" />
                  DYNAMIC LIGHT SYSTEM
                </span>
                <span className="text-[10px] font-mono text-cyan-300 uppercase">{lightMode}</span>
              </div>

              {/* Mode Selection */}
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                  Beam Mode
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'ambient', label: 'Ambient' },
                    { id: 'flashlight', label: 'Flashlight' },
                    { id: 'aurora', label: 'Aurora 3D' },
                    { id: 'off', label: 'Disabled' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        sounds.playFlashlight();
                        setLightMode(m.id as LightMode);
                      }}
                      className={`py-1.5 px-2 text-xs font-mono rounded-lg border transition-all ${
                        lightMode === m.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Palette Color Picker */}
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                  <span>Emission Palette</span>
                  <Palette className="w-3 h-3 text-cyan-400" />
                </label>
                <div className="flex items-center justify-between gap-1">
                  {colorPalettes.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => {
                        sounds.playClick();
                        setLightColor(c.hex);
                      }}
                      style={{ backgroundColor: c.hex }}
                      className={`w-6 h-6 rounded-full transition-all ${
                        lightColor === c.hex
                          ? 'scale-125 ring-2 ring-white shadow-lg'
                          : 'opacity-70 hover:opacity-100 hover:scale-110'
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Intensity Slider */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>BEAM POWER</span>
                  <span className="text-cyan-300 font-bold">{Math.round(lightIntensity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.5"
                  step="0.1"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          )}

          {/* Dock Trigger Button */}
          <button
            onClick={() => {
              sounds.playFlashlight();
              setShowControls(!showControls);
            }}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-full glass-panel-glow border transition-all hover:scale-105 shadow-lg text-xs ${
              lightMode !== 'off'
                ? 'border-cyan-400/60 text-white'
                : 'border-slate-800 text-slate-400'
            }`}
          >
            <Flashlight className={`w-4 h-4 ${lightMode !== 'off' ? 'text-indigo-600 dark:text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
            <div className="flex flex-col text-left">
              <span className="font-bold text-[11px] leading-tight flex items-center gap-1 text-slate-900 dark:text-slate-200">
                Light Beam
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: lightMode !== 'off' ? lightColor : '#32517c' }}
                />
              </span>
              <span className="text-[9px] font-mono text-slate-600 dark:text-slate-400 uppercase">
                {lightMode}
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
