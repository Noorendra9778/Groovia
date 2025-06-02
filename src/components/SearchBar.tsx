
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
      <div className="relative flex items-center gap-2 p-2 bg-white rounded-full shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-green-300 focus-within:border-green-300">
        <Search className="ml-4 h-5 w-5 text-green-600" />
        <Input
          type="text"
          placeholder="Search the web sustainably..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border-none bg-transparent text-lg placeholder:text-green-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="lg"
          disabled={!query.trim() || isLoading}
          className="rounded-full bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-medium transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
