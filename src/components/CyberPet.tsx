'use client';

import React, { useEffect, useState, useRef } from 'react';
import { sounds } from '../utils/audio';
import { Sparkles, Heart, Zap, Bot, Moon, Eye } from 'lucide-react';

export type PetType = 'fox' | 'cat' | 'droid' | 'bunny';

interface CyberPetProps {
  lightColor: string;
  lightIntensity: number;
}

export const CyberPet: React.FC<CyberPetProps> = ({ lightColor, lightIntensity }) => {
  const [petType, setPetType] = useState<PetType>('fox');
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isFacingLeft, setIsFacingLeft] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);

  // Position references for 60fps smooth physics loop
  const targetPos = useRef({ x: 200, y: 200 });
  const currentPos = useRef({ x: 200, y: 200 });
  const velocity = useRef({ x: 0, y: 0 });
  const idleTimer = useRef<number | null>(null);
  const animFrameId = useRef<number | null>(null);
  const lastMouseTime = useRef(Date.now());

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isFollowing) return;
      targetPos.current = { x: e.clientX, y: e.clientY };
      lastMouseTime.current = Date.now();
      if (isSleeping) {
        setIsSleeping(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFollowing, isSleeping]);

  // Physics animation loop for smooth movement and inertia
  useEffect(() => {
    let stepCount = 0;

    const updatePhysics = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Distance threshold: follow closely but keep a tiny polite distance (45px)
      if (dist > 45 && isFollowing) {
        const speed = Math.min(dist * 0.08, 16);
        const angle = Math.atan2(dy, dx);

        velocity.current.x = Math.cos(angle) * speed;
        velocity.current.y = Math.sin(angle) * speed;

        currentPos.current.x += velocity.current.x;
        currentPos.current.y += velocity.current.y;

        setIsFacingLeft(dx < 0);
        setIsMoving(true);
      } else {
        setIsMoving(false);
      }

      setPosition({ x: currentPos.current.x, y: currentPos.current.y });

      // Check if mouse has been still for > 5 seconds to initiate sleeping
      if (Date.now() - lastMouseTime.current > 5000 && !isSleeping) {
        setIsSleeping(true);
      }

      stepCount++;
      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isFollowing, isSleeping]);

  // Click on pet to play with it
  const handlePetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playChirp();

    // Spawn floating heart
    const newHeart = { id: Date.now() + Math.random(), x: 0, y: 0 };
    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);

    // Wake up if sleeping
    setIsSleeping(false);
    lastMouseTime.current = Date.now();
  };

  const petDetails: Record<PetType, { name: string; icon: string; desc: string }> = {
    fox: { name: 'Kiko', icon: '🦊', desc: 'Cyber Kitsune' },
    cat: { name: 'Mochi', icon: '🐱', desc: 'Neon Neko' },
    droid: { name: 'Byte', icon: '🤖', desc: 'Nano Companion' },
    bunny: { name: 'Pip', icon: '🐰', desc: 'Quantum Hopper' },
  };

  return (
    <>
      {/* The Animated Follower Creature */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 40,
          pointerEvents: 'none',
        }}
      >
        {/* Glowing Lantern / Headlight aura carried by the animal */}
        <div
          className="absolute -top-12 -left-12 w-32 h-32 rounded-full pointer-events-none transition-all duration-300 blur-xl"
          style={{
            background: `radial-gradient(circle, ${lightColor} 0%, transparent 70%)`,
            opacity: lightIntensity > 0 ? 0.6 : 0.15,
            transform: 'scale(1.2)',
          }}
        />

        {/* The animal character container */}
        <div
          onClick={handlePetClick}
          className={`relative cursor-pointer pointer-events-auto select-none transition-transform duration-150 ${
            isFacingLeft ? 'scale-x-[-1]' : 'scale-x-1'
          } ${isMoving ? 'animate-bounce' : ''}`}
          style={{
            transformOrigin: 'center center',
          }}
        >
          {/* Floating Hearts when petted */}
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute -top-10 left-2 pointer-events-none animate-ping text-pink-400 font-bold text-lg"
            >
              💖
            </div>
          ))}

          {/* Sleeping Zzz Indicator */}
          {isSleeping && (
            <div className="absolute -top-8 left-6 pointer-events-none flex flex-col items-center">
              <span className="text-xs font-mono font-bold text-cyan-300 animate-pulse">Zzz...</span>
            </div>
          )}

          {/* --- RENDERING OF CHOSEN ANIMAL --- */}

          {/* 1. CYBER FOX (🦊) */}
          {petType === 'fox' && (
            <div className="relative w-12 h-12 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(236,72,153,0.5)]">
              <svg viewBox="0 0 100 100" className="w-12 h-12 overflow-visible">
                {/* Fluffy wagging tail */}
                <path
                  d="M 25 70 C 5 65, 0 40, 15 25 C 20 40, 35 55, 30 75 Z"
                  fill="#f97316"
                  className={isMoving ? 'animate-spin-slow origin-bottom-right' : ''}
                />
                <path d="M 15 25 C 18 35, 23 45, 20 50 C 13 40, 12 32, 15 25 Z" fill="#ffffff" />

                {/* Fox Body */}
                <ellipse cx="50" cy="65" rx="22" ry="18" fill="#ea580c" />
                <ellipse cx="50" cy="68" rx="13" ry="12" fill="#fff7ed" />

                {/* Little Paws */}
                <ellipse cx="40" cy="80" rx="5" ry="4" fill="#c2410c" className={isMoving ? 'animate-pulse' : ''} />
                <ellipse cx="60" cy="80" rx="5" ry="4" fill="#c2410c" className={isMoving ? 'animate-pulse' : ''} />

                {/* Fox Head */}
                <polygon points="25,45 75,45 50,75" fill="#f97316" />
                <polygon points="35,50 65,50 50,72" fill="#ffffff" />

                {/* Big pointy ears with pink inner */}
                <polygon points="25,45 20,18 42,35" fill="#ea580c" />
                <polygon points="25,40 23,24 37,34" fill="#f472b6" />
                <polygon points="75,45 80,18 58,35" fill="#ea580c" />
                <polygon points="75,40 77,24 63,34" fill="#f472b6" />

                {/* Glowing cyber visor / eyes */}
                {isSleeping ? (
                  <path d="M 38 52 Q 43 55 46 52 M 54 52 Q 57 55 62 52" stroke="#06b6d4" strokeWidth="2.5" fill="none" />
                ) : (
                  <>
                    <ellipse cx="42" cy="50" rx="3.5" ry="4" fill="#06b6d4" />
                    <ellipse cx="58" cy="50" rx="3.5" ry="4" fill="#06b6d4" />
                    <circle cx="43" cy="49" r="1.2" fill="#ffffff" />
                    <circle cx="59" cy="49" r="1.2" fill="#ffffff" />
                  </>
                )}

                {/* Cute black nose */}
                <circle cx="50" cy="71" r="3" fill="#18181b" />

                {/* Mini cyber lantern strapped on back */}
                <circle cx="68" cy="52" r="4.5" fill={lightColor} filter="drop-shadow(0 0 6px white)" />
              </svg>
            </div>
          )}

          {/* 2. NEON CAT (🐱) */}
          {petType === 'cat' && (
            <div className="relative w-12 h-12 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(6,182,212,0.5)]">
              <svg viewBox="0 0 100 100" className="w-12 h-12 overflow-visible">
                {/* Curved tail */}
                <path
                  d="M 28 68 C 10 65, 8 40, 20 30"
                  stroke="#38bdf8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Cat Body */}
                <circle cx="50" cy="65" r="20" fill="#0284c7" />

                {/* Round Head */}
                <circle cx="50" cy="46" r="19" fill="#0ea5e9" />

                {/* Triangular ears */}
                <polygon points="34,35 30,16 46,29" fill="#0284c7" />
                <polygon points="36,32 33,20 44,28" fill="#fda4af" />
                <polygon points="66,35 70,16 54,29" fill="#0284c7" />
                <polygon points="64,32 67,20 56,28" fill="#fda4af" />

                {/* Eyes */}
                {isSleeping ? (
                  <path d="M 40 45 Q 44 48 48 45 M 52 45 Q 56 48 60 45" stroke="#fef08a" strokeWidth="2.5" fill="none" />
                ) : (
                  <>
                    <ellipse cx="42" cy="44" rx="4" ry="5" fill="#fef08a" />
                    <ellipse cx="58" cy="44" rx="4" ry="5" fill="#fef08a" />
                    <ellipse cx="43" cy="44" rx="2" ry="4" fill="#0f172a" />
                    <ellipse cx="59" cy="44" rx="2" ry="4" fill="#0f172a" />
                  </>
                )}

                {/* Cute snout & whiskers */}
                <circle cx="50" cy="51" r="2.5" fill="#f43f5e" />
                <line x1="28" y1="50" x2="38" y2="52" stroke="#bae6fd" strokeWidth="1.5" />
                <line x1="28" y1="56" x2="38" y2="54" stroke="#bae6fd" strokeWidth="1.5" />
                <line x1="72" y1="50" x2="62" y2="52" stroke="#bae6fd" strokeWidth="1.5" />
                <line x1="72" y1="56" x2="62" y2="54" stroke="#bae6fd" strokeWidth="1.5" />

                {/* Glowing bell collar */}
                <circle cx="50" cy="64" r="4.5" fill={lightColor} filter="drop-shadow(0 0 6px white)" />
              </svg>
            </div>
          )}

          {/* 3. NANO DROID (🤖) */}
          {petType === 'droid' && (
            <div className="relative w-12 h-12 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(168,85,247,0.5)]">
              <svg viewBox="0 0 100 100" className="w-12 h-12 overflow-visible">
                {/* Antenna with pulsing orb */}
                <line x1="50" y1="28" x2="50" y2="12" stroke="#a855f7" strokeWidth="3" />
                <circle cx="50" cy="10" r="5" fill={lightColor} className="animate-ping origin-center" />
                <circle cx="50" cy="10" r="4" fill="#ffffff" />

                {/* Floating Head / Body Pod */}
                <rect x="28" y="28" width="44" height="42" rx="14" fill="#1e1b4b" stroke="#818cf8" strokeWidth="3" />

                {/* Screen Face */}
                <rect x="34" y="34" width="32" height="22" rx="7" fill="#09090b" />

                {/* Digital Eyes */}
                {isSleeping ? (
                  <path d="M 38 45 L 46 45 M 54 45 L 62 45" stroke="#22d3ee" strokeWidth="2.5" />
                ) : (
                  <>
                    <rect x="38" y="40" width="8" height="9" rx="2" fill="#22d3ee" />
                    <rect x="54" y="40" width="8" height="9" rx="2" fill="#22d3ee" />
                  </>
                )}

                {/* Hover jet flame */}
                <polygon
                  points="42,70 58,70 50,88"
                  fill="#06b6d4"
                  className={isMoving ? 'animate-pulse' : 'opacity-70'}
                />
                <polygon points="45,70 55,70 50,80" fill="#ffffff" />
              </svg>
            </div>
          )}

          {/* 4. QUANTUM BUNNY (🐰) */}
          {petType === 'bunny' && (
            <div className="relative w-12 h-12 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(244,114,182,0.5)]">
              <svg viewBox="0 0 100 100" className="w-12 h-12 overflow-visible">
                {/* Fluffy tail */}
                <circle cx="28" cy="70" r="7" fill="#ffffff" filter="drop-shadow(0 0 4px #ec4899)" />

                {/* Body */}
                <ellipse cx="50" cy="65" rx="21" ry="17" fill="#fbcfe8" />

                {/* Head */}
                <circle cx="54" cy="46" r="16" fill="#fdf2f8" />

                {/* Long animated floppy ears */}
                <ellipse
                  cx="45"
                  cy="20"
                  rx="6"
                  ry="18"
                  fill="#fbcfe8"
                  transform="rotate(-12 45 20)"
                  className={isMoving ? 'animate-bounce' : ''}
                />
                <ellipse cx="45" cy="20" rx="3.5" ry="13" fill="#f472b6" transform="rotate(-12 45 20)" />

                <ellipse
                  cx="62"
                  cy="20"
                  rx="6"
                  ry="18"
                  fill="#fbcfe8"
                  transform="rotate(14 62 20)"
                  className={isMoving ? 'animate-bounce' : ''}
                />
                <ellipse cx="62" cy="20" rx="3.5" ry="13" fill="#f472b6" transform="rotate(14 62 20)" />

                {/* Eyes */}
                {isSleeping ? (
                  <path d="M 46 45 Q 50 48 54 45 M 58 45 Q 62 48 66 45" stroke="#db2777" strokeWidth="2" fill="none" />
                ) : (
                  <>
                    <circle cx="49" cy="44" r="3.2" fill="#be185d" />
                    <circle cx="63" cy="44" r="3.2" fill="#be185d" />
                    <circle cx="50" cy="43" r="1" fill="#ffffff" />
                    <circle cx="64" cy="43" r="1" fill="#ffffff" />
                  </>
                )}

                {/* Pink Nose */}
                <polygon points="56,48 58,51 54,51" fill="#ec4899" />

                {/* Glowing light orb pendant */}
                <circle cx="68" cy="55" r="4.5" fill={lightColor} filter="drop-shadow(0 0 6px white)" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Floating Pet Control Dock (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="relative">
          {showMenu && (
            <div className="absolute bottom-14 left-0 w-60 glass-panel-glow border border-indigo-500/40 rounded-2xl p-4 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  CHOOSE COMPANION
                </span>
                <span className="text-[10px] font-mono text-cyan-300">Active</span>
              </div>

              {/* Animal picker buttons */}
              <div className="grid grid-cols-2 gap-2">
                {(['fox', 'cat', 'droid', 'bunny'] as PetType[]).map((type) => {
                  const info = petDetails[type];
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        sounds.playClick();
                        setPetType(type);
                      }}
                      className={`p-2 rounded-xl text-left border flex items-center space-x-2 transition-all ${
                        petType === type
                          ? 'bg-indigo-600/30 border-cyan-400 text-white shadow-sm'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-xl">{info.icon}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold leading-none">{info.name}</div>
                        <div className="text-[9px] font-mono text-slate-500 truncate">{type}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => {
                    sounds.playChirp();
                    const newHeart = { id: Date.now(), x: 0, y: 0 };
                    setHearts((prev) => [...prev, newHeart]);
                    setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== newHeart.id)), 1500);
                  }}
                  className="flex-1 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-300 text-xs font-mono flex items-center justify-center space-x-1 transition-all"
                >
                  <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                  <span>Pet {petDetails[petType].name}</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setIsFollowing(!isFollowing);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                    isFollowing
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                  title={isFollowing ? 'Make pet stay in place' : 'Make pet follow mouse'}
                >
                  {isFollowing ? 'Following' : 'Stay'}
                </button>
              </div>
            </div>
          )}

          {/* Dock Badge Trigger */}
          <button
            onClick={() => {
              sounds.playClick();
              setShowMenu(!showMenu);
            }}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-full glass-panel-glow border border-indigo-500/30 hover:border-cyan-400/60 shadow-lg text-xs text-white transition-all hover:scale-105 group"
          >
            <span className="text-base group-hover:scale-125 transition-transform">
              {petDetails[petType].icon}
            </span>
            <div className="flex flex-col text-left">
              <span className="font-bold text-[11px] leading-tight flex items-center gap-1 text-slate-200 group-hover:text-cyan-300">
                {petDetails[petType].name}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </span>
              <span className="text-[9px] font-mono text-slate-400">
                {isMoving ? '🐾 Chasing Cursor' : isSleeping ? '💤 Resting' : '✨ Exploring'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
