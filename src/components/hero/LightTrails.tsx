import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { HeroState } from "./heroState";

const flowVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const flowFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  uniform float uSpeed;
  varying vec2 vUv;
  void main() {
    float flow = fract(vUv.x * 3.0 - uTime * uSpeed);
    float streak = smoothstep(0.0, 0.5, flow) * smoothstep(1.0, 0.5, flow);
    float edge = 1.0 - smoothstep(0.0, 0.5, abs(vUv.y - 0.5));
    vec3 color = mix(uColorA, uColorB, vUv.x);
    float alpha = streak * edge * 0.9;
    gl_FragColor = vec4(color, alpha);
  }
`;

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeTrailCurve(seed: number, center: THREE.Vector3, radius: number) {
  const rng = mulberry32(seed);
  const points: THREE.Vector3[] = [];
  const turns = 1.4;
  const segments = 10;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 2 * turns + rng() * 0.6;
    const r = radius * (0.85 + rng() * 0.3);
    const x = center.x + Math.cos(angle) * r;
    const y = center.y + Math.sin(angle * 0.8) * r * 0.5 + (rng() - 0.5) * 0.6;
    const z = center.z + Math.sin(angle) * r * 0.6 - t * 1.5;
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5);
}

function Trail({
  seed,
  radius,
  speed,
  colorA,
  colorB,
  tubeRadius,
  hero,
}: {
  seed: number;
  radius: number;
  speed: number;
  colorA: string;
  colorB: string;
  tubeRadius: number;
  hero: HeroState;
}) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const speedRef = useRef(speed);

  const geometry = useMemo(() => {
    const curve = makeTrailCurve(seed, new THREE.Vector3(2.1, 0, 0), radius);
    return new THREE.TubeGeometry(curve, 120, tubeRadius, 8, false);
  }, [seed, radius, tubeRadius]);

  useFrame(({ clock }) => {
    if (!mat.current) return;
    const targetSpeed = hero.hovered ? speed * 2.2 : speed;
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, 0.05);
    mat.current.uniforms.uTime.value = hero.reducedMotion ? 0 : clock.elapsedTime;
    mat.current.uniforms.uSpeed.value = speedRef.current;
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={flowVertex}
        fragmentShader={flowFragment}
        uniforms={{
          uColorA: { value: new THREE.Color(colorA) },
          uColorB: { value: new THREE.Color(colorB) },
          uTime: { value: 0 },
          uSpeed: { value: speed },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function LightTrails({ hero }: { hero: HeroState }) {
  return (
    <>
      <Trail seed={3} radius={2.4} speed={0.12} colorA="#9c2c3d" colorB="#efe3cb" tubeRadius={0.02} hero={hero} />
      <Trail seed={11} radius={3.1} speed={0.08} colorA="#93a8c9" colorB="#9c2c3d" tubeRadius={0.015} hero={hero} />
      <Trail seed={19} radius={2.0} speed={0.16} colorA="#efe3cb" colorB="#93a8c9" tubeRadius={0.012} hero={hero} />
    </>
  );
}
