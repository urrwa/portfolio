/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAudio } from './AudioEngine';
import { ArrowLeft, Folder, CheckCircle } from 'lucide-react';
import PencilHoverText from './PencilHoverText';

interface RoomAboutProps {
  onBack: () => void;
}

type FileId =
  | 'intro'
  | 'story'
  | 'journey'
  | 'education'
  | 'philosophy'
  | 'personality'
  | 'values'
  | 'facts'
  | 'hobbies'
  | 'toolbox';

interface FileItem {
  id: FileId;
  name: string;
  icon: string;
  color: string;
  typeLabel: string;
}

const FILES: FileItem[] = [
  { id: 'intro', name: '01. Introduction.txt', icon: '👋', color: '#6366f1', typeLabel: 'STATEMENT' },
  { id: 'story', name: '02. My Story.txt', icon: '📝', color: '#ec4899', typeLabel: 'TEXT FILE' },
  { id: 'journey', name: '03. Journey.pdf', icon: '🚀', color: '#06b6d4', typeLabel: 'TIMELINE' },
  { id: 'education', name: '04. Education.cert', icon: '🎓', color: '#10b981', typeLabel: 'CREDENTIALS' },
  { id: 'philosophy', name: '05. Design Philosophy.md', icon: '💡', color: '#f59e0b', typeLabel: 'ETHOS' },
  { id: 'personality', name: '06. Personality.json', icon: '🌸', color: '#8b5cf6', typeLabel: 'TRAITS' },
  { id: 'values', name: '07. Values.md', icon: '✨', color: '#14b8a6', typeLabel: 'CORE VALUES' },
  { id: 'facts', name: '08. Fun Facts.zip', icon: '🐈', color: '#ef4444', typeLabel: 'TRIVIA' },
  { id: 'hobbies', name: '09. Hobbies.mp3', icon: '🎧', color: '#a855f7', typeLabel: 'AUDIO LOG' },
  { id: 'toolbox', name: '10. Toolbox.stack', icon: '🛠️', color: '#3b82f6', typeLabel: 'TOOLSET' },
];

export default function RoomAbout({ onBack }: RoomAboutProps) {
  const { playClick, playScratch } = useAudio();
  const [activeFileId, setActiveFileId] = useState<FileId>('intro');

  const handleSelectFile = (fileId: FileId) => {
    playClick();
    setActiveFileId(fileId);
  };

  const activeFile = FILES.find((f) => f.id === activeFileId) || FILES[0];

  return (
    <div className="relative w-full min-h-screen bg-[#F9F8F6] p-4 sm:p-6 md:p-10 flex flex-col justify-between overflow-x-hidden">
      {/* Paper texture shader layer */}
      <div className="absolute inset-0 bg-neutral-900/[0.012] pointer-events-none mix-blend-overlay bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Header Back controls */}
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
          <Folder className="w-4 h-4 text-indigo-500" />
          <span>📂 About Room • Editorial Archive</span>
        </div>
      </div>

      {/* Main Folder Workspace */}
      <div className="w-full max-w-6xl mx-auto my-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* LEFT COLUMN: Interactive Directory File Tree */}
        <div className="lg:col-span-4 bg-white border-2 border-neutral-800 rounded-xl p-5 shadow-[6px_6px_0px_rgba(28,28,28,0.12)] sketch-element select-none flex flex-col justify-between max-h-[720px] overflow-y-auto">
          <div>
            {/* Directory Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-dashed border-neutral-300 sticky top-0 bg-white z-10 pt-1">
              <div className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-indigo-600" />
                <span className="font-serif font-bold text-neutral-800 text-sm">📂 Urwah's Vault</span>
              </div>
              <span className="font-mono text-[9px] bg-indigo-50 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded font-bold uppercase">
                10 Documents
              </span>
            </div>

            <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-3">
              Select an editorial chapter:
            </p>

            {/* File Items List */}
            <div className="space-y-1.5">
              {FILES.map((file) => {
                const isActive = file.id === activeFileId;
                return (
                  <button
                    key={file.id}
                    onClick={() => handleSelectFile(file.id)}
                    onMouseEnter={() => playScratch()}
                    style={{
                      borderColor: isActive ? file.color : '#e5e7eb',
                      backgroundColor: isActive ? `${file.color}10` : 'transparent',
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all duration-200 cursor-none interactive-obj group ${
                      isActive ? 'shadow-[3px_3px_0px_rgba(28,28,28,0.1)] font-bold' : 'hover:bg-neutral-50 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm shrink-0">{file.icon}</span>
                      <span
                        style={{ color: isActive ? file.color : '#262626' }}
                        className="font-mono text-xs truncate transition-colors"
                      >
                        {file.name}
                      </span>
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-400 shrink-0 ml-1">
                      {file.typeLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Document Reader Canvas */}
        <div className="lg:col-span-8 bg-white border-2 border-neutral-800 rounded-xl p-6 sm:p-8 shadow-[8px_8px_0px_rgba(28,28,28,0.15)] sketch-element flex flex-col justify-between min-h-[560px] relative overflow-hidden">
          
          {/* Header Bar of Document Reader */}
          <div className="flex items-center justify-between border-b border-dashed border-neutral-300 pb-4 mb-6 select-none">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{activeFile.icon}</span>
              <div>
                <h3 style={{ color: activeFile.color }} className="font-mono text-sm font-bold uppercase tracking-wider">
                  {activeFile.name}
                </h3>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                  Editorial Chapter • Behance Quality Spec
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            </div>
          </div>

          {/* DYNAMIC DOCUMENT CONTENT BY FILE ID */}
          <div className="flex-1 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300">
            
            {/* 01. INTRODUCTION */}
            {activeFileId === 'intro' && (
              <div className="space-y-6">
                <div className="p-6 bg-indigo-50/50 border-2 border-indigo-200 rounded-xl shadow-[4px_4px_0px_rgba(79,70,229,0.1)] relative">
                  <span className="font-mono text-[10px] text-indigo-600 font-bold uppercase tracking-widest block mb-2">
                    01 — Introduction
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-neutral-900 leading-snug">
                    "I build thoughtful, human-centered digital interfaces that balance visual clarity with emotional resonance."
                  </h4>
                  <p className="font-serif text-neutral-700 text-sm mt-3 leading-relaxed">
                    Hello! I'm Urwah Imtiaz, a Product & UI/UX Designer based in Faisalabad, Pakistan. I specialize in turning complex workflow challenges into clean, accessible web and mobile products through user research, structural flows, and pixel-perfect design systems.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <span className="text-neutral-400 text-[9px] block uppercase">Role</span>
                    <span className="font-bold text-neutral-800">UI/UX & Product Designer</span>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <span className="text-neutral-400 text-[9px] block uppercase">Focus</span>
                    <span className="font-bold text-neutral-800">Design Systems & Research</span>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <span className="text-neutral-400 text-[9px] block uppercase">Location</span>
                    <span className="font-bold text-neutral-800">Pakistan (PKT UTC+5)</span>
                  </div>
                </div>
              </div>
            )}

            {/* 02. MY STORY */}
            {activeFileId === 'story' && (
              <div className="space-y-6">
                <div className="relative p-6 bg-[#FAF8F5] border-2 border-neutral-800 rounded-xl shadow-[4px_4px_0px_rgba(28,28,28,1)]">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-100/80 border border-amber-300/80 rotate-[-1deg] shadow-sm pointer-events-none" />
                  
                  <span className="font-mono text-[10px] text-rose-600 font-bold uppercase tracking-widest block mb-2">
                    02 — My Story
                  </span>
                  <h4 className="font-serif text-xl font-bold text-neutral-800 mb-3 border-b border-neutral-200 pb-2">
                    Every Project Begins With Curiosity
                  </h4>
                  <p className="font-serif text-neutral-700 text-sm leading-relaxed">
                    Mine began with opening Figma for the first time and wondering how simple shapes could become meaningful experiences. Since then, I've been obsessed with creating interfaces that don't just look beautiful—but feel intuitive, human, and memorable.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-lg">
                    <p className="font-mono text-[10px] text-indigo-600 font-bold uppercase tracking-wider mb-1">
                      💡 How I Discovered Design
                    </p>
                    <p className="font-serif text-xs text-neutral-600 leading-relaxed">
                      While studying computer science at FAST NUCES, I realized that the magic lies in the intersection of empathy and visual design. I transitioned from code to interaction architecture.
                    </p>
                  </div>
                  <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-lg">
                    <p className="font-mono text-[10px] text-rose-600 font-bold uppercase tracking-wider mb-1">
                      ❤️ Why I Enjoy Designing
                    </p>
                    <p className="font-serif text-xs text-neutral-600 leading-relaxed">
                      Seeing a user complete a task seamlessly without frustration is deeply satisfying. Design is my medium for solving real-world friction.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 03. JOURNEY */}
            {activeFileId === 'journey' && (
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-cyan-600 font-bold uppercase tracking-widest block">
                  03 — Journey Timeline
                </span>
                <div className="space-y-3 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg relative">
                    <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full absolute -left-[21px] top-4 border-2 border-white" />
                    <span className="font-mono text-[10px] font-bold text-indigo-600">2022 — The Awakening</span>
                    <h5 className="font-serif text-sm font-bold text-neutral-800 mt-0.5">Discovered Interaction Design</h5>
                    <p className="font-serif text-xs text-neutral-600 mt-1">Began exploring HCI labs at FAST NUCES, conducting qualitative audits and paper prototype testing.</p>
                  </div>

                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg relative">
                    <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full absolute -left-[21px] top-4 border-2 border-white" />
                    <span className="font-mono text-[10px] font-bold text-emerald-600">2023 — Global Credentials & Client Work</span>
                    <h5 className="font-serif text-sm font-bold text-neutral-800 mt-0.5">Google UX Credential & Freelancing</h5>
                    <p className="font-serif text-xs text-neutral-600 mt-1">Earned Google UX Design Credential on Coursera; designed mobile apps and brand identities for global startups.</p>
                  </div>

                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg relative">
                    <div className="w-2.5 h-2.5 bg-rose-600 rounded-full absolute -left-[21px] top-4 border-2 border-white" />
                    <span className="font-mono text-[10px] font-bold text-rose-600">2024–Present — Enterprise Systems & Research</span>
                    <h5 className="font-serif text-sm font-bold text-neutral-800 mt-0.5">Product Design & Interactive Experiences</h5>
                    <p className="font-serif text-xs text-neutral-600 mt-1">Architecting SaaS command centers, telemedicine flows, and tokenized Figma design systems.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 04. EDUCATION */}
            {activeFileId === 'education' && (
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-emerald-600 font-bold uppercase tracking-widest block">
                  04 — Education & Credentials
                </span>

                <div className="p-4 bg-emerald-50/50 border-2 border-emerald-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-neutral-800">FAST National University (NUCES)</h4>
                    <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">University</span>
                  </div>
                  <p className="font-serif text-xs text-neutral-600 mt-1">Bachelor of Science in Computer Science & Human-Computer Interaction (HCI)</p>
                  <p className="font-mono text-[10px] text-neutral-400 mt-1">Faisalabad Campus • Focus on UX Architecture, Ergonomics & Cognitive Load</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 border border-neutral-200 rounded-lg bg-neutral-50">
                    <span className="font-mono text-[9px] text-neutral-400 uppercase block">Certified Specialization</span>
                    <h5 className="font-serif text-xs font-bold text-neutral-800 mt-0.5">Google UX Design Professional</h5>
                    <p className="font-mono text-[9px] text-emerald-600 mt-1">Coursera Verified Credential</p>
                  </div>
                  <div className="p-3 border border-neutral-200 rounded-lg bg-neutral-50">
                    <span className="font-mono text-[9px] text-neutral-400 uppercase block">IDF Credentials</span>
                    <h5 className="font-serif text-xs font-bold text-neutral-800 mt-0.5">Interaction Design Foundation</h5>
                    <p className="font-mono text-[9px] text-emerald-600 mt-1">Design Thinking & UX Foundations</p>
                  </div>
                </div>

                <div className="p-3 bg-neutral-100/60 border border-neutral-200 rounded-lg font-serif text-xs text-neutral-600">
                  <strong className="text-neutral-800">Self-Learning Ethos:</strong> Continuously devouring design articles on Medium, dissecting Behance case studies, and practicing daily UI exercises in Figma.
                </div>
              </div>
            )}

            {/* 05. DESIGN PHILOSOPHY */}
            {activeFileId === 'philosophy' && (
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-amber-600 font-bold uppercase tracking-widest block">
                  05 — Design Philosophy
                </span>
                
                <div className="p-5 bg-amber-50/60 border-2 border-amber-300 rounded-xl shadow-[4px_4px_0px_rgba(245,158,11,0.2)]">
                  <h4 className="font-serif text-lg font-bold text-neutral-800 leading-snug">
                    "Good design is obvious. Great design is transparent."
                  </h4>
                  <p className="font-serif text-xs text-neutral-700 mt-2 leading-relaxed">
                    I believe great design should never demand attention for itself—it should amplify the user's intent. My methodology combines strict grid mathematics with genuine human empathy.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-white border border-neutral-200 rounded-lg shadow-sm">
                    <span className="text-xl">🎯</span>
                    <h5 className="font-serif text-xs font-bold text-neutral-800 mt-1">Function First</h5>
                    <p className="font-serif text-[11px] text-neutral-500 mt-0.5">Aesthetic form serves usability and content structure.</p>
                  </div>
                  <div className="p-3 bg-white border border-neutral-200 rounded-lg shadow-sm">
                    <span className="text-xl">🌱</span>
                    <h5 className="font-serif text-xs font-bold text-neutral-800 mt-1">Clarity & Space</h5>
                    <p className="font-serif text-[11px] text-neutral-500 mt-0.5">Generous negative space creates cognitive breathing room.</p>
                  </div>
                  <div className="p-3 bg-white border border-neutral-200 rounded-lg shadow-sm">
                    <span className="text-xl">🔍</span>
                    <h5 className="font-serif text-xs font-bold text-neutral-800 mt-1">Sub-pixel Detail</h5>
                    <p className="font-serif text-[11px] text-neutral-500 mt-0.5">8pt grids, optical alignment, and accessible contrast.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 06. PERSONALITY */}
            {activeFileId === 'personality' && (
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-purple-600 font-bold uppercase tracking-widest block">
                  06 — Personality Traits
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: "Creative", desc: "Always imagining fresh visual metaphors and expressive micro-interactions.", icon: "🎨", color: "#ec4899" },
                    { title: "Curious", desc: "Never stops asking 'Why does this step exist?' during user journey mapping.", icon: "🔍", color: "#06b6d4" },
                    { title: "Detail-Oriented", desc: "Obsessed with pixel alignment, tokenized color variants, and spacing math.", icon: "📏", color: "#8b5cf6" },
                    { title: "Problem Solver", desc: "Enjoys untangling dense information architecture into clean bento grids.", icon: "🧩", color: "#10b981" },
                    { title: "Continuous Learner", desc: "Constantly testing new motion design tools and creative coding concepts.", icon: "🚀", color: "#f59e0b" },
                  ].map((trait, i) => (
                    <div key={i} className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl flex items-start gap-3">
                      <span className="text-2xl shrink-0">{trait.icon}</span>
                      <div>
                        <h5 style={{ color: trait.color }} className="font-serif text-sm font-bold">{trait.title}</h5>
                        <p className="font-serif text-xs text-neutral-600 mt-0.5 leading-relaxed">{trait.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 07. VALUES */}
            {activeFileId === 'values' && (
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-teal-600 font-bold uppercase tracking-widest block">
                  07 — Core Design Values
                </span>

                <div className="space-y-2.5">
                  {[
                    { name: "Empathy", desc: "Putting human needs and emotional comfort before subjective aesthetic trends.", icon: "❤️" },
                    { name: "Accessibility", desc: "Ensuring WCAG AA compliance so digital experiences are usable for everyone.", icon: "👁️" },
                    { name: "Simplicity", desc: "Distilling complex workflows into effortless, step-by-step guidance.", icon: "✨" },
                    { name: "Consistency", desc: "Building unified design systems that maintain brand trust across touchpoints.", icon: "📐" },
                    { name: "Innovation", desc: "Experimenting with creative interactions and AI-augmented design workflows.", icon: "⚡" },
                  ].map((val, i) => (
                    <div key={i} className="p-3 bg-white border border-neutral-200 rounded-lg flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{val.icon}</span>
                        <div>
                          <h5 className="font-serif text-xs font-bold text-neutral-800">{val.name}</h5>
                          <p className="font-serif text-[11px] text-neutral-500">{val.desc}</p>
                        </div>
                      </div>
                      <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 08. FUN FACTS */}
            {activeFileId === 'facts' && (
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-rose-600 font-bold uppercase tracking-widest block">
                  08 — Fun Facts & Quirks
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { fact: "Cat lover 🐈", detail: "Simba the Persian cat attends all Figma design sessions as Lead Mascot." },
                    { fact: "Book reader 📚", detail: "Reads design philosophy, UX psychology, and science fiction novels." },
                    { fact: "Professional sleeper 😴", detail: "Believes peak creative breakthroughs happen after 8 hours of restful sleep!" },
                    { fact: "Collects design inspiration", detail: "Maintains a 500+ item Are.na moodboard of Swiss typography and poster art." },
                    { fact: "Always redesigning apps mentally", detail: "Can't order coffee or book a flight without sketching UI improvements in my mind." },
                    { fact: "Coffee + music while designing", detail: "Warm caramel latte + Tycho ambient beats = 100% focus state." },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-rose-50/50 border border-rose-200 rounded-lg">
                      <h5 className="font-serif text-xs font-bold text-neutral-800">{item.fact}</h5>
                      <p className="font-serif text-[11px] text-neutral-600 mt-1">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 09. HOBBIES */}
            {activeFileId === 'hobbies' && (
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-purple-600 font-bold uppercase tracking-widest block">
                  09 — Hobbies & Pursuits
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                  {[
                    { name: "Reading", icon: "📚", color: "#6366f1" },
                    { name: "Sleeping", icon: "😴", color: "#06b6d4" },
                    { name: "Photography", icon: "📷", color: "#10b981" },
                    { name: "Movies", icon: "🎬", color: "#f59e0b" },
                    { name: "Sketching", icon: "✏️", color: "#ec4899" },
                    { name: "Design Moodboards", icon: "🖼️", color: "#8b5cf6" },
                  ].map((hob, i) => (
                    <div key={i} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl hover:border-neutral-400 transition-colors">
                      <span className="text-3xl block mb-2">{hob.icon}</span>
                      <span className="font-serif text-xs font-bold text-neutral-800">{hob.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. TOOLBOX */}
            {activeFileId === 'toolbox' && (
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-blue-600 font-bold uppercase tracking-widest block">
                  10 — Creative & Tech Toolbox
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { name: "Figma", type: "UI/UX & Systems", icon: "🎨" },
                    { name: "Illustrator", type: "Vector Graphics", icon: "✒️" },
                    { name: "Photoshop", type: "Image Editing", icon: "🖼️" },
                    { name: "HTML / CSS", type: "Web Styling", icon: "🌐" },
                    { name: "React", type: "UI Architecture", icon: "⚛️" },
                    { name: "JavaScript", type: "Interactions", icon: "⚡" },
                    { name: "VS Code", type: "Development Environment", icon: "💻" },
                    { name: "Notion & Miro", type: "Research & Mappings", icon: "📌" },
                  ].map((tool, i) => (
                    <div key={i} className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-center">
                      <span className="text-2xl block mb-1">{tool.icon}</span>
                      <p className="font-mono text-xs font-bold text-neutral-800">{tool.name}</p>
                      <span className="font-mono text-[8px] text-neutral-400 uppercase">{tool.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Bar of Document Reader */}
          <div className="mt-6 pt-4 border-t border-dashed border-neutral-300 flex items-center justify-between font-mono text-[10px] text-neutral-400 select-none">
            <span>Chapter {FILES.findIndex(f => f.id === activeFileId) + 1} of {FILES.length}</span>
            <span>Urwah Imtiaz Portfolio Universe</span>
          </div>

        </div>

      </div>

      {/* End Screen Banner */}
      <div className="w-full max-w-6xl mx-auto mt-8 p-6 bg-neutral-900 text-white rounded-2xl shadow-[8px_8px_0px_rgba(28,28,28,0.2)] text-center select-none sketch-element">
        <p className="font-serif text-lg font-bold">
          "Thanks for exploring my universe."
        </p>
        <p className="font-serif text-xs text-neutral-300 mt-1 max-w-md mx-auto">
          Every project here represents a lesson, an experiment, and a step forward. The next one could be yours.
        </p>
        <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mt-3 block">
          Urwah Imtiaz • Faisalabad, Pakistan
        </span>
      </div>
    </div>
  );
}
