import React from 'react';

interface SearchProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  error: string;
};

const Search: React.FC<SearchProps> = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  isLoading,
  error
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-10 shadow-2xl">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a song title to find similar music..."
            className="w-full px-6 py-5 pr-32 text-lg border-2 border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
          <button
            onClick={onSearch}
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">
            {error}
          </div>
        )}
      </div>
    </div>
);
};

export default Search;