/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { useAudio } from './AudioEngine';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  User,
  LayoutGrid,
  Cpu,
  BrainCircuit,
  History,
  Mail,
  Compass,
} from 'lucide-react';
import PencilHoverText from './PencilHoverText';
import urwahCharacter from '../assets/images/urwah_whatsapp_character.png';

interface RoomWorkspaceProps {
  onNavigate: (room: 'about' | 'projects' | 'skills' | 'playground' | 'experience' | 'contact') => void;
}

export default function RoomWorkspace({ onNavigate }: RoomWorkspaceProps) {
  const { playClick, playScratch, playWhoosh } = useAudio();
  const [hoveredDoor, setHoveredDoor] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [walkState, setWalkState] = useState<'walking' | 'arrived'>('walking');
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fullIntroduction = "Hi! I'm Urwah Imtiaz, a dedicated UI/UX Designer, Web Designer, and Product Designer. Welcome to my hand-drawn workspace! Explore my specialized design studios, high-fidelity portfolio gallery, and creative sandboxes.";

  // Play entrance whoosh
  useEffect(() => {
    playWhoosh();
    const timer = setTimeout(() => {
      setWalkState('arrived');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullIntroduction.charAt(index));
      index++;
      if (index >= fullIntroduction.length) {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // Handle subtle head/eye movement relative to mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const doors = [
    { id: 'about', label: 'About Room', icon: <User className="w-5 h-5 text-indigo-500" />, desc: 'Step inside and discover my story', color: 'hover:bg-indigo-50/80', stroke: 'group-hover/door:stroke-indigo-500' },
    { id: 'projects', label: 'Projects Gallery', icon: <LayoutGrid className="w-5 h-5 text-emerald-500" />, desc: 'Case studies & visual work', color: 'hover:bg-emerald-50/80', stroke: 'group-hover/door:stroke-emerald-500' },
    { id: 'skills', label: 'Design Studio', icon: <Cpu className="w-5 h-5 text-amber-500" />, desc: 'Design capabilities & methods', color: 'hover:bg-amber-50/80', stroke: 'group-hover/door:stroke-amber-500' },
    { id: 'playground', label: 'Design Sandbox', icon: <BrainCircuit className="w-5 h-5 text-pink-500" />, desc: 'Generative layouts & concepts', color: 'hover:bg-pink-50/80', stroke: 'group-hover/door:stroke-pink-500' },
    { id: 'experience', label: 'Experience Space', icon: <History className="w-5 h-5 text-sky-500" />, desc: 'Professional timeline', color: 'hover:bg-sky-50/80', stroke: 'group-hover/door:stroke-sky-500' },
    { id: 'contact', label: 'Cafe & Contact', icon: <Mail className="w-5 h-5 text-rose-500" />, desc: 'Typewriter paper airplane', color: 'hover:bg-rose-50/80', stroke: 'group-hover/door:stroke-rose-500' },
  ];

  const handleDoorClick = (roomId: any) => {
    playClick();
    onNavigate(roomId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F9F8F6] p-6 md:p-12 flex flex-col items-center justify-between overflow-hidden"
    >
      {/* Background paper grid */}
      <div className="absolute inset-0 bg-neutral-950/[0.012] pointer-events-none mix-blend-overlay bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Header section (Minimalist) */}
      <div className="w-full max-w-6xl flex items-center justify-between z-10 border-b border-dashed border-neutral-300 pb-4 select-none">
        <div className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-neutral-800 animate-spin [animation-duration:12s]" />
          <div>
            <h2 className="font-serif text-xl font-bold tracking-tight text-neutral-800">
              <PencilHoverText strokeColor="#1e1b4b" smudgeColor="rgba(28, 25, 23, 0.2)">
                The Workspace
              </PencilHoverText>
            </h2>
            <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Interactive Central Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] text-neutral-500">
          <span>🇵🇰 Faisalabad, PK</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 my-auto z-10">
        
        {/* Left Side: speech bubble + centered character */}
        <div className="relative flex-1 flex flex-col items-center justify-center">
          
          {/* Handwritten speech bubble */}
          <div className="relative max-w-md w-full bg-white border-2 border-neutral-800 p-5 rounded-xl shadow-[6px_6px_0px_rgba(28,28,28,0.15)] mb-1 sketch-element select-none z-10">
            {/* Arrow */}
            <div className="absolute bottom-[-10px] left-[45%] w-4 h-4 bg-white border-r-2 border-b-2 border-neutral-800 transform rotate-45" />
            
            <div className="flex items-center gap-2 mb-2 border-b border-dashed border-neutral-200 pb-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
              <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Urwa's Avatar</span>
            </div>
            
            <p className="font-serif text-neutral-800 text-sm md:text-base leading-relaxed h-28 md:h-24 overflow-y-auto">
              {typedText}
              <span className="animate-pulse inline-block w-1.5 h-4 bg-indigo-600 ml-1 font-bold" />
            </p>
          </div>

          {/* Character frame crops PNG padding so she sits centered under the bubble */}
          <div className="relative w-80 md:w-[24rem] h-[340px] md:h-[380px] -mt-1 select-none flex items-center justify-center overflow-visible">
            <motion.div
              className="absolute bottom-3 w-36 h-3 bg-neutral-900/15 rounded-full blur-[2px]"
              animate={
                walkState === 'walking'
                  ? {
                      scaleX: [0.8, 1.1, 0.8, 1.1, 0.8, 1.1, 1],
                      opacity: [0.35, 0.65, 0.35, 0.65, 0.35, 0.65, 0.55],
                    }
                  : {
                      scaleX: [1, 1.08, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }
              }
              transition={
                walkState === 'walking'
                  ? { duration: 2.5, ease: 'easeInOut' }
                  : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
              }
            />

            <motion.div
              className="relative w-full h-full cursor-none flex items-center justify-center overflow-hidden"
              animate={
                walkState === 'walking'
                  ? {
                      x: [-260, 0],
                      y: [6, -6, 6, -6, 6, -6, 0],
                      rotate: [-3, 3, -3, 3, -3, 3, 0],
                    }
                  : {
                      y: [0, -7, 0],
                    }
              }
              transition={
                walkState === 'walking'
                  ? { duration: 2.5, ease: 'easeInOut' }
                  : {
                      y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
                    }
              }
              onMouseEnter={() => {
                setIsAvatarHovered(true);
                playScratch();
              }}
              onMouseLeave={() => setIsAvatarHovered(false)}
            >
              {/* Scale crops empty top/bottom padding inside the source image */}
              <motion.div
                className="relative h-[160%] w-auto aspect-[9/16] max-w-none"
                animate={{ scale: isAvatarHovered ? 1.03 : 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                {/* Body layer — head masked out so the moving head doesn’t double */}
                <img
                  src={urwahCharacter}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-contain pointer-events-none drop-shadow-sm"
                  style={{
                    WebkitMaskImage:
                      'radial-gradient(ellipse 22% 14% at 50% 38%, transparent 68%, #000 71%)',
                    maskImage:
                      'radial-gradient(ellipse 22% 14% at 50% 38%, transparent 68%, #000 71%)',
                  }}
                />

                {/* Head layer — gentle idle tilt + follows cursor (like before) */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: 'ellipse(22% 14% at 50% 38%)',
                    transformOrigin: '50% 42%',
                  }}
                  animate={
                    walkState === 'arrived'
                      ? {
                          rotate: isAvatarHovered ? [-9, 9, -9] : [-5, 5, -5],
                          x: mousePos.x * 14,
                          y: mousePos.y * 9,
                        }
                      : { rotate: 0, x: 0, y: 0 }
                  }
                  transition={
                    walkState === 'arrived'
                      ? {
                          rotate: { repeat: Infinity, duration: 3.4, ease: 'easeInOut' },
                          x: { type: 'spring', stiffness: 140, damping: 16 },
                          y: { type: 'spring', stiffness: 140, damping: 16 },
                        }
                      : { duration: 0.2 }
                  }
                >
                  <img
                    src={urwahCharacter}
                    alt="Urwah Imtiaz"
                    draggable={false}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {walkState === 'arrived' && (
                  <>
                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, x: -110, y: -40 }}
                      className="absolute bg-white border border-neutral-800 px-2.5 py-0.5 rounded-full shadow-[3px_3px_0px_rgba(28,28,28,1)] flex items-center gap-1 font-mono text-[8px] font-bold text-neutral-800 uppercase"
                      whileHover={{ scale: 1.1, rotate: -4 }}
                    >
                      <span>👋 Hello!</span>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, x: 110, y: 70 }}
                      className="absolute bg-white border border-neutral-800 px-2.5 py-0.5 rounded-full shadow-[3px_3px_0px_rgba(28,28,28,1)] flex items-center gap-1 font-mono text-[8px] font-bold text-neutral-800 uppercase"
                      whileHover={{ scale: 1.1, rotate: 4 }}
                    >
                      <span>👍 Thumbs Up!</span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Hand-drawn isometric sketch Doors arranged neatly */}
        <div className="flex-1 max-w-lg w-full flex flex-col gap-5 select-none">
          <div className="flex items-center gap-1.5 mb-2 font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest">
            <span>🚪 Step into My Universe</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doors.map((door) => (
              <div
                key={door.id}
                onMouseEnter={() => {
                  setHoveredDoor(door.id);
                  playScratch();
                }}
                onMouseLeave={() => setHoveredDoor(null)}
                onClick={() => handleDoorClick(door.id)}
                className={`group/door relative p-5 bg-white border-2 border-neutral-800 rounded-lg shadow-[4px_4px_0px_rgba(28,28,28,0.1)] hover:shadow-[6px_6px_0px_rgba(99,102,241,0.2)] hover:border-indigo-500 cursor-none transition-all duration-300 flex items-start gap-3.5 interactive-obj`}
              >
                {/* Interactive door drawing preview */}
                <div className="relative w-12 h-16 border border-neutral-300 rounded overflow-hidden flex items-center justify-center shrink-0 bg-neutral-50 group-hover/door:border-indigo-300 transition-colors">
                  <svg className="absolute inset-0 w-full h-full text-neutral-400" viewBox="0 0 30 50" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="3" y="5" width="24" height="40" className={`${hoveredDoor === door.id ? 'stroke-indigo-500 fill-indigo-50/50' : ''}`} />
                    <circle cx="7" cy="25" r="1" className={`${hoveredDoor === door.id ? 'fill-indigo-500' : ''}`} />
                  </svg>
                  {door.icon}
                </div>

                <div className="flex-1">
                  <h3 className="font-serif text-base font-bold text-neutral-800 group-hover/door:text-indigo-600 transition-colors">
                    <PencilHoverText active={hoveredDoor === door.id} strokeColor="#4f46e5" underlineHeight={6}>
                      {door.label}
                    </PencilHoverText>
                  </h3>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                    {door.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] text-indigo-500 mt-2.5 opacity-0 group-hover/door:opacity-100 transition-opacity">
                    Walk in →
                  </span>
                </div>

                {/* Glowing light indicator */}
                {hoveredDoor === door.id && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating interactive drawing desk at the bottom */}
      <div className="w-full max-w-6xl mt-8 border-t border-dashed border-neutral-300 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3">
          <svg className="w-12 h-10 text-neutral-400" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Sketch table lamp */}
            <path d="M 10,35 L 40,35 M 25,35 L 25,18 L 15,18 L 12,25" className="sketch-element" />
            <ellipse cx="25" cy="15" rx="6" ry="3" fill="#fff" className="sketch-element" />
          </svg>
          <p className="text-xs text-neutral-500 font-serif max-w-md italic leading-relaxed">
            "I'm Urwah—a dedicated UI/UX and Product Designer crafting beautiful, intuitive, and accessible digital experiences."
          </p>
        </div>
        <div className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
          The Sketch Dimension v2.6.0
        </div>
      </div>
    </div>
  );
}
