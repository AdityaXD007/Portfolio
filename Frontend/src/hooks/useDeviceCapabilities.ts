import { useState, useEffect } from 'react';

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

export interface DeviceCapabilities {
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  webGLAvailable: boolean;
  isSmallScreen: boolean;
  shouldFallbackTo2D: boolean;
  reason?: string;
}

function checkCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      isLowEnd: false,
      prefersReducedMotion: false,
      webGLAvailable: true,
      isSmallScreen: false,
      shouldFallbackTo2D: false,
    };
  }

  // 1. Reduced motion preference check
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = motionQuery.matches;

  // 2. WebGL support check
  let webGLAvailable: boolean;
  try {
    const canvas = document.createElement('canvas');
    webGLAvailable = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    webGLAvailable = false;
  }

  // 3. Small screen check (mobile devices under 768px)
  const isSmallScreen = window.innerWidth < 768;

  // 4. Low-end device heuristic (hardware concurrency <= 4 or device memory <= 2GB)
  const nav = navigator as NavigatorWithMemory;
  const cpuCores = nav.hardwareConcurrency || 8;
  const ramGB = nav.deviceMemory || 8;
  const isLowEnd = cpuCores <= 4 || ramGB <= 2;

  let shouldFallbackTo2D = false;
  let reason = '';

  if (!webGLAvailable) {
    shouldFallbackTo2D = true;
    reason = 'WebGL graphics acceleration is unavailable in your browser.';
  } else if (prefersReducedMotion) {
    shouldFallbackTo2D = true;
    reason = 'Prefers-reduced-motion accessibility preference is enabled.';
  } else if (isLowEnd && isSmallScreen) {
    shouldFallbackTo2D = true;
    reason = 'Optimized 2D view loaded for low-power mobile hardware.';
  }

  return {
    isLowEnd,
    prefersReducedMotion,
    webGLAvailable,
    isSmallScreen,
    shouldFallbackTo2D,
    reason,
  };
}

/**
 * Checks device capabilities, WebGL support, and user accessibility preferences.
 * Determines whether to display the 3D canvas or gracefully fallback to 2D ProjectsList.
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(checkCapabilities);

  useEffect(() => {
    const handleResize = () => {
      setCapabilities(checkCapabilities());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capabilities;
}

export default useDeviceCapabilities;
