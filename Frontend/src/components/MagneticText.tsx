import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../lib/utils';

/* ============================================================================
 * PERFORMANCE & ARCHITECTURE TRADEOFF NOTE:
 * ============================================================================
 * We use per-element motion values (`useMotionValue` + `useSpring`) paired with
 * a light window `mousemove` listener.
 *
 * TRADEOFF ANALYSIS:
 * 1. Per-Element Window Tracking (Chosen approach):
 *    - PROS: 100% modular and decoupled. `MagneticText` works as a standalone primitive 
 *      anywhere in the UI without requiring a parent section/container context or ref wiring.
 *    - PROS: Zero React state re-renders during mouse movements. Framer Motion's `useMotionValue`
 *      updates DOM transform properties directly via animation frame, preserving 60/120fps UI performance.
 *    - TRADEOFF: When rendering a large number of letters simultaneously (e.g. >100 letters),
 *      multiple mousemove callbacks execute.
 *
 * 2. Section/Container Context Delegation (Alternative):
 *    - PROS: Single window/container mousemove listener computes distances for all child items at once.
 *    - TRADEOFF: Requires wrapping sections in a provider/context or passing parent refs down,
 *      adding API friction and tight coupling for single word/button usage.
 *
 * The standalone approach with `useMotionValue` provides the ideal developer experience (DX) 
 * and 60fps performance for hero headings and interactive text elements.
 * ============================================================================
 */

export interface MagneticTextProps {
  /** The text or element content to be wrapped and magnetically pulled. */
  children: React.ReactNode;
  /** Strength factor (0 to 1) determining how far the element moves toward the cursor. Default: 0.4 */
  strength?: number;
  /** Distance in px from the element's edge at which magnetic pull activates. Default: 100 */
  radius?: number;
  /** Optional CSS class name for styling. */
  className?: string;
  /** Optional inline styles. */
  style?: React.CSSProperties;
}

export const MagneticText: React.FC<MagneticTextProps> = ({
  children,
  strength = 0.4,
  radius = 100,
  className,
  style,
}) => {
  'use no memo';
  const ref = useRef<HTMLSpanElement>(null);

  // Motion values for smooth non-re-rendering transforms
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics-based spring config for a natural snap-back bounce: stiffness ~150, damping ~12, mass ~0.1
  const springConfig = { stiffness: 150, damping: 12, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Current animated offset from spring values
      const currentSpringX = springX.get();
      const currentSpringY = springY.get();

      // Compute original untransformed center to eliminate feedback loop oscillations
      const origCenterX = rect.left + rect.width / 2 - currentSpringX;
      const origCenterY = rect.top + rect.height / 2 - currentSpringY;

      // Distance from mouse to untransformed element center
      const distX = mouseX - origCenterX;
      const distY = mouseY - origCenterY;
      const distanceFromCenter = Math.hypot(distX, distY);

      // Total activation radius = element radius + specified magnetic pull radius
      const elementRadius = Math.max(rect.width, rect.height) / 2;
      const activeRadius = elementRadius + radius;

      if (distanceFromCenter <= activeRadius) {
        // Move a fraction (strength) of distance toward cursor
        x.set(distX * strength);
        y.set(distY * strength);
      } else {
        // Snap back to origin when cursor is outside active radius
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [radius, strength, x, y, springX, springY]);

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block', className)}
      style={{
        x: springX,
        y: springY,
        ...style,
      }}
    >
      {children}
    </motion.span>
  );
};

export interface MagneticHeadingProps {
  /** Full heading text string to split and animate. */
  children: string;
  /** How to split text: 'word' (default) or 'letter'. */
  splitBy?: 'word' | 'letter';
  /** Strength factor (0 to 1) for each magnetic item. Default: 0.4 */
  strength?: number;
  /** Distance in px around each item for magnetic activation. Default: 100 */
  radius?: number;
  /** HTML tag for heading element. Default: 'h2' */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
  /** Optional class name for outer container. */
  className?: string;
  /** Optional class name applied to individual words/letters. */
  itemClassName?: string;
  /** Optional inline styles for outer container. */
  style?: React.CSSProperties;
}

export const MagneticHeading: React.FC<MagneticHeadingProps> = ({
  children,
  splitBy = 'word',
  strength = 0.4,
  radius = 100,
  as: Component = 'h2',
  className,
  itemClassName,
  style,
}) => {
  const words = children.split(' ');

  return (
    <Component className={className} style={style}>
      {splitBy === 'word' ? (
        words.map((word, index) => (
          <React.Fragment key={index}>
            <MagneticText strength={strength} radius={radius} className={itemClassName}>
              {word}
            </MagneticText>
            {index < words.length - 1 && ' '}
          </React.Fragment>
        ))
      ) : (
        words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((letter, letterIndex) => (
                <MagneticText
                  key={letterIndex}
                  strength={strength}
                  radius={radius}
                  className={itemClassName}
                >
                  {letter}
                </MagneticText>
              ))}
            </span>
            {wordIndex < words.length - 1 && ' '}
          </React.Fragment>
        ))
      )}
    </Component>
  );
};

/* ============================================================================
 * USAGE EXAMPLE:
 * ============================================================================
 *
 * Import in your component (e.g. Hero.tsx):
 * 
 * import { MagneticText, MagneticHeading } from './MagneticText';
 * 
 * 1. Word-level magnetic heading in a Hero section:
 * 
 * <MagneticHeading 
 *   as="h1" 
 *   splitBy="word"
 *   strength={0.35} 
 *   radius={120}
 *   className="text-5xl font-bold tracking-tight text-white mb-4"
 *   itemClassName="hover:text-indigo-400 transition-colors"
 * >
 *   Building Digital Products & Experiences
 * </MagneticHeading>
 *
 * 2. Letter-level magnetic heading for high impact:
 * 
 * <MagneticHeading 
 *   as="h2" 
 *   splitBy="letter"
 *   strength={0.5} 
 *   radius={80}
 *   className="text-3xl font-extrabold text-slate-200"
 * >
 *   Aditya Karki
 * </MagneticHeading>
 * 
 * 3. Standalone Magnetic Text / Badge / Button:
 * 
 * <button className="px-6 py-3 bg-indigo-600 rounded-full text-white font-medium">
 *   <MagneticText strength={0.4} radius={100}>
 *     Hire Me
 *   </MagneticText>
 * </button>
 * ============================================================================
 */
