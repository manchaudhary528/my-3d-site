import React, { useState } from 'react';
import { Award, Trophy, CheckCircle, X, ExternalLink, ArrowRight, Plus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AchievementItem, AchievementCategory } from '../types/portfolio';

export const AchievementsSection: React.FC = () => {
  const { achievements, setIsAdminOpen } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalItem, setActiveModalItem] = useState<AchievementItem | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'ALL', label: 'ALL CATEGORIES' },
    { id: 'ACADEMIC', label: 'ACADEMIC' },
    { id: 'TECHNICAL', label: 'TECHNICAL' },
    { id: 'PROJECTS', label: 'PROJECTS' },
    { id: 'CERTIFICATIONS', label: 'CERTIFICATIONS' },
    { id: 'COMPETITIONS', label: 'COMPETITIONS' },
    { id: 'OTHER', label: 'OTHER' },
  ];

  const activeAchievements = achievements.filter(a => a.active);
  const filteredAchievements = activeAchievements
    .filter(a => selectedCategory === 'ALL' || a.category === selectedCategory)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="achievements" className="relative py-24 border-t border-slate-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full mb-8 rounded-2xl overflow-hidden drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <img src="/assets/six or achivements.jpeg" alt="Achievements Reference" className="w-full h-auto object-cover max-h-[400px]" />
        </div>

        {/* Section Header matching Contact reference */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
            MILESTONES & HONORS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-1">
            ACHIEVEMENTS
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-display">
            Every milestone is a reminder to keep learning, building and moving forward.
          </p>
        </div>

        {activeAchievements.length === 0 ? (
          /* Premium Futuristic Coming Soon State */
          <div className="hud-glass p-8 sm:p-12 rounded-2xl border border-cyan-500/25 max-w-2xl mx-auto text-center shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Trophy className="w-7 h-7 text-cyan-400" />
            </div>

            <span className="px-3 py-1 rounded bg-slate-900 border border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold inline-block mb-3">
              HONORS & AWARDS
            </span>

            <h3 className="text-2xl font-display font-bold text-white mb-2">
              ACHIEVEMENTS COMING SOON
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
              Verified certifications, competitions, and academic milestones will be displayed here once added to the CMS.
            </p>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-5 py-2.5 rounded-lg hud-glass hover:bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 font-mono text-xs tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Achievement in CMS</span>
            </button>
          </div>
        ) : (
          <>
            {/* Milestone Steps Bar */}
            <div className="hud-glass p-4 rounded-xl border border-cyan-500/20 max-w-4xl mx-auto mb-12">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                {['START', 'LEARN', 'BUILD', 'ACHIEVE', 'IMPROVE', 'NEXT GOAL'].map((step, idx, arr) => (
                  <React.Fragment key={step}>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${idx <= 3 ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-slate-700'}`} />
                      <span className={idx === 3 ? 'text-cyan-400 font-bold' : ''}>{step}</span>
                    </div>
                    {idx < arr.length - 1 && (
                      <span className="hidden sm:inline text-slate-700">———</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer border ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((item, idx) => (
                <div
                  key={item.id}
                  className={`hud-glass p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    item.featured
                      ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                      : 'border-cyan-500/15 hover:border-cyan-400/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">
                        {item.featured ? 'FEATURED MILESTONE' : `MILESTONE 0${idx + 1}`}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{item.year}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-white mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      {item.category}
                    </span>

                    <button
                      onClick={() => setActiveModalItem(item)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      [VIEW DETAILS] <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bottom Quote Card */}
        <div className="mt-16 flex justify-end">
          <div className="hud-glass p-4 rounded-xl border border-cyan-500/20 max-w-sm">
            <p className="text-xs text-slate-300 italic">
              “Celebrate the milestone. Then build the next one.”
            </p>
          </div>
        </div>
      </div>

      {/* Modal View */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="hud-glass p-6 sm:p-8 rounded-2xl border border-cyan-400 max-w-lg w-full relative shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-cyan-400 block mb-1">
              CATEGORY: {activeModalItem.category} · {activeModalItem.year}
            </span>

            <h3 className="text-xl font-display font-bold text-white mb-3">
              {activeModalItem.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeModalItem.description}
            </p>

            {activeModalItem.certificateUrl && (
              <a
                href={activeModalItem.certificateUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-mono text-xs font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Certificate
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
