/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill, Experience, Certification, DesignPrinciple, Testimonial, ClientCollaboration, InspirationItem, PlaylistItem, LearningGoal } from './types';

export const PERSONAL_INFO = {
  name: "Urwah Imtiaz",
  role: "UI/UX Designer • Product Designer • Web Designer",
  location: "Faisalabad, Punjab, Pakistan",
  tagline: "Designing beautiful, accessible, and intuitive digital experiences through rigorous research, user flows, and interactive prototyping.",
  about: "I'm Urwah Imtiaz, a dedicated UI/UX Designer, Web Designer, and Product Designer who loves turning complex ideas into elegant, user-centered digital products. I combine interaction design, design thinking, UX research, and high-fidelity prototyping to build visual communication pathways that are beautiful, intuitive, and strategically effective.",
  currentStatus: [
    "UI/UX & Product Designer",
    "Expert in Design Thinking & User Research",
    "UX Architecture & Prototyping Specialist",
    "Responsive Web Design Consultant",
    "Freelance Designer for Global Brands"
  ],
  mission: "To design intuitive and accessible digital products that solve real-world problems through empathy, creativity, and user-centered design."
};

export const PROJECTS: Project[] = [
  {
    id: "astronomia",
    title: "Astronomia",
    category: "Web Product",
    role: "Product Designer",
    duration: "4 Weeks",
    description: "A space-inspired web experience blending motion-driven storytelling with immersive visual systems and accessible navigation.",
    longDescription: "Created Astronomia to showcase elegant digital narrative design through dark mode art direction, layered content cards, and fluid interaction transitions.",
    tech: ["Figma", "Motion Design", "Responsive Web", "Visual Systems", "Prototype"],
    color: "#0ea5e9",
    sketchUrl: "M 20,50 A 30,30 0 1,0 80,50 A 30,30 0 1,0 20,50 M 50,15 L 50,85 M 15,50 L 85,50",
    liveUrl: "https://project-3-iota-gold.vercel.app/",
    prototypeUrl: "https://figma.com/proto/astronomia",
    githubUrl: "https://github.com/urrwa/project_3",
    stat: "Immersive Journey",
    problem: "Astronomia required a visually striking launch experience that still stayed intuitive and easy to navigate.",
    solution: "Designed a dramatic, scroll-friendly layout with bold content sections, motion details, and intuitive calls-to-action.",
    processSteps: [
      { step: "Research", desc: "Design inspiration and space-themed moodboard exploration." },
      { step: "Interface", desc: "Built layered content blocks with strong typographic rhythm." },
      { step: "Interaction", desc: "Designed motion-led transitions for a seamless storytelling flow." },
      { step: "Prototype", desc: "Validated experience with interactive user path testing." },
      { step: "Outcome", desc: "Delivered a distinctive branded web experience ready for live presentation." }
    ]
  },
  {
    id: "nexus-ai",
    title: "Nexus AI",
    category: "AI Product",
    role: "Product Designer",
    duration: "3 Weeks",
    description: "An AI-powered design assistant that helps generate UI suggestions, content, and rapid prototypes.",
    longDescription: "Nexus AI is an experimental product that blends generative AI with design workflows to accelerate ideation, produce component suggestions, and create content-ready design tokens for rapid prototyping.",
    tech: ["Next.js", "React", "OpenAI", "Figma", "Design Systems"],
    color: "#7c3aed",
    sketchUrl: "M 40,20 L 60,20 L 60,80 L 40,80 Z M 50,35 L 50,65",
    liveUrl: "https://project-2-five-lake.vercel.app/",
    prototypeUrl: "https://figma.com/proto/nexus-ai",
    githubUrl: "https://github.com/urrwa/project_2",
    stat: "Conversational Design Assistant",
    problem: "Designers need faster ideation tools and contextual content generation to ship prototypes quickly.",
    solution: "Integrated generative assistants and component libraries to enable one-click starter layouts and copy suggestions.",
    processSteps: [
      { step: "Research", desc: "Study designer workflows and pain points for ideation and content generation." },
      { step: "Modeling", desc: "Integrate generative models for copy, layout suggestions, and token generation." },
      { step: "UI", desc: "Build conversational UI for seamless prompt-based interactions and preview." },
      { step: "Prototype", desc: "Rapid prototype flows with exportable design tokens and component snippets." },
      { step: "Outcome", desc: "Reduced initial concept-to-prototype time by enabling instant starter layouts." }
    ]
  },
  {
    id: "ciron",
    title: "Ciron",
    category: "Web Product",
    role: "Product Designer",
    duration: "3 Weeks",
    description: "A modular UI toolkit and interactive landing experience focused on accessibility and performance.",
    longDescription: "Ciron is a production-ready front-end system that combines fast performance, accessible components, and refined motion for product landing pages and marketing experiences.",
    tech: ["React", "TypeScript", "Figma", "Tailwind", "Accessibility"],
    color: "#0ea5a4",
    sketchUrl: "M 25,20 L 75,20 L 75,80 L 25,80 Z M 40,40 L 60,40 L 60,60 L 40,60 Z",
    liveUrl: "https://project-1-bay-gamma.vercel.app/",
    prototypeUrl: "https://figma.com/proto/ciron",
    githubUrl: "https://github.com/urrwa/project_1",
    stat: "Accessible & Fast",
    problem: "Marketing sites often compromise accessibility for visual flair and slow performance.",
    solution: "A component-first system with accessible primitives, optimized assets, and motion tuned for reduced motion preferences.",
    processSteps: [
      { step: "Research", desc: "Accessibility audits and performance budgeting for landing pages." },
      { step: "Design", desc: "Create accessible primitives and visual tokens in Figma." },
      { step: "Build", desc: "Implement fast, SSR-ready components with TypeScript and Tailwind." },
      { step: "Test", desc: "Measure Lighthouse performance and run inclusive usability tests." },
      { step: "Outcome", desc: "Delivered a reusable toolkit for high-converting, accessible launches." }
    ]
  },
  {
    id: "graphite",
    title: "Studio Graphite Branding",
    category: "Branding",
    role: "Brand & Visual Designer",
    duration: "1.5 Weeks",
    description: "A cohesive brand identity, vector design system, and responsive landing page layout exploring hand-drawn visual metaphors.",
    longDescription: "Created high-fidelity landing pages and styled modern assets for creative studios. Formulated a design system incorporating custom pencil sketches, watercolor fills, clean spacing rules, and a fluid typographic hierarchy optimized for multi-screen densities.",
    tech: ["Adobe Illustrator", "Figma", "Adobe Photoshop", "Visual Design", "Brand Identity"],
    color: "#f59e0b", // Amber
    sketchUrl: "M 50,15 L 25,45 M 50,15 L 75,45 M 25,45 L 10,75 M 25,45 L 40,75 M 75,45 L 60,75 M 75,45 L 90,75",
    liveUrl: "https://figma.com",
    prototypeUrl: "https://figma.com/proto/graphite",
    githubUrl: "https://github.com",
    stat: "100% Custom Vector Art",
    problem: "A creative agency needed a distinct visual presence to stand out from generic AI-generated templates.",
    solution: "A bespoke hand-drawn vector identity with charcoal textures, warm paper canvas tones, and expressive micro-interactions.",
    processSteps: [
      { step: "Research", desc: "Competitor brand positioning and moodboard synthesis." },
      { step: "Layout Design", desc: "Editorial landing page layouts focusing on visual storytelling." },
      { step: "UI Design", desc: "Custom SVG vector icons and organic hand-drawn divider lines." },
      { step: "Prototype", desc: "Parallax scrolling and paper unfold reveal animations." },
      { step: "Outcome", desc: "Delivered a complete brand design system and high-fidelity web guidelines." }
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
  { name: "Adobe XD", category: "tools", level: 92, description: "Generating UI prototypes, rapid layout testing, and client preview animations.", color: "#ef4444" },
  { name: "Creative Suite", category: "tools", level: 90, description: "Vector illustrations in Adobe Illustrator, pixel editing in Adobe Photoshop.", color: "#ef4444" },
  { name: "Notion", category: "tools", level: 94, description: "Constructing design case studies, tracking specifications, and project managing timelines.", color: "#ef4444" }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Lead UI/UX Designer & Product Designer",
    company: "Freelance Creative Agency & Global Clients",
    duration: "2024 - Present",
    description: [
      "Designed modern websites, responsive landing pages, analytical dashboards, and mobile applications in Figma.",
      "Conducted extensive user research, including user interviews and empathy mapping, to drive human-centered design solutions.",
      "Built comprehensive, pixel-perfect design systems with unified typographic hierarchies, auto-layouts, and rich variants.",
      "Created highly interactive, gesture-driven high-fidelity prototypes in Figma to pitch and align project stakeholders."
    ],
    glowingLine: true
  },
  {
    id: "exp2",
    role: "Product & Web Designer Consultant",
    company: "Brand Identity Campaigns",
    duration: "2023 - Present",
    description: [
      "Spearheaded user experience optimization projects, resulting in clean, accessible, and high-converting visual pathways.",
      "Mapped user flows, journey maps, and information architecture to simplify product navigation layouts.",
      "Designed custom brand collateral, high-end landing page frames, and curated cohesive visual asset guidelines.",
      "Collaborated with cross-functional stakeholders to align aesthetic designs with core business KPIs and marketing funnels."
    ],
    glowingLine: false
  },
  {
    id: "exp3",
    role: "UI/UX & Interactive Design Researcher",
    company: "Academic R&D / FAST NUCES Labs",
    duration: "2022 - Present",
    description: [
      "Conducted research on Human-Computer Interaction (HCI) patterns and accessibility standards (WCAG).",
      "Formulated interface blueprints, low-fidelity paper prototype sheets, and mapped structured user navigation routes.",
      "Tested visual layouts and gathered user feedback through qualitative usability testing and eye-tracking simulations."
    ],
    glowingLine: false
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Google UX Design Professional Certificate", issuer: "Coursera / Google", date: "2023", color: "#ec4899" },
  { title: "Figma UI/UX Advanced Design", issuer: "Coursera", date: "2023", color: "#8b5cf6" },
  { title: "Design Thinking & User Innovation", issuer: "Interaction Design Foundation", date: "2023", color: "#06b6d4" },
  { title: "User Experience Foundations", issuer: "Interaction Design Foundation", date: "2024", color: "#10b981" },
  { title: "Interaction Design Specialization", issuer: "Interaction Design Foundation", date: "2024", color: "#f59e0b" },
  { title: "Responsive Web Design (Design Perspective)", issuer: "freeCodeCamp", date: "2023", color: "#ef4444" }
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
  { value: "15+", label: "Design Projects Completed" },
  { value: "6+", label: "Professional Design Credentials" },
  { value: "4+", label: "Design Domains of Expertise" },
  { value: "2022", label: "Started Design Journey" },
  { value: "100%", label: "User-Centered & Empathetic" }
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
  {
    name: "Sarah Lin",
    role: "VP of Product",
    company: "ShopSwell Retail",
    content: "Urwah transformed our entire checkout conversion funnel. Her meticulous attention to micro-interactions and mobile usability decreased user friction by 42%. Exceptional designer!",
    avatarBg: "#ec4899"
  },
  {
    name: "Marcus Vance",
    role: "Lead Analytics Architect",
    company: "DataCommand Cloud",
    content: "The Bento-Grid layout Urwah designed for our SaaS dashboard reduced analyst onboarding time immensely. She balances high data density with remarkable visual elegance.",
    avatarBg: "#06b6d4"
  },
  {
    name: "Dr. Elena Rostova",
    role: "HealthTech Director",
    company: "CarePulse Eldercare",
    content: "Designing for senior citizens requires deep empathy and strict accessibility. Urwah delivered a heartwarming, intuitive telemedicine flow that our patients adore.",
    avatarBg: "#10b981"
  }
];

export const CLIENT_COLLABORATIONS: ClientCollaboration[] = [
  { name: "Ciron", industry: "Web Product", deliverable: "Landing & Component System", year: "2024" },
  { name: "Nexus AI", industry: "AI Product", deliverable: "Generative Design Assistant", year: "2024" },
  { name: "Astronomia", industry: "Web Product", deliverable: "Immersive Web Experience", year: "2024" },
  { name: "Studio Graphite", industry: "Creative Agency", deliverable: "Brand Identity & Landing Page", year: "2023" },
  { name: "FAST NUCES HCI Lab", industry: "Academic Research", deliverable: "Usability Eye-Tracking Audit", year: "2022" }
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
