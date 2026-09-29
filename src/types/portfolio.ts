export type SkillCategory = 'core' | 'frontend' | 'backend' | 'aiml' | 'tools';

export interface SkillItem {
  id: string;
  name: string;
  percentage: number; // 0-100
  category: SkillCategory;
  description: string;
  icon?: string;
  displayOrder: number;
  active: boolean;
}

export type ProjectCategory = 'SOFTWARE' | 'AI' | 'WEB' | 'ACADEMIC' | 'FUTURE';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  date: string;
  featured: boolean;
  displayOrder: number;
  active: boolean;
}

export interface ExperienceItem {
  id: string;
  position: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  technologies: string[];
  displayOrder: number;
  active: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  url?: string;
  status: 'In Development' | 'Beta' | 'Launched' | 'Concept';
  displayOrder: number;
  active: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  description: string;
  startYear: string;
  endYear: string;
  grade?: string;
  milestoneTitle: string;
  current: boolean;
  displayOrder: number;
  active: boolean;
}

export type AchievementCategory = 'ACADEMIC' | 'TECHNICAL' | 'PROJECTS' | 'CERTIFICATIONS' | 'COMPETITIONS' | 'OTHER';

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  year: string;
  certificateUrl?: string;
  featured: boolean;
  displayOrder: number;
  active: boolean;
}

export interface ProfileData {
  fullName: string;
  title: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  instagram: string;
  stats: {
    experience: string;
    projects: string;
    technologies: string;
    learning: string;
  };
  focus: {
    currentLearning: string;
    focusArea: string;
    goal: string;
    mindset: string;
    vision: string;
  };
  resumeUrl: string | null;
  resumeFileName?: string;
}
