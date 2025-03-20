
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Bus, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { busRoutes, recentUpdates } from '../data/busData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import RouteMap from '../components/RouteMap';

const RouteDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [selectedDay, setSelectedDay] = useState<'mondayToFriday' | 'saturdayAndHoliday' | 'sunday'>('mondayToFriday');
  
  const route = busRoutes.find(r => r.id === id);
  
  useEffect(() => {
    // Scroll to top when route changes
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
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success('Adicionado aos favoritos');
    } else {
      toast.info('Removido dos favoritos');
    }
  };
  
  const recentUpdate = recentUpdates.find(update => update.routeId === route.id);

  // Helper to check if schedule is empty for a given day
  const isScheduleEmpty = (day: 'mondayToFriday' | 'saturdayAndHoliday' | 'sunday') => {
    return (
      route.schedule[day].morning.length === 0 &&
      route.schedule[day].afternoon.length === 0 &&
      route.schedule[day].evening.length === 0
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header 
        className="sticky top-0 z-10 p-4 shadow-md"
        style={{ backgroundColor: `${route.color}` }}
      >
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/rotas" className="focus-ring rounded-full p-2 bg-white/20 backdrop-blur-sm text-white">
            <ArrowLeft size={24} />
          </Link>
          
          <div className="text-center">
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-2 py-1 rounded-md">
              Linha {route.number}
            </span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-white/20 backdrop-blur-sm text-white"
            onClick={toggleFavorite}
          >
            <Star size={20} className={isFavorite ? "fill-white" : ""} />
          </Button>
        </div>
      </header>

      <div className="bg-white p-4" style={{ borderBottom: `4px solid ${route.color}` }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">{route.name}</h1>
          <p className="text-muted-foreground">{route.description}</p>
          
          {recentUpdate && (
            <div className="mt-3 mb-1 bg-green-100 text-green-700 inline-block text-sm font-medium px-2 py-1 rounded-md">
              <Bus size={14} className="inline mr-1" />
              {recentUpdate.status}
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center text-sm">
              <Clock size={16} className="mr-1 text-muted-foreground" />
              <span>Próximo: <strong>{route.nextScheduledTime}</strong></span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin size={16} className="mr-1 text-muted-foreground" />
              <span><strong>{route.terminal.name}</strong></span>
            </div>
          </div>
        </div>
      </div>

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
              <div>
                <Card className="p-4 mb-6">
                  <h2 className="text-lg font-semibold mb-2">Sobre esta linha</h2>
                  <p className="text-muted-foreground">
                    Esta é a linha {route.number} - {route.name} que opera a partir do {route.terminal.name}.
                  </p>
                </Card>
                
                <h2 className="text-lg font-semibold mb-3">Pontos de parada</h2>
                
                <div className="space-y-1">
                  {route.stops.map((stop, index) => (
                    <div 
                      key={index}
                      className="flex items-start p-3 rounded-lg"
                      style={{ backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white' }}
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mr-3 shrink-0"
                        style={{ backgroundColor: route.color }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium">{stop.name}</h3>
                        <p className="text-sm text-muted-foreground">{stop.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <div>
                <Card className="p-4 mb-6 bg-blue-100 border-blue-300">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-blue-600 rounded-full text-white">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium">Selecione o dia</h3>
                      <Select 
                        defaultValue="mondayToFriday"
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
                    {/* Morning times */}
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
                    
                    {/* Afternoon times */}
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
                    
                    {/* Evening times */}
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
                      <div className="flex gap-2 items-start">
                        <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
                        <p className="text-sm">Gratuito para todos os cidadãos. Basta embarcar!</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <div className="h-[calc(100vh-220px)] min-h-[400px]">
                <RouteMap routeId={route.id} routeColor={route.color} />
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="max-w-5xl mx-auto flex gap-3">
          <Button
            variant="outline"
            className="w-1/2"
            asChild
          >
            <Link to="/contribuir">
              <MapPin size={18} className="mr-2" />
              Vi este ônibus
            </Link>
          </Button>
          <Button
            className="w-1/2"
            style={{ backgroundColor: route.color }}
            asChild
          >
            <Link to="/contribuir">
              <Bus size={18} className="mr-2" />
              Estou neste ônibus
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailPage;
