
import { Advertisement } from './types';
import { getAdsSource } from './storage';
import { shouldShowAds } from './display';

// Obter um anúncio aleatório
export const getRandomAd = (): Advertisement | undefined => {
  if (!shouldShowAds()) {
    return undefined;
  }
  
  const ads = getAdsSource();
  if (ads.length === 0) return undefined;
  
  const now = new Date();
  
  // Filtrar anúncios por data, se aplicável
  const validAds = ads.filter(ad => {
    if (ad.startDate && new Date(ad.startDate) > now) return false;
    if (ad.endDate && new Date(ad.endDate) < now) return false;
    return true;
  });
  
  if (validAds.length === 0) return undefined;
  
  // Priorizar o anúncio do "anel-viario" primeiro
  const anelViarioAd = validAds.find(ad => ad.id === 'anel-viario');
  if (anelViarioAd) return anelViarioAd;
  
  // Como segunda opção, tentar o anúncio "mamae"
  const mamaeAd = validAds.find(ad => ad.id === 'mamae');
  if (mamaeAd) return mamaeAd;
  
  // Priorizar "seu-anuncio-id" como terceira opção
  const seuAnuncio = validAds.find(ad => ad.id === 'seu-anuncio-id');
  if (seuAnuncio) return seuAnuncio;
  
  const randomIndex = Math.floor(Math.random() * validAds.length);
  return validAds[randomIndex];
};
