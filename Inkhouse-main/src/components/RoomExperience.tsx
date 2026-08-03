/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAudio } from './AudioEngine';
import { ArrowLeft, Calendar, Award, CheckSquare, ChevronDown, Sparkles } from 'lucide-react';
import { CERTIFICATIONS } from '../data';
import PencilHoverText from './PencilHoverText';

interface RoomExperienceProps {
  onBack: () => void;
}

interface TimelineStep {
  year: string;
  title: string;
  desc: string;
  highlights: string[];
  color: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    year: '2022',
    title: 'Started UI Design',
    desc: 'Began exploring interaction design, user flows, and visual communication principles.',
    highlights: ['Learned Figma fundamentals', 'Conducted initial user research', 'Created low-fi paper sketches'],
    color: '#6366f1'
  },
  {
    year: '2023',
    title: 'Freelance Projects',
    desc: 'Delivered client design solutions, brand guidelines, and responsive landing pages.',
    highlights: ['Designed e-commerce mobile apps', 'Created vector brand design systems', 'Conducted usability interviews'],
    color: '#06b6d4'
  },
  {
    year: '2024',
    title: 'Learning Product Design',
    desc: 'Deepened expertise in HCI, component auto-layouts, and design system governance.',
    highlights: ['FAST National University HCI labs', 'Earned Google UX Design Credential', 'Built complex prototype interactions'],
    color: '#10b981'
  },
  {
    year: '2025',
    title: 'Website Design Projects',
    desc: 'Architected high-converting responsive web apps, SaaS analytics dashboards, and telemedicine flows.',
    highlights: ['SaaS Analytics Command dashboard', 'CarePulse eldercare telemedicine flow', 'Studio Graphite branding'],
    color: '#f59e0b'
  },
  {
    year: 'Today',
    title: 'Building Better Digital Experiences',
    desc: 'Designing digital experiences that balance human empathy, visual elegance, and functional clarity.',
    highlights: ['Available for full-time & freelance projects', 'Continuously experimenting in Figma', 'Crafting user-centered products'],
    color: '#ec4899'
  }
];

export default function RoomExperience({ onBack }: RoomExperienceProps) {
  const { playClick, playScratch } = useAudio();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const handleSelectStep = (idx: number) => {
    playClick();
    setActiveStepIndex(idx);
  };

  const currentStep = TIMELINE_STEPS[activeStepIndex];

  return (
    <div className="relative w-full min-h-screen bg-[#F9F8F6] p-4 sm:p-6 md:p-10 flex flex-col justify-between overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-neutral-900/[0.012] pointer-events-none mix-blend-overlay bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Header controls */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-10 border-b border-dashed border-neutral-300 pb-4 select-none">
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
          <Calendar className="w-4 h-4 text-indigo-500" />
          <span>⏳ Experience Space Timeline</span>
        </div>
      </div>

      {/* Main Timeline Workspace */}
      <div className="w-full max-w-5xl mx-auto my-auto z-10 flex flex-col lg:flex-row items-stretch gap-8 mt-6 select-none">
        
        {/* LEFT COLUMN: Vertical Interactive Timeline */}
        <div className="flex-1 bg-white border-2 border-neutral-800 rounded-xl p-6 shadow-[6px_6px_0px_rgba(28,28,28,0.12)] sketch-element relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-dashed border-neutral-300">
              <h3 className="font-serif text-xl font-bold text-neutral-800">Design Timeline</h3>
              <span className="font-mono text-[9px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded font-bold uppercase">
                2022 — Present
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
              {TIMELINE_STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <div key={idx} className="relative">
                    {/* Node marker */}
                    <button
                      onClick={() => handleSelectStep(idx)}
                      onMouseEnter={() => playScratch()}
                      style={{
                        backgroundColor: isActive ? step.color : '#ffffff',
                        borderColor: isActive ? step.color : '#1c1c1c',
                      }}
                      className={`absolute -left-[30px] top-1 w-5 h-5 rounded-full border-2 transition-transform duration-200 cursor-none interactive-obj flex items-center justify-center ${
                        isActive ? 'scale-125 shadow' : 'hover:scale-110'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-neutral-400'}`} />
                    </button>

                    <div
                      onClick={() => handleSelectStep(idx)}
                      className={`p-3.5 rounded-xl border transition-all duration-200 cursor-none interactive-obj ${
                        isActive
                          ? 'bg-neutral-50/80 border-2 shadow-[3px_3px_0px_rgba(28,28,28,0.1)]'
                          : 'bg-white border-neutral-200 hover:border-neutral-400'
                      }`}
                      style={{ borderColor: isActive ? step.color : undefined }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          style={{ color: step.color }}
                          className="font-mono text-xs font-bold uppercase tracking-wider"
                        >
                          {step.year}
                        </span>
                        {isActive && (
                          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                            Active Inspection ↓
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-base font-bold text-neutral-800 mt-1">{step.title}</h4>
                      <p className="font-serif text-xs text-neutral-600 mt-1">{step.desc}</p>
                    </div>

                    {idx < TIMELINE_STEPS.length - 1 && (
                      <div className="flex justify-center my-1 text-neutral-300">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Step Inspector & Verified Certifications */}
        <div className="lg:w-80 flex flex-col gap-6">
          
          {/* Active Step Details */}
          <div
            style={{ borderColor: currentStep.color }}
            className="bg-white border-2 rounded-xl p-6 shadow-[6px_6px_0px_rgba(28,28,28,0.15)] sketch-element animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-3 mb-3">
              <span
                style={{ color: currentStep.color }}
                className="font-mono text-xs font-bold uppercase tracking-widest"
              >
                {currentStep.year} Focus
              </span>
              <Sparkles style={{ color: currentStep.color }} className="w-5 h-5 animate-bounce" />
            </div>

            <h4 className="font-serif text-xl font-bold text-neutral-800">{currentStep.title}</h4>
            <p className="font-serif text-xs text-neutral-600 leading-relaxed mt-2">{currentStep.desc}</p>

            <div className="mt-4 pt-3 border-t border-neutral-200">
              <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mb-2">Key Milestones:</p>
              <div className="space-y-2">
                {currentStep.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-serif text-neutral-700">
                    <CheckSquare style={{ color: currentStep.color }} className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Credentials list */}
          <div className="bg-white border-2 border-neutral-800 rounded-xl p-5 shadow-[6px_6px_0px_rgba(28,28,28,0.15)] sketch-element">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-neutral-200">
              <Award className="w-4 h-4 text-amber-500" />
              <h4 className="font-serif text-sm font-bold text-neutral-800">Verified Credentials</h4>
            </div>

            <div className="space-y-2.5">
              {CERTIFICATIONS.slice(0, 3).map((cert, idx) => (
                <div key={idx} className="p-2.5 border border-neutral-200 rounded-lg bg-neutral-50/50">
                  <p className="font-mono text-xs font-bold text-neutral-800">{cert.title}</p>
                  <p className="font-mono text-[9px] text-neutral-400 uppercase mt-0.5">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <div className="w-full text-center text-neutral-400 font-mono text-[10px] mt-8 select-none">
        Urwah Imtiaz Experience Space • Faisalabad, Pakistan
      </div>
    </div>
  );
}
