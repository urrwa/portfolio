/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';

interface PencilHoverTextProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
  strokeColor?: string;
  smudgeColor?: string;
  underlineHeight?: number;
}

export default function PencilHoverText({
  children,
  className = '',
  active = false,
  strokeColor = '#4f46e5', // Primary Indigo
  smudgeColor = 'rgba(28, 25, 23, 0.15)', // Graphite charcoal dust
  underlineHeight = 8,
}: PencilHoverTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isDrawn = isHovered || active;

  return (
    <span
      className={`relative inline-block cursor-none select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Actual Content */}
      <span className="relative z-10">{children}</span>

      {/* Hand-drawn Underline & Graphite Smudge SVG */}
      <svg
        className="absolute left-0 w-full overflow-visible pointer-events-none"
        style={{ bottom: `-${underlineHeight - 2}px`, height: `${underlineHeight}px` }}
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        {/* Layer 1: Blurred Graphite Smudge */}
        <motion.path
          d="M 2,5 Q 32,3 64,7 T 98,4"
          fill="none"
          stroke={smudgeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          style={{ filter: 'blur(1.2px)' }}
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={isDrawn ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.7 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        />

        {/* Layer 2: Colored Pencil Stroke (drawn dynamically) */}
        <motion.path
          d="M 1,4 C 28,1.5 68,5.5 99,3"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isDrawn ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
        />

        {/* Layer 3: Extra shaky graphite scribble overlay (for added realistic texture) */}
        <motion.path
          d="M 3,6 Q 35,4.2 68,5.8 T 97,5"
          fill="none"
          stroke="rgba(68, 64, 60, 0.2)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isDrawn ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.42, delay: 0.05, ease: 'linear' }}
        />

        {/* Layer 4: Tracking Pencil Tip Drawing the underline */}
        {isDrawn && (
          <motion.g
            initial={{ x: '0%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
            className="origin-bottom-left"
            style={{ transformBox: 'fill-box' }}
          >
            {/* Draw a tiny stylized drafting pencil */}
            <g transform="translate(-3, -5) scale(0.32)">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-indigo-600 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="#FACC15" />
              </svg>
            </g>
          </motion.g>
        )}
      </svg>
    </span>
  );
}
