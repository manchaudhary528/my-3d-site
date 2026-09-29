import React from 'react';
import { Brain, Sparkles, Eye, Compass, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutSectionProps {
  onNavigate: (section: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { profile } = usePortfolio();

  return (
    <section id="about" className="relative py-24 overflow-hidden border-t border-slate-900">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-[550px] h-[550px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
            WHO I AM
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-1">
            ABOUT ME
          </h2>
          <p className="text-sm sm:text-base font-semibold text-cyan-400 mt-2 font-display">
            {profile.title}
          </p>
        </div>

        {/* 3-Column / Grid Layout matching Blueprint 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Personal Narrative & Journey Track */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="hud-glass p-6 rounded-2xl border border-cyan-500/25 relative">
              <h3 className="text-lg font-display font-bold text-white mb-3 flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                Engineering Philosophy
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Journey Pipeline Indicator from Blueprint 5 */}
            <div className="hud-glass p-4 rounded-xl border border-cyan-500/20">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-3">
                Academic Pathway
              </span>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
                    DIPLOMA
                  </span>
                  <span className="text-cyan-400">→</span>
                  <span className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-semibold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    B.TECH / COMPUTER ENG
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono pt-1 text-slate-400">
                  <button onClick={() => onNavigate('projects')} className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer">
                    Projects <ArrowRight className="w-3 h-3" />
                  </button>
                  <span>·</span>
                  <button onClick={() => onNavigate('skills')} className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer">
                    Skills <ArrowRight className="w-3 h-3" />
                  </button>
                  <span>·</span>
                  <button onClick={() => onNavigate('education')} className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer">
                    Education <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Chaudhari Man Dineshbhai Standing Proudly */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            {/* Holographic Platform Base with CMD */}
            <div className="relative w-full max-w-sm aspect-[3/4] flex items-center justify-center">
              <img src="/assets/second page or about.jpeg" alt="About Me" className="w-full h-auto drop-shadow-[0_10px_35px_rgba(6,182,212,0.2)] rounded-xl object-contain" />
            </div>
          </div>

          {/* Right Column: Values, Vision & Quote Card */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="hud-glass p-4 rounded-xl border border-cyan-500/25 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/50 border border-cyan-500/40 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block font-bold">
                  CURRENT FOCUS
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {profile.focus.focusArea}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Machine learning models, intelligent interfaces, and modern full-stack web architectures.
                </p>
              </div>
            </div>

            <div className="hud-glass p-4 rounded-xl border border-cyan-500/25 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-blue-950/50 border border-blue-500/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400 block font-bold">
                  MINDSET
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {profile.focus.mindset}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Iterative continuous learning through hands-on implementation and system optimization.
                </p>
              </div>
            </div>

            <div className="hud-glass p-4 rounded-xl border border-cyan-500/25 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-indigo-950/50 border border-indigo-500/40 flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 block font-bold">
                  VISION
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {profile.focus.vision}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Creating software that empowers users, streamlines workflows, and solves tangible engineering challenges.
                </p>
              </div>
            </div>

            {/* Bottom Quote Card matching Blueprint 5 */}
            <div className="hud-glass p-4 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 to-blue-950/20">
              <p className="text-xs text-slate-300 italic leading-relaxed">
                “Don't wait to become ready. Learn, build, improve, and become ready along the way.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
