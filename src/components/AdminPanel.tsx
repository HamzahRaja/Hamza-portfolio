import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ProjectCategory, ProjectItem, ServiceItem, CredentialItem, ThemeId } from '../types';
import {
  Lock,
  Unlock,
  Palette,
  Edit3,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Image as ImageIcon,
  Key,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  FileText,
  User,
  Phone,
  Mail,
  Linkedin,
  Sparkles
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    siteData,
    updateSiteData,
    resetSiteData,
    currentTheme,
    setTheme,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    adminPassword,
    updateAdminPassword,
    showToast,
    setCurrentPage,
  } = useSite();

  // Login Form State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'theme' | 'personal' | 'projects' | 'services' | 'credentials' | 'security'
  >('theme');

  // New Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Form states for adding items
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    title: '',
    category: 'WordPress',
    categoryLabel: 'WordPress Website',
    description: '',
    clientCountry: 'UK / International',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['WordPress', 'SEO'],
    liveUrl: 'https://',
    featured: true,
  });

  const [newService, setNewService] = useState<Partial<ServiceItem>>({
    title: '',
    category: 'Web Solution',
    description: '',
    outcome: 'High conversion and fast performance.',
    startingPrice: '$350',
    iconName: 'Code2',
    highlights: ['Custom Design', 'Speed Optimization', 'SEO Architecture'],
  });

  const [newCredential, setNewCredential] = useState<Partial<CredentialItem>>({
    title: '',
    issuer: '',
    year: 'Certified Professional',
    description: '',
    category: 'Security',
  });

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(usernameInput, passwordInput);
    if (!success) {
      setLoginError('Incorrect username or password.');
    } else {
      setLoginError('');
    }
  };

  // If not logged in, show Password-Protected Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="relative z-10 py-16 md:py-24 max-w-md mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-3xl bg-[#111827] border border-[#1f293d] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              }}
            >
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Hamza Arif Admin Portal
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              Log in to edit site text, add portfolio projects, modify services, update images, and switch visual themes live.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Username
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white shadow-xl transition hover:opacity-95"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              }}
            >
              Unlock Admin Panel
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xs text-gray-400 hover:text-white transition"
            >
              ← Return to public website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- LOGGED IN DASHBOARD ---

  const handleUpdatePersonalField = (field: keyof typeof siteData.personal, value: any) => {
    updateSiteData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
    showToast(`Updated ${String(field)}.`);
  };

  const handleAddProject = () => {
    if (!newProject.title) {
      showToast('Project title is required.');
      return;
    }
    const cat = (newProject.category || 'WordPress') as ProjectCategory;
    const item: ProjectItem = {
      id: 'proj-' + Date.now(),
      title: newProject.title,
      category: cat,
      categoryLabel: cat + ' Project',
      description: newProject.description || 'Custom web project engineered with high speed and SEO.',
      clientCountry: newProject.clientCountry || 'International',
      image: newProject.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      tags: typeof newProject.tags === 'string' ? (newProject.tags as string).split(',').map((s) => s.trim()) : (newProject.tags || ['Web']),
      liveUrl: newProject.liveUrl || 'https://example.com',
      featured: true,
      servicesDelivered: ['Custom Development', 'Speed Optimization', 'SEO Setup'],
    };

    updateSiteData((prev) => ({
      ...prev,
      projects: [item, ...prev.projects],
    }));
    showToast(`Added project: ${item.title}`);
    setNewProject({
      title: '',
      category: 'WordPress',
      description: '',
      clientCountry: 'UK / International',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://',
    });
  };

  const handleDeleteProject = (id: string) => {
    updateSiteData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    showToast('Project deleted.');
  };

  const handleAddService = () => {
    if (!newService.title) {
      showToast('Service title is required.');
      return;
    }
    const item: ServiceItem = {
      id: 'srv-' + Date.now(),
      title: newService.title,
      category: newService.category || 'Specialized Service',
      description: newService.description || '',
      outcome: newService.outcome || 'High-performance delivery.',
      startingPrice: newService.startingPrice || '$250',
      iconName: 'Code2',
      highlights: ['Custom Architecture', 'Mobile Optimized'],
    };
    updateSiteData((prev) => ({
      ...prev,
      services: [...prev.services, item],
    }));
    showToast(`Added service: ${item.title}`);
    setNewService({
      title: '',
      category: 'Web Solution',
      description: '',
      outcome: '',
      startingPrice: '$350',
    });
  };

  const handleDeleteService = (id: string) => {
    updateSiteData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
    showToast('Service deleted.');
  };

  const handleAddCredential = () => {
    if (!newCredential.title || !newCredential.issuer) {
      showToast('Credential title and issuer are required.');
      return;
    }
    const item: CredentialItem = {
      id: 'cred-' + Date.now(),
      title: newCredential.title,
      issuer: newCredential.issuer,
      year: newCredential.year || 'Certified',
      description: newCredential.description || '',
      category: (newCredential.category as any) || 'Security',
    };
    updateSiteData((prev) => ({
      ...prev,
      credentials: [...prev.credentials, item],
    }));
    showToast(`Added credential: ${item.title}`);
    setNewCredential({
      title: '',
      issuer: '',
      year: 'Certified Professional',
      description: '',
    });
  };

  const handleDeleteCredential = (id: string) => {
    updateSiteData((prev) => ({
      ...prev,
      credentials: prev.credentials.filter((c) => c.id !== id),
    }));
    showToast('Credential deleted.');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.');
      return;
    }
    updateAdminPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
  };

  const themes: { id: ThemeId; name: string; primary: string; secondary: string; bg: string }[] = [
    {
      id: 'electric-blue',
      name: 'Electric Blue & Cyan (Default)',
      primary: '#2563eb',
      secondary: '#06b6d4',
      bg: '#0b0f17',
    },
    {
      id: 'midnight-navy',
      name: 'Midnight Navy & Purple',
      primary: '#7c3aed',
      secondary: '#6366f1',
      bg: '#090d16',
    },
    {
      id: 'emerald-teal',
      name: 'Emerald Green & Teal',
      primary: '#059669',
      secondary: '#0d9488',
      bg: '#061311',
    },
    {
      id: 'slate-orange',
      name: 'Slate Grey & Orange',
      primary: '#ea580c',
      secondary: '#f59e0b',
      bg: '#0d1117',
    },
  ];

  return (
    <div className="relative z-10 py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#1f293d]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admin Mode Active</span>
            </span>
            <span className="text-xs text-gray-400">Instant Live Synchronization</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mt-1">
            Website Control Dashboard
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="px-4 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-xs font-semibold text-gray-300 hover:text-white"
          >
            Preview Live Site
          </button>
          <button
            onClick={logoutAdmin}
            className="px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 hover:text-red-200 text-xs font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl bg-[#111827] border border-[#1f293d]">
        <button
          onClick={() => setActiveTab('theme')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'theme' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Color Themes</span>
        </button>

        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'personal' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>General & Text</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'projects' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Portfolio Projects ({siteData.projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'services' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Services & Rates ({siteData.services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('credentials')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'credentials' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Credentials & Certs ({siteData.credentials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'security' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Security & Password</span>
        </button>
      </div>

      {/* Tab 1: Color Themes */}
      {activeTab === 'theme' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#111827] border border-[#1f293d]">
            <h3 className="text-xl font-bold text-white mb-2">Website Color Theme Switcher</h3>
            <p className="text-xs text-gray-400 mb-6">
              Switching a theme here instantly re-styles every single page on the live website.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {themes.map((th) => {
                const isActive = currentTheme === th.id;
                return (
                  <button
                    key={th.id}
                    onClick={() => {
                      setTheme(th.id);
                      showToast(`Switched theme to ${th.name}`);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      isActive
                        ? 'border-cyan-400 ring-2 ring-cyan-500/30 bg-[#151e2e]'
                        : 'border-[#1f293d] bg-[#0f1522] hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: th.primary }} />
                      <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: th.secondary }} />
                      <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: th.bg }} />
                    </div>
                    <div className="font-bold text-sm text-white">{th.name}</div>
                    <div className="text-[11px] text-gray-400 mt-1">
                      {isActive ? '✓ Currently Active Theme' : 'Click to activate'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: General & Text Content */}
      {activeTab === 'personal' && (
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-[#111827] border border-[#1f293d] space-y-6">
            <h3 className="text-xl font-bold text-white">Hero & Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Full Name</label>
                <input
                  type="text"
                  value={siteData.personal.name}
                  onChange={(e) => handleUpdatePersonalField('name', e.target.value)}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Professional Title</label>
                <input
                  type="text"
                  value={siteData.personal.title}
                  onChange={(e) => handleUpdatePersonalField('title', e.target.value)}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-400">Tagline</label>
              <input
                type="text"
                value={siteData.personal.tagline}
                onChange={(e) => handleUpdatePersonalField('tagline', e.target.value)}
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-400">Short Bio</label>
              <textarea
                rows={3}
                value={siteData.personal.bioShort}
                onChange={(e) => handleUpdatePersonalField('bioShort', e.target.value)}
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Profile Photo URL / Upload */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400">Profile Photo URL</label>
              <div className="flex gap-3 mt-1.5 items-center">
                <input
                  type="text"
                  value={siteData.personal.profileImage}
                  onChange={(e) => handleUpdatePersonalField('profileImage', e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
                />
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/50 shrink-0">
                  <img
                    src={siteData.personal.profileImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Direct Contact Details */}
            <h4 className="text-base font-bold text-white pt-4 border-t border-[#1f293d]">
              Contact Coordinates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Email Address</label>
                <input
                  type="email"
                  value={siteData.personal.email}
                  onChange={(e) => handleUpdatePersonalField('email', e.target.value)}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Phone Number</label>
                <input
                  type="text"
                  value={siteData.personal.phone}
                  onChange={(e) => handleUpdatePersonalField('phone', e.target.value)}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400">LinkedIn URL</label>
                <input
                  type="text"
                  value={siteData.personal.linkedIn}
                  onChange={(e) => handleUpdatePersonalField('linkedIn', e.target.value)}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Stats Key Numbers */}
            <h4 className="text-base font-bold text-white pt-4 border-t border-[#1f293d]">
              Key Metrics & Numbers
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Websites Built</label>
                <input
                  type="number"
                  value={siteData.personal.completedWebsites}
                  onChange={(e) => handleUpdatePersonalField('completedWebsites', parseInt(e.target.value) || 0)}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Clients Served</label>
                <input
                  type="number"
                  value={siteData.personal.happyClients}
                  onChange={(e) => handleUpdatePersonalField('happyClients', parseInt(e.target.value) || 0)}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Years Exp</label>
                <input
                  type="number"
                  value={siteData.personal.experienceYears}
                  onChange={(e) => handleUpdatePersonalField('experienceYears', parseInt(e.target.value) || 0)}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Avg Growth (%)</label>
                <input
                  type="number"
                  value={siteData.personal.avgTrafficGrowth}
                  onChange={(e) => handleUpdatePersonalField('avgTrafficGrowth', parseInt(e.target.value) || 0)}
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#1f293d] flex justify-between items-center">
              <button
                onClick={resetSiteData}
                className="flex items-center gap-2 text-xs text-red-400 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all content to original defaults</span>
              </button>
              <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Changes saved to localStorage automatically</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Projects Manager */}
      {activeTab === 'projects' && (
        <div className="space-y-8">
          {/* Add Project Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#1f293d] space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-400" />
              <span>Add New Portfolio Project</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-400">Project Domain / Title *</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. clientstore.co.uk"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Platform Category</label>
                <select
                  value={newProject.category}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      category: e.target.value as ProjectCategory,
                      categoryLabel: e.target.value + ' Store',
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
                >
                  <option value="WordPress">WordPress Website</option>
                  <option value="Shopify">Shopify Store</option>
                  <option value="WooCommerce">WooCommerce E-Commerce</option>
                  <option value="Custom">Custom Development</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400">Client Country / Market</label>
                <input
                  type="text"
                  value={newProject.clientCountry}
                  onChange={(e) => setNewProject({ ...newProject, clientCountry: e.target.value })}
                  placeholder="e.g. United Kingdom"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400">Thumbnail Image URL</label>
                <input
                  type="text"
                  value={newProject.image}
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Live URL</label>
                <input
                  type="text"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                  placeholder="https://client.com"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400">Short Description</label>
              <textarea
                rows={2}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="What did you build or optimize on this project?"
                className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
              />
            </div>

            <button
              onClick={handleAddProject}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
            >
              Add Project To Portfolio
            </button>
          </div>

          {/* Existing Projects List */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-[#1f293d] space-y-4">
            <h3 className="text-lg font-bold text-white">Existing Projects ({siteData.projects.length})</h3>
            <div className="space-y-3">
              {siteData.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-[#151e2e] border border-[#1f293d] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-12 h-12 rounded-lg object-cover border border-[#1f293d]"
                    />
                    <div>
                      <div className="font-bold text-white text-sm">{proj.title}</div>
                      <div className="text-xs text-cyan-400">
                        {proj.categoryLabel} • {proj.clientCountry || 'Global'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-2 rounded-lg bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900/50"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Services Manager */}
      {activeTab === 'services' && (
        <div className="space-y-8">
          {/* Add Service */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#1f293d] space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-400" />
              <span>Add New Service Offering</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-400">Service Name *</label>
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  placeholder="e.g. Custom Shopify Theme Architecture"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Category Tag</label>
                <input
                  type="text"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  placeholder="e.g. E-Commerce"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Starting Price</label>
                <input
                  type="text"
                  value={newService.startingPrice}
                  onChange={(e) => setNewService({ ...newService, startingPrice: e.target.value })}
                  placeholder="e.g. $450"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400">Description</label>
              <textarea
                rows={2}
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Describe what you deliver..."
                className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
              />
            </div>

            <button
              onClick={handleAddService}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            >
              Add Service
            </button>
          </div>

          {/* Existing Services List */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-[#1f293d] space-y-4">
            <h3 className="text-lg font-bold text-white">Active Services ({siteData.services.length})</h3>
            <div className="space-y-3">
              {siteData.services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-4 rounded-xl bg-[#151e2e] border border-[#1f293d] flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-bold text-white text-sm">{srv.title}</div>
                    <div className="text-xs text-cyan-400">
                      Starting at {srv.startingPrice} • {srv.category}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteService(srv.id)}
                    className="p-2 rounded-lg bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900/50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Credentials Manager */}
      {activeTab === 'credentials' && (
        <div className="space-y-8">
          {/* Add Credential */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#1f293d] space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-400" />
              <span>Add Certification / Achievement</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-400">Certification Name *</label>
                <input
                  type="text"
                  value={newCredential.title}
                  onChange={(e) => setNewCredential({ ...newCredential, title: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Issuing Body *</label>
                <input
                  type="text"
                  value={newCredential.issuer}
                  onChange={(e) => setNewCredential({ ...newCredential, issuer: e.target.value })}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400">Year / Validity</label>
                <input
                  type="text"
                  value={newCredential.year}
                  onChange={(e) => setNewCredential({ ...newCredential, year: e.target.value })}
                  placeholder="e.g. 2024"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400">How It Applies To Client Work</label>
              <textarea
                rows={2}
                value={newCredential.description}
                onChange={(e) => setNewCredential({ ...newCredential, description: e.target.value })}
                placeholder="Explain the tangible client benefit..."
                className="w-full mt-1 px-3 py-2 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white"
              />
            </div>

            <button
              onClick={handleAddCredential}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            >
              Add Credential
            </button>
          </div>

          {/* Existing Credentials List */}
          <div className="p-6 rounded-3xl bg-[#111827] border border-[#1f293d] space-y-4">
            <h3 className="text-lg font-bold text-white">Active Credentials ({siteData.credentials.length})</h3>
            <div className="space-y-3">
              {siteData.credentials.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-[#151e2e] border border-[#1f293d] flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-bold text-white text-sm">{c.title}</div>
                    <div className="text-xs text-cyan-400">{c.issuer} • {c.year}</div>
                  </div>

                  <button
                    onClick={() => handleDeleteCredential(c.id)}
                    className="p-2 rounded-lg bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900/50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Security & Password */}
      {activeTab === 'security' && (
        <div className="max-w-xl space-y-6">
          <div className="p-8 rounded-3xl bg-[#111827] border border-[#1f293d] space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Change Admin Password</h3>
                <p className="text-xs text-gray-400">Update your dashboard access credentials.</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter at least 6 characters"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#151e2e] border border-[#1f293d] text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
              >
                Update Admin Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
