import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only show on desktop devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={cn(
          'fixed pointer-events-none z-[9999] rounded-full',
          'bg-gradient-to-r from-primary to-secondary',
          'transition-transform duration-75 ease-out',
          isClicking ? 'scale-75' : 'scale-100'
        )}
        style={{
          left: position.x - 6,
          top: position.y - 6,
          width: 12,
          height: 12,
        }}
      />
      
      {/* Trailing ring */}
      <div
        className={cn(
          'fixed pointer-events-none z-[9998] rounded-full',
          'border-2 border-primary/50',
          'transition-all duration-300 ease-out',
          isPointer ? 'scale-150 border-secondary/70 bg-secondary/10' : 'scale-100',
          isClicking ? 'scale-75' : ''
        )}
        style={{
          left: position.x - 20,
          top: position.y - 20,
          width: 40,
          height: 40,
        }}
      />

      {/* Glow effect */}
      <div
        className={cn(
          'fixed pointer-events-none z-[9997] rounded-full',
          'bg-gradient-to-r from-primary/20 to-secondary/20',
          'blur-xl transition-all duration-500 ease-out',
          isPointer ? 'opacity-100 scale-125' : 'opacity-50 scale-100'
        )}
        style={{
          left: position.x - 30,
          top: position.y - 30,
          width: 60,
          height: 60,
        }}
      />
    </>
  );
};

export default CursorFollower;
