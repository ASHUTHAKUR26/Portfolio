import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SkillSphere } from "@/3d/SkillSphere";

export function SkillSphereScene({ skills }: { skills: string[] }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 3]} intensity={30} color="#38bdf8" />
      <pointLight position={[-3, -2, -2]} intensity={20} color="#8b5cf6" />

      <Suspense fallback={null}>
        <SkillSphere skills={skills} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
