import React, { useState, useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import { ProjectCategory, ProjectItem } from '../types';
import {
  Search,
  ExternalLink,
  Eye,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { siteData, setSelectedProject, setCurrentPage } = useSite();
  const [activeFilter, setActiveFilter] = useState<'ALL' | ProjectCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: { id: 'ALL' | ProjectCategory; label: string; count: number }[] = useMemo(() => {
    const allCount = siteData.projects.length;
    const wpCount = siteData.projects.filter((p) => p.category === 'WordPress').length;
    const shCount = siteData.projects.filter((p) => p.category === 'Shopify').length;
    const wcCount = siteData.projects.filter((p) => p.category === 'WooCommerce').length;
    const cuCount = siteData.projects.filter((p) => p.category === 'Custom').length;

    return [
      { id: 'ALL', label: 'All Projects', count: allCount },
      { id: 'WordPress', label: 'WordPress Websites', count: wpCount },
      { id: 'Shopify', label: 'Shopify Stores', count: shCount },
      { id: 'WooCommerce', label: 'WooCommerce E-Commerce', count: wcCount },
      { id: 'Custom', label: 'Custom Development', count: cuCount },
    ];
  }, [siteData.projects]);

  const filteredProjects = useMemo(() => {
    return siteData.projects.filter((project) => {
      const matchesCategory =
        activeFilter === 'ALL' || project.category === activeFilter;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [siteData.projects, activeFilter, searchQuery]);

  return (
    <div className="relative z-10 py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Complete Showcase
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 tracking-tight">
          Portfolio & Commercial Work
        </h1>
        <p className="text-gray-400 text-base mt-3 leading-relaxed">
          Over 30+ production websites and e-commerce stores architected and optimized for international clients across the UK, Australia, and Pakistan.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1f293d]">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'bg-[#151e2e] text-gray-400 hover:text-white border border-[#1f293d]'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: 'var(--color-primary)',
                        boxShadow: '0 0 20px var(--glow-1)',
                      }
                    : {}
                }
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search domain, stack..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111827] border border-[#1f293d] text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-[#111827] border border-[#1f293d] p-8">
          <Filter className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No matching projects found</h3>
          <p className="text-xs text-gray-400 mt-1">
            Try adjusting your search keywords or choosing another category tab above.
          </p>
          <button
            onClick={() => {
              setActiveFilter('ALL');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl bg-[#111827] border border-[#1f293d] overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#0d1424]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-85" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold text-white shadow-md backdrop-blur"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                      }}
                    >
                      {project.categoryLabel}
                    </span>
                    {project.clientCountry && (
                      <span className="px-2 py-0.5 rounded-md bg-[#0b0f17]/90 text-[10px] text-gray-300 border border-[#1f293d]">
                        {project.clientCountry}
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-950/40 backdrop-blur-xs">
                    <span className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-2 shadow-xl">
                      <Eye className="w-4 h-4" />
                      <span>Open Lightbox</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#151e2e] text-[10px] font-mono text-gray-400 border border-[#1f293d]"
                      >
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-gray-500 font-mono">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-[#1f293d] bg-[#0d131f]/50 flex items-center justify-between text-xs">
                <span className="text-gray-400">Click to view details & scope</span>
                <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-20 p-10 rounded-3xl bg-[#111827] border border-[#1f293d] text-center max-w-3xl mx-auto shadow-2xl">
        <h3 className="text-2xl font-black text-white tracking-tight">
          Need a website or e-commerce store with these standards?
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl mx-auto">
          From custom WordPress & Shopify Liquid to high-converting landing pages, I build systems that rank and convert.
        </p>
        <button
          onClick={() => setCurrentPage('contact')}
          className="mt-6 px-7 py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-xl transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            boxShadow: '0 4px 20px var(--glow-1)',
          }}
        >
          Discuss Your Project
        </button>
      </div>
    </div>
  );
};
