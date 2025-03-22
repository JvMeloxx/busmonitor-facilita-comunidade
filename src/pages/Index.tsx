
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Map, Star } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const mainButtons = [
    // "Ver Ônibus" button removed temporarily
    {
      title: 'Rotas',
      description: 'Lista completa de linhas e horários',
      icon: <Map size={28} />,
      color: 'bg-purple-600',
      route: '/rotas'
    },
    {
      title: 'Favoritos',
      description: 'Acesse suas linhas preferidas',
      icon: <Star size={28} />,
      color: 'bg-orange-500',
      route: '/favoritos'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-8 bg-gradient-to-b from-background to-accent/30">
      <header className="w-full max-w-4xl flex flex-col items-center mb-6 md:mb-12">
        <div className="relative mb-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 bg-primary/10 rounded-full"></div>
            <Bus size={48} className="text-primary z-10" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          BusAqui
        </h1>
        
        <p className="text-xl text-center text-muted-foreground max-w-md mx-auto">
          Monitoramento colaborativo de ônibus em Luziânia
        </p>
      </header>

      <main className="w-full max-w-4xl flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {mainButtons.map((button, index) => (
            <div
              key={button.title}
              className="w-full"
              onClick={() => navigate(button.route)}
            >
              <div 
                className={`flex flex-col items-start justify-between p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-full ${button.color} text-white`}
              >
                <div className="mb-6 p-3 rounded-full bg-white/20">
                  {button.icon}
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{button.title}</h2>
                  <p className="text-white/90">{button.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full max-w-4xl mt-10 py-4 text-center text-muted-foreground">
        <p>© 2023 BusAqui - Conectando cidadãos aos ônibus gratuitos de Luziânia</p>
      </footer>
    </div>
  );
};

export default Index;
