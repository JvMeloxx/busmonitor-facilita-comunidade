import React from 'react';
import { MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGeolocation } from '@/hooks/useGeolocation';
import { cn } from '@/lib/utils';

interface LocationButtonProps {
  onLocationUpdate?: (position: GeolocationPosition) => void;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

const LocationButton = ({ 
  onLocationUpdate, 
  className, 
  size = 'default',
  variant = 'outline' 
}: LocationButtonProps) => {
  const { position, loading, error, requestLocation, permission } = useGeolocation();

  React.useEffect(() => {
    if (position && onLocationUpdate) {
      onLocationUpdate(position);
    }
  }, [position, onLocationUpdate]);

  const handleClick = () => {
    requestLocation();
  };

  const getButtonContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span className="ml-2">Localizando...</span>
        </>
      );
    }

    if (error) {
      return (
        <>
          <AlertCircle size={16} className="text-red-500" />
          <span className="ml-2">Erro na localização</span>
        </>
      );
    }

    if (position) {
      return (
        <>
          <MapPin size={16} className="text-green-500" />
          <span className="ml-2">Localização obtida</span>
        </>
      );
    }

    return (
      <>
        <MapPin size={16} />
        <span className="ml-2">Minha localização</span>
      </>
    );
  };

  const isDisabled = loading || permission === 'denied';

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      variant={variant}
      size={size}
      className={cn(
        "flex items-center transition-all duration-200",
        position && "border-green-500 bg-green-50 hover:bg-green-100",
        error && "border-red-500 bg-red-50 hover:bg-red-100",
        className
      )}
    >
      {getButtonContent()}
    </Button>
  );
};

export default LocationButton;