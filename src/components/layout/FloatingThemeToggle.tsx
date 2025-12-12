import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const FloatingThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTheme(isDark ? 'light' : 'dark');
    }, 150);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-12 h-12 rounded-full',
        'flex items-center justify-center',
        'bg-card border border-border',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-300 ease-in-out',
        'hover:scale-110 hover:border-primary/50',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        'overflow-hidden'
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Animated background ripple */}
      <span
        className={cn(
          'absolute inset-0 rounded-full transition-transform duration-500',
          isDark 
            ? 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20' 
            : 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20',
          isAnimating ? 'scale-[3] opacity-0' : 'scale-0 opacity-100'
        )}
      />
      
      {/* Icon container with rotation */}
      <span
        className={cn(
          'relative z-10 transition-all duration-500',
          isAnimating ? 'rotate-[360deg] scale-0' : 'rotate-0 scale-100'
        )}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
        ) : (
          <Moon className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        )}
      </span>

      {/* Particle effects on click */}
      {isAnimating && (
        <>
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className={cn(
                'absolute w-1.5 h-1.5 rounded-full',
                isDark ? 'bg-yellow-400' : 'bg-primary',
                'animate-[particle_0.5s_ease-out_forwards]'
              )}
              style={{
                '--angle': `${i * 60}deg`,
              } as React.CSSProperties}
            />
          ))}
        </>
      )}
    </button>
  );
};

export default FloatingThemeToggle;
