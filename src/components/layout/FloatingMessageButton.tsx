import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Mail, Linkedin, Github, Send, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FloatingMessageButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'flying-in' | 'flying-out'>('idle');
  const [magicTrails, setMagicTrails] = useState<{ id: number; delay: number }[]>([]);
  const wasVisibleRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > window.innerHeight * 0.8;
      
      if (shouldBeVisible !== wasVisibleRef.current) {
        if (shouldBeVisible) {
          // Flying in from top
          setAnimationState('flying-in');
          setMagicTrails(Array.from({ length: 6 }, (_, i) => ({ id: Date.now() + i, delay: i * 0.08 })));
          setIsVisible(true);
          setTimeout(() => {
            setAnimationState('idle');
            setMagicTrails([]);
          }, 1200);
        } else {
          // Flying out to bottom
          setAnimationState('flying-out');
          setMagicTrails(Array.from({ length: 6 }, (_, i) => ({ id: Date.now() + i, delay: i * 0.08 })));
          setTimeout(() => {
            setIsVisible(false);
            setAnimationState('idle');
            setMagicTrails([]);
          }, 1200);
        }
        wasVisibleRef.current = shouldBeVisible;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactOptions = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:syaagalib@gmail.com',
      color: 'hover:bg-blue-500 hover:border-blue-400',
      glowColor: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/SYAAGalib',
      color: 'hover:bg-blue-600 hover:border-blue-500',
      glowColor: 'hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/syaagalib',
      color: 'hover:bg-gray-700 hover:border-gray-600',
      glowColor: 'hover:shadow-[0_0_20px_rgba(75,85,99,0.5)]',
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      href: 'https://wa.me/8801946303020',
      color: 'hover:bg-green-500 hover:border-green-400',
      glowColor: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]',
    },
    {
      icon: Send,
      label: 'Telegram',
      href: 'https://t.me/SYAAGalib',
      color: 'hover:bg-sky-500 hover:border-sky-400',
      glowColor: 'hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]',
    },
  ];

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        'fixed bottom-6 left-6 z-50',
        animationState === 'flying-in' && 'animate-fly-from-top',
        animationState === 'flying-out' && 'animate-fly-to-bottom'
      )}
    >
      {/* Magic trail effects */}
      {magicTrails.map((trail) => (
        <div
          key={trail.id}
          className="absolute inset-0 pointer-events-none"
          style={{ animationDelay: `${trail.delay}s` }}
        >
          {/* Sparkle star */}
          <svg
            className={cn(
              'absolute w-6 h-6',
              animationState === 'flying-in' ? 'animate-trail-sparkle-down' : 'animate-trail-sparkle-up'
            )}
            style={{ 
              left: `${Math.random() * 40 - 20}px`,
              animationDelay: `${trail.delay}s`
            }}
            viewBox="0 0 24 24"
            fill="hsl(var(--primary))"
          >
            <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
          </svg>
          
          {/* Glowing orb */}
          <div
            className={cn(
              'absolute w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary blur-sm',
              animationState === 'flying-in' ? 'animate-trail-orb-down' : 'animate-trail-orb-up'
            )}
            style={{ 
              left: `${Math.random() * 30 - 15}px`,
              animationDelay: `${trail.delay + 0.05}s`
            }}
          />
        </div>
      ))}

      {/* Magic glow aura */}
      {animationState !== 'idle' && (
        <div className="absolute inset-0 -m-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40 blur-xl animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-secondary/30 to-primary/30 blur-lg animate-ping" />
        </div>
      )}

      {/* Expanded Menu */}
      {isExpanded && (
        <div className="mb-4 space-y-2">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={option.label}
                className="flex items-center space-x-3 animate-fade-in"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both'
                }}
              >
                <span className="text-sm font-medium text-foreground bg-card px-3 py-1.5 rounded-full shadow-medium border border-border backdrop-blur-sm">
                  {option.label}
                </span>
                <a
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground transition-all duration-300 hover:text-white shadow-medium hover:scale-110',
                    option.color,
                    option.glowColor
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
          'w-14 h-14 rounded-full shadow-strong transition-all duration-300 hover:scale-110 relative',
          isExpanded 
            ? 'bg-destructive hover:bg-destructive/90 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
            : 'btn-hero animate-pulse-glow'
        )}
      >
        <span className={cn(
          'transition-transform duration-300',
          isExpanded ? 'rotate-0' : 'rotate-0'
        )}>
          {isExpanded ? (
            <X className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <MessageCircle className="w-6 h-6 transition-transform duration-300" />
          )}
        </span>
      </Button>
    </div>
  );
};

export default FloatingMessageButton;
