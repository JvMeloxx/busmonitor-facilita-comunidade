
// Interface for advertisement content
export interface Advertisement {
  id: string;
  type: 'image' | 'video';
  url: string;
  linkUrl?: string;
  duration?: number; // in seconds
  startDate?: string;
  endDate?: string;
  impressions?: number;
  clicks?: number;
  fullScreen?: boolean;
  ctaText?: string;
}

// Sample advertisements (to be replaced with real ad management system)
const sampleAds: Advertisement[] = [
  {
    id: 'mamae',
    type: 'image',
    url: '/lovable-uploads/c3d505e6-df6e-4d05-872d-654bb2c23b18.png',
    linkUrl: 'https://chat.whatsapp.com/Gn56ldmr7flJBnWmr1CRpQ',
    duration: 0,
    impressions: 0,
    clicks: 0,
    fullScreen: true,
    ctaText: 'CLIQUE AQUI PARA ENTRAR'
  },
  {
    id: 'new-ad',
    type: 'image',
    url: 'https://uploaddeimagens.com.br/imagens/113Srss',
    linkUrl: 'https://example.com/new-ad',
    duration: 5,
    impressions: 0,
    clicks: 0,
    fullScreen: true
  },
  {
    id: 'ad1',
    type: 'image',
    url: '/lovable-uploads/c780d5d2-5695-4833-9b98-b7c399563ba8.png',
    linkUrl: 'https://linktr.ee/acheeeimae',
    duration: 5,
    impressions: 0,
    clicks: 0
  },
  {
    id: 'ad2',
    type: 'image',
    url: 'https://source.unsplash.com/random/320x480',
    linkUrl: 'https://example.com/promo',
    duration: 5,
    impressions: 0,
    clicks: 0
  }
];

// Local storage keys
const CACHED_ADS_KEY = 'cachedAds';
const AD_STATS_KEY = 'adStats';
const SESSION_AD_SHOWN_KEY = 'sessionAdShown';

// Cache ads for offline use
export const cacheAdsForOffline = () => {
  localStorage.setItem(CACHED_ADS_KEY, JSON.stringify(sampleAds));
};

// Get ads from cache or default
const getAdsSource = (): Advertisement[] => {
  const cachedAds = localStorage.getItem(CACHED_ADS_KEY);
  if (cachedAds) {
    return JSON.parse(cachedAds);
  }
  return sampleAds;
};

// Check if we should show ads today
export const shouldShowAds = (): boolean => {
  const doNotShowUntil = localStorage.getItem('doNotShowAdsUntil');
  if (doNotShowUntil) {
    const untilDate = new Date(doNotShowUntil);
    const now = new Date();
    if (now < untilDate) {
      return false;
    }
  }
  
  // Check if ad was already shown in this session
  const sessionAdShown = sessionStorage.getItem(SESSION_AD_SHOWN_KEY);
  if (sessionAdShown === 'true') {
    return false;
  }
  
  return true;
};

// Mark ad as shown for this session
export const markAdShownForSession = () => {
  sessionStorage.setItem(SESSION_AD_SHOWN_KEY, 'true');
};

// Get a random advertisement
export const getRandomAd = (): Advertisement | undefined => {
  if (!shouldShowAds()) {
    return undefined;
  }
  
  const ads = getAdsSource();
  if (ads.length === 0) return undefined;
  
  const now = new Date();
  
  // Filter ads by date if applicable
  const validAds = ads.filter(ad => {
    if (ad.startDate && new Date(ad.startDate) > now) return false;
    if (ad.endDate && new Date(ad.endDate) < now) return false;
    return true;
  });
  
  if (validAds.length === 0) return undefined;
  
  // Try to prioritize the "mamae" ad first
  const mamaeAd = validAds.find(ad => ad.id === 'mamae');
  if (mamaeAd) return mamaeAd;
  
  const randomIndex = Math.floor(Math.random() * validAds.length);
  return validAds[randomIndex];
};

// Load ad stats from localStorage
const loadAdStats = (): Record<string, { impressions: number, clicks: number }> => {
  const stats = localStorage.getItem(AD_STATS_KEY);
  return stats ? JSON.parse(stats) : {};
};

// Save ad stats to localStorage
const saveAdStats = (stats: Record<string, { impressions: number, clicks: number }>) => {
  localStorage.setItem(AD_STATS_KEY, JSON.stringify(stats));
};

// Track ad impressions
export const trackAdImpression = (adId: string) => {
  console.log(`Ad impression tracked for ad: ${adId}`);
  
  const stats = loadAdStats();
  if (!stats[adId]) {
    stats[adId] = { impressions: 0, clicks: 0 };
  }
  stats[adId].impressions += 1;
  saveAdStats(stats);
};

// Track ad clicks
export const trackAdClick = (adId: string) => {
  console.log(`Ad click tracked for ad: ${adId}`);
  
  const stats = loadAdStats();
  if (!stats[adId]) {
    stats[adId] = { impressions: 0, clicks: 0 };
  }
  stats[adId].clicks += 1;
  saveAdStats(stats);
};

// Get stats for all ads
export const getAdStats = () => {
  return loadAdStats();
};

// Initialize the ad system
export const initAdSystem = () => {
  // Cache ads for offline use
  cacheAdsForOffline();
  
  // Initialize any other required features
  console.log('Ad system initialized');
};
