import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import HeroSphere from "./HeroSphere";
import LightTrails from "./LightTrails";
import ParticleField from "./ParticleField";
import HeroEffects from "./HeroEffects";
import { createHeroState } from "./heroState";

function SceneController({ heroRef }: { heroRef: React.MutableRefObject<ReturnType<typeof createHeroState>> }) {
  useFrame(({ pointer }) => {
    const hero = heroRef.current;
    if (hero.reducedMotion) return;
    hero.pointer.x = pointer.x;
    hero.pointer.y = pointer.y;
  });
  return null;
}

export default function HeroCanvas() {
  const [ready, setReady] = useState(false);
  const [simplified, setSimplified] = useState(false);
  const heroRef = useRef(createHeroState(false));

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;
    heroRef.current = createHeroState(reducedMotion);
    setSimplified(isSmall);
    setReady(true);

    const heroSection = document.getElementById("top");
    const onScroll = () => {
      if (!heroSection) return;
      const rect = heroSection.getBoundingClientRect();
      const progress = THREE_clamp01(-rect.top / Math.max(rect.height, 1));
      heroRef.current.scroll = progress;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!ready) return null;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, simplified ? 1.2 : 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7.5], fov: 42 }}
      >
        <color attach="background" args={["#100809"]} />
        <fog attach="fog" args={["#100809", 6, 16]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 3, 4]} intensity={12} color="#efe3cb" />
        <pointLight position={[-4, -2, -3]} intensity={8} color="#93a8c9" />

        <SceneController heroRef={heroRef} />
        <Suspense fallback={null}>
          <HeroSphere hero={heroRef.current} />
          <LightTrails hero={heroRef.current} />
          <ParticleField hero={heroRef.current} count={simplified ? 45 : 90} />
        </Suspense>
        <HeroEffects enabled={!simplified && !heroRef.current.reducedMotion} />
      </Canvas>
    </div>
  );
}

function THREE_clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}
