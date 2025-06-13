import React, { useState } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  similarity: number;
  features: string[];
  albumArt?: string;
  previewUrl?: string;
}

interface SongCardProps {
  song: Song;
  onClick: (song: Song) => void;
}

const SongSearchEngine: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Song[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Sample data for demonstration - replace with actual Spotify API data
  const sampleSongs: Song[] = [
    {
      id: '1',
      title: "Midnight City",
      artist: "M83",
      similarity: 0.94,
      features: ["Synth-pop", "Dreamy", "Nostalgic", "Upbeat"]
    },
    {
      id: '2',
      title: "Take On Me",
      artist: "a-ha",
      similarity: 0.89,
      features: ["80s", "Synth-pop", "Catchy", "Energetic"]
    },
    {
      id: '3',
      title: "Blinding Lights",
      artist: "The Weeknd",
      similarity: 0.87,
      features: ["Synthwave", "Pop", "Retro", "Danceable"]
    },
    {
      id: '4',
      title: "Mr. Blue Sky",
      artist: "Electric Light Orchestra",
      similarity: 0.85,
      features: ["Classic Rock", "Uplifting", "Orchestral", "Happy"]
    },
    {
      id: '5',
      title: "Don't Stop Me Now",
      artist: "Queen",
      similarity: 0.83,
      features: ["Rock", "Energetic", "Classic", "Upbeat"]
    },
    {
      id: '6',
      title: "Good as Hell",
      artist: "Lizzo",
      similarity: 0.81,
      features: ["Pop", "Empowering", "Funky", "Confident"]
    }
  ];

  const searchSimilarSongs = async (): Promise<void> => {
    if (!searchQuery.trim()) {
      setError('Please enter a song title');
      return;
    }

    setError('');
    setIsLoading(true);
    setShowResults(true);

    try {
      // TODO: Replace with actual Spotify API integration
      // Example API call structure:
      /*
      const response = await fetch('/api/search-similar', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${spotifyToken}`
        },
        body: JSON.stringify({ query: searchQuery })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch similar songs');
      }
      
      const data = await response.json();
      setResults(data.songs);
      */
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResults(sampleSongs);
      
    } catch (err) {
      setError('Failed to search for similar songs. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      searchSimilarSongs();
    }
  };

  const handleSongClick = (song: Song): void => {
    // TODO: Implement song play/preview functionality
    console.log(`Playing: ${song.title} by ${song.artist}`);
    // You can integrate with Spotify Web Playback SDK here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 pt-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            SoundWave
          </h1>
          <p className="text-xl text-white/90 font-light">
            Discover music through similarity • Find your next favorite song
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-10 shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a song title to find similar music..."
                className="w-full px-6 py-5 pr-32 text-lg border-2 border-gray-200 rounded-full outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
              <button
                onClick={searchSimilarSongs}
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

        {/* Results Section */}
        {showResults && (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Similar Songs
              </h2>
              <p className="text-gray-600">
                Based on audio features, genre, and musical characteristics
              </p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
                <p className="text-gray-600">Analyzing musical patterns...</p>
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    onClick={handleSongClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SongCard: React.FC<SongCardProps> = ({ song, onClick }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const artistInitial = song.artist.charAt(0).toUpperCase();
  const similarityPercentage = Math.round(song.similarity * 100);

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 ${
        isHovered ? '-translate-y-2 shadow-2xl border-indigo-200' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(song)}
    >
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
          {song.albumArt ? (
            <img 
              src={song.albumArt} 
              alt={`${song.title} album art`}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            artistInitial
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">
            {song.title}
          </h3>
          <p className="text-gray-600 truncate">{song.artist}</p>
        </div>
      </div>

      <div className="mb-3">
        <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {similarityPercentage}% Match
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {song.features.map((feature, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SongSearchEngine;