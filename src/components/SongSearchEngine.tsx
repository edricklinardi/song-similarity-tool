import React, { useState } from 'react';
import Header from './Header';
import Search from './Search';
import Result from './Result';
import { type Song } from '../types/Song';

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
      const response = await fetch(`http://localhost:8000/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      const tracks = data.tracks.items;

      // Transform Spotify response into Song[]
      const formattedSongs: Song[] = tracks.map((track: any) => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map((a: any) => a.name).join(', '),
        similarity: Math.random() * 0.3 + 0.7, // placeholder similarity score
        features: [track.album.name], // you can enhance this later
        albumArt: track.album.images[0]?.url,
        previewUrl: track.preview_url
      }));

      setResults(formattedSongs);
    } catch (err) {
      setError('Failed to search for similar songs. Please try again.');
      console.error('Search error:', err);

      setResults(sampleSongs); // Fallback to sample data
    } finally {
      setIsLoading(false);
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
        <Header />

        <Search
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={searchSimilarSongs}
          isLoading={isLoading}
          error={error}
        />

        <Result
          showResult={showResults}
          isLoading={isLoading}
          results={results}
          onSongClick={handleSongClick}
        />
      </div>
    </div>
  );
};

export default SongSearchEngine;