import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Background3D } from './components/Background3D';
import { LoadingScreen } from './components/LoadingScreen';
import { CinematicIntro } from './components/CinematicIntro';
import { BikeCornerTransition } from './components/BikeCornerTransition';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProductsSection } from './components/ProductsSection';
import { EducationSection } from './components/EducationSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

const MainPortfolio: React.FC = () => {
  // App Phase: 'loading' -> 'intro' -> 'portfolio'
  const [appPhase, setAppPhase] = useState<'loading' | 'intro' | 'portfolio'>('loading');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isBikeTransitioning, setIsBikeTransitioning] = useState<boolean>(false);
  const [targetSectionName, setTargetSectionName] = useState<string>('');

  // Smooth scroll handler with Red Royal Enfield GT 650 corner transition
  const handleNavigate = (sectionId: string) => {
    if (sectionId !== activeSection) {
      setTargetSectionName(sectionId);
      setIsBikeTransitioning(true);
      setTimeout(() => {
        setIsBikeTransitioning(false);
      }, 750);
    }

    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Section Observer for scroll spying
  useEffect(() => {
    if (appPhase !== 'portfolio') return;

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'products', 'education', 'achievements', 'resume', 'contact'];
    
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [appPhase]);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
      {/* 3D Lightweight Particle Canvas */}
      <Background3D />

      {/* PHASE 1: Loading Screen */}
      {appPhase === 'loading' && (
        <LoadingScreen onComplete={() => setAppPhase('intro')} />
      )}

      {/* PHASE 2: Cinematic Intro */}
      {appPhase === 'intro' && (
        <CinematicIntro onComplete={() => setAppPhase('portfolio')} videoSrc="/assets/website video.mp4" />
      )}

      {/* PHASE 3: Real Interactive Continuous Portfolio Website */}
      <div className={`transition-opacity duration-700 ${appPhase === 'portfolio' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

        <main>
          <HeroSection
            onExploreClick={() => handleNavigate('projects')}
            onResumeClick={() => handleNavigate('resume')}
          />
          <AboutSection onNavigate={handleNavigate} />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ProductsSection />
          <EducationSection />
          <AchievementsSection />
          <ResumeSection />
          <ContactSection />
        </main>

        <Footer onNavigate={handleNavigate} />
        <AdminDashboard />

        {/* Red Royal Enfield GT 650 Corner Section Transition Element */}
        <BikeCornerTransition
          isTransitioning={isBikeTransitioning}
          targetSectionName={targetSectionName}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainPortfolio />
    </PortfolioProvider>
  );
}
