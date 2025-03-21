
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapLegend = () => {
  return (
    <div className="fixed bottom-4 right-4 z-10">
      <Button variant="outline" size="sm" className="rounded-full bg-white/80 backdrop-blur-sm shadow-md">
        <Info size={16} className="mr-1.5" />
        Legenda
      </Button>
    </div>
  );
};

export default MapLegend;
