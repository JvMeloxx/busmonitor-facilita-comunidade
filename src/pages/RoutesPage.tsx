
import React, { useState, useEffect } from 'react';
import { busRoutes } from '../data/busData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '../context/ThemeContext';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { cacheUtils } from '@/utils/cacheManager';
import OfflineIndicator from '@/components/OfflineIndicator';
import { Badge } from '@/components/ui/badge';
import { WifiOff } from 'lucide-react';

// Import our new components
import RoutesHeader from '@/components/routes/RoutesHeader';
import RoutesSearchBar from '@/components/routes/RoutesSearchBar';
import RoutesList from '@/components/routes/RoutesList';
import SchedulesView from '@/components/routes/SchedulesView';

const RoutesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dayFilter, setDayFilter] = useState<'mondayToFriday' | 'saturdayAndHoliday' | 'sunday'>('mondayToFriday');
  const { company, companyName } = useTheme();
  const { isOnline, getOfflineData, saveOfflineData } = useOfflineMode();
  const [routesData, setRoutesData] = useState(busRoutes);

  // Cache and load routes data
  useEffect(() => {
    if (isOnline) {
      // Cache current routes data
      cacheUtils.cacheRoutes(busRoutes);
      setRoutesData(busRoutes);
    } else {
      // Load cached routes data
      const cachedRoutes = cacheUtils.getCachedRoutes();
      if (cachedRoutes) {
        setRoutesData(cachedRoutes);
      }
    }
  }, [isOnline]);
  // Filter routes by the selected company
  const companyRoutes = routesData.filter(route => {
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
      {/* Offline Indicator */}
      <OfflineIndicator />
      
      <RoutesHeader companyName={companyName} />
      
      <div className="relative">
        <RoutesSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {/* Offline mode indicator in search bar */}
        {!isOnline && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Badge variant="secondary" className="text-xs">
              <WifiOff size={12} className="mr-1" />
              Offline
            </Badge>
          </div>
        )}
      </div>

      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">
          {!isOnline && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <WifiOff size={16} className="inline mr-2" />
                Você está offline. Mostrando dados em cache. Algumas informações podem estar desatualizadas.
              </p>
            </div>
          )}
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="all" className="text-base py-3">
                Todas as Linhas
                {!isOnline && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filteredRoutes.length}
                  </Badge>
                )}
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
