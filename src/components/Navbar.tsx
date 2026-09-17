import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { PageId } from '../types';
import {
  Menu,
  X,
  Download,
  Lock,
  Unlock,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    siteData,
    isAdminLoggedIn,
    downloadProjectZip,
    currentTheme,
  } = useSite();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1f293d]/80 bg-[#0b0f17]/85 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-lg transition-transform duration-300 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              boxShadow: '0 0 20px var(--glow-1)',
            }}
          >
            HA
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
              {siteData.personal.name}
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-xs font-medium text-[#94a3b8] flex items-center gap-1.5">
              <span>Full-Stack Dev</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="text-cyan-400">SEO Specialist</span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-[#111827]/80 border border-[#1f293d]">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: 'var(--color-primary)',
                        boxShadow: '0 0 16px var(--glow-1)',
                      }
                    : {}
                }
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Download ZIP button */}
          <button
            onClick={downloadProjectZip}
            title="Download complete source code & hosting package as a ZIP file"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-300 bg-[#151e2e] border border-[#1f293d] hover:border-blue-500/50 hover:text-white transition-all shadow-sm group"
          >
            <Download className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Download ZIP</span>
          </button>

          {/* Admin Panel button */}
          <button
            onClick={() => handleNavClick('admin')}
            title={isAdminLoggedIn ? 'Open Admin Dashboard' : 'Login to Admin Panel'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isAdminLoggedIn
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                : 'bg-[#151e2e] text-[#94a3b8] border-[#1f293d] hover:text-white hover:border-gray-600'
            }`}
          >
            {isAdminLoggedIn ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin: Active</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span>Admin</span>
              </>
            )}
          </button>

          {/* Let's Talk CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              boxShadow: '0 4px 20px var(--glow-1)',
            }}
          >
            <span>Let&apos;s Work Together</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={downloadProjectZip}
            title="Download ZIP"
            className="p-2 rounded-lg bg-[#151e2e] border border-[#1f293d] text-cyan-400"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-gray-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#1f293d] bg-[#0b0f17]/95 backdrop-blur-2xl px-6 py-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40'
                      : 'bg-[#151e2e] text-gray-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#1f293d] flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm font-medium text-gray-300"
            >
              {isAdminLoggedIn ? (
                <>
                  <Unlock className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Admin Panel (Logged In)</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span>Admin Panel Login</span>
                </>
              )}
            </button>

            <button
              onClick={downloadProjectZip}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#111827] border border-cyan-500/30 text-cyan-300 text-sm font-semibold"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete Website (.ZIP)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
