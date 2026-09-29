import React from 'react';
import { GraduationCap, BookOpen, Hammer, Sparkles, Plus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const EducationSection: React.FC = () => {
  const { education, setIsAdminOpen } = usePortfolio();

  const activeEdu = education.filter(e => e.active).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="education" className="relative py-24 border-t border-slate-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full mb-8 rounded-2xl overflow-hidden drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <img src="/assets/fifith and edution.png" alt="Education Reference" className="w-full h-auto object-cover max-h-[400px]" />
        </div>

        {/* Section Header matching Contact reference */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
            MY JOURNEY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-1">
            EDUCATION
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-display">
            Learning the fundamentals, building practical skills, and preparing for what's next.
          </p>
        </div>

        {activeEdu.length === 0 ? (
          /* Premium Futuristic Coming Soon State */
          <div className="hud-glass p-8 sm:p-12 rounded-2xl border border-cyan-500/25 max-w-2xl mx-auto text-center shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <GraduationCap className="w-7 h-7 text-cyan-400" />
            </div>

            <span className="px-3 py-1 rounded bg-slate-900 border border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold inline-block mb-3">
              ACADEMIC FOUNDATION
            </span>

            <h3 className="text-2xl font-display font-bold text-white mb-2">
              EDUCATION COMING SOON
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
              Verified university degrees, diplomas, and engineering coursework milestones can be managed in the CMS dashboard.
            </p>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-5 py-2.5 rounded-lg hud-glass hover:bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 font-mono text-xs tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Education Milestone</span>
            </button>
          </div>
        ) : (
          <>
            {/* Milestone Corridor Runway */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {activeEdu.map(item => {
                const isHero = item.current;

                return (
                  <div
                    key={item.id}
                    className={`hud-glass p-6 rounded-2xl border transition-all relative flex flex-col justify-between ${
                      isHero
                        ? 'border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.3)] bg-cyan-950/25 scale-[1.03]'
                        : 'border-cyan-500/20 hover:border-cyan-500/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono tracking-wider text-slate-400 font-bold uppercase">
                          {item.milestoneTitle}
                        </span>
                        <GraduationCap className={`w-4 h-4 ${isHero ? 'text-cyan-400' : 'text-slate-500'}`} />
                      </div>

                      {isHero && (
                        <span className="inline-block px-2.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[10px] font-mono tracking-wider mb-2 shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                          CURRENT
                        </span>
                      )}

                      <h3 className="font-display font-bold text-lg text-white mb-1">
                        {item.degree}
                      </h3>

                      <p className="text-xs font-semibold text-cyan-400 mb-3 font-mono">
                        {item.institution}
                      </p>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Timeline:</span>
                      <span className="text-cyan-400 font-bold">{item.startYear} — {item.endYear}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* 3 Core Pillars in Contact reference style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="hud-glass p-5 rounded-xl border border-cyan-500/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider block uppercase">
                LEARN
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Understand the fundamentals of algorithms, operating systems, and computation.
              </p>
            </div>
          </div>

          <div className="hud-glass p-5 rounded-xl border border-blue-500/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-950/60 border border-blue-500/40 flex items-center justify-center shrink-0">
              <Hammer className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-blue-400 tracking-wider block uppercase">
                BUILD
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Turn theoretical knowledge into real, testable software and AI prototypes.
              </p>
            </div>
          </div>

          <div className="hud-glass p-5 rounded-xl border border-indigo-500/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider block uppercase">
                IMPROVE
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Learn from every project, refine clean code standards, and strive for excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Quote matching reference */}
        <div className="mt-16 text-center">
          <p className="text-xs sm:text-sm text-slate-400 italic">
            “Education gives you the foundation. Building gives you the experience.”
          </p>
        </div>
      </div>
    </section>
  );
};
