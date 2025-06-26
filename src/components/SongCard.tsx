import React, { useState } from 'react';
import { type Song } from '../types/Song';

interface SongCardProps {
  song: Song;
  onClick: (song: Song) => void;
}

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

export default SongCard;