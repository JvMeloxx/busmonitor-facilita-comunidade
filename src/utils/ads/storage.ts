
import { Advertisement, CACHED_ADS_KEY, AD_STATS_KEY } from './types';
import { sampleAds } from './sampleData';

// Cache de anúncios para uso offline
export const cacheAdsForOffline = () => {
  localStorage.setItem(CACHED_ADS_KEY, JSON.stringify(sampleAds));
};

// Obter anúncios do cache ou padrão
export const getAdsSource = (): Advertisement[] => {
  const cachedAds = localStorage.getItem(CACHED_ADS_KEY);
  if (cachedAds) {
    return JSON.parse(cachedAds);
  }
  return sampleAds;
};

// Carregar estatísticas de anúncios do localStorage
export const loadAdStats = (): Record<string, { impressions: number, clicks: number }> => {
  const stats = localStorage.getItem(AD_STATS_KEY);
  return stats ? JSON.parse(stats) : {};
};

// Salvar estatísticas de anúncios no localStorage
export const saveAdStats = (stats: Record<string, { impressions: number, clicks: number }>) => {
  localStorage.setItem(AD_STATS_KEY, JSON.stringify(stats));
};
