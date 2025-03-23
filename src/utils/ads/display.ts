
import { SESSION_AD_SHOWN_KEY } from './types';

// Verificar se devemos mostrar anúncios hoje
export const shouldShowAds = (): boolean => {
  // Redefinir a flag de anúncio mostrado na sessão para testes
  sessionStorage.removeItem(SESSION_AD_SHOWN_KEY);
  
  const doNotShowUntil = localStorage.getItem('doNotShowAdsUntil');
  if (doNotShowUntil) {
    const untilDate = new Date(doNotShowUntil);
    const now = new Date();
    if (now < untilDate) {
      return false;
    }
  }
  
  // Verificar se anúncio já foi mostrado nesta sessão
  const sessionAdShown = sessionStorage.getItem(SESSION_AD_SHOWN_KEY);
  if (sessionAdShown === 'true') {
    return false;
  }
  
  return true;
};

// Marcar anúncio como mostrado para esta sessão
export const markAdShownForSession = () => {
  sessionStorage.setItem(SESSION_AD_SHOWN_KEY, 'true');
};
