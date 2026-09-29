import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Save, RotateCcw, AlertTriangle, FileText, Upload, Eye, EyeOff, Lock, Unlock, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillCategory, ProjectCategory, AchievementCategory } from '../types/portfolio';

export const AdminDashboard: React.FC = () => {
  const {
    profile,
    updateProfile,
    updateResumeFile,
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
    toggleSkillActive,
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectActive,
    experience,
    addExperience,
    updateExperience,
    deleteExperience,
    toggleExperienceActive,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductActive,
    education,
    addEducation,
    updateEducation,
    deleteEducation,
    toggleEducationActive,
    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    toggleAchievementActive,
    resetToDefaults,
    isAdminOpen,
    setIsAdminOpen,
  } = usePortfolio();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'about' | 'skills' | 'projects' | 'experience' | 'products' | 'education' | 'achievements' | 'contact' | 'resume'
  >('overview');

  // Delete Confirmation State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'skill' | 'project' | 'experience' | 'product' | 'education' | 'achievement';
    id: string;
    title: string;
  } | null>(null);

  // Forms State
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    percentage: 85,
    category: 'aiml' as SkillCategory,
    description: '',
  });

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: 'Python, React',
    category: 'AI' as ProjectCategory,
    date: '2026',
    featured: true,
    githubUrl: '',
    liveUrl: '',
  });

  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState({
    position: '',
    organization: '',
    description: '',
    startDate: '2025',
    endDate: 'Present',
    location: 'Gujarat, India',
    technologies: 'React, Node.js',
  });

  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState({
    name: '',
    description: '',
    status: 'In Development' as 'In Development' | 'Beta' | 'Launched' | 'Concept',
    url: '',
  });

  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [eduForm, setEduForm] = useState({
    milestoneTitle: 'MILESTONE 01',
    degree: '',
    institution: '',
    description: '',
    startYear: '2024',
    endYear: '2027',
    current: true,
  });

  const [editingAchId, setEditingAchId] = useState<string | null>(null);
  const [achForm, setAchForm] = useState({
    title: '',
    description: '',
    category: 'TECHNICAL' as AchievementCategory,
    year: '2026',
    featured: true,
  });

  const [profileForm, setProfileForm] = useState({ ...profile });

  if (!isAdminOpen) return null;

  // Handle Passkey Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === 'cmd2026' || passkeyInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
      setPasskeyInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;
    const { type, id } = deleteConfirm;
    if (type === 'skill') deleteSkill(id);
    if (type === 'project') deleteProject(id);
    if (type === 'experience') deleteExperience(id);
    if (type === 'product') deleteProduct(id);
    if (type === 'education') deleteEducation(id);
    if (type === 'achievement') deleteAchievement(id);
    setDeleteConfirm(null);
  };

  // Skill submit
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name) return;
    if (editingSkillId) {
      updateSkill(editingSkillId, {
        name: skillForm.name,
        percentage: Number(skillForm.percentage),
        category: skillForm.category,
        description: skillForm.description,
      });
      setEditingSkillId(null);
    } else {
      addSkill({
        name: skillForm.name,
        percentage: Number(skillForm.percentage),
        category: skillForm.category,
        description: skillForm.description,
        displayOrder: skills.length + 1,
        active: true,
      });
    }
    setSkillForm({ name: '', percentage: 85, category: 'aiml', description: '' });
  };

  // Project submit
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title) return;
    const techArray = projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean);
    if (editingProjectId) {
      updateProject(editingProjectId, {
        title: projectForm.title,
        description: projectForm.description,
        technologies: techArray,
        category: projectForm.category,
        date: projectForm.date,
        featured: projectForm.featured,
        githubUrl: projectForm.githubUrl,
        liveUrl: projectForm.liveUrl,
      });
      setEditingProjectId(null);
    } else {
      addProject({
        title: projectForm.title,
        description: projectForm.description,
        technologies: techArray,
        category: projectForm.category,
        date: projectForm.date,
        featured: projectForm.featured,
        githubUrl: projectForm.githubUrl,
        liveUrl: projectForm.liveUrl,
        displayOrder: projects.length + 1,
        active: true,
      });
    }
    setProjectForm({
      title: '',
      description: '',
      technologies: 'Python, React',
      category: 'AI',
      date: '2026',
      featured: true,
      githubUrl: '',
      liveUrl: '',
    });
  };

  // Experience submit
  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.position) return;
    const techArray = expForm.technologies.split(',').map(t => t.trim()).filter(Boolean);
    if (editingExpId) {
      updateExperience(editingExpId, {
        position: expForm.position,
        organization: expForm.organization,
        description: expForm.description,
        startDate: expForm.startDate,
        endDate: expForm.endDate,
        location: expForm.location,
        technologies: techArray,
      });
      setEditingExpId(null);
    } else {
      addExperience({
        position: expForm.position,
        organization: expForm.organization,
        description: expForm.description,
        startDate: expForm.startDate,
        endDate: expForm.endDate,
        location: expForm.location,
        technologies: techArray,
        displayOrder: experience.length + 1,
        active: true,
      });
    }
    setExpForm({ position: '', organization: '', description: '', startDate: '2025', endDate: 'Present', location: 'Gujarat, India', technologies: 'React, Node.js' });
  };

  // Products submit
  const handleSaveProd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name) return;
    if (editingProdId) {
      updateProduct(editingProdId, {
        name: prodForm.name,
        description: prodForm.description,
        status: prodForm.status,
        url: prodForm.url,
      });
      setEditingProdId(null);
    } else {
      addProduct({
        name: prodForm.name,
        description: prodForm.description,
        status: prodForm.status,
        url: prodForm.url,
        displayOrder: products.length + 1,
        active: true,
      });
    }
    setProdForm({ name: '', description: '', status: 'In Development', url: '' });
  };

  // Education submit
  const handleSaveEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.degree) return;
    if (editingEduId) {
      updateEducation(editingEduId, {
        milestoneTitle: eduForm.milestoneTitle,
        degree: eduForm.degree,
        institution: eduForm.institution,
        description: eduForm.description,
        startYear: eduForm.startYear,
        endYear: eduForm.endYear,
        current: eduForm.current,
      });
      setEditingEduId(null);
    } else {
      addEducation({
        milestoneTitle: eduForm.milestoneTitle,
        degree: eduForm.degree,
        institution: eduForm.institution,
        description: eduForm.description,
        startYear: eduForm.startYear,
        endYear: eduForm.endYear,
        current: eduForm.current,
        displayOrder: education.length + 1,
        active: true,
      });
    }
    setEduForm({ milestoneTitle: 'MILESTONE 01', degree: '', institution: '', description: '', startYear: '2024', endYear: '2027', current: true });
  };

  // Achievements submit
  const handleSaveAch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achForm.title) return;
    if (editingAchId) {
      updateAchievement(editingAchId, {
        title: achForm.title,
        description: achForm.description,
        category: achForm.category,
        year: achForm.year,
        featured: achForm.featured,
      });
      setEditingAchId(null);
    } else {
      addAchievement({
        title: achForm.title,
        description: achForm.description,
        category: achForm.category,
        year: achForm.year,
        featured: achForm.featured,
        displayOrder: achievements.length + 1,
        active: true,
      });
    }
    setAchForm({ title: '', description: '', category: 'TECHNICAL', year: '2026', featured: true });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      updateResumeFile(dataUrl, file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="hud-glass w-full max-w-5xl h-[90vh] rounded-2xl border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="font-display font-black text-lg text-white tracking-wider">
              PORTFOLIO CMS ADMIN SYSTEM
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => {
                  if (window.confirm('Reset all portfolio data back to original defaults?')) {
                    resetToDefaults();
                  }
                }}
                className="px-3 py-1.5 rounded text-xs font-mono text-slate-400 hover:text-red-400 hover:bg-slate-900 border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION GATEWAY */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <form onSubmit={handleLogin} className="hud-glass p-8 rounded-2xl border border-cyan-500/30 max-w-md w-full text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>

              <div>
                <h3 className="font-display font-bold text-xl text-white">Protected Admin Access</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your administrative master passkey to access CMS controls.
                </p>
              </div>

              <div>
                <input
                  type="password"
                  required
                  placeholder="Master Passkey"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 p-3 rounded-xl text-xs font-mono text-white text-center tracking-widest focus:outline-none focus:border-cyan-400"
                />
                {authError && (
                  <span className="text-[11px] font-mono text-red-400 mt-1 block">
                    Invalid passkey.
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                UNLOCK ADMIN CMS
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Dashboard Navigation Tabs */}
            <div className="px-6 py-2.5 border-b border-slate-800 bg-slate-900/60 flex items-center gap-1 overflow-x-auto text-xs font-mono">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: `Skills (${skills.length})` },
                { id: 'projects', label: `Projects (${projects.length})` },
                { id: 'experience', label: `Experience (${experience.length})` },
                { id: 'products', label: `Products (${products.length})` },
                { id: 'education', label: `Education (${education.length})` },
                { id: 'achievements', label: `Achievements (${achievements.length})` },
                { id: 'contact', label: 'Contact Details' },
                { id: 'resume', label: 'Resume File' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 rounded-md whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Body */}
            <div className="flex-1 overflow-y-auto p-6 text-slate-200">
              {/* TAB: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="hud-glass p-4 rounded-xl border border-cyan-500/20">
                      <span className="text-xs text-slate-400 font-mono block">Active Skills</span>
                      <span className="text-2xl font-bold text-cyan-400 font-mono">
                        {skills.filter(s => s.active).length} / {skills.length}
                      </span>
                    </div>
                    <div className="hud-glass p-4 rounded-xl border border-cyan-500/20">
                      <span className="text-xs text-slate-400 font-mono block">Projects Published</span>
                      <span className="text-2xl font-bold text-cyan-400 font-mono">
                        {projects.filter(p => p.active).length}
                      </span>
                    </div>
                    <div className="hud-glass p-4 rounded-xl border border-cyan-500/20">
                      <span className="text-xs text-slate-400 font-mono block">Experience Entries</span>
                      <span className="text-2xl font-bold text-cyan-400 font-mono">
                        {experience.length}
                      </span>
                    </div>
                    <div className="hud-glass p-4 rounded-xl border border-cyan-500/20">
                      <span className="text-xs text-slate-400 font-mono block">Resume PDF Status</span>
                      <span className={`text-sm font-bold font-mono block mt-1 ${profile.resumeUrl ? 'text-emerald-400' : 'text-yellow-400'}`}>
                        {profile.resumeUrl ? 'Verified & Active' : 'Coming Soon'}
                      </span>
                    </div>
                  </div>

                  <div className="hud-glass p-6 rounded-xl border border-cyan-500/20">
                    <h3 className="font-display font-bold text-lg text-white mb-2">
                      Full Content Management
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      All sections (About, Skills, Projects, Experience, Products, Education, Achievements, Resume, Contact) are completely customizable here. If any collection is empty, the public website automatically displays a professional Coming Soon state.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB: ABOUT */}
              {activeTab === 'about' && (
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Headline</label>
                    <input
                      type="text"
                      value={profileForm.headline}
                      onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">About Biography</label>
                    <textarea
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Focus Area</label>
                      <input
                        type="text"
                        value={profileForm.focus.focusArea}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          focus: { ...profileForm.focus, focusArea: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Mindset</label>
                      <input
                        type="text"
                        value={profileForm.focus.mindset}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          focus: { ...profileForm.focus, mindset: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Vision</label>
                      <input
                        type="text"
                        value={profileForm.focus.vision}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          focus: { ...profileForm.focus, vision: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      updateProfile(profileForm);
                      alert('About information updated!');
                    }}
                    className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs rounded transition-colors flex items-center gap-2 cursor-pointer mt-4"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save About Details</span>
                  </button>
                </div>
              )}

              {/* TAB: SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {/* Add / Edit Form */}
                  <form onSubmit={handleSaveSkill} className="hud-glass p-5 rounded-xl border border-cyan-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-cyan-400 uppercase tracking-wider">
                        {editingSkillId ? '✏ Edit Skill' : '+ Add New Skill'}
                      </h4>
                      {editingSkillId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSkillId(null);
                            setSkillForm({ name: '', percentage: 85, category: 'aiml', description: '' });
                          }}
                          className="text-xs font-mono text-slate-400 hover:text-white"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Skill Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Python, React"
                          value={skillForm.name}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          Percentage (0–100%): <span className="text-cyan-400 font-bold">{skillForm.percentage}%</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          required
                          value={skillForm.percentage}
                          onChange={(e) => setSkillForm({ ...skillForm, percentage: Math.min(100, Math.max(0, Number(e.target.value))) })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Category</label>
                        <select
                          value={skillForm.category}
                          onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as SkillCategory })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        >
                          <option value="aiml">AI & Machine Learning</option>
                          <option value="frontend">Frontend & UI</option>
                          <option value="backend">Backend & Database</option>
                          <option value="core">Core CS & DSA</option>
                          <option value="tools">Tools & DevOps</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Description</label>
                      <input
                        type="text"
                        placeholder="Description..."
                        value={skillForm.description}
                        onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs rounded transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingSkillId ? 'Update Skill' : 'Save New Skill'}</span>
                    </button>
                  </form>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="hud-glass p-3 rounded-lg border border-slate-800 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleSkillActive(skill.id)}
                            className={`p-1 rounded cursor-pointer ${skill.active ? 'text-cyan-400' : 'text-slate-600'}`}
                            title={skill.active ? 'Disable' : 'Enable'}
                          >
                            {skill.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>

                          <div>
                            <span className={`font-semibold text-sm ${skill.active ? 'text-white' : 'text-slate-500 line-through'}`}>
                              {skill.name}
                            </span>
                            <span className="text-[11px] font-mono text-cyan-400 ml-2">
                              {skill.percentage}%
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 ml-2 uppercase">
                              [{skill.category}]
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingSkillId(skill.id);
                              setSkillForm({
                                name: skill.name,
                                percentage: skill.percentage,
                                category: skill.category,
                                description: skill.description,
                              });
                            }}
                            className="p-1.5 rounded bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirm({ type: 'skill', id: skill.id, title: skill.name })}
                            className="p-1.5 rounded bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Add / Edit Form */}
                  <form onSubmit={handleSaveProject} className="hud-glass p-5 rounded-xl border border-cyan-500/30 space-y-4">
                    <h4 className="font-display font-bold text-sm text-cyan-400 uppercase tracking-wider">
                      {editingProjectId ? '✏ Edit Project' : '+ Add New Project'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Project Title</label>
                        <input
                          type="text"
                          required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Technologies (comma separated)</label>
                        <input
                          type="text"
                          required
                          value={projectForm.technologies}
                          onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Category</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as ProjectCategory })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        >
                          <option value="SOFTWARE">SOFTWARE</option>
                          <option value="AI">AI</option>
                          <option value="WEB">WEB</option>
                          <option value="ACADEMIC">ACADEMIC</option>
                          <option value="FUTURE">FUTURE</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Year</label>
                        <input
                          type="text"
                          value={projectForm.date}
                          onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs font-mono text-cyan-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={projectForm.featured}
                        onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                        className="accent-cyan-400"
                      />
                      <span>Featured Project</span>
                    </label>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs rounded transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingProjectId ? 'Update Project' : 'Save Project'}</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    {projects.map(proj => (
                      <div key={proj.id} className="hud-glass p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-sm text-white">{proj.title}</span>
                          <span className="text-[10px] font-mono text-cyan-400 ml-2">[{proj.category}]</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDeleteConfirm({ type: 'project', id: proj.id, title: proj.title })}
                            className="p-1.5 rounded bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <form onSubmit={handleSaveExp} className="hud-glass p-5 rounded-xl border border-cyan-500/30 space-y-4">
                    <h4 className="font-display font-bold text-sm text-cyan-400 uppercase tracking-wider">
                      {editingExpId ? '✏ Edit Experience' : '+ Add Experience Record'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Position / Role</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Software Engineer Intern"
                          value={expForm.position}
                          onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Organization / Company</label>
                        <input
                          type="text"
                          required
                          value={expForm.organization}
                          onChange={(e) => setExpForm({ ...expForm, organization: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Start Date</label>
                        <input
                          type="text"
                          value={expForm.startDate}
                          onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">End Date</label>
                        <input
                          type="text"
                          value={expForm.endDate}
                          onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={expForm.description}
                        onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs rounded transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingExpId ? 'Update Experience' : 'Save Experience'}</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    {experience.map(exp => (
                      <div key={exp.id} className="hud-glass p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-sm text-white">{exp.position}</span>
                          <span className="text-xs text-slate-400 ml-2">@ {exp.organization}</span>
                        </div>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'experience', id: exp.id, title: exp.position })}
                          className="p-1.5 rounded bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PRODUCTS */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <form onSubmit={handleSaveProd} className="hud-glass p-5 rounded-xl border border-cyan-500/30 space-y-4">
                    <h4 className="font-display font-bold text-sm text-cyan-400 uppercase tracking-wider">
                      {editingProdId ? '✏ Edit Product' : '+ Add Product'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Product Name</label>
                        <input
                          type="text"
                          required
                          value={prodForm.name}
                          onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Status</label>
                        <select
                          value={prodForm.status}
                          onChange={(e) => setProdForm({ ...prodForm, status: e.target.value as typeof prodForm.status })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        >
                          <option value="In Development">In Development</option>
                          <option value="Beta">Beta</option>
                          <option value="Launched">Launched</option>
                          <option value="Concept">Concept</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={prodForm.description}
                        onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs rounded transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingProdId ? 'Update Product' : 'Save Product'}</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    {products.map(prod => (
                      <div key={prod.id} className="hud-glass p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-sm text-white">{prod.name}</span>
                          <span className="text-[10px] font-mono text-cyan-400 ml-2">[{prod.status}]</span>
                        </div>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'product', id: prod.id, title: prod.name })}
                          className="p-1.5 rounded bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: EDUCATION */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <form onSubmit={handleSaveEdu} className="hud-glass p-5 rounded-xl border border-cyan-500/30 space-y-4">
                    <h4 className="font-display font-bold text-sm text-cyan-400 uppercase tracking-wider">
                      {editingEduId ? '✏ Edit Education' : '+ Add Education Milestone'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Degree / Diploma</label>
                        <input
                          type="text"
                          required
                          placeholder="B.Tech — Computer Engineering"
                          value={eduForm.degree}
                          onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Institution</label>
                        <input
                          type="text"
                          required
                          placeholder="UV Patel College of Engineering"
                          value={eduForm.institution}
                          onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={eduForm.description}
                        onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs rounded transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingEduId ? 'Update Education' : 'Save Education'}</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    {education.map(edu => (
                      <div key={edu.id} className="hud-glass p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-sm text-white">{edu.degree}</span>
                          <span className="text-xs text-slate-400 ml-2">({edu.institution})</span>
                        </div>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'education', id: edu.id, title: edu.degree })}
                          className="p-1.5 rounded bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: ACHIEVEMENTS */}
              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <form onSubmit={handleSaveAch} className="hud-glass p-5 rounded-xl border border-cyan-500/30 space-y-4">
                    <h4 className="font-display font-bold text-sm text-cyan-400 uppercase tracking-wider">
                      {editingAchId ? '✏ Edit Achievement' : '+ Add Achievement'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={achForm.title}
                          onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">Category</label>
                        <select
                          value={achForm.category}
                          onChange={(e) => setAchForm({ ...achForm, category: e.target.value as AchievementCategory })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        >
                          <option value="ACADEMIC">ACADEMIC</option>
                          <option value="TECHNICAL">TECHNICAL</option>
                          <option value="PROJECTS">PROJECTS</option>
                          <option value="CERTIFICATIONS">CERTIFICATIONS</option>
                          <option value="COMPETITIONS">COMPETITIONS</option>
                          <option value="OTHER">OTHER</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={achForm.description}
                        onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs rounded transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingAchId ? 'Update Achievement' : 'Save Achievement'}</span>
                    </button>
                  </form>

                  <div className="space-y-2">
                    {achievements.map(ach => (
                      <div key={ach.id} className="hud-glass p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-sm text-white">{ach.title}</span>
                          <span className="text-[10px] font-mono text-cyan-400 ml-2">[{ach.category}]</span>
                        </div>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'achievement', id: ach.id, title: ach.title })}
                          className="p-1.5 rounded bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: CONTACT */}
              {activeTab === 'contact' && (
                <div className="space-y-4 max-w-2xl">
                  <p className="text-xs text-slate-400 mb-2">
                    Configure your direct contact channels. If left blank, the website automatically shows "CONTACT INFORMATION COMING SOON" to prevent showing fake data.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="your-email@example.com"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Phone</label>
                      <input
                        type="text"
                        placeholder="+91 XXXXX XXXXX"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="Gujarat, India"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">GitHub URL</label>
                      <input
                        type="text"
                        placeholder="https://github.com/..."
                        value={profileForm.github}
                        onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">LinkedIn URL</label>
                      <input
                        type="text"
                        placeholder="https://linkedin.com/in/..."
                        value={profileForm.linkedin}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Instagram URL</label>
                      <input
                        type="text"
                        placeholder="https://instagram.com/..."
                        value={profileForm.instagram}
                        onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      updateProfile(profileForm);
                      alert('Contact details updated successfully!');
                    }}
                    className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs rounded transition-colors flex items-center gap-2 cursor-pointer mt-4"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </button>
                </div>
              )}

              {/* TAB: RESUME */}
              {activeTab === 'resume' && (
                <div className="space-y-6 max-w-xl">
                  <div className="hud-glass p-6 rounded-xl border border-cyan-500/25">
                    <h4 className="font-display font-bold text-base text-white mb-2">
                      Official Resume Document Management
                    </h4>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      Upload your real verified resume file. The public Download Resume button will automatically activate and serve this real file directly.
                    </p>

                    {profile.resumeUrl ? (
                      <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 mb-4">
                        <span className="text-xs font-mono text-emerald-400 block font-bold mb-1">
                          ✓ Active Real File: {profile.resumeFileName || 'Resume.pdf'}
                        </span>
                        <button
                          onClick={() => updateResumeFile(null, undefined)}
                          className="px-3 py-1.5 rounded bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-xs hover:bg-red-900 cursor-pointer mt-2"
                        >
                          Remove Resume File (Reverts to Coming Soon)
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 rounded-lg bg-yellow-950/30 border border-yellow-500/30 mb-4">
                        <span className="text-xs font-mono text-yellow-400 block font-bold">
                          Status: RESUME COMING SOON
                        </span>
                        <span className="text-xs text-slate-400 mt-1 block">
                          Download button is safely disabled on public website.
                        </span>
                      </div>
                    )}

                    <div className="mt-4">
                      <label className="block text-xs font-mono text-cyan-400 mb-2">
                        Upload Genuine Resume File:
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        onChange={handleFileUpload}
                        className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-cyan-500 file:text-slate-950 hover:file:bg-cyan-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Confirmation Modal for Deletion as requested: "Are you sure you want to delete this item? Cancel / Delete" */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="hud-glass p-6 rounded-2xl border border-red-500 max-w-sm w-full shadow-[0_0_40px_rgba(239,68,68,0.4)]">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="font-display font-bold text-base text-white">
                Confirm Deletion
              </h4>
            </div>

            <p className="text-xs text-slate-300 mb-6">
              Are you sure you want to delete <span className="text-cyan-400 font-bold">"{deleteConfirm.title}"</span>?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.5)]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
