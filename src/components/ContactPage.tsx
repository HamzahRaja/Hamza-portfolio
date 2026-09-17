import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  Linkedin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { siteData, contactPreselectService, setContactPreselectService, showToast } = useSite();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'WordPress Website',
    budgetRange: '$500 – $1,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (contactPreselectService) {
      // Map to best fit dropdown
      const matched = [
        'WordPress Website',
        'Shopify Store',
        'WooCommerce Store',
        'Custom Development',
        'SEO and Digital Marketing',
        'Landing Page and CRO',
        'Other',
      ].find((opt) => opt.toLowerCase().includes(contactPreselectService.toLowerCase()));

      setFormData((prev) => ({
        ...prev,
        projectType: matched || 'Other',
        message: `Hi Hamza, I am interested in discussing your ${contactPreselectService} service.`,
      }));
      setContactPreselectService(null);
    }
  }, [contactPreselectService, setContactPreselectService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Please fill in both your name and email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending with high-end feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#06b6d4', '#10b981'],
      });
      showToast('Message sent! Hamza will reply within 24 hours.');
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'WordPress Website',
      budgetRange: '$500 – $1,000',
      message: '',
    });
  };

  return (
    <div className="relative z-10 py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Direct Collaboration
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 tracking-tight">
          Let&apos;s Work Together
        </h1>
        <p className="text-gray-400 text-base sm:text-lg mt-3 leading-relaxed">
          &quot;Have a project in mind? Whether it&apos;s a new website, an online store, or growing your search traffic — let&apos;s talk.&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        {/* Left Column: Direct Contact Details & Guarantees */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#111827] border border-[#1f293d] shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Contact Information
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Reach out directly by email, phone, or LinkedIn. I partner with businesses in the UK, Australia, Pakistan, and worldwide.
            </p>

            <div className="space-y-4 pt-2">
              {/* Email */}
              <a
                href={`mailto:${siteData.personal.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#151e2e] border border-[#1f293d] hover:border-cyan-500/50 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Direct Email</div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {siteData.personal.email}
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${siteData.personal.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#151e2e] border border-[#1f293d] hover:border-cyan-500/50 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Phone / WhatsApp</div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {siteData.personal.phone}
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={siteData.personal.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#151e2e] border border-[#1f293d] hover:border-cyan-500/50 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">LinkedIn Network</div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    linkedin.com/in/hamza-arif067
                  </div>
                </div>
              </a>
            </div>

            {/* Response time guarantee */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold block">Rapid 24-Hour Response</span>
                <span className="text-emerald-400/80">I typically reply within 24 hours with an initial scope overview.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form with Glowing Animated Focus States */}
        <div className="lg:col-span-7">
          <div
            className="p-8 sm:p-10 rounded-3xl bg-[#111827] border border-[#1f293d] shadow-2xl relative overflow-hidden"
            style={{
              boxShadow: '0 0 40px rgba(0, 0, 0, 0.6), 0 0 20px var(--glow-1)',
            }}
          >
            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-white">Message Received!</h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="text-cyan-400 font-semibold">{formData.name}</span>! I have received your message regarding your {formData.projectType} and will be in touch within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-xs font-semibold text-gray-200 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. marcus@company.co.uk"
                      className="w-full px-4 py-3 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    >
                      <option value="WordPress Website">WordPress Website</option>
                      <option value="Shopify Store">Shopify Store</option>
                      <option value="WooCommerce Store">WooCommerce Store</option>
                      <option value="Custom Development">Custom Development</option>
                      <option value="SEO and Digital Marketing">SEO and Digital Marketing</option>
                      <option value="Landing Page and CRO">Landing Page and CRO</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      Budget Range (USD)
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    >
                      <option value="$350 – $500">$350 – $500</option>
                      <option value="$500 – $1,000">$500 – $1,000</option>
                      <option value="$1,000 – $2,500">$1,000 – $2,500</option>
                      <option value="$2,500 – $5,000+">$2,500 – $5,000+</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Project Goals & Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your target audience, timeline, current website URL, or desired outcomes..."
                    className="w-full px-4 py-3 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                    boxShadow: '0 4px 20px var(--glow-1)',
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
