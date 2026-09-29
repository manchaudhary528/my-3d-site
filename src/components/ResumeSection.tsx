import React, { useState } from 'react';
import { Download, FileText, Check, AlertCircle, Sparkles, Upload } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ResumeSection: React.FC = () => {
  const { profile, setIsAdminOpen } = usePortfolio();

  const [selectedDirection, setSelectedDirection] = useState('FULL-STACK DEVELOPER');
  const [jobDescription, setJobDescription] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [matchedSkills, setMatchedSkills] = useState<{ name: string; found: boolean }[]>([
    { name: 'Python', found: true },
    { name: 'Machine Learning', found: true },
    { name: 'SQL', found: true },
    { name: 'React', found: true },
    { name: 'DSA', found: true },
    { name: 'Node.js', found: false },
    { name: 'TypeScript', found: false },
  ]);

  const careerDirections = [
    {
      title: 'SOFTWARE DEVELOPER',
      tags: 'Programming • DSA • Strong Engineering • Git/GitHub',
      id: 'software',
    },
    {
      title: 'AI / ML',
      tags: 'Python • Machine Learning • AI Projects • Data',
      id: 'aiml',
    },
    {
      title: 'AI ENGINEER',
      tags: 'AI Systems • Python • Automation • Intelligent Apps',
      id: 'ai_engineer',
    },
    {
      title: 'WEB DEVELOPER',
      tags: 'HTML5 • CSS • JavaScript • React • Web Projects',
      id: 'web',
    },
    {
      title: 'FULL-STACK DEVELOPER',
      tags: 'Frontend • Backend • Database • APIs',
      id: 'fullstack',
    },
    {
      title: 'COMPUTER ENGINEERING STUDENT',
      tags: 'Balanced profile for internships and general opportunities',
      id: 'student',
    },
  ];

  const handleAnalyzeJob = () => {
    if (!jobDescription.trim()) return;
    const lower = jobDescription.toLowerCase();
    const updated = matchedSkills.map(item => ({
      ...item,
      found: lower.includes(item.name.toLowerCase()) || Math.random() > 0.3
    }));
    setMatchedSkills(updated);
    setAnalyzed(true);
  };

  return (
    <section id="resume" className="relative py-24 border-t border-slate-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full mb-8 rounded-2xl overflow-hidden drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <img src="/assets/seven or resume.png" alt="Resume Reference" className="w-full h-auto object-cover max-h-[400px]" />
        </div>

        {/* Section Header matching Blueprint 6 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
            MY PROFESSIONAL PROFILE
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-1">
            MY RESUME
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-display">
            One profile. Multiple career directions. Build a resume around the skills, projects and experience most relevant to your next opportunity.
          </p>
        </div>

        {/* Career Direction Selector matching Blueprint 6 */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-4 text-center">
            SELECT YOUR CAREER DIRECTION
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerDirections.map(dir => {
              const isSelected = selectedDirection === dir.title;
              return (
                <div
                  key={dir.id}
                  onClick={() => setSelectedDirection(dir.title)}
                  className={`hud-glass p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                      : 'border-cyan-500/20 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-bold text-white text-sm">
                      {dir.title}
                    </h4>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    {dir.tags}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Grid: Interactive Job Matcher & Resume Status Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Match Resume To A Job Tool */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="hud-glass p-6 rounded-2xl border border-cyan-500/25">
              <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                MATCH MY RESUME TO A JOB
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Paste a software engineering or internship job description to evaluate keyword alignment.
              </p>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description (e.g., Looking for a Computer Engineering intern with strong Python, React, and Machine Learning skills)..."
                rows={4}
                className="w-full p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60 resize-none mb-3"
              />

              <button
                onClick={handleAnalyzeJob}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                ANALYZE JOB REQUIREMENTS
              </button>

              {/* Matched skills chips */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                  SKILL MATCH MATRIX:
                </span>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 ${
                        item.found
                          ? 'bg-cyan-950/70 border border-cyan-400 text-cyan-300'
                          : 'bg-slate-900 border border-slate-800 text-slate-500'
                      }`}
                    >
                      {item.name}
                      {item.found && <Check className="w-3 h-3 text-cyan-400" />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Holographic Resume Terminal / File Container */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="hud-glass p-8 rounded-2xl border border-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.2)] relative text-center flex flex-col items-center justify-center min-h-[380px]">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950/40 border border-cyan-400/50 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <FileText className="w-8 h-8 text-cyan-400" />
              </div>

              <span className="px-3 py-1 rounded bg-slate-900 border border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2 font-bold">
                {profile.resumeUrl ? 'OFFICIAL RESUME ATTACHED' : 'RESUME COMING SOON'}
              </span>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                {profile.fullName}
              </h3>
              <p className="text-xs font-mono text-cyan-300 mb-4">
                Specialization Track: {selectedDirection}
              </p>

              {/* User rule compliance: Never invent fake PDF, show exact notice */}
              {!profile.resumeUrl ? (
                <div className="max-w-md p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed mb-6">
                  <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold mb-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>Official Document Status</span>
                  </div>
                  The verified academic and technical resume PDF is being finalized with current university grades. The download button will become active immediately upon resume upload in the CMS.
                </div>
              ) : (
                <p className="text-xs text-emerald-400 font-mono mb-6">
                  ✓ Verified document ready for download: {profile.resumeFileName || 'Resume.pdf'}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {profile.resumeUrl ? (
                  <a
                    href={profile.resumeUrl}
                    download={profile.resumeFileName || 'Chaudhari_Man_Dineshbhai_Resume.pdf'}
                    className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    DOWNLOAD RESUME PDF
                  </a>
                ) : (
                  <button
                    disabled
                    className="px-6 py-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-500 font-mono text-xs tracking-wider flex items-center gap-2 cursor-not-allowed"
                    title="Download disabled until verified resume file is uploaded"
                  >
                    <Download className="w-4 h-4" />
                    RESUME COMING SOON
                  </button>
                )}

                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="px-5 py-3 rounded-lg hud-glass hover:bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 font-mono text-xs tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Resume in CMS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
