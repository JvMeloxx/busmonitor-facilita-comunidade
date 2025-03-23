
import React from 'react';
import { Advertisement, trackAdClick } from '@/utils/adManager';

interface AdContentProps {
  advertisement?: Advertisement;
}

const AdContent = ({ advertisement }: AdContentProps) => {
  const handleAdClick = () => {
    if (advertisement?.linkUrl && advertisement.id) {
      trackAdClick(advertisement.id);
      window.open(advertisement.linkUrl, '_blank');
    }
  };

  if (!advertisement) {
    return (
      <div className="bg-gray-200 w-full aspect-video flex items-center justify-center mb-4 rounded-md">
        <p className="text-gray-500">Seu anúncio aqui</p>
      </div>
    );
  }

  return (
    <div 
      className="w-full cursor-pointer overflow-hidden"
      onClick={handleAdClick}
    >
      {advertisement.type === 'image' ? (
        <img 
          src={advertisement.url} 
          alt="Advertisement" 
          className="w-full h-auto object-contain"
        />
      ) : (
        <video 
          src={advertisement.url} 
          autoPlay 
          muted 
          controls={false}
          loop
          className="w-full h-full object-cover"
        />
      )}
      
      {advertisement.ctaText && (
        <div className="bg-yellow-400 text-center text-black py-2 px-4 font-bold text-lg animate-pulse">
          {advertisement.ctaText}
        </div>
      )}
    </div>
  );
};

export default AdContent;
