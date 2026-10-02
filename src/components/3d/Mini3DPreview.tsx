import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface Mini3DProps {
  modelType: 'torus' | 'icosahedron' | 'dodecahedron' | 'sphere';
  color: string;
}

function MiniShape({ modelType, color }: Mini3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        {modelType === 'torus' && <torusGeometry args={[1.1, 0.35, 16, 64]} />}
        {modelType === 'icosahedron' && <icosahedronGeometry args={[1.3, 0]} />}
        {modelType === 'dodecahedron' && <dodecahedronGeometry args={[1.3, 0]} />}
        {modelType === 'sphere' && <sphereGeometry args={[1.2, 32, 32]} />}
        <meshStandardMaterial
          wireframe
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  );
}

export const Mini3DPreview: React.FC<Mini3DProps> = ({ modelType, color }) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color={color} />
        <MiniShape modelType={modelType} color={color} />
      </Canvas>
    </div>
  );
};
