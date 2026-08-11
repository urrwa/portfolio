/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill, Experience, Certification, DesignPrinciple, Testimonial, ClientCollaboration, InspirationItem, PlaylistItem, LearningGoal } from './types';

export const PERSONAL_INFO = {
  name: "Urwah Imtiaz",
  role: "Creative Frontend Developer • UI Designer",
  location: "Faisalabad, Punjab, Pakistan",
  tagline: "Building animated, scroll-driven web experiences in React and Next.js — sites where motion carries the story instead of decorating it.",
  about: "I'm Urwah Imtiaz. I came to development through design — Figma, design systems, prototyping and user research — and for the last two years I've been building my own concept sites in React, Next.js and TypeScript with GSAP, Framer Motion and Three.js. I'm completing my BS in Artificial Intelligence at FAST-NUCES, which keeps me comfortable with the logic behind the interface.",
  currentStatus: [
    "Creative Frontend Developer",
    "React · Next.js · TypeScript · Tailwind",
    "GSAP · Framer Motion · Three.js",
    "BS Artificial Intelligence, FAST-NUCES",
    "Open to Frontend & Creative Developer roles"
  ],
  mission: "To design and build interfaces where motion, layout and accessibility decisions are made in the browser, not handed over as a mockup."
};

export const PROJECTS: Project[] = [
  {
    id: "nexus-ai",
    title: "Nexus AI",
    category: "Concept Site",
    role: "Designer & Developer",
    duration: "3 Weeks",
    description: "A cinematic single-page site for a fictional AI-agents product, built around a scroll-driven film sequence.",
    longDescription: "A self-initiated concept site, not client work. A Three.js particle field with bloom post-processing sits behind a pinned GSAP ScrollTrigger narrative that plays out in timed beats, followed by agent cards, an architecture strip and a manifesto section. Written as hand-coded HTML, CSS and JavaScript so every animation stays under my control.",
    tech: ["HTML", "CSS", "JavaScript", "Three.js", "GSAP ScrollTrigger"],
    color: "#7c3aed",
    sketchUrl: "M 40,20 L 60,20 L 60,80 L 40,80 Z M 50,35 L 50,65",
    liveUrl: "https://project-2-five-lake.vercel.app/",
    githubUrl: "https://github.com/urrwa/project_2",
    stat: "Cinematic Scroll Experience",
    problem: "I wanted to learn how a scroll timeline can carry a story instead of just revealing one section after another.",
    solution: "Pinned the hero, mapped a particle system and camera movement to scroll progress, and split the narrative into timed beats.",
    processSteps: [
      { step: "Reference", desc: "Collected cinematic web references and storyboarded the scroll beats." },
      { step: "Layout", desc: "Built the sections in semantic HTML with utility styling." },
      { step: "Motion", desc: "Wired GSAP ScrollTrigger to one pinned timeline." },
      { step: "WebGL", desc: "Added a Three.js particle field with bloom post-processing." },
      { step: "Polish", desc: "Tuned timings and checked performance on smaller screens." }
    ]
  },
  {
    id: "astronomia",
    title: "Astronomia Luxe",
    category: "Concept Site",
    role: "Designer & Developer",
    duration: "4 Weeks",
    description: "A luxury watch concept site where a frame-by-frame scroll sequence takes the movement apart as you read.",
    longDescription: "An unofficial concept piece, not client work. Built on Next.js 14 with the App Router: a long image sequence is driven by scroll progress so the watch movement disassembles as you scroll, with Framer Motion transitions and editorial typography holding the page together.",
    tech: ["Next.js 14", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    color: "#0ea5e9",
    sketchUrl: "M 20,50 A 30,30 0 1,0 80,50 A 30,30 0 1,0 20,50 M 50,15 L 50,85 M 15,50 L 85,50",
    liveUrl: "https://project-3-iota-gold.vercel.app/",
    githubUrl: "https://github.com/urrwa/project_3",
    stat: "Scroll-Driven Sequence",
    problem: "A product page for something mechanical needed to explain the object, not just photograph it.",
    solution: "Tied a frame sequence to scroll position so the movement takes itself apart while the copy explains each part.",
    processSteps: [
      { step: "Art Direction", desc: "Set an editorial type scale and a dark, quiet palette." },
      { step: "Sequence", desc: "Prepared and optimised the frame set for scroll playback." },
      { step: "Build", desc: "Implemented the pages in Next.js 14 with the App Router." },
      { step: "Motion", desc: "Added Framer Motion transitions between sections." },
      { step: "Review", desc: "Checked loading behaviour and readability on mobile." }
    ]
  },
  {
    id: "ciron",
    title: "CIRON",
    category: "Concept Site",
    role: "Designer & Developer",
    duration: "3 Weeks",
    description: "A performance bicycle brand concept site with pinned scroll chapters and a small product configurator.",
    longDescription: "A self-initiated brand site concept built in React 19 and TypeScript on Vite. It uses a pinned section rail, crossfading scroll chapters, a staged loader and a product configurator, with GSAP and Motion handling the transitions.",
    tech: ["React 19", "TypeScript", "Vite", "GSAP", "Tailwind CSS"],
    color: "#0ea5a4",
    sketchUrl: "M 25,20 L 75,20 L 75,80 L 25,80 Z M 40,40 L 60,40 L 60,60 L 40,60 Z",
    liveUrl: "https://project-1-bay-gamma.vercel.app/",
    githubUrl: "https://github.com/urrwa/project_1",
    stat: "Pinned Scroll Chapters",
    problem: "Brand sites often look good standing still but fall apart once you start scrolling through them.",
    solution: "Built one pinned rail that carries crossfading chapters, plus a configurator so the product feels handled rather than displayed.",
    processSteps: [
      { step: "Concept", desc: "Wrote the brand story and decided the chapter order." },
      { step: "Components", desc: "Built typed, reusable React components for each chapter." },
      { step: "Motion", desc: "Sequenced the loader and crossfades with GSAP." },
      { step: "Configurator", desc: "Added state-driven product options." },
      { step: "Refine", desc: "Tightened spacing, contrast and keyboard access." }
    ]
  },
  {
    id: "sketch-dimension",
    title: "The Sketch Dimension",
    category: "Portfolio",
    role: "Designer & Developer",
    duration: "Ongoing",
    description: "This portfolio, built as a hand-drawn interactive world with room-based navigation and ambient audio.",
    longDescription: "Built in React and TypeScript on Vite. A custom SVG filter pipeline gives everything its sketched look, an ambient audio engine responds to interaction, and the site is organised as room-based views with a custom cursor, a scripted opening animation and day/night states.",
    tech: ["React", "TypeScript", "Vite", "SVG Filters", "Web Audio API"],
    color: "#f59e0b",
    sketchUrl: "M 50,15 L 25,45 M 50,15 L 75,45 M 25,45 L 10,75 M 25,45 L 40,75 M 75,45 L 60,75 M 75,45 L 90,75",
    liveUrl: "https://urwa-portfolio.vercel.app/",
    githubUrl: "https://github.com/urrwa/portfolio",
    stat: "Hand-Drawn Interactive World",
    problem: "A normal grid portfolio says nothing about how someone thinks about interaction.",
    solution: "Made the portfolio itself the artefact: a drawn world you walk through, with sound, cursor and scene states as part of the story.",
    processSteps: [
      { step: "Sketch", desc: "Drew the scenes and rooms on paper first." },
      { step: "Filters", desc: "Built an SVG filter pipeline for the hand-drawn texture." },
      { step: "Rooms", desc: "Implemented each room as its own React view." },
      { step: "Audio", desc: "Added a Web Audio ambient and interaction layer." },
      { step: "Iterate", desc: "Kept refining performance and copy as the work grew." }
    ]
  }
];

export const SKILLS: Skill[] = [
  // User Experience Research
  { name: "User Research", category: "research", level: 96, description: "Executing user interviews, empathy mapping, card sorting, and persona validation.", color: "#ec4899" },
  { name: "UX Research", category: "research", level: 95, description: "Qualitative research, survey formulation, cognitive walkthroughs, and competitive audits.", color: "#ec4899" },
  { name: "Information Architecture", category: "research", level: 97, description: "Structuring content navigation models, hierarchical layouts, and taxonomy design.", color: "#ec4899" },
  { name: "Usability Testing", category: "research", level: 94, description: "Planning interactive testing schedules, analyzing video logs, and compiling feedback.", color: "#ec4899" },

  // Interaction & Flow
  { name: "User Flows", category: "interaction", level: 98, description: "Formulating structural maps and step-by-step user journeys for visual clarity.", color: "#8b5cf6" },
  { name: "Prototyping", category: "interaction", level: 96, description: "Building advanced high-fidelity responsive click-through micro-animations.", color: "#8b5cf6" },
  { name: "User Journeys", category: "interaction", level: 95, description: "Mapping seamless step-by-step navigation nodes and comprehensive journey lanes.", color: "#8b5cf6" },
  { name: "Interaction Design", category: "interaction", level: 93, description: "Crafting delightful and clear gestural feedbacks, transitions, and hover behaviors.", color: "#8b5cf6" },

  // Visual Design & Systems
  { name: "Design Systems", category: "visual", level: 97, description: "Defining unified component libraries, variant states, auto-layouts, and color tokens.", color: "#06b6d4" },
  { name: "Responsive Design", category: "visual", level: 98, description: "Structuring fluid layouts adapting perfectly across desktop, tablet, and mobile displays.", color: "#06b6d4" },
  { name: "Visual Design", category: "visual", level: 96, description: "Applying color theory, dynamic visual grids, balanced contrast, and sleek layouts.", color: "#06b6d4" },
  { name: "Accessibility (WCAG)", category: "visual", level: 94, description: "Validating contrast ratios, screen reader hierarchies, and large tactile click targets.", color: "#06b6d4" },

  // Design Tools
  { name: "Figma", category: "tools", level: 98, description: "Expertise in auto-layouts, variant properties, nested components, and interactive prototypes.", color: "#ef4444" },
  { name: "FigJam & Miro", category: "tools", level: 95, description: "Collaborative whiteboards for brainstorming, journey mappings, and flow diagrams.", color: "#ef4444" },
  { name: "Adobe XD", category: "tools", level: 92, description: "Generating UI prototypes, rapid layout testing, and quick preview animations.", color: "#ef4444" },
  { name: "Creative Suite", category: "tools", level: 90, description: "Vector illustrations in Adobe Illustrator, pixel editing in Adobe Photoshop.", color: "#ef4444" },
  { name: "Notion", category: "tools", level: 94, description: "Constructing design case studies, tracking specifications, and project managing timelines.", color: "#ef4444" }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Self-Initiated Frontend & UI Projects",
    company: "Personal concept work (no clients)",
    duration: "2024 - Present",
    description: [
      "Designed and built four live concept sites end to end in React, Next.js and TypeScript.",
      "Built scroll-driven interfaces with GSAP ScrollTrigger, Framer Motion and Three.js.",
      "Created reusable component and type systems, plus responsive and accessible layouts.",
      "Documented each project as a self-set brief instead of a client engagement."
    ],
    glowingLine: true
  },
  {
    id: "exp2",
    role: "UI Design Practice",
    company: "Self-directed learning",
    duration: "2022 - Present",
    description: [
      "Practised interface design in Figma: layouts, type scales, components and prototypes.",
      "Studied accessibility (WCAG) and interaction patterns alongside BS AI coursework at FAST-NUCES.",
      "Completed DataCamp courses in Python, SQL, Git and GitHub."
    ],
    glowingLine: false
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Foundations of Git", issuer: "DataCamp", date: "2024", color: "#03ef62" },
  { title: "Intermediate GitHub Concepts", issuer: "DataCamp", date: "2024", color: "#8b5cf6" },
  { title: "Introduction to Python", issuer: "DataCamp", date: "2024", color: "#06b6d4" },
  { title: "Intermediate Python", issuer: "DataCamp", date: "2024", color: "#6366f1" },
  { title: "Introduction to SQL", issuer: "DataCamp", date: "2024", color: "#f59e0b" },
  { title: "Joining Data in SQL", issuer: "DataCamp", date: "2024", color: "#ef4444" }
];

export const SERVICES = [
  {
    num: "01",
    title: "UI/UX Design",
    desc: "Creating modern user experiences with research, user flows, prototypes, and high-fidelity interfaces."
  },
  {
    num: "02",
    title: "Web Design",
    desc: "Responsive web layouts using Figma, visual grid hierarchies, and accessibility-compliant typography."
  },
  {
    num: "03",
    title: "Design Thinking",
    desc: "Problem formulation, empathy mapping, ideation blueprints, and rapid prototyping iterations."
  },
  {
    num: "04",
    title: "UX Research",
    desc: "Semi-structured user interviews, user personas, information architectures, and detailed usability testing reviews."
  },
  {
    num: "05",
    title: "Interaction Design",
    desc: "Mapping seamless user flows, micro-interactions, responsive hover states, and gesture-driven animations."
  },
  {
    num: "06",
    title: "Design Systems",
    desc: "Crafting comprehensive modular component guides, variant structures, auto-layouts, and design token files."
  }
];

export const STATS = [
  { value: "4", label: "Live Projects Built" },
  { value: "10", label: "DataCamp Course Certificates" },
  { value: "4+", label: "Design & Code Domains" },
  { value: "2022", label: "Started Design Journey" },
  { value: "100%", label: "Self-Initiated Work" }
];

export const ADVANTAGES = [
  "Creative Problem Solver",
  "User-Centered Design",
  "Aesthetic Spacing & Typography",
  "Strict Auto-Layout Components",
  "Design-Driven Decision Making",
  "Empathetic Research Mindset",
  "Modern Design System Practices",
  "Clean Documented Case Studies",
  "Attention to Micro-Interactions",
  "Fast Creative Iterations"
];

export const DESIGN_PRINCIPLES: DesignPrinciple[] = [
  {
    title: "Less but Better",
    subtitle: "Dieter Rams Ethos",
    desc: "Removing visual clutter so the core user message and action take center stage.",
    icon: "✨"
  },
  {
    title: "Pixel Perfect",
    subtitle: "Precision & Grid Math",
    desc: "Maintaining strict 8pt grid alignment, sub-pixel rendering, and tokenized spacing.",
    icon: "📐"
  },
  {
    title: "Accessibility First",
    subtitle: "Inclusive by Default",
    desc: "Designing WCAG AA compliant contrast ratios, large touch targets, and screen-reader logic.",
    icon: "👁️"
  },
  {
    title: "Human-Centered",
    subtitle: "Empathy at Core",
    desc: "Rooting every design decision in qualitative user interviews and real human needs.",
    icon: "❤️"
  },
  {
    title: "Storytelling",
    subtitle: "Narrative Journeys",
    desc: "Crafting visual motion, micro-interactions, and copy that guide users effortlessly.",
    icon: "📖"
  }
];

export const TESTIMONIALS: Testimonial[] = [
];

export const CLIENT_COLLABORATIONS: ClientCollaboration[] = [
];

export const INSPIRATION_WALL: InspirationItem[] = [
  { title: "Grid Systems in Graphic Design", category: "Book", quoteOrDesc: "Josef Müller-Brockmann's masterclass on structural clarity and typographic alignment.", tag: "Typography", color: "#f59e0b" },
  { title: "Dieter Rams 10 Principles", category: "Philosophy", quoteOrDesc: "Good design is innovative, useful, aesthetic, understandable, and unobtrusive.", tag: "Design Ethos", color: "#6366f1" },
  { title: "Swiss Style Poster Art", category: "Graphic Design", quoteOrDesc: "Asymmetric layouts, strong sans-serif typefaces, and bold geometric grids.", tag: "Editorial", color: "#ef4444" },
  { title: "Tokyo Minimalist Architecture", category: "Space", quoteOrDesc: "Spatial harmony, natural sunlight pathways, and clean tactile material finishes.", tag: "Spatial", color: "#10b981" },
  { title: "Lottie Micro-Interactions", category: "Motion", quoteOrDesc: "Fluid spring physics driving delightful state feedback during user taps.", tag: "Animation", color: "#ec4899" }
];

export const DESIGN_PLAYLIST: PlaylistItem[] = [
  { title: "Midnight City", artist: "M83", genre: "Synthwave / Electronic", duration: "4:03", mood: "Deep Focus Flow", coverColor: "#8b5cf6" },
  { title: "Experience", artist: "Ludovico Einaudi", genre: "Modern Classical", duration: "5:15", mood: "Wireframe Mapping", coverColor: "#06b6d4" },
  { title: "Resonance", artist: "HOME", genre: "Chillwave", duration: "3:32", mood: "Figma Component Building", coverColor: "#10b981" },
  { title: "Starling", artist: "Tycho", genre: "Ambient / Ambient Electronic", duration: "4:12", mood: "Late Night Prototyping", coverColor: "#f59e0b" }
];

export const CURRENTLY_LEARNING: LearningGoal[] = [
  { topic: "Product Strategy & Metrics", status: "In Progress", progress: 85, icon: "📈" },
  { topic: "Advanced Motion Design (After Effects & Lottie)", status: "Active", progress: 78, icon: "🎬" },
  { topic: "AI in Design & Prompt Engineering", status: "Active", progress: 92, icon: "🤖" },
  { topic: "Creative Coding (Three.js & Canvas)", status: "Exploring", progress: 65, icon: "💻" },
  { topic: "Design Systems Governance at Scale", status: "In Progress", progress: 88, icon: "📐" }
];

export const DESKTOP_SETUP = {
  hardware: ["MacBook Pro 16\" (M2 Max)", "Dell UltraSharp 27\" 4K Display", "Keychron K2 Mechanical Keyboard", "Logitech MX Master 3S"],
  deskItems: ["Charcoal Sketchbook & 2B Pencil", "Ember Temperature Control Mug (Coffee)", "Sony WH-1000XM5 Headphones", "Calming Indoor Monstera Plant"],
  companion: "Simba the Persian Cat 🐈 (Official Studio Mascot & Bug Detector)"
};
