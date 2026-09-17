import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageId, ProjectItem, ServiceItem, CredentialItem, SiteData, ThemeId } from '../types';
import { INITIAL_SITE_DATA } from '../data/defaultData';
import { generateAndDownloadZip } from '../utils/zipExport';

interface SiteContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  siteData: SiteData;
  setSiteData: React.Dispatch<React.SetStateAction<SiteData>>;
  currentTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  selectedProject: ProjectItem | null;
  setSelectedProject: (project: ProjectItem | null) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  adminPassword: string;
  updateAdminPassword: (newPass: string) => void;
  updateSiteData: (updater: (prev: SiteData) => SiteData) => void;
  resetSiteData: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  contactPreselectService: string | null;
  setContactPreselectService: (serviceTitle: string | null) => void;
  downloadProjectZip: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | null>(null);

const STORAGE_KEY_DATA = 'ha_portfolio_data_v1';
const STORAGE_KEY_THEME = 'ha_portfolio_theme_v1';
const STORAGE_KEY_AUTH = 'ha_portfolio_admin_auth_v1';
const STORAGE_KEY_PASS = 'ha_portfolio_admin_pass_v1';

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Navigation State
  const [currentPage, setCurrentPageRaw] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '') as PageId;
    if (['home', 'portfolio', 'about', 'services', 'credentials', 'contact', 'admin'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const setCurrentPage = (page: PageId) => {
    setCurrentPageRaw(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'portfolio', 'about', 'services', 'credentials', 'contact', 'admin'].includes(hash)) {
        setCurrentPageRaw(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 2. Data State
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_SITE_DATA;
  });

  const updateSiteData = (updater: (prev: SiteData) => SiteData) => {
    setSiteData((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetSiteData = () => {
    localStorage.removeItem(STORAGE_KEY_DATA);
    setSiteData(INITIAL_SITE_DATA);
    showToast('Reset all content to original defaults.');
  };

  // 3. Theme State
  const [currentTheme, setCurrentThemeState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME) as ThemeId;
      if (['electric-blue', 'midnight-navy', 'emerald-teal', 'slate-orange'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'electric-blue';
  });

  const setTheme = (theme: ThemeId) => {
    setCurrentThemeState(theme);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute('data-theme', theme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // 4. Admin Auth
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_PASS) || 'Admin@123';
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
  });

  const loginAdmin = (user: string, pass: string): boolean => {
    if (user.trim().toLowerCase() === 'admin' && pass === adminPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
      showToast('Welcome back, Hamza! Admin mode active.');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE_KEY_AUTH);
    showToast('Logged out of Admin Panel.');
  };

  const updateAdminPassword = (newPass: string) => {
    setAdminPassword(newPass);
    localStorage.setItem(STORAGE_KEY_PASS, newPass);
    showToast('Admin password successfully updated!');
  };

  // 5. Project Lightbox Modal
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // 6. Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // 7. Contact preselection
  const [contactPreselectService, setContactPreselectService] = useState<string | null>(null);

  // 8. ZIP Download
  const downloadProjectZip = async () => {
    showToast('Packaging project files and hosting guide...');
    try {
      await generateAndDownloadZip(siteData, currentTheme);
      showToast('Download started! Archive contains all pages & deployment guide.');
    } catch (e) {
      showToast('Failed to package zip: ' + String(e));
    }
  };

  return (
    <SiteContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        siteData,
        setSiteData,
        currentTheme,
        setTheme,
        selectedProject,
        setSelectedProject,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        adminPassword,
        updateAdminPassword,
        updateSiteData,
        resetSiteData,
        toastMessage,
        showToast,
        contactPreselectService,
        setContactPreselectService,
        downloadProjectZip,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
