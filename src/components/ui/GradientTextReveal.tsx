import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  delay?: number;
  duration?: number;
  once?: boolean;
}

const GradientTextReveal = ({
  children,
  className,
  as: Component = 'span',
  delay = 0,
  duration = 800,
  once = true,
}: GradientTextRevealProps) => {
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
      { threshold: 0.3, rootMargin: '0px 0px -30px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [once]);

  const words = children.split(' ');

  return (
    <Component
      ref={ref as any}
      className={cn('hero-text-gradient inline', className)}
      aria-label={children}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
        >
          <span
            className="inline-block"
            style={{
              transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(100%) rotateX(-80deg)',
              opacity: isVisible ? 1 : 0,
              transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + index * 80}ms, opacity ${duration * 0.6}ms ease-out ${delay + index * 80}ms`,
              transformOrigin: 'bottom',
            }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Component>
  );
};

export default GradientTextReveal;
