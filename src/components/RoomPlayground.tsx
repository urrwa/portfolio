/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { useAudio } from './AudioEngine';
import { ArrowLeft, Sparkles, BrainCircuit, RefreshCw, Send, Play, Layers, Activity, Eye, Zap, Type, Palette } from 'lucide-react';
import PencilHoverText from './PencilHoverText';

interface RoomPlaygroundProps {
  onBack: () => void;
}

interface Experiment {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  tags: string[];
  color: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    id: 'daily',
    title: 'Daily UI',
    category: 'Interface Studies',
    icon: '📅',
    description: '100-day daily UI challenge highlights: minimalist music player, bio-pay wallet, and flight ticket booking.',
    tags: ['Daily UI #001-#100', 'Mobile Layouts', 'Dark Mode'],
    color: '#10b981'
  },
  {
    id: 'anim',
    title: 'Animations',
    category: 'Motion UI',
    icon: '🎬',
    description: 'Keyframe sequence timelines, morphing SVG vector paths, and smooth page unfold transitions.',
    tags: ['Framer Motion', 'SVG Morphing', 'Timeline'],
    color: '#8b5cf6'
  },
  {
    id: 'motion',
    title: 'Motion Design',
    category: 'Visual Effects',
    icon: '🎞️',
    description: 'Looped vector art, kinetic typography reels, and paper texture video overlays.',
    tags: ['Lottie JSON', 'After Effects', 'Kinetic Type'],
    color: '#6366f1'
  },
  {
    id: 'concept',
    title: 'Concept Apps',
    category: 'Speculative UI',
    icon: '💡',
    description: 'Reimagined web interfaces for Spotify, Notion, and Tesla charging command center.',
    tags: ['Redesigns', 'Product Vision', 'Bento Grid'],
    color: '#f59e0b'
  },
  {
    id: 'micro',
    title: 'Micro Interactions',
    category: 'Interaction Design',
    icon: '✨',
    description: 'Haptic feedback buttons, fluid tab morphing, and elastic drag-and-drop state transitions.',
    tags: ['Figma Motion', 'Spring Physics', 'Tactile Buttons'],
    color: '#ec4899'
  },
  {
    id: 'typography',
    title: 'Typography',
    category: 'Editorial Layouts',
    icon: '🔤',
    description: 'Pairing display serif fonts with high-density monospace scales for optimal reading rhythm.',
    tags: ['Font Scales', 'Baseline Rhythm', 'Pairing Guides'],
    color: '#ef4444'
  },
  {
    id: 'ai',
    title: 'AI Experiments',
    category: 'Generative UI & Prompts',
    icon: '🤖',
    description: 'Testing Gemini multi-modal prompt loops, automated design token generation, and generative wireframing.',
    tags: ['Gemini API', 'Generative Tokens', 'Prompt Lab'],
    color: '#a855f7'
  },
  {
    id: '3d',
    title: '3D Explorations',
    category: 'Spatial Design',
    icon: '🧊',
    description: 'Interactive friction fields, depth maps, card tilt dynamics, and canvas particle clouds.',
    tags: ['Canvas 2D/3D', 'Card Parallax', 'Depth Field'],
    color: '#06b6d4'
  }
];

export default function RoomPlayground({ onBack }: RoomPlaygroundProps) {
  const { playClick, playScratch, playType } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeExp, setActiveExp] = useState<Experiment>(EXPERIMENTS[0]);
  const [userPrompt, setUserPrompt] = useState('design a micro-interaction animation for a bookmark button');
  const [geminiResult, setGeminiResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Interactive Particle/Node simulation for 3D Explorations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    const initNodes = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = 180;
      nodes = [];
      for (let i = 0; i < 30; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2.5 + 1.2,
        });
      }
    };

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines
      ctx.strokeStyle = activeExp.color;
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 50) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#1c1c1c';
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 40) {
          const force = (40 - dist) / 40;
          n.x += (dx / dist) * force * 3;
          n.y += (dy / dist) * force * 3;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(render);
    };

    initNodes();
    render();

    window.addEventListener('resize', initNodes);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', initNodes);
      cancelAnimationFrame(animFrameId);
    };
  }, [activeExp]);

  const handleTriggerAI = async () => {
    if (!userPrompt.trim() || isLoading) return;
    playClick();
    setIsLoading(true);
    setGeminiResult('');

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${activeExp.title}: ${userPrompt}`,
          type: 'sketch',
        }),
      });

      const data = await response.json();
      if (data.text) {
        setGeminiResult(data.text);
      } else if (data.error) {
        setGeminiResult(`Error: ${data.error}`);
      }
    } catch (err) {
      setGeminiResult('Failed to reach AI server. Local sketchbook mode active.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <BrainCircuit className="w-4 h-4 text-indigo-500" />
          <span>🧪 Design Sandbox & Sketchbook</span>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="w-full max-w-6xl mx-auto my-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 select-none">
        
        {/* LEFT COLUMN: Experiments Catalog List */}
        <div className="lg:col-span-5 bg-white border-2 border-neutral-800 rounded-xl p-5 shadow-[6px_6px_0px_rgba(28,28,28,0.12)] sketch-element flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-dashed border-neutral-300">
              <h3 className="font-serif text-lg font-bold text-neutral-800">Unfinished Sketchbook</h3>
              <span className="font-mono text-[9px] bg-pink-50 text-pink-600 border border-pink-200 px-2 py-0.5 rounded font-bold uppercase">
                7 Experiments
              </span>
            </div>

            <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-3">
              Select an experiment category to inspect:
            </p>

            <div className="space-y-2">
              {EXPERIMENTS.map((exp) => {
                const isActive = activeExp.id === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => {
                      playClick();
                      setActiveExp(exp);
                      setUserPrompt(`explore ${exp.title.toLowerCase()} concepts for digital interfaces`);
                    }}
                    onMouseEnter={() => playScratch()}
                    style={{
                      borderColor: isActive ? exp.color : '#e5e7eb',
                      backgroundColor: isActive ? `${exp.color}10` : '#ffffff',
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all duration-200 cursor-none interactive-obj ${
                      isActive ? 'shadow-[3px_3px_0px_rgba(28,28,28,0.12)]' : 'hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{exp.icon}</span>
                        <span style={{ color: isActive ? exp.color : '#1c1c1c' }} className="font-serif text-sm font-bold">
                          {exp.title}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-neutral-400 uppercase">{exp.category}</span>
                    </div>
                    <p className="font-serif text-xs text-neutral-600 line-clamp-2">{exp.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Demo Stage & AI Generator */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Active Experiment Interactive Stage */}
          <div
            style={{ borderColor: activeExp.color }}
            className="bg-white border-2 rounded-xl p-6 shadow-[6px_6px_0px_rgba(28,28,28,0.15)] sketch-element"
          >
            <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activeExp.icon}</span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-neutral-800">{activeExp.title}</h3>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">{activeExp.category}</p>
                </div>
              </div>
              <span
                style={{ backgroundColor: activeExp.color }}
                className="font-mono text-[9px] text-white px-2.5 py-0.5 rounded font-bold uppercase shadow"
              >
                Interactive
              </span>
            </div>

            <p className="font-serif text-neutral-700 text-sm leading-relaxed mb-4">
              {activeExp.description}
            </p>

            {/* Interactive Canvas Physics Stage */}
            <div className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50/50 mb-4 relative">
              <canvas ref={canvasRef} className="w-full block" />
              <div className="absolute top-2 right-2 font-mono text-[9px] bg-white/80 border border-neutral-200 px-2 py-0.5 rounded text-neutral-600">
                Move cursor over node field ↗
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeExp.tags.map((tag, idx) => (
                <span key={idx} className="font-mono text-[9px] bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded border border-neutral-200 font-bold">
                  🏷️ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* AI Idea Seed Generator */}
          <div className="bg-white border-2 border-neutral-800 rounded-xl p-5 shadow-[6px_6px_0px_rgba(28,28,28,0.15)] sketch-element">
            <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                <span className="font-serif text-sm font-bold text-neutral-800">Generate Experiment Concept with Gemini</span>
              </div>
            </div>

            <div className="relative mb-3">
              <textarea
                value={userPrompt}
                onChange={(e) => {
                  setUserPrompt(e.target.value);
                  if (Math.random() > 0.7) playType();
                }}
                className="w-full p-3 border-2 border-neutral-800 rounded-lg text-xs font-serif text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-indigo-500 h-20 resize-none bg-white cursor-none"
                placeholder="Describe an experimental UI micro-interaction..."
              />
              <button
                onClick={handleTriggerAI}
                disabled={isLoading}
                className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 active:scale-95 transition-all cursor-none interactive-obj shadow disabled:bg-neutral-400"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>

            {geminiResult && (
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-serif text-neutral-700 leading-relaxed max-h-40 overflow-y-auto animate-in fade-in duration-300">
                <p className="font-mono text-[9px] text-indigo-600 font-bold uppercase mb-1">Generated Design Idea:</p>
                {geminiResult}
              </div>
            )}
          </div>

        </div>

      </div>

      <div className="w-full text-center text-neutral-400 font-mono text-[10px] mt-8 select-none">
        Urwah's Experimental Design Sandbox • Faisalabad, Pakistan
      </div>
    </div>
  );
}
