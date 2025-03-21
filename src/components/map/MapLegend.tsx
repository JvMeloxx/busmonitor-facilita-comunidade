
import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MapLegend = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-10">
      {isOpen ? (
        <Card className="p-4 shadow-lg bg-white/95 backdrop-blur-sm w-64">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Legenda do Mapa</h3>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
              <X size={14} />
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-[#4361ee] mr-2"></div>
              <span className="text-sm">Linhas Urbanas de Luziânia</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-[#eab308] mr-2"></div>
              <span className="text-sm">Linhas CT Expresso</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-[#e74c3c] mr-2"></div>
              <span className="text-sm">Linhas Catedral (Kandango)</span>
            </div>
          </div>
        </Card>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full bg-white/80 backdrop-blur-sm shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <Info size={16} className="mr-1.5" />
          Legenda
        </Button>
      )}
    </div>
  );
};

export default MapLegend;
