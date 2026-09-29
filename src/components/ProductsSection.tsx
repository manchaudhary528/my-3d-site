import React from 'react';
import { Package, ExternalLink, Plus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ProductsSection: React.FC = () => {
  const { products, setIsAdminOpen } = usePortfolio();

  const activeProducts = products.filter(p => p.active).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="products" className="relative py-24 border-t border-slate-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching Contact reference */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
            SOFTWARE PLATFORMS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-1">
            PRODUCTS
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-display">
            Autonomous software tools, utilities, and applications engineered for real-world impact.
          </p>
        </div>

        {activeProducts.length === 0 ? (
          /* Premium Futuristic Coming Soon State */
          <div className="hud-glass p-8 sm:p-12 rounded-2xl border border-cyan-500/25 max-w-2xl mx-auto text-center shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Package className="w-7 h-7 text-cyan-400" />
            </div>

            <span className="px-3 py-1 rounded bg-slate-900 border border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold inline-block mb-3">
              PRODUCT PIPELINE
            </span>

            <h3 className="text-2xl font-display font-bold text-white mb-2">
              PRODUCTS COMING SOON
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
              New standalone products and developer software suites will be showcased here upon public release.
            </p>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-5 py-2.5 rounded-lg hud-glass hover:bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 font-mono text-xs tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product in CMS</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProducts.map(prod => (
              <div
                key={prod.id}
                className="hud-glass p-6 rounded-2xl border border-cyan-500/25 hover:border-cyan-400/60 transition-all flex flex-col justify-between shadow-[0_0_25px_rgba(6,182,212,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center">
                      <Package className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 border border-cyan-500/30 text-cyan-300">
                      {prod.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {prod.description}
                  </p>
                </div>

                {prod.url && (
                  <a
                    href={prod.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors pt-3 border-t border-slate-800"
                  >
                    <span>Launch Product</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
