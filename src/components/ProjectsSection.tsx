import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Sparkles, Filter, ArrowUpDown, X, Layers, Lightbulb, PenTool, Wrench, CheckCircle2, RefreshCw } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem, ProjectCategory } from '../types/portfolio';

export const ProjectsSection: React.FC = () => {
  const { projects, setIsAdminOpen } = usePortfolio();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTech, setSelectedTech] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'oldest'>('featured');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Extract all unique technologies from active projects
  const allTechnologies = useMemo(() => {
    const set = new Set<string>();
    projects.filter(p => p.active).forEach(p => {
      p.technologies.forEach(t => set.add(t));
    });
    return Array.from(set).sort();
  }, [projects]);

  // Filter and Sort Projects
  const filteredAndSortedProjects = useMemo(() => {
    let result = projects.filter(p => p.active);

    // Category filter
    if (selectedCategory !== 'ALL') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Technology filter
    if (selectedTech !== 'ALL') {
      result = result.filter(p => p.technologies.includes(selectedTech));
    }

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.displayOrder - b.displayOrder;
      }
      if (sortBy === 'newest') {
        return b.date.localeCompare(a.date);
      }
      if (sortBy === 'oldest') {
        return a.date.localeCompare(b.date);
      }
      return 0;
    });
  }, [projects, selectedCategory, selectedTech, sortBy]);

  // Find the primary featured project for the Blueprint 3 Hologram Pedestal
  const heroFeaturedProject = useMemo(() => {
    return filteredAndSortedProjects.find(p => p.featured) || filteredAndSortedProjects[0] || null;
  }, [filteredAndSortedProjects]);

  return (
    <section id="projects" className="relative py-24 border-t border-slate-900 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching Blueprint 3 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
            WHAT I'VE BUILT
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-1">
            MY PROJECTS
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-display">
            Turning ideas, learning and technology into practical experiences.
          </p>
        </div>

        {/* Engineering Lifecycle Pipeline Bar matching Blueprint 3 */}
        <div className="hud-glass p-4 rounded-2xl border border-cyan-500/25 mb-10 max-w-4xl mx-auto">
          <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-3 flex items-center justify-between">
            <span>Software Development Lifecycle</span>
            <span className="text-cyan-400">AGILE WORKFLOW</span>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <Lightbulb className="w-4 h-4 text-cyan-400 mb-1" />
              <span className="text-xs font-bold text-slate-200">IDEA</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <PenTool className="w-4 h-4 text-blue-400 mb-1" />
              <span className="text-xs font-bold text-slate-200">DESIGN</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <Wrench className="w-4 h-4 text-indigo-400 mb-1" />
              <span className="text-xs font-bold text-slate-200">BUILD</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-xs font-bold text-slate-200">TEST</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <RefreshCw className="w-4 h-4 text-purple-400 mb-1" />
              <span className="text-xs font-bold text-slate-200">IMPROVE</span>
            </div>
          </div>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            {['ALL', 'SOFTWARE', 'AI', 'WEB', 'ACADEMIC', 'FUTURE'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tech Filter & Sorting Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Tech filter */}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-mono text-slate-400">Tech:</span>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="bg-transparent text-xs text-white font-mono focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900">All Technologies</option>
                {allTechnologies.map(t => (
                  <option key={t} value={t} className="bg-slate-900">{t}</option>
                ))}
              </select>
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-mono text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'newest' | 'oldest')}
                className="bg-transparent text-xs text-white font-mono focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900">Featured First</option>
                <option value="newest" className="bg-slate-900">Newest First</option>
                <option value="oldest" className="bg-slate-900">Oldest First</option>
              </select>
            </div>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs font-mono text-cyan-400 hover:underline px-2 py-1 cursor-pointer"
            >
              + CMS Add
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredAndSortedProjects.length === 0 ? (
          <div className="hud-glass p-12 rounded-2xl text-center border border-cyan-500/20 max-w-xl mx-auto my-12">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">
              Portfolio Archive
            </span>
            <h3 className="text-xl font-display font-bold text-white">Projects Coming Soon</h3>
            <p className="text-sm text-slate-400 mt-2">
              No projects match the selected criteria. Add or enable projects using the CMS dashboard.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Featured Hologram Pedestal matching Blueprint 3 */}
            {heroFeaturedProject && (
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <div className="hud-glass p-6 rounded-2xl border border-cyan-400/50 shadow-[0_0_35px_rgba(6,182,212,0.25)] relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                      FEATURED PROJECT
                    </span>
                    <span className="text-xs font-mono text-slate-400">{heroFeaturedProject.date}</span>
                  </div>

                  {/* 3D Holographic Microchip / Cyber City Visual Representation */}
                    <img src="/assets/fourt or project.jpeg" alt="Project Reference" className="w-full h-full object-cover" />

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                    {heroFeaturedProject.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {heroFeaturedProject.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {heroFeaturedProject.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-cyan-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons matching Blueprint 3 */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveModalProject(heroFeaturedProject)}
                      className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
                    >
                      [VIEW PROJECT]
                    </button>
                    {heroFeaturedProject.githubUrl && (
                      <a
                        href={heroFeaturedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-lg hud-glass hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/40 font-bold text-xs font-mono tracking-wider transition-all flex items-center gap-2"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>[SOURCE CODE]</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Right 5 Columns: Project Cards Stack */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Archive Catalog ({filteredAndSortedProjects.length})
              </span>

              {filteredAndSortedProjects.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => setActiveModalProject(p)}
                  className="hud-glass p-4 rounded-xl border border-cyan-500/15 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono text-cyan-400">
                      PROJECT 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{p.date}</span>
                  </div>

                  <h4 className="font-display font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-2">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {p.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                        {tech}
                      </span>
                    ))}
                    {p.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-400">
                        +{p.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Quote & CMD Monogram matching Blueprint 3 */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-slate-400 italic">
            “Ideas become valuable when you build them.”
          </p>
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl text-cyan-400/80 tracking-widest">
              CMD
            </span>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="hud-glass p-6 sm:p-8 rounded-2xl border border-cyan-400 max-w-2xl w-full shadow-[0_0_50px_rgba(6,182,212,0.3)] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-xs font-mono font-bold border border-cyan-500/40">
                {activeModalProject.category}
              </span>
              <span className="text-xs font-mono text-slate-400">{activeModalProject.date}</span>
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-4">
              {activeModalProject.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeModalProject.description}
            </p>

            <div className="mb-6">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-2 font-bold">
                Technologies Stack:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
              )}
              {activeModalProject.liveUrl && activeModalProject.liveUrl !== '#' && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Deployment
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
