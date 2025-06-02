
export interface SearchEngine {
  id: string;
  name: string;
  baseUrl: string;
  searchParam: string;
}

export const searchEngines: SearchEngine[] = [
  {
    id: 'ecosia',
    name: 'Ecosia',
    baseUrl: 'https://www.ecosia.org/search',
    searchParam: 'q'
  },
  {
    id: 'rapusia',
    name: 'Rapusia',
    baseUrl: 'https://rapusia.org/search',
    searchParam: 'q'
  },
  {
    id: 'oceanhero',
    name: 'OceanHero',
    baseUrl: 'https://oceanhero.today/search',
    searchParam: 'q'
  },
  {
    id: 'ekoru',
    name: 'Ekoru',
    baseUrl: 'https://ekoru.org/search',
    searchParam: 'q'
  },
  {
    id: 'youcare',
    name: 'YouCare.World',
    baseUrl: 'https://youcare.world/search',
    searchParam: 'q'
  },
  {
    id: 'gexi',
    name: 'Gexi',
    baseUrl: 'https://gexi.org/search',
    searchParam: 'q'
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
