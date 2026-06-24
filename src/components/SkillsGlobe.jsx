import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "../data/skillsData";

// Theme palette — coral primary, teal secondary, ink for creative
const THEME = {
  tech: ["#FF4D2E", "#0E8C7F"], // alternate coral / teal
  soft: ["#0E8C7F"],
  creative: ["#1B1A17"]
};

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeModel({ category }) {
  const globeRef = useRef();

  useFrame(() => {
    globeRef.current.rotation.y += 0.001;
  });

  const filtered = skills.filter((s) => s.category === category);
  const palette = THEME[category] || THEME.tech;

  return (
    <group ref={globeRef}>
      {/* wireframe sphere — dark ink, faint, reads on the cream panel */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial wireframe color="#1B1A17" opacity={0.14} transparent />
      </mesh>

      {filtered.map((skill, i) => {
        const pos = latLonToVector3(skill.lat, skill.lon, 1.58);
        const color = palette[i % palette.length];
        return (
          <group key={i}>
            <mesh position={pos.toArray()}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>

            <Html position={[pos.x, pos.y + 0.4, pos.z]} distanceFactor={8}>
              <span
                className="whitespace-nowrap text-[10px] font-medium"
                style={{ color: "#1B1A17" }}
              >
                {skill.name}
              </span>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export function SkillsGlobe({ category }) {
  return (
    <div className="h-[520px] w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <GlobeModel category={category} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
