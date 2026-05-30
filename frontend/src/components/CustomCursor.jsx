import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    // Create trail elements
    const trailCount = 8;
    const trailContainer = document.getElementById('cursor-trail-container');
    if (!trailContainer) return;

    trailRef.current = [];
    for (let i = 0; i < trailCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.cssText = `
        position: fixed;
        width: ${6 - i * 0.5}px;
        height: ${6 - i * 0.5}px;
        background: #FFE000;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${0.6 - i * 0.07};
        box-shadow: 0 0 8px #FFE000;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
      `;
      trailContainer.appendChild(dot);
      trailRef.current.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    const updateCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`;
        cursorRef.current.style.top = `${mouseY}px`;
      }
    };

    let rafId;
    const animateTrail = () => {
      let prevX = mouseX;
      let prevY = mouseY;
      trailRef.current.forEach((trail, i) => {
        const ease = 0.35 - i * 0.03;
        trail.x += (prevX - trail.x) * ease;
        trail.y += (prevY - trail.y) * ease;
        trail.el.style.left = `${trail.x}px`;
        trail.el.style.top = `${trail.y}px`;
        prevX = trail.x;
        prevY = trail.y;
      });
      rafId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', updateCursor);
    animateTrail();

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      if (rafId) cancelAnimationFrame(rafId);
      trailRef.current.forEach((t) => t.el.remove());
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div id="cursor-trail-container" />
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          width: '10px',
          height: '10px',
          background: '#FFE000',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 12px #FFE000, 0 0 24px #FFE000',
          transform: 'translate(-50%, -50%)',
          top: 0,
          left: 0,
          mixBlendMode: 'screen'
        }}
      />
    </>
  );
};
