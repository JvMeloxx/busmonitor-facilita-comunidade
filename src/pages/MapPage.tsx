
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Bus, Map as MapIcon, ListFilter, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import BusMap from '../components/BusMap';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { busRoutes, recentUpdates } from '../data/busData';

const MapPage = () => {
  const [view, setView] = useState<'map' | 'list'>('map');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Filter routes based on search term
  const filteredRoutes = busRoutes.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    route.number.toString().includes(searchTerm)
  );

  // Show welcome toast on first load
  useEffect(() => {
    if (showIntro) {
      toast.info(
        'Bem-vindo ao mapa de ônibus!',
        {
          description: 'Aqui você pode ver todas as linhas de ônibus disponíveis.',
          duration: 5000,
        }
      );
      setShowIntro(false);
    }
  }, [showIntro]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-background shadow-soft p-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/" className="focus-ring rounded-full p-2">
            <ArrowLeft size={24} />
          </Link>
          
          <h1 className="text-xl font-semibold">Ver Ônibus</h1>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className={`rounded-full ${view === 'map' ? 'bg-accent' : ''}`}
              onClick={() => setView('map')}
            >
              <MapIcon size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={`rounded-full ${view === 'list' ? 'bg-accent' : ''}`}
              onClick={() => setView('list')}
            >
              <Bus size={18} />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 border-b">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Buscar por número ou nome da linha" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-12 w-12"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <ListFilter size={18} />
          </Button>
        </div>
      </div>

      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">
          {view === 'map' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="h-[calc(100vh-220px)] min-h-[400px] rounded-xl overflow-hidden shadow-medium"
            >
              <BusMap selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4"
            >
              <Card className="p-4 bg-bus-blue/10 border-bus-blue/30 shadow-soft">
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-bus-blue rounded-full text-white">
                    <Info size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">Atualizações recentes</h3>
                    <p className="text-sm text-muted-foreground">As informações abaixo são baseadas em contribuições de usuários</p>
                  </div>
                </div>
              </Card>
              
              {filteredRoutes.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Nenhuma linha encontrada. Tente outra busca.</p>
                </div>
              ) : (
                filteredRoutes.map((route, idx) => (
                  <motion.div 
                    key={route.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <Card 
                      className={`card-route border-l-4 bg-white`}
                      style={{ borderLeftColor: route.color }}
                      onClick={() => setSelectedRoute(route.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-white text-sm font-medium px-2 py-1 rounded-md`} style={{ backgroundColor: route.color }}>
                              {route.number}
                            </span>
                            <h3 className="font-semibold text-lg">{route.name}</h3>
                          </div>
                          <p className="text-muted-foreground">{route.description}</p>
                        </div>
                        
                        {recentUpdates.find(update => update.routeId === route.id) && (
                          <div className="bg-bus-green/10 text-bus-green text-sm font-medium px-3 py-1 rounded-full">
                            Atualizado
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Próximo horário: {route.nextScheduledTime}</span>
                          <span>Frequência: {route.frequency}</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
          
          {view === 'map' && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {filteredRoutes.slice(0, 3).map((route) => (
                <button
                  key={route.id}
                  className={`p-3 rounded-lg flex items-center gap-2 border transition-all ${
                    selectedRoute === route.id ? 'bg-accent border-primary' : 'bg-card hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedRoute(route.id)}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: route.color }}
                  ></div>
                  <span className="font-medium">{route.number}</span>
                  <span className="truncate">{route.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MapPage;
