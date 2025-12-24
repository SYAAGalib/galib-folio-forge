import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Home, Briefcase, FlaskConical, User, MessageSquare, BookOpen, Mail } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: Section[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'research', label: 'Research', icon: FlaskConical },
  { id: 'about', label: 'About', icon: User },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const StickyNavSidebar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sidebar after scrolling past hero
      setIsVisible(window.scrollY > 300);

      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        'fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2 transition-all duration-500',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      )}
    >
      {/* Connecting line */}
      <div className="absolute left-5 top-6 bottom-6 w-px bg-border" />
      
      {sections.map((section, index) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;
        
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={cn(
              'group relative flex items-center gap-3 p-2 rounded-lg transition-all duration-300',
              isActive 
                ? 'bg-primary text-primary-foreground shadow-glow' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            )}
            aria-label={`Navigate to ${section.label}`}
          >
            {/* Active indicator dot */}
            <div className={cn(
              'absolute left-[18px] w-2 h-2 rounded-full transition-all duration-300 z-10',
              isActive 
                ? 'bg-primary-foreground scale-100' 
                : 'bg-border scale-75 group-hover:scale-100'
            )} />
            
            <Icon className={cn(
              'w-5 h-5 transition-transform duration-300',
              isActive ? 'scale-110' : 'group-hover:scale-110'
            )} />
            
            {/* Label tooltip */}
            <span className={cn(
              'absolute left-12 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-300',
              'bg-popover text-popover-foreground shadow-lg border border-border',
              isActive 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0'
            )}>
              {section.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default StickyNavSidebar;
