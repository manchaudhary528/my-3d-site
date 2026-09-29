import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-900 bg-[#02050e] py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Lockup */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-white text-base tracking-widest">
              {profile.fullName}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-bold">
              CE STUDENT
            </span>
          </div>
          <span className="text-slate-500 text-[11px]">
            UV Patel College of Engineering · Ganpat University · Gujarat, India
          </span>
        </div>

        {/* Quiet Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-cyan-400 cursor-pointer">HOME</button>
          <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 cursor-pointer">ABOUT</button>
          <button onClick={() => onNavigate('skills')} className="hover:text-cyan-400 cursor-pointer">SKILLS</button>
          <button onClick={() => onNavigate('projects')} className="hover:text-cyan-400 cursor-pointer">PROJECTS</button>
          <button onClick={() => onNavigate('education')} className="hover:text-cyan-400 cursor-pointer">EDUCATION</button>
          <button onClick={() => onNavigate('achievements')} className="hover:text-cyan-400 cursor-pointer">ACHIEVEMENTS</button>
          <button onClick={() => onNavigate('resume')} className="hover:text-cyan-400 cursor-pointer">RESUME</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 cursor-pointer">CONTACT</button>
        </div>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-all cursor-pointer flex items-center gap-1.5"
          title="Scroll to top"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-900/80 text-center text-slate-600 text-[10px]">
        © {new Date().getFullYear()} Chaudhari Man Dineshbhai. Built with React, TypeScript & WebGL.
      </div>
    </footer>
  );
};
