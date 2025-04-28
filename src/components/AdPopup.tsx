
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Advertisement } from '@/utils/adManager';
import AdContent from './ads/AdContent';
import AdControls from './ads/AdControls';
import { useAdCountdown } from './ads/useAdCountdown';

interface AdPopupProps {
  open: boolean;
  onClose: () => void;
  advertisement?: Advertisement;
}

const AdPopup = ({ open, onClose, advertisement }: AdPopupProps) => {
  const { countdown, canClose, showDoNotShowOption } = useAdCountdown(open, advertisement);

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
      <DialogContent className={advertisement?.full_screen ? "sm:max-w-5xl w-[95vw] p-0 overflow-hidden" : "sm:max-w-md"}>
        {!advertisement?.full_screen && (
          <DialogHeader>
            <DialogTitle className="text-center">Anúncio</DialogTitle>
          </DialogHeader>
        )}
        
        <div className={`flex flex-col items-center justify-center ${advertisement?.full_screen ? 'p-0' : 'my-4'}`}>
          <AdContent advertisement={advertisement} />
          
          <AdControls 
            canClose={canClose}
            countdown={countdown}
            showDoNotShowOption={showDoNotShowOption}
            onClose={onClose}
            onDoNotShowToday={handleDoNotShowToday}
            fullScreen={advertisement?.full_screen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdPopup;
