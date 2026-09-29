import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, ArrowRight, Play } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
  videoSrc?: string | null;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, videoSrc }) => {
  const [stage, setStage] = useState<number>(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [playFailed, setPlayFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoSrc && videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay prevented:", error);
          setPlayFailed(true);
        });
      }
    }
  }, [videoSrc]);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlayFailed(false);
    }
  };

  // If a real video file is present, play it directly
  if (videoSrc) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={onComplete}
          className="w-full h-full object-cover"
        />
        {playFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-40">
            <button 
              onClick={handleManualPlay}
              className="p-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400 hover:bg-cyan-500/40 transition-all cursor-pointer flex flex-col items-center gap-2"
            >
              <Play className="w-12 h-12" />
              <span className="font-mono text-xs tracking-widest uppercase">Click to Play</span>
            </button>
          </div>
        )}
        <button
          onClick={onComplete}
          className="absolute top-8 right-8 z-50 px-4 py-2 text-xs font-mono tracking-widest text-slate-300 bg-slate-900/80 hover:bg-cyan-950/80 hover:text-cyan-400 border border-slate-700/60 hover:border-cyan-500/50 rounded transition-all backdrop-blur-md cursor-pointer flex items-center gap-2"
        >
          SKIP INTRO <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // 5-Step Cinematic Animation Sequence
  // Stage 0: Door Opens & Enter Room (0s - 2.2s)
  // Stage 1: Enter & Sit in Chair (2.2s - 4.2s)
  // Stage 2: Open Laptop Lid & Screen Powers On (4.2s - 6.4s)
  // Stage 3: Camera Zooms Into Glowing Screen (6.4s - 8.2s)
  // Stage 4: Arrive in Portfolio (8.2s+)
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setStage(1), 2200));
    timers.push(setTimeout(() => setStage(2), 4200));
    timers.push(setTimeout(() => setStage(3), 6400));
    timers.push(setTimeout(() => {
      setIsSkipping(true);
      setTimeout(onComplete, 600);
    }, 8500));

    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  // Ambient synth sound via Web Audio API when user toggles audio
  const toggleAudio = () => {
    setIsAudioEnabled(prev => !prev);
    if (!isAudioEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 3);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 7);
      } catch {
        // Audio not allowed or unsupported
      }
    }
  };

  const handleSkip = () => {
    setIsSkipping(true);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isSkipping && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#030712] text-white flex flex-col justify-between overflow-hidden select-none"
        >
          {/* Top Bar Controls */}
          <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                Cinematic Sequence · CMD Studio
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleAudio}
                className="p-2 rounded border border-slate-700/60 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
                title={isAudioEnabled ? 'Mute' : 'Enable ambient sound'}
              >
                {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={handleSkip}
                className="px-3.5 py-1.5 rounded border border-cyan-500/40 bg-slate-900/80 text-cyan-400 hover:bg-cyan-950/60 transition-all font-mono text-xs tracking-wider uppercase cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                SKIP INTRO <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cinematic Canvas Scene */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Studio Wall & Blue Neon CMD Logo */}
            <div className="absolute inset-0 bg-[#020617] flex items-center justify-center">
              {/* Radial Lighting */}
              <div className="absolute w-[800px] h-[600px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
              <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />

              {/* Glowing CMD Neon Sign on the Wall */}
              <motion.div
                animate={{
                  opacity: stage >= 0 ? 0.9 : 0.2,
                  scale: stage === 3 ? 1.6 : 1,
                  y: stage === 3 ? -100 : 0
                }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute top-[18%] flex flex-col items-center"
              >
                <div className="px-6 py-2 rounded-xl border border-cyan-400/40 bg-cyan-950/20 shadow-[0_0_50px_rgba(6,182,212,0.35)] backdrop-blur-sm">
                  <span className="font-display font-black text-3xl md:text-5xl text-cyan-400 tracking-[0.2em] drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                    CMD
                  </span>
                </div>
                <span className="text-[11px] font-mono tracking-[0.3em] text-cyan-300/70 mt-2 uppercase">
                  Chaudhari Man Dineshbhai
                </span>
              </motion.div>
            </div>

            {/* Stage 0: Door Opening Visual */}
            {stage === 0 && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Door panels sliding open */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
                  className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#02040a] origin-left border-r border-cyan-500/30 shadow-[10px_0_40px_rgba(0,0,0,0.9)]"
                />
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }}
                  className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#02040a] origin-right border-l border-cyan-500/30 shadow-[-10px_0_40px_rgba(0,0,0,0.9)]"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10 text-center"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
                    Step 1 · Studio Access Granted
                  </p>
                  <h2 className="font-display text-2xl font-bold text-slate-100 mt-1">
                    Entering Workstation
                  </h2>
                </motion.div>
              </motion.div>
            )}

            {/* Stage 1 & 2 & 3: Desk, Person, Gigabyte Laptop & Zoom */}
            <motion.div
              animate={{
                scale: stage === 0 ? 0.75 : stage === 1 ? 0.95 : stage === 2 ? 1.05 : 3.8,
                y: stage === 3 ? 240 : 30,
                opacity: stage === 3 ? 0.95 : 1
              }}
              transition={{
                duration: stage === 3 ? 1.8 : 1.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative z-20 flex flex-col items-center justify-center max-w-2xl w-full"
            >
              {/* The Workstation Desk */}
              <div className="relative w-full flex flex-col items-center">
                {/* Laptop Unit */}
                <div className="relative w-[340px] md:w-[460px] flex flex-col items-center">
                  {/* Laptop Screen Lid */}
                  <motion.div
                    animate={{
                      rotateX: stage >= 2 ? 0 : 88,
                      opacity: stage >= 1 ? 1 : 0.4
                    }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                    style={{ transformOrigin: 'bottom center', perspective: 1000 }}
                    className="relative w-full aspect-[16/10] bg-[#090d16] rounded-t-xl border border-slate-700/80 p-3 shadow-[0_0_50px_rgba(14,165,233,0.3)] flex flex-col overflow-hidden"
                  >
                    {/* Screen Content - Glowing Portfolio Boot */}
                    <div className="w-full h-full bg-[#030712] rounded-lg border border-cyan-500/40 p-4 flex flex-col justify-between relative overflow-hidden">
                      {/* Holographic Matrix Grid inside screen */}
                      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:16px_16px]" />

                      {/* Screen Header */}
                      <div className="flex items-center justify-between z-10">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400/90 tracking-wider">
                          PORTFOLIO_OS // READY
                        </span>
                      </div>

                      {/* Center Screen Metallic MAK Logo & Greeting */}
                      <div className="flex flex-col items-center justify-center my-auto z-10 text-center">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-900/40 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                          <span className="font-display font-black text-2xl text-white tracking-widest">
                            M
                          </span>
                        </div>
                        <h3 className="font-display font-extrabold text-base md:text-lg text-white mt-2 tracking-wide">
                          CHAUDHARI MAN DINESHBHAI
                        </h3>
                        <p className="text-[11px] font-mono text-cyan-400">
                          Computer Engineering · AI/ML · Full-Stack
                        </p>
                      </div>

                      {/* Screen Bottom Bar */}
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 z-10">
                        <span>SYSTEM: ONLINE</span>
                        <span className="text-cyan-400 animate-pulse">ZOOMING TO WORKSPACE →</span>
                      </div>
                    </div>

                    {/* Camera bezel notch */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800 border border-cyan-400/40" />
                  </motion.div>

                  {/* Laptop Base (Keyboard Chassis with GIGABYTE styling & blue underglow) */}
                  <div className="relative w-[108%] h-5 bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] rounded-b-lg border-t border-slate-600 shadow-[0_15px_30px_rgba(0,0,0,0.9)] flex items-center justify-center">
                    {/* Blue underglow vent light */}
                    <div className="absolute -bottom-1 w-3/4 h-1.5 bg-cyan-400 rounded-full blur-[3px]" />
                    <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-slate-400 uppercase">
                      GIGABYTE
                    </span>
                  </div>
                </div>

                {/* Desk Surface & Accoutrements (Clean Code books, succulent) */}
                <div className="w-[125%] h-8 bg-gradient-to-b from-[#111827] to-[#030712] rounded-lg mt-1 border-t border-slate-800 flex items-center justify-between px-6 shadow-2xl">
                  {/* Left: Engineering Stack Books */}
                  <div className="flex items-center gap-1 opacity-70">
                    <div className="h-3 w-16 bg-blue-900 rounded-sm text-[7px] font-mono flex items-center justify-center text-cyan-300">
                      Clean Code
                    </div>
                    <div className="h-3 w-14 bg-slate-800 rounded-sm text-[7px] font-mono flex items-center justify-center text-slate-300">
                      System Design
                    </div>
                  </div>

                  {/* Right: Succulent / Workspace element */}
                  <div className="flex items-center gap-2 opacity-60">
                    <span className="text-[8px] font-mono text-slate-500">
                      UV Patel College of Engineering
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Narrative Subtitle */}
          <div className="relative z-30 pb-8 text-center px-4">
            <motion.p
              key={stage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-xs tracking-wider text-slate-300"
            >
              {stage === 0 && 'Entering workstation studio...'}
              {stage === 1 && 'Initializing developer environment...'}
              {stage === 2 && 'Opening GIGABYTE system · Launching portfolio...'}
              {stage >= 3 && 'Entering interactive experience...'}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
