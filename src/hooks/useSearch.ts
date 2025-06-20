
import { useState } from 'react';
import { buildSearchUrl, getEngineById, getRandomEngine } from '../utils/searchEngines';
import { toast } from '@/hooks/use-toast';

export const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [browserUrl, setBrowserUrl] = useState<string | null>(null);

  const performSearch = async (query: string, selectedEngine: string) => {
    if (!query.trim()) {
      toast({
        title: "Search query required",
        description: "Please enter a search term to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      let engine;
      
      if (selectedEngine === 'random') {
        engine = getRandomEngine();
        toast({
          title: `Searching with ${engine.name}`,
          description: "Randomly selected for your eco-friendly search!",
        });
      } else {
        engine = getEngineById(selectedEngine);
        if (!engine) {
          throw new Error('Invalid search engine selected');
        }
      }

      const searchUrl = buildSearchUrl(engine, query);
      
      // Provide user feedback about in-app browsing
      toast({
        title: "Opening search results",
        description: "If the page doesn't load, you can open it in your browser.",
      });

      // Small delay for better UX
      setTimeout(() => {
        setBrowserUrl(searchUrl);
        setIsLoading(false);
      }, 800);

    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "There was an error processing your search. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const closeBrowser = () => {
    setBrowserUrl(null);
  };

  return { performSearch, isLoading, browserUrl, closeBrowser };
};
