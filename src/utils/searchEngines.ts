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
    id: 'ekoru',
    name: 'Ekoru',
    baseUrl: 'https://ekoru.org',
    searchParam: 'q'
  },
  {
    id: 'givewater',
    name: 'GiveWater',
    baseUrl: 'https://www.givewater.com/search',
    searchParam: 'q'
  },
  {
    id: 'lilo',
    name: 'Lilo',
    baseUrl: 'https://search.lilo.org/searchweb.php',
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
