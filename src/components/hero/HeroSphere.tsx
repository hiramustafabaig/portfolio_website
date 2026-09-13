import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import type { HeroState } from "./heroState";

const fresnelVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fresnelFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 2.6);
    gl_FragColor = vec4(uColor, fresnel * uIntensity);
  }
`;

function FresnelShell({ hovered }: { hovered: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const intensity = useRef(0.55);

  useFrame(() => {
    if (!mat.current) return;
    const target = hovered ? 1.15 : 0.55;
    intensity.current = THREE.MathUtils.lerp(intensity.current, target, 0.08);
    mat.current.uniforms.uIntensity.value = intensity.current;
  });

  return (
    <mesh scale={1.03}>
      <sphereGeometry args={[1.6, 96, 96]} />
      <shaderMaterial
        ref={mat}
        vertexShader={fresnelVertex}
        fragmentShader={fresnelFragment}
        uniforms={{
          uColor: { value: new THREE.Color("#efe3cb") },
          uIntensity: { value: 0.55 },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

export default function HeroSphere({ hero }: { hero: HeroState }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const scaleRef = useRef(1);
  const distortRef = useRef(0.12);

  useFrame((_, delta) => {
    if (!group.current || !mesh.current) return;
    if (!hero.reducedMotion) {
      mesh.current.rotation.y += delta * 0.08;
      mesh.current.rotation.x += delta * 0.015;
      // gentle parallax tilt toward the cursor
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, hero.pointer.x * 0.18, 0.04);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -hero.pointer.y * 0.12, 0.04);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -hero.scroll * 1.4, 0.06);
    }
    const targetScale = hovered ? 1.08 : 1;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, 0.07);
    mesh.current.scale.setScalar(scaleRef.current);

    hero.hovered = hovered;
  });

  return (
    <group ref={group} position={[2.1, 0, 0]}>
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} color="#9c2c3d" position={[0, 3, -4]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#93a8c9" position={[-4, -1, 2]} scale={[3, 5, 1]} rotation={[0, Math.PI / 2, 0]} />
        <Lightformer form="ring" intensity={2.5} color="#efe3cb" position={[4, 2, 3]} scale={2.5} />
      </Environment>

      <mesh
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.6, 128, 128]} />
        <MeshTransmissionMaterial
          color="#f5eee0"
          thickness={1.4}
          roughness={hovered ? 0.06 : 0.12}
          transmission={1}
          ior={1.35}
          chromaticAberration={hovered ? 0.045 : 0.02}
          distortion={0.15}
          distortionScale={0.4}
          temporalDistortion={hero.reducedMotion ? 0 : 0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          samples={6}
          resolution={512}
          background={new THREE.Color("#100809")}
        />
      </mesh>

      <FresnelShell hovered={hovered} />
    </group>
  );
}
