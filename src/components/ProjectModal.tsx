import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { X, ExternalLink, Globe, CheckCircle2, Tag, ShieldAlert } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject, setCurrentPage, setContactPreselectService } = useSite();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, setSelectedProject]);

  if (!selectedProject) return null;

  const handleHireSimilar = () => {
    setSelectedProject(null);
    setContactPreselectService(`${selectedProject.category} Website / Store`);
    setCurrentPage('contact');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setSelectedProject(null)}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111827] border border-[#1f293d] rounded-2xl shadow-2xl text-gray-100"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.8), 0 0 30px var(--glow-1)',
        }}
      >
        {/* Header / Close */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#111827]/95 border-b border-[#1f293d] backdrop-blur">
          <div className="flex items-center gap-2.5">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: 'var(--glow-1)',
                color: 'var(--color-secondary-light)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {selectedProject.categoryLabel}
            </span>
            {selectedProject.clientCountry && (
              <span className="text-xs text-gray-400">
                • {selectedProject.clientCountry}
              </span>
            )}
          </div>
          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 rounded-xl bg-[#151e2e] text-gray-400 hover:text-white hover:bg-gray-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Hero Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-black/40">
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                {selectedProject.title}
              </h2>
              <p className="text-sm text-cyan-300 font-medium mt-0.5">
                {selectedProject.description}
              </p>
            </div>
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition"
              >
                <span>Visit Live Domain</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Services Delivered */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Services Delivered On This Project</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(selectedProject.servicesDelivered && selectedProject.servicesDelivered.length > 0
                ? selectedProject.servicesDelivered
                : [
                    'Full Platform Architecture & Setup',
                    'Speed Optimization for Sub-2s Load Time',
                    'Security Hardening & SSL Verification',
                    'Technical SEO Setup & Schema Markup',
                  ]
              ).map((srv, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#151e2e] border border-[#1f293d] text-xs text-gray-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-400" />
              <span>Technology & Highlights</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#151e2e] border border-[#1f293d] text-xs text-gray-300 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-[#1f293d] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-400">
              Need a similar website built or optimized?
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setSelectedProject(null)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#1f293d] bg-[#151e2e] hover:bg-gray-800 text-xs font-semibold text-gray-300 transition"
              >
                Close View
              </button>
              <button
                onClick={handleHireSimilar}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  boxShadow: '0 4px 15px var(--glow-1)',
                }}
              >
                Discuss Similar Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
