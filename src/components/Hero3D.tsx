import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function CoreBlob({ reducedMotion }: { reducedMotion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scaleRef = useRef(1);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    if (!reducedMotion) mesh.current.rotation.y += delta * 0.12;
    const target = hovered ? 1.16 : 1;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target, 0.08);
    mesh.current.scale.setScalar(scaleRef.current);
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[0.5, 4]} />
      <MeshDistortMaterial
        color={hovered ? "#c084e8" : "#a855d6"}
        emissive="#5b2f8c"
        emissiveIntensity={hovered ? 0.9 : 0.5}
        roughness={0.25}
        metalness={0.3}
        distort={hovered ? 0.4 : 0.25}
        speed={reducedMotion ? 0 : hovered ? 3 : 1.4}
      />
    </mesh>
  );
}

function Orbiter({
  radius,
  speed,
  offset,
  size,
  shape,
  color,
  reducedMotion,
}: {
  radius: number;
  speed: number;
  offset: number;
  size: number;
  shape: "octahedron" | "torus" | "tetrahedron";
  color: string;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scaleRef = useRef(1);

  useFrame(({ clock }, delta) => {
    if (!group.current || !mesh.current) return;
    if (!reducedMotion) {
      const t = clock.elapsedTime * speed + offset;
      group.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.7) * radius * 0.4, Math.sin(t) * radius);
      mesh.current.rotation.x += delta * (hovered ? 1.6 : 0.5);
      mesh.current.rotation.y += delta * (hovered ? 1.6 : 0.5);
    }
    const target = hovered ? 1.4 : 1;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target, 0.1);
    mesh.current.scale.setScalar(scaleRef.current);
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {shape === "octahedron" && <octahedronGeometry args={[size, 0]} />}
        {shape === "torus" && <torusGeometry args={[size, size * 0.35, 12, 32]} />}
        {shape === "tetrahedron" && <tetrahedronGeometry args={[size, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          roughness={0.35}
          metalness={0.4}
          wireframe={!hovered}
        />
      </mesh>
    </group>
  );
}

function Stars({ count = 160 }: { count?: number }) {
  const positions = useMemo(() => {
    const rng = mulberry32(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rng() - 0.5) * 30;
      arr[i * 3 + 1] = (rng() - 0.5) * 18;
      arr[i * 3 + 2] = -6 - rng() * 10;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.35 + Math.sin(clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c9b8e0" size={0.045} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (reducedMotion || !group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.35, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.2, 0.04);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={14} color="#c084e8" />
      <pointLight position={[-5, -3, -5]} intensity={9} color="#7b7fd1" />
      <Stars />
      <group ref={group} position={[2, -1.8, -3]}>
        <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={0.3} floatIntensity={0.6}>
          <CoreBlob reducedMotion={reducedMotion} />
        </Float>
        <Orbiter radius={1.1} speed={0.35} offset={0} size={0.1} shape="octahedron" color="#7b7fd1" reducedMotion={reducedMotion} />
        <Orbiter radius={0.9} speed={0.5} offset={2.1} size={0.08} shape="torus" color="#c084e8" reducedMotion={reducedMotion} />
        <Orbiter radius={1.35} speed={0.28} offset={4.2} size={0.09} shape="tetrahedron" color="#9b85c9" reducedMotion={reducedMotion} />
      </group>
    </>
  );
}

export default function Hero3D() {
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 45 }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
