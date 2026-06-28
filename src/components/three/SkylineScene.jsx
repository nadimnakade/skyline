import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Building({ position, height, width, depth, color }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.02 + Math.sin(clock.elapsedTime * 0.5 + position[0]) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive="#D4AF37"
        emissiveIntensity={0.02}
        roughness={0.7}
        metalness={0.3}
      />
    </mesh>
  );
}

function WindowLights({ position, width, height }) {
  const lights = useMemo(() => {
    const arr = [];
    const rows = Math.floor(height / 0.3);
    const cols = Math.floor(width / 0.3);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() > 0.4) {
          arr.push({
            key: `${r}-${c}`,
            pos: [
              position[0] - width / 2 + 0.15 + c * 0.3,
              position[1] - height / 2 + 0.2 + r * 0.3,
              position[2] + 0.01,
            ],
            intensity: Math.random() * 0.3 + 0.1,
          });
        }
      }
    }
    return arr;
  }, [position, width, height]);

  return (
    <>
      {lights.map((l) => (
        <mesh key={l.key} position={l.pos}>
          <planeGeometry args={[0.12, 0.15]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={l.intensity} />
        </mesh>
      ))}
    </>
  );
}

function Skyline() {
  const groupRef = useRef();

  const buildings = useMemo(() => [
    { pos: [-6, 2, -3], h: 4, w: 0.8, d: 0.8, c: '#1a1a1a' },
    { pos: [-4.5, 3, -2], h: 6, w: 1.2, d: 1, c: '#151515' },
    { pos: [-3, 1.5, -1], h: 3, w: 0.6, d: 0.6, c: '#1e1e1e' },
    { pos: [-1.5, 4, -2.5], h: 8, w: 1.5, d: 1.2, c: '#131313' },
    { pos: [0, 2.5, -1], h: 5, w: 0.7, d: 0.7, c: '#1c1c1c' },
    { pos: [1.5, 5, -3], h: 10, w: 1.8, d: 1.5, c: '#111111' },
    { pos: [3, 2, -1.5], h: 4, w: 0.9, d: 0.8, c: '#191919' },
    { pos: [4.5, 3.5, -2], h: 7, w: 1.3, d: 1.1, c: '#161616' },
    { pos: [6, 1.8, -1], h: 3.5, w: 0.7, d: 0.7, c: '#1d1d1d' },
    { pos: [-5.5, 4.5, -4], h: 9, w: 1.6, d: 1.4, c: '#121212' },
    { pos: [5.5, 4, -4], h: 8, w: 1.4, d: 1.2, c: '#141414' },
    { pos: [-2, 3.5, -4.5], h: 7, w: 1.1, d: 1, c: '#171717' },
    { pos: [2.5, 6, -5], h: 12, w: 2, d: 1.8, c: '#101010' },
    { pos: [0.5, 3, -3.5], h: 6, w: 1, d: 0.9, c: '#1b1b1b' },
    { pos: [-3.5, 5.5, -5.5], h: 11, w: 1.7, d: 1.5, c: '#0f0f0f' },
    { pos: [7, 2.5, -3], h: 5, w: 0.8, d: 0.7, c: '#181818' },
    { pos: [-7, 3, -3], h: 6, w: 1, d: 0.9, c: '#151515' },
    { pos: [4, 5.5, -6], h: 11, w: 1.8, d: 1.6, c: '#111111' },
    { pos: [-1, 7, -6.5], h: 14, w: 2.2, d: 2, c: '#0e0e0e' },
    { pos: [6.5, 4, -5.5], h: 8, w: 1.3, d: 1.1, c: '#131313' },
  ], []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.05) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {buildings.map((b, i) => (
        <group key={i}>
          <Building
            position={b.pos}
            height={b.h}
            width={b.w}
            depth={b.d}
            color={b.c}
          />
          <WindowLights
            position={b.pos}
            width={b.w}
            height={b.h}
          />
        </group>
      ))}
    </group>
  );
}

function Fog() {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(clock.elapsedTime * 0.1) * 2;
      meshRef.current.position.z = Math.cos(clock.elapsedTime * 0.08) * 1.5;
    }
    if (materialRef.current) {
      materialRef.current.opacity = 0.08 + Math.sin(clock.elapsedTime * 0.2) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 2, -2]}>
      <planeGeometry args={[30, 8]} />
      <meshBasicMaterial ref={materialRef} color="#D4AF37" transparent opacity={0.06} />
    </mesh>
  );
}

function Particles() {
  const particlesRef = useRef();
  const count = 80;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = Math.random() * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        pos.array[i * 3 + 1] += 0.002;
        if (pos.array[i * 3 + 1] > 10) {
          pos.array[i * 3 + 1] = 0;
        }
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4AF37"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GoldenLight() {
  return (
    <>
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.4}
        color="#D4AF37"
        castShadow
      />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#D4AF37" />
      <pointLight position={[-5, 3, 2]} intensity={0.15} color="#C89F3D" />
    </>
  );
}

export default function SkylineScene() {
  return (
    <Canvas
      camera={{ position: [0, 3, 8], fov: 50, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.05} />
      <GoldenLight />

      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Skyline />
      </Float>

      <Fog />
      <Particles />

      <fog attach="fog" args={['#060606', 8, 25]} />
    </Canvas>
  );
}
