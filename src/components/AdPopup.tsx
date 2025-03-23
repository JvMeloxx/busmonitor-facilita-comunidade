import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Advertisement, 
  trackAdImpression, 
  trackAdClick, 
  markAdShownForSession 
} from '@/utils/adManager';

interface AdPopupProps {
  open: boolean;
  onClose: () => void;
  advertisement?: Advertisement;
}

const AdPopup = ({ open, onClose, advertisement }: AdPopupProps) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [showDoNotShowOption, setShowDoNotShowOption] = useState(false);

  useEffect(() => {
    if (!open) return;
    
    // Reset countdown when popup opens
    setCountdown(advertisement?.duration || 5);
    setCanClose(advertisement?.duration === 0 ? true : false);
    
    // Mark ad as shown for this session
    markAdShownForSession();
    
    // Start countdown only if there's a duration
    if (advertisement?.duration && advertisement.duration > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanClose(true);
            setShowDoNotShowOption(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    } else {
      // No countdown needed
      setShowDoNotShowOption(true);
    }
    
    // Track ad impression when opened
    if (advertisement) {
      trackAdImpression(advertisement.id);
    }
  }, [open, advertisement]);

  const handleAdClick = () => {
    if (advertisement?.linkUrl && advertisement.id) {
      trackAdClick(advertisement.id);
      window.open(advertisement.linkUrl, '_blank');
    }
  };

  const handleDoNotShowToday = () => {
    // Set a flag in localStorage to not show ads for 24 hours
    const now = new Date();
    localStorage.setItem('doNotShowAdsUntil', now.setHours(now.getHours() + 24).toString());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen && canClose) onClose();
    }}>
      <DialogContent className={advertisement?.fullScreen ? "sm:max-w-5xl w-[95vw] p-0 overflow-hidden" : "sm:max-w-md"}>
        {!advertisement?.fullScreen && (
          <DialogHeader>
            <DialogTitle className="text-center">Anúncio</DialogTitle>
          </DialogHeader>
        )}
        
        <div className={`flex flex-col items-center justify-center ${advertisement?.fullScreen ? 'p-0' : 'my-4'}`}>
          {/* Advertisement content - image or video */}
          {advertisement && (
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
          )}
          
          {!advertisement && (
            <div className="bg-gray-200 w-full aspect-video flex items-center justify-center mb-4 rounded-md">
              <p className="text-gray-500">Seu anúncio aqui</p>
            </div>
          )}
          
          {/* Don't show the buttons if it's a full screen ad - we rely on the yellow bar instead */}
          {!advertisement?.fullScreen && (
            <div className="flex flex-col w-full gap-2 px-4 pb-4 pt-2">
              <Button
                variant="outline"
                disabled={!canClose}
                className="w-full"
                onClick={onClose}
              >
                {canClose ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Fechar anúncio
                  </>
                ) : (
                  `Aguarde ${countdown} segundos...`
                )}
              </Button>
              
              {showDoNotShowOption && (
                <Button
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={handleDoNotShowToday}
                >
                  Não mostrar novamente hoje
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdPopup;
