
// Interface for advertisement content
export interface Advertisement {
  id: string;
  type: 'image' | 'video';
  url: string;
  linkUrl?: string;
  duration?: number; // in seconds
}

// Sample advertisements (to be replaced with real ad management system)
const sampleAds: Advertisement[] = [
  {
    id: 'ad1',
    type: 'image',
    url: '/placeholder.svg',
    linkUrl: 'https://example.com',
    duration: 5
  }
];

// Get a random advertisement
export const getRandomAd = (): Advertisement => {
  const randomIndex = Math.floor(Math.random() * sampleAds.length);
  return sampleAds[randomIndex];
};

// Track ad impressions (to be implemented with analytics)
export const trackAdImpression = (adId: string) => {
  console.log(`Ad impression tracked for ad: ${adId}`);
  // In a real implementation, this would send data to your analytics service
};

// Track ad clicks (to be implemented with analytics)
export const trackAdClick = (adId: string) => {
  console.log(`Ad click tracked for ad: ${adId}`);
  // In a real implementation, this would send data to your analytics service
};
