import { useEffect, useState } from 'react';

const ScrollProgressIndicator = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-muted/30">
      <div
        className="h-full scroll-progress-bar transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect at the end */}
      <div
        className="absolute top-0 h-full w-8 scroll-progress-glow transition-all duration-150 ease-out"
        style={{ left: `calc(${progress}% - 16px)` }}
      />
    </div>
  );
};

export default ScrollProgressIndicator;
