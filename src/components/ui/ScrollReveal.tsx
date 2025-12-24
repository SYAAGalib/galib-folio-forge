import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'fade' 
  | 'zoom-in' 
  | 'zoom-out'
  | 'flip-up'
  | 'flip-left'
  | 'slide-up'
  | 'slide-left'
  | 'slide-right'
  | 'rotate-in'
  | 'blur-in';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
  duration?: number;
  once?: boolean;
  distance?: number;
  easing?: string;
}

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  animation = 'fade-up',
  duration = 700,
  once = true,
  distance = 60,
  easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [once]);

  const getInitialStyles = (): React.CSSProperties => {
    const baseHidden: React.CSSProperties = { opacity: 0 };
    
    switch (animation) {
      case 'fade-up':
        return { ...baseHidden, transform: `translateY(${distance}px)` };
      case 'fade-down':
        return { ...baseHidden, transform: `translateY(-${distance}px)` };
      case 'fade-left':
        return { ...baseHidden, transform: `translateX(${distance}px)` };
      case 'fade-right':
        return { ...baseHidden, transform: `translateX(-${distance}px)` };
      case 'fade':
        return baseHidden;
      case 'zoom-in':
        return { ...baseHidden, transform: 'scale(0.85)' };
      case 'zoom-out':
        return { ...baseHidden, transform: 'scale(1.15)' };
      case 'flip-up':
        return { ...baseHidden, transform: 'perspective(1000px) rotateX(20deg)', transformOrigin: 'bottom' };
      case 'flip-left':
        return { ...baseHidden, transform: 'perspective(1000px) rotateY(-15deg)', transformOrigin: 'right' };
      case 'slide-up':
        return { ...baseHidden, transform: `translateY(${distance * 1.5}px)`, clipPath: 'inset(100% 0 0 0)' };
      case 'slide-left':
        return { ...baseHidden, transform: `translateX(${distance}px)`, clipPath: 'inset(0 0 0 100%)' };
      case 'slide-right':
        return { ...baseHidden, transform: `translateX(-${distance}px)`, clipPath: 'inset(0 100% 0 0)' };
      case 'rotate-in':
        return { ...baseHidden, transform: 'rotate(-5deg) scale(0.95)' };
      case 'blur-in':
        return { ...baseHidden, filter: 'blur(10px)', transform: `translateY(${distance / 2}px)` };
      default:
        return baseHidden;
    }
  };

  const getVisibleStyles = (): React.CSSProperties => {
    const baseVisible: React.CSSProperties = { opacity: 1, transform: 'none' };
    
    switch (animation) {
      case 'slide-up':
      case 'slide-left':
      case 'slide-right':
        return { ...baseVisible, clipPath: 'inset(0 0 0 0)' };
      case 'blur-in':
        return { ...baseVisible, filter: 'blur(0)' };
      case 'flip-up':
      case 'flip-left':
        return { ...baseVisible, transform: 'perspective(1000px) rotateX(0) rotateY(0)' };
      default:
        return baseVisible;
    }
  };

  const transitionProps = animation === 'blur-in' 
    ? `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms, filter ${duration}ms ${easing} ${delay}ms`
    : animation.startsWith('slide')
    ? `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms, clip-path ${duration}ms ${easing} ${delay}ms`
    : `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;

  return (
    <div
      ref={ref}
      className={cn('scroll-reveal', className)}
      style={{
        ...(isVisible ? getVisibleStyles() : getInitialStyles()),
        transition: transitionProps,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
