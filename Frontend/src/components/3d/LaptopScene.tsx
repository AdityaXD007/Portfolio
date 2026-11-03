import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import Laptop from './Laptop';
import ScreenContent from './ScreenContent';
import Mountains from './Mountains';

// =========================================================================
// CONFIGURABLE TWEAK CONSTANTS
// =========================================================================

// Scroll timeline phase boundaries (must sum up sequentially from 0 to 1)
const SCROLL_TIMELINE = {
  LID_OPEN_START: 0.0,
  LID_OPEN_END: 0.35,      // 0.00 - 0.35: Lid opens from 0 deg to max angle
  DOLLY_START: 0.35,
  DOLLY_END: 0.70,         // 0.35 - 0.70: Camera dollies in to frame the screen
  INTERACTIVE_START: 0.70, // 0.70 - 1.00: Screen interactive & cards scroll
  INTERACTIVE_END: 1.0,
};

// Lid angle settings
const LID_CONFIG = {
  CLOSED_RAD: 0.0,                    // 0 deg (flat closed)
  OPEN_RAD: (105 * Math.PI) / 180,    // 105 deg open (~1.8326 radians)
  DAMPING_SPEED: 12,                  // Higher = snappier, lower = smoother
};

// Camera trajectory positions [X, Y, Z]
const CAMERA_CONFIG = {
  // Initial overview when laptop is closed
  START_POS: new THREE.Vector3(0, 1.8, 4.2),
  START_TARGET: new THREE.Vector3(0, 0.0, 0.2),

  // Midpoint when lid is fully opened (before close-up dolly)
  LID_OPEN_POS: new THREE.Vector3(0, 1.4, 3.8),
  LID_OPEN_TARGET: new THREE.Vector3(0, 0.3, 0.0),

  // Close dolly-in so the 2.9x1.85 laptop screen fills ~85% of the viewport
  END_POS: new THREE.Vector3(0, 1.22, 1.18),
  END_TARGET: new THREE.Vector3(0, 0.72, -0.78),

  CAMERA_DAMPING_SPEED: 10,
  PARALLAX_STRENGTH_X: 0.12,
  PARALLAX_STRENGTH_Y: 0.08,
};

export interface LaptopSceneProps {
  progressRef: React.MutableRefObject<number>;
  manualLidAngle?: number | null;
  onDprChange?: (newDpr: number) => void;
  children?: React.ReactNode;
}

export const LaptopScene: React.FC<LaptopSceneProps> = ({
  progressRef,
  manualLidAngle = null,
  onDprChange,
  children,
}) => {
  const { camera } = useThree();

  // Smoothed runtime state refs (avoid React re-renders in 60fps loop)
  const currentLidAngle = useRef<number>(0);
  const currentCamPos = useRef<THREE.Vector3>(CAMERA_CONFIG.START_POS.clone());
  const currentCamTarget = useRef<THREE.Vector3>(CAMERA_CONFIG.START_TARGET.clone());

  // Parallax offsets
  const currentParallaxX = useRef<number>(0);
  const currentParallaxY = useRef<number>(0);

  // Soft screen glow point light ref
  const screenGlowRef = useRef<THREE.PointLight>(null);

  // Reusable vectors to avoid garbage collection allocations every frame
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetCamTarget = useRef<THREE.Vector3>(new THREE.Vector3());

  // Ref to directly drive the laptop lid mesh rotation without re-rendering Laptop
  const laptopLidAngleRef = useRef<number>(0);

  useFrame((state, delta) => {
    const rawProgress = progressRef.current;
    // Clamp progress safely to [0, 1]
    const p = Math.max(0, Math.min(1, rawProgress));

    // 1. Calculate Target Lid Angle
    let desiredLidAngle: number;
    if (manualLidAngle !== null && manualLidAngle !== undefined) {
      desiredLidAngle = manualLidAngle;
    } else if (p <= SCROLL_TIMELINE.LID_OPEN_END) {
      const tLid = (p - SCROLL_TIMELINE.LID_OPEN_START) /
        (SCROLL_TIMELINE.LID_OPEN_END - SCROLL_TIMELINE.LID_OPEN_START);
      desiredLidAngle = tLid * LID_CONFIG.OPEN_RAD;
    } else {
      desiredLidAngle = LID_CONFIG.OPEN_RAD;
    }

    // Smooth lid angle with damping
    currentLidAngle.current = THREE.MathUtils.damp(
      currentLidAngle.current,
      desiredLidAngle,
      LID_CONFIG.DAMPING_SPEED,
      delta
    );
    laptopLidAngleRef.current = currentLidAngle.current;

    // Fade screen glow pointLight as lid opens (0 intensity when closed)
    if (screenGlowRef.current) {
      const openRatio = Math.max(0, Math.min(1, currentLidAngle.current / LID_CONFIG.OPEN_RAD));
      screenGlowRef.current.intensity = Math.pow(openRatio, 2) * 2.8;
    }

    // 2. Calculate Base Camera Position and Target
    if (manualLidAngle !== null && manualLidAngle !== undefined) {
      targetCamPos.current.copy(CAMERA_CONFIG.START_POS);
      targetCamTarget.current.copy(CAMERA_CONFIG.START_TARGET);
    } else if (p <= SCROLL_TIMELINE.LID_OPEN_END) {
      // Phase 1: Overview ease while lid opens
      const tLid = p / SCROLL_TIMELINE.LID_OPEN_END;
      targetCamPos.current.lerpVectors(
        CAMERA_CONFIG.START_POS,
        CAMERA_CONFIG.LID_OPEN_POS,
        tLid
      );
      targetCamTarget.current.lerpVectors(
        CAMERA_CONFIG.START_TARGET,
        CAMERA_CONFIG.LID_OPEN_TARGET,
        tLid
      );
    } else if (p <= SCROLL_TIMELINE.DOLLY_END) {
      // Phase 2: Dolly in toward the laptop screen
      const tDolly = (p - SCROLL_TIMELINE.DOLLY_START) /
        (SCROLL_TIMELINE.DOLLY_END - SCROLL_TIMELINE.DOLLY_START);
      const easedDolly = THREE.MathUtils.smoothstep(tDolly, 0, 1);
      targetCamPos.current.lerpVectors(
        CAMERA_CONFIG.LID_OPEN_POS,
        CAMERA_CONFIG.END_POS,
        easedDolly
      );
      targetCamTarget.current.lerpVectors(
        CAMERA_CONFIG.LID_OPEN_TARGET,
        CAMERA_CONFIG.END_TARGET,
        easedDolly
      );
    } else {
      // Phase 3: Screen is fully framed and ready for interaction
      targetCamPos.current.copy(CAMERA_CONFIG.END_POS);
      targetCamTarget.current.copy(CAMERA_CONFIG.END_TARGET);
    }

    // 3. Cursor Parallax Calculation
    // Disabled while the lid is moving (progress <= 0.35) and on touch devices
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const isLidMoving = p < SCROLL_TIMELINE.LID_OPEN_END && manualLidAngle === null;

    let targetPx = 0;
    let targetPy = 0;
    if (!isTouchDevice && !isLidMoving) {
      targetPx = state.pointer.x * CAMERA_CONFIG.PARALLAX_STRENGTH_X;
      targetPy = state.pointer.y * CAMERA_CONFIG.PARALLAX_STRENGTH_Y;
    }

    currentParallaxX.current = THREE.MathUtils.damp(
      currentParallaxX.current,
      targetPx,
      6,
      delta
    );
    currentParallaxY.current = THREE.MathUtils.damp(
      currentParallaxY.current,
      targetPy,
      6,
      delta
    );

    // Apply damping to camera position
    currentCamPos.current.x = THREE.MathUtils.damp(
      currentCamPos.current.x,
      targetCamPos.current.x + currentParallaxX.current,
      CAMERA_CONFIG.CAMERA_DAMPING_SPEED,
      delta
    );
    currentCamPos.current.y = THREE.MathUtils.damp(
      currentCamPos.current.y,
      targetCamPos.current.y + currentParallaxY.current,
      CAMERA_CONFIG.CAMERA_DAMPING_SPEED,
      delta
    );
    currentCamPos.current.z = THREE.MathUtils.damp(
      currentCamPos.current.z,
      targetCamPos.current.z,
      CAMERA_CONFIG.CAMERA_DAMPING_SPEED,
      delta
    );

    // Apply damping to camera target lookAt
    currentCamTarget.current.x = THREE.MathUtils.damp(
      currentCamTarget.current.x,
      targetCamTarget.current.x + currentParallaxX.current * 0.5,
      CAMERA_CONFIG.CAMERA_DAMPING_SPEED,
      delta
    );
    currentCamTarget.current.y = THREE.MathUtils.damp(
      currentCamTarget.current.y,
      targetCamTarget.current.y + currentParallaxY.current * 0.5,
      CAMERA_CONFIG.CAMERA_DAMPING_SPEED,
      delta
    );
    currentCamTarget.current.z = THREE.MathUtils.damp(
      currentCamTarget.current.z,
      targetCamTarget.current.z,
      CAMERA_CONFIG.CAMERA_DAMPING_SPEED,
      delta
    );

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentCamTarget.current);
  });

  return (
    <>
      {/* Dynamic DPR performance monitor to maintain steady 60fps */}
      {onDprChange && (
        <PerformanceMonitor
          onDecline={() => onDprChange(1)}
          onIncline={() => onDprChange(Math.min(window.devicePixelRatio || 1.5, 2))}
        />
      )}

      {/* Background Low-Poly Mountain Silhouette */}
      <Mountains />

      {/* Simple lighting: Ambient + Key Directional */}
      <ambientLight intensity={0.5} color="#e2e8f0" />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />
      {/* Subtle rim backlight */}
      <directionalLight
        position={[-4, 3, -4]}
        intensity={0.4}
        color="#818cf8"
      />

      {/* Soft screen glow: fades in as the lid opens */}
      <pointLight
        ref={screenGlowRef}
        position={[0, 0.72, -0.6]}
        color="#60a5fa"
        distance={3.5}
        decay={2}
        intensity={0}
      />

      {/* Main Laptop with screen content */}
      <Laptop lidAngleRef={laptopLidAngleRef}>
        <ScreenContent
          progressRef={progressRef}
          manualActive={manualLidAngle !== null && manualLidAngle !== undefined}
        />
        {children}
      </Laptop>
    </>
  );
};

export default LaptopScene;
