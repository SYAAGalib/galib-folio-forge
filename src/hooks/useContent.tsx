import { useState, useEffect, useCallback } from 'react';

// Type definitions for all content sections
export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface HeroContent {
  firstName: string;
  lastName: string;
  typingName: string;
  roles: string[];
  portrait: string;
  ctaButtons: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
  socialLinks: SocialLink[];
}

export interface Skill {
  icon: string;
  label: string;
  description: string;
}

export interface AboutContent {
  title: string;
  titleHighlight: string;
  paragraphs: string[];
  ctaButton: { text: string; link: string };
  skills: Skill[];
}

export interface StatItem {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  metrics?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface FeaturedProjectsContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  heroProject: Project & { image: string; metrics: string[]; liveUrl: string; githubUrl: string };
  secondaryProjects: Project[];
}

export interface Research {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  publication?: string;
  paperUrl?: string;
  codeUrl?: string;
}

export interface FeaturedResearchContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  heroResearch: Research & { image: string; publication: string; paperUrl: string; codeUrl: string };
  secondaryResearch: Research[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  content: string;
}

export interface TestimonialsContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  items: Testimonial[];
}

export interface CTAStat {
  value: string;
  label: string;
}

export interface CallToActionContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaButtons: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
  stats: CTAStat[];
}

export interface FooterContent {
  brand: {
    logo: string;
    tagline: string;
    description: string;
  };
  quickLinks: { label: string; href: string }[];
  socialLinks: SocialLink[];
  copyright: string;
  madeIn: string;
}

export interface BusinessCardSocialLink {
  icon: string;
  href: string;
  label: string;
  color: string;
}

export interface BusinessCardContent {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  expertise: string[];
  highlights: { icon: string; label: string; desc: string }[];
  socialLinks: BusinessCardSocialLink[];
}

export interface SEOContent {
  title: string;
  description: string;
  keywords: string[];
}

// Extended content types for full pages
export interface AboutPageContent {
  name: string;
  fullName: string;
  title: string;
  paragraphs: string[];
  skills: { icon: string; label: string; description: string }[];
  workflowPhases: string[];
}

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  type: string;
  category: string;
  techStack: string[];
  metrics: string[];
  links: { live: string; github: string };
  featured: boolean;
}

export interface ProjectsPageContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  filters: string[];
  projects: ProjectItem[];
}

export interface ResearchItem {
  id: number;
  title: string;
  abstract: string;
  image: string;
  category: string;
  tags: string[];
  publication: string;
  year: string;
  authors: string[];
  links: { paper: string; code: string; dataset?: string };
  featured: boolean;
}

export interface ResearchPageContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  filters: string[];
  research: ResearchItem[];
}

export interface BlogItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export interface BlogPageContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  posts: BlogItem[];
}

export interface ContactPageContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  formLabels: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
  };
}

export interface AchievementItem {
  id: number;
  year: string;
  date: string;
  title: string;
  subtitle: string;
  type: string;
  icon: string;
  description: string;
  organization: string;
  location: string;
  image: string;
  links: Record<string, string>;
}

export interface AchievementsPageContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  filters: string[];
  milestones: AchievementItem[];
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  type: string;
  thumbnail: string;
  fullImage?: string;
  videoUrl?: string;
  articleUrl?: string;
  date: string;
  location: string;
  description: string;
  featured: boolean;
}

export interface GalleryPageContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  filters: string[];
  items: GalleryItem[];
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  stats: StatItem[];
  featuredProjects: FeaturedProjectsContent;
  featuredResearch: FeaturedResearchContent;
  testimonials: TestimonialsContent;
  callToAction: CallToActionContent;
  footer: FooterContent;
  businessCard: BusinessCardContent;
  seo: SEOContent;
  // Extended page content
  aboutPage?: AboutPageContent;
  projectsPage?: ProjectsPageContent;
  researchPage?: ResearchPageContent;
  blogPage?: BlogPageContent;
  contactPage?: ContactPageContent;
  achievementsPage?: AchievementsPageContent;
  galleryPage?: GalleryPageContent;
}

// Legacy content types for backward compatibility
export interface LegacyProject {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  technologies: string[];
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LegacyResearch {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LegacyBlog {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LegacyTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  category: string;
  featured: boolean;
  createdAt: string;
}

export interface LegacyContent {
  projects: LegacyProject[];
  research: LegacyResearch[];
  blog: LegacyBlog[];
  testimonials: LegacyTestimonial[];
}

const SITE_CONTENT_PATH = '/data/site-content.json';
const LEGACY_CONTENT_PATH = '/data/content.json';

// Hook for site-wide content
export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(SITE_CONTENT_PATH);
      if (!response.ok) throw new Error('Failed to fetch site content');
      const data = await response.json();
      setContent(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const updateContent = useCallback(async (newContent: SiteContent) => {
    // In a real app, this would POST to an API
    // For now, we'll store in localStorage as a mock
    localStorage.setItem('site-content', JSON.stringify(newContent));
    setContent(newContent);
    return true;
  }, []);

  const updateSection = useCallback(async <K extends keyof SiteContent>(
    section: K,
    data: SiteContent[K]
  ) => {
    if (!content) return false;
    const newContent = { ...content, [section]: data };
    return updateContent(newContent);
  }, [content, updateContent]);

  return { content, loading, error, refetch: fetchContent, updateContent, updateSection };
}

// Hook for legacy content (projects, research, blog, testimonials lists)
export function useLegacyContent() {
  const [content, setContent] = useState<LegacyContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(LEGACY_CONTENT_PATH);
      if (!response.ok) throw new Error('Failed to fetch content');
      const data = await response.json();
      setContent(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const updateContent = useCallback(async (newContent: LegacyContent) => {
    localStorage.setItem('legacy-content', JSON.stringify(newContent));
    setContent(newContent);
    return true;
  }, []);

  return { content, loading, error, refetch: fetchContent, updateContent };
}

// Individual section hooks for convenience
export function useHeroContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    hero: content?.hero ?? null,
    loading,
    error,
    updateHero: (data: HeroContent) => updateSection('hero', data)
  };
}

export function useAboutContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    about: content?.about ?? null,
    loading,
    error,
    updateAbout: (data: AboutContent) => updateSection('about', data)
  };
}

export function useStatsContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    stats: content?.stats ?? [],
    loading,
    error,
    updateStats: (data: StatItem[]) => updateSection('stats', data)
  };
}

export function useFeaturedProjectsContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    featuredProjects: content?.featuredProjects ?? null,
    loading,
    error,
    updateFeaturedProjects: (data: FeaturedProjectsContent) => updateSection('featuredProjects', data)
  };
}

export function useFeaturedResearchContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    featuredResearch: content?.featuredResearch ?? null,
    loading,
    error,
    updateFeaturedResearch: (data: FeaturedResearchContent) => updateSection('featuredResearch', data)
  };
}

export function useTestimonialsContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    testimonials: content?.testimonials ?? null,
    loading,
    error,
    updateTestimonials: (data: TestimonialsContent) => updateSection('testimonials', data)
  };
}

export function useCallToActionContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    callToAction: content?.callToAction ?? null,
    loading,
    error,
    updateCallToAction: (data: CallToActionContent) => updateSection('callToAction', data)
  };
}

export function useFooterContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    footer: content?.footer ?? null,
    loading,
    error,
    updateFooter: (data: FooterContent) => updateSection('footer', data)
  };
}

export function useBusinessCardContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    businessCard: content?.businessCard ?? null,
    loading,
    error,
    updateBusinessCard: (data: BusinessCardContent) => updateSection('businessCard', data)
  };
}

export function useSEOContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    seo: content?.seo ?? null,
    loading,
    error,
    updateSEO: (data: SEOContent) => updateSection('seo', data)
  };
}

// Page-specific content hooks
export function useAboutPageContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    aboutPage: content?.aboutPage ?? null,
    loading,
    error,
    updateAboutPage: (data: AboutPageContent) => updateSection('aboutPage', data)
  };
}

export function useProjectsPageContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    projectsPage: content?.projectsPage ?? null,
    loading,
    error,
    updateProjectsPage: (data: ProjectsPageContent) => updateSection('projectsPage', data)
  };
}

export function useResearchPageContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    researchPage: content?.researchPage ?? null,
    loading,
    error,
    updateResearchPage: (data: ResearchPageContent) => updateSection('researchPage', data)
  };
}

export function useBlogPageContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    blogPage: content?.blogPage ?? null,
    loading,
    error,
    updateBlogPage: (data: BlogPageContent) => updateSection('blogPage', data)
  };
}

export function useContactPageContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    contactPage: content?.contactPage ?? null,
    loading,
    error,
    updateContactPage: (data: ContactPageContent) => updateSection('contactPage', data)
  };
}

export function useAchievementsPageContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    achievementsPage: content?.achievementsPage ?? null,
    loading,
    error,
    updateAchievementsPage: (data: AchievementsPageContent) => updateSection('achievementsPage', data)
  };
}

export function useGalleryPageContent() {
  const { content, loading, error, updateSection } = useSiteContent();
  return {
    galleryPage: content?.galleryPage ?? null,
    loading,
    error,
    updateGalleryPage: (data: GalleryPageContent) => updateSection('galleryPage', data)
  };
}

export default useSiteContent;
