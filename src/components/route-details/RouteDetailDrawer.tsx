
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusRoute } from '@/types/busTypes';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

interface RouteDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRouteData: BusRoute | null;
}

const RouteDetailDrawer = ({ open, onOpenChange, selectedRouteData }: RouteDetailDrawerProps) => {
  if (!selectedRouteData) return null;

  // Helper function to get all schedule times for display
  const getAllScheduleTimes = (route: BusRoute) => {
    if (!route) return [];
    
    // Combine all times from all periods and days into a single array
    const allTimes = [
      ...route.schedule.mondayToFriday.morning,
      ...route.schedule.mondayToFriday.afternoon,
      ...route.schedule.mondayToFriday.evening,
      ...route.schedule.saturdayAndHoliday.morning,
      ...route.schedule.saturdayAndHoliday.afternoon,
      ...route.schedule.saturdayAndHoliday.evening,
      ...route.schedule.sunday.morning,
      ...route.schedule.sunday.afternoon,
      ...route.schedule.sunday.evening
    ];
    
    // Remove duplicates
    return [...new Set(allTimes)].sort();
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3"
              style={{ backgroundColor: selectedRouteData.color }}
            >
              {selectedRouteData.number}
            </div>
            <div>
              <DrawerTitle>{selectedRouteData.name}</DrawerTitle>
              <DrawerDescription>{selectedRouteData.description}</DrawerDescription>
            </div>
          </div>
        </DrawerHeader>
        
        <div className="px-4 pb-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Frequência</h3>
            <p className="text-sm text-muted-foreground">{selectedRouteData.frequency}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Próximos Horários</h3>
            <div className="grid grid-cols-3 gap-2">
              {getAllScheduleTimes(selectedRouteData).slice(0, 6).map((time, idx) => (
                <div key={idx} className="bg-accent rounded-md p-2 text-center text-sm">
                  {time}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Pontos de Parada</h3>
            <div className="space-y-2">
              {selectedRouteData.stops.map((stop, idx) => (
                <div key={idx} className="flex items-start">
                  <MapPin size={16} className="mr-2 mt-0.5 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">{stop.name}</div>
                    <div className="text-xs text-muted-foreground">{stop.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DrawerFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Voltar ao mapa
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RouteDetailDrawer;
