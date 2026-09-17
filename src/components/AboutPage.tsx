import React, { useState, useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import {
  GraduationCap,
  Briefcase,
  Globe,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { siteData, setCurrentPage } = useSite();
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSkillsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header & Story Introduction */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          The Story & Philosophy
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 tracking-tight">
          Engineering Meets Digital Growth
        </h1>
        <p className="text-gray-400 text-base sm:text-lg mt-4 leading-relaxed">
          How a Software Engineering graduate built an international web engineering practice blending clean code with measurable marketing ROI.
        </p>
      </div>

      {/* 2. Narrative Section with Profile Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
        {/* Left: Interactive Card */}
        <div className="lg:col-span-5">
          <div className="p-8 rounded-3xl bg-[#111827] border border-[#1f293d] shadow-2xl relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full filter blur-[80px] opacity-25 pointer-events-none"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl mb-6">
                <img
                  src={siteData.personal.profileImage}
                  alt={siteData.personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-black text-white">{siteData.personal.name}</h3>
              <p className="text-sm font-semibold text-cyan-400 mt-1">{siteData.personal.title}</p>
              <div className="mt-4 pt-4 border-t border-[#1f293d] space-y-2.5 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>BS Software Engineering (UMT Lahore, 2021)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span>Former CMS & Frontend Dev at Pixel Play Hub (Sydney)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Serving UK, Australia, and Pakistan brands</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#1f293d] flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-white">4+ Years</div>
                  <div className="text-[11px] text-gray-400">Commercial Dev</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-cyan-400">35% Avg</div>
                  <div className="text-[11px] text-gray-400">Organic Growth</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-400">&lt;2.0s</div>
                  <div className="text-[11px] text-gray-400">Page Load Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Narrative Story Paragraphs */}
        <div className="lg:col-span-7 space-y-5 text-gray-300 leading-relaxed text-sm sm:text-base">
          {siteData.about.storyParagraphs.map((para, idx) => (
            <p key={idx} className="bg-[#111827]/60 border border-[#1f293d]/80 p-5 rounded-2xl">
              {para}
            </p>
          ))}

          {/* Distinctive Mindset Callout */}
          <div
            className="p-6 rounded-2xl border text-white font-medium text-base sm:text-lg leading-relaxed shadow-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(6,182,212,0.15))',
              borderColor: 'var(--border-focus)',
            }}
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
              <span>{siteData.about.mindsetHighlight}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SKILLS SECTION (Progress Bars) */}
      <div ref={skillsRef} className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Technical Proficiency
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
            Core Competencies & Skill Metrics
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Measurable proficiency developed through four years of production engineering and commercial optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {siteData.skills.map((skill, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#111827] border border-[#1f293d] shadow-md"
            >
              <div className="flex items-center justify-between text-sm font-bold text-white mb-2">
                <span>{skill.name}</span>
                <span className="text-cyan-400 font-mono">{skill.percentage}%</span>
              </div>
              {/* Meter bar */}
              <div className="w-full h-3 rounded-full bg-[#151e2e] overflow-hidden p-0.5 border border-[#1f293d]">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: skillsVisible ? `${skill.percentage}%` : '0%',
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                    boxShadow: '0 0 10px var(--glow-1)',
                  }}
                />
              </div>
              <div className="mt-2 text-[11px] text-gray-400 flex items-center justify-between">
                <span>{skill.category}</span>
                <span>Production Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ANIMATED TIMELINE MILESTONES */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
            Milestones & Career Evolution
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            A track record of consistent growth, agency leadership, and client impact.
          </p>
        </div>

        <div className="relative border-l-2 border-[#1f293d] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {siteData.milestones.map((milestone, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline node icon */}
              <div
                className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#111827] border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-md group-hover:scale-125 transition-transform"
                style={{
                  boxShadow: '0 0 12px var(--glow-1)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Milestone Card */}
              <div className="p-6 rounded-2xl bg-[#111827] border border-[#1f293d] group-hover:border-cyan-500/40 transition-all shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-md bg-blue-950/60 border border-blue-500/30 text-xs font-bold text-cyan-400 font-mono">
                    {milestone.year}
                  </span>
                  {milestone.location && (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      <span>{milestone.location}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {milestone.title}
                </h3>
                <div className="text-xs font-semibold text-blue-400 mt-0.5">
                  {milestone.organization}
                </div>

                <p className="text-xs sm:text-sm text-gray-400 mt-2.5 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              boxShadow: '0 4px 25px var(--glow-1)',
            }}
          >
            Hire Hamza For Your Team Or Project
          </button>
        </div>
      </div>
    </div>
  );
};
