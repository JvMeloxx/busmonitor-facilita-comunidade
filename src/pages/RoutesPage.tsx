
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Clock, MapPin, ChevronRight, Star, Bus, Filter } from 'lucide-react';
import { busRoutes } from '../data/busData';
import { Input } from '@/components/ui/input';
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
import { useTheme } from '../context/ThemeContext';

const RoutesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [dayFilter, setDayFilter] = useState<'mondayToFriday' | 'saturdayAndHoliday' | 'sunday'>('mondayToFriday');
  const { company, companyName, companyColor } = useTheme();

  // Filtrar rotas pela empresa selecionada
  const companyRoutes = busRoutes.filter(route => {
    // Se a propriedade company não existir em algumas rotas (para compatibilidade), 
    // vamos atribuir com base na cor para fins de demonstração
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
      // For demo purposes, we're just showing a toast
      console.log("Updated next departure times");
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (routeId: string) => {
    if (favorites.includes(routeId)) {
      setFavorites(favorites.filter(id => id !== routeId));
      toast.info('Removido dos favoritos');
    } else {
      setFavorites([...favorites, routeId]);
      toast.success('Adicionado aos favoritos');
    }
  };

  // Helper to get all times for a specific day and period
  const getScheduleTimes = (route: typeof busRoutes[0], day: 'mondayToFriday' | 'saturdayAndHoliday' | 'sunday') => {
    const schedule = route.schedule[day];
    return {
      morning: schedule.morning,
      afternoon: schedule.afternoon,
      evening: schedule.evening
    };
  };

  // Helper to get the next time for display
  const getNextTime = (route: typeof busRoutes[0]) => {
    return route.nextScheduledTime || 'Não disponível';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-background shadow-md p-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/" className="focus-ring rounded-full p-2">
            <ArrowLeft size={24} />
          </Link>
          
          <h1 className="text-xl font-semibold">
            Rotas e Horários - {companyName}
          </h1>
          
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <div className="p-4 border-b">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Buscar por número ou nome da linha" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>
        </div>
      </div>

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

            <TabsContent value="all" className="space-y-4">
              {filteredRoutes.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Nenhuma linha encontrada para {companyName}. Tente outra busca ou selecione outra empresa.</p>
                </div>
              ) : (
                filteredRoutes.map((route) => (
                  <div key={route.id}>
                    <Link to={`/rotas/${route.id}`}>
                      <Card className="p-4 border-l-4 bg-white hover:shadow-md transition-shadow" style={{ borderLeftColor: route.color }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-white text-sm font-medium px-2 py-1 rounded-md`} style={{ backgroundColor: route.color }}>
                                {route.number}
                              </span>
                              <h3 className="font-semibold text-lg">{route.name}</h3>
                            </div>
                            <p className="text-muted-foreground">{route.description}</p>
                            
                            <div className="flex flex-wrap gap-4 mt-3">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock size={16} className="mr-1" />
                                <span>Próximo: {getNextTime(route)}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin size={16} className="mr-1" />
                                <span>{route.terminal.name}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="rounded-full h-8 w-8"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(route.id);
                              }}
                            >
                              <Star 
                                size={18} 
                                className={favorites.includes(route.id) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} 
                              />
                            </Button>
                            <ChevronRight size={20} className="text-muted-foreground ml-1 mt-1" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <div className="mb-4">
                <Select 
                  defaultValue="mondayToFriday"
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

              {companyRoutes.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Nenhuma linha encontrada para {companyName}.</p>
                </div>
              ) : (
                companyRoutes.map((route) => (
                  <div key={route.id}>
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
                        {/* Morning schedule */}
                        {getScheduleTimes(route, dayFilter).morning.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2 text-sm">Manhã:</h4>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                              {getScheduleTimes(route, dayFilter).morning.map((time, index) => (
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
                        )}
                        
                        {/* Afternoon schedule */}
                        {getScheduleTimes(route, dayFilter).afternoon.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2 text-sm">Tarde:</h4>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                              {getScheduleTimes(route, dayFilter).afternoon.map((time, index) => (
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
                        )}
                        
                        {/* Evening schedule */}
                        {getScheduleTimes(route, dayFilter).evening.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2 text-sm">Noite:</h4>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                              {getScheduleTimes(route, dayFilter).evening.map((time, index) => (
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
                        )}
                        
                        {/* No schedules for this day */}
                        {getScheduleTimes(route, dayFilter).morning.length === 0 && 
                        getScheduleTimes(route, dayFilter).afternoon.length === 0 && 
                        getScheduleTimes(route, dayFilter).evening.length === 0 && (
                          <div className="text-center py-4 text-muted-foreground">
                            Não há horários disponíveis para este dia
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default RoutesPage;
