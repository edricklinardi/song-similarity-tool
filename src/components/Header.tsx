import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center mb-10 pt-10">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
        SoundWave
      </h1>
      <p className="text-xl text-white/90 font-light">
        Discover music through similarity • Find your next favorite song
      </p>
    </div>
  );
};

export default Header;