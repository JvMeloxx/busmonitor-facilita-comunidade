
import { loadAdStats, saveAdStats } from './storage';

// Rastrear impressões de anúncios
export const trackAdImpression = (adId: string) => {
  console.log(`Ad impression tracked for ad: ${adId}`);
  
  const stats = loadAdStats();
  if (!stats[adId]) {
    stats[adId] = { impressions: 0, clicks: 0 };
  }
  stats[adId].impressions += 1;
  saveAdStats(stats);
};

// Rastrear cliques em anúncios
export const trackAdClick = (adId: string) => {
  console.log(`Ad click tracked for ad: ${adId}`);
  
  const stats = loadAdStats();
  if (!stats[adId]) {
    stats[adId] = { impressions: 0, clicks: 0 };
  }
  stats[adId].clicks += 1;
  saveAdStats(stats);
};

// Obter estatísticas para todos os anúncios
export const getAdStats = () => {
  return loadAdStats();
};
