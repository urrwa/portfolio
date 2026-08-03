/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useAudio } from './AudioEngine';
import { Mail, ArrowRight, Sun, Moon, Sparkles, Send, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SceneOutsideProps {
  onEnterHouse: () => void;
}

interface SmokeRing {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
}

interface Butterfly {
  id: number;
  x: number;
  y: number;
  scale: number;
  delay: number;
}

export default function SceneOutside({ onEnterHouse }: SceneOutsideProps) {
  const { playClick, playKnock, playDoorOpen } = useAudio();
  
  // Custom states
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'sunset' | 'night'>('morning');
  const [isDoorHovered, setIsDoorHovered] = useState(false);
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  
  // Interactive Animal / Object States
  const [isCatAsleep, setIsCatAsleep] = useState(true);
  const [catSpeechBubble, setCatSpeechBubble] = useState<string | null>(null);
  const [isSignHovered, setIsSignHovered] = useState(false);
  const [isBirdWiggling, setIsBirdWiggling] = useState(false);
  
  // Custom Ghibli-inspired details & state behaviors
  const [isBlinking, setIsBlinking] = useState(false);
  const [isEarTwitching, setIsEarTwitching] = useState(false);
  const [isKnobRotating, setIsKnobRotating] = useState(false);
  const [isKnocking, setIsKnocking] = useState(false);

  // Bird Idle States
  const [birdState, setBirdState] = useState({
    blink: false,
    headTilt: 0,
    hopY: 0,
    flutter: false,
    chirp: false
  });

  // Periodic random bird idle movements
  useEffect(() => {
    const timer = setInterval(() => {
      const action = Math.random();
      if (action < 0.25) {
        // Blink
        setBirdState(prev => ({ ...prev, blink: true }));
        setTimeout(() => setBirdState(prev => ({ ...prev, blink: false })), 160);
      } else if (action < 0.5) {
        // Head tilt
        const tilts = [-15, 15, -10, 10, 0];
        const chosenTilt = tilts[Math.floor(Math.random() * tilts.length)];
        setBirdState(prev => ({ ...prev, headTilt: chosenTilt }));
      } else if (action < 0.7) {
        // Hop
        setBirdState(prev => ({ ...prev, hopY: -2.5 }));
        setTimeout(() => setBirdState(prev => ({ ...prev, hopY: 0 })), 150);
      } else if (action < 0.88) {
        // Wing flutter
        setBirdState(prev => ({ ...prev, flutter: true }));
        setTimeout(() => setBirdState(prev => ({ ...prev, flutter: false })), 350);
      } else {
        // Occasional chirping
        setBirdState(prev => ({ ...prev, chirp: true }));
        playLocalSound('bird');
        setTimeout(() => setBirdState(prev => ({ ...prev, chirp: false })), 1200);
      }
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Periodic random cat movements (blinks and ear twitches)
  useEffect(() => {
    const timer = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.35) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 160);
      } else if (rand < 0.6) {
        setIsEarTwitching(true);
        setTimeout(() => setIsEarTwitching(false), 450);
      }
    }, 3800);
    return () => clearInterval(timer);
  }, []);
  
  // Parallax Coordinates
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Contact Form inside Letter box
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFlyingAirplane, setIsFlyingAirplane] = useState(false);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track cursor for pupil-tracking and parallax (skipped on touch devices to save battery/CPU)
  useEffect(() => {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2); // -1 to 1
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2); // -1 to 1
      setParallax({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Synthesize beautiful Ghibli-inspired audio effects locally (Web Audio API)
  const playLocalSound = (type: 'meow' | 'bird' | 'chime' | 'paper' | 'wind') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      if (type === 'meow') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(560, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(460, now + 0.32);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.05, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.35);
      } else if (type === 'bird') {
        // High pitched lovely double-chirp
        for (let delay of [0, 0.15]) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(950, now + delay);
          osc.frequency.exponentialRampToValueAtTime(2800, now + delay + 0.05);
          osc.frequency.exponentialRampToValueAtTime(1500, now + delay + 0.1);

          gain.gain.setValueAtTime(0.001, now + delay);
          gain.gain.linearRampToValueAtTime(0.015, now + delay + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.11);
        }
      } else if (type === 'chime') {
        // Crystal wind chimes
        const notes = [987.77, 1174.66, 1318.51, 1567.98]; // beautiful major G7/C chord pitches
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          
          gain.gain.setValueAtTime(0.001, now + idx * 0.05);
          gain.gain.linearRampToValueAtTime(0.02, now + idx * 0.05 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.5);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.55);
        });
      } else if (type === 'paper') {
        // Crisp letter/paper slide rustle
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(700, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.1);
        filter.frequency.exponentialRampToValueAtTime(400, now + 0.22);
        filter.Q.setValueAtTime(2.5, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
        noise.stop(now + 0.24);
      } else if (type === 'wind') {
        // Very subtle background wind sweep
        const bufferSize = ctx.sampleRate * 1.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, now);
        filter.frequency.exponentialRampToValueAtTime(320, now + 0.7);
        filter.frequency.exponentialRampToValueAtTime(100, now + 1.4);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.015, now + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
        noise.stop(now + 1.5);
      }
    } catch (e) {
      console.warn('Audio API blocked or uninitialized:', e);
    }
  };

  const handleDoorClick = () => {
    if (isDoorOpen || isTransitioning) return;
    
    // Smooth cinematic wood knock
    setIsKnocking(true);
    playKnock();
    setTimeout(() => {
      playKnock();
    }, 150);
    setTimeout(() => {
      playKnock();
    }, 300);
    setTimeout(() => {
      setIsKnocking(false);
    }, 800);

    // Brass knob rotates first with a satisfying mechanical click
    setTimeout(() => {
      setIsKnobRotating(true);
      try {
        playClick();
      } catch (e) {
        // Fallback
      }
    }, 450);

    // Slowly open with heavy wood friction creak
    setTimeout(() => {
      setIsDoorOpen(true);
      playDoorOpen();
    }, 850);

    // Cinematic deep zoom transition
    setTimeout(() => {
      setIsTransitioning(true);
    }, 1750);

    // Complete transition and enter workspace
    setTimeout(() => {
      onEnterHouse();
    }, 3050);
  };

  const handleCatClick = () => {
    setIsCatAsleep(false);
    playLocalSound('meow');
    const meowResponses = [
      "Meow! 🐾 Welcome to Lahore's finest studio!",
      "Purrr... Urwah sharpened all charcoal pencils!",
      "Meow! Click the mailbox to write a letter!",
      "Nyaaa~ Try toggling the Day/Night clock!",
    ];
    setCatSpeechBubble(meowResponses[Math.floor(Math.random() * meowResponses.length)]);
    setTimeout(() => setCatSpeechBubble(null), 3000);
  };

  const handleBirdClick = () => {
    playLocalSound('bird');
    setBirdState({
      blink: false,
      headTilt: -15,
      hopY: -4,
      flutter: true,
      chirp: true
    });
    setTimeout(() => {
      setBirdState(prev => ({
        ...prev,
        headTilt: 15,
        hopY: 0,
        flutter: false
      }));
    }, 400);
    setTimeout(() => {
      setBirdState(prev => ({
        ...prev,
        headTilt: 0,
        chirp: false
      }));
    }, 1500);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;

    // Trigger paper airplane flight
    setIsFlyingAirplane(true);
    playLocalSound('paper');

    setTimeout(() => {
      setFormSubmitted(true);
      setIsFlyingAirplane(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 1200);
  };

  // Periodic subtle background wind chimes and wind hums
  useEffect(() => {
    const chimeTimer = setInterval(() => {
      playLocalSound('chime');
      playLocalSound('wind');
    }, 14000);
    return () => clearInterval(chimeTimer);
  }, []);

  // Theme-specific colors and visual modes
  const themeSky = {
    morning: 'bg-gradient-to-b from-[#E0F2FE] via-[#FDFBF7] to-[#FAF6EE]', // Morning blue to rich cream Ghibli sky
    sunset: 'bg-gradient-to-b from-[#311042] via-[#FCA5A5] to-[#FED7AA]', // Sunset purple to deep peach-apricot
    night: 'bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#090D1A]', // Deep starry midnight Ghibli sky
  };

  const foliageColor = {
    morning: { fill: '#DCFCE7', stroke: '#15803D' },
    sunset: { fill: '#FBCFE8', stroke: '#9D174D' },
    night: { fill: '#1E293B', stroke: '#475569' },
  };

  const houseWallColor = {
    morning: '#FAFAF9',
    sunset: '#FEF2F2',
    night: '#1C1917',
  };

  // Custom flower coordinates at bottom
  const flowersList = [
    { x: 32, y: 185, color: '#F87171', size: 3 },
    { x: 74, y: 188, color: '#FBBF24', size: 3.5 },
    { x: 122, y: 186, color: '#60A5FA', size: 2.8 },
  ];

  return (
    <motion.div
      className={`relative w-full h-screen overflow-hidden ${themeSky[timeOfDay]} flex items-center justify-center transition-colors duration-[1500ms]`}
      animate={isTransitioning ? {
        scale: 14,
        x: isDesktop ? "-22%" : "0%",
        y: isDesktop ? "-2%" : "-25%",
        filter: "blur(2px)",
      } : {
        scale: 1,
        x: "0%",
        y: "0%",
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
    >
      {/* Global CSS Styles for Ghibli Animations */}
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-8px) translateX(4px); }
        }
        @keyframes smoke-drift {
          0% { transform: translateY(0px) scale(0.9); opacity: 0.8; }
          100% { transform: translateY(-70px) translateX(18px) scale(1.6); opacity: 0; }
        }
        @keyframes flap {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.1); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes paper-glide {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          25% { transform: translate(120px, -80px) rotate(-15deg); opacity: 0.9; }
          60% { transform: translate(320px, -50px) rotate(10deg); opacity: 0.6; }
          100% { transform: translate(500px, -200px) rotate(-45deg); opacity: 0; }
        }
        @keyframes butterfly-orbit-1 {
          0% { transform: translate3d(0px, 15px, 0); }
          25% { transform: translate3d(35px, 0px, 0); }
          50% { transform: translate3d(0px, -15px, 0); }
          75% { transform: translate3d(-35px, 0px, 0); }
          100% { transform: translate3d(0px, 15px, 0); }
        }
        @keyframes butterfly-orbit-2 {
          0% { transform: translate3d(0px, -30px, 0); }
          25% { transform: translate3d(20px, 0px, 0); }
          50% { transform: translate3d(0px, 30px, 0); }
          75% { transform: translate3d(-20px, 0px, 0); }
          100% { transform: translate3d(0px, -30px, 0); }
        }
        .animate-sway {
          animation: sway 6s infinite ease-in-out;
        }
        .animate-float {
          animation: float-gentle 12s infinite ease-in-out;
        }
        .animate-twinkle {
          animation: star-twinkle 3s infinite ease-in-out;
        }
        .animate-paper-airplane {
          animation: paper-glide 1.2s forwards cubic-bezier(0.25, 1, 0.5, 1);
        }
        .animate-butterfly-1 {
          animation: butterfly-orbit-1 6s infinite linear;
        }
        .animate-butterfly-2 {
          animation: butterfly-orbit-2 4.5s infinite linear;
        }
      `}</style>

      {/* Decorative notebook dashed border */}
      <div className="absolute inset-4 md:inset-8 border-2 border-dashed border-neutral-800/10 pointer-events-none rounded-lg z-10" />
      
      {/* Cross-fading watercolor skies (Morning, Sunset, Night) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Morning Sky */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#E2F1FF] via-[#FFF8F0] to-[#FAF6EE] transition-opacity duration-[1500ms]"
          style={{ opacity: timeOfDay === 'morning' ? 1 : 0 }}
        />
        {/* Sunset Sky */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#311042] via-[#FCA5A5] to-[#FED7AA] transition-opacity duration-[1500ms]"
          style={{ opacity: timeOfDay === 'sunset' ? 1 : 0 }}
        />
        {/* Night Sky */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#090D1A] transition-opacity duration-[1500ms]"
          style={{ opacity: timeOfDay === 'night' ? 1 : 0 }}
        />
      </div>

      {/* Layered watercolor landscape rolling hills & horizon trees */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-35 select-none">
        <svg className="absolute bottom-0 w-full h-[60%] min-h-[400px]" viewBox="0 0 1000 400" preserveAspectRatio="none">
          {/* Far hills */}
          <path 
            d="M 0,260 Q 250,180 500,240 T 1000,220 L 1000,400 L 0,400 Z" 
            fill={timeOfDay === 'night' ? '#161933' : timeOfDay === 'sunset' ? '#F4A261' : '#E8F5E9'} 
            className="transition-colors duration-[1500ms]"
            opacity="0.5"
          />
          {/* Mid hills */}
          <path 
            d="M 0,315 Q 350,270 700,320 T 1000,290 L 1000,400 L 0,400 Z" 
            fill={timeOfDay === 'night' ? '#0F121E' : timeOfDay === 'sunset' ? '#E76F51' : '#C8E6C9'} 
            className="transition-colors duration-[1500ms]"
            opacity="0.6"
          />
          {/* Horizon trees silhouette */}
          <g opacity="0.14" fill={timeOfDay === 'night' ? '#475569' : '#4CAF50'} className="transition-colors duration-[1500ms]">
            <polygon points="50,310 65,260 80,310" />
            <polygon points="70,320 85,265 100,320" />
            <polygon points="230,300 245,255 260,300" />
            <polygon points="780,310 795,260 810,310" />
            <polygon points="800,315 815,270 830,315" />
          </g>
        </svg>
      </div>

      {/* Cozy ambient vignetted lighting overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.06)',
          background: 'radial-gradient(circle, transparent 65%, rgba(28,25,23,0.08) 100%)',
        }}
      />
      
      {/* Felt hand-drawn paper grain textured shader layer */}
      <div className="absolute inset-0 pointer-events-none bg-neutral-900/[0.012] mix-blend-multiply z-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

      {/* Floating cozy dust particles and falling leaves */}
      <CozyAmbientParticles />
      <FallingLeaves timeOfDay={timeOfDay} />
      <FlyingBirdsSky timeOfDay={timeOfDay} />

      {/* Ambient Watercolor Sun rays (Morning & Sunset) */}
      {timeOfDay !== 'night' && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-soft-light transition-all duration-1000 z-10"
          style={{
            background: timeOfDay === 'morning'
              ? 'repeating-linear-gradient(55deg, rgba(253,224,71,0.06) 0px, rgba(253,224,71,0.06) 40px, transparent 40px, transparent 80px)'
              : 'repeating-linear-gradient(55deg, rgba(249,115,22,0.08) 0px, rgba(249,115,22,0.08) 40px, transparent 40px, transparent 80px)'
          }}
        />
      )}

      {/* Night Sky: Stars & Constellations */}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[
            { top: '15%', left: '20%', delay: '0s' },
            { top: '12%', left: '45%', delay: '0.8s' },
            { top: '22%', left: '60%', delay: '1.5s' },
            { top: '8%', left: '78%', delay: '0.3s' },
            { top: '28%', left: '15%', delay: '1.1s' },
            { top: '35%', left: '85%', delay: '2s' },
            { top: '18%', left: '38%', delay: '0.6s' },
          ].map((star, i) => (
            <div 
              key={i}
              className="absolute w-1.5 h-1.5 bg-yellow-100 rounded-full animate-twinkle"
              style={{
                top: star.top,
                left: star.left,
                animationDelay: star.delay,
                filter: 'drop-shadow(0 0 4px rgba(253,224,71,0.8))'
              }}
            />
          ))}

          {/* Golden crescent moon */}
          <div className="absolute top-14 right-[25%] w-12 h-12 opacity-80 filter drop-shadow-[0_0_12px_rgba(253,224,71,0.4)]">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-200">
              <path d="M20 50 A30 30 0 1 0 80 80 A36 36 0 1 1 20 50 Z" fill="currentColor" className="sketch-element" />
            </svg>
          </div>
        </div>
      )}

      {/* Sun or Sunset glowing ball with subtle pulsing */}
      {timeOfDay !== 'night' && (
        <motion.div 
          className="absolute top-16 right-[22%] w-16 h-16 rounded-full blur-[1px] transition-all duration-[1500ms] z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: timeOfDay === 'morning' ? '#FEF08A' : '#F97316',
            boxShadow: timeOfDay === 'morning' 
              ? '0 0 32px rgba(254,240,138,0.5), inset -4px -4px 10px rgba(251,191,36,0.3)' 
              : '0 0 32px rgba(249,115,22,0.6), inset -4px -4px 10px rgba(220,38,38,0.4)'
          }}
        />
      )}

      {/* Floating clouds drifting (Parallax Level 1) */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-0 transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${parallax.x * -12}px, ${parallax.y * -8}px, 0)` }}
      >
        {/* Cloud 1 */}
        <div className="absolute top-20 left-[12%] w-32 h-12 opacity-40 animate-float">
          <svg viewBox="0 0 100 40" fill="none" stroke="#1c1c1c" strokeWidth="1.6" className="sketch-element text-neutral-400">
            <path d="M10,30 C10,20 20,10 40,15 C50,10 70,10 80,20 C90,20 95,25 90,30 Z" fill={timeOfDay === 'night' ? '#334155' : '#fff'} />
          </svg>
        </div>
        {/* Cloud 2 */}
        <div className="absolute top-36 right-[15%] w-40 h-14 opacity-40 animate-float" style={{ animationDelay: '2.5s' }}>
          <svg viewBox="0 0 100 40" fill="none" stroke="#1c1c1c" strokeWidth="1.6" className="sketch-element text-neutral-400">
            <path d="M10,35 C15,18 30,12 50,18 C60,6 80,11 90,22 C100,28 95,38 85,38 Z" fill={timeOfDay === 'night' ? '#334155' : '#fff'} />
          </svg>
        </div>
      </div>

      {/* 3 Butterflies fluttering around tree (Morning & Sunset) */}
      {timeOfDay !== 'night' && (
        <div className="absolute inset-0 pointer-events-none select-none z-10">
          {/* Butterfly 1 */}
          <div
            className="absolute animate-butterfly-1"
            style={{
              left: '22%',
              top: '45%',
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="#1c1c1c" strokeWidth="1.5" style={{ transform: 'scale(0.8)' }}>
              <g style={{ transformOrigin: '10px 10px' }} className="animate-[flap_0.15s_infinite_ease-in-out]">
                <path d="M10,10 C8,5 4,5 4,8 C4,11 8,11 10,10 Z" fill="#F472B6" />
                <path d="M10,10 C12,5 16,5 16,8 C16,11 12,11 10,10 Z" fill="#F472B6" />
              </g>
            </svg>
          </div>
          {/* Butterfly 2 */}
          <div
            className="absolute animate-butterfly-2"
            style={{
              left: '32%',
              top: '65%',
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="#1c1c1c" strokeWidth="1.5" style={{ transform: 'scale(0.6)' }}>
              <g style={{ transformOrigin: '10px 10px' }} className="animate-[flap_0.15s_infinite_ease-in-out]">
                <path d="M10,10 C8,5 4,5 4,8 C4,11 8,11 10,10 Z" fill="#60A5FA" />
                <path d="M10,10 C12,5 16,5 16,8 C16,11 12,11 10,10 Z" fill="#60A5FA" />
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* Day / Night Hanging Clock Chain Switcher (Pocket Watch style!) */}
      <div className="absolute top-0 right-12 md:right-24 z-30 flex flex-col items-center">
        {/* Metal chain */}
        <div className="w-[2px] h-14 border-r border-dashed border-neutral-700/60" />
        {/* Pocket dial */}
        <button
          onClick={() => {
            playLocalSound('chime');
            setTimeOfDay((prev) => (prev === 'morning' ? 'sunset' : prev === 'sunset' ? 'night' : 'morning'));
          }}
          className="group/clock relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-neutral-800 bg-amber-50/95 shadow-md cursor-none hover:scale-105 hover:rotate-12 active:scale-95 transition-all duration-300"
          title="Toggle Ghibli Ambiance"
        >
          {/* Inner gears indicator rotates */}
          <div className="absolute inset-1 rounded-full border border-neutral-800/10 border-dashed animate-spin [animation-duration:20s]" />
          
          {timeOfDay === 'morning' && <Sun className="w-5 h-5 text-amber-500" />}
          {timeOfDay === 'sunset' && <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />}
          {timeOfDay === 'night' && <Moon className="w-5 h-5 text-indigo-900" />}

          {/* Floating tiny pendulum info tag */}
          <div className="absolute -bottom-6 text-[8px] font-mono font-bold tracking-widest text-neutral-500/80 uppercase whitespace-nowrap bg-white/70 px-1 py-0.5 rounded border border-neutral-200">
            {timeOfDay}
          </div>
        </button>
      </div>

      {/* Main 3D Illustrated Parallax Stage with subtle camera breathing effect */}
      <motion.div 
        className="relative w-full max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 select-none z-10"
        animate={{
          y: [0, -3.5, 0],
          x: [0, 1.2, 0],
        }}
        transition={{
          duration: 7.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        
        {/* LEFT SIDE: Ancient Ghibli Tree & Swing (Parallax Level 2) */}
        <div 
          className="relative shrink-0 w-80 md:w-[420px] h-96 flex items-center justify-center transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${parallax.x * 12}px, ${parallax.y * 8}px, 0)` }}
        >
          <svg className="w-full h-full text-neutral-800" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.6">
            
            {/* Soft watercolor ground contour grass shadows */}
            <path 
              d="M 10,185 C 50,180 150,190 190,185" 
              className="sketch-element transition-colors duration-[1500ms]" 
              fill={timeOfDay === 'night' ? '#1E293B' : timeOfDay === 'sunset' ? '#FEE2E2' : '#F0FDF4'} 
              strokeWidth="2"
            />
            
            {/* Stones and pebbles */}
            <ellipse cx="45" cy="188" rx="6" ry="1.8" className="sketch-element fill-neutral-300 transition-colors" />
            <ellipse cx="152" cy="190" rx="4" ry="1.2" className="sketch-element fill-neutral-400 transition-colors" />

            {/* Cozy cottage wooden fence next to the tree */}
            <g className="sketch-element" stroke="currentColor" strokeWidth="1.2" fill={timeOfDay === 'night' ? '#334155' : '#E6D7C3'}>
              {/* Post 1 */}
              <path d="M 15,172 L 15,185 M 13,172 L 17,172 L 15,168 Z" />
              {/* Post 2 */}
              <path d="M 27,173 L 27,186 M 25,173 L 29,173 L 27,169 Z" />
              {/* Post 3 */}
              <path d="M 39,172 L 39,185 M 37,172 L 41,172 L 39,168 Z" />
              {/* Rails */}
              <path d="M 12,175 Q 26,176 42,175" fill="none" />
              <path d="M 12,181 Q 26,182 42,181" fill="none" />
            </g>

            {/* Tree roots branching into the grass */}
            <path d="M 140,185 Q 152,188 160,191 M 132,185 Q 118,188 111,190" stroke={timeOfDay === 'night' ? '#475569' : '#1c1c1c'} strokeWidth="1.8" fill="none" className="sketch-element" />

            {/* Tree Trunk Backing (Warm Organic Brown watercolor fill!) */}
            <path
              d="M 141,185 C 136,140 146,100 131,80 C 116,70 101,75 91,65 C 81,55 91,40 86,20 L 83,21 C 88,41 78,56 89,66 C 99,76 114,71 129,81 C 144,101 134,141 139,185 Z"
              fill={timeOfDay === 'night' ? '#1E293B' : '#78350F'}
              className="transition-colors duration-[1500ms]"
              opacity={timeOfDay === 'night' ? 0.4 : 0.28}
            />

            {/* Tree Trunk & Branches */}
            <path 
              d="M 140,185 C 135,140 145,100 130,80 C 115,70 100,75 90,65 C 80,55 90,40 85,20 M 130,80 C 140,54 160,45 178,42" 
              className="sketch-element fill-none transition-colors duration-[1500ms]" 
              stroke={timeOfDay === 'night' ? '#475569' : '#1c1c1c'}
              strokeWidth="1.8"
            />

            {/* Detailed wood bark textures */}
            <path d="M 137,180 Q 134,142 138,112" stroke={timeOfDay === 'night' ? '#334155' : '#A78BFA'} strokeWidth="0.8" opacity="0.45" fill="none" className="sketch-element" />
            <path d="M 141,183 Q 138,162 142,132" stroke={timeOfDay === 'night' ? '#334155' : '#A78BFA'} strokeWidth="0.8" opacity="0.45" fill="none" className="sketch-element" />

            {/* Whimsical green vines climbing trunk */}
            <path d="M 140,180 Q 132,156 140,136 Q 146,116 136,96" stroke="#22C55E" strokeWidth="1" fill="none" opacity="0.75" className="sketch-element" />

            {/* Multi-layered foliage leaves with glowing Ghibli gradients */}
            <path 
              d="M 70,40 C 50,30 55,10 75,15 C 85,5 110,10 115,25 C 130,20 140,35 130,50 C 145,60 135,80 110,75 C 90,85 75,70 70,40 Z" 
              className="sketch-element transition-all duration-[1500ms] animate-sway" 
              fill={foliageColor[timeOfDay].fill} 
              stroke={foliageColor[timeOfDay].stroke}
            />
            <path 
              d="M 150,45 C 140,35 145,20 160,25 C 170,15 185,25 180,40 C 190,45 185,60 170,60 Z" 
              className="sketch-element transition-all duration-[1500ms] animate-sway" 
              style={{ animationDelay: '1.2s' }}
              fill={foliageColor[timeOfDay].fill} 
              stroke={foliageColor[timeOfDay].stroke}
            />

            {/* Hanging Lantern (Lights up warmly at night!) */}
            <g className="sketch-element">
              {/* Rope hanging from main left branch */}
              <line x1="128" y1="78" x2="128" y2="100" stroke="currentColor" strokeWidth="1" />
              {/* Lantern Cap */}
              <polygon points="122,100 134,100 128,94" fill={timeOfDay === 'night' ? '#475569' : '#7C2D12'} stroke="currentColor" strokeWidth="1" />
              {/* Lantern Body */}
              <rect x="123" y="100" width="10" height="13" rx="1.5" fill={timeOfDay === 'night' ? '#FBBF24' : '#FAF6EE'} stroke="currentColor" strokeWidth="1.2" />
              {/* Warm lantern aura at night */}
              {timeOfDay === 'night' && (
                <circle cx="128" cy="106" r="16" fill="rgba(251,191,36,0.25)" className="animate-pulse pointer-events-none" style={{ mixBlendMode: 'screen' }} />
              )}
            </g>

            {/* Sturdy wood mounting peg extending directly from the tree trunk */}
            <g className="sketch-element transition-colors duration-[1500ms]">
              <path 
                d="M 132,82 Q 164,80 196,82 L 196,86 Q 164,88 132,86 Z" 
                fill={timeOfDay === 'night' ? '#334155' : '#D8C2A8'} 
                stroke="currentColor" 
                strokeWidth="1.2" 
              />
              <ellipse cx="196" cy="84" rx="1.5" ry="2" fill={timeOfDay === 'night' ? '#1E293B' : '#FAF6EE'} stroke="currentColor" strokeWidth="1" />
            </g>

            {/* Little mushrooms under the tree */}
            <g className="sketch-element">
              {/* stem */}
              <rect x="110" y="180" width="1.5" height="4.5" fill="#F5F5F4" stroke="currentColor" strokeWidth="0.8" />
              {/* cap */}
              <path d="M 107,180 A 4,4 0 0 1 115,180 Z" fill="#EF4444" stroke="currentColor" strokeWidth="0.8" />
              {/* spots */}
              <circle cx="111" cy="178" r="0.6" fill="#fff" />
            </g>

            {/* Intertwined wooden sign hanging on ropes (SWAYS AND CREAKS ON HOVER) */}
            <motion.g
              style={{ transformOrigin: '170px 84px' }}
              animate={isSignHovered ? { rotate: [-3.5, 3.5, -2, 2, 0] } : { rotate: [-1, 1, -1] }}
              transition={isSignHovered ? { duration: 1.5, ease: 'easeOut' } : { repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              onMouseEnter={() => {
                setIsSignHovered(true);
                playLocalSound('chime');
              }}
              onMouseLeave={() => setIsSignHovered(false)}
              onClick={handleDoorClick}
              className="cursor-none interactive-obj"
            >
              {/* Two vertical ropes of equal length and spacing attached directly to the wooden mounting peg */}
              <line x1="154" y1="84" x2="154" y2="100" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
              <line x1="186" y1="84" x2="186" y2="100" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
              
              {/* Symmetrical loops / knots wrapping around the mounting peg */}
              <circle cx="154" cy="84" r="1.5" fill="none" stroke={timeOfDay === 'night' ? '#475569' : '#854D0E'} strokeWidth="1" />
              <circle cx="186" cy="84" r="1.5" fill="none" stroke={timeOfDay === 'night' ? '#475569' : '#854D0E'} strokeWidth="1" />

              {/* Wood texture background for Sign */}
              <rect x="148" y="100" width="44" height="22" rx="2" fill="#FAF6EE" stroke="currentColor" strokeWidth="1.5" className="sketch-element" />
              
              {/* Wood grain curves */}
              <path d="M 151,105 Q 170,103 189,105" stroke="#D1C7BD" strokeWidth="0.8" fill="none" opacity="0.6" />
              <path d="M 149,114 Q 165,116 187,113" stroke="#D1C7BD" strokeWidth="0.8" fill="none" opacity="0.6" />
              {/* Wooden knot */}
              <circle cx="155" cy="109" r="1" fill="none" stroke="#D1C7BD" strokeWidth="0.5" opacity="0.6" />

              <text x="170" y="110" textAnchor="middle" stroke="none" className="font-serif text-[6px] font-bold fill-neutral-800 tracking-wider select-none">PORTFOLIO</text>
              <text 
                x="170" 
                y="118" 
                textAnchor="middle" 
                stroke="none" 
                className={`font-sans text-[4px] font-bold tracking-wide select-none transition-all duration-300 ${isSignHovered ? 'fill-indigo-500 scale-110' : 'fill-indigo-600'}`}
                style={{ transformOrigin: '170px 118px' }}
              >
                knock the door
              </text>
            </motion.g>

            {/* Relaxing physical wooden Swing (Sway loop) */}
            <motion.g 
              style={{ transformOrigin: '100px 72px' }}
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
            >
              <line x1="90" y1="74" x2="90" y2="135" stroke="currentColor" strokeWidth="1.2" />
              <line x1="110" y1="73" x2="110" y2="135" stroke="currentColor" strokeWidth="1.2" />
              {/* Wooden Plank seat */}
              <rect x="84" y="135" width="32" height="4" fill="#F5F5F4" stroke="currentColor" strokeWidth="1.2" className="sketch-element" />
            </motion.g>

            {/* Cozy Bird sitting on tree trunk (Reacts on click & has idle animations!) */}
            <motion.g 
              onClick={handleBirdClick} 
              className="cursor-none interactive-obj"
              animate={{ 
                y: birdState.hopY,
                rotate: birdState.headTilt,
              }}
              style={{ 
                transformOrigin: '134px 120px'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              {/* Little feet grabbing the tree trunk */}
              <line x1="133" y1="123.2" x2="135" y2="121.2" stroke="currentColor" strokeWidth="1" />
              <line x1="135" y1="123.7" x2="137" y2="121.5" stroke="currentColor" strokeWidth="1" />

              {/* Body */}
              <ellipse 
                cx="134" 
                cy="120" 
                rx="5" 
                ry="3.5" 
                fill={timeOfDay === 'night' ? '#334155' : '#60A5FA'} 
                stroke="currentColor" 
                strokeWidth="1.2" 
                className="sketch-element" 
              />
              {/* Head */}
              <circle 
                cx="138" 
                cy="116" 
                r="2.8" 
                fill={timeOfDay === 'night' ? '#334155' : '#60A5FA'} 
                stroke="currentColor" 
                strokeWidth="1.2" 
                className="sketch-element"
              />
              {/* Beak */}
              <polygon points="140.5,115.5 144,116.5 140.5,117.5" fill="#F59E0B" stroke="none" />
              {/* Eye (Blinks) */}
              <circle 
                cx="138" 
                cy="115" 
                r={birdState.blink ? 0.1 : 0.6} 
                fill="#000" 
              />
              {/* Wing flutters */}
              <motion.path 
                d="M 132,120 C 130,118 130,116 133,118" 
                fill="#3B82F6" 
                stroke="currentColor" 
                strokeWidth="1" 
                animate={birdState.flutter ? { rotate: [-10, 20, -10, 20, 0] } : {}}
                style={{ transformOrigin: '132px 120px' }}
              />

              {/* Chirp visual wave/note effect when chirping */}
              <AnimatePresence>
                {birdState.chirp && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.5, x: 5, y: -5 }}
                    animate={{ opacity: 1, scale: 1, x: 10, y: -10 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="pointer-events-none"
                  >
                    <path d="M 144,113 Q 147,110 149,112" fill="none" stroke="#6366f1" strokeWidth="0.8" />
                    <text x="146" y="109" className="font-sans text-[3.5px] fill-indigo-600 select-none font-bold">♪ chirp</text>
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.g>

            {/* Glowing Fireflies floating around tree at night */}
            {timeOfDay === 'night' && (
              <g className="pointer-events-none">
                {[
                  { cx: 70, cy: 65, delay: '0s' },
                  { cx: 125, cy: 30, delay: '0.5s' },
                  { cx: 165, cy: 110, delay: '1s' },
                  { cx: 105, cy: 155, delay: '1.4s' },
                ].map((ff, idx) => (
                  <circle 
                    key={idx}
                    cx={ff.cx}
                    cy={ff.cy}
                    r="1.8"
                    fill="#FDE047"
                    className="animate-pulse"
                    style={{
                      animationDelay: ff.delay,
                      filter: 'drop-shadow(0 0 3px rgba(253,224,71,1))'
                    }}
                  />
                ))}
              </g>
            )}

            {/* Swaying Flowers at base (Hover triggers sway) */}
            {flowersList.map((flower, idx) => (
              <Flower key={idx} x={flower.x} y={flower.y} color={flower.color} size={flower.size} />
            ))}

          </svg>
        </div>

        {/* RIGHT SIDE: The Hand-Drawn Ghibli Cabin Structure (Parallax Level 3) */}
        <div 
          className="relative flex-1 max-w-md w-full flex flex-col items-center transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${parallax.x * 18}px, ${parallax.y * 12}px, 0)` }}
        >
          {/* Main House container with dynamic breathing animation and 3D perspective */}
          <div className="relative w-80 h-80 md:w-96 md:h-96" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
            <svg className="w-full h-full text-neutral-800" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ transformStyle: 'preserve-3d' }}>
              <defs>
                <filter id="doorGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="doorLightSpill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#FDE047" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Stone pathway */}
              <path d="M 60,185 C 65,192 125,195 130,185" className="sketch-element" />
              <ellipse cx="75" cy="190" rx="6" ry="2" className="sketch-element fill-[#E5E5E5]/40" />
              <ellipse cx="95" cy="193" rx="8" ry="3" className="sketch-element fill-[#D4D4D4]/40" />
              <ellipse cx="115" cy="190" rx="5" ry="2" className="sketch-element fill-[#E5E5E5]/40" />

              {/* Cozy hand-woven welcome mat at the doorstep */}
              <rect x="78" y="184" width="44" height="6" rx="1.5" fill="#DC2626" stroke="currentColor" strokeWidth="1.2" className="sketch-element" />
              <rect x="80" y="185" width="40" height="4" rx="1" fill="#EAB308" />
              <text x="100" y="188.5" textAnchor="middle" stroke="none" className="font-sans text-[3.2px] font-black fill-stone-900 tracking-widest select-none">WELCOME</text>

              {/* Chimney structure at the top-right roof */}
              <rect x="140" y="32" width="13" height="24" fill={houseWallColor[timeOfDay]} stroke="currentColor" strokeWidth="1.6" className="sketch-element transition-colors duration-[1500ms]" />
              {/* Chimney rim */}
              <rect x="137" y="30" width="19" height="4" fill={timeOfDay === 'night' ? '#292524' : '#E5E5E5'} stroke="currentColor" strokeWidth="1.6" />

              {/* Render dynamic smoke ring particles floating up from chimney */}
              <ChimneySmoke timeOfDay={timeOfDay} />

              {/* Main Cabin Wall Sketch */}
              <rect 
                x="40" 
                y="80" 
                width="120" 
                height="105" 
                fill={houseWallColor[timeOfDay]} 
                className="sketch-element transition-colors duration-[1500ms]" 
                strokeWidth="1.8"
              />

              {/* Triangle Roof */}
              <polygon points="30,80 100,30 170,80" fill={timeOfDay === 'night' ? '#1E293B' : '#F5E6D3'} stroke="currentColor" strokeWidth="1.8" className="sketch-element transition-colors duration-[1500ms]" />
              <line x1="30" y1="80" x2="170" y2="80" />

              {/* Hand-drawn overlapping shingles / roof tiles */}
              <g stroke="currentColor" strokeWidth="0.8" opacity="0.65" fill="none">
                {/* Row 1 */}
                <path d="M 40,75 C 44,71 48,71 52,75 M 52,75 C 56,71 60,71 64,75 M 64,75 C 68,71 72,71 76,75 M 76,75 C 80,71 84,71 88,75" />
                <path d="M 88,75 C 92,71 96,71 100,75 M 100,75 C 104,71 108,71 112,75 M 112,75 C 116,71 120,71 124,75 M 124,75 C 128,71 132,71 136,75" />
                <path d="M 136,75 C 140,71 144,71 148,75 M 148,75 C 152,71 156,71 160,75" />
                {/* Row 2 */}
                <path d="M 45,65 C 49,61 53,61 57,65 M 57,65 C 61,61 65,61 69,65 M 69,65 C 73,61 77,61 81,65 M 81,65 C 85,61 89,61 93,65" />
                <path d="M 93,65 C 97,61 101,61 105,65 M 105,65 C 109,61 113,61 117,65 M 117,65 C 121,61 125,61 129,65 M 129,65 C 133,61 137,61 141,65" />
                <path d="M 141,65 C 145,61 149,61 153,65" />
                {/* Row 3 */}
                <path d="M 50,55 C 54,51 58,51 62,55 M 62,55 C 66,51 70,51 74,55 M 74,55 C 78,51 82,51 86,55 M 86,55 C 90,51 94,51 98,55" />
                <path d="M 98,55 C 102,51 106,51 110,55 M 110,55 C 114,51 118,51 122,55 M 122,55 C 126,51 130,51 134,55" />
              </g>

              {/* Window left (With cozy curtains & soft warm glow) */}
              <rect 
                x="55" 
                y="105" 
                width="22" 
                height="22" 
                fill={timeOfDay === 'night' ? '#FEF08A' : '#ffffff'} 
                className="sketch-element transition-colors duration-[1500ms]" 
                style={{ filter: timeOfDay === 'night' ? 'drop-shadow(0 0 6px rgba(253,224,71,0.65))' : 'none' }}
              />
              <line x1="66" y1="105" x2="66" y2="127" />
              <line x1="55" y1="116" x2="77" y2="116" />
              {/* Curtains */}
              <path d="M 55,105 Q 61,116 55,127 L 55,105" fill="#FCA5A5" stroke="currentColor" strokeWidth="0.8" />
              <path d="M 77,105 Q 71,116 77,127 L 77,105" fill="#FCA5A5" stroke="currentColor" strokeWidth="0.8" />

              {/* Window right (Silhouette of Urwa working/moving inside!) */}
              <rect 
                x="123" 
                y="105" 
                width="22" 
                height="22" 
                fill={timeOfDay === 'night' ? '#FEF08A' : '#ffffff'} 
                className="sketch-element transition-colors duration-[1500ms]" 
                style={{ filter: timeOfDay === 'night' ? 'drop-shadow(0 0 6px rgba(253,224,71,0.65))' : 'none' }}
              />
              <line x1="134" y1="105" x2="134" y2="127" />
              {/* Little moving silhouette inside at night */}
              {timeOfDay === 'night' && (
                <g className="sketch-element opacity-70 animate-[float_4s_infinite_ease-in-out]">
                  {/* Person head and desk silhouette */}
                  <circle cx="131" cy="118" r="3.2" fill="#1C1917" />
                  <path d="M 125,127 C 127,122 135,122 137,127" fill="#1C1917" />
                </g>
              )}
              
              {/* Illustrated Flower Pots under right window */}
              <rect x="120" y="129" width="28" height="4" fill="#E5D5C5" stroke="currentColor" strokeWidth="1.2" className="sketch-element" />
              <path d="M 122,129 C 121,123 129,123 131,127 C 134,121 144,124 146,129 Z" fill="#4ADE80" className="sketch-element" />
              {/* Flower blossoms inside pots */}
              <circle cx="125" cy="123" r="1.5" fill="#EF4444" />
              <circle cx="131" cy="122" r="1.5" fill="#F43F5E" />
              <circle cx="138" cy="123" r="1.5" fill="#3B82F6" />
              <circle cx="143" cy="124" r="1.5" fill="#F59E0B" />

              {/* SLEEPING CAT THAT TRACKS MOUSE EYE POSITION ON HOVER */}
              <g onClick={handleCatClick} className="cursor-none group/cat interactive-obj">
                {/* Cat main sleeping body with gentle breathing animation */}
                <motion.ellipse 
                  cx="60" 
                  cy="175" 
                  rx="10" 
                  animate={{ ry: [6.3, 6.7, 6.3] }}
                  transition={{ repeat: Infinity, duration: 4.0, ease: 'easeInOut' }}
                  fill={timeOfDay === 'night' ? '#475569' : '#FDBA74'} 
                  className="sketch-element transition-colors duration-[1500ms]" 
                />
                
                {/* Tail wiggles & sways, remaining attached to the body */}
                <motion.g
                  style={{ transformOrigin: '50px 176px' }}
                  animate={{ 
                    rotate: isCatAsleep 
                      ? [-2.5, 2.5, -2.5] // Slow breathing sync sway
                      : [-12, 12, -12] // Playful active wag
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: isCatAsleep ? 3.6 : 1.3, 
                    ease: 'easeInOut' 
                  }}
                >
                  <path 
                    d="M 50,176 Q 44,171 47,166" 
                    stroke="currentColor" 
                    strokeWidth="1.6" 
                    fill="none"
                    className="sketch-element" 
                  />
                </motion.g>
                
                {/* Cat Head */}
                <circle 
                  cx="68" 
                  cy="170" 
                  r="5.5" 
                  fill={timeOfDay === 'night' ? '#475569' : '#FDBA74'} 
                  className="sketch-element transition-colors duration-[1500ms]" 
                />
                {/* Ears with animated twitching */}
                <motion.polygon 
                  points="64,166 66.5,161 68.5,166" 
                  fill={timeOfDay === 'night' ? '#334155' : '#E05A1A'} 
                  stroke="currentColor" 
                  strokeWidth="0.8" 
                  animate={isEarTwitching ? { rotate: [-12, 12, -8, 0] } : {}}
                  style={{ transformOrigin: '66px 166px' }}
                />
                <motion.polygon 
                  points="68.5,166 71,161 73,166" 
                  fill={timeOfDay === 'night' ? '#334155' : '#E05A1A'} 
                  stroke="currentColor" 
                  strokeWidth="0.8" 
                  animate={isEarTwitching ? { rotate: [12, -12, 8, 0] } : {}}
                  style={{ transformOrigin: '71px 166px' }}
                />

                {/* Closed Eyes when sleeping OR when blinking */}
                {(isCatAsleep || isBlinking) ? (
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <path d="M 64.5,169.5 Q 65.5,171 66.5,169.5" />
                    <path d="M 69.5,169.5 Q 70.5,171 71.5,169.5" />
                  </g>
                ) : (
                  // Open eyes smoothly tracking cursor within natural socket limits
                  <g fill="#000">
                    {/* Left Eye */}
                    <circle cx="65.5" cy="169.5" r="1.5" fill="#fff" stroke="currentColor" strokeWidth="0.5" />
                    <motion.circle 
                      animate={{ 
                        cx: 65.5 + parallax.x * 0.5, 
                        cy: 169.5 + parallax.y * 0.4 
                      }} 
                      transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                      r="0.8" 
                    />

                    {/* Right Eye */}
                    <circle cx="70.5" cy="169.5" r="1.5" fill="#fff" stroke="currentColor" strokeWidth="0.5" />
                    <motion.circle 
                      animate={{ 
                        cx: 70.5 + parallax.x * 0.5, 
                        cy: 169.5 + parallax.y * 0.4 
                      }} 
                      transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                      r="0.8" 
                    />
                  </g>
                )}
              </g>

              {/* Cozy background doorway inside, revealed when the door swings open */}
              <rect x="88" y="110" width="30" height="75" fill="#1C1917" className="sketch-element" />
              <rect
                x="88"
                y="110"
                width="30"
                height="75"
                fill="#FEF08A" // Warm cozy golden light glow leaks
                opacity={isDoorOpen ? 0.95 : 0}
                className="transition-opacity duration-1000 sketch-element"
              />

              {/* Soft warm glow behind the door on hover */}
              <motion.rect
                x="85"
                y="107"
                width="36"
                height="81"
                rx="3"
                fill="#FBBF24"
                filter="url(#doorGlowFilter)"
                initial={{ opacity: 0 }}
                animate={isDoorHovered && !isDoorOpen ? { opacity: 0.35 } : { opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none"
              />

              {/* Warm spilling light beam onto the ground */}
              <AnimatePresence>
                {isDoorOpen && (
                  <motion.polygon
                    points="88,185 118,185 150,200 56,200"
                    fill="url(#doorLightSpill)"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0, 0.9, 0.85], scaleY: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ transformOrigin: '103px 185px' }}
                    transition={{ duration: 1.4, ease: 'easeOut', delay: 0.15 }}
                  />
                )}
              </AnimatePresence>

              {/* INTERACTIVE DOOR (The Portal) */}
              <motion.g
                onMouseEnter={() => {
                  setIsDoorHovered(true);
                  setIsCatAsleep(false); // Cat wakes up when someone approaches the door!
                }}
                onMouseLeave={() => {
                  setIsDoorHovered(false);
                  setTimeout(() => setIsCatAsleep(true), 6000); // Cat falls back asleep
                }}
                onClick={handleDoorClick}
                className="cursor-none group/door interactive-obj"
                style={{
                  transformOrigin: '118px 110px',
                  transformStyle: 'preserve-3d',
                }}
                animate={
                  isDoorOpen 
                    ? { rotateY: -80, x: 0 } 
                    : isKnocking 
                      ? { x: [0, -1.5, 1.5, -1.5, 1.5, 0] } 
                      : { rotateY: 0, x: 0 }
                }
                transition={
                  isDoorOpen 
                    ? { duration: 1.4, ease: [0.25, 1, 0.5, 1] } 
                    : isKnocking 
                      ? { duration: 0.4 } 
                      : { duration: 0.3 }
                }
              >
                {/* Door Frame wood panels */}
                <rect
                  x="88"
                  y="110"
                  width="30"
                  height="75"
                  fill={isDoorHovered ? '#B45309' : '#FAF6EE'} // Golden brown Ghibli wood
                  className="sketch-element transition-colors duration-500"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />

                {/* Wood vertical planks layout lines */}
                <line x1="94" y1="110" x2="94" y2="185" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="103" y1="110" x2="103" y2="185" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="112" y1="110" x2="112" y2="185" strokeWidth="0.8" strokeDasharray="3 3" />

                {/* Metallic door handle knob with physical rotation */}
                <circle
                  cx="93"
                  cy="148"
                  r="2.5"
                  fill={isDoorHovered ? '#FBBF24' : '#E5E5E5'} // Glowing brass knob
                  className="sketch-element transition-colors duration-500"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  style={{
                    transformOrigin: '93px 148px',
                    transform: isKnobRotating ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                />

                {/* Mail slot */}
                <rect x="94" y="165" width="12" height="3.5" fill="#E5E5E5" className="sketch-element" stroke="currentColor" strokeWidth="0.8" />

                {/* Concentric visual wood wood-knock ripples centered on the door */}
                {isKnocking && (
                  <g stroke="#EAB308" strokeWidth="1" fill="none" className="pointer-events-none">
                    <circle cx="103" cy="148" r="8" className="animate-ping" style={{ animationDuration: '0.6s' }} />
                    <circle cx="103" cy="148" r="14" className="animate-ping" style={{ animationDuration: '0.8s', animationDelay: '0.15s' }} />
                  </g>
                )}
              </motion.g>
            </svg>

            {/* Absolute interactive label over the Door */}
            {isDoorHovered && !isDoorOpen && (
              <div className="absolute top-[132px] left-1/2 -translate-x-1/2 bg-neutral-900 text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md shadow border border-neutral-700 animate-bounce pointer-events-none flex items-center gap-2 z-20">
                Knock & Enter <ArrowRight className="w-2.5 h-2.5" />
              </div>
            )}
          </div>
        </div>

      </motion.div>

      {/* Cat Meow Speech Bubble */}
      <AnimatePresence>
        {catSpeechBubble && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-28 left-[45%] bg-white border border-neutral-800 rounded px-3 py-2 text-[10px] font-mono shadow-md z-30 max-w-[180px] text-center"
          >
            {catSpeechBubble}
            {/* arrow down */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-neutral-800 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAILBOX & LETTER POPUP COMPONENT (The full paper letter experience!) */}
      <div className="absolute bottom-8 left-8 md:left-24 z-20 select-none">
        <button
          onClick={() => {
            playLocalSound('paper');
            setIsMailboxOpen(!isMailboxOpen);
          }}
          className="relative block text-left bg-transparent border-none outline-none cursor-none interactive-obj group"
        >
          <svg className="w-16 h-20 text-neutral-800 hover:text-indigo-600 transition-colors" viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeWidth="1.8">
            {/* Stand */}
            <path d="M 30,50 L 30,80" className="sketch-element" />
            {/* Mailbox body */}
            <path d="M 15,50 L 45,50 L 45,25 C 45,15 15,15 15,25 Z" className="sketch-element" fill={isMailboxOpen ? '#FEF3C7' : '#FAF6EE'} />
            {/* Red flag */}
            <path d="M 45,35 L 55,35 L 55,20" className="sketch-element stroke-rose-500 transition-colors" strokeWidth="2.5" />
          </svg>
          <div className="absolute -top-6 left-0 text-[10px] font-mono text-neutral-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/80 px-2 py-0.5 rounded border border-neutral-200">
            {isMailboxOpen ? 'Close Letterbox' : 'Read Letterbox'}
          </div>
        </button>

        {/* Sealed Envelope floats out of Mailbox */}
        <AnimatePresence>
          {isMailboxOpen && !isLetterOpen && (
            <motion.div
              initial={{ scale: 0, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: -24, opacity: 1 }}
              exit={{ scale: 0, y: 15, opacity: 0 }}
              onClick={() => {
                playLocalSound('paper');
                setIsLetterOpen(true);
              }}
              className="absolute -top-12 left-10 p-2 bg-amber-50 border border-neutral-800 shadow-lg cursor-none rounded flex items-center gap-2 interactive-obj hover:scale-105 active:scale-95 z-30 animate-[float-gentle_3s_infinite_ease-in-out]"
            >
              <Mail className="w-5 h-5 text-indigo-500 animate-pulse" />
              <div className="text-[10px] font-serif font-bold text-neutral-800 whitespace-nowrap">
                You have 1 Letter ✉️
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FULL-SCREEN ILLUSTRATED LETTER MODAL (Aesthetic, hand-drawn paper envelope with PK stamps & interactive form!) */}
      <AnimatePresence>
        {isLetterOpen && (
          <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-2xl bg-[#FBF9F4] border-2 border-neutral-800 rounded-lg shadow-2xl p-6 md:p-10 text-neutral-800 flex flex-col md:flex-row gap-8 sketch-element"
            >
              {/* Close Button styled like a stamp corner */}
              <button
                onClick={() => {
                  playLocalSound('paper');
                  setIsLetterOpen(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-full border border-neutral-300 hover:border-red-500 hover:bg-red-50 text-neutral-500 hover:text-red-600 transition-all cursor-none z-10 interactive-obj"
              >
                <X className="w-5 h-5" />
              </button>

              {/* LEFT COLUMN: The Letter / Bio details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-indigo-600" />
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-neutral-900">A Pencil Message</h3>
                  </div>
                  <div className="font-serif text-sm text-neutral-700 leading-relaxed italic border-l-2 border-indigo-500/30 pl-4 space-y-3">
                    <p>
                      "Hello adventurer! I am Urwah Imtiaz, a dual-mind AI student and interface designer."
                    </p>
                    <p>
                      "Welcome to my storybook world. I merge mathematical deep learning models with hand-sketched user experiences and analytics systems."
                    </p>
                    <p>
                      "Leave your details on this notebook page to fly a paper airplane directly to my inbox, or click the door to explore the studio labs!"
                    </p>
                  </div>
                </div>

                {/* Sender card detail */}
                <div className="mt-6 pt-4 border-t border-dashed border-neutral-300 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-neutral-800 bg-amber-100 flex items-center justify-center font-serif font-bold text-neutral-800">
                    UI
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-900">Urwah Imtiaz</h4>
                    <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Lahore, Pakistan 🇵🇰</p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: The Interactive Contact Form styled as a parcel card */}
              <div className="flex-1 bg-[#FAF6EE] border border-neutral-300 p-6 rounded-md shadow-inner flex flex-col justify-between relative overflow-hidden">
                
                {/* Pakistan hand-sketched postmark stamp */}
                <div className="absolute top-4 right-4 w-12 h-12 border-2 border-dashed border-red-400 rounded-full flex flex-col items-center justify-center text-[7px] font-mono text-red-500 rotate-12 pointer-events-none select-none">
                  <span>LAHORE</span>
                  <span>19.07.26</span>
                </div>

                {/* Flying Paper Airplane animation asset overlay */}
                {isFlyingAirplane && (
                  <div className="absolute inset-0 bg-[#FAF6EE]/90 z-20 flex items-center justify-center pointer-events-none">
                    <div className="text-center animate-paper-airplane">
                      <Send className="w-10 h-10 text-indigo-600 mx-auto transform rotate-[-45deg]" />
                      <div className="text-xs font-mono font-bold text-indigo-600 mt-2">Flying to Urwah... ✈️</div>
                    </div>
                  </div>
                )}

                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="text-center mb-2">
                      <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">Interactive Mail</span>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FBF9F4] border border-neutral-300 rounded font-serif text-xs text-neutral-800 focus:outline-none focus:border-indigo-500 hover:border-neutral-400 transition-colors cursor-none"
                        placeholder="e.g. Marie Currie"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Your Email (Optional)</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FBF9F4] border border-neutral-300 rounded font-serif text-xs text-neutral-800 focus:outline-none focus:border-indigo-500 hover:border-neutral-400 transition-colors cursor-none"
                        placeholder="e.g. marie@labs.com"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Message</label>
                      <textarea
                        required
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FBF9F4] border border-neutral-300 rounded font-serif text-xs text-neutral-800 focus:outline-none focus:border-indigo-500 hover:border-neutral-400 transition-colors cursor-none resize-none"
                        placeholder="Type your hand-drawn note..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-neutral-900 hover:bg-indigo-600 text-white font-mono text-[10px] uppercase tracking-wider font-bold rounded shadow transition-all hover:scale-[1.02] active:scale-[0.98] cursor-none flex items-center justify-center gap-2 interactive-obj"
                    >
                      <Send className="w-3 h-3" /> Fly Paper Airplane
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto text-green-600 animate-bounce">
                      ✈️
                    </div>
                    <h4 className="font-serif text-lg font-bold text-neutral-900">Message Delivered!</h4>
                    <p className="font-serif text-xs text-neutral-600 leading-relaxed italic">
                      "My paper airplane has landed safely on Urwah's Lahore desk. He will read it with a hot cup of Chai! Thank you so much."
                    </p>
                    <button
                      onClick={() => {
                        playLocalSound('paper');
                        setFormSubmitted(false);
                      }}
                      className="mt-4 px-4 py-1.5 border border-neutral-300 rounded font-mono text-[9px] uppercase tracking-widest hover:border-indigo-500 hover:text-indigo-600 transition-colors cursor-none interactive-obj"
                    >
                      Write Another Letter
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

interface ChimneySmokeProps {
  timeOfDay: 'morning' | 'sunset' | 'night';
}

function ChimneySmoke({ timeOfDay }: ChimneySmokeProps) {
  const [smokeRings, setSmokeRings] = useState<SmokeRing[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSmokeRings((prev) => [
        ...prev
          .map((ring) => ({
            ...ring,
            y: ring.y - 0.8,
            x: ring.x + Math.sin(ring.y / 15) * 0.4,
            size: ring.size + 0.12,
            alpha: ring.alpha - 0.012,
          }))
          .filter((ring) => ring.alpha > 0),
        {
          id: Math.random(),
          x: 147, // Chimney top coordinate inside SVG
          y: 45,
          size: 2.5,
          alpha: 0.7,
        },
      ]);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <g className="pointer-events-none">
      {smokeRings.map((ring) => (
        <circle
          key={ring.id}
          cx={ring.x}
          cy={ring.y}
          r={ring.size}
          fill="none"
          stroke={timeOfDay === 'night' ? '#94A3B8' : '#78716C'}
          strokeWidth="0.8"
          opacity={ring.alpha}
          className="sketch-element"
        />
      ))}
    </g>
  );
}

// Separate component for Flower with hover sway
interface FlowerProps {
  key?: any;
  x: number;
  y: number;
  color: string;
  size: number;
}

function Flower({ x, y, color, size }: FlowerProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${y}px` }}
      animate={isHovered ? { rotate: [-16, 12, -8, 4, 0] } : { rotate: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-none"
    >
      {/* stem */}
      <path d={`M ${x},${y} Q ${x - 1.5},${y - 12} ${x},${y - 18}`} stroke="#15803D" strokeWidth="1" />
      {/* leaves */}
      <path d={`M ${x - 1},${y - 8} Q ${x - 5},${y - 9} ${x - 1.2},${y - 12}`} fill="#15803D" />
      <path d={`M ${x + 1},${y - 6} Q ${x + 5},${y - 7} ${x + 1.2},${y - 10}`} fill="#15803D" />
      
      {/* flower heads */}
      <circle cx={x} cy={y - 18} r={size} fill={color} className="sketch-element" />
      <circle cx={x} cy={y - 18} r={size * 0.4} fill="#FFF" />
    </motion.g>
  );
}

// Interactive & lightweight floating pollen/dust particles
function CozyAmbientParticles() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);
  
  useEffect(() => {
    // Spawn 15 randomized floating pollen spots
    const items = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1.5,
      delay: Math.random() * -12,
      duration: Math.random() * 10 + 12,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-200/25 filter blur-[0.4px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 15, 0],
            opacity: [0.15, 0.65, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Falling Ghibli leaves component matching the time of day colors
interface LeafParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speedY: number;
  speedX: number;
  spin: number;
}

function FallingLeaves({ timeOfDay }: { timeOfDay: 'morning' | 'sunset' | 'night' }) {
  const [leaves, setLeaves] = useState<LeafParticle[]>([]);

  useEffect(() => {
    const leafColors = {
      morning: ['#C8EAC6', '#A8D5A2', '#8FCB8A', '#DCFCE7'],
      sunset: ['#FBCFE8', '#F472B6', '#F9A8D4'],
      night: ['#334155', '#475569', '#1E293B'],
    };

    const interval = setInterval(() => {
      setLeaves((prev) => {
        // Update physics positions
        const activeLeaves = prev
          .map((leaf) => ({
            ...leaf,
            y: leaf.y + leaf.speedY,
            x: leaf.x + Math.sin(leaf.y / 25) * leaf.speedX,
            angle: leaf.angle + leaf.spin,
          }))
          .filter((leaf) => leaf.y < 110);

        // Try spawning a leaf if there is capacity
        if (activeLeaves.length < 10 && Math.random() < 0.2) {
          const possibleColors = leafColors[timeOfDay] || leafColors.morning;
          activeLeaves.push({
            id: Math.random(),
            x: Math.random() * 85 + 5,
            y: -8,
            size: Math.random() * 5 + 6,
            color: possibleColors[Math.floor(Math.random() * possibleColors.length)],
            angle: Math.random() * 360,
            speedY: Math.random() * 0.35 + 0.25,
            speedX: Math.random() * 0.5 + 0.15,
            spin: Math.random() * 2.5 - 1.25,
          });
        }
        return activeLeaves;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [timeOfDay]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {leaves.map((leaf) => (
        <svg
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            width: leaf.size,
            height: leaf.size,
            transform: `rotate(${leaf.angle}deg)`,
            color: leaf.color,
            opacity: 0.7,
          }}
          viewBox="0 0 10 10"
          fill="currentColor"
        >
          <path d="M5,0 C2,3 2,7 5,10 C8,7 8,3 5,0 Z" />
        </svg>
      ))}
    </div>
  );
}

// Flapping birds flying in the background sky
function FlyingBirdsSky({ timeOfDay }: { timeOfDay: 'morning' | 'sunset' | 'night' }) {
  if (timeOfDay === 'night') return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* High slow soaring bird 1 */}
      <motion.div
        className="absolute opacity-25"
        initial={{ x: '-15vw', y: '22%' }}
        animate={{ x: '115vw', y: ['22%', '18%', '24%', '22%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <svg className="w-5 h-5 text-neutral-800" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <g className="animate-[flap_0.2s_infinite_ease-in-out]">
            <path d="M 2,10 Q 6,2 10,10 Q 14,2 18,10" />
          </g>
        </svg>
      </motion.div>

      {/* Far soaring bird 2 */}
      <motion.div
        className="absolute opacity-20"
        initial={{ x: '-25vw', y: '12%' }}
        animate={{ x: '115vw', y: ['12%', '15%', '10%', '12%'] }}
        transition={{ duration: 32, delay: 5, repeat: Infinity, ease: 'linear' }}
      >
        <svg className="w-4 h-4 text-neutral-800" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <g className="animate-[flap_0.24s_infinite_ease-in-out]">
            <path d="M 2,10 Q 6,2 10,10 Q 14,2 18,10" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
