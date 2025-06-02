
export interface SearchEngine {
  id: string;
  name: string;
  baseUrl: string;
  searchParam: string;
}

export const searchEngines: SearchEngine[] = [
  {
    id: 'oceanhero',
    name: 'OceanHero',
    baseUrl: 'https://oceanhero.today/web',
    searchParam: 'q'
  },
  {
    id: 'ecosia',
    name: 'Ecosia',
    baseUrl: 'https://www.ecosia.org/search',
    searchParam: 'q'
  },
  {
    id: 'searx',
    name: 'SearX',
    baseUrl: 'https://searx.org/search',
    searchParam: 'q'
  },
  {
    id: 'startpage',
    name: 'Startpage',
    baseUrl: 'https://www.startpage.com/sp/search',
    searchParam: 'query'
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    baseUrl: 'https://duckduckgo.com/',
    searchParam: 'q'
  },
  {
    id: 'swisscows',
    name: 'Swisscows',
    baseUrl: 'https://swisscows.com/web',
    searchParam: 'query'
  }
];

export const getRandomEngine = (): SearchEngine => {
  const randomIndex = Math.floor(Math.random() * searchEngines.length);
  return searchEngines[randomIndex];
};

export const getEngineById = (id: string): SearchEngine | null => {
  return searchEngines.find(engine => engine.id === id) || null;
};

export const buildSearchUrl = (engine: SearchEngine, query: string): string => {
  const url = new URL(engine.baseUrl);
  url.searchParams.set(engine.searchParam, query);
  return url.toString();
};
