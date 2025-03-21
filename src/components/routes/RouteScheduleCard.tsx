
import React from 'react';
import { BusRoute } from '@/types/busTypes';
import { Card } from '@/components/ui/card';
import ScheduleTimeBlock from './ScheduleTimeBlock';

interface RouteScheduleCardProps {
  route: BusRoute;
  dayFilter: 'mondayToFriday' | 'saturdayAndHoliday' | 'sunday';
}

const RouteScheduleCard = ({ route, dayFilter }: RouteScheduleCardProps) => {
  const scheduleForDay = route.schedule[dayFilter];
  const hasTimes = scheduleForDay.morning.length > 0 || 
                   scheduleForDay.afternoon.length > 0 || 
                   scheduleForDay.evening.length > 0;
  
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
          style={{ backgroundColor: route.color }}
        >
          {route.number}
        </div>
        <div>
          <h3 className="font-semibold">{route.name}</h3>
          <p className="text-sm text-muted-foreground">{route.terminal.name}</p>
        </div>
      </div>
      
      <div className="border-t pt-3">
        <ScheduleTimeBlock times={scheduleForDay.morning} period="Manhã" />
        <ScheduleTimeBlock times={scheduleForDay.afternoon} period="Tarde" />
        <ScheduleTimeBlock times={scheduleForDay.evening} period="Noite" />
        
        {!hasTimes && (
          <div className="text-center py-4 text-muted-foreground">
            Não há horários disponíveis para este dia
          </div>
        )}
      </div>
    </Card>
  );
};

export default RouteScheduleCard;
