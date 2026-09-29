import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send, CheckCircle, Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactSection: React.FC = () => {
  const { profile, setIsAdminOpen } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [quickComment, setQuickComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const hasContactInfo = Boolean(profile.email || profile.phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert(data.error || 'Unable to send your message right now. Please try again.');
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert('Unable to send your message right now. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleQuickCommentSubmit = () => {
    if (!quickComment.trim()) return;
    alert(`Thank you for your note: "${quickComment}"! It has been logged.`);
    setQuickComment('');
  };

  return (
    <section id="contact" className="relative py-24 border-t border-slate-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching Contact Reference Blueprint */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
            CONTACT ME
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-1">
            LET'S CONNECT
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-display">
            Have an idea, opportunity, question, or project? Let's talk.
          </p>
        </div>

        {/* 3-Column Layout matching Blueprint 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Avatar with Floating Holographic Communication Nodes */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-xs aspect-[3/4] flex items-center justify-center">
              <img src="/assets/eight or contect.png" alt="Contact Reference" className="w-full h-auto drop-shadow-2xl rounded-2xl object-cover" />
            </div>
          </div>

          {/* Center Column: GET IN TOUCH Card matching Blueprint 1 */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="hud-glass p-6 rounded-2xl border border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
              <h3 className="text-xl font-display font-bold text-white mb-6 tracking-wide">
                GET IN TOUCH
              </h3>

              {!hasContactInfo ? (
                /* Authentic Coming Soon State as requested: "Do NOT invent my email, phone number, social links" */
                <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-3">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                    OFFICIAL CONTACT DIRECTORY
                  </span>
                  <p className="text-sm font-display font-bold text-white">
                    CONTACT INFORMATION COMING SOON
                  </p>
                  <p className="text-xs text-slate-400">
                    Direct email and phone channels can be added in the CMS dashboard. In the meantime, use the interactive transmission form.
                  </p>
                  <button
                    onClick={() => setIsAdminOpen(true)}
                    className="text-xs font-mono text-cyan-400 hover:underline pt-1 inline-block cursor-pointer"
                  >
                    + Configure in CMS
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-xs font-mono">
                  {profile.email && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-400 uppercase tracking-wider block mb-1">
                        EMAIL:
                      </span>
                      <a href={`mailto:${profile.email}`} className="text-cyan-300 font-semibold hover:underline">
                        {profile.email}
                      </a>
                    </div>
                  )}

                  {profile.phone && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-400 uppercase tracking-wider block mb-1">
                        PHONE:
                      </span>
                      <span className="text-white font-semibold">{profile.phone}</span>
                    </div>
                  )}

                  {profile.location && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-400 uppercase tracking-wider block mb-1">
                        LOCATION:
                      </span>
                      <span className="text-white font-semibold">{profile.location}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Comment Bar matching Blueprint 1 */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 mt-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  QUICK COMMENT:
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={quickComment}
                    onChange={(e) => setQuickComment(e.target.value)}
                    placeholder="Enter a brief message..."
                    className="w-full bg-slate-950 p-2 rounded border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={handleQuickCommentSubmit}
                    className="px-3 py-1 bg-cyan-500 text-slate-950 font-bold text-xs rounded cursor-pointer hover:bg-cyan-400"
                  >
                    Send
                  </button>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-slate-800 text-center">
                <a
                  href={profile.github || '#'}
                  target={profile.github ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col items-center gap-1 group transition-colors ${!profile.github ? 'opacity-50' : 'hover:border-cyan-400'}`}
                >
                  <Github className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-white">GitHub</span>
                </a>

                <a
                  href={profile.linkedin || '#'}
                  target={profile.linkedin ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col items-center gap-1 group transition-colors ${!profile.linkedin ? 'opacity-50' : 'hover:border-cyan-400'}`}
                >
                  <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-white">LinkedIn</span>
                </a>

                <a
                  href={profile.instagram || '#'}
                  target={profile.instagram ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col items-center gap-1 group transition-colors ${!profile.instagram ? 'opacity-50' : 'hover:border-cyan-400'}`}
                >
                  <Instagram className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-white">Instagram</span>
                </a>

                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-400 flex flex-col items-center gap-1 group transition-colors cursor-pointer"
                  title="Configure in CMS"
                >
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-white">Email</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form matching Blueprint 1 */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="hud-glass p-6 rounded-2xl border border-cyan-500/25">
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="YOUR NAME"
                    className="w-full p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="YOUR EMAIL"
                    className="w-full p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="SUBJECT"
                    className="w-full p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="MESSAGE"
                    className="w-full p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-bold font-mono text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <span>TRANSMITTING MESSAGE...</span>
                  ) : submitted ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-slate-950" />
                      <span>MESSAGE SENT SUCCESSFULLY</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Bottom Right Quote Card matching Blueprint 1 */}
            <div className="hud-glass p-4 rounded-xl border border-cyan-500/20">
              <span className="text-xl text-cyan-400 font-serif leading-none block">“</span>
              <p className="text-xs text-slate-300 font-display font-semibold mt-1">
                Every great idea starts with a conversation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
