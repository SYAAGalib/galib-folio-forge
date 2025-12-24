import { useEffect, useRef, useState, ReactNode, Children } from 'react';
import { cn } from '@/lib/utils';

interface StaggeredRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  duration?: number;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in' | 'scale-up';
  threshold?: number;
}

const StaggeredReveal = ({
  children,
  className,
  staggerDelay = 100,
  initialDelay = 0,
  duration = 500,
  animation = 'fade-up',
  threshold = 0.1,
}: StaggeredRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getAnimationStyles = (index: number): React.CSSProperties => {
    const delay = initialDelay + index * staggerDelay;
    const easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    const baseTransition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return { opacity: 0, transform: 'translateY(30px)', transition: baseTransition };
        case 'fade-left':
          return { opacity: 0, transform: 'translateX(30px)', transition: baseTransition };
        case 'fade-right':
          return { opacity: 0, transform: 'translateX(-30px)', transition: baseTransition };
        case 'zoom-in':
          return { opacity: 0, transform: 'scale(0.9)', transition: baseTransition };
        case 'scale-up':
          return { opacity: 0, transform: 'scale(0.85) translateY(20px)', transition: baseTransition };
        default:
          return { opacity: 0, transform: 'translateY(30px)', transition: baseTransition };
      }
    }

    return {
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1)',
      transition: baseTransition,
    };
  };

  const childArray = Children.toArray(children);

  return (
    <div ref={ref} className={cn('staggered-reveal', className)}>
      {childArray.map((child, index) => (
        <div
          key={index}
          style={getAnimationStyles(index)}
          className="staggered-item"
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggeredReveal;
