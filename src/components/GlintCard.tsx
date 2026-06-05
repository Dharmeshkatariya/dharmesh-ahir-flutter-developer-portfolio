import React, { useRef, useState } from 'react';

interface GlintCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlintCard: React.FC<GlintCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [reflectionPos, setReflectionPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom properties dynamically for CSS gradients
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);

    // Actual VisionOS specular light reflection coordinate mapping (simulating incident angle of light source)
    const reflectionX = (x / rect.width) * 100;
    const reflectionY = (y / rect.height) * 100;
    setReflectionPos({ x: reflectionX, y: reflectionY });

    // Add a micro tilting 3D effect (Spatial Depth Parallax)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -1.8;
    const rotateY = ((x - centerX) / centerX) * 1.8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setReflectionPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden transition-all duration-300 border border-white/10 bg-black/40 backdrop-blur-xl rounded-[20px] ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s, border-color 0.3s'
      }}
    >
      {/* Spatial Depth Reflective Spotlight Glint Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(350px circle at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.06), transparent 75%)`,
        }}
      />

      {/* VisionOS High Contrast Edge Highlight Sweep */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          border: '1px solid transparent',
          background: `radial-gradient(280px circle at var(--x, 0px) var(--y, 0px), rgba(255, 255, 255, 0.18), transparent 60%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
        }}
      />

      {/* VisionOS SPECULAR REFLECTION GLARE MAP (Simulates physical light reflection based on interactive light vectors) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-[5] transition-all duration-300"
        style={{
          background: `linear-gradient(${135 + (reflectionPos.x - 50) * 0.4}deg, transparent 30%, rgba(255, 255, 255, 0.25) ${reflectionPos.x}%, transparent ${reflectionPos.x + 15}%)`,
        }}
      />
      
      {/* Deep glass backing diffuse light vector */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-[1]"
        style={{
          background: `radial-gradient(85% 120% at ${reflectionPos.x}% ${reflectionPos.y}%, rgba(255, 255, 255, 0.08) 0%, transparent 100%)`
        }}
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};
