
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import EngineSelector from '../components/EngineSelector';
import EcoStats from '../components/EcoStats';
import { useSearch } from '../hooks/useSearch';
import { Leaf } from 'lucide-react';

const Index = () => {
  const [selectedEngine, setSelectedEngine] = useState('random');
  const { performSearch, isLoading } = useSearch();

  const handleSearch = (query: string) => {
    performSearch(query, selectedEngine);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-full">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Groovia
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Search the web while making a positive impact on our planet. 
            Every search helps plant trees, clean oceans, and support environmental causes.
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto">
          <EngineSelector 
            selectedEngine={selectedEngine} 
            onEngineChange={setSelectedEngine} 
          />
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading}
          />
        </div>

        {/* Impact Stats */}
        <EcoStats />

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500">
          <p>
            Powered by eco-friendly search engines committed to environmental sustainability
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
