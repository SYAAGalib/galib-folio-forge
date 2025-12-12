import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Mail, Linkedin, Github, Send, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FloatingMessageButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const [morphDirection, setMorphDirection] = useState<'in' | 'out'>('in');
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const wasVisibleRef = useRef(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > window.innerHeight * 0.8;
      
      if (shouldBeVisible !== wasVisibleRef.current) {
        setIsMorphing(true);
        setMorphDirection(shouldBeVisible ? 'in' : 'out');
        
        // Create sparkle effects
        if (shouldBeVisible) {
          const newSparkles = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 80 - 40,
            y: Math.random() * 80 - 40,
          }));
          setSparkles(newSparkles);
          setTimeout(() => setSparkles([]), 800);
        }

        setTimeout(() => {
          setIsVisible(shouldBeVisible);
          setIsMorphing(false);
        }, shouldBeVisible ? 100 : 700);

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

  // Don't render if not visible and not morphing
  if (!isVisible && !isMorphing) return null;

  return (
    <div 
      ref={buttonRef}
      className={cn(
        'fixed bottom-6 left-6 z-50',
        isMorphing && morphDirection === 'in' && 'animate-social-morph-in',
        isMorphing && morphDirection === 'out' && 'animate-social-morph-out'
      )}
    >
      {/* Sparkle effects */}
      {sparkles.map((sparkle) => (
        <Sparkles
          key={sparkle.id}
          className="absolute w-4 h-4 text-primary animate-magic-sparkle pointer-events-none"
          style={{
            left: `calc(50% + ${sparkle.x}px)`,
            top: `calc(50% + ${sparkle.y}px)`,
          }}
        />
      ))}

      {/* Trail effect during morph */}
      {isMorphing && morphDirection === 'in' && (
        <>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 pointer-events-none"
              style={{
                animation: `trail-fade 0.6s ease-out ${i * 0.1}s forwards`,
              }}
            />
          ))}
        </>
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
          'w-14 h-14 rounded-full shadow-strong transition-all duration-300 hover:scale-110',
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