
import React from 'react';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { BusRoute } from '@/types/busTypes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ScheduleTimeBlock from '../routes/ScheduleTimeBlock';

interface RouteDetailScheduleProps {
  route: BusRoute;
  selectedDay: 'mondayToFriday' | 'saturdayAndHoliday' | 'sunday';
  setSelectedDay: (day: 'mondayToFriday' | 'saturdayAndHoliday' | 'sunday') => void;
}

const RouteDetailSchedule = ({ route, selectedDay, setSelectedDay }: RouteDetailScheduleProps) => {
  const isScheduleEmpty = (day: 'mondayToFriday' | 'saturdayAndHoliday' | 'sunday') => {
    return (
      route.schedule[day].morning.length === 0 &&
      route.schedule[day].afternoon.length === 0 &&
      route.schedule[day].evening.length === 0
    );
  };

  return (
    <div>
      <Card className="p-4 mb-6 bg-blue-100 border-blue-300">
        <div className="flex gap-3 items-start">
          <div className="p-2 bg-blue-600 rounded-full text-white">
            <Calendar size={18} />
          </div>
          <div>
            <h3 className="font-medium">Selecione o dia</h3>
            <Select 
              defaultValue={selectedDay}
              onValueChange={(value) => setSelectedDay(value as any)}
            >
              <SelectTrigger className="w-full mt-2 bg-white">
                <SelectValue placeholder="Selecione o dia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mondayToFriday">Segunda a Sexta</SelectItem>
                <SelectItem value="saturdayAndHoliday">Sábado e Feriado</SelectItem>
                <SelectItem value="sunday">Domingo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      
      {isScheduleEmpty(selectedDay) ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-2">Não há horários disponíveis para este dia</p>
          <Button 
            variant="outline"
            onClick={() => setSelectedDay('mondayToFriday')}
          >
            Ver horários de Segunda a Sexta
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {route.schedule[selectedDay].morning.length > 0 && (
            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <span className="bg-yellow-100 text-yellow-700 p-1 rounded-md mr-2">
                  <Clock size={16} />
                </span>
                Manhã
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {route.schedule[selectedDay].morning.map((time, index) => (
                  <div 
                    key={index} 
                    className="bg-accent rounded-md p-2 text-center text-sm flex items-center justify-center"
                  >
                    <Clock size={14} className="mr-1 text-muted-foreground" />
                    {time}
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {route.schedule[selectedDay].afternoon.length > 0 && (
            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <span className="bg-orange-100 text-orange-700 p-1 rounded-md mr-2">
                  <Clock size={16} />
                </span>
                Tarde
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {route.schedule[selectedDay].afternoon.map((time, index) => (
                  <div 
                    key={index} 
                    className="bg-accent rounded-md p-2 text-center text-sm flex items-center justify-center"
                  >
                    <Clock size={14} className="mr-1 text-muted-foreground" />
                    {time}
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {route.schedule[selectedDay].evening.length > 0 && (
            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-700 p-1 rounded-md mr-2">
                  <Clock size={16} />
                </span>
                Noite
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {route.schedule[selectedDay].evening.map((time, index) => (
                  <div 
                    key={index} 
                    className="bg-accent rounded-md p-2 text-center text-sm flex items-center justify-center"
                  >
                    <Clock size={14} className="mr-1 text-muted-foreground" />
                    {time}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="font-medium mb-3">Observações</h3>
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <AlertTriangle size={18} className="text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-sm">Os horários podem variar em até 10 minutos devido às condições do trânsito.</p>
            </div>
            <div className="flex gap-2 items-start">
              <AlertTriangle size={18} className="text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-sm">Aos domingos e feriados, o ônibus opera com horários reduzidos.</p>
            </div>
            {/* Frase removida conforme solicitado */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RouteDetailSchedule;
