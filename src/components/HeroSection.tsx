import React from 'react';
import { ArrowRight, Download, Brain, Code2, Target, MousePointer } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroSectionProps {
  onExploreClick: () => void;
  onResumeClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onResumeClick }) => {
  const { profile } = usePortfolio();

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Bio, CTAs & Stats */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
                HELLO, I'M
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mt-2">
                {profile.fullName}
              </h1>
              <p className="text-lg sm:text-xl font-display font-semibold text-cyan-400 mt-2">
                {profile.title}
              </p>
            </div>

            {/* Subtitle / Focus Statement */}
            <div className="hud-glass rounded-xl p-4 border border-cyan-500/25 max-w-xl">
              <p className="text-sm text-slate-300 leading-relaxed">
                {profile.headline}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onResumeClick}
                className="px-6 py-3 rounded-lg hud-glass hover:bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700/80 hover:border-cyan-500/40 font-semibold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>DOWNLOAD RESUME</span>
                <Download className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              <div className="hud-glass p-3 rounded-lg border border-cyan-500/15">
                <span className="text-xs text-slate-400 font-mono block">Experience</span>
                <span className="text-lg font-bold text-white font-mono">{profile.stats.experience}</span>
              </div>
              <div className="hud-glass p-3 rounded-lg border border-cyan-500/15">
                <span className="text-xs text-slate-400 font-mono block">Projects</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">{profile.stats.projects}</span>
              </div>
              <div className="hud-glass p-3 rounded-lg border border-cyan-500/15">
                <span className="text-xs text-slate-400 font-mono block">Technologies</span>
                <span className="text-lg font-bold text-white font-mono">{profile.stats.technologies}</span>
              </div>
              <div className="hud-glass p-3 rounded-lg border border-cyan-500/15">
                <span className="text-xs text-slate-400 font-mono block">Learning</span>
                <span className="text-lg font-bold text-cyan-300 font-mono">{profile.stats.learning}</span>
              </div>
            </div>

            {/* Quote Box */}
            <div className="hud-glass p-4 rounded-xl border border-cyan-500/20 relative">
              <span className="absolute -top-3 left-4 text-2xl text-cyan-400 font-serif">“</span>
              <p className="text-xs sm:text-sm text-slate-300 italic pt-1 leading-relaxed">
                I don't just learn code, I build solutions that make a difference.
                <span className="text-cyan-400 font-semibold not-italic block mt-1">
                  Consistency today, Innovation tomorrow.
                </span>
              </p>
              <span className="text-[11px] font-mono text-slate-400 block mt-2">
                — A Computer Engineering Student with a passion for AI & Software Development
              </span>
            </div>
          </div>

          {/* Right Column: Workstation Scene with GIGABYTE Laptop & Floating HUD Cards */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* Background Neon CMD Sign on the Wall */}
            <div className="absolute -top-8 right-12 z-0 hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-950/20 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.25)]">
              <span className="font-display font-black text-2xl text-cyan-400 tracking-[0.2em] drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]">
                CMD
              </span>
            </div>

            {/* Main Center Illustration: Chaudhari Man Dineshbhai at Workstation */}
            <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
              {/* Radial Workstation Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-blue-900/10 to-transparent rounded-2xl" />

              <img src="/assets/front page or home.png" alt="Hero Background" className="w-full h-auto drop-shadow-2xl rounded-xl object-contain relative z-10" />
            </div>

            {/* Right Floating Quick Metric HUD Cards */}
            <div className="w-full flex flex-col gap-3 mt-4">
              <div className="hud-glass p-3 rounded-xl border border-cyan-500/25 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Currently Learning</span>
                  <span className="text-sm font-semibold text-white">{profile.focus.currentLearning}</span>
                </div>
              </div>

              <div className="hud-glass p-3 rounded-xl border border-cyan-500/25 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-950/40 border border-blue-500/40 flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Focus</span>
                  <span className="text-sm font-semibold text-white">{profile.focus.focusArea}</span>
                </div>
              </div>

              <div className="hud-glass p-3 rounded-xl border border-cyan-500/25 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-950/40 border border-indigo-500/40 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Goal</span>
                  <span className="text-sm font-semibold text-white">{profile.focus.goal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center justify-center text-slate-500 text-xs font-mono tracking-widest uppercase">
          <MousePointer className="w-4 h-4 text-cyan-400 animate-bounce mb-1" />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
};
