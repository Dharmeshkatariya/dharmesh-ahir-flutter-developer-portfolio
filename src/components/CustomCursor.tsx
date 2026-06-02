import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface CustomCursorProps {
  cursorStyle: string;
  theme: string;
  customConfig?: {
    cursorSize?: number;
    cursorGlow?: number;
    cursorSpeed?: number;
    cursorElasticity?: number;
    cursorBlur?: number;
    cursorColor?: string;
    cursorTrailLength?: number;
    cursorTrailMode?: string;
    cursorMagneticStrength?: number;
  };
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorStyle, theme, customConfig }) => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Read config settings with fallbacks
  const cSize = customConfig?.cursorSize ?? 24;
  const cColor = customConfig?.cursorColor ?? 'var(--accent, #00e5ff)';
  const cGlow = customConfig?.cursorGlow ?? 0.8;
  const cElasticity = customConfig?.cursorElasticity ?? 0.55;

  // Spring configuration based on custom speed & elasticity
  const stiffness = 200 + (cElasticity * 300);
  const damping = 15 + ((1 - cElasticity) * 20);
  const springConfig = { damping, stiffness, mass: 0.4 };
  
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  // State to hold background trail coordinates for visual trail effects
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Setup trail points
      if (customConfig?.cursorTrailLength && customConfig.cursorTrailLength > 0) {
        setTrail((prev) => {
          const updated = [...prev, { x: e.clientX, y: e.clientY, id: idCounter++ }];
          if (updated.length > (customConfig.cursorTrailLength || 10)) {
            updated.shift();
          }
          return updated;
        });
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.group') ||
        target.classList.contains('cursor-pointer');

      if (isInteractive) {
        setHovered(true);
        if (target.tagName === 'A' || target.closest('a')) {
          setHoveredType('link');
        } else if (target.tagName === 'BUTTON' || target.closest('button')) {
          setHoveredType('button');
        } else {
          setHoveredType('card');
        }
      } else {
        setHovered(false);
        setHoveredType(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY, customConfig?.cursorTrailLength]);

  if (cursorStyle === 'none') return null;

  const glowBoxShadow = `0 0 ${cGlow * 16}px ${cColor}`;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block select-none overflow-hidden">
      
      {/* RENDERING OF EXTRA SHINY CURSOR TRAILS */}
      {customConfig?.cursorTrailLength && customConfig.cursorTrailLength > 0 && trail.map((pt, idx) => {
        const opacity = (idx + 1) / trail.length * 0.45;
        const scale = (idx + 1) / trail.length * 0.8;

        return (
          <div
            key={pt.id}
            className="fixed rounded-full pointer-events-none transition-all duration-300"
            style={{
              left: pt.x,
              top: pt.y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              width: customConfig.cursorTrailMode === 'neon' ? 10 : 6,
              height: customConfig.cursorTrailMode === 'neon' ? 10 : 6,
              backgroundColor: cColor,
              opacity,
              boxShadow: customConfig.cursorTrailMode === 'neon' ? `0 0 10px ${cColor}` : undefined,
              filter: customConfig.cursorTrailMode === 'fire' ? 'hue-rotate(30deg) saturate(1.5)' : undefined,
            }}
          />
        );
      })}

      {/* --- PRESETS AND EXPANDED CURSORS (20 Styles) --- */}
      
      {/* 1. GLASS FROSTED RING */}
      {(cursorStyle === 'glass') && (
        <>
          <motion.div
            className="w-1.5 h-1.5 rounded-full fixed bg-[var(--accent)]"
            style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%', backgroundColor: cColor }}
          />
          <motion.div
            className="rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/5 fixed backdrop-blur-[1.5px] flex items-center justify-center"
            style={{
              x: springConfig ? smoothX : mouseX,
              y: springConfig ? smoothY : mouseY,
              translateX: '-50%',
              translateY: '-50%',
              width: hovered ? cSize * 1.6 : cSize,
              height: hovered ? cSize * 1.6 : cSize,
              borderColor: cColor,
              scale: clicked ? 0.8 : 1,
              boxShadow: glowBoxShadow
            }}
          />
        </>
      )}

      {/* 2. PIXEL DOT */}
      {cursorStyle === 'dot' && (
        <motion.div
          className="bg-[var(--accent)] fixed rounded-none"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
            width: hovered ? cSize * 1.5 : cSize / 2,
            height: hovered ? cSize * 1.5 : cSize / 2,
            backgroundColor: cColor,
            boxShadow: glowBoxShadow,
            rotate: clicked ? 45 : 0
          }}
        />
      )}

      {/* 3. NEON GLOWING */}
      {cursorStyle === 'neon' && (
        <>
          <motion.div
            className="w-2.5 h-2.5 rounded-full fixed bg-[var(--accent)]"
            style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%', backgroundColor: cColor, boxShadow: glowBoxShadow }}
          />
          <motion.div
            className="rounded-full border-2 border-dashed border-[var(--accent)]/80 fixed animate-spin"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%',
              width: cSize * 1.8,
              height: cSize * 1.8,
              borderColor: cColor,
              animationDuration: '8s',
              scale: clicked ? 0.75 : hovered ? 1.4 : 1
            }}
          />
        </>
      )}

      {/* 4. APPLE LINK */}
      {cursorStyle === 'apple' && (
        <motion.div
          className="fixed bg-white/10 border border-white/20 rounded-full backdrop-blur-[4px] shadow-lg"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
            width: hovered ? cSize * 2.1 : cSize * 1.1,
            height: hovered ? cSize * 2.1 : cSize * 1.1,
            scale: clicked ? 0.85 : 1
          }}
        />
      )}

      {/* 5. CYBER HUD */}
      {cursorStyle === 'cyber' && (
        <motion.div
          className="fixed flex justify-center items-center font-mono font-extrabold text-[8px]"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
            width: cSize * 1.8,
            height: cSize * 1.8,
            color: cColor,
            scale: clicked ? 0.9 : hovered ? 1.35 : 1
          }}
        >
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: cColor }} />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: cColor }} />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: cColor }} />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: cColor }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cColor }} />
          {hovered && <span className="absolute text-[7px] -bottom-3 uppercase font-black tracking-widest">{hoveredType || 'LOCK'}</span>}
        </motion.div>
      )}

      {/* 6. MAGNETIC */}
      {cursorStyle === 'magnetic' && (
        <motion.div
          className="fixed border-2 rounded-full"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
            width: hovered ? cSize * 2.2 : cSize,
            height: hovered ? cSize * 2.2 : cSize,
            borderColor: cColor,
            backgroundColor: hovered ? `${cColor}1A` : 'transparent',
            scale: clicked ? 0.8 : 1
          }}
        />
      )}

      {/* 7. LIQUID PLASMA / ORGANIC BLOB */}
      {cursorStyle === 'blob' && (
        <motion.div
          className="fixed rounded-full blur-[1px] opacity-70"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
            width: hovered ? cSize * 2.3 : cSize * 1.2,
            height: hovered ? cSize * 1.7 : cSize * 1.2,
            background: `radial-gradient(circle, ${cColor} 0%, rgba(139, 92, 246, 0.4) 100%)`,
            boxShadow: glowBoxShadow
          }}
          animate={{
            borderRadius: [
              '42% 58% 70% 30% / 45% 45% 55% 55%',
              '70% 30% 52% 48% / 60% 40% 60% 40%',
              '42% 58% 70% 30% / 45% 45% 55% 55%'
            ]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
      )}

      {/* 8. CLI TERMINAL */}
      {cursorStyle === 'terminal' && (
        <motion.div
          className="fixed font-mono text-[9px] font-bold bg-black/90 border px-2 py-0.5 rounded shadow-xl flex items-center gap-1"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '12px',
            translateY: '14px',
            borderColor: cColor,
            color: cColor
          }}
        >
          <span>&gt; flutter{hovered ? '_open' : ''}</span>
          {hovered && <span className="w-1.5 h-3 bg-[var(--accent)] animate-pulse" style={{ backgroundColor: cColor }} />}
        </motion.div>
      )}

      {/* 9. ROCKET PROPULSION */}
      {cursorStyle === 'rocket' && (
        <motion.div
          className="fixed font-bold text-base flex flex-col items-center"
          style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        >
          <span>🚀</span>
          {clicked && <span className="text-[6px] text-orange-400 animate-bounce">🔥</span>}
        </motion.div>
      )}

      {/* 10. FLUTTER CURSOR */}
      {cursorStyle === 'flutter' && (
        <motion.div
          className="fixed flex items-center justify-center"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
            width: cSize * 1.5,
            height: cSize * 1.5,
            scale: clicked ? 0.75 : hovered ? 1.35 : 1
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" style={{ fill: cColor }}>
            <path d="M 64.26,3 L 34.33,33 L 49.3,47.96 L 79.23,18.03 Z" />
            <path d="M 79.23,47.96 L 49.3,77.9 L 34.33,62.93 L 64.26,33 Z" fill="#ffffff" />
            <path d="M 49.3,77.9 L 34.33,92.86 L 4.4,62.93 L 19.36,47.96 Z" opacity="0.8" />
          </svg>
        </motion.div>
      )}

      {/* 11. NEURAL */}
      {cursorStyle === 'neural' && (
        <motion.div
          className="fixed flex justify-center items-center"
          style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        >
          <div className="w-2 h-2 rounded-full absolute bg-white" />
          <motion.div 
            className="w-12 h-12 rounded-full border border-teal-400/40 opacity-40 absolute"
            animate={{ scale: [1, 1.5, 1], rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.div 
            className="w-20 h-20 rounded-full border border-cyan-400/20 opacity-20 absolute"
            animate={{ scale: [1.5, 1, 1.5], rotate: -360 }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        </motion.div>
      )}

      {/* 12. MATRIX GLYPHS */}
      {cursorStyle === 'matrix' && (
        <motion.div
          className="fixed font-mono text-[9px] text-[#00ff3c] leading-none"
          style={{ x: mouseX, y: mouseY, translateX: '-5%', translateY: '15px' }}
        >
          <div className="flex flex-col select-none">
            <span className="opacity-100 animate-pulse">{Math.floor(Math.random() * 2)}</span>
            <span className="opacity-60">{Math.floor(Math.random() * 2)}</span>
            <span className="opacity-20">{Math.floor(Math.random() * 2)}</span>
          </div>
        </motion.div>
      )}

      {/* 13. GLOBE / ORBIT CURSOR */}
      {cursorStyle === 'orbit' && (
        <motion.div
          className="fixed w-10 h-10 flex items-center justify-center"
          style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cColor }} />
          <motion.div 
            className="w-8 h-4 rounded-full border absolute"
            style={{ borderColor: cColor }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div 
            className="w-4 h-8 rounded-full border absolute"
            style={{ borderColor: cColor }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}

      {/* 14. HOLOGRAM CROSS */}
      {cursorStyle === 'hologram' && (
        <motion.div
          className="fixed flex justify-center items-center text-[var(--accent)] font-semibold text-[8px]"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
            width: cSize * 2,
            height: cSize * 2,
            color: cColor,
            scale: hovered ? 1.4 : 1
          }}
        >
          <div className="absolute w-6 h-[1px]" style={{ backgroundColor: cColor }} />
          <div className="absolute h-6 w-[1px]" style={{ backgroundColor: cColor }} />
          <motion.div 
            className="w-10 h-10 border rounded-full absolute border-dashed"
            style={{ borderColor: cColor }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          />
        </motion.div>
      )}

    </div>
  );
};
