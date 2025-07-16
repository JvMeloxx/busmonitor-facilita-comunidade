import React from 'react';
import { WifiOff, Wifi, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { cn } from '@/lib/utils';

interface OfflineIndicatorProps {
  className?: string;
  showDetails?: boolean;
}

const OfflineIndicator = ({ className, showDetails = false }: OfflineIndicatorProps) => {
  const {
    isOnline,
    isOfflineMode,
    lastOnlineTime,
    queuedActions,
    hasQueuedActions,
    toggleOfflineMode,
    clearQueue,
  } = useOfflineMode();

  if (isOnline && !isOfflineMode && !hasQueuedActions) {
    return null;
  }

  const formatLastOnlineTime = (time: Date | null) => {
    if (!time) return 'Nunca';
    
    const now = new Date();
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `${minutes} min atrás`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    
    const days = Math.floor(hours / 24);
    return `${days}d atrás`;
  };

  return (
    <div className={cn("fixed top-20 right-4 z-50", className)}>
      <div className="bg-white/95 backdrop-blur-sm border rounded-lg shadow-lg p-3 max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {isOnline && !isOfflineMode ? (
              <Wifi size={16} className="text-green-500 mr-2" />
            ) : (
              <WifiOff size={16} className="text-red-500 mr-2" />
            )}
            <span className="font-medium text-sm">
              {isOnline && !isOfflineMode ? 'Online' : 'Offline'}
            </span>
          </div>
          
          {hasQueuedActions && (
            <Badge variant="secondary" className="text-xs">
              <Clock size={12} className="mr-1" />
              {queuedActions.length}
            </Badge>
          )}
        </div>

        {showDetails && (
          <div className="space-y-2 text-xs text-muted-foreground">
            {!isOnline && (
              <div className="flex items-center">
                <AlertTriangle size={12} className="text-amber-500 mr-1" />
                <span>Sem conexão com a internet</span>
              </div>
            )}
            
            {lastOnlineTime && (
              <div>
                Última conexão: {formatLastOnlineTime(lastOnlineTime)}
              </div>
            )}
            
            {hasQueuedActions && (
              <div>
                {queuedActions.length} ação(ões) aguardando sincronização
              </div>
            )}
          </div>
        )}

        {showDetails && (
          <div className="flex gap-2 mt-3">
            {isOnline && (
              <Button
                size="sm"
                variant="outline"
                onClick={toggleOfflineMode}
                className="text-xs"
              >
                {isOfflineMode ? 'Sair do modo offline' : 'Modo offline'}
              </Button>
            )}
            
            {hasQueuedActions && (
              <Button
                size="sm"
                variant="ghost"
                onClick={clearQueue}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Limpar fila
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;