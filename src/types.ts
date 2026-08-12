/**
 * © 2026 Urwah Imtiaz. All rights reserved.
 * Not licensed for reuse or redistribution.
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  color: string;
  sketchUrl: string; // inline SVG or path
  liveUrl?: string;
  prototypeUrl?: string;
  githubUrl?: string;
  stat?: string;
  role?: string;
  duration?: string;
  problem?: string;
  solution?: string;
  processSteps?: { step: string; desc: string }[];
}

export interface Skill {
  name: string;
  category: string;
  level: number; // 0 - 100
  description: string;
  color: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  glowingLine?: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  company: string;
  avatarBg?: string;
}

export interface DesignPrinciple {
  title: string;
  subtitle: string;
  desc: string;
  icon: string;
}

export interface InspirationItem {
  title: string;
  category: string;
  quoteOrDesc: string;
  tag: string;
  color: string;
}

export interface PlaylistItem {
  title: string;
  artist: string;
  genre: string;
  duration: string;
  mood: string;
  coverColor: string;
}

export interface LearningGoal {
  topic: string;
  status: string;
  progress: number;
  icon: string;
}

export interface ClientCollaboration {
  name: string;
  industry: string;
  deliverable: string;
  year: string;
}
