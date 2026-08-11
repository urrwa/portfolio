/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAudio } from './AudioEngine';
import { ArrowLeft, Sparkles, PenTool, CheckCircle2, ChevronRight, Layers, Wrench } from 'lucide-react';
import PencilHoverText from './PencilHoverText';

interface RoomSkillsProps {
  onBack: () => void;
}

interface ToolItem {
  name: string;
  category: string;
  icon: string;
  description: string;
  badge: string;
  color: string;
}

const TOOLBOX: ToolItem[] = [
  { name: 'Figma', category: 'UI Design & Prototyping', icon: '🎨', description: 'Auto-layout, variables, design tokens, and interactive components.', badge: 'Primary Tool', color: '#ec4899' },
  { name: 'React', category: 'Component UI', icon: '⚛️', description: 'Building modular, stateful UI components and typed props.', badge: 'Frontend Framework', color: '#06b6d4' },
  { name: 'Next.js', category: 'App Router', icon: '▲', description: 'Routing, layouts and image handling for production builds.', badge: 'Framework', color: '#111827' },
  { name: 'TypeScript', category: 'Typed Logic', icon: '🔷', description: 'Typed components, props and state so refactors stay safe.', badge: 'Language', color: '#3178c6' },
  { name: 'Tailwind CSS', category: 'Styling & Grids', icon: '🎯', description: 'Utility styling, flexbox, CSS grid and responsive breakpoints.', badge: 'Layout Engine', color: '#0ea5e9' },
  { name: 'GSAP', category: 'ScrollTrigger Motion', icon: '⚡', description: 'Pinned sections and scroll-driven timelines.', badge: 'Motion', color: '#22c55e' },
  { name: 'Framer Motion', category: 'React Animation', icon: '✨', description: 'Component transitions, gestures and layout animation.', badge: 'Motion', color: '#8b5cf6' },
  { name: 'Three.js', category: 'WebGL Scenes', icon: '🌐', description: 'Particle fields, lighting and post-processing in the browser.', badge: 'WebGL', color: '#f59e0b' },
  { name: 'Vite', category: 'Build Tooling', icon: '⚙️', description: 'Fast dev server and bundling for React and TypeScript apps.', badge: 'Tooling', color: '#a855f7' },
  { name: 'VS Code', category: 'Frontend Code', icon: '💻', description: 'Where the HTML, CSS and application structure gets written.', badge: 'Code Workspace', color: '#2563eb' },
  { name: 'Illustrator', category: 'Vector Art', icon: '✒️', description: 'Vector graphics, logo studies and icon sets.', badge: 'Vector System', color: '#f97316' },
  { name: 'Photoshop', category: 'Raster & Edit', icon: '🖼️', description: 'Image editing, textures and visual assets.', badge: 'Visual Art', color: '#0891b2' }
];

interface ProcessStep {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  deliverables: string[];
  color: string;
}

const DESIGN_PROCESS: ProcessStep[] = [
  {
    id: 'discover',
    title: '1. Brief',
    subtitle: 'Framing My Own Problem',
    desc: 'Every project starts as a brief I write myself: what the site has to say, and what the constraint is.',
    deliverables: ['Self-Set Brief', 'Reference Board', 'Constraints'],
    color: '#6366f1'
  },
  {
    id: 'research',
    title: '2. Direction',
    subtitle: 'Visual & Motion Language',
    desc: 'Collecting references, then settling the type scale, palette and the kind of motion the page will use.',
    deliverables: ['Moodboard', 'Type Scale', 'Palette'],
    color: '#ec4899'
  },
  {
    id: 'userflows',
    title: '3. Structure',
    subtitle: 'Sections & Scroll Order',
    desc: 'Sketching the sections on paper, then blocking them out in Figma to decide the scroll order.',
    deliverables: ['Paper Sketches', 'Low-Fi Figma Grids', 'Scroll Storyboard'],
    color: '#06b6d4'
  },
  {
    id: 'prototype',
    title: '4. Design',
    subtitle: 'Components & States',
    desc: 'Building the components, spacing system and states in Figma before any code is written.',
    deliverables: ['High-Fi Components', 'Design Tokens', 'Interactive Prototype'],
    color: '#8b5cf6'
  },
  {
    id: 'test',
    title: '5. Build',
    subtitle: 'React, TypeScript & Motion',
    desc: 'Implementing the design myself: typed components, then GSAP or Framer Motion timelines tied to scroll.',
    deliverables: ['Typed Components', 'Scroll Timelines', 'Responsive Layout'],
    color: '#f59e0b'
  },
  {
    id: 'launch',
    title: '6. Ship',
    subtitle: 'Deploy & Refine',
    desc: 'Deploying to Vercel, then checking performance, contrast and behaviour on smaller screens.',
    deliverables: ['Vercel Deploy', 'Contrast Checks', 'Iteration Notes'],
    color: '#10b981'
  }
];

export default function RoomSkills({ onBack }: RoomSkillsProps) {
  const { playClick, playScratch } = useAudio();
  const [selectedProcess, setSelectedProcess] = useState<ProcessStep>(DESIGN_PROCESS[0]);
  const [hoveredTool, setHoveredTool] = useState<ToolItem | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-[#F9F8F6] p-4 sm:p-6 md:p-10 flex flex-col justify-between overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-neutral-900/[0.012] pointer-events-none mix-blend-overlay bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Header controls */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 border-b border-dashed border-neutral-300 pb-4 select-none">
        <button
          onClick={() => {
            playClick();
            onBack();
          }}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-indigo-600 cursor-none interactive-obj group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>
            <PencilHoverText strokeColor="#4f46e5" underlineHeight={4}>
              Go Back to Hub
            </PencilHoverText>
          </span>
        </button>
        <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
          <Wrench className="w-4 h-4 text-indigo-500" />
          <span>🎨 Design Studio & Workspace</span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="w-full max-w-6xl mx-auto my-auto z-10 flex flex-col gap-10 mt-6 select-none">
        
        {/* SECTION 1: TOOLBOX */}
        <div className="bg-white border-2 border-neutral-800 rounded-xl p-6 sm:p-8 shadow-[6px_6px_0px_rgba(28,28,28,0.15)] sketch-element">
          <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <PenTool className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-800">Studio Toolbox</h3>
                <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                  Software, languages, and libraries I actually use
                </p>
              </div>
            </div>
            <span className="font-mono text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full font-bold">
              12 Primary Tools
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TOOLBOX.map((tool, index) => {
              const isHovered = hoveredTool?.name === tool.name;
              return (
                <div
                  key={index}
                  onMouseEnter={() => {
                    setHoveredTool(tool);
                    playScratch();
                  }}
                  onMouseLeave={() => setHoveredTool(null)}
                  style={{
                    borderColor: isHovered ? tool.color : '#e5e7eb',
                    backgroundColor: isHovered ? `${tool.color}08` : '#ffffff',
                  }}
                  className="p-4 border-2 border-neutral-200 rounded-xl transition-all duration-200 hover:shadow-[4px_4px_0px_rgba(28,28,28,0.1)] cursor-none interactive-obj flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{tool.icon}</span>
                      <span
                        style={{ color: tool.color, backgroundColor: `${tool.color}15`, borderColor: `${tool.color}40` }}
                        className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded"
                      >
                        {tool.badge}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-neutral-800">{tool.name}</h4>
                    <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">{tool.category}</p>
                    <p className="font-serif text-xs text-neutral-600 mt-2 leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: DESIGN PROCESS PIPELINE */}
        <div className="bg-white border-2 border-neutral-800 rounded-xl p-6 sm:p-8 shadow-[6px_6px_0px_rgba(28,28,28,0.15)] sketch-element">
          <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-rose-500" />
              <div>
                <h3 className="font-serif text-2xl font-bold text-neutral-800">Design & Build Process</h3>
                <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                  How each of my concept projects goes from brief to deployed site
                </p>
              </div>
            </div>
          </div>

          {/* Flowchart Horizontal Pipeline */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-8 p-3 bg-neutral-50 border border-neutral-200 rounded-xl overflow-x-auto">
            {DESIGN_PROCESS.map((step, idx) => {
              const isActive = selectedProcess.id === step.id;
              return (
                <div key={step.id} className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      playClick();
                      setSelectedProcess(step);
                    }}
                    style={{
                      backgroundColor: isActive ? step.color : '#ffffff',
                      color: isActive ? '#ffffff' : '#262626',
                      borderColor: isActive ? step.color : '#d4d4d4',
                    }}
                    className={`px-3.5 py-2 rounded-lg border font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-none interactive-obj ${
                      isActive ? 'shadow-[3px_3px_0px_rgba(28,28,28,1)]' : 'hover:border-neutral-500'
                    }`}
                  >
                    {step.title}
                  </button>
                  {idx < DESIGN_PROCESS.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Process Step Detailed Inspector */}
          <div
            style={{ borderColor: selectedProcess.color }}
            className="p-6 bg-neutral-50/50 border-2 rounded-xl animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
              <div>
                <span
                  style={{ color: selectedProcess.color }}
                  className="font-mono text-xs font-bold uppercase tracking-widest"
                >
                  Phase Inspector
                </span>
                <h4 className="font-serif text-2xl font-bold text-neutral-800 mt-0.5">{selectedProcess.title}</h4>
                <p className="font-serif text-xs text-neutral-500 italic mt-0.5">{selectedProcess.subtitle}</p>
              </div>
              <Sparkles style={{ color: selectedProcess.color }} className="w-6 h-6 animate-pulse" />
            </div>

            <p className="font-serif text-neutral-700 text-sm md:text-base leading-relaxed mb-6">
              {selectedProcess.desc}
            </p>

            <div>
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-2">Core Phase Deliverables:</p>
              <div className="flex flex-wrap gap-2.5">
                {selectedProcess.deliverables.map((del, i) => (
                  <span
                    key={i}
                    style={{ backgroundColor: `${selectedProcess.color}15`, color: selectedProcess.color, borderColor: `${selectedProcess.color}40` }}
                    className="font-mono text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{del}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full text-center text-neutral-400 font-mono text-[10px] mt-8 select-none">
        Urwah's Studio • Figma for design, React and TypeScript for the build
      </div>
    </div>
  );
}
