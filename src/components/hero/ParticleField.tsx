import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { HeroState } from "./heroState";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ParticleField({ hero, count = 90 }: { hero: HeroState; count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, seeds } = useMemo(() => {
    const rng = mulberry32(29);
    const pos = new Float32Array(count * 3);
    const sd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rng() - 0.4) * 12;
      pos[i * 3 + 1] = (rng() - 0.5) * 7;
      pos[i * 3 + 2] = (rng() - 0.5) * 8;
      sd[i] = rng() * 10;
    }
    return { positions: pos, seeds: sd };
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current || hero.reducedMotion) return;
    const t = clock.elapsedTime;
    const posAttr = points.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      posAttr.array[i * 3 + 1] += Math.sin(t * 0.3 + s) * 0.0006;
    }
    posAttr.needsUpdate = true;

    points.current.rotation.y = THREE.MathUtils.lerp(points.current.rotation.y, hero.pointer.x * 0.06, 0.03);
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, -hero.pointer.y * 0.04, 0.03);

    const mat = points.current.material as THREE.PointsMaterial;
    mat.opacity = 0.35 + Math.sin(t * 0.4) * 0.12;
  });

  return (
    <points ref={points} position={[1, 0, 1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e8d8c4" size={0.03} transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}
