import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "../data/skillsData";

// Theme palette — coral primary, teal secondary, ink for creative
const THEME = {
  tech: ["#FF4D2E", "#0E8C7F"], // alternate coral / teal
  soft: ["#0E8C7F", "#FF4D2E"],
  creative: ["#1B1A17", "#FF4D2E"]
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
  const labelRefs = useRef([]);

  // Precompute node positions + normals for the active category
  const nodes = useMemo(() => {
    const palette = THEME[category] || THEME.tech;
    const filtered = skills.filter((s) => s.category === category);
    labelRefs.current = [];
    return filtered.map((skill, i) => {
      const pos = latLonToVector3(skill.lat, skill.lon, 1.58);
      return {
        name: skill.name,
        pos,
        normal: pos.clone().normalize(),
        color: palette[i % palette.length]
      };
    });
  }, [category]);

  const camDir = useRef(new THREE.Vector3());
  const worldNormal = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y += 0.0014;

    // direction from globe centre (origin) toward the camera
    camDir.current.copy(state.camera.position).normalize();
    const q = globeRef.current.quaternion;

    nodes.forEach((n, i) => {
      const el = labelRefs.current[i];
      if (!el) return;
      // node's outward normal in world space
      worldNormal.current.copy(n.normal).applyQuaternion(q);
      const facing = worldNormal.current.dot(camDir.current); // 1 = front, -1 = back
      const o = Math.max(0, Math.min(1, (facing - 0.1) / 0.45));
      el.style.opacity = o.toFixed(3);
      el.style.transform = `scale(${0.85 + o * 0.15})`;
    });
  });

  return (
    <group ref={globeRef}>
      {/* faint shaded core gives the sphere volume */}
      <mesh>
        <sphereGeometry args={[1.49, 48, 48]} />
        <meshBasicMaterial color="#1B1A17" transparent opacity={0.035} />
      </mesh>

      {/* wireframe shell */}
      <mesh>
        <sphereGeometry args={[1.5, 36, 36]} />
        <meshBasicMaterial wireframe color="#1B1A17" transparent opacity={0.12} />
      </mesh>

      {nodes.map((n, i) => (
        <group key={`${category}-${i}`} position={n.pos.toArray()}>
          {/* glow halo */}
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color={n.color} transparent opacity={0.16} />
          </mesh>
          {/* solid node */}
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={n.color} />
          </mesh>

          <Html position={[0, 0.26, 0]} center distanceFactor={8} zIndexRange={[10, 0]}>
            <span
              ref={(el) => (labelRefs.current[i] = el)}
              className="whitespace-nowrap text-[11px] font-semibold tracking-tight"
              style={{ color: "#1B1A17", opacity: 0, willChange: "opacity, transform" }}
            >
              {n.name}
            </span>
          </Html>
        </group>
      ))}
    </group>
  );
}

export function SkillsGlobe({ category }) {
  return (
    <div className="h-[520px] w-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <GlobeModel category={category} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
