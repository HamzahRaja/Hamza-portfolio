import React from 'react';
import { useSite } from '../context/SiteContext';
import { PageId } from '../types';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  ArrowUpRight,
  ShieldCheck,
  Download,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteData, setCurrentPage, downloadProjectZip } = useSite();

  const handleNav = (page: PageId) => {
    setCurrentPage(page);
  };

  return (
    <footer className="relative border-t border-[#1f293d] bg-[#090d15] text-[#94a3b8] pt-16 pb-12 overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-primary-light), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1f293d]">
          {/* Col 1 & 2: Bio and Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                }}
              >
                HA
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{siteData.personal.name}</h3>
                <p className="text-xs text-cyan-400 font-medium">{siteData.personal.title}</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              &quot;{siteData.personal.tagline}&quot;
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Helping businesses in the UK, Australia, and Pakistan build high-performance e-commerce platforms and dominate search rankings.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{siteData.personal.availability}</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-cyan-400 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portfolio')} className="hover:text-cyan-400 transition">
                  Portfolio (30+ Projects)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-cyan-400 transition">
                  About & Milestones
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition">
                  Services & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('credentials')} className="hover:text-cyan-400 transition">
                  Credentials & Certs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-cyan-400 transition">
                  Contact Form
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Core Expertise</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-gray-300">WordPress Custom Dev</li>
              <li className="text-gray-300">Shopify Liquid & Stores</li>
              <li className="text-gray-300">WooCommerce Engineering</li>
              <li className="text-gray-300">Technical SEO & Audits</li>
              <li className="text-gray-300">Landing Page & CRO</li>
              <li className="text-gray-300">Speed & Security Hardening</li>
            </ul>
          </div>

          {/* Col 5: Direct Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Direct Contact</h4>
            <div className="space-y-3 text-xs">
              <a
                href={`mailto:${siteData.personal.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition group"
              >
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{siteData.personal.email}</span>
              </a>

              <a
                href={`tel:${siteData.personal.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{siteData.personal.phone}</span>
              </a>

              <a
                href={siteData.personal.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition"
              >
                <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={siteData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition"
              >
                <Github className="w-4 h-4 text-gray-400 shrink-0" />
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-[#1f293d] flex flex-col gap-2">
              <button
                onClick={downloadProjectZip}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#151e2e] border border-cyan-500/30 text-cyan-300 text-xs font-medium hover:bg-cyan-950/40 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Website ZIP</span>
              </button>
              <button
                onClick={() => handleNav('admin')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#151e2e] border border-[#1f293d] text-gray-400 hover:text-white text-xs transition"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Hamza Arif. All rights reserved. Built with modern TypeScript & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Certified Ethical Hacker & Full-Stack Engineer</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
