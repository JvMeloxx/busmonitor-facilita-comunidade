
import React from 'react';
import { Clock } from 'lucide-react';

interface ScheduleTimeBlockProps {
  times: string[];
  period: string;
}

const ScheduleTimeBlock = ({ times, period }: ScheduleTimeBlockProps) => {
  if (times.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-4">
      <h4 className="font-medium mb-2 text-sm">{period}:</h4>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {times.map((time, index) => (
          <div 
            key={index} 
            className="bg-accent rounded-md p-2 text-center text-sm flex items-center justify-center"
          >
            <Clock size={14} className="mr-1 text-muted-foreground" />
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTimeBlock;
