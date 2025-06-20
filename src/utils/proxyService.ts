
export const PROXY_URL = 'https://api.allorigins.win/get?url=';

export const getProxiedUrl = (originalUrl: string): string => {
  return `${PROXY_URL}${encodeURIComponent(originalUrl)}`;
};

export const fetchProxiedContent = async (url: string): Promise<string> => {
  console.log('Attempting to fetch via proxy:', url);
  
  try {
    const proxyUrl = getProxiedUrl(url);
    console.log('Proxy URL:', proxyUrl);
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Proxy response not ok: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Proxy response received:', data);
    
    if (!data.contents) {
      throw new Error('No content returned from proxy');
    }
    
    return data.contents;
  } catch (error) {
    console.error('Proxy fetch failed:', error);
    throw error;
  }
};
