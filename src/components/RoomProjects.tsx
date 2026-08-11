/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { useAudio } from './AudioEngine';
import { ArrowLeft, ExternalLink, Sparkles, FolderPlus, FolderOpen, ChevronDown, ChevronUp, Trash2, Plus, FileText, Play, CheckCircle, Github, Eye } from 'lucide-react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data';
import { Project } from '../types';
import PencilHoverText from './PencilHoverText';

interface RoomProjectsProps {
  onBack: () => void;
}

export default function RoomProjects({ onBack }: RoomProjectsProps) {
  const { playClick, playScratch, playWhoosh } = useAudio();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('UI/UX Design');
  const [newRole, setNewRole] = useState('UI/UX Designer');
  const [newDuration, setNewDuration] = useState('2 Weeks');
  const [newDesc, setNewDesc] = useState('');
  const [newLongDesc, setNewLongDesc] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [newTools, setNewTools] = useState('');
  const [newStat, setNewStat] = useState('');
  const [newColor, setNewColor] = useState('#6366f1');
  const [formSuccess, setFormSuccess] = useState(false);

  // Load projects from localStorage, or fall back to DEFAULT_PROJECTS
  useEffect(() => {
    const saved = localStorage.getItem('urwah_design_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        setProjects(DEFAULT_PROJECTS);
      }
    } else {
      setProjects(DEFAULT_PROJECTS);
    }
  }, []);

  const saveProjectsToStorage = (updatedList: Project[]) => {
    localStorage.setItem('urwah_design_projects', JSON.stringify(updatedList));
    setProjects(updatedList);
  };

  const handleProjectClick = (project: Project) => {
    playClick();
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    playClick();
    setSelectedProject(null);
  };

  const toggleMoreExpanded = () => {
    playClick();
    setIsMoreExpanded(!isMoreExpanded);
  };

  const handleCreateProject = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newLongDesc) return;

    playClick();

    const toolsArray = newTools
      ? newTools.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Figma', 'User Research'];

    const newProject: Project = {
      id: `proj_${Date.now()}`,
      title: newTitle,
      category: newCategory,
      role: newRole,
      duration: newDuration,
      description: newDesc,
      longDescription: newLongDesc,
      problem: newProblem || 'High bounce rate and navigational confusion.',
      solution: newSolution || 'Intuitive user flows and clean responsive UI design.',
      tech: toolsArray,
      color: newColor,
      sketchUrl: "M 20,20 L 80,20 L 80,80 L 20,80 Z M 20,40 L 80,40 M 40,20 L 40,80",
      liveUrl: "https://figma.com",
      prototypeUrl: "https://figma.com/proto",
      githubUrl: "https://github.com",
      stat: newStat || undefined,
      processSteps: [
        { step: 'Research', desc: 'Empathy mapping & user interviews' },
        { step: 'User Flows', desc: 'Low-fi structural blueprints' },
        { step: 'UI Design', desc: 'High-fidelity auto-layouts' },
        { step: 'Prototype', desc: 'Interactive micro-interactions' },
        { step: 'Outcome', desc: 'Positive usability metrics' },
      ]
    };

    const updated = [...projects, newProject];
    saveProjectsToStorage(updated);

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewLongDesc('');
    setNewProblem('');
    setNewSolution('');
    setNewTools('');
    setNewStat('');
    setNewColor('#6366f1');
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  const handleDeleteProject = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to remove this case study?")) return;
    playClick();
    const updated = projects.filter((p) => p.id !== id);
    saveProjectsToStorage(updated);
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  const featuredProjects = projects.slice(0, 4);
  const additionalProjects = projects.slice(4);

  return (
    <div className="relative w-full min-h-screen bg-[#F9F8F6] p-4 sm:p-6 md:p-10 flex flex-col justify-between overflow-hidden">
      {/* Paper texture shader layer */}
      <div className="absolute inset-0 bg-neutral-900/[0.012] pointer-events-none mix-blend-overlay bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Header controls */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 border-b border-dashed border-neutral-300 pb-4 select-none">
        <button
          onClick={() => {
            playClick();
            if (selectedProject) {
              handleCloseDetail();
            } else {
              onBack();
            }
          }}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-indigo-600 cursor-none interactive-obj group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>
            <PencilHoverText strokeColor="#4f46e5" underlineHeight={4}>
              {selectedProject ? 'Back to Gallery' : 'Go Back to Hub'}
            </PencilHoverText>
          </span>
        </button>
        <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
          🖼️ Design Case Studies Gallery
        </div>
      </div>

      {/* Main Exhibition Container */}
      <div className="w-full max-w-6xl mx-auto my-auto z-10 flex flex-col items-center mt-6">
        
        {!selectedProject ? (
          // GRID VIEW OF MINI DESKTOP WINDOWS
          <div className="w-full animate-in fade-in zoom-in-95 duration-400">
            <div className="text-center mb-10 max-w-xl mx-auto select-none">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight">
                Case Studies & Work
              </h2>
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mt-2 leading-relaxed">
                Hover over any mini desktop window to trigger live preview animations. Click to inspect full case study.
              </p>
            </div>

            {/* Featured Projects Grid (Mini Desktop Windows) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {featuredProjects.map((project) => {
                const isHovered = hoveredProjectId === project.id;
                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => {
                      setHoveredProjectId(project.id);
                      playScratch();
                    }}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    onClick={() => handleProjectClick(project)}
                    style={{
                      boxShadow: isHovered ? `10px 10px 0px ${project.color}30` : '6px 6px 0px rgba(28,28,28,0.15)',
                      borderColor: isHovered ? project.color : '#1c1c1c',
                    }}
                    className="group relative bg-white border-2 border-neutral-800 rounded-xl overflow-hidden cursor-none transition-all duration-300 flex flex-col justify-between sketch-element interactive-obj"
                  >
                    {/* Delete button for user-added projects */}
                    {project.id.startsWith('proj_') && (
                      <button
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        className="absolute top-2.5 right-3.5 p-1 text-neutral-400 hover:text-red-500 rounded transition-colors z-20 cursor-none interactive-obj"
                        title="Delete Case Study"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* MINI DESKTOP WINDOW TOP BAR */}
                    <div className="bg-neutral-900 text-neutral-300 px-4 py-2 flex items-center justify-between border-b border-neutral-800 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 font-bold">
                        {project.title} • {project.category}
                      </span>
                    </div>

                    {/* MINI DESKTOP VIDEO / ANIMATED PREVIEW AREA */}
                    <div
                      className="relative h-44 overflow-hidden flex items-center justify-center select-none border-b border-neutral-800 transition-colors"
                      style={{ backgroundColor: isHovered ? `${project.color}15` : '#f8fafc' }}
                    >
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,28,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(28,28,28,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                      {/* Animated vector / UI preview canvas */}
                      <div className="relative flex flex-col items-center justify-center p-4">
                        <svg className={`w-20 h-20 transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`} viewBox="0 0 100 100" fill="none">
                          <ellipse cx="50" cy="50" rx="36" ry="24" stroke={project.color} strokeWidth="2" className={`sketch-element ${isHovered ? 'animate-pulse' : ''}`} />
                          <path d={project.sketchUrl} stroke="#1c1c1c" strokeWidth="1.5" className="sketch-element" />
                        </svg>

                        <div className={`mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-mono font-bold uppercase tracking-widest transition-all ${
                          isHovered ? 'bg-neutral-900 text-white border-neutral-800 shadow' : 'bg-white text-neutral-600 border-neutral-300'
                        }`}>
                          <Play className={`w-3 h-3 ${isHovered ? 'text-emerald-400 animate-spin' : 'text-neutral-400'}`} />
                          <span>{isHovered ? 'Playing Preview' : 'Hover to Play'}</span>
                        </div>
                      </div>

                      {/* KPI badge */}
                      {project.stat && (
                        <div className="absolute bottom-2.5 right-3 bg-white border border-neutral-800 px-2.5 py-0.5 rounded shadow-[2px_2px_0px_rgba(28,28,28,1)] text-[9px] font-mono text-neutral-800 font-bold uppercase tracking-wider">
                          🎯 {project.stat}
                        </div>
                      )}
                    </div>

                    {/* CASE STUDY DETAILS IN CARD */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2 select-none">
                          <span>Role: {project.role || 'UI/UX Designer'}</span>
                          <span>Duration: {project.duration || '2 Weeks'}</span>
                        </div>

                        <h3
                          style={{ color: isHovered ? project.color : '#1c1c1c' }}
                          className="font-serif text-2xl font-bold tracking-tight mb-2 transition-colors"
                        >
                          {project.title}
                        </h3>
                        <p className="font-serif text-neutral-600 text-xs leading-relaxed mb-4">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        <div className="border-t border-dashed border-neutral-200 pt-3 mb-4">
                          <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider mb-1.5">Tools:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t, i) => (
                              <span key={i} className="font-mono text-[9px] text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                                🛠️ {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            style={{ 
                              backgroundColor: isHovered ? project.color : '#1c1c1c',
                              color: '#ffffff'
                            }}
                            className="py-2 px-3 rounded-lg border border-neutral-800 font-mono text-[10px] font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1 cursor-none interactive-obj shadow"
                          >
                            <span>Read Case Study</span>
                            <span>→</span>
                          </button>
                          <a
                            href={project.liveUrl || '#'}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-lg border border-neutral-800 bg-white hover:bg-neutral-50 font-mono text-[10px] font-bold text-neutral-800 uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1 cursor-none interactive-obj"
                          >
                            <span>Visit Live Site</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* EXPANDABLE "MORE PROJECTS" AREA */}
            {additionalProjects.length > 0 && (
              <div className="mt-8 w-full border-t border-dashed border-neutral-300 pt-6">
                <button
                  onClick={toggleMoreExpanded}
                  className="mx-auto flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-neutral-800 rounded-lg shadow-[4px_4px_0px_rgba(28,28,28,1)] text-neutral-700 font-mono text-xs uppercase tracking-widest cursor-none interactive-obj hover:bg-neutral-50 active:scale-95 transition-all"
                >
                  <FolderOpen className="w-4 h-4 text-indigo-500" />
                  <span>{isMoreExpanded ? 'Collapse Additional Projects' : `Show More Projects (${additionalProjects.length})`}</span>
                  {isMoreExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isMoreExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-8 animate-in fade-in zoom-in-95 duration-300">
                    {additionalProjects.map((project) => (
                      <div
                        key={project.id}
                        onMouseEnter={() => {
                          setHoveredProjectId(project.id);
                          playScratch();
                        }}
                        onMouseLeave={() => setHoveredProjectId(null)}
                        onClick={() => handleProjectClick(project)}
                        style={{
                          boxShadow: hoveredProjectId === project.id ? `8px 8px 0px ${project.color}25` : '6px 6px 0px rgba(28,28,28,0.1)',
                          borderColor: hoveredProjectId === project.id ? project.color : '#1c1c1c',
                        }}
                        className="group relative bg-white border-2 border-neutral-800 rounded-xl overflow-hidden cursor-none transition-all duration-300 flex flex-col justify-between sketch-element interactive-obj"
                      >
                        <div className="bg-neutral-900 text-neutral-300 px-4 py-2 flex items-center justify-between border-b border-neutral-800">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          </div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 font-bold">
                            {project.title}
                          </span>
                        </div>

                        <div className="p-5">
                          <h3 className="font-serif text-xl font-bold text-neutral-800 mb-1">{project.title}</h3>
                          <p className="font-serif text-xs text-neutral-600 mb-3">{project.description}</p>
                          <button className="w-full py-2 bg-indigo-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded">
                            Open Case Study →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}


            {/* EXTRA BEHANCE SECTION 3: BEHIND THE SCENES */}
            <div className="mt-8 bg-white border-2 border-neutral-800 rounded-xl p-6 shadow-[6px_6px_0px_rgba(28,28,28,0.12)] sketch-element select-none">
              <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-3 mb-4">
                <h4 className="font-serif text-lg font-bold text-neutral-800">Behind the Scenes: Sketches & Artifacts</h4>
                <span className="font-mono text-[9px] bg-rose-50 text-rose-700 px-2 py-0.5 border border-rose-200 rounded font-bold uppercase">
                  Process Artifacts
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-lg">
                  <span className="text-xl block mb-1">✏️</span>
                  <p className="font-mono text-xs font-bold text-neutral-800">Paper Sketches</p>
                  <span className="font-mono text-[8px] text-neutral-400">100+ Low-Fi Layouts</span>
                </div>
                <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-lg">
                  <span className="text-xl block mb-1">🎨</span>
                  <p className="font-mono text-xs font-bold text-neutral-800">Color Explorations</p>
                  <span className="font-mono text-[8px] text-neutral-400">WCAG AA Palettes</span>
                </div>
                <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg">
                  <span className="text-xl block mb-1">📌</span>
                  <p className="font-mono text-xs font-bold text-neutral-800">Moodboards</p>
                  <span className="font-mono text-[8px] text-neutral-400">Swiss Type & Poster Art</span>
                </div>
                <div className="p-3 bg-purple-50/50 border border-purple-200 rounded-lg">
                  <span className="text-xl block mb-1">🔄</span>
                  <p className="font-mono text-xs font-bold text-neutral-800">Iterations</p>
                  <span className="font-mono text-[8px] text-neutral-400">A/B Usability Logs</span>
                </div>
              </div>
            </div>

            {/* DYNAMIC CASE STUDY DRAFTER FORM */}
            <div className="mt-12 w-full border-t border-dashed border-neutral-300 pt-8 max-w-2xl mx-auto">
              <button
                onClick={() => { playClick(); setShowAddForm(!showAddForm); }}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-neutral-800 rounded-xl shadow-[4px_4px_0px_rgba(28,28,28,1)] cursor-none interactive-obj group"
              >
                <div className="flex items-center gap-2.5">
                  <FolderPlus className="w-5 h-5 text-indigo-600 group-hover:rotate-12 transition-transform" />
                  <span className="font-serif text-base font-bold text-neutral-800">Draft New Portfolio Case Study</span>
                </div>
                <Plus className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${showAddForm ? 'rotate-45' : ''}`} />
              </button>

              {showAddForm && (
                <form
                  onSubmit={handleCreateProject}
                  className="mt-4 bg-white border-2 border-neutral-800 rounded-xl p-6 shadow-[6px_6px_0px_rgba(28,28,28,0.15)] animate-in slide-in-from-top-4 duration-300 select-none"
                >
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-neutral-200">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-serif text-lg font-bold text-neutral-800">Case Study Information</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1">Project Name / Title</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. SwellVault Personal Finance"
                        className="w-full p-2.5 border-2 border-neutral-800 rounded-lg text-xs font-serif text-neutral-800 focus:outline-none focus:border-indigo-500 bg-white cursor-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1">Category</label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full p-2 border-2 border-neutral-800 rounded-lg text-xs font-mono text-neutral-700 bg-white cursor-none"
                        >
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="Web Design">Web Design</option>
                          <option value="Branding">Branding</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1">Role</label>
                        <input
                          type="text"
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          placeholder="e.g. Lead UI/UX Designer"
                          className="w-full p-2 border-2 border-neutral-800 rounded-lg text-xs font-serif text-neutral-800 bg-white cursor-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1">Duration</label>
                        <input
                          type="text"
                          value={newDuration}
                          onChange={(e) => setNewDuration(e.target.value)}
                          placeholder="e.g. 2 Weeks"
                          className="w-full p-2 border-2 border-neutral-800 rounded-lg text-xs font-serif text-neutral-800 bg-white cursor-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1">Problem Statement</label>
                      <textarea
                        value={newProblem}
                        onChange={(e) => setNewProblem(e.target.value)}
                        placeholder="What core user friction or UX challenge did this project address?"
                        rows={2}
                        className="w-full p-2.5 border-2 border-neutral-800 rounded-lg text-xs font-serif text-neutral-800 bg-white resize-none cursor-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1">Solution Overview</label>
                      <textarea
                        value={newSolution}
                        onChange={(e) => setNewSolution(e.target.value)}
                        placeholder="How did your design process, research, and high-fi UI solve the problem?"
                        rows={2}
                        className="w-full p-2.5 border-2 border-neutral-800 rounded-lg text-xs font-serif text-neutral-800 bg-white resize-none cursor-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1">Tools (Comma separated)</label>
                      <input
                        type="text"
                        value={newTools}
                        onChange={(e) => setNewTools(e.target.value)}
                        placeholder="e.g. Figma, Illustrator, Photoshop, Miro"
                        className="w-full p-2.5 border-2 border-neutral-800 rounded-lg text-xs font-mono text-neutral-700 bg-white cursor-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-dashed border-neutral-200 pt-4">
                    {formSuccess ? (
                      <span className="font-mono text-xs text-emerald-600 font-bold uppercase animate-bounce flex items-center gap-1">
                        ✓ Case Study Published!
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                        * Saved to local browser storage *
                      </span>
                    )}

                    <button
                      type="submit"
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg cursor-none interactive-obj transition-colors"
                    >
                      Publish Case Study
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ) : (
          // FULL CASE STUDY VIEW
          <div className="w-full max-w-4xl bg-white border-2 border-neutral-800 rounded-xl p-6 sm:p-8 shadow-[10px_10px_0px_rgba(28,28,28,0.15)] sketch-element animate-in fade-in slide-in-from-bottom-4 duration-400 select-none">
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-dashed border-neutral-200 pb-5 mb-6 gap-4">
              <div>
                <span
                  style={{ color: selectedProject.color, borderColor: selectedProject.color }}
                  className="font-mono text-[10px] uppercase tracking-wider px-3 py-0.5 border rounded-full font-bold"
                >
                  {selectedProject.category}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight mt-2.5">
                  {selectedProject.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {selectedProject.stat && (
                  <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-lg text-right shrink-0">
                    <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Impact KPI</p>
                    <p style={{ color: selectedProject.color }} className="font-mono text-lg font-bold mt-0.5">
                      {selectedProject.stat}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Role, Duration, Tools Summary Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-lg mb-8">
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider">Role</p>
                <p className="font-serif text-sm font-bold text-neutral-800">{selectedProject.role || 'UI/UX Designer'}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider">Duration</p>
                <p className="font-serif text-sm font-bold text-neutral-800">{selectedProject.duration || '2 Weeks'}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider">Tools</p>
                <p className="font-serif text-sm font-bold text-neutral-800">{selectedProject.tech.join(', ')}</p>
              </div>
            </div>

            {/* Action Buttons Header */}
            <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-dashed border-neutral-200 pb-5">
              <a
                href={selectedProject.liveUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: selectedProject.color }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow hover:brightness-105 cursor-none interactive-obj"
              >
                <span>View Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={selectedProject.prototypeUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow hover:bg-neutral-800 cursor-none interactive-obj"
              >
                <span>Watch Prototype</span>
                <Eye className="w-3.5 h-3.5" />
              </a>
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white border border-neutral-800 text-neutral-800 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-neutral-50 cursor-none interactive-obj"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            {/* Problem & Solution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 bg-rose-50/50 border-2 border-rose-200 rounded-xl">
                <h4 className="font-mono text-xs font-bold text-rose-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>🚨 The Problem</span>
                </h4>
                <p className="font-serif text-neutral-700 text-sm leading-relaxed">
                  {selectedProject.problem || selectedProject.description}
                </p>
              </div>

              <div className="p-5 bg-emerald-50/50 border-2 border-emerald-200 rounded-xl">
                <h4 className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span>💡 The Solution</span>
                </h4>
                <p className="font-serif text-neutral-700 text-sm leading-relaxed">
                  {selectedProject.solution || selectedProject.longDescription}
                </p>
              </div>
            </div>

            {/* Design Process Roadmap */}
            <div className="mb-8">
              <h4 className="font-serif text-lg font-bold text-neutral-800 mb-4 border-b border-neutral-200 pb-2">
                End-to-End Design Process
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {(selectedProject.processSteps || [
                  { step: 'Research', desc: 'User personas & audits' },
                  { step: 'User Flows', desc: 'Low-fi layouts' },
                  { step: 'UI Design', desc: 'High-fi auto-layouts' },
                  { step: 'Prototype', desc: 'Interactive motion' },
                  { step: 'Outcome', desc: 'User testing validation' },
                ]).map((p, idx) => (
                  <div key={idx} className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-center">
                    <span className="font-mono text-[9px] text-indigo-600 font-bold uppercase">Phase {idx + 1}</span>
                    <p className="font-serif text-xs font-bold text-neutral-800 mt-1">{p.step}</p>
                    <p className="font-serif text-[10px] text-neutral-500 mt-1">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Long Description */}
            <div className="mb-8 p-5 bg-neutral-50/40 border border-neutral-200 rounded-xl">
              <h4 className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
                Detailed Scope & Methodology
              </h4>
              <p className="font-serif text-neutral-700 text-sm md:text-base leading-relaxed">
                {selectedProject.longDescription}
              </p>
            </div>

            {/* Return button */}
            <div className="border-t border-dashed border-neutral-200 pt-5 flex justify-end">
              <button
                onClick={handleCloseDetail}
                className="px-5 py-2 border border-neutral-800 hover:bg-neutral-50 transition-colors font-mono text-xs uppercase tracking-wider rounded cursor-none interactive-obj"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        )}

      </div>

      <div className="w-full text-center text-neutral-400 font-mono text-[10px] mt-8 select-none">
        Exhibiting Urwah's design case studies in Faisalabad, Pakistan
      </div>
    </div>
  );
}
