import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'products', label: 'PRODUCTS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'achievements', label: 'ACHIEVEMENTS' },
  { id: 'resume', label: 'RESUME' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { setIsAdminOpen } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#020617]/90 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: MAK Metallic Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          {/* Stylized 3D Metallic M Logo as seen in the blueprints */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <img src="/assets/Screenshot 2026-09-28 101053.png" alt="CMD Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-display font-extrabold text-base tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-cyan-400 transition-colors">
              MAK
            </span>
            <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase -mt-1">
              PORTFOLIO
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-2.5 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Admin CMS Trigger & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-300 text-xs font-mono tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            title="Open Content Management Dashboard"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CMS ADMIN</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden p-2 rounded-lg border border-slate-700/60 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#030712]/95 border-b border-cyan-500/20 backdrop-blur-xl px-4 py-6 transition-all shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-md text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
            <span>Chaudhari Man Dineshbhai</span>
            <button
              onClick={() => {
                setIsAdminOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-cyan-400 underline cursor-pointer"
            >
              Open Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
