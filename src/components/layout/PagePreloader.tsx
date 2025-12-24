import { useEffect, useState } from 'react';

const PagePreloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Wait for page to fully load
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setIsVisible(false), 500);
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Logo/Name */}
        <div className="preloader-text text-4xl md:text-5xl font-bold">
          <span className="hero-text-gradient">SYAA</span>
          <span className="text-foreground">Galib</span>
        </div>
        
        {/* Loading Animation */}
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="preloader-dot w-3 h-3 rounded-full bg-primary"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Orbital Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="preloader-ring absolute w-32 h-32 border-2 border-primary/30 rounded-full" />
          <div 
            className="preloader-ring absolute w-48 h-48 border border-secondary/20 rounded-full" 
            style={{ animationDirection: 'reverse', animationDuration: '3s' }}
          />
          <div 
            className="preloader-ring absolute w-64 h-64 border border-primary/10 rounded-full" 
            style={{ animationDuration: '4s' }}
          />
        </div>

        {/* Sparkle particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="preloader-sparkle absolute w-1 h-1 bg-primary rounded-full"
            style={{
              '--angle': `${i * 45}deg`,
              animationDelay: `${i * 0.15}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
};

export default PagePreloader;
