
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, ChevronRight, Star, Bus, PlusCircle } from 'lucide-react';
import { busRoutes, recentUpdates } from '../data/busData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const FavoritesPage = () => {
  // In a real app, you'd store favorites in localStorage or a database
  const [favorites, setFavorites] = useState<string[]>([
    // Default favorites for demo
    busRoutes[0].id,
    busRoutes[2].id
  ]);

  const favoriteRoutes = busRoutes.filter(route => favorites.includes(route.id));

  const toggleFavorite = (routeId: string) => {
    if (favorites.includes(routeId)) {
      setFavorites(favorites.filter(id => id !== routeId));
      toast.info('Removido dos favoritos');
    } else {
      setFavorites([...favorites, routeId]);
      toast.success('Adicionado aos favoritos');
    }
  };

  // Simulated real-time updates
  const [lastUpdates, setLastUpdates] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    // In a real app, this would come from a real-time database
    const updates = recentUpdates.reduce((acc, update) => {
      if (favorites.includes(update.routeId)) {
        acc[update.routeId] = update.status;
      }
      return acc;
    }, {} as {[key: string]: string});
    
    setLastUpdates(updates);
  }, [favorites]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-background shadow-soft p-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/" className="focus-ring rounded-full p-2">
            <ArrowLeft size={24} />
          </Link>
          
          <h1 className="text-xl font-semibold">Meus Favoritos</h1>
          
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">
          {favorites.length === 0 ? (
            <div className="text-center py-10">
              <div className="bg-accent w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={32} className="text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Nenhum favorito ainda</h2>
              <p className="text-muted-foreground mb-6">
                Adicione suas linhas favoritas para acessá-las rapidamente.
              </p>
              <Button asChild>
                <Link to="/rotas">
                  <PlusCircle size={18} className="mr-2" />
                  Adicionar favoritos
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Linhas favoritas</h2>
                <p className="text-muted-foreground">
                  Acesse rapidamente informações sobre suas linhas preferidas
                </p>
              </div>
              
              <div className="space-y-4">
                {favoriteRoutes.map((route, idx) => (
                  <motion.div 
                    key={route.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <Link to={`/rotas/${route.id}`}>
                      <Card className="card-route border-l-4 bg-white" style={{ borderLeftColor: route.color }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-white text-sm font-medium px-2 py-1 rounded-md`} style={{ backgroundColor: route.color }}>
                                {route.number}
                              </span>
                              <h3 className="font-semibold text-lg">{route.name}</h3>
                            </div>
                            
                            {lastUpdates[route.id] && (
                              <div className="mb-2 bg-bus-green/10 text-bus-green inline-block text-sm font-medium px-2 py-1 rounded-md">
                                <Bus size={14} className="inline mr-1" />
                                {lastUpdates[route.id]}
                              </div>
                            )}
                            
                            <div className="flex flex-wrap gap-4 mt-1">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock size={16} className="mr-1" />
                                <span>Próximo: {route.nextScheduledTime}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin size={16} className="mr-1" />
                                <span>{route.stops.length} paradas</span>
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
                                className="fill-yellow-400 text-yellow-400" 
                              />
                            </Button>
                            <ChevronRight size={20} className="text-muted-foreground ml-1 mt-1" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/rotas">
                    <PlusCircle size={18} className="mr-2" />
                    Gerenciar favoritos
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;
