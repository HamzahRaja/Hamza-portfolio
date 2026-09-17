/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import { BackgroundGlow } from './components/BackgroundGlow';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { PortfolioPage } from './components/PortfolioPage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { CredentialsPage } from './components/CredentialsPage';
import { ContactPage } from './components/ContactPage';
import { AdminPanel } from './components/AdminPanel';
import { ProjectModal } from './components/ProjectModal';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentPage, toastMessage } = useSite();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'credentials':
        return <CredentialsPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative text-gray-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Ambient background glowing orbs */}
      <BackgroundGlow />

      {/* Global Navigation Menu */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 w-full relative z-10 animate-fadeIn">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Lightbox Modal for Project Details */}
      <ProjectModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#111827]/95 border border-cyan-500/50 text-white text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <MainLayout />
    </SiteProvider>
  );
}
