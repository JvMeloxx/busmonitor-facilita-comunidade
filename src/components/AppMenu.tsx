
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, MapPin, User, Star, Settings, Info, Map, X } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  { 
    icon: Map, 
    label: 'Ver Ônibus', 
    path: '/',
    color: 'text-blue-600',
    description: 'Mapa com rotas e localizações'
  },
  { 
    icon: User, 
    label: 'Contribuir', 
    path: '/contribuir',
    color: 'text-green-600',
    description: 'Informe a localização de um ônibus'
  },
  { 
    icon: Bus, 
    label: 'Rotas', 
    path: '/rotas',
    color: 'text-purple-600',
    description: 'Lista completa de linhas e horários'
  },
  { 
    icon: Star, 
    label: 'Favoritos', 
    path: '/favoritos',
    color: 'text-orange-500',
    description: 'Suas linhas preferidas'
  },
  { 
    icon: Settings, 
    label: 'Configurações', 
    path: '/configuracoes',
    color: 'text-gray-600',
    description: 'Ajustes e preferências'
  },
  { 
    icon: Info, 
    label: 'Sobre o App', 
    path: '/sobre',
    color: 'text-teal-600',
    description: 'Informações e suporte'
  }
];

interface AppMenuProps {
  className?: string;
}

const AppMenu = ({ className }: AppMenuProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string, onClose: () => void) => {
    navigate(path);
    onClose();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={cn("rounded-full shadow-md bg-white", className)}
        >
          <div className="w-6 h-0.5 bg-gray-700 mb-1.5" />
          <div className="w-6 h-0.5 bg-gray-700 mb-1.5" />
          <div className="w-6 h-0.5 bg-gray-700" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] sm:w-[385px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl flex items-center">
            <Bus className="mr-2 text-primary" />
            BusAqui
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {menuItems.map((item, index) => (
            <SheetClose key={item.path} asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg h-16 px-4"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.path, () => {});
                }}
              >
                <div className="flex items-center">
                  <div className={cn("mr-4", item.color)}>
                    <item.icon size={24} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.description}</span>
                  </div>
                </div>
              </Button>
            </SheetClose>
          ))}
        </div>
        <div className="mt-auto text-center text-sm text-muted-foreground pt-6 border-t">
          <p>BusAqui &copy; 2023</p>
          <p>Conectando cidadãos ao transporte gratuito</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppMenu;
