import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealMode = 'words' | 'letters' | 'lines';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  mode?: RevealMode;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const TextReveal = ({
  children,
  className,
  as: Component = 'p',
  mode = 'words',
  delay = 0,
  staggerDelay = 50,
  duration = 500,
  once = true,
  threshold = 0.2,
}: TextRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [once, threshold]);

  const getElements = (): string[] => {
    switch (mode) {
      case 'letters':
        return children.split('');
      case 'lines':
        return children.split('\n');
      case 'words':
      default:
        return children.split(' ');
    }
  };

  const elements = getElements();

  return (
    <Component
      ref={ref as any}
      className={cn('text-reveal-container', className)}
      aria-label={children}
    >
      {elements.map((element, index) => {
        const itemDelay = delay + index * staggerDelay;
        const isSpace = mode === 'letters' && element === ' ';
        
        return (
          <span
            key={index}
            className="text-reveal-item inline-block overflow-hidden"
            style={{ display: isSpace ? 'inline' : 'inline-block' }}
          >
            <span
              className="text-reveal-inner inline-block"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                opacity: isVisible ? 1 : 0,
                transition: `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${itemDelay}ms, opacity ${duration}ms ease-out ${itemDelay}ms`,
              }}
            >
              {isSpace ? '\u00A0' : element}
              {mode === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        );
      })}
    </Component>
  );
};

export default TextReveal;
