import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

/** Deterministic PRNG so the "organic" randomness is stable across renders/HMR. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute float aOpacity;
  attribute float aSeed;
  attribute float aColorMix;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  uniform float uDispersionRadius;
  uniform float uDispersionStrength;
  uniform float uReducedMotion;
  uniform float uPixelRatio;
  uniform float uSizeScale;

  varying float vOpacity;
  varying float vColorMix;
  varying float vGlow;

  void main() {
    vec3 pos = position;

    float drift = 1.0 - uReducedMotion;
    pos.y += sin(uTime * 0.15 + aSeed * 6.2831) * 0.02 * drift;
    pos.x += cos(uTime * 0.12 + aSeed * 6.2831) * 0.012 * drift;
    pos.z += sin(uTime * 0.1 + aSeed * 3.14) * 0.03 * drift;

    vec2 toParticle = pos.xy - uMouse;
    float dist = length(toParticle);
    float falloff = smoothstep(uDispersionRadius, 0.0, dist);
    vec2 dir = dist > 0.0001 ? normalize(toParticle) : vec2(0.0, 0.0);
    pos.xy += dir * falloff * uDispersionStrength * uMouseActive;

    float breathe = mix(1.0, 0.82 + 0.18 * sin(uTime * 0.4 + aSeed * 10.0), drift);

    vOpacity = aOpacity * breathe;
    vColorMix = aColorMix;
    vGlow = falloff * uMouseActive;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * uSizeScale;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;

  varying float vOpacity;
  varying float vColorMix;
  varying float vGlow;

  uniform vec3 uColorCream;
  uniform vec3 uColorTaupe;
  uniform vec3 uColorRust;
  uniform vec3 uColorGold;
  uniform float uAccentIntensity;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float circle = smoothstep(0.5, 0.05, d);
    if (circle <= 0.01) discard;

    vec3 color = mix(uColorCream, uColorTaupe, smoothstep(0.0, 0.65, vColorMix));
    color = mix(color, uColorRust, smoothstep(0.65, 0.9, vColorMix) * uAccentIntensity);
    color += uColorGold * vGlow * 0.4;

    gl_FragColor = vec4(color, circle * vOpacity);
  }
`;

type FieldConfig = {
  strandCount: number;
  minParticles: number;
  maxParticles: number;
  particleSize: number;
  fieldOpacity: number;
  dispersionRadius: number;
  dispersionStrength: number;
  returnSpeed: number;
  animationSpeed: number;
  accentIntensity: number;
};

/**
 * All positions live in a fixed logical [-1, 1] x [-1, 1] square — the camera
 * below is an orthographic camera with that exact frustum, so this square
 * always fills the canvas completely regardless of the section's real pixel
 * aspect ratio. No particle can ever be clipped off-frame.
 */
function buildField({ strandCount, minParticles, maxParticles }: FieldConfig, seed: number) {
  const rng = mulberry32(seed);
  const positions: number[] = [];
  const sizes: number[] = [];
  const opacities: number[] = [];
  const seeds: number[] = [];
  const colorMixes: number[] = [];

  for (let s = 0; s < strandCount; s++) {
    const originX = 0.32 + (rng() - 0.5) * 0.3;
    const originY = -0.05 + (rng() - 0.5) * 0.35;
    const originZ = (rng() - 0.5) * 0.3;

    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(rng() * 2 - 1);
    const dirX = Math.sin(phi) * Math.cos(theta);
    const dirY = Math.sin(phi) * Math.sin(theta);
    const dirZ = Math.cos(phi) * 0.4;

    const length = 0.35 + rng() * 0.8;
    const particleCount = minParticles + Math.floor(rng() * (maxParticles - minParticles + 1));
    const curveBend = (rng() - 0.5) * 0.22;
    const strandOpacity = 0.12 + rng() * 0.5;
    const strandColorMix = rng();
    const hasGap = rng() < 0.25;

    for (let p = 0; p < particleCount; p++) {
      const t = (p + rng() * 0.4) / particleCount;
      if (hasGap && t > 0.35 && t < 0.6 && rng() < 0.55) continue;

      const bend = Math.sin(t * Math.PI) * curveBend;
      const x = originX + dirX * length * t + bend * -dirY;
      const y = originY + dirY * length * t + bend * dirX;
      const z = originZ + dirZ * length * t;

      positions.push(x, y, z);

      const isNode = rng() < 0.07;
      sizes.push((p === 0 ? 1.6 + rng() * 1.2 : 0.5 + rng() * 1.5) * (isNode ? 1.9 : 1));
      opacities.push(Math.max(0.03, strandOpacity * (1 - t * 0.55) * (0.55 + rng() * 0.45)));
      seeds.push(rng() * 100);
      colorMixes.push(Math.min(1, Math.max(0, strandColorMix + (rng() - 0.5) * 0.18)));
    }
  }

  return {
    positions: new Float32Array(positions),
    sizes: new Float32Array(sizes),
    opacities: new Float32Array(opacities),
    seeds: new Float32Array(seeds),
    colorMixes: new Float32Array(colorMixes),
  };
}

function ParticleScene({
  config,
  mouseRef,
  activeRef,
  reducedMotion,
}: {
  config: FieldConfig;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  activeRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const { size } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const field = useMemo(() => buildField(config, 1337), [config]);

  const smoothedMouse = useRef(new THREE.Vector2(9999, 9999));
  const smoothedActive = useRef(0);
  const targetMouse = useRef(new THREE.Vector2(9999, 9999));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(9999, 9999) },
      uMouseActive: { value: 0 },
      uDispersionRadius: { value: config.dispersionRadius },
      uDispersionStrength: { value: config.dispersionStrength },
      uReducedMotion: { value: reducedMotion ? 1 : 0 },
      uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
      uSizeScale: { value: 3 },
      uColorCream: { value: new THREE.Color("#e8d8c4") },
      uColorTaupe: { value: new THREE.Color("#a68a76") },
      uColorRust: { value: new THREE.Color("#9c2c3d") },
      uColorGold: { value: new THREE.Color("#c9a227") },
      uAccentIntensity: { value: config.accentIntensity },
    }),
    [config, reducedMotion]
  );

  useFrame(({ clock }) => {
    const mat = materialRef.current;
    const points = pointsRef.current;
    if (!mat) return;

    const t = clock.elapsedTime * config.animationSpeed;
    mat.uniforms.uTime.value = t;
    mat.uniforms.uSizeScale.value = Math.max(1.6, Math.min(4.5, size.height / 220));

    // The orthographic frustum below is exactly [-1, 1] on both axes, which
    // is identical to NDC space, so the raw pointer coordinates ARE already
    // the correct world-space x/y — no unprojection/raycast needed.
    targetMouse.current.set(mouseRef.current.x, mouseRef.current.y);
    smoothedMouse.current.lerp(targetMouse.current, 0.12);
    smoothedActive.current += (activeRef.current - smoothedActive.current) * config.returnSpeed;

    mat.uniforms.uMouse.value.copy(smoothedMouse.current);
    mat.uniforms.uMouseActive.value = smoothedActive.current;

    if (points && !reducedMotion) {
      points.rotation.x = Math.sin(t * 0.05) * 0.025;
      points.rotation.y = Math.cos(t * 0.04) * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[field.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[field.sizes, 1]} />
        <bufferAttribute attach="attributes-aOpacity" args={[field.opacities, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[field.seeds, 1]} />
        <bufferAttribute attach="attributes-aColorMix" args={[field.colorMixes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

const DEFAULT_CONFIG: FieldConfig = {
  strandCount: 170,
  minParticles: 3,
  maxParticles: 8,
  particleSize: 1,
  fieldOpacity: 0.45,
  dispersionRadius: 0.32,
  dispersionStrength: 0.14,
  returnSpeed: 0.05,
  animationSpeed: 1,
  accentIntensity: 0.7,
};

const MOBILE_CONFIG: Partial<FieldConfig> = {
  strandCount: 45,
  minParticles: 2,
  maxParticles: 4,
};

const TABLET_CONFIG: Partial<FieldConfig> = {
  strandCount: 95,
  minParticles: 2,
  maxParticles: 6,
};

export default function ExperienceParticleField(props: Partial<FieldConfig>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const mouseRef = useRef({ x: 9999, y: 9999 });
  const activeRef = useRef(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const updateDevice = () => {
      const w = window.innerWidth;
      setDevice(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    updateDevice();
    window.addEventListener("resize", updateDevice);

    const el = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (el) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setVisible(true);
              observer?.disconnect();
            }
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    }

    return () => {
      window.removeEventListener("resize", updateDevice);
      observer?.disconnect();
    };
  }, []);

  const config = useMemo<FieldConfig>(() => {
    const base = { ...DEFAULT_CONFIG, ...props };
    if (device === "mobile") return { ...base, ...MOBILE_CONFIG };
    if (device === "tablet") return { ...base, ...TABLET_CONFIG };
    return base;
  }, [device, props]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    activeRef.current = 1;
  }
  function handlePointerLeave() {
    activeRef.current = 0;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden transition-opacity duration-[1400ms] ease-out"
      style={{ opacity: visible ? config.fieldOpacity : 0 }}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {visible && (
        <Canvas
          dpr={[1, device === "desktop" ? 1.5 : 1]}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          style={{ pointerEvents: "none" }}
        >
          <OrthographicCamera makeDefault position={[0, 0, 5]} left={-1} right={1} top={1} bottom={-1} near={0.1} far={20} />
          <ParticleScene config={config} mouseRef={mouseRef} activeRef={activeRef} reducedMotion={reducedMotion} />
        </Canvas>
      )}
    </div>
  );
}
