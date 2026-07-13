'use client';
import { useCallback } from 'react';
 
const COLORS = ['#0f0', '#ff0', '#f0f', '#0ff', '#f00'];
 
interface SpotlightGridProps {
  /** How many cards to render. The grid auto-fills the container, so raise this for bigger screens/backgrounds. */
  count?: number;
  className?: string;
}

const SpotlightGrid = ({ count = 40, className = '' }: SpotlightGridProps) => {

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      className={`absolut inset- -z-10 overflow-hidden  flex items-center justify-center ${className}`}
    >
      {/* <div className="grid grid-cols-[repeat(auto-fill,120px)] justify-center gap-[2px]"> */}
      <div className="grid grid-cols-13 justify-center gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            onMouseMove={handleMouseMove}
            className="spotlight-card relative size-30 overflow-hidden bg-[#2d2d2d]"
            style={{ '--clr': COLORS[i % COLORS.length] } as React.CSSProperties}
          />
        ))}
      </div>
 
      {/* Pseudo-elements need real CSS custom properties + ::before/::after,
          which Tailwind's utility classes can't express — styled-jsx handles that
          cleanly inside a Next.js component without a separate CSS file. */}
      <style jsx>{`
        .spotlight-card::before {
          content: '';
          position: absolute;
          top: var(--y, 50%);
          left: var(--x, 50%);
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, var(--clr) 10%, transparent 60%);
          width: 300px;
          height: 300px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .spotlight-card:hover::before {
          opacity: 1;
        }
        .spotlight-card::after {
          content: '';
          position: absolute;
          inset: 2px;
          background-color: rgba(45, 45, 45, 0.9);
        }
      `}</style>
    </div>
  )
}

export default SpotlightGrid