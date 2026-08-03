/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  
  const particlesRef = useRef<Particle[]>([]);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      setIsTouch(hasTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mousePosRef.current.x;
      const dy = e.clientY - mousePosRef.current.y;
      
      // Calculate responsive tilt angle based on horizontal mouse movement speed (dx)
      // Clamped to avoid excessive/distracting spinning
      const speedRotation = Math.min(Math.max(dx * 1.6, -30), 30);
      targetAngleRef.current = speedRotation;

      mousePosRef.current = { x: e.clientX, y: e.clientY };

      // Check if cursor is hovering interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.classList.contains('interactive-obj');

      isHoveringRef.current = !!isInteractive;
      setIsHovering(!!isInteractive);

      // Add a couple of graphite particles on movement
      if (canvasRef.current) {
        const colors = ['#1c1c1c', '#7e7e7e', '#a7a7a7', '#d7d7d7'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < (isInteractive ? 3 : 1); i++) {
          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5, // drift slightly up
            alpha: 1.0,
            size: Math.random() * 1.8 + 0.6,
            color: isInteractive ? '#6366f1' : randomColor, // Glow color if hovering
          });
        }
      }
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
    };
    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Render loop for canvas particles & smooth pencil angle update
    const canvas = canvasRef.current;
    let animFrameId: number;

    const render = () => {
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const particles = particlesRef.current;
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.025; // fade out

            if (p.alpha <= 0) {
              particles.splice(i, 1);
              continue;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      // Smoothly interpolate pencil angle
      const targetAngle = targetAngleRef.current;
      currentAngleRef.current += (targetAngle - currentAngleRef.current) * 0.16; // Smooth spring-like easing
      
      // Decay targetAngle back to zero (so the pencil straightens when stopped)
      targetAngleRef.current *= 0.88;

      if (cursorRef.current) {
        const isHover = isHoveringRef.current;
        const isPress = isMouseDownRef.current;
        
        // Hover adds extra rotation tilt to feel like a "ready to draw" stance
        const hoverAngle = isHover ? -18 : 0;
        const finalAngle = hoverAngle + currentAngleRef.current;
        const scale = isHover ? 1.25 : 1.0;
        const pressTranslate = isPress ? 'translate3d(-2px, 2px, 0)' : 'translate3d(0, 0, 0)';

        // Update main container translation
        cursorRef.current.style.transform = `translate3d(${mousePosRef.current.x}px, ${mousePosRef.current.y}px, 0)`;
        
        // Update rotation on SVG element directly
        const svg = cursorRef.current.querySelector('svg');
        if (svg) {
          svg.style.transform = `scale(${scale}) rotate(${finalAngle}deg) ${pressTranslate}`;
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkTouch);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (isTouch) {
    return null; // Disable cursor trails and overrides on mobile/touch screens
  }

  return (
    <>
      {/* Absolute particle background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      />

      {/* Pencil cursor asset wrapper */}
      <div
        ref={cursorRef}
        style={{
          transform: `translate3d(-100px, -100px, 0)`,
          left: -4,
          top: -24,
        }}
        className="fixed pointer-events-none z-[100] select-none"
      >
        <svg
          className="w-10 h-10 origin-bottom-left text-neutral-800 filter drop-shadow-[2px_3px_2px_rgba(0,0,0,0.15)] transition-shadow duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {/* Eraser Band (silver/gold) */}
          <path d="M17 4 L19.5 6.5" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Eraser (pink) */}
          <path d="M18.5 2 L21 4.5" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Yellow Pencil Shaft */}
          <path d="M6 15 L17 4 L19.5 6.5 L8.5 17.5 Z" fill="#EAB308" stroke="currentColor" strokeWidth="1" />
          {/* Shaft lines */}
          <line x1="8.5" y1="12.5" x2="14.5" y2="6.5" stroke="#CA8A04" strokeWidth="0.8" />
          
          {/* Wood tip cone (sharpened wood section) */}
          <polygon points="6,15 3,18 8.5,17.5" fill="#FDE047" stroke="currentColor" strokeWidth="1" />
          
          {/* Graphite lead point */}
          <polygon points="4,17 3,18 5,19" fill="#1C1917" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Active indicator dot when hovering */}
          {isHovering && (
            <circle cx="2.5" cy="18.5" r="1.5" className="fill-indigo-500 stroke-none animate-ping" />
          )}
        </svg>
      </div>

      {/* Global CSS overrides to hide standard browser cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        iframe, #sound-toggle-btn {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
