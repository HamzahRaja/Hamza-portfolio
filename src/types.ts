export type ThemeId = 'electric-blue' | 'midnight-navy' | 'emerald-teal' | 'slate-orange';

export type PageId = 'home' | 'portfolio' | 'about' | 'services' | 'credentials' | 'contact' | 'admin';

export type ProjectCategory = 'WordPress' | 'Shopify' | 'WooCommerce' | 'Custom';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  clientCountry?: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  featured?: boolean;
  servicesDelivered?: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  outcome: string;
  startingPrice: string;
  iconName: string;
  highlights: string[];
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  category: 'Security' | 'Full-Stack' | 'CMS & Freelancing' | 'Frontend' | 'Marketing' | 'Degree';
  badgeColor?: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  location?: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
  category: 'CMS & E-Commerce' | 'Frontend' | 'Marketing & Performance';
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
}

export interface SiteData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    bioShort: string;
    email: string;
    phone: string;
    whatsapp: string;
    linkedIn: string;
    github: string;
    location: string;
    profileImage: string;
    availability: string;
    experienceYears: number;
    completedWebsites: number;
    happyClients: number;
    avgTrafficGrowth: number;
  };
  about: {
    storyParagraphs: string[];
    mindsetHighlight: string;
  };
  services: ServiceItem[];
  projects: ProjectItem[];
  credentials: CredentialItem[];
  milestones: MilestoneItem[];
  skills: SkillItem[];
  testimonials: TestimonialItem[];
  platformsMarquee: { name: string; type: string }[];
}
