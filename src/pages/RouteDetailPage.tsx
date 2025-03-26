
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bus } from 'lucide-react';
import { busRoutes } from '../data/busData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RouteDetailHeader from '../components/route-details/RouteDetailHeader';
import RouteDetailInfo from '../components/route-details/RouteDetailInfo';
import RouteDetailSchedule from '../components/route-details/RouteDetailSchedule';
import RouteDetailMap from '../components/route-details/RouteDetailMap';

const RouteDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('info');
  const [selectedDay, setSelectedDay] = useState<'mondayToFriday' | 'saturdayAndHoliday' | 'sunday'>('mondayToFriday');
  
  const route = busRoutes.find(r => r.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Rota não encontrada</p>
          <Button asChild>
            <Link to="/rotas">Voltar para rotas</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <RouteDetailHeader route={route} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="border-b">
          <div className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-3 p-0 h-auto">
              <TabsTrigger 
                value="info" 
                className="data-[state=active]:border-b-2 rounded-none border-0 py-4"
                style={{ borderColor: activeTab === 'info' ? route.color : 'transparent' }}
              >
                Informações
              </TabsTrigger>
              <TabsTrigger 
                value="schedule" 
                className="data-[state=active]:border-b-2 rounded-none border-0 py-4"
                style={{ borderColor: activeTab === 'schedule' ? route.color : 'transparent' }}
              >
                Horários
              </TabsTrigger>
              <TabsTrigger 
                value="map" 
                className="data-[state=active]:border-b-2 rounded-none border-0 py-4"
                style={{ borderColor: activeTab === 'map' ? route.color : 'transparent' }}
              >
                Mapa
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="p-4 pb-20">
          <div className="max-w-5xl mx-auto">
            <TabsContent value="info" className="mt-0">
              <RouteDetailInfo route={route} />
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <RouteDetailSchedule 
                route={route} 
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay} 
              />
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <RouteDetailMap routeId={route.id} routeColor={route.color} />
            </TabsContent>
          </div>
        </div>
      </Tabs>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="max-w-5xl mx-auto">
          <Button
            className="w-full"
            style={{ backgroundColor: route.color }}
            asChild
          >
            <Link to="/rotas">
              <Bus size={18} className="mr-2" />
              Ver todas as rotas
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailPage;
