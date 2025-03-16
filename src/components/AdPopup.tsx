
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AdPopupProps {
  open: boolean;
  onClose: () => void;
}

const AdPopup = ({ open, onClose }: AdPopupProps) => {
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (!open) return;
    
    // Reset countdown when popup opens
    setCountdown(5);
    setCanClose(false);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanClose(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen && canClose) onClose();
    }}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">Anúncio</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center my-4">
          {/* Placeholder for advertisement image or video */}
          <div className="bg-gray-200 w-full aspect-video flex items-center justify-center mb-4 rounded-md">
            <p className="text-gray-500">Seu anúncio aqui</p>
          </div>
          
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdPopup;
