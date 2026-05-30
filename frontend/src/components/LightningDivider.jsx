import React from 'react';

export const LightningDivider = () => {
  return (
    <div className="lightning-divider-wrapper max-w-7xl mx-auto px-4">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="lightning-divider-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="lightning-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          className="lightning-path-main"
          d="M 0 20 L 80 20 L 100 8 L 130 28 L 170 12 L 210 24 L 260 16 L 320 22 L 400 14 L 480 26 L 560 18 L 640 22 L 720 14 L 800 28 L 880 16 L 960 22 L 1040 12 L 1120 24 L 1200 20"
          fill="none"
          stroke="#FFE000"
          strokeWidth="1.5"
          filter="url(#lightning-glow)"
        />
        <path
          className="lightning-path-spark"
          d="M 0 20 L 80 20 L 100 8 L 130 28 L 170 12 L 210 24 L 260 16 L 320 22 L 400 14 L 480 26 L 560 18 L 640 22 L 720 14 L 800 28 L 880 16 L 960 22 L 1040 12 L 1120 24 L 1200 20"
          fill="none"
          stroke="#FFE000"
          strokeWidth="2.5"
          opacity="0"
          filter="url(#lightning-glow)"
        />
      </svg>
    </div>
  );
};
