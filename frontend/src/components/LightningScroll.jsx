import React, { useEffect, useState, useRef } from 'react';

const LightningBolt = ({ side, id }) => {
  // Generate random lightning bolt path
  const generatePath = () => {
    const segments = 8;
    const height = 200;
    const startX = side === 'left' ? 0 : 80;
    let path = `M ${startX} 0`;
    for (let i = 1; i <= segments; i++) {
      const y = (height / segments) * i;
      const x = startX + (Math.random() - 0.5) * 40;
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  return (
    <svg
      width="80"
      height="200"
      style={{
        position: 'fixed',
        top: `${Math.random() * 60 + 10}%`,
        [side]: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        animation: 'lightning-flash 300ms ease-out forwards'
      }}
    >
      <path
        d={generatePath()}
        stroke="#FFE000"
        strokeWidth="2"
        fill="none"
        style={{
          filter: 'drop-shadow(0 0 6px #FFE000) drop-shadow(0 0 12px #FFE000)'
        }}
      />
    </svg>
  );
};

export const LightningScroll = () => {
  const [bolts, setBolts] = useState([]);
  const scrollCountRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollYRef.current);
      lastScrollYRef.current = currentY;

      if (delta < 30) return;

      scrollCountRef.current += 1;
      // Trigger lightning every 3rd significant scroll
      if (scrollCountRef.current % 3 === 0) {
        const side = Math.random() > 0.5 ? 'left' : 'right';
        const id = Date.now() + Math.random();
        setBolts((prev) => [...prev, { id, side }]);

        // Remove bolt after animation
        setTimeout(() => {
          setBolts((prev) => prev.filter((b) => b.id !== id));
        }, 350);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {bolts.map((bolt) => (
        <LightningBolt key={bolt.id} side={bolt.side} id={bolt.id} />
      ))}
    </>
  );
};
