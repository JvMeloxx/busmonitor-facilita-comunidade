
import React, { useState, useEffect } from 'react';
import { busRoutes } from '../data/busData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '../context/ThemeContext';

// Import our new components
import RoutesHeader from '@/components/routes/RoutesHeader';
import RoutesSearchBar from '@/components/routes/RoutesSearchBar';
import RoutesList from '@/components/routes/RoutesList';
import SchedulesView from '@/components/routes/SchedulesView';

const RoutesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dayFilter, setDayFilter] = useState<'mondayToFriday' | 'saturdayAndHoliday' | 'sunday'>('mondayToFriday');
  const { company, companyName } = useTheme();

  // Filter routes by the selected company
  const companyRoutes = busRoutes.filter(route => {
    if (!route.company) {
      if (route.color === '#22c55e') return company === 'tarifeZero';
      if (route.color === '#eab308') return company === 'ctExpresso';
      if (route.color === '#f97316') return company === 'catedral';
      return false;
    }
    return route.company === company;
  });

  // Filter routes based on search term
  const filteredRoutes = companyRoutes.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    route.number.includes(searchTerm)
  );

  // Effect to update next scheduled times periodically
  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      // This function would typically call an API or recalculate times
      console.log("Updated next departure times");
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <RoutesHeader companyName={companyName} />
      <RoutesSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="all" className="text-base py-3">
                Todas as Linhas
              </TabsTrigger>
              <TabsTrigger value="schedule" className="text-base py-3">
                Horários de Hoje
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <RoutesList 
                routes={filteredRoutes}
                companyName={companyName}
              />
            </TabsContent>

            <TabsContent value="schedule">
              <SchedulesView 
                routes={companyRoutes} 
                dayFilter={dayFilter} 
                setDayFilter={setDayFilter}
                companyName={companyName}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default RoutesPage;
