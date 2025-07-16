interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
  version: string;
}

interface CacheOptions {
  ttl?: number; // Default TTL in milliseconds
  version?: string; // Cache version for invalidation
  compress?: boolean; // Enable compression for large data
}

class CacheManager {
  private static instance: CacheManager;
  private readonly prefix = 'busaqui_cache_';
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes
  private readonly currentVersion = '1.0.0';

  private constructor() {}

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  private isExpired(entry: CacheEntry): boolean {
    const now = Date.now();
    return now > entry.timestamp + entry.ttl;
  }

  private isValidVersion(entry: CacheEntry): boolean {
    return entry.version === this.currentVersion;
  }

  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const {
      ttl = this.defaultTTL,
      version = this.currentVersion,
      compress = false,
    } = options;

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      version,
    };

    try {
      let serializedData = JSON.stringify(entry);
      
      // Simple compression for large data (basic implementation)
      if (compress && serializedData.length > 10000) {
        // In a real implementation, you might use a compression library
        console.log(`Caching large data (${serializedData.length} chars) for key: ${key}`);
      }

      localStorage.setItem(this.getKey(key), serializedData);
    } catch (error) {
      console.error(`Failed to cache data for key ${key}:`, error);
      
      // If storage is full, try to clear expired entries
      this.clearExpired();
      
      // Try again
      try {
        localStorage.setItem(this.getKey(key), JSON.stringify(entry));
      } catch (retryError) {
        console.error(`Failed to cache data after cleanup for key ${key}:`, retryError);
      }
    }
  }

  get<T>(key: string): T | null {
    try {
      const serializedData = localStorage.getItem(this.getKey(key));
      
      if (!serializedData) {
        return null;
      }

      const entry: CacheEntry<T> = JSON.parse(serializedData);

      // Check if entry is expired or version is invalid
      if (this.isExpired(entry) || !this.isValidVersion(entry)) {
        this.remove(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error(`Failed to retrieve cached data for key ${key}:`, error);
      this.remove(key); // Remove corrupted entry
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error(`Failed to remove cached data for key ${key}:`, error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  clearExpired(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const serializedData = localStorage.getItem(key);
          if (serializedData) {
            try {
              const entry: CacheEntry = JSON.parse(serializedData);
              if (this.isExpired(entry) || !this.isValidVersion(entry)) {
                localStorage.removeItem(key);
              }
            } catch (parseError) {
              // Remove corrupted entries
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (error) {
      console.error('Failed to clear expired cache entries:', error);
    }
  }

  getStats(): { totalEntries: number; totalSize: number; expiredEntries: number } {
    let totalEntries = 0;
    let totalSize = 0;
    let expiredEntries = 0;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          totalEntries++;
          const serializedData = localStorage.getItem(key);
          if (serializedData) {
            totalSize += serializedData.length;
            try {
              const entry: CacheEntry = JSON.parse(serializedData);
              if (this.isExpired(entry)) {
                expiredEntries++;
              }
            } catch (parseError) {
              expiredEntries++;
            }
          }
        }
      });
    } catch (error) {
      console.error('Failed to get cache stats:', error);
    }

    return { totalEntries, totalSize, expiredEntries };
  }

  // Utility method to cache API responses
  async cacheApiCall<T>(
    key: string,
    apiCall: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    // Try to get from cache first
    const cachedData = this.get<T>(key);
    if (cachedData !== null) {
      console.log(`Cache hit for key: ${key}`);
      return cachedData;
    }

    // If not in cache, make API call
    console.log(`Cache miss for key: ${key}, making API call`);
    try {
      const data = await apiCall();
      this.set(key, data, options);
      return data;
    } catch (error) {
      console.error(`API call failed for key ${key}:`, error);
      throw error;
    }
  }
}

export const cacheManager = CacheManager.getInstance();

// Utility functions for common cache operations
export const cacheUtils = {
  // Cache bus routes with 10 minute TTL
  cacheRoutes: (routes: any[]) => {
    cacheManager.set('bus_routes', routes, { ttl: 10 * 60 * 1000 });
  },

  getCachedRoutes: () => {
    return cacheManager.get('bus_routes');
  },

  // Cache bus stops with 30 minute TTL
  cacheBusStops: (stops: any[], location: string) => {
    cacheManager.set(`bus_stops_${location}`, stops, { ttl: 30 * 60 * 1000 });
  },

  getCachedBusStops: (location: string) => {
    return cacheManager.get(`bus_stops_${location}`);
  },

  // Cache user location with 5 minute TTL
  cacheUserLocation: (position: GeolocationPosition) => {
    cacheManager.set('user_location', position, { ttl: 5 * 60 * 1000 });
  },

  getCachedUserLocation: () => {
    return cacheManager.get<GeolocationPosition>('user_location');
  },

  // Clear all cache
  clearAllCache: () => {
    cacheManager.clear();
  },

  // Get cache statistics
  getCacheStats: () => {
    return cacheManager.getStats();
  },
};