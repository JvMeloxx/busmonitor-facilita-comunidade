
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Zap, MapPin } from 'lucide-react';
import { useTheme, CompanyType } from '../context/ThemeContext';
import { Button } from '@/components/ui/button';

const CompanySelectionPage = () => {
  const navigate = useNavigate();
  const { setCompany } = useTheme();

  const companies = [
    {
      id: 'tarifeZero',
      name: 'Tarifa Zero',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      icon: <Zap size={40} />,
      description: 'Transporte público gratuito'
    },
    {
      id: 'ctExpresso',
      name: 'CT Expresso',
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
      icon: <Bus size={40} />,
      description: 'Conectando todas as regiões'
    },
    {
      id: 'catedral',
      name: 'Catedral (Kandango)',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      icon: <MapPin size={40} />,
      description: 'Transporte rápido e eficiente'
    }
  ];

  const handleCompanySelect = (companyId: CompanyType) => {
    setCompany(companyId);
    navigate('/mapa');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent/30 p-6">
      <header className="mb-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 bg-primary/10 rounded-full"></div>
            <Bus size={60} className="text-primary z-10" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">BusAqui</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Selecione uma empresa de ônibus para começar
        </p>
      </header>

      <main className="w-full max-w-xl">
        <div className="space-y-4">
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => handleCompanySelect(company.id as CompanyType)}
              className={`w-full p-6 ${company.color} ${company.hoverColor} text-white rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center`}
            >
              <div className="p-3 bg-white/20 rounded-full mr-4">
                {company.icon}
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold">{company.name}</h2>
                <p className="text-white/80">{company.description}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
      
      <footer className="mt-12 text-center text-muted-foreground">
        <p>© 2023 BusAqui - Conectando cidadãos aos ônibus de Luziânia</p>
      </footer>
    </div>
  );
};

export default CompanySelectionPage;
