import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds - elegant, responsive, never blocks user

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculated = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calculated);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsFinishing(true);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFinishing(true);
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <AnimatePresence>
      {!isFinishing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#02050c] text-white px-6 py-10 select-none overflow-hidden"
        >
          {/* Top Bar Branding */}
          <div className="w-full max-w-6xl flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded border border-cyan-500/40 bg-cyan-950/40 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <span className="font-display font-black text-cyan-400 text-sm tracking-wider">CMD</span>
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-slate-400 font-mono">
                System Initialization
              </span>
            </div>

            <button
              onClick={handleSkip}
              className="text-xs tracking-wider uppercase px-3 py-1.5 rounded border border-slate-700/60 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
              Skip Loading →
            </button>
          </div>

          {/* Central Motorcycle Scene - RED ROYAL ENFIELD GT 650 */}
          <div className="relative w-full max-w-4xl flex-1 flex flex-col items-center justify-center my-4">
            {/* Ambient Lighting & Wet Reflection Pool */}
            <div className="absolute inset-0 bg-radial from-red-950/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute w-[600px] h-[180px] -bottom-10 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Stylized Red Royal Enfield Continental GT 650 Cinematic Visual */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative w-full max-w-2xl flex flex-col items-center"
            >
              {/* Headlight beam */}
              <div
                className="absolute left-[-40px] top-[48%] -translate-y-1/2 w-[340px] h-[140px] bg-gradient-to-l from-cyan-400/25 via-cyan-300/10 to-transparent blur-xl -rotate-6 pointer-events-none"
              />

              <svg
                viewBox="0 0 900 480"
                className="w-full h-auto max-h-[340px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] filter"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Glossy Candy Red GT Tank Gradient */}
                  <linearGradient id="tankRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="35%" stopColor="#dc2626" />
                    <stop offset="85%" stopColor="#7f1d1d" />
                    <stop offset="100%" stopColor="#450a0a" />
                  </linearGradient>

                  {/* Chrome Exhaust & Metal Engine */}
                  <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="30%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#e2e8f0" />
                    <stop offset="80%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>

                  {/* Dark Rim & Tires */}
                  <radialGradient id="tireGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="60%" stopColor="#0f172a" />
                    <stop offset="88%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#090d16" />
                  </radialGradient>

                  {/* Neon Cyan Ground Reflection */}
                  <linearGradient id="wetFloor" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>

                {/* Wet Asphalt Reflection Lines */}
                <ellipse cx="450" cy="425" rx="380" ry="16" fill="url(#wetFloor)" />
                <path d="M120 425 H780" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="6 12" strokeOpacity="0.3" />

                {/* Rear Wheel & Spoke Structure */}
                <circle cx="680" cy="340" r="82" fill="url(#tireGrad)" stroke="#334155" strokeWidth="8" />
                <circle cx="680" cy="340" r="58" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 6" />
                <circle cx="680" cy="340" r="24" fill="#0f172a" stroke="#cbd5e1" strokeWidth="4" />
                {/* Rear Disc Brake */}
                <circle cx="680" cy="340" r="42" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 3" />

                {/* Front Wheel & Spoke Structure */}
                <circle cx="230" cy="340" r="82" fill="url(#tireGrad)" stroke="#334155" strokeWidth="8" />
                <circle cx="230" cy="340" r="58" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 6" />
                <circle cx="230" cy="340" r="24" fill="#0f172a" stroke="#cbd5e1" strokeWidth="4" />
                {/* Front Twin Disc Brake with Brembo/ByBre Caliper */}
                <circle cx="230" cy="340" r="46" stroke="#94a3b8" strokeWidth="3" strokeDasharray="8 4" />
                <rect x="256" y="315" width="16" height="32" rx="4" fill="#e11d48" />

                {/* Chassis Tubular Double Cradle Frame */}
                <path d="M280 230 L380 340 L540 340 L620 270 L480 240 Z" stroke="#1e293b" strokeWidth="10" strokeLinejoin="round" />
                <path d="M380 340 L450 250 L560 250 L680 340" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />

                {/* 648cc Parallel Twin Engine Block with Fins */}
                <rect x="400" y="270" width="130" height="90" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="3" />
                {/* Horizontal Cooling Fins */}
                <line x1="405" y1="285" x2="525" y2="285" stroke="#94a3b8" strokeWidth="2" />
                <line x1="405" y1="298" x2="525" y2="298" stroke="#94a3b8" strokeWidth="2" />
                <line x1="405" y1="311" x2="525" y2="311" stroke="#94a3b8" strokeWidth="2" />
                <line x1="405" y1="324" x2="525" y2="324" stroke="#94a3b8" strokeWidth="2" />
                <line x1="410" y1="337" x2="520" y2="337" stroke="#94a3b8" strokeWidth="2" />
                {/* Chrome Clutch Case / RE Crest */}
                <circle cx="490" cy="325" r="24" fill="url(#chromeGrad)" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="490" cy="325" r="16" fill="#0f172a" />
                <text x="490" y="329" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">R</text>

                {/* Chrome Twin Swept-Back Exhaust Pipe */}
                <path d="M420 300 Q400 370 480 380 L690 375 L730 365" stroke="url(#chromeGrad)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="730" cy="365" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />

                {/* Front Telescopic Forks & Clip-On Handlebars */}
                <line x1="230" y1="340" x2="305" y2="185" stroke="url(#chromeGrad)" strokeWidth="12" strokeLinecap="round" />
                {/* Fork Gaiters */}
                <line x1="250" y1="300" x2="275" y2="250" stroke="#090d16" strokeWidth="16" />
                {/* Triple Tree & Clip-on bar */}
                <circle cx="305" cy="185" r="9" fill="#475569" />
                <path d="M295 185 L320 180" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                <circle cx="325" cy="180" r="5" fill="#f8fafc" />

                {/* Continental GT Cafe Racer Fuel Tank (Iconic Sculpted Knee Recesses) */}
                <path
                  d="M310 190 Q345 155 430 170 Q490 180 500 230 L360 235 Z"
                  fill="url(#tankRed)"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                {/* Tank Chrome Filler Cap */}
                <ellipse cx="385" cy="166" rx="14" ry="6" fill="url(#chromeGrad)" stroke="#f8fafc" strokeWidth="1" />
                {/* Royal Enfield White/Silver Contrast Stripe & Tank Badge */}
                <path d="M340 185 Q400 178 470 205" stroke="#fef08a" strokeWidth="3" fill="none" opacity="0.85" />
                <text x="410" y="212" fill="#ffffff" fontSize="12" fontWeight="800" letterSpacing="1" fontFamily="sans-serif">
                  ROYAL ENFIELD
                </text>

                {/* Single Cafe Racer Seat with Rear Cowl */}
                <path d="M500 220 Q540 220 590 225 L650 235 L640 260 L495 240 Z" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
                {/* Ribbed Tuck-and-Roll Leather Stitches */}
                <path d="M515 221 L512 238 M535 222 L532 239 M555 223 L552 240 M575 224 L572 242" stroke="#334155" strokeWidth="2" />
                {/* Red Seat Cowl / Tail Fairing */}
                <path d="M590 225 Q645 225 660 245 L625 260 Z" fill="url(#tankRed)" stroke="#dc2626" strokeWidth="2" />

                {/* Chrome Round Headlight Bucket & Lens */}
                <circle cx="210" cy="210" r="24" fill="url(#chromeGrad)" />
                <path d="M210 186 A24 24 0 0 0 186 210 A24 24 0 0 0 210 234 Z" fill="#38bdf8" fillOpacity="0.75" />
                <circle cx="198" cy="210" r="8" fill="#ffffff" opacity="0.9" />

                {/* Bar End Mirrors (Cafe Racer Style) */}
                <path d="M290 185 L270 175" stroke="#64748b" strokeWidth="4" />
                <circle cx="265" cy="172" r="9" fill="url(#chromeGrad)" stroke="#38bdf8" strokeWidth="1" />

                {/* Dual Rear Gas-Charged Piggyback Shocks */}
                <line x1="620" y1="260" x2="670" y2="335" stroke="#eab308" strokeWidth="8" strokeLinecap="round" />
                <circle cx="628" cy="275" r="7" fill="#0f172a" stroke="#eab308" strokeWidth="2" />
              </svg>

              {/* Model Badge */}
              <div className="mt-4 flex items-center gap-3">
                <span className="w-6 h-[1px] bg-red-500/50" />
                <span className="text-sm font-display tracking-[0.3em] font-bold text-red-500 uppercase">
                  Royal Enfield Continental GT 650
                </span>
                <span className="w-6 h-[1px] bg-red-500/50" />
              </div>
            </motion.div>
          </div>

          {/* Minimal Loading Progress Bar & Telemetry */}
          <div className="w-full max-w-xl flex flex-col items-center gap-3 z-10">
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2 text-cyan-400">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                CALIBRATING 3D ENVIRONMENT
              </span>
              <span className="text-cyan-300 font-semibold tabular-nums">{progress}%</span>
            </div>

            {/* Glowing Track */}
            <div className="w-full h-1.5 bg-slate-900/90 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-cyan-400 to-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <p className="text-[11px] text-slate-500 font-mono tracking-widest uppercase">
              Chaudhari Man Dineshbhai · Portfolio Boot Sequence
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
