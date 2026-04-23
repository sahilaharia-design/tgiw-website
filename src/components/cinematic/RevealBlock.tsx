import { useRef } from 'react';
import { motion, useInView, type MotionProps, useReducedMotion } from 'framer-motion';

interface RevealBlockProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  /** Use spring physics (default) vs duration-based tween */
  spring?: boolean;
}

/**
 * Shared scroll-triggered reveal used across all landing sections.
 *
 * Physics:
 *   - Spring: damping 28 / stiffness 90 / mass 0.8
 *     → natural ease-out with faint physical weight, matches ceremonial pacing
 *   - Tween fallback: 1.2s cubic-bezier(0.22,1,0.36,1) for elements where
 *     spring overshoot would be inappropriate (e.g. rule lines)
 *
 * Accessibility:
 *   - Respects prefers-reduced-motion: skips straight to visible state
 */
export default function RevealBlock({
  children,
  delay = 0,
  className = '',
  y = 28,
  spring = true,
  ...rest
}: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const prefersReduced = useReducedMotion();

  // When reduced motion is preferred, skip animation entirely
  if (prefersReduced) {
    return <div className={className} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  const transition = spring
    ? {
        type: 'spring' as const,
        damping: 28,
        stiffness: 90,
        mass: 0.8,
        delay,
      }
    : {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay,
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
