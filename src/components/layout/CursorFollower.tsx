import { useEffect, useState, useCallback } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

const CursorFollower = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(210 90% 60%)',
    'hsl(190 90% 50%)',
    'hsl(280 70% 60%)',
    '#ffd700',
    '#ff69b4',
  ];

  const createSparkle = useCallback((x: number, y: number): Sparkle => {
    return {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    };
  }, []);

  useEffect(() => {
    // Only show on desktop devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    let lastSparkleTime = 0;
    const sparkleInterval = 50; // Create sparkle every 50ms while moving

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      
      const now = Date.now();
      if (now - lastSparkleTime > sparkleInterval) {
        const newSparkle = createSparkle(e.clientX, e.clientY);
        setSparkles(prev => [...prev.slice(-15), newSparkle]); // Keep max 15 sparkles
        lastSparkleTime = now;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup old sparkles
    const cleanupInterval = setInterval(() => {
      setSparkles(prev => prev.filter(s => Date.now() - s.id < 800));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(cleanupInterval);
    };
  }, [createSparkle]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle-fade"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
          }}
        >
          {/* Star shape */}
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill={sparkle.color}
            className="drop-shadow-lg"
          >
            <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
          </svg>
        </div>
      ))}
      
      {/* Trailing glow particles */}
      {sparkles.slice(-5).map((sparkle, i) => (
        <div
          key={`glow-${sparkle.id}`}
          className="absolute rounded-full animate-sparkle-glow"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size * 2,
            height: sparkle.size * 2,
            background: `radial-gradient(circle, ${sparkle.color} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.3 + (i * 0.1),
          }}
        />
      ))}
    </div>
  );
};

export default CursorFollower;
