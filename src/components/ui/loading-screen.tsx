import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const LoadingScreen = ({ onComplete, duration = 3000 }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 w-full h-screen overflow-hidden py-20 bg-muted dark:bg-background">
      <div className="absolute w-full inset-0 flex items-center justify-center">
        {/* Center profile image with ripple effect */}
        <div className="absolute animate-ripple rounded-full z-10 bg-cover bg-no-repeat bg-center bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxwZXJzb258ZW58MHwwfHx8MTc0MzMyNzEzNHww&ixlib=rb-4.0.3&q=80&w=1080')] outline outline-offset-2 outline-primary/50 dark:outline-primary/30 shadow-xl border border-primary/20 [--i:0] w-[180px] h-[180px] opacity-100 [animation-delay:0s] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100" />
        
        {/* Ripple circles */}
        {Array.from({ length: 9 }, (_, i) => {
          const size = 250 + (i * 70);
          const opacity = Math.max(0.17 - (i * 0.03), 0.02);
          const delay = (i + 1) * 0.06;
          
          return (
            <div
              key={i}
              className="absolute animate-ripple rounded-full bg-primary/20 dark:bg-primary/10 shadow-xl border border-primary/10 dark:border-primary/5"
              style={{
                '--i': i + 1,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                animationDelay: `${delay}s`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1)'
              } as React.CSSProperties & { '--i': number }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LoadingScreen;