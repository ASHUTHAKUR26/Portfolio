import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const COLORS = ["#38bdf8", "#8b5cf6", "#22d3ee"];

function fibonacciSphere(count: number, radius: number) {
  const points: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

type SkillNodeProps = {
  position: [number, number, number];
  label: string;
  color: string;
};

function SkillNode({ position, label, color }: SkillNodeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.9}
          toneMapped={false}
        />
      </mesh>
      <Html center distanceFactor={7} occlude={false}>
        <span
          className="select-none whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-mono transition-all duration-200"
          style={{
            background: hovered ? color : "rgba(17, 24, 39, 0.75)",
            color: hovered ? "#09090b" : "#f8fafc",
            border: `1px solid ${hovered ? color : "rgba(255,255,255,0.12)"}`,
            transform: hovered ? "scale(1.15)" : "scale(1)",
            fontWeight: hovered ? 600 : 400,
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

export function SkillSphere({ skills }: { skills: string[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => fibonacciSphere(skills.length, 2.3), [skills.length]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.00012) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillNode
          key={skill}
          label={skill}
          position={positions[i]}
          color={COLORS[i % COLORS.length]}
        />
      ))}
    </group>
  );
}
