/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { useAudio } from './AudioEngine';
import { motion, AnimatePresence } from 'motion/react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'drawing' | 'tearing' | 'done'>('drawing');
  const { isMuted, toggleMute } = useAudio();

  // 1. Smooth Loading and Drawing Progress Simulation
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2200; // 2.2 seconds drawing time
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.round(progressPercent));

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setProgress(100);
        setStage('tearing');
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 2. High-Fidelity Local Sound Synthesizers (Web Audio API)
  const playLocalSketch = (ctx: AudioContext) => {
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.12; // 120ms pencil stroke
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(850 + Math.random() * 300, now);
    filter.Q.setValueAtTime(3.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  };

  const playLocalTear = (ctx: AudioContext) => {
    const now = ctx.currentTime;
    const duration = 0.95; // 950ms physical tearing rip

    // Continuous textured rustle noise
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(1100, now + duration);
    filter.Q.setValueAtTime(1.8, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.07, now + 0.12);

    // Ripple amplitude representing uneven paper fibers tearing
    for (let t = 0.12; t < duration; t += 0.04) {
      const jitter = 0.025 + Math.random() * 0.045;
      gain.gain.linearRampToValueAtTime(jitter, now + t);
    }
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    // Crisp individual popping fiber strands
    const popCount = 12;
    for (let i = 0; i < popCount; i++) {
      const popDelay = Math.random() * 0.75;
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();

      popOsc.type = 'triangle';
      popOsc.frequency.setValueAtTime(140 + Math.random() * 280, now + popDelay);
      popOsc.frequency.exponentialRampToValueAtTime(75, now + popDelay + 0.035);

      popGain.gain.setValueAtTime(0.018, now + popDelay);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + popDelay + 0.03);

      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start(now + popDelay);
      popOsc.stop(now + popDelay + 0.04);
    }
  };

  const playLocalNatureReveal = (ctx: AudioContext) => {
    const now = ctx.currentTime;

    // Bird chirps
    const chirpDelays = [0.05, 0.2, 1.0, 1.15];
    chirpDelays.forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1300 + Math.random() * 150, now + delay);
      osc.frequency.exponentialRampToValueAtTime(2900, now + delay + 0.035);
      osc.frequency.exponentialRampToValueAtTime(1900, now + delay + 0.07);

      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.006, now + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.08);
    });

    // Warm outdoor ambient breeze
    const bufferSize = ctx.sampleRate * 2.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const breeze = ctx.createBufferSource();
    breeze.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, now);
    filter.frequency.linearRampToValueAtTime(550, now + 1.1);
    filter.frequency.linearRampToValueAtTime(180, now + 2.2);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.016, now + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    breeze.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    breeze.start();
  };

  // 3. Audio Handlers & Loops
  useEffect(() => {
    if (stage !== 'drawing' || isMuted) return;

    // Pulse sketching sound periodically as pencil draws line
    const sketchInterval = setInterval(() => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          playLocalSketch(ctx);
        }
      } catch (e) {
        // Ignore or resume blocked context
      }
    }, 170);

    return () => clearInterval(sketchInterval);
  }, [stage, isMuted]);

  useEffect(() => {
    if (stage === 'tearing') {
      if (!isMuted) {
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            playLocalTear(ctx);

            setTimeout(() => {
              playLocalNatureReveal(ctx);
            }, 250);
          }
        } catch (e) {
          // Ignore
        }
      }

      // Slide-apart timing completes
      const completeTimer = setTimeout(() => {
        setStage('done');
        onComplete();
      }, 1600);

      return () => clearTimeout(completeTimer);
    }
  }, [stage, isMuted]);

  const handleScreenClick = () => {
    if (isMuted) {
      toggleMute();
    }
  };

  if (stage === 'done') return null;

  // 4. Calculate pencil tip position based on progress
  const getPencilCoordinates = (p: number) => {
    const y = p;
    const radians = (p / 100) * Math.PI * 6; // oscillating wobble path
    const wobble = Math.sin(radians) * 1.6;
    return { x: 50 + wobble, y };
  };

  const { x: pencilX, y: pencilY } = getPencilCoordinates(progress);

  const renderPaperHalf = (side: 'left' | 'right') => {
    return (
      <motion.div
        className="absolute inset-0 w-full h-full bg-[#FAF6EE] flex flex-col items-center justify-center pointer-events-auto"
        style={{
          clipPath: `url(#${side}-tear-clip)`,
          filter: side === 'left' 
            ? 'drop-shadow(8px 0 20px rgba(28,25,23,0.12))' 
            : 'drop-shadow(-8px 0 20px rgba(28,25,23,0.12))',
        }}
        animate={stage === 'tearing' ? {
          x: side === 'left' ? '-101%' : '101%',
          rotate: side === 'left' ? -3 : 3,
          transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
        } : { x: '0%', rotate: 0 }}
      >
        {/* Fine sketchbook felt paper grain pattern overlay */}
        <div className="absolute inset-0 bg-neutral-900/[0.015] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

        {/* Decorative hand-drawn notebook frame */}
        <div className="absolute inset-4 md:inset-8 border-2 border-dashed border-neutral-800/10 pointer-events-none rounded-lg" />

        {/* Content Wrapper - centered identically on both paper halves */}
        <div className="flex flex-col items-center justify-center text-center max-w-md px-6 select-none pointer-events-none">
          <h1 className="text-4xl md:text-5xl font-serif text-neutral-800 tracking-tight mb-2 sketch-text font-bold">
            The Sketch Dimension
          </h1>
          <p className="text-xs md:text-sm font-mono text-neutral-400 uppercase tracking-widest mb-14">
            Urwa Imtiaz Portfolio
          </p>

          {/* Loading status indicator */}
          <div className="relative flex flex-col items-center mt-2">
            <span className="font-mono text-5xl font-black text-neutral-800 tracking-tighter">
              {progress}%
            </span>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-4">
              {stage === 'drawing' ? 'Sketching environment assets...' : 'Unfolding canvas layers...'}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      onClick={handleScreenClick}
      className="fixed inset-0 z-50 overflow-hidden bg-neutral-900 select-none cursor-none"
    >
      {/* 1. Warm radial backlight glow that shines through as paper parts */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,240,138,0.18)_0%,transparent_65%)] pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={stage === 'tearing' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      {/* 2. Responsive Responsive SVG ClipPaths Definitions */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="left-tear-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 
                     L 0.5,0 
                     Q 0.49,0.05 0.51,0.1 
                     T 0.48,0.2 
                     T 0.52,0.3 
                     T 0.49,0.4 
                     T 0.53,0.5 
                     T 0.48,0.6 
                     T 0.52,0.7 
                     T 0.49,0.8 
                     T 0.51,0.9 
                     T 0.5,1 
                     L 0,1 Z" />
          </clipPath>
          <clipPath id="right-tear-clip" clipPathUnits="objectBoundingBox">
            <path d="M 1,0 
                     L 0.5,0 
                     Q 0.49,0.05 0.51,0.1 
                     T 0.48,0.2 
                     T 0.52,0.3 
                     T 0.49,0.4 
                     T 0.53,0.5 
                     T 0.48,0.6 
                     T 0.52,0.7 
                     T 0.49,0.8 
                     T 0.51,0.9 
                     T 0.5,1 
                     L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 3. Left Paper Half (Clipped and Animates Left) */}
      {renderPaperHalf('left')}

      {/* 4. Right Paper Half (Clipped and Animates Right) */}
      {renderPaperHalf('right')}

      {/* 5. Central drawing guidelines, animated sketches, and tracking pencil (Fades out when tearing) */}
      <AnimatePresence>
        {stage === 'drawing' && (
          <motion.div 
            className="absolute inset-0 w-full h-full pointer-events-none z-30"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Guide paths for drawing */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Faint predefined hand-drawn torn guidelines */}
              <path
                d="M 50,0 Q 49,5 51,10 T 48,20 T 52,30 T 49,40 T 53,50 T 48,60 T 52,70 T 49,80 T 51,90 T 50,100"
                fill="none"
                stroke="rgba(28,25,23,0.08)"
                strokeWidth="0.8"
                strokeDasharray="1.5 1.5"
              />

              {/* Layer 1: Graphite Stroke (Drawn dynamically) */}
              <motion.path
                d="M 50,0 Q 49,5 51,10 T 48,20 T 52,30 T 49,40 T 53,50 T 48,60 T 52,70 T 49,80 T 51,90 T 50,100"
                fill="none"
                stroke="#44403c"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />

              {/* Layer 2: Shaky sketchy overlay for manual hand-drawn variation */}
              <motion.path
                d="M 50,0 Q 51,6 49,11 T 50,21 T 51,31 T 48,41 T 52,51 T 49,61 T 51,71 T 48,81 T 52,91 T 50,100"
                fill="none"
                stroke="#1c1917"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 0.12, delay: 0.02, ease: 'linear' }}
              />
            </svg>

            {/* Tracking Physical Pencil */}
            <div
              className="absolute w-8 h-8 select-none pointer-events-none z-40 transition-all duration-75"
              style={{
                left: `${pencilX}%`,
                top: `${pencilY}%`,
                transform: 'translate(0%, -100%)',
              }}
            >
              <motion.div
                animate={{
                  rotate: [15, 23, 15],
                  y: [0, -1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.35,
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: 'bottom left' }}
              >
                <svg className="w-full h-full" viewBox="0 0 32 32" fill="none">
                  {/* Wood tip collar */}
                  <polygon points="0,32 12,28 4,20" fill="#EAB308" stroke="#1c1c1c" strokeWidth="1" />
                  {/* Graphite core tip */}
                  <polygon points="0,32 5,30 2,27" fill="#1C1917" />
                  {/* Yellow body shaft */}
                  <polygon points="4,20 12,28 28,12 20,4" fill="#FACC15" stroke="#1c1c1c" strokeWidth="1" />
                  {/* Silver ferrule ring */}
                  <polygon points="20,4 28,12 30,10 22,2" fill="#9CA3AF" stroke="#1c1c1c" strokeWidth="1" />
                  {/* Pink rubber eraser */}
                  <polygon points="22,2 30,10 32,8 24,0" fill="#F472B6" stroke="#1c1c1c" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* Floating graphite pencil dust cloud */}
              {progress > 1 && progress < 100 && (
                <div className="absolute top-full left-0 flex gap-0.5 pointer-events-none">
                  <span className="w-1 h-1 bg-stone-700/40 rounded-full animate-ping" />
                  <span className="w-1.5 h-1.5 bg-stone-500/35 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-1 h-1 bg-stone-600/30 rounded-full animate-pulse [animation-delay:0.2s]" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Handcrafted tactile Unmute banner */}
      {isMuted && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-amber-50 border-2 border-neutral-800 text-neutral-800 rounded-lg text-xs font-sans tracking-wide hover:bg-amber-100 transition-all cursor-none z-50 flex items-center gap-2 shadow-[2px_2px_0px_#1c1c1c] active:translate-x-[-50%] active:translate-y-[2px] active:shadow-none font-bold"
        >
          <span>🔊</span> Enable Handcrafted Soundscapes
        </button>
      )}
    </div>
  );
}
