import React from 'react';
import { Briefcase, Calendar, MapPin, Plus, Clock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { experience, setIsAdminOpen } = usePortfolio();

  const activeExp = experience.filter(e => e.active).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="experience" className="relative py-24 border-t border-slate-900 overflow-hidden">
      {/* Background Ambience matching Contact reference */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching Contact reference */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
            PROFESSIONAL CAREER
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-1">
            EXPERIENCE
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-display">
            Industry internships, academic engineering roles, and technical contributions.
          </p>
        </div>

        {activeExp.length === 0 ? (
          /* Premium Futuristic Coming Soon State */
          <div className="hud-glass p-8 sm:p-12 rounded-2xl border border-cyan-500/25 max-w-2xl mx-auto text-center shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Briefcase className="w-7 h-7 text-cyan-400" />
            </div>

            <span className="px-3 py-1 rounded bg-slate-900 border border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold inline-block mb-3">
              CAREER TIMELINE
            </span>

            <h3 className="text-2xl font-display font-bold text-white mb-2">
              EXPERIENCE COMING SOON
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
              Verified internship and professional engineering records will appear here once officially published.
            </p>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-5 py-2.5 rounded-lg hud-glass hover:bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 font-mono text-xs tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Experience in CMS</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {activeExp.map((item) => (
              <div
                key={item.id}
                className="hud-glass p-6 sm:p-8 rounded-2xl border border-cyan-500/25 hover:border-cyan-400/60 transition-all shadow-[0_0_25px_rgba(6,182,212,0.15)] relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                      {item.position}
                    </h3>
                    <span className="text-sm font-semibold text-cyan-400 font-mono">
                      {item.organization}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {item.startDate} — {item.endDate}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.technologies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {item.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-xs font-mono text-cyan-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
