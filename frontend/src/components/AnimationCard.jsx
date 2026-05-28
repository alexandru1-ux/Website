import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

export const AnimationCard = ({ animation, onClick }) => {
  const isVideoThumbnail = animation.thumbnail_url?.endsWith('.mp4') || animation.thumbnail_url?.endsWith('.webm');
  
  return (
    <Card
      className="bg-[#0a0a0a] border-[#FFE000] hover:shadow-[0_0_12px_rgba(255,224,0,0.3)] transition-all duration-300 overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {isVideoThumbnail ? (
          <video
            src={animation.thumbnail_url}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={animation.thumbnail_url}
            alt={animation.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {/* Watermark Overlay */}
        <img
          src="/watermark.png"
          alt="GoldenFX Watermark"
          className="absolute bottom-2 right-2 w-10 h-10 opacity-60 pointer-events-none z-10"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button className="bg-[#FFE000] text-black hover:bg-[#FFE000]/90 border-none font-bold">
            View Details
          </Button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-[#FFE000] font-bold text-lg mb-2">{animation.title}</h3>
        <p className="text-white/80 text-sm line-clamp-2 mb-3">{animation.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#FFE000] text-xs font-medium px-3 py-1 border border-[#FFE000] rounded-full">
            {animation.category}
          </span>
        </div>
      </div>
    </Card>
  );
};
