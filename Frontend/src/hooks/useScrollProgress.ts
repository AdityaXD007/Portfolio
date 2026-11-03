import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseScrollProgressReturn {
  /** Mutable ref containing current scroll progress (0.0 to 1.0).
   *  Read inside useFrame without triggering React component re-renders. */
  progressRef: React.MutableRefObject<number>;
}

/**
 * useScrollProgress:
 * Tracks scroll progress within a tall container using GSAP ScrollTrigger with scrub.
 * Writes to a ref for 60fps R3F useFrame animation without React state overhead.
 */
export function useScrollProgress(
  containerRef: React.RefObject<HTMLElement | null>
): UseScrollProgressReturn {
  const progressRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Ensure ScrollTrigger measures fresh layout
    ScrollTrigger.refresh();

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6, // Smooth scrub response
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [containerRef]);

  return { progressRef };
}

export default useScrollProgress;
