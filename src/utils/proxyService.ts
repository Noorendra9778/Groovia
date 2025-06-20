
export const PROXY_URL = 'https://api.allorigins.win/get?url=';

export const getProxiedUrl = (originalUrl: string): string => {
  return `${PROXY_URL}${encodeURIComponent(originalUrl)}`;
};

export const fetchProxiedContent = async (url: string): Promise<string> => {
  try {
    const response = await fetch(getProxiedUrl(url));
    const data = await response.json();
    return data.contents;
  } catch (error) {
    console.error('Proxy fetch failed:', error);
    throw error;
  }
};
