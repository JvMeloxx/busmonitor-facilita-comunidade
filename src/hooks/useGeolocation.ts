import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface GeolocationState {
  position: GeolocationPosition | null;
  error: GeolocationPositionError | null;
  loading: boolean;
  permission: PermissionState | null;
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
}

export const useGeolocation = (options: UseGeolocationOptions = {}) => {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    loading: false,
    permission: null,
  });

  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 300000, // 5 minutes
    watch = false,
  } = options;

  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      const error = new Error('Geolocation is not supported') as GeolocationPositionError;
      setState(prev => ({ ...prev, error, loading: false }));
      toast.error('Geolocalização não é suportada neste dispositivo');
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    const success = (position: GeolocationPosition) => {
      setState(prev => ({ ...prev, position, loading: false, error: null }));
      toast.success('Localização obtida com sucesso');
    };

    const error = (error: GeolocationPositionError) => {
      setState(prev => ({ ...prev, error, loading: false }));
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          toast.error('Permissão de localização negada');
          break;
        case error.POSITION_UNAVAILABLE:
          toast.error('Localização indisponível');
          break;
        case error.TIMEOUT:
          toast.error('Timeout ao obter localização');
          break;
        default:
          toast.error('Erro desconhecido ao obter localização');
          break;
      }
    };

    const geoOptions: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };

    if (watch) {
      const watchId = navigator.geolocation.watchPosition(success, error, geoOptions);
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      navigator.geolocation.getCurrentPosition(success, error, geoOptions);
    }
  };

  const checkPermission = async () => {
    if ('permissions' in navigator) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        setState(prev => ({ ...prev, permission: permission.state }));
        
        permission.addEventListener('change', () => {
          setState(prev => ({ ...prev, permission: permission.state }));
        });
      } catch (error) {
        console.error('Error checking geolocation permission:', error);
      }
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  const requestLocation = () => {
    getCurrentPosition();
  };

  const clearLocation = () => {
    setState({
      position: null,
      error: null,
      loading: false,
      permission: state.permission,
    });
  };

  return {
    ...state,
    requestLocation,
    clearLocation,
    isSupported: 'geolocation' in navigator,
  };
};