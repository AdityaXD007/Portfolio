import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import Laptop from './Laptop';

// =========================================================================
// CONFIGURABLE TWEAK CONSTANTS
// =========================================================================

// Scroll timeline phase boundaries (must sum up sequentially from 0 to 1)
const SCROLL_TIMELINE = {
  LID_OPEN_START: 0.0,
  LID_OPEN_END: 0.35,     // 0.0 - 0.35: Lid opens from 0 deg to max angle
  DOLLY_START: 0.35,
  DOLLY_END: 0.70,        // 0.35 - 0.70: Camera dollies in to frame the screen
  INTERACTIVE_START: 0.70,// 0.70 - 1.00: Screen interactive & cards scroll
  INTERACTIVE_END: 1.0,
};

// Lid angle settings
const LID_CONFIG = {
  CLOSED_RAD: 0.0,                    // 0 deg (flat closed)
  OPEN_RAD: (105 * Math.PI) / 180,     // 105 deg open (~1.8326 radians)
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
};

export interface LaptopSceneProps {
  progressRef: React.MutableRefObject<number>;
  manualLidAngle?: number | null;
  children?: React.ReactNode;
}

export const LaptopScene: React.FC<LaptopSceneProps> = ({
  progressRef,
  manualLidAngle = null,
  children,
}) => {
  const { camera } = useThree();

  // Smoothed runtime state refs (avoid React re-renders in 60fps loop)
  const currentLidAngle = useRef<number>(0);
  const currentCamPos = useRef<THREE.Vector3>(CAMERA_CONFIG.START_POS.clone());
  const currentCamTarget = useRef<THREE.Vector3>(CAMERA_CONFIG.START_TARGET.clone());

  // Reusable vectors to avoid memory allocation every frame
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const targetCamTarget = useRef<THREE.Vector3>(new THREE.Vector3());

  // Ref to directly drive the laptop lid mesh rotation without re-rendering Laptop
  const laptopLidAngleRef = useRef<number>(0);

  useFrame((_, delta) => {
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

    // 2. Calculate Target Camera Position and Target
    if (manualLidAngle !== null && manualLidAngle !== undefined) {
      // In manual slider mode, keep comfortable overview
      targetCamPos.current.copy(CAMERA_CONFIG.START_POS);
      targetCamTarget.current.copy(CAMERA_CONFIG.START_TARGET);
    } else if (p <= SCROLL_TIMELINE.LID_OPEN_END) {
      // Phase 1: Subtle camera ease while lid opens
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
      // Smooth step easing
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

    // Apply damping to camera position
    currentCamPos.current.x = THREE.MathUtils.damp(
      currentCamPos.current.x,
      targetCamPos.current.x,
      CAMERA_CONFIG.CAMERA_DAMPING_SPEED,
      delta
    );
    currentCamPos.current.y = THREE.MathUtils.damp(
      currentCamPos.current.y,
      targetCamPos.current.y,
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
      targetCamTarget.current.x,
      CAMERA_CONFIG.CAMERA_DAMPING_SPEED,
      delta
    );
    currentCamTarget.current.y = THREE.MathUtils.damp(
      currentCamTarget.current.y,
      targetCamTarget.current.y,
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
      <Laptop lidAngleRef={laptopLidAngleRef}>
        {children}
      </Laptop>
    </>
  );
};

export default LaptopScene;
