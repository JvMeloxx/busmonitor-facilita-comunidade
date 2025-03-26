
import { Advertisement } from './types';
import { getAdsSource } from './storage';
import { shouldShowAds } from './display';

// Obter um anúncio aleatório
export const getRandomAd = (): Advertisement | undefined => {
  if (!shouldShowAds()) {
    console.log('Ads disabled for this session');
    return undefined;
  }
  
  const ads = getAdsSource();
  if (ads.length === 0) {
    console.log('No ads available');
    return undefined;
  }
  
  const now = new Date();
  
  // Filtrar anúncios por data, se aplicável
  const validAds = ads.filter(ad => {
    if (ad.startDate && new Date(ad.startDate) > now) return false;
    if (ad.endDate && new Date(ad.endDate) < now) return false;
    
    // Verificar se a URL é válida (não vazia)
    if (!ad.url || ad.url.trim() === '') return false;
    
    return true;
  });
  
  if (validAds.length === 0) {
    console.log('No valid ads available');
    return undefined;
  }
  
  // Priorizar o anúncio "mamae" primeiro
  const mamaeAd = validAds.find(ad => ad.id === 'mamae');
  if (mamaeAd) {
    console.log('Selected mamae ad:', mamaeAd);
    return mamaeAd;
  }
  
  // Como segunda opção, tentar o anúncio do "anel-viario"
  const anelViarioAd = validAds.find(ad => ad.id === 'anel-viario');
  if (anelViarioAd) {
    console.log('Selected anel-viario ad:', anelViarioAd);
    return anelViarioAd;
  }
  
  // Priorizar "seu-anuncio-id" como terceira opção
  const seuAnuncio = validAds.find(ad => ad.id === 'seu-anuncio-id');
  if (seuAnuncio) {
    console.log('Selected seu-anuncio-id ad:', seuAnuncio);
    return seuAnuncio;
  }
  
  const randomIndex = Math.floor(Math.random() * validAds.length);
  console.log('Selected random ad:', validAds[randomIndex]);
  return validAds[randomIndex];
};
