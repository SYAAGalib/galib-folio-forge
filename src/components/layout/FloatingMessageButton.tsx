import { useState, useEffect } from 'react';
import { MessageCircle, X, Mail, Linkedin, Github, Send, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FloatingMessageButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approximately 100vh)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactOptions = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:syaagalib@gmail.com',
      color: 'hover:bg-blue-500',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/SYAAGalib',
      color: 'hover:bg-blue-600',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/syaagalib',
      color: 'hover:bg-gray-700',
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      href: 'https://wa.me/8801946303020',
      color: 'hover:bg-green-500',
    },
    {
      icon: Send,
      label: 'Telegram',
      href: 'https://t.me/SYAAGalib',
      color: 'hover:bg-blue-500',
    },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="mb-4 space-y-2 animate-fade-in-up">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={option.label}
                className="flex items-center space-x-3"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-sm font-medium text-foreground bg-background px-3 py-1 rounded-full shadow-medium border border-border">
                  {option.label}
                </span>
                <a
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-foreground transition-all duration-300 hover:text-white shadow-medium hover:shadow-glow hover:scale-110',
                    option.color
                  )}
                >
                  <Icon className="w-5 h-5" />
                </a>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-14 h-14 rounded-full shadow-strong hover:shadow-glow transition-all duration-300 hover:scale-110 animate-pulse-glow',
          isExpanded ? 'bg-destructive hover:bg-destructive' : 'btn-hero'
        )}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};

export default FloatingMessageButton;