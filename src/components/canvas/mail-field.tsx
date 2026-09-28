"use client";

import { Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

const ENVELOPES: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
}[] = [
  { position: [-2.6, 1.15, -0.4], rotation: [0.2, 0.5, 0.2], scale: 1.05, speed: 1.1 },
  { position: [2.5, 0.7, -0.8], rotation: [-0.15, -0.4, -0.1], scale: 0.9, speed: 1.4 },
  { position: [-1.7, -1.35, 0.2], rotation: [0.3, 0.2, -0.25], scale: 0.78, speed: 0.9 },
  { position: [1.55, -1.15, -1.1], rotation: [-0.2, 0.6, 0.15], scale: 0.84, speed: 1.2 },
  { position: [0.2, 1.7, -1.6], rotation: [0.1, -0.2, 0.05], scale: 0.7, speed: 0.8 },
  { position: [-3.1, -0.15, -1.4], rotation: [0.15, 0.8, 0.3], scale: 0.62, speed: 1.3 },
  { position: [3.15, -0.35, -1.8], rotation: [-0.25, -0.5, -0.2], scale: 0.66, speed: 1 },
];

export function MailField() {
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = host.current;
    if (!node || !enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "160px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div ref={host} className="pointer-events-none absolute inset-0" aria-hidden="true">
      {enabled ? (
        <CanvasBoundary>
          <Canvas
            dpr={[1, 1.5]}
            frameloop={visible ? "always" : "never"}
            camera={{ position: [0, 0, 7.4], fov: 32 }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
              stencil: false,
            }}
          >
            <ambientLight intensity={0.75} />
            <directionalLight position={[4, 5, 6]} intensity={1.35} />
            <directionalLight position={[-5, -2, -3]} intensity={0.35} color="#d93025" />
            {ENVELOPES.map((envelope) => (
              <Envelope key={envelope.position.join("-")} {...envelope} />
            ))}
          </Canvas>
        </CanvasBoundary>
      ) : null}
    </div>
  );
}

function Envelope({
  position,
  rotation,
  scale,
  speed,
}: (typeof ENVELOPES)[number]) {
  return (
    <Float speed={speed} rotationIntensity={0.25} floatIntensity={0.4}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <boxGeometry args={[1.42, 0.92, 0.06]} />
          <meshStandardMaterial color="#f4efe6" roughness={0.62} metalness={0.02} />
        </mesh>
        <mesh position={[0, 0.16, 0.034]} rotation={[0.42, 0, 0]}>
          <planeGeometry args={[1.42, 0.46]} />
          <meshStandardMaterial color="#e6dccb" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.02, 0.05]}>
          <sphereGeometry args={[0.09, 18, 18]} />
          <meshStandardMaterial color="#d93025" roughness={0.32} metalness={0.18} />
        </mesh>
      </group>
    </Float>
  );
}

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
