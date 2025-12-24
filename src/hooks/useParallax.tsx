import { useEffect, useState } from 'react';

interface ParallaxValues {
  scrollY: number;
  parallaxY: (speed?: number) => number;
  parallaxOpacity: (fadeStart?: number, fadeEnd?: number) => number;
}

const useParallax = (): ParallaxValues => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxY = (speed: number = 0.5) => {
    return scrollY * speed;
  };

  const parallaxOpacity = (fadeStart: number = 0, fadeEnd: number = 500) => {
    if (scrollY <= fadeStart) return 1;
    if (scrollY >= fadeEnd) return 0;
    return 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
  };

  return { scrollY, parallaxY, parallaxOpacity };
};

export default useParallax;
