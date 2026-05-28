import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { X } from 'lucide-react';

export const AnimationModal = ({ animation, open, onClose }) => {
  if (!animation) return null;

  const isVideo = animation.video_url?.endsWith('.mp4') || animation.video_url?.endsWith('.webm');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border-2 border-[#FFE000] max-w-4xl text-white">
        <DialogHeader>
          <DialogTitle className="text-[#FFE000] text-2xl font-bold">
            {animation.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden border border-[#FFE000]/30">
            {isVideo ? (
              <video
                src={animation.video_url}
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={animation.video_url}
                alt={animation.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[#FFE000] text-sm font-medium px-3 py-1 border border-[#FFE000] rounded-full">
                {animation.category}
              </span>
              <span className="text-white/60 text-sm">
                {new Date(animation.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <DialogDescription className="text-white text-base leading-relaxed">
              {animation.description}
            </DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
