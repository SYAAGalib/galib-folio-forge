import { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  baseY: number;
  speed: number;
  opacity: number;
  delay: number;
}

interface ScrollParticlesProps {
  className?: string;
  particleCount?: number;
  maxOpacity?: number;
}

const ScrollParticles = ({ 
  className = '', 
  particleCount = 50,
  maxOpacity = 0.6
}: ScrollParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      baseY: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 2,
    }));

    setParticles(generatedParticles);
  }, [particleCount]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getParticleStyle = (particle: Particle) => {
    const scrollFactor = scrollY * particle.speed * 0.1;
    const yOffset = (particle.baseY + scrollFactor) % 120 - 10;
    const xWobble = Math.sin((scrollY * 0.01 + particle.delay) * particle.speed) * 3;
    const scaleEffect = 1 + Math.sin(scrollY * 0.002 + particle.id) * 0.3;
    const opacityEffect = particle.opacity * (0.5 + Math.abs(Math.sin(scrollY * 0.001 + particle.delay)) * 0.5);

    return {
      left: `${particle.x + xWobble}%`,
      top: `${yOffset}%`,
      width: particle.size * scaleEffect,
      height: particle.size * scaleEffect,
      opacity: Math.min(opacityEffect, maxOpacity),
      transform: `rotate(${scrollY * particle.speed * 0.5}deg)`,
    };
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary transition-all duration-75 ease-out"
          style={getParticleStyle(particle)}
        />
      ))}
      
      {/* Larger accent particles */}
      {particles.slice(0, 15).map((particle) => {
        const scrollFactor = scrollY * particle.speed * 0.05;
        const yOffset = (particle.baseY + scrollFactor * 0.5) % 100;
        
        return (
          <div
            key={`accent-${particle.id}`}
            className="absolute rounded-full"
            style={{
              left: `${(particle.x + 50) % 100}%`,
              top: `${yOffset}%`,
              width: particle.size * 3,
              height: particle.size * 3,
              background: `radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 70%)`,
              opacity: 0.4 + Math.sin(scrollY * 0.003 + particle.id) * 0.2,
              transform: `scale(${1 + Math.sin(scrollY * 0.002) * 0.2})`,
              transition: 'all 0.1s ease-out',
            }}
          />
        );
      })}

      {/* Connecting lines between nearby particles */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.slice(0, 10).map((p1, i) => {
          const p2 = particles[(i + 1) % 10];
          const scrollOffset = scrollY * 0.02;
          const x1 = p1.x + Math.sin(scrollOffset + p1.delay) * 2;
          const y1 = (p1.baseY + scrollY * p1.speed * 0.1) % 100;
          const x2 = p2.x + Math.sin(scrollOffset + p2.delay) * 2;
          const y2 = (p2.baseY + scrollY * p2.speed * 0.1) % 100;
          
          return (
            <line
              key={`line-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="hsl(var(--primary) / 0.1)"
              strokeWidth="0.5"
              style={{
                opacity: 0.3 + Math.sin(scrollY * 0.005 + i) * 0.2,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ScrollParticles;
