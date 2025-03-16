
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bus, Phone, Mail, HelpCircle, BookOpen, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-background shadow-md p-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/" className="focus-ring rounded-full p-2">
            <ArrowLeft size={24} />
          </Link>
          
          <h1 className="text-xl font-semibold">Sobre o App</h1>
          
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
              <Bus size={36} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold">BusAqui</h1>
            <p className="text-muted-foreground mt-1">Versão 1.0.0</p>
          </div>
          
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-3">Sobre o BusAqui</h2>
            <p className="text-muted-foreground">
              O BusAqui é um aplicativo colaborativo que ajuda os cidadãos de Luziânia
              a monitorar e compartilhar informações sobre os ônibus gratuitos da cidade.
              Nosso objetivo é melhorar a experiência de transporte público através da
              colaboração da comunidade.
            </p>
          </Card>
          
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-3 flex items-center">
              <HelpCircle size={20} className="mr-2 text-blue-500" />
              Como funciona
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">1.</strong> Visualize as rotas de ônibus no mapa da cidade
              </p>
              <p>
                <strong className="text-foreground">2.</strong> Contribua informando a localização dos ônibus
              </p>
              <p>
                <strong className="text-foreground">3.</strong> Consulte horários e pontos de parada
              </p>
              <p>
                <strong className="text-foreground">4.</strong> Salve suas linhas favoritas para acesso rápido
              </p>
            </div>
          </Card>
          
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-3 flex items-center">
              <BookOpen size={20} className="mr-2 text-green-500" />
              Termos de Uso
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Ao utilizar o BusAqui, você concorda com nossos termos de uso e política de privacidade.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-xs">Termos de Uso</Button>
              <Button variant="outline" size="sm" className="text-xs">Política de Privacidade</Button>
            </div>
          </Card>
          
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-3 flex items-center">
              <MessageSquare size={20} className="mr-2 text-orange-500" />
              Contato
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-muted-foreground" />
                <span className="text-sm">contato@busaqui.com.br</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-muted-foreground" />
                <span className="text-sm">(61) 9999-9999</span>
              </div>
            </div>
          </Card>
          
          <div className="text-center py-4">
            <p className="flex items-center justify-center text-sm text-muted-foreground">
              Feito com <Heart size={14} className="mx-1 text-red-500" /> em Luziânia
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              &copy; 2023 BusAqui - Todos os direitos reservados
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
