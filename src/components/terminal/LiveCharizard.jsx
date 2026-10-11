import { Component, Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/charizard.glb";
const DRACO = "https://www.gstatic.com/draco/versioned/decoders/1.5.6/";

class BuddyErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <div className="buddy-fallback" aria-hidden="true" />;
    }
    return this.props.children;
  }
}

function CharizardModel({ mood = "idle", busy = false, breathing = false, facing = "wait" }) {
  const group = useRef(null);
  const { scene, animations } = useGLTF(MODEL_URL, DRACO);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Center model so wings/head fit the frame
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    scene.position.x = -center.x;
    scene.position.y = -center.y - size.y * 0.08;
    scene.position.z = -center.z;

    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      obj.castShadow = true;
      obj.receiveShadow = true;
      if (obj.material) {
        obj.material.roughness = Math.min(obj.material.roughness ?? 0.55, 0.72);
      }
    });
  }, [scene]);

  useEffect(() => {
    const action =
      actions.Chariard_dizzy ||
      actions["Chariard_dizzy"] ||
      Object.values(actions)[0];
    if (!action) return undefined;

    action.reset().fadeIn(0.2).play();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.timeScale = breathing
      ? 1.65
      : busy || mood === "talk"
        ? 1.3
        : mood === "happy"
          ? 1.5
          : 1.05;

    return () => {
      action.fadeOut(0.15);
    };
  }, [actions, mood, busy, breathing]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const atPrompt = facing === "prompt" || breathing;
    const lift = breathing ? 0.015 : busy || mood === "talk" ? 0.08 : 0.05;
    const spin = breathing ? 0.02 : busy || mood === "talk" ? 0.45 : mood === "happy" ? 0.6 : 0.22;
    // Hold a steady left profile while breathing so the snout lines up with the CSS flame
    const yawTarget = atPrompt
      ? -0.95 + Math.sin(t * 1.4) * 0.02
      : 0.35 + Math.sin(t * 0.7) * spin;
    group.current.position.y = Math.sin(t * (breathing ? 2.2 : 1.55)) * lift;
    group.current.position.x = atPrompt ? 0.08 : 0;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, yawTarget, 0.12);
    group.current.rotation.z = Math.sin(t * 1.05) * (breathing ? 0.008 : 0.03);
    const pulse = breathing ? 1 + Math.sin(t * 10) * 0.02 : mood === "happy" ? 1 + Math.sin(t * 4) * 0.025 : 1;
    group.current.scale.setScalar(0.26 * pulse);
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

function StageFallback() {
  return (
    <mesh>
      <icosahedronGeometry args={[0.28, 1]} />
      <meshStandardMaterial
        color="#ff7a2e"
        emissive="#ff4d00"
        emissiveIntensity={0.45}
        wireframe
      />
    </mesh>
  );
}

function CharizardScene({ mood, busy, breathing, facing }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.15, 4.2], fov: 28, near: 0.1, far: 50 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[2.6, 3.8, 2.4]} intensity={1.55} color="#fff4e8" />
      <directionalLight position={[-2.6, 1.4, -1.2]} intensity={0.5} color="#8ec0ff" />
      <pointLight
        position={[0.2, 0.9, 1.8]}
        intensity={breathing ? 2.2 : 1.2}
        color="#ff8a2a"
        distance={7}
      />
      <Suspense fallback={<StageFallback />}>
        <Float
          speed={breathing ? 0.8 : 1.5}
          rotationIntensity={breathing ? 0 : 0.18}
          floatIntensity={breathing ? 0.06 : 0.4}
        >
          <CharizardModel mood={mood} busy={busy} breathing={breathing} facing={facing} />
        </Float>
      </Suspense>
      <ContactShadows
        position={[0, -1.15, 0]}
        opacity={0.4}
        scale={6}
        blur={2.6}
        far={3.5}
        color="#000000"
      />
    </Canvas>
  );
}

export default function LiveCharizard({
  mood = "idle",
  busy = false,
  breathing = false,
  facing = "wait",
}) {
  return (
    <div className="buddy-canvas" aria-hidden="true">
      <BuddyErrorBoundary>
        <CharizardScene mood={mood} busy={busy} breathing={breathing} facing={facing} />
      </BuddyErrorBoundary>
    </div>
  );
}

useGLTF.preload(MODEL_URL, DRACO);
