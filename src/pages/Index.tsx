
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import EngineSelector from '../components/EngineSelector';
import EcoStats from '../components/EcoStats';
import Browser from '../components/Browser';
import ThemeToggle from '../components/ThemeToggle';
import { useSearch } from '../hooks/useSearch';
import { Leaf } from 'lucide-react';

const Index = () => {
  const [selectedEngine, setSelectedEngine] = useState('random');
  const { performSearch, isLoading, browserUrl, closeBrowser } = useSearch();

  const handleSearch = (query: string) => {
    performSearch(query, selectedEngine);
  };

  if (browserUrl) {
    return <Browser url={browserUrl} onClose={closeBrowser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20 transition-all duration-500">
      <div className="container mx-auto px-4 py-12 animate-fade-in">
        {/* Header with Theme Toggle */}
        <div className="flex justify-end mb-4">
          <div className="animate-scale-in">
            <ThemeToggle />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6 group">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              <Leaf className="h-8 w-8 text-green-600 dark:text-green-400 transition-colors duration-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
              Groovia
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-100">
            Search the web while making a positive impact on our planet. 
            Every search helps plant trees, clean oceans, and support environmental causes.
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto space-y-6 animate-scale-in">
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <EngineSelector 
              selectedEngine={selectedEngine} 
              onEngineChange={setSelectedEngine} 
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Impact Stats */}
        <div className="animate-fade-in delay-300">
          <EcoStats />
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 animate-fade-in delay-500">
          <p className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200">
            Powered by eco-friendly search engines committed to environmental sustainability
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
