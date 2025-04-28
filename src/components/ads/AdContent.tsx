
import React from 'react';
import { Advertisement, trackAdClick } from '@/utils/adManager';

interface AdContentProps {
  advertisement?: Advertisement;
}

const AdContent = ({ advertisement }: AdContentProps) => {
  const handleAdClick = () => {
    if (advertisement?.link_url && advertisement.id) {
      trackAdClick(advertisement.id);
      window.open(advertisement.link_url, '_blank');
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
      {advertisement.type === 'image' && (
        <div className="flex justify-center w-full">
          <img 
            src={advertisement.url} 
            alt="Anúncio" 
            className="max-w-full h-auto object-contain"
            onError={(e) => {
              console.error(`Failed to load image: ${advertisement.url}`);
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/320x480?text=Imagem+não+encontrada";
            }}
          />
        </div>
      )}
      
      {advertisement.type === 'video' && (
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
