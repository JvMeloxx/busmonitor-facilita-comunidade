
import React from 'react';
import { BusRoute } from '@/types/busTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RouteScheduleCard from './RouteScheduleCard';

interface SchedulesViewProps {
  routes: BusRoute[];
  dayFilter: 'mondayToFriday' | 'saturdayAndHoliday' | 'sunday';
  setDayFilter: (value: 'mondayToFriday' | 'saturdayAndHoliday' | 'sunday') => void;
  companyName: string;
}

const SchedulesView = ({ routes, dayFilter, setDayFilter, companyName }: SchedulesViewProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <Select 
          defaultValue={dayFilter}
          onValueChange={(value) => setDayFilter(value as any)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o dia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mondayToFriday">Segunda a Sexta</SelectItem>
            <SelectItem value="saturdayAndHoliday">Sábado e Feriado</SelectItem>
            <SelectItem value="sunday">Domingo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {routes.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhuma linha encontrada para {companyName}.</p>
        </div>
      ) : (
        routes.map((route) => (
          <div key={route.id}>
            <RouteScheduleCard route={route} dayFilter={dayFilter} />
          </div>
        ))
      )}
    </div>
  );
};

export default SchedulesView;
