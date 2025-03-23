
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AdControlsProps {
  canClose: boolean;
  countdown: number;
  showDoNotShowOption: boolean;
  onClose: () => void;
  onDoNotShowToday: () => void;
  fullScreen?: boolean;
}

const AdControls = ({ 
  canClose, 
  countdown, 
  showDoNotShowOption, 
  onClose, 
  onDoNotShowToday,
  fullScreen 
}: AdControlsProps) => {
  if (fullScreen) {
    return null;
  }

  return (
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
          onClick={onDoNotShowToday}
        >
          Não mostrar novamente hoje
        </Button>
      )}
    </div>
  );
};

export default AdControls;
