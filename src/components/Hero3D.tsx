import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Seeded PRNG so the ridge silhouettes are stable across reloads
 * instead of reshuffling every time the hero mounts.
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ridgeShape(rng: () => number, width: number, baseHeight: number, jaggedness: number) {
  const shape = new THREE.Shape();
  const segments = 14;
  const points: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const x = -width / 2 + (width * i) / segments;
    const peak = baseHeight + (rng() - 0.35) * jaggedness;
    points.push([x, Math.max(peak, baseHeight * 0.35)]);
  }
  shape.moveTo(-width / 2, -6);
  points.forEach(([x, y], i) => (i === 0 ? shape.lineTo(x, y) : shape.lineTo(x, y)));
  shape.lineTo(width / 2, -6);
  shape.closePath();
  return shape;
}

function Ridge({
  z,
  color,
  baseHeight,
  jaggedness,
  seed,
  parallax,
  factor,
  yOffset,
}: {
  z: number;
  color: string;
  baseHeight: number;
  jaggedness: number;
  seed: number;
  parallax: React.MutableRefObject<{ x: number; y: number }>;
  factor: number;
  yOffset: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const shape = useMemo(() => ridgeShape(mulberry32(seed), 30, baseHeight, jaggedness), [seed, baseHeight, jaggedness]);

  useFrame(() => {
    if (!mesh.current) return;
    const target = parallax.current;
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, target.x * factor, 0.04);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, yOffset + target.y * factor * 0.5, 0.04);
  });

  return (
    <mesh ref={mesh} position={[0, yOffset, z]}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Stars({ count = 140 }: { count?: number }) {
  const positions = useMemo(() => {
    const rng = mulberry32(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rng() - 0.5) * 34;
      arr[i * 3 + 1] = rng() * 9 + 1;
      arr[i * 3 + 2] = -10 - rng() * 6;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.4 + Math.sin(clock.elapsedTime * 0.6) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f7f3ee" size={0.05} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Sun({ parallax }: { parallax: React.MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.85 + Math.sin(clock.elapsedTime * 0.8) * 0.08;
    const x = 6.8 + parallax.current.x * 0.4;
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, x, 0.03);
  });
  return (
    <mesh ref={mesh} position={[6.8, -4.4, -9.2]}>
      <circleGeometry args={[0.85, 48]} />
      <meshBasicMaterial color="#ffdfa8" transparent opacity={0.9} depthWrite={false} />
    </mesh>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const parallax = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    if (reducedMotion) return;
    parallax.current.x = pointer.x;
    parallax.current.y = pointer.y;
  });

  return (
    <>
      <Stars />
      <Sun parallax={parallax} />
      <Ridge z={-6} seed={11} baseHeight={1.6} jaggedness={0.9} color="#6f93b8" parallax={parallax} factor={0.25} yOffset={-5.4} />
      <Ridge z={-3.5} seed={23} baseHeight={1.1} jaggedness={1.2} color="#2f5c94" parallax={parallax} factor={0.45} yOffset={-6.2} />
      <Ridge z={-1} seed={41} baseHeight={0.6} jaggedness={1.5} color="#152238" parallax={parallax} factor={0.7} yOffset={-7} />
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
        camera={{ position: [0, 0, 10], fov: 45 }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
