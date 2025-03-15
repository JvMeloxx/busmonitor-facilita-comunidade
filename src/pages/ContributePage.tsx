
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bus, MapPin, AlertTriangle, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { busRoutes } from '../data/busData';
import { toast } from 'sonner';

interface BusOption {
  id: string;
  number: number;
  name: string;
  color: string;
  selected: boolean;
}

interface IssueType {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  selected: boolean;
}

const ContributePage = () => {
  const [selectedTab, setSelectedTab] = useState('on-bus');
  const [busOptions, setBusOptions] = useState<BusOption[]>(
    busRoutes.map(route => ({
      id: route.id,
      number: route.number,
      name: route.name,
      color: route.color,
      selected: false
    }))
  );
  
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([
    { 
      id: 'delay', 
      icon: <Clock size={24} />, 
      label: 'Atrasado', 
      color: 'bg-bus-yellow text-black',
      selected: false 
    },
    { 
      id: 'full', 
      icon: <Bus size={24} />, 
      label: 'Lotado', 
      color: 'bg-bus-orange text-white',
      selected: false 
    },
    { 
      id: 'breakdown', 
      icon: <AlertTriangle size={24} />, 
      label: 'Quebrado', 
      color: 'bg-bus-red text-white',
      selected: false 
    },
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectBus = (id: string) => {
    setBusOptions(busOptions.map(bus => ({
      ...bus,
      selected: bus.id === id ? !bus.selected : bus.selected
    })));
  };

  const handleSelectIssue = (id: string) => {
    setIssueTypes(issueTypes.map(issue => ({
      ...issue,
      selected: issue.id === id ? !issue.selected : issue.selected
    })));
  };

  const handleSubmit = () => {
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setShowConfirmation(true);
      setSubmitting(false);
      
      // Show success toast
      toast.success('Contribuição enviada!', {
        description: 'Obrigado por ajudar a comunidade.',
        duration: 5000,
      });
    }, 1000);
  };

  const handleReset = () => {
    setBusOptions(busOptions.map(bus => ({ ...bus, selected: false })));
    setIssueTypes(issueTypes.map(issue => ({ ...issue, selected: false })));
    setShowConfirmation(false);
  };

  const selectedBuses = busOptions.filter(bus => bus.selected);
  const selectedIssues = issueTypes.filter(issue => issue.selected);
  const canSubmit = selectedBuses.length > 0 && (selectedTab !== 'report-issue' || selectedIssues.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-background shadow-soft p-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link to="/" className="focus-ring rounded-full p-2">
            <ArrowLeft size={24} />
          </Link>
          
          <h1 className="text-xl font-semibold">Contribuir</h1>
          
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">
          {!showConfirmation ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <Card className="p-5 bg-bus-blue/10 border-bus-blue/30">
                  <h2 className="text-xl font-semibold mb-2">Contribua com informações</h2>
                  <p className="text-muted-foreground">
                    Suas contribuições ajudam outras pessoas a se planejarem melhor. 
                    Selecione um tipo de contribuição abaixo.
                  </p>
                </Card>
              </motion.div>

              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="on-bus" className="text-base py-3">
                    <Bus size={18} className="mr-2" />
                    Estou no ônibus
                  </TabsTrigger>
                  <TabsTrigger value="saw-bus" className="text-base py-3">
                    <MapPin size={18} className="mr-2" />
                    Vi o ônibus
                  </TabsTrigger>
                  <TabsTrigger value="report-issue" className="text-base py-3">
                    <AlertTriangle size={18} className="mr-2" />
                    Reportar problema
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="on-bus" className="space-y-4">
                  <h3 className="text-lg font-medium mb-3">Selecione em qual ônibus você está:</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {busOptions.map((bus, index) => (
                      <motion.div
                        key={bus.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <button
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            bus.selected 
                            ? 'border-2 border-primary bg-primary/5 shadow-medium' 
                            : 'border-border bg-card hover:bg-accent/50'
                          }`}
                          onClick={() => handleSelectBus(bus.id)}
                        >
                          <div className="flex items-center">
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3`}
                              style={{ backgroundColor: bus.color }}
                            >
                              {bus.number}
                            </div>
                            <div>
                              <h4 className="font-medium">{bus.name}</h4>
                              <p className="text-sm text-muted-foreground">Linha {bus.number}</p>
                            </div>
                            {bus.selected && (
                              <Check className="ml-auto text-primary" size={20} />
                            )}
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="saw-bus" className="space-y-4">
                  <h3 className="text-lg font-medium mb-3">Selecione o ônibus que você viu passar:</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {busOptions.map((bus, index) => (
                      <motion.div
                        key={bus.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <button
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            bus.selected 
                            ? 'border-2 border-primary bg-primary/5 shadow-medium' 
                            : 'border-border bg-card hover:bg-accent/50'
                          }`}
                          onClick={() => handleSelectBus(bus.id)}
                        >
                          <div className="flex items-center">
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3`}
                              style={{ backgroundColor: bus.color }}
                            >
                              {bus.number}
                            </div>
                            <div>
                              <h4 className="font-medium">{bus.name}</h4>
                              <p className="text-sm text-muted-foreground">Linha {bus.number}</p>
                            </div>
                            {bus.selected && (
                              <Check className="ml-auto text-primary" size={20} />
                            )}
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="report-issue" className="space-y-4">
                  <h3 className="text-lg font-medium mb-3">Selecione o ônibus com problema:</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {busOptions.map((bus, index) => (
                      <motion.div
                        key={bus.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <button
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            bus.selected 
                            ? 'border-2 border-primary bg-primary/5 shadow-medium' 
                            : 'border-border bg-card hover:bg-accent/50'
                          }`}
                          onClick={() => handleSelectBus(bus.id)}
                        >
                          <div className="flex items-center">
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3`}
                              style={{ backgroundColor: bus.color }}
                            >
                              {bus.number}
                            </div>
                            <div>
                              <h4 className="font-medium">{bus.name}</h4>
                              <p className="text-sm text-muted-foreground">Linha {bus.number}</p>
                            </div>
                            {bus.selected && (
                              <Check className="ml-auto text-primary" size={20} />
                            )}
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {selectedBuses.length > 0 && (
                    <>
                      <h3 className="text-lg font-medium mb-3">Qual é o problema?</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {issueTypes.map((issue, index) => (
                          <motion.div
                            key={issue.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                          >
                            <button
                              className={`w-full p-4 rounded-xl border transition-all ${
                                issue.selected 
                                ? 'border-2 border-primary bg-primary/5 shadow-medium' 
                                : 'border-border bg-card hover:bg-accent/50'
                              }`}
                              onClick={() => handleSelectIssue(issue.id)}
                            >
                              <div className="flex flex-col items-center justify-center">
                                <div className={`w-12 h-12 ${issue.color} rounded-full flex items-center justify-center mb-2`}>
                                  {issue.icon}
                                </div>
                                <h4 className="font-medium">{issue.label}</h4>
                              </div>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>

              <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
                <div className="max-w-5xl mx-auto">
                  <Button 
                    className="w-full btn-large"
                    disabled={!canSubmit || submitting}
                    onClick={handleSubmit}
                  >
                    {submitting ? (
                      <>Enviando...</>
                    ) : (
                      <>Enviar contribuição</>
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center text-center p-6"
            >
              <div className="w-20 h-20 bg-bus-green/20 rounded-full flex items-center justify-center mb-6">
                <Check className="text-bus-green" size={40} />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Obrigado pela sua contribuição!</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Sua informação ajudará outras pessoas a se planejarem melhor.
              </p>
              
              <Card className="w-full max-w-md p-5 mb-6">
                <h3 className="font-medium mb-3">Resumo da contribuição:</h3>
                
                {selectedBuses.map(bus => (
                  <div key={bus.id} className="flex items-center mb-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mr-3"
                      style={{ backgroundColor: bus.color }}
                    >
                      {bus.number}
                    </div>
                    <div>
                      <p className="font-medium">{bus.name}</p>
                    </div>
                  </div>
                ))}
                
                {selectedTab === 'on-bus' && (
                  <p className="ml-11 text-muted-foreground">
                    Você informou que está neste ônibus
                  </p>
                )}
                
                {selectedTab === 'saw-bus' && (
                  <p className="ml-11 text-muted-foreground">
                    Você informou que viu este ônibus passar
                  </p>
                )}
                
                {selectedTab === 'report-issue' && selectedIssues.map(issue => (
                  <div key={issue.id} className="ml-11 mt-2 flex items-center">
                    <div className={`w-6 h-6 ${issue.color} rounded-full flex items-center justify-center mr-2`}>
                      {React.cloneElement(issue.icon as React.ReactElement, { size: 14 })}
                    </div>
                    <p className="text-muted-foreground">
                      Você reportou: {issue.label}
                    </p>
                  </div>
                ))}
              </Card>
              
              <div className="flex gap-4 w-full max-w-md">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleReset}
                >
                  Nova contribuição
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => window.location.href = '/'}
                >
                  Voltar ao início
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ContributePage;
