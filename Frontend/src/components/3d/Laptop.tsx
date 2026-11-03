import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export interface LaptopProps {
  /** Lid angle in radians: 0 is fully closed, ~1.83 rad (~105 deg) is fully open */
  lidAngle?: number;
  /** Optional mutable ref for 60fps frame-driven lid angle */
  lidAngleRef?: React.MutableRefObject<number>;
  /** Optional custom GLTF model path in /public */
  modelUrl?: string;
  /** Children to render on the laptop screen (e.g. Drei Html transform) */
  children?: React.ReactNode;
  /** Screen mesh ref callback or ref for positioning */
  screenRef?: React.Ref<THREE.Mesh>;
}

// -------------------------------------------------------------
// Procedural Laptop Placeholder
// -------------------------------------------------------------
// Base dimensions: 3.2 width, 0.08 height, 2.2 depth
// Hinge edge sits at z = -1.1, y = 0.04
// Lid rotates around X-axis from 0 (closed) to ~105 deg (open)
// -------------------------------------------------------------

export const ProceduralLaptop: React.FC<LaptopProps> = ({
  lidAngle = 0,
  lidAngleRef,
  children,
  screenRef,
}) => {
  const hingeGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (hingeGroupRef.current) {
      const angle = lidAngleRef ? lidAngleRef.current : lidAngle;
      hingeGroupRef.current.rotation.x = -angle;
    }
  });

  // Chassis materials
  const chassisMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1e2025',
        metalness: 0.8,
        roughness: 0.25,
      }),
    []
  );

  const keyboardWellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#121316',
        metalness: 0.4,
        roughness: 0.6,
      }),
    []
  );

  const keyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1b1f',
        metalness: 0.2,
        roughness: 0.7,
      }),
    []
  );

  const trackpadMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#262930',
        metalness: 0.5,
        roughness: 0.35,
      }),
    []
  );

  const bezelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0c0d10',
        metalness: 0.3,
        roughness: 0.8,
      }),
    []
  );

  const screenSurfaceMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#030407',
        metalness: 0.1,
        roughness: 0.2,
      }),
    []
  );

  // Key rows layout
  const keyRows = useMemo(() => {
    const rows = [];
    const rowCounts = [14, 14, 13, 12, 9];
    const rowY = 0.045;
    const startZ = -0.92;
    const zStep = 0.18;

    for (let r = 0; r < rowCounts.length; r++) {
      const count = rowCounts[r];
      const z = startZ + r * zStep;
      const totalWidth = 2.7;
      const keyW = (totalWidth - (count - 1) * 0.03) / count;

      for (let c = 0; c < count; c++) {
        const x = -totalWidth / 2 + keyW / 2 + c * (keyW + 0.03);
        rows.push({
          pos: [x, rowY, z] as [number, number, number],
          size: [keyW, 0.012, 0.14] as [number, number, number],
        });
      }
    }
    return rows;
  }, []);

  return (
    <group position={[0, -0.4, 0]}>
      {/* ================= BASE / CHASSIS ================= */}
      <group position={[0, 0, 0]}>
        {/* Main lower chassis body */}
        <mesh
          position={[0, 0, 0]}
          material={chassisMaterial}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[3.2, 0.08, 2.2]} />
        </mesh>

        {/* Front thumb notch to open lid */}
        <mesh position={[0, 0.03, 1.101]} material={bezelMaterial}>
          <boxGeometry args={[0.5, 0.025, 0.02]} />
        </mesh>

        {/* Keyboard well recess */}
        <mesh position={[0, 0.041, -0.45]} material={keyboardWellMaterial}>
          <boxGeometry args={[2.8, 0.005, 1.15]} />
        </mesh>

        {/* Keys grid */}
        {keyRows.map((key, i) => (
          <mesh
            key={i}
            position={key.pos}
            material={keyMaterial}
            castShadow
          >
            <boxGeometry args={key.size} />
          </mesh>
        ))}

        {/* Trackpad */}
        <mesh position={[0, 0.042, 0.52]} material={trackpadMaterial}>
          <boxGeometry args={[1.1, 0.004, 0.72]} />
        </mesh>

        {/* Underbody rubber feet */}
        {[
          [-1.4, -0.043, -0.9],
          [1.4, -0.043, -0.9],
          [-1.4, -0.043, 0.9],
          [1.4, -0.043, 0.9],
        ].map((pos, i) => (
          <mesh
            key={i}
            position={pos as [number, number, number]}
            material={bezelMaterial}
          >
            <cylinderGeometry args={[0.06, 0.06, 0.01, 16]} />
          </mesh>
        ))}
      </group>

      {/* ================= HINGE & ROTATING LID ================= */}
      {/*
        Hinge pivot edge: sits at back edge of base (z = -1.1, y = 0.04)
        Rotation around X:
          0 rad = closed (lid lying flat over base)
          1.8326 rad (~105 deg) = open tilted back 15 deg past 90 deg
      */}
      <group
        ref={hingeGroupRef}
        position={[0, 0.04, -1.1]}
        rotation={[-lidAngle, 0, 0]}
      >
        {/* Hinge cylinder */}
        <mesh
          position={[0, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          material={chassisMaterial}
        >
          <cylinderGeometry args={[0.032, 0.032, 2.9, 24]} />
        </mesh>

        {/* Lid chassis & screen extending forward from hinge when closed */}
        <group position={[0, 0.02, 1.1]}>
          {/* Backplate of the lid (outer lid casing) */}
          <mesh
            position={[0, 0.01, 0]}
            material={chassisMaterial}
            castShadow
          >
            <boxGeometry args={[3.2, 0.04, 2.2]} />
          </mesh>

          {/* Inner bezel framing the screen */}
          <mesh position={[0, -0.011, 0]} material={bezelMaterial}>
            <boxGeometry args={[3.16, 0.004, 2.16]} />
          </mesh>

          {/* Webcam dot on top bezel */}
          <mesh position={[0, -0.012, 1.02]} material={chassisMaterial}>
            <cylinderGeometry args={[0.012, 0.012, 0.004, 16]} />
          </mesh>

          {/*
            Screen mesh (inner display face):
            When lid is open (rotated up), this face faces the camera.
            Dimensions: 2.9 width x 1.85 height (~16:10 display)
          */}
          <mesh
            ref={screenRef}
            position={[0, -0.014, -0.04]}
            rotation={[Math.PI / 2, 0, 0]}
            material={screenSurfaceMaterial}
          >
            <planeGeometry args={[2.9, 1.85]} />
            {children}
          </mesh>
        </group>
      </group>
    </group>
  );
};

// -------------------------------------------------------------
// GLTF Model Component (Loaded if /models/laptop.glb exists)
// -------------------------------------------------------------
interface GLTFLaptopProps extends LaptopProps {
  url: string;
}

const GLTFModelLaptop: React.FC<GLTFLaptopProps> = ({
  url,
  lidAngle = 0,
  lidAngleRef,
  children,
  screenRef,
}) => {
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const lidGroupRef = useRef<THREE.Object3D | null>(null);

  // Search for lid / screen / hinge nodes in the GLTF tree
  useEffect(() => {
    clonedScene.traverse((child) => {
      const lower = child.name.toLowerCase();
      if (
        lower.includes('lid') ||
        lower.includes('screen') ||
        lower.includes('display') ||
        lower.includes('top')
      ) {
        if (!lidGroupRef.current) {
          lidGroupRef.current = child;
        }
      }
    });
  }, [clonedScene]);

  // Apply lidAngle to detected lid node smoothly
  useFrame(() => {
    if (lidGroupRef.current) {
      const angle = lidAngleRef ? lidAngleRef.current : lidAngle;
      lidGroupRef.current.rotation.x = -angle;
    }
  });

  return (
    <primitive object={clonedScene}>
      <mesh ref={screenRef} visible={false}>
        {children}
      </mesh>
    </primitive>
  );
};

// -------------------------------------------------------------
// Unified <Laptop /> component: supports GLTF or Procedural
// -------------------------------------------------------------
export const Laptop: React.FC<LaptopProps> = (props) => {
  const { modelUrl = '/models/laptop.glb' } = props;
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the GLTF model exists at modelUrl
    const controller = new AbortController();
    fetch(modelUrl, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        // In Vite dev, missing files might return index.html (200 with text/html)
        if (res.ok && !contentType.includes('text/html')) {
          setModelAvailable(true);
        } else {
          setModelAvailable(false);
        }
      })
      .catch(() => {
        setModelAvailable(false);
      });

    return () => controller.abort();
  }, [modelUrl]);

  if (modelAvailable === true) {
    return <GLTFModelLaptop {...props} url={modelUrl} />;
  }

  // Default to procedural placeholder laptop
  return <ProceduralLaptop {...props} />;
};

export default Laptop;
