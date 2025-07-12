
const cache = new Map<string, { content: string; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const PROXY_URL = 'https://api.allorigins.win/get?url=';

export const getProxiedUrl = (originalUrl: string): string => {
  return `${PROXY_URL}${encodeURIComponent(originalUrl)}`;
};

export const fetchProxiedContent = async (url: string): Promise<string> => {
  console.log('Attempting to fetch via proxy:', url);
  
  // Check cache first for faster loading
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Returning cached content for:', url);
    return cached.content;
  }
  
  try {
    const proxyUrl = getProxiedUrl(url);
    console.log('Proxy URL:', proxyUrl);
    
    // Add timeout for faster response
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
    const response = await fetch(proxyUrl, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; EcoQueryCompass/1.0)'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Proxy response not ok: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Proxy response received:', data);
    
    if (!data.contents) {
      throw new Error('No content returned from proxy');
    }
    
    // Cache the result for faster subsequent loads
    cache.set(url, { content: data.contents, timestamp: Date.now() });
    
    // Clean old cache entries periodically
    if (cache.size > 50) {
      for (const [key, value] of cache.entries()) {
        if (Date.now() - value.timestamp > CACHE_DURATION) {
          cache.delete(key);
        }
      }
    }
    
    return data.contents;
  } catch (error) {
    console.error('Proxy fetch failed:', error);
    throw error;
  }
};
