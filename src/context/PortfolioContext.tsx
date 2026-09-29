import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProfileData,
  SkillItem,
  ProjectItem,
  ExperienceItem,
  ProductItem,
  EducationItem,
  AchievementItem
} from '../types/portfolio';
import {
  initialProfile,
  initialSkills,
  initialProjects,
  initialExperience,
  initialProducts,
  initialEducation,
  initialAchievements
} from '../data/initialData';

interface PortfolioContextType {
  profile: ProfileData;
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  products: ProductItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  
  // Profile
  updateProfile: (data: Partial<ProfileData>) => void;
  updateResumeFile: (url: string | null, fileName?: string) => void;
  
  // Skills
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  toggleSkillActive: (id: string) => void;
  
  // Projects
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  toggleProjectActive: (id: string) => void;
  
  // Experience
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  toggleExperienceActive: (id: string) => void;
  
  // Products
  addProduct: (prod: Omit<ProductItem, 'id'>) => void;
  updateProduct: (id: string, prod: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  toggleProductActive: (id: string) => void;
  
  // Education
  addEducation: (edu: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  toggleEducationActive: (id: string) => void;
  
  // Achievements
  addAchievement: (ach: Omit<AchievementItem, 'id'>) => void;
  updateAchievement: (id: string, ach: Partial<AchievementItem>) => void;
  deleteAchievement: (id: string) => void;
  toggleAchievementActive: (id: string) => void;
  
  // Reset
  resetToDefaults: () => void;
  
  // Admin State
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'cmd_portfolio_profile_v1',
  SKILLS: 'cmd_portfolio_skills_v1',
  PROJECTS: 'cmd_portfolio_projects_v1',
  EXPERIENCE: 'cmd_portfolio_experience_v1',
  PRODUCTS: 'cmd_portfolio_products_v1',
  EDUCATION: 'cmd_portfolio_education_v1',
  ACHIEVEMENTS: 'cmd_portfolio_achievements_v1',
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
    return saved ? JSON.parse(saved) : initialExperience;
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [education, setEducation] = useState<EducationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
    return saved ? JSON.parse(saved) : initialEducation;
  });

  const [achievements, setAchievements] = useState<AchievementItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }, [achievements]);

  // Profile
  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const updateResumeFile = (url: string | null, fileName?: string) => {
    setProfile(prev => ({
      ...prev,
      resumeUrl: url,
      resumeFileName: fileName
    }));
  };

  // Skills
  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: `skill-${Date.now()}`
    };
    setSkills(prev => [...prev, newSkill]);
  };

  const updateSkill = (id: string, updated: Partial<SkillItem>) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  const toggleSkillActive = (id: string) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  // Projects
  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [...prev, newProj]);
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const toggleProjectActive = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  // Experience
  const addExperience = (exp: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...exp,
      id: `exp-${Date.now()}`
    };
    setExperience(prev => [...prev, newExp]);
  };

  const updateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    setExperience(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
  };

  const deleteExperience = (id: string) => {
    setExperience(prev => prev.filter(e => e.id !== id));
  };

  const toggleExperienceActive = (id: string) => {
    setExperience(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e));
  };

  // Products
  const addProduct = (prod: Omit<ProductItem, 'id'>) => {
    const newProd: ProductItem = {
      ...prod,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [...prev, newProd]);
  };

  const updateProduct = (id: string, updated: Partial<ProductItem>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleProductActive = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  // Education
  const addEducation = (edu: Omit<EducationItem, 'id'>) => {
    const newEdu: EducationItem = {
      ...edu,
      id: `edu-${Date.now()}`
    };
    setEducation(prev => [...prev, newEdu]);
  };

  const updateEducation = (id: string, updated: Partial<EducationItem>) => {
    setEducation(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
  };

  const deleteEducation = (id: string) => {
    setEducation(prev => prev.filter(e => e.id !== id));
  };

  const toggleEducationActive = (id: string) => {
    setEducation(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e));
  };

  // Achievements
  const addAchievement = (ach: Omit<AchievementItem, 'id'>) => {
    const newAch: AchievementItem = {
      ...ach,
      id: `ach-${Date.now()}`
    };
    setAchievements(prev => [...prev, newAch]);
  };

  const updateAchievement = (id: string, updated: Partial<AchievementItem>) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
  };

  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
  };

  const toggleAchievementActive = (id: string) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const resetToDefaults = () => {
    setProfile(initialProfile);
    setSkills(initialSkills);
    setProjects(initialProjects);
    setExperience(initialExperience);
    setProducts(initialProducts);
    setEducation(initialEducation);
    setAchievements(initialAchievements);
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        projects,
        experience,
        products,
        education,
        achievements,
        updateProfile,
        updateResumeFile,
        addSkill,
        updateSkill,
        deleteSkill,
        toggleSkillActive,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectActive,
        addExperience,
        updateExperience,
        deleteExperience,
        toggleExperienceActive,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductActive,
        addEducation,
        updateEducation,
        deleteEducation,
        toggleEducationActive,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        toggleAchievementActive,
        resetToDefaults,
        isAdminOpen,
        setIsAdminOpen
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
