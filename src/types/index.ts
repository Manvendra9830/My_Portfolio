// src/types/index.ts

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  linkedin: string;
  github: string;
  resumeLink: string;
  achievementChips: string[];
}

export interface DomainFocus {
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  github: string;
  tech: string[];
  domains: string[];
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  points: string[];
}

export interface Skills {
  technical: {
    [key: string]: string[];
  };
  nonTechnical: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  score: string;
}

export interface Certificate {
  title: string;
  link: string;
}
