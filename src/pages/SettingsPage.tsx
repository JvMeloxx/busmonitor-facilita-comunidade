
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Eye, BellRing, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const SettingsPage = () => {
  const handleToggle = () => {
    toast.success('Configuração salva');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-background shadow-md p-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/" className="focus-ring rounded-full p-2">
            <ArrowLeft size={24} />
          </Link>
          
          <h1 className="text-xl font-semibold">Configurações</h1>
          
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Sun className="mr-2 text-orange-500" size={20} />
              Aparência
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme">Tema escuro</Label>
                  <p className="text-sm text-muted-foreground">Ative o modo noturno para diminuir o brilho</p>
                </div>
                <Switch id="theme" onCheckedChange={handleToggle} />
              </div>
              
              <Separator />
              
              <div>
                <Label className="mb-2 block">Tamanho da fonte</Label>
                <RadioGroup defaultValue="medium">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small">Pequena</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Média</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="large" />
                    <Label htmlFor="large">Grande</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Eye className="mr-2 text-blue-500" size={20} />
              Acessibilidade
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="contrast">Alto contraste</Label>
                  <p className="text-sm text-muted-foreground">Aumentar contraste para melhor visualização</p>
                </div>
                <Switch id="contrast" onCheckedChange={handleToggle} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reduce-motion">Reduzir movimento</Label>
                  <p className="text-sm text-muted-foreground">Limitar animações e transições</p>
                </div>
                <Switch id="reduce-motion" onCheckedChange={handleToggle} />
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <BellRing className="mr-2 text-green-500" size={20} />
              Notificações
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="favorites">Alertas de favoritos</Label>
                  <p className="text-sm text-muted-foreground">Receber alertas sobre linhas favoritas</p>
                </div>
                <Switch id="favorites" onCheckedChange={handleToggle} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="updates">Alertas de atualizações</Label>
                  <p className="text-sm text-muted-foreground">Receber alertas sobre novas versões</p>
                </div>
                <Switch id="updates" onCheckedChange={handleToggle} />
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <Languages className="mr-2 text-purple-500" size={20} />
              Idioma
            </h2>
            
            <RadioGroup defaultValue="pt-br">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pt-br" id="pt-br" />
                <Label htmlFor="pt-br">Português (Brasil)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="en" />
                <Label htmlFor="en">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="es" id="es" />
                <Label htmlFor="es">Español</Label>
              </div>
            </RadioGroup>
          </Card>
          
          <p className="text-center text-sm text-muted-foreground py-4">
            BusAqui • Versão 1.0.0
          </p>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
