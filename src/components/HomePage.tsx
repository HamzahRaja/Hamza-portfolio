import React, { useEffect, useState, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { ProjectItem } from '../types';
import {
  ArrowRight,
  Sparkles,
  Code2,
  ShoppingBag,
  TrendingUp,
  Zap,
  ShieldCheck,
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  CheckCircle,
  Eye
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { siteData, setCurrentPage, setSelectedProject } = useSite();
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const [countWebsites, setCountWebsites] = useState(0);
  const [countClients, setCountClients] = useState(0);
  const [countYears, setCountYears] = useState(0);
  const [countGrowth, setCountGrowth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
          setStatsAnimated(true);

          // Animate counters
          const targetWebsites = siteData.personal.completedWebsites;
          const targetClients = siteData.personal.happyClients;
          const targetYears = siteData.personal.experienceYears;
          const targetGrowth = siteData.personal.avgTrafficGrowth;

          const duration = 1500;
          const steps = 40;
          const intervalTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setCountWebsites(Math.floor(progress * targetWebsites));
            setCountClients(Math.floor(progress * targetClients));
            setCountYears(Math.floor(progress * targetYears));
            setCountGrowth(Math.floor(progress * targetGrowth));

            if (currentStep >= steps) {
              setCountWebsites(targetWebsites);
              setCountClients(targetClients);
              setCountYears(targetYears);
              setCountGrowth(targetGrowth);
              clearInterval(timer);
            }
          }, intervalTime);
        }
      },
      { threshold: 0.25 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated, siteData.personal]);

  // Testimonials slide state
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = siteData.testimonials;

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Featured projects: take top 4 featured
  const featuredProjects = siteData.projects.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="relative z-10 w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#151e2e] border border-blue-500/30 text-xs font-semibold text-cyan-300 shadow-sm animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Full-Stack Developer & Digital Marketing Specialist</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Hi, I&apos;m{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light))',
                }}
              >
                {siteData.personal.name}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-gray-200 tracking-tight">
              &quot;{siteData.personal.tagline}&quot;
            </p>

            <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {siteData.personal.bioShort}
            </p>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setCurrentPage('portfolio')}
                className="px-7 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  boxShadow: '0 4px 25px var(--glow-1)',
                }}
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentPage('contact')}
                className="px-7 py-3.5 rounded-xl text-sm font-bold text-gray-200 bg-[#151e2e] border border-[#1f293d] hover:border-cyan-500/50 hover:text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Let&apos;s Work Together
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-[#1f293d] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Certified Ethical Hacker</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>30+ Live Platforms</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>UK & Australia Clients</span>
              </div>
            </div>
          </div>

          {/* Right Column: Headshot Photo with Glowing Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Soft Pulsing Ambient Glow */}
              <div
                className="absolute -inset-2 rounded-3xl opacity-60 blur-2xl transition duration-700 group-hover:opacity-90 animate-glow-1"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                }}
              />

              {/* Outer Frame */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[430px] rounded-3xl p-2.5 bg-[#111827] border border-[#1f293d] shadow-2xl transition-all duration-500 group-hover:border-cyan-500/40">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0d1424]">
                  <img
                    src={siteData.personal.profileImage}
                    alt={siteData.personal.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay at bottom of photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent opacity-80" />

                  {/* Floating badge inside photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0b0f17]/85 backdrop-blur border border-[#1f293d] text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{siteData.personal.name}</div>
                        <div className="text-[11px] text-cyan-400 font-medium">{siteData.personal.title}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (Animated Counters) */}
      <section ref={statsRef} className="py-12 border-y border-[#1f293d] bg-[#0d131f]/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
            {/* Stat 1 */}
            <div className="p-6 rounded-2xl bg-[#151e2e]/70 border border-[#1f293d] transition-all hover:border-blue-500/40">
              <div
                className="text-4xl sm:text-5xl font-black tracking-tight"
                style={{ color: 'var(--color-primary-light)' }}
              >
                {countWebsites}+
              </div>
              <div className="text-sm font-semibold text-gray-200 mt-2">Websites Built</div>
              <div className="text-xs text-gray-400 mt-1">WordPress, Shopify, & Custom</div>
            </div>

            {/* Stat 2 */}
            <div className="p-6 rounded-2xl bg-[#151e2e]/70 border border-[#1f293d] transition-all hover:border-cyan-500/40">
              <div
                className="text-4xl sm:text-5xl font-black tracking-tight"
                style={{ color: 'var(--color-secondary-light)' }}
              >
                {countClients}+
              </div>
              <div className="text-sm font-semibold text-gray-200 mt-2">Clients Served</div>
              <div className="text-xs text-gray-400 mt-1">UK, Australia, & Pakistan</div>
            </div>

            {/* Stat 3 */}
            <div className="p-6 rounded-2xl bg-[#151e2e]/70 border border-[#1f293d] transition-all hover:border-blue-500/40">
              <div
                className="text-4xl sm:text-5xl font-black tracking-tight"
                style={{ color: 'var(--color-primary-light)' }}
              >
                {countYears}+
              </div>
              <div className="text-sm font-semibold text-gray-200 mt-2">Years Experience</div>
              <div className="text-xs text-gray-400 mt-1">Commercial Full-Stack & CRO</div>
            </div>

            {/* Stat 4 */}
            <div className="p-6 rounded-2xl bg-[#151e2e]/70 border border-[#1f293d] transition-all hover:border-cyan-500/40">
              <div
                className="text-4xl sm:text-5xl font-black tracking-tight"
                style={{ color: 'var(--color-secondary-light)' }}
              >
                {countGrowth}%
              </div>
              <div className="text-sm font-semibold text-gray-200 mt-2">Avg Traffic Growth</div>
              <div className="text-xs text-gray-400 mt-1">Consistent Organic Surge</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES TEASER SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Specialized Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
            High-Performance Web & Growth Services
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Every solution is engineered for both lightning-fast load times and high commercial conversion rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.services.slice(0, 4).map((service, index) => {
            const icons = [Code2, ShoppingBag, TrendingUp, Zap];
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={service.id}
                className="group relative p-6 rounded-2xl bg-[#111827] border border-[#1f293d] hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                    }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1f293d] flex items-center justify-between text-xs">
                  <span className="text-gray-400">Starting from</span>
                  <span className="font-extrabold text-cyan-400 text-sm">
                    {service.startingPrice}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setCurrentPage('services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition group"
          >
            <span>Explore all services, deliverables & security audits</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 4. FEATURED WORK SECTION */}
      <section className="py-20 bg-[#0d131f]/70 border-t border-[#1f293d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                Featured Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
                Selected Commercial Projects
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Real production websites built for businesses in UK, Australia, and Pakistan.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('portfolio')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] hover:border-cyan-500/50 text-white text-xs font-bold transition group shrink-0"
            >
              <span>View Full Portfolio (30+ Projects)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-2xl bg-[#111827] border border-[#1f293d] overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-lg flex flex-col"
              >
                {/* Thumbnail with hover zoom */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0b0f17]/90 backdrop-blur border border-[#1f293d] text-[10px] font-bold text-cyan-300">
                    {project.categoryLabel}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-950/40 backdrop-blur-xs">
                    <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1f293d] flex items-center justify-between text-[11px] text-gray-400">
                    <span>{project.clientCountry || 'International'}</span>
                    <span className="text-cyan-400 font-semibold group-hover:underline">Quick Preview →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentPage('portfolio')}
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                boxShadow: '0 4px 25px var(--glow-1)',
              }}
            >
              View Full Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION (Sliding Cards) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
            What Clients Say Across UK, Australia & Pakistan
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Card Carousel */}
          <div className="relative p-8 sm:p-12 rounded-3xl bg-[#111827] border border-[#1f293d] shadow-2xl overflow-hidden">
            {/* Ambient inner glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full filter blur-[90px] opacity-20 pointer-events-none"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />

            <div className="flex items-center gap-1.5 text-amber-400 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium leading-relaxed italic">
              &quot;{testimonials[activeTestimonial].quote}&quot;
            </blockquote>

            <div className="mt-8 pt-6 border-t border-[#1f293d] flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-base font-bold text-white">
                  {testimonials[activeTestimonial].author}
                </div>
                <div className="text-xs text-cyan-400 font-medium mt-0.5">
                  {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].company}
                </div>
                <div className="text-[11px] text-gray-400">
                  {testimonials[activeTestimonial].location}
                </div>
              </div>

              {/* Navigation Arrows & Dots */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 mr-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeTestimonial === idx
                          ? 'w-7 bg-cyan-400'
                          : 'bg-gray-700 hover:bg-gray-500'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={prevTestimonial}
                  className="p-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-gray-300 hover:text-white hover:border-cyan-500/50 transition"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-gray-300 hover:text-white hover:border-cyan-500/50 transition"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MARQUEE ROW: PLATFORMS & CLIENT TYPES */}
      <section className="py-12 border-y border-[#1f293d] bg-[#090e18] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Platforms, Frameworks & Global Client Partnerships
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Left/right fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#090e18] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#090e18] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee py-3 flex items-center gap-6">
            {[...siteData.platformsMarquee, ...siteData.platformsMarquee].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#111827] border border-[#1f293d] text-gray-300 whitespace-nowrap shadow-sm hover:border-cyan-500/40 transition"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                />
                <span className="font-bold text-sm text-white">{item.name}</span>
                <span className="text-[11px] text-gray-400 px-2 py-0.5 rounded bg-[#151e2e] border border-[#1f293d]">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLOSING CALL TO ACTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative p-10 sm:p-16 rounded-3xl overflow-hidden border border-[#1f293d] text-center"
          style={{
            background: 'linear-gradient(135deg, #111827 0%, #151e2e 100%)',
            boxShadow: '0 0 50px var(--glow-1)',
          }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full filter blur-[100px] opacity-30 pointer-events-none"
            style={{ backgroundColor: 'var(--color-primary)' }}
          />

          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Ready To Launch?
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white mt-5 max-w-2xl mx-auto tracking-tight leading-tight">
            Have a project in mind? Let&apos;s build something exceptional.
          </h2>

          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Whether you need a new e-commerce store, a custom web app, or 35% organic traffic growth — I am available immediately.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                boxShadow: '0 4px 25px var(--glow-1)',
              }}
            >
              Start A Conversation
            </button>

            <a
              href={`mailto:${siteData.personal.email}`}
              className="px-7 py-3.5 rounded-xl text-sm font-semibold text-gray-200 bg-[#151e2e] border border-[#1f293d] hover:border-gray-600 hover:text-white transition"
            >
              Email Directly
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
