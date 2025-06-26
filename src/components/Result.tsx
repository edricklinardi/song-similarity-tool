import React from "react";
import { type Song } from "../types/Song";
import SongCard from "./SongCard";
import LoadingSpinner from "./LoadingSpinner";

interface ResultProps {
  showResult: boolean;
  isLoading: boolean;
  results: Song[];
  onSongClick: (song: Song) => void;
}

const Result: React.FC<ResultProps> = ({
  showResult,
  isLoading,
  results,
  onSongClick
}) => {
  if (!showResult) return null;

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Similar Songs
        </h2>
        <p className="text-gray-600">
          Based on audio features, genre, and musical characteristics
        </p>
      </div>

      {isLoading && <LoadingSpinner />}

      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onClick={onSongClick}
            />
          ))}
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No similar songs found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

export default Result;