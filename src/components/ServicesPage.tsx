import React from 'react';
import { useSite } from '../context/SiteContext';
import {
  Code2,
  ShoppingBag,
  TrendingUp,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { siteData, setCurrentPage, setContactPreselectService } = useSite();

  const getServiceIcon = (index: number) => {
    const icons = [Code2, ShoppingBag, TrendingUp, Zap, ShieldCheck];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  const handleBookService = (serviceTitle: string) => {
    setContactPreselectService(serviceTitle);
    setCurrentPage('contact');
  };

  return (
    <div className="relative z-10 py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Commercial Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 tracking-tight">
          Services & Specialized Solutions
        </h1>
        <p className="text-gray-400 text-base sm:text-lg mt-3 leading-relaxed">
          Transparent starting rates, rapid delivery cycles, and verified ROI for businesses in the UK, Australia, and Pakistan.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {siteData.services.map((service, index) => (
          <div
            key={service.id}
            className="group relative p-8 rounded-3xl bg-[#111827] border border-[#1f293d] hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-2xl"
            style={{
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div>
              {/* Header: Icon & Category */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                    boxShadow: '0 0 20px var(--glow-1)',
                  }}
                >
                  {getServiceIcon(index)}
                </div>
                <span className="px-3 py-1 rounded-full bg-[#151e2e] border border-[#1f293d] text-[11px] font-bold text-gray-400">
                  {service.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-2.5 leading-relaxed">
                {service.description}
              </p>

              {/* Key Result / Outcome Box */}
              <div className="mt-5 p-4 rounded-xl bg-[#151e2e] border border-[#1f293d] space-y-1">
                <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Verified Outcome</span>
                </div>
                <p className="text-xs text-gray-200 font-medium leading-relaxed">
                  {service.outcome}
                </p>
              </div>

              {/* Highlights List */}
              {service.highlights && service.highlights.length > 0 && (
                <div className="mt-5 space-y-2">
                  {service.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Action */}
            <div className="mt-8 pt-6 border-t border-[#1f293d] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-400 block">Starting at</span>
                <span className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">
                  {service.startingPrice}
                </span>
              </div>

              <button
                onClick={() => handleBookService(service.title)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                }}
              >
                <span>Book Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Guarantee Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/30 to-cyan-950/30 border border-blue-500/30 max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>Transparent Milestones & Fast Turnaround</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Not sure which service package fits your business?
        </h2>
        <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
          I provide a free 15-minute audit of your current website, speed bottlenecks, and conversion leaks before any commitment.
        </p>
        <button
          onClick={() => setCurrentPage('contact')}
          className="mt-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-wider transition shadow-lg"
        >
          Request Free Website Audit
        </button>
      </div>
    </div>
  );
};
