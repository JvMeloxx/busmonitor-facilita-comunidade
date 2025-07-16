import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { cacheManager } from '../utils/cacheManager';

interface OfflineState {
  isOnline: boolean;
  isOfflineMode: boolean;
  lastOnlineTime: Date | null;
  queuedActions: QueuedAction[];
}

interface QueuedAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  retryCount: number;
}

export const useOfflineMode = () => {
  const [state, setState] = useState<OfflineState>({
    isOnline: navigator.onLine,
    isOfflineMode: false,
    lastOnlineTime: navigator.onLine ? new Date() : null,
    queuedActions: [],
  });

  // Load queued actions from cache on initialization
  useEffect(() => {
    const cachedActions = cacheManager.get<QueuedAction[]>('queued_actions') || [];
    setState(prev => ({ ...prev, queuedActions: cachedActions }));
  }, []);

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => {
      console.log('App is back online');
      setState(prev => ({
        ...prev,
        isOnline: true,
        lastOnlineTime: new Date(),
      }));
      
      toast.success('Conexão restaurada! Sincronizando dados...');
      processQueuedActions();
    };

    const handleOffline = () => {
      console.log('App is offline');
      setState(prev => ({
        ...prev,
        isOnline: false,
        isOfflineMode: true,
      }));
      
      toast.warning('Você está offline. Algumas funcionalidades podem estar limitadas.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Process queued actions when back online
  const processQueuedActions = async () => {
    const { queuedActions } = state;
    
    if (queuedActions.length === 0) return;

    console.log(`Processing ${queuedActions.length} queued actions`);
    
    const processedActions: string[] = [];
    const failedActions: QueuedAction[] = [];

    for (const action of queuedActions) {
      try {
        await processAction(action);
        processedActions.push(action.id);
        console.log(`Successfully processed action: ${action.type}`);
      } catch (error) {
        console.error(`Failed to process action ${action.type}:`, error);
        
        // Retry logic
        if (action.retryCount < 3) {
          failedActions.push({
            ...action,
            retryCount: action.retryCount + 1,
          });
        } else {
          console.error(`Action ${action.type} failed after 3 retries, discarding`);
        }
      }
    }

    // Update state and cache
    const remainingActions = failedActions;
    setState(prev => ({ ...prev, queuedActions: remainingActions }));
    cacheManager.set('queued_actions', remainingActions);

    if (processedActions.length > 0) {
      toast.success(`${processedActions.length} ações sincronizadas com sucesso`);
    }

    if (failedActions.length > 0) {
      toast.warning(`${failedActions.length} ações falharam na sincronização`);
    }
  };

  // Process individual action
  const processAction = async (action: QueuedAction): Promise<void> => {
    switch (action.type) {
      case 'favorite_route':
        // Process favorite route action
        console.log('Processing favorite route action:', action.data);
        break;
      case 'report_issue':
        // Process issue report action
        console.log('Processing issue report action:', action.data);
        break;
      case 'user_feedback':
        // Process user feedback action
        console.log('Processing user feedback action:', action.data);
        break;
      default:
        console.warn(`Unknown action type: ${action.type}`);
    }
  };

  // Queue an action for later processing
  const queueAction = (type: string, data: any) => {
    const action: QueuedAction = {
      id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      data,
      timestamp: Date.now(),
      retryCount: 0,
    };

    const updatedActions = [...state.queuedActions, action];
    setState(prev => ({ ...prev, queuedActions: updatedActions }));
    cacheManager.set('queued_actions', updatedActions);

    toast.info('Ação salva para sincronização quando voltar online');
    console.log(`Queued action: ${type}`, action);
  };

  // Clear all queued actions
  const clearQueue = () => {
    setState(prev => ({ ...prev, queuedActions: [] }));
    cacheManager.remove('queued_actions');
    toast.success('Fila de sincronização limpa');
  };

  // Toggle offline mode manually
  const toggleOfflineMode = () => {
    setState(prev => ({ ...prev, isOfflineMode: !prev.isOfflineMode }));
    
    if (!state.isOfflineMode) {
      toast.info('Modo offline ativado');
    } else {
      toast.info('Modo offline desativado');
    }
  };

  // Get offline data
  const getOfflineData = (key: string) => {
    return cacheManager.get(key);
  };

  // Save data for offline use
  const saveOfflineData = (key: string, data: any, ttl?: number) => {
    cacheManager.set(key, data, { ttl });
  };

  // Check if specific feature is available offline
  const isFeatureAvailableOffline = (feature: string): boolean => {
    const offlineFeatures = [
      'view_routes',
      'view_schedules',
      'view_cached_stops',
      'favorites',
    ];
    
    return offlineFeatures.includes(feature);
  };

  return {
    ...state,
    queueAction,
    clearQueue,
    toggleOfflineMode,
    getOfflineData,
    saveOfflineData,
    isFeatureAvailableOffline,
    hasQueuedActions: state.queuedActions.length > 0,
  };
};