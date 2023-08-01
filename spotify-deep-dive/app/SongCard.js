import React from 'react';

const Card = ({ albumCover, songTitle }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg shadow-md">
      <img src={albumCover} alt={songTitle} className="w-32 h-32 object-cover mb-2 rounded" />
      <p className="text-center text-gray-800 font-medium">{songTitle}</p>
    </div>
  );
};

export default Card;
