import React, { useState, useMemo } from 'react';
import { Layers, Terminal, Server, Brain, Code, Database, Sparkles, SlidersHorizontal, Cloud } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SkillCategory } from '../types/portfolio';

export const SkillsSection: React.FC = () => {
  const { skills, updateSkill, setIsAdminOpen } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'bars' | 'radar' | 'cloud'>('bars');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeSkills = useMemo(() => {
    return skills.filter(s => s.active);
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return activeSkills;
    return activeSkills.filter(s => s.category === selectedCategory);
  }, [activeSkills, selectedCategory]);

  // Compute category averages for the Radar Chart
  const radarCategories = useMemo(() => {
    const cats: { key: SkillCategory; label: string }[] = [
      { key: 'aiml', label: 'AI & Machine Learning' },
      { key: 'frontend', label: 'Frontend & UI' },
      { key: 'backend', label: 'Backend & APIs' },
      { key: 'core', label: 'Core CS & DSA' },
      { key: 'tools', label: 'Tools & DevOps' },
    ];

    return cats.map(cat => {
      const match = activeSkills.filter(s => s.category === cat.key);
      const avg = match.length > 0
        ? Math.round(match.reduce((acc, curr) => acc + curr.percentage, 0) / match.length)
        : 60;
      return { ...cat, score: avg, count: match.length };
    });
  }, [activeSkills]);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'Server': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Brain': return <Brain className="w-4 h-4 text-purple-400" />;
      case 'Database': return <Database className="w-4 h-4 text-blue-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-indigo-400" />;
      default: return <Code className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 border-t border-slate-900 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full mb-8 rounded-2xl overflow-hidden drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <img src="/assets/third or skill.jpeg" alt="Skills Section Graphic" className="w-full h-auto object-cover max-h-[400px]" />
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
              TECHNICAL COMPETENCIES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-1">
              MY SKILLS
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Mastering software systems, full-stack frameworks, algorithmic foundations, and machine learning pipelines.
            </p>
          </div>

          {/* Interactive View Switcher Controls */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-900/80 rounded-xl border border-cyan-500/20 backdrop-blur-md">
            <button
              onClick={() => setViewMode('bars')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                viewMode === 'bars'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Telemetry Bars</span>
            </button>
            <button
              onClick={() => setViewMode('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                viewMode === 'radar'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Radar Matrix</span>
            </button>
            <button
              onClick={() => setViewMode('cloud')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                viewMode === 'cloud'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>Skill Cloud</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Technologies' },
            { id: 'aiml', label: 'AI & Machine Learning' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'backend', label: 'Backend & DB' },
            { id: 'core', label: 'Core CS & DSA' },
            { id: 'tools', label: 'DevOps & Tools' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer border ${
                selectedCategory === tab.id
                  ? 'bg-cyan-950/60 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                  : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <button
            onClick={() => setIsAdminOpen(true)}
            className="ml-auto text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer py-1.5"
          >
            + Manage Skills in CMS
          </button>
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 ? (
          <div className="hud-glass p-12 rounded-2xl text-center border border-cyan-500/20 max-w-xl mx-auto my-8">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">
              System Notice
            </span>
            <h3 className="text-xl font-display font-bold text-white">Skills Coming Soon</h3>
            <p className="text-sm text-slate-400 mt-2">
              No skills have been published under this category yet. You can add and configure them directly in the CMS Admin.
            </p>
          </div>
        ) : (
          <>
            {/* VIEW MODE 1: TELEMETRY BARS & HUD METERS */}
            {viewMode === 'bars' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredSkills.map(skill => (
                  <div
                    key={skill.id}
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`hud-glass p-5 rounded-xl border transition-all duration-300 ${
                      hoveredSkill === skill.id
                        ? 'border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.25)] -translate-y-0.5'
                        : 'border-cyan-500/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700/80 flex items-center justify-center shrink-0">
                          {getIcon(skill.icon)}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-white text-base">
                            {skill.name}
                          </h4>
                          <span className="text-[10px] font-mono text-cyan-400/80 uppercase">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-base font-mono font-bold text-cyan-400 tabular-nums">
                          {skill.percentage}%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300/80 mb-3 leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Interactive Percentage Bar */}
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                        style={{ width: `${Math.min(100, Math.max(0, skill.percentage))}%` }}
                      />
                    </div>

                    {/* Inline Quick Slider for testing reactive updates (0-100%) */}
                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Adjust Proficiency:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.percentage}
                        onChange={(e) => updateSkill(skill.id, { percentage: Number(e.target.value) })}
                        className="w-28 accent-cyan-400 cursor-pointer"
                        title="Drag to change percentage (persisted instantly)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW MODE 2: 3D RADAR MATRIX CHART */}
            {viewMode === 'radar' && (
              <div className="hud-glass p-8 rounded-2xl border border-cyan-500/25 flex flex-col lg:flex-row items-center justify-around gap-8">
                {/* SVG Polygonal Radar Chart */}
                <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Concentric Guide Polygons (20%, 40%, 60%, 80%, 100%) */}
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, i) => {
                      const radius = 140 * level;
                      const points = radarCategories.map((_, idx) => {
                        const angle = (idx * 2 * Math.PI) / radarCategories.length - Math.PI / 2;
                        const x = 200 + radius * Math.cos(angle);
                        const y = 200 + radius * Math.sin(angle);
                        return `${x},${y}`;
                      }).join(' ');

                      return (
                        <polygon
                          key={i}
                          points={points}
                          fill="none"
                          stroke="#1e293b"
                          strokeWidth={i === 4 ? 2 : 1}
                          strokeDasharray={i < 4 ? '3 3' : undefined}
                        />
                      );
                    })}

                    {/* Radial Axis Lines */}
                    {radarCategories.map((cat, idx) => {
                      const angle = (idx * 2 * Math.PI) / radarCategories.length - Math.PI / 2;
                      const x = 200 + 140 * Math.cos(angle);
                      const y = 200 + 140 * Math.sin(angle);
                      return (
                        <g key={cat.key}>
                          <line x1="200" y1="200" x2={x} y2={y} stroke="#334155" strokeWidth="1" />
                        </g>
                      );
                    })}

                    {/* Actual Skill Data Polygon */}
                    {(() => {
                      const points = radarCategories.map((cat, idx) => {
                        const radius = (140 * (cat.score / 100));
                        const angle = (idx * 2 * Math.PI) / radarCategories.length - Math.PI / 2;
                        const x = 200 + radius * Math.cos(angle);
                        const y = 200 + radius * Math.sin(angle);
                        return `${x},${y}`;
                      }).join(' ');

                      return (
                        <>
                          <polygon
                            points={points}
                            fill="#0ea5e9"
                            fillOpacity="0.3"
                            stroke="#38bdf8"
                            strokeWidth="3"
                            className="drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                          />
                          {radarCategories.map((cat, idx) => {
                            const radius = (140 * (cat.score / 100));
                            const angle = (idx * 2 * Math.PI) / radarCategories.length - Math.PI / 2;
                            const x = 200 + radius * Math.cos(angle);
                            const y = 200 + radius * Math.sin(angle);
                            return (
                              <circle
                                key={idx}
                                cx={x}
                                cy={y}
                                r="5"
                                fill="#ffffff"
                                stroke="#0ea5e9"
                                strokeWidth="2.5"
                              />
                            );
                          })}
                        </>
                      );
                    })()}

                    {/* Labels */}
                    {radarCategories.map((cat, idx) => {
                      const angle = (idx * 2 * Math.PI) / radarCategories.length - Math.PI / 2;
                      const x = 200 + 175 * Math.cos(angle);
                      const y = 200 + 175 * Math.sin(angle);
                      return (
                        <text
                          key={cat.key}
                          x={x}
                          y={y}
                          fill="#94a3b8"
                          fontSize="10"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          {cat.label} ({cat.score}%)
                        </text>
                      );
                    })}
                  </svg>
                </div>

                {/* Radar Breakdown List */}
                <div className="flex flex-col space-y-4 max-w-md w-full">
                  <h3 className="font-display font-bold text-xl text-white">
                    Domain Proficiency Breakdown
                  </h3>
                  <p className="text-xs text-slate-400">
                    Aggregated proficiency score across core computer engineering domains based on current curriculum and applied project experience.
                  </p>

                  <div className="space-y-3 pt-2">
                    {radarCategories.map(cat => (
                      <div key={cat.key} className="hud-glass p-3 rounded-lg border border-cyan-500/15">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-white font-semibold">{cat.label}</span>
                          <span className="text-cyan-400 font-bold">{cat.score}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full bg-cyan-400"
                            style={{ width: `${cat.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW MODE 3: INTERACTIVE SKILL CLOUD */}
            {viewMode === 'cloud' && (
              <div className="hud-glass p-10 rounded-2xl border border-cyan-500/25 relative flex flex-wrap items-center justify-center gap-4 min-h-[360px]">
                {filteredSkills.map(skill => {
                  const sizeClasses =
                    skill.percentage >= 85
                      ? 'text-base px-5 py-3 border-cyan-400/70 bg-cyan-950/40 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                      : skill.percentage >= 80
                      ? 'text-sm px-4 py-2.5 border-blue-400/50 bg-blue-950/30 text-cyan-200 font-semibold'
                      : 'text-xs px-3.5 py-2 border-slate-700/60 bg-slate-900/40 text-slate-300';

                  return (
                    <div
                      key={skill.id}
                      className={`rounded-2xl border transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-cyan-300 cursor-pointer flex items-center gap-2 ${sizeClasses}`}
                      title={`${skill.name} - ${skill.percentage}%\n${skill.description}`}
                    >
                      {getIcon(skill.icon)}
                      <span>{skill.name}</span>
                      <span className="text-xs font-mono font-normal opacity-75">
                        {skill.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
