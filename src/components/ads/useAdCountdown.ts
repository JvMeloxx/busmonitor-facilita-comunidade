
import { useState, useEffect } from 'react';
import { Advertisement, markAdShownForSession, trackAdImpression } from '@/utils/adManager';

export const useAdCountdown = (open: boolean, advertisement?: Advertisement) => {
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

  return {
    countdown,
    canClose,
    showDoNotShowOption
  };
};
