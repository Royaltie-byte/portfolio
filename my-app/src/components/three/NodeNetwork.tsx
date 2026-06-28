"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 70;
const RADIUS = 2.6;
const NEIGHBORS = 2;
const ACCENT_LINE = "#c9a227";
const ACCENT_POINT = "#f4dd9c";
const COMET_CORE_COLOR = "#ffb627";
const BASE_POINT_SIZE = 0.07;
const COMET_COUNT = 4;
const COMET_MIN_DURATION = 2.4;
const COMET_MAX_DURATION = 3.6;
const COMET_CORE_RADIUS = 0.05;
const COMET_GLOW_RADIUS = 0.11;

type Edge = [THREE.Vector3, THREE.Vector3];

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useReducedMotionPreference(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
}

function generateNodes(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }

  return points;
}

function toPositionArray(points: THREE.Vector3[]): Float32Array {
  const array = new Float32Array(points.length * 3);
  points.forEach((point, i) => {
    array[i * 3] = point.x;
    array[i * 3 + 1] = point.y;
    array[i * 3 + 2] = point.z;
  });
  return array;
}

function buildEdgeList(points: THREE.Vector3[], neighbors: number): Edge[] {
  const edges: Edge[] = [];

  points.forEach((point, i) => {
    const nearest = points
      .map((other, j) => ({ j, distance: point.distanceTo(other) }))
      .filter((entry) => entry.j !== i)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, neighbors);

    nearest.forEach(({ j }) => {
      edges.push([point, points[j]]);
    });
  });

  return edges;
}

function edgeListToPositions(edges: Edge[]): Float32Array {
  const positions: number[] = [];
  edges.forEach(([a, b]) => {
    positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
  });
  return new Float32Array(positions);
}

type CometState = {
  edgeIndex: number;
  startTime: number;
  duration: number;
};

function randomDuration() {
  return (
    COMET_MIN_DURATION + Math.random() * (COMET_MAX_DURATION - COMET_MIN_DURATION)
  );
}

function Comets({ edges }: { edges: Edge[] }) {
  const [initialStates] = useState<CometState[]>(() =>
    Array.from({ length: COMET_COUNT }, () => ({
      edgeIndex: Math.floor(Math.random() * edges.length),
      startTime: 0,
      duration: randomDuration(),
    }))
  );
  const statesRef = useRef<CometState[]>(initialStates);
  const coreRefs = useRef<(THREE.Mesh | null)[]>([]);
  const glowRefs = useRef<(THREE.Mesh | null)[]>([]);
  const initializedRef = useRef(false);

  useFrame((state) => {
    const now = state.clock.elapsedTime;

    if (!initializedRef.current) {
      statesRef.current.forEach((comet) => {
        comet.startTime = now - Math.random() * comet.duration;
      });
      initializedRef.current = true;
    }

    statesRef.current.forEach((comet, i) => {
      let elapsed = now - comet.startTime;

      if (elapsed >= comet.duration) {
        comet.edgeIndex = Math.floor(Math.random() * edges.length);
        comet.duration = randomDuration();
        comet.startTime = now;
        elapsed = 0;
      }

      const progress = elapsed / comet.duration;
      const [start, end] = edges[comet.edgeIndex];
      const envelope = Math.sin(progress * Math.PI);

      const core = coreRefs.current[i];
      const glow = glowRefs.current[i];

      if (core && glow) {
        core.position.lerpVectors(start, end, progress);
        glow.position.copy(core.position);

        const coreMaterial = core.material as THREE.MeshBasicMaterial;
        const glowMaterial = glow.material as THREE.MeshBasicMaterial;
        coreMaterial.opacity = envelope;
        glowMaterial.opacity = envelope * 0.55;
      }
    });
  });

  return (
    <>
      {Array.from({ length: COMET_COUNT }).map((_, i) => (
        <group key={i}>
          <mesh
            ref={(el) => {
              glowRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[COMET_GLOW_RADIUS, 8, 8]} />
            <meshBasicMaterial
              color={ACCENT_POINT}
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh
            ref={(el) => {
              coreRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[COMET_CORE_RADIUS, 8, 8]} />
            <meshBasicMaterial
              color={COMET_CORE_COLOR}
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Constellation() {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const reducedMotion = useReducedMotionPreference();

  const nodes = useMemo(() => generateNodes(NODE_COUNT, RADIUS), []);
  const pointPositions = useMemo(() => toPositionArray(nodes), [nodes]);
  const edgeList = useMemo(() => buildEdgeList(nodes, NEIGHBORS), [nodes]);
  const linePositions = useMemo(() => edgeListToPositions(edgeList), [edgeList]);

  useFrame((state, delta) => {
    if (innerRef.current) {
      const spinSpeed = reducedMotion ? 0.012 : 0.06;
      innerRef.current.rotation.y += delta * spinSpeed;
      innerRef.current.rotation.x += delta * spinSpeed * 0.3;
    }

    if (outerRef.current) {
      const tiltStrength = reducedMotion ? 0 : 1;
      const targetX = state.pointer.y * 0.16 * tiltStrength;
      const targetY = state.pointer.x * 0.22 * tiltStrength;
      outerRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRef.current.rotation.x,
        targetX,
        0.04
      );
      outerRef.current.rotation.y = THREE.MathUtils.lerp(
        outerRef.current.rotation.y,
        targetY,
        0.04
      );
    }

    if (materialRef.current) {
      if (reducedMotion) {
        materialRef.current.opacity = 0.9;
        materialRef.current.size = BASE_POINT_SIZE;
      } else {
        const wave = (Math.sin(state.clock.elapsedTime * 0.5) + 1) / 2;
        materialRef.current.opacity = 0.45 + wave * 0.55;
        materialRef.current.size = BASE_POINT_SIZE * (0.75 + wave * 0.5);
      }
    }
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={ACCENT_LINE}
            transparent
            opacity={0.34}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[pointPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            ref={materialRef}
            color={ACCENT_POINT}
            size={BASE_POINT_SIZE}
            sizeAttenuation
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {!reducedMotion && <Comets edges={edgeList} />}
      </group>
    </group>
  );
}

export default function NodeNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <Constellation />
    </Canvas>
  );
}