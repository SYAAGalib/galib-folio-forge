import { useEffect, useState } from 'react';

interface MorphingShape {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
  blur: number;
}

interface MorphingBackgroundProps {
  className?: string;
  shapeCount?: number;
  opacity?: number;
}

const MorphingBackground = ({ 
  className = '', 
  shapeCount = 5,
  opacity = 0.15 
}: MorphingBackgroundProps) => {
  const [shapes, setShapes] = useState<MorphingShape[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(var(--primary))',
      'hsl(var(--accent))',
      'hsl(var(--secondary))',
      'hsl(var(--primary) / 0.8)',
      'hsl(var(--accent) / 0.6)',
    ];

    const generatedShapes: MorphingShape[] = Array.from({ length: shapeCount }, (_, i) => ({
      id: i,
      size: Math.random() * 400 + 200,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      color: colors[i % colors.length],
      blur: Math.random() * 60 + 40,
    }));

    setShapes(generatedShapes);
  }, [shapeCount]);

  return (
    <div 
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity, zIndex: 0 }}
    >
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: shape.color,
            filter: `blur(${shape.blur}px)`,
            transform: 'translate(-50%, -50%)',
            animation: `
              morphMove${shape.id % 3} ${shape.duration}s ease-in-out infinite,
              morphScale ${shape.duration * 0.8}s ease-in-out infinite,
              morphRotate ${shape.duration * 1.2}s linear infinite
            `,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}
      
      <style>{`
        @keyframes morphMove0 {
          0%, 100% {
            transform: translate(-50%, -50%) translate(0, 0);
          }
          25% {
            transform: translate(-50%, -50%) translate(30px, -50px);
          }
          50% {
            transform: translate(-50%, -50%) translate(-20px, 40px);
          }
          75% {
            transform: translate(-50%, -50%) translate(40px, 20px);
          }
        }
        
        @keyframes morphMove1 {
          0%, 100% {
            transform: translate(-50%, -50%) translate(0, 0);
          }
          33% {
            transform: translate(-50%, -50%) translate(-40px, 30px);
          }
          66% {
            transform: translate(-50%, -50%) translate(50px, -20px);
          }
        }
        
        @keyframes morphMove2 {
          0%, 100% {
            transform: translate(-50%, -50%) translate(0, 0);
          }
          20% {
            transform: translate(-50%, -50%) translate(25px, 35px);
          }
          40% {
            transform: translate(-50%, -50%) translate(-35px, -15px);
          }
          60% {
            transform: translate(-50%, -50%) translate(15px, -45px);
          }
          80% {
            transform: translate(-50%, -50%) translate(-25px, 25px);
          }
        }
        
        @keyframes morphScale {
          0%, 100% {
            scale: 1;
          }
          50% {
            scale: 1.15;
          }
        }
        
        @keyframes morphRotate {
          0% {
            rotate: 0deg;
          }
          100% {
            rotate: 360deg;
          }
        }
      `}</style>
    </div>
  );
};

export default MorphingBackground;
