import { useRef } from 'react';
import { motion, useInView, type MotionProps } from 'framer-motion';

interface RevealBlockProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

/**
 * Shared scroll-triggered reveal used across all landing sections.
 * Matches the HTML design's 1.2s cubic-bezier(0.22,1,0.36,1) timing.
 */
export default function RevealBlock({ children, delay = 0, className = '', y = 28, ...rest }: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
