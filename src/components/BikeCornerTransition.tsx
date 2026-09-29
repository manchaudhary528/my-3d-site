import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BikeCornerTransitionProps {
  isTransitioning: boolean;
  targetSectionName?: string;
}

export const BikeCornerTransition: React.FC<BikeCornerTransitionProps> = ({
  isTransitioning,
  targetSectionName,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 750);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isTransitioning]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 120, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -140, scale: 0.9 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-none select-none flex flex-col items-end"
        >
          {/* Subtle Ambient Underglow & Light Trail */}
          <div className="absolute -inset-4 bg-gradient-to-l from-red-600/25 via-cyan-500/20 to-transparent rounded-full blur-xl pointer-events-none" />

          {/* Bike Capsule Glass Housing */}
          <div className="hud-glass px-4 py-3 rounded-2xl border border-cyan-500/30 bg-[#02050c]/90 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-3">
            {/* The Red Royal Enfield Continental GT 650 Mini Cinematic Vector */}
            <div className="relative w-32 sm:w-40 h-16 sm:h-20 shrink-0 flex items-center justify-center">
              {/* Motion Blur Trail / Headlight Beam */}
              <div className="absolute left-[-20px] top-[45%] -translate-y-1/2 w-24 h-10 bg-gradient-to-l from-cyan-400/30 via-cyan-300/10 to-transparent blur-md -rotate-3 pointer-events-none" />

              <svg
                viewBox="0 0 450 240"
                className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
                fill="none"
              >
                <defs>
                  {/* Glossy Candy Red GT Tank */}
                  <linearGradient id="cornerTankRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="35%" stopColor="#dc2626" />
                    <stop offset="85%" stopColor="#7f1d1d" />
                    <stop offset="100%" stopColor="#450a0a" />
                  </linearGradient>

                  {/* Chrome Exhaust & Engine */}
                  <linearGradient id="cornerChrome" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="40%" stopColor="#94a3b8" />
                    <stop offset="70%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                </defs>

                {/* Wet Asphalt Reflection Line */}
                <ellipse cx="225" cy="215" rx="190" ry="8" fill="#0ea5e9" fillOpacity="0.25" />
                <path d="M60 215 H390" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.4" />

                {/* Rear Wheel (Right) */}
                <circle cx="340" cy="170" r="41" fill="#090d16" stroke="#334155" strokeWidth="4" />
                <circle cx="340" cy="170" r="29" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="340" cy="170" r="12" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />

                {/* Front Wheel (Left) */}
                <circle cx="115" cy="170" r="41" fill="#090d16" stroke="#334155" strokeWidth="4" />
                <circle cx="115" cy="170" r="29" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="115" cy="170" r="12" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                <rect x="128" y="157" width="8" height="16" rx="2" fill="#e11d48" />

                {/* Frame & Engine Block */}
                <path d="M140 115 L190 170 L270 170 L310 135 L240 120 Z" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
                <rect x="200" y="135" width="65" height="45" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                {/* Engine Fins */}
                <line x1="203" y1="143" x2="262" y2="143" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="203" y1="150" x2="262" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="203" y1="157" x2="262" y2="157" stroke="#94a3b8" strokeWidth="1.5" />
                <circle cx="245" cy="162" r="12" fill="url(#cornerChrome)" />

                {/* Swept-back Chrome Exhaust */}
                <path d="M210 150 Q200 185 240 190 L345 188 L365 183" stroke="url(#cornerChrome)" strokeWidth="7" strokeLinecap="round" />

                {/* Front Fork & Clip-ons */}
                <line x1="115" y1="170" x2="152" y2="92" stroke="url(#cornerChrome)" strokeWidth="6" strokeLinecap="round" />
                <circle cx="152" cy="92" r="4" fill="#475569" />
                <path d="M147 92 L160 90" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

                {/* Continental GT Sculpted Red Fuel Tank */}
                <path
                  d="M155 95 Q172 78 215 85 Q245 90 250 115 L180 118 Z"
                  fill="url(#cornerTankRed)"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                />
                {/* Royal Enfield Badge stripe */}
                <path d="M170 93 Q200 89 235 103" stroke="#fef08a" strokeWidth="1.5" fill="none" opacity="0.9" />

                {/* Single Cafe Racer Seat with Red Rear Cowl */}
                <path d="M250 110 Q270 110 295 113 L325 118 L320 130 L248 120 Z" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />
                <path d="M295 113 Q322 113 330 123 L312 130 Z" fill="url(#cornerTankRed)" stroke="#dc2626" strokeWidth="1" />

                {/* Round Chrome Headlight with Cyan Beam */}
                <circle cx="105" cy="105" r="12" fill="url(#cornerChrome)" />
                <path d="M105 93 A12 12 0 0 0 93 105 A12 12 0 0 0 105 117 Z" fill="#38bdf8" fillOpacity="0.8" />
              </svg>
            </div>

            {/* Corner Status Label */}
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-mono tracking-[0.2em] text-red-500 uppercase font-black">
                GT 650 TRANSITION
              </span>
              <span className="text-xs font-display font-bold text-cyan-300">
                {targetSectionName ? targetSectionName.toUpperCase() : 'NAVIGATING...'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
