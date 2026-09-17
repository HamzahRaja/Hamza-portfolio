import React from 'react';
import { useSite } from '../context/SiteContext';
import {
  ShieldAlert,
  Code,
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const CredentialsPage: React.FC = () => {
  const { siteData, setCurrentPage } = useSite();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Security':
        return <ShieldAlert className="w-6 h-6 text-cyan-400" />;
      case 'Full-Stack':
        return <Code className="w-6 h-6 text-blue-400" />;
      case 'CMS & Freelancing':
        return <Award className="w-6 h-6 text-emerald-400" />;
      case 'Degree':
        return <GraduationCap className="w-6 h-6 text-blue-400" />;
      default:
        return <BookOpen className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <div className="relative z-10 py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Verified Credentials
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 tracking-tight">
          Certifications & Academic Achievements
        </h1>
        <p className="text-gray-400 text-base sm:text-lg mt-3 leading-relaxed">
          Rigorous technical certifications and formal computer science education ensuring bulletproof security and enterprise code quality.
        </p>
      </div>

      {/* Featured Security Callout */}
      <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#111827] to-cyan-950/40 border border-cyan-500/40 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
          <ShieldCheck className="w-9 h-9" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-cyan-500/30">
              Key Client Benefit
            </span>
            <span className="text-xs text-gray-400">NIAIS Certified</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Ethical Hacking & Proactive Security Hardening
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
            Unlike traditional developers who only write templates, my Ethical Hacking qualification means every client website is audited for OWASP Top 10 vulnerabilities, brute-force resistance, and payment gateway encryption.
          </p>
        </div>
      </div>

      {/* Grid of Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
        {siteData.credentials.map((cred) => (
          <div
            key={cred.id}
            className="group relative p-7 rounded-3xl bg-[#111827] border border-[#1f293d] hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-[#151e2e] border border-[#1f293d] group-hover:scale-105 transition-transform">
                  {getCategoryIcon(cred.category)}
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold font-mono bg-[#151e2e] border border-[#1f293d] text-cyan-300">
                    {cred.year}
                  </span>
                  <div className="text-[11px] text-gray-400 mt-1">{cred.category}</div>
                </div>
              </div>

              {/* Title & Issuer */}
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {cred.title}
              </h3>
              <div className="text-xs font-semibold text-blue-400 mt-1">
                Issued by {cred.issuer}
              </div>

              {/* Description & Impact on Client Work */}
              <div className="mt-4 p-4 rounded-xl bg-[#151e2e]/70 border border-[#1f293d]/80 text-xs text-gray-300 leading-relaxed">
                <div className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-cyan-400" />
                  <span>How It Applies To Client Work</span>
                </div>
                {cred.description}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1f293d] flex items-center justify-between text-[11px] text-gray-400">
              <span>Verified Certificate</span>
              <span className="text-cyan-400 font-semibold">Credential Active ✓</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <button
          onClick={() => setCurrentPage('contact')}
          className="px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            boxShadow: '0 4px 25px var(--glow-1)',
          }}
        >
          Work With A Certified Full-Stack Specialist
        </button>
      </div>
    </div>
  );
};
