
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-green-100 dark:border-green-800 hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-green-300 dark:focus-within:ring-green-600 focus-within:border-green-300 dark:focus-within:border-green-600 group">
        <Search className="ml-2 sm:ml-4 h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400 transition-all duration-300 group-focus-within:scale-110" />
        <Input
          type="text"
          placeholder="Search sustainably..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border-none bg-transparent text-sm sm:text-lg placeholder:text-green-400 dark:placeholder:text-green-500 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white transition-all duration-300"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="sm"
          disabled={!query.trim() || isLoading}
          className="rounded-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-3 sm:px-8 py-1.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300 disabled:opacity-50 hover:scale-105 active:scale-95"
        >
          {isLoading ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="animate-spin h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent rounded-full" />
              <span className="hidden sm:inline">Searching...</span>
              <span className="sm:hidden">...</span>
            </div>
          ) : (
            <span className="hidden sm:inline">Search</span>
          )}
          {!isLoading && <Search className="h-4 w-4 sm:hidden" />}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
