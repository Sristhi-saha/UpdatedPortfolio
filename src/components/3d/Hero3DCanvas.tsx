import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { sounds } from '../../utils/audio';

function QuantumCore({ isHovered, setIsHovered }: { isHovered: boolean; setIsHovered: (h: boolean) => void }) {
  const outerRingRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const orbitalRef1 = useRef<THREE.Mesh>(null);
  const orbitalRef2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Smooth mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.y += delta * 0.4;
      outerRingRef.current.rotation.x = THREE.MathUtils.lerp(outerRingRef.current.rotation.x, targetY * 0.5, 0.05);
      outerRingRef.current.rotation.z = THREE.MathUtils.lerp(outerRingRef.current.rotation.z, -targetX * 0.5, 0.05);
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.25;
      coreRef.current.rotation.x += delta * 0.15;
    }

    if (orbitalRef1.current) {
      orbitalRef1.current.rotation.z += delta * 0.8;
      orbitalRef1.current.rotation.x += delta * 0.3;
    }

    if (orbitalRef2.current) {
      orbitalRef2.current.rotation.y += delta * 0.6;
      orbitalRef2.current.rotation.z -= delta * 0.4;
    }
  });

  return (
    <group
      onPointerOver={() => {
        setIsHovered(true);
        sounds.playHover();
      }}
      onPointerOut={() => setIsHovered(false)}
      onClick={() => sounds.playWarp()}
    >
      {/* Outer Floating Wireframe Cage */}
      <group ref={outerRingRef}>
        <mesh>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshStandardMaterial
            wireframe
            color={isHovered ? "#38bdf8" : "#818cf8"}
            emissive={isHovered ? "#0284c7" : "#4338ca"}
            emissiveIntensity={isHovered ? 0.9 : 0.4}
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>

      {/* Primary Dynamic Glowing Crystal Core */}
      <Float speed={3.5} rotationIntensity={1.2} floatIntensity={1.8}>
        <Sphere ref={coreRef} args={[1.2, 64, 64]} scale={isHovered ? 1.15 : 1.0}>
          <MeshDistortMaterial
            color={isHovered ? "#06b6d4" : "#6366f1"}
            attach="material"
            distort={isHovered ? 0.65 : 0.42}
            speed={isHovered ? 3.5 : 2.2}
            roughness={0.15}
            metalness={0.85}
          />
        </Sphere>
      </Float>

      {/* Orbital Glowing Rings */}
      <mesh ref={orbitalRef1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.7, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh ref={orbitalRef2} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[3.1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// Interactive floating particle cloud
function FloatingDust() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 120;

  const positions = React.useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      coords[i] = (Math.random() - 0.5) * 12;
      coords[i + 1] = (Math.random() - 0.5) * 12;
      coords[i + 2] = (Math.random() - 0.5) * 10;
    }
    return coords;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#38bdf8"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const Hero3DCanvas: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden glass-panel border border-indigo-500/20 shadow-2xl shadow-indigo-950/50">
      {/* Interactive Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -5, -5]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[0, 4, 3]} intensity={2} color="#ec4899" />

        <Stars radius={40} depth={30} count={1200} factor={3} saturation={0.5} fade speed={1.2} />
        <FloatingDust />
        <QuantumCore isHovered={isHovered} setIsHovered={setIsHovered} />
      </Canvas>

      {/* Floating Interactive Badge Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-indigo-500/30 backdrop-blur-md text-xs font-mono text-cyan-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>R3F_RENDERER // 60_FPS</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-indigo-500/30 backdrop-blur-md text-xs font-mono text-slate-400">
        <span>🖱️ Drag / Hover / Tap the Core</span>
      </div>
    </div>
  );
};
