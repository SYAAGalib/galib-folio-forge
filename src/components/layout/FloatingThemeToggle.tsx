import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const FloatingThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-12 h-12 rounded-full',
        'flex items-center justify-center',
        'bg-card border border-border',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-300 ease-in-out',
        'hover:scale-110 hover:border-primary/50',
        'focus:outline-none focus:ring-2 focus:ring-primary/50'
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-primary transition-transform duration-300" />
      )}
    </button>
  );
};

export default FloatingThemeToggle;
