import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { sounds } from '../../utils/audio';
import { Sparkles, Sliders, Box, RotateCcw, Palette } from 'lucide-react';

type ShapeType = 'torusKnot' | 'icosahedron' | 'sphere' | 'octahedron';
type MaterialType = 'distort' | 'wireframe' | 'chrome' | 'glass';

interface SceneObjectProps {
  shape: ShapeType;
  material: MaterialType;
  color: string;
  speed: number;
  distortion: number;
}

function SceneObject({ shape, material, color, speed, distortion }: SceneObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * 0.4;
      meshRef.current.rotation.y += delta * speed * 0.6;
    }
  });

  const renderGeometry = () => {
    switch (shape) {
      case 'torusKnot':
        return <torusKnotGeometry args={[1.3, 0.42, 128, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1.8, 1]} />;
      case 'octahedron':
        return <octahedronGeometry args={[2, 0]} />;
      case 'sphere':
      default:
        return <sphereGeometry args={[1.6, 64, 64]} />;
    }
  };

  const renderMaterial = () => {
    switch (material) {
      case 'wireframe':
        return (
          <meshStandardMaterial
            wireframe
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
          />
        );
      case 'chrome':
        return (
          <meshStandardMaterial
            color={color}
            roughness={0.08}
            metalness={0.95}
            envMapIntensity={1.5}
          />
        );
      case 'glass':
        return (
          <meshPhysicalMaterial
            color={color}
            transmission={0.9}
            opacity={1}
            transparent
            roughness={0.15}
            ior={1.5}
            thickness={1.2}
          />
        );
      case 'distort':
      default:
        return (
          <MeshDistortMaterial
            color={color}
            distort={distortion}
            speed={speed * 1.5}
            roughness={0.2}
            metalness={0.8}
          />
        );
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        {renderMaterial()}
      </mesh>
    </Float>
  );
}

export const Interactive3DPlayground: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>('torusKnot');
  const [material, setMaterial] = useState<MaterialType>('distort');
  const [color, setColor] = useState('#06b6d4');
  const [speed, setSpeed] = useState(1.2);
  const [distortion, setDistortion] = useState(0.45);

  const colors = [
    { label: 'Cyan', hex: '#06b6d4' },
    { label: 'Purple', hex: '#a855f7' },
    { label: 'Pink', hex: '#ec4899' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Amber', hex: '#f59e0b' },
  ];

  return (
    <section id="lab" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE 3D LAB // LIVE COMPUTE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Procedural <span className="cyber-gradient-text">Geometry Studio</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Real-time WebGL shader & geometry sandbox. Tweak parameters, rotate in 3D, and experiment with material light responses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Canvas Viewport */}
          <div className="lg:col-span-8 h-[480px] md:h-[550px] rounded-3xl overflow-hidden glass-panel-glow relative border border-cyan-500/20">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} color={color} />
              <pointLight position={[-10, -5, -5]} intensity={1} color="#6366f1" />
              <SceneObject
                shape={shape}
                material={material}
                color={color}
                speed={speed}
                distortion={distortion}
              />
              <OrbitControls enableZoom={true} enablePan={false} maxDistance={9} minDistance={3} />
            </Canvas>

            {/* In-canvas info badge */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700/60 backdrop-blur-md text-xs font-mono text-cyan-300">
              SHAPE: <span className="text-white uppercase">{shape}</span> | SHADER: <span className="text-white uppercase">{material}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-center px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700/60 backdrop-blur-md text-xs text-slate-400">
              <span>⚡ Drag to orbit 360° • Scroll to zoom</span>
              <button
                onClick={() => {
                  sounds.playClick();
                  setShape('torusKnot');
                  setMaterial('distort');
                  setColor('#06b6d4');
                  setSpeed(1.2);
                  setDistortion(0.45);
                }}
                className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Interactive Controls Panel */}
          <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h3 className="font-semibold text-white tracking-wide text-lg">Shader & Mesh Controls</h3>
            </div>

            {/* Geometry Selection */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-cyan-400" /> Geometry Mesh
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['torusKnot', 'icosahedron', 'sphere', 'octahedron'] as ShapeType[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      sounds.playClick();
                      setShape(s);
                    }}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all ${
                      shape === s
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {s === 'torusKnot' ? 'Torus Knot' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Selection */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Surface Shader
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['distort', 'wireframe', 'chrome', 'glass'] as MaterialType[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      sounds.playClick();
                      setMaterial(m);
                    }}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all ${
                      material === m
                        ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Accent Picker */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-400" /> Emission Color
              </label>
              <div className="flex items-center space-x-3">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => {
                      sounds.playClick();
                      setColor(c.hex);
                    }}
                    style={{ backgroundColor: c.hex }}
                    className={`w-8 h-8 rounded-full transition-transform ${
                      color === c.hex
                        ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950 shadow-lg'
                        : 'opacity-70 hover:opacity-100 hover:scale-110'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>ANGULAR VELOCITY</span>
                  <span className="text-cyan-400">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {material === 'distort' && (
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>DISPLACEMENT NOISE</span>
                    <span className="text-cyan-400">{distortion.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1.2"
                    step="0.05"
                    value={distortion}
                    onChange={(e) => setDistortion(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
