
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Map, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();
  const [logoLoaded, setLogoLoaded] = useState(false);

  const mainButtons = [
    {
      title: 'Ver Ônibus',
      description: 'Consulte rotas e horários dos ônibus',
      icon: <Bus size={28} />,
      color: 'bg-bus-blue',
      route: '/mapa'
    },
    {
      title: 'Contribuir',
      description: 'Informe a localização de um ônibus',
      icon: <Users size={28} />,
      color: 'bg-bus-green',
      route: '/contribuir'
    },
    {
      title: 'Rotas',
      description: 'Lista completa de linhas e horários',
      icon: <Map size={28} />,
      color: 'bg-bus-purple',
      route: '/rotas'
    },
    {
      title: 'Favoritos',
      description: 'Acesse suas linhas preferidas',
      icon: <Star size={28} />,
      color: 'bg-bus-orange',
      route: '/favoritos'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-8 bg-gradient-to-b from-background to-accent/30">
      <header className="w-full max-w-4xl flex flex-col items-center mb-6 md:mb-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="relative mb-4"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 bg-primary/10 rounded-full animate-pulse-soft"></div>
            <Bus size={48} className="text-primary z-10" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl-plus md:text-4xl font-bold text-center mb-2"
        >
          BusAqui
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-center text-muted-foreground max-w-md mx-auto"
        >
          Monitoramento colaborativo de ônibus em Luziânia
        </motion.p>
      </header>

      <main className="w-full max-w-4xl flex-1">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {mainButtons.map((button, index) => (
            <motion.div
              key={button.title}
              variants={item}
              className="w-full"
              onClick={() => navigate(button.route)}
            >
              <div 
                className={`flex flex-col items-start justify-between p-6 md:p-8 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 cursor-pointer h-full ${button.color} text-white`}
              >
                <div className="mb-6 p-3 rounded-full bg-white/20">
                  {button.icon}
                </div>
                
                <div>
                  <h2 className="text-2xl-plus font-semibold mb-2">{button.title}</h2>
                  <p className="text-white/90">{button.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="w-full max-w-4xl mt-10 py-4 text-center text-muted-foreground">
        <p>© 2023 BusAqui - Conectando cidadãos aos ônibus gratuitos de Luziânia</p>
      </footer>
    </div>
  );
};

export default Index;
