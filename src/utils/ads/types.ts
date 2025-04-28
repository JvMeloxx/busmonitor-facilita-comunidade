
// Interface para conteúdo de anúncios
export interface Advertisement {
  id: string;
  type: 'image' | 'video';
  url: string;
  link_url?: string;
  duration: number; // em segundos
  startDate?: string;
  endDate?: string;
  impressions?: number;
  clicks?: number;
  full_screen?: boolean;
  ctaText?: string;
  active: boolean;
  priority: number;
}

// Chaves para armazenamento local
export const CACHED_ADS_KEY = 'cachedAds';
export const AD_STATS_KEY = 'adStats';
export const SESSION_AD_SHOWN_KEY = 'sessionAdShown';
