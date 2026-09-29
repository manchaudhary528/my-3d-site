import { ProfileData, SkillItem, ProjectItem, ExperienceItem, ProductItem, EducationItem, AchievementItem } from '../types/portfolio';

export const initialProfile: ProfileData = {
  fullName: 'CHAUDHARI MAN DINESHBHAI',
  title: 'Computer Engineering Student',
  headline: 'Building intelligent software experiences and exploring the future of technology.',
  bio: "I'm a Computer Engineering student passionate about building intelligent software experiences and exploring the future of technology. I enjoy learning new technologies, turning ideas into practical projects, and continuously improving my development skills.",
  location: 'Gujarat, India',
  email: '', // Empty by default as requested: "Do NOT invent my email, phone number, social links"
  phone: '',
  github: '',
  linkedin: '',
  instagram: '',
  stats: {
    experience: '1+ Years',
    projects: '10+',
    technologies: '15+',
    learning: 'Everyday'
  },
  focus: {
    currentLearning: 'AI / ML & Advanced Web',
    focusArea: 'Full Stack Development',
    goal: 'Build Impactful Products',
    mindset: 'Learn • Build • Improve',
    vision: 'Build technology that creates real-world impact.'
  },
  resumeUrl: null, // Strict rule: No fake resume, "RESUME COMING SOON" until real file uploaded
  resumeFileName: undefined
};

// Real foundational skills with manual percentages
export const initialSkills: SkillItem[] = [
  {
    id: 'skill-1',
    name: 'Python',
    percentage: 85,
    category: 'aiml',
    description: 'Core programming, AI experimentation, and automated data scripts.',
    icon: 'Terminal',
    displayOrder: 1,
    active: true
  },
  {
    id: 'skill-2',
    name: 'React & TypeScript',
    percentage: 75,
    category: 'frontend',
    description: 'Component-driven user interfaces, typed state management, and modern web apps.',
    icon: 'Code',
    displayOrder: 2,
    active: true
  },
  {
    id: 'skill-3',
    name: 'Node.js & Backend',
    percentage: 80,
    category: 'backend',
    description: 'Server architecture, REST API design, and asynchronous request handling.',
    icon: 'Server',
    displayOrder: 3,
    active: true
  },
  {
    id: 'skill-4',
    name: 'C / C++ Fundamentals',
    percentage: 80,
    category: 'core',
    description: 'Low-level systems understanding, memory management, and pointers.',
    icon: 'Cpu',
    displayOrder: 4,
    active: true
  }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Intelligent AI & Vision Platform',
    description: 'Computer engineering project exploring machine learning pipelines, image recognition, and responsive analytical dashboards.',
    technologies: ['Python', 'OpenCV', 'React', 'FastAPI'],
    category: 'AI',
    date: '2026',
    featured: true,
    githubUrl: '',
    liveUrl: '',
    displayOrder: 1,
    active: true
  }
];

// STRICT USER RULE:
// "Experience is currently EMPTY. DO NOT ADD FAKE EXPERIENCE. Initially show: 'EXPERIENCE COMING SOON'."
export const initialExperience: ExperienceItem[] = [];

// STRICT USER RULE:
// "Products is currently EMPTY. Do NOT add fake products. Show: 'PRODUCTS COMING SOON'."
export const initialProducts: ProductItem[] = [];

// STRICT USER RULE:
// "Education is currently EMPTY. Do NOT invent education data. Show: 'EDUCATION COMING SOON'."
export const initialEducation: EducationItem[] = [];

// STRICT USER RULE:
// "Achievements is currently EMPTY. Do NOT invent achievements. Show: 'ACHIEVEMENTS COMING SOON'."
export const initialAchievements: AchievementItem[] = [];
