
// Reexportar todos os módulos relacionados a anúncios
export type { Advertisement } from './ads/types';
export { cacheAdsForOffline } from './ads/storage';
export { shouldShowAds, markAdShownForSession } from './ads/display';
export { getRandomAd } from './ads/selection';
export { trackAdImpression, trackAdClick, getAdStats } from './ads/tracking';

// Inicializar o sistema de anúncios
export const initAdSystem = () => {
  // Limpar quaisquer flags de anúncios existentes para testes
  localStorage.removeItem('doNotShowAdsUntil');
  sessionStorage.removeItem('sessionAdShown');
  
  // Cache de anúncios para uso offline
  cacheAdsForOffline();
  
  // Inicializar quaisquer outros recursos necessários
  console.log('Ad system initialized');
};
