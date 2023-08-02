import React from 'react';

const Card = ({ item, filterType }) => {
    let imageUrl, itemName, artists;

    if (filterType === 'artist') {
        imageUrl = item.images && item.images[0]?.url;
        itemName = item.name;
    } else if (filterType === 'song') {
        imageUrl = item.album && item.album.images[0]?.url;
        itemName = item.name;
        artists = item.artists.map((artist) => artist.name).join(', ');
    } else if (filterType === 'album') {
        imageUrl = item.images && item.images[0]?.url;
        itemName = item.name;
        artists = item.artists.map((artist) => artist.name).join(', ');
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 border bg-white border-gray-300 rounded-lg shadow-md">
            {imageUrl ? (
            <img src={imageUrl} alt={itemName} className="w-32 h-32 object-cover text-gray-800 mb-2 rounded" />
            ) : (
            <div className="w-32 h-32 flex items-center justify-center text-gray-800 mb-2 rounded bg-gray-300">No Image</div>
            )}
            <p className="text-center text-gray-800 font-medium">{itemName}</p>
            {filterType !== "artist" && artists && (
                <p className="text-center text-gray-600">{artists}</p>
            )}
            {filterType === "song" && item.previewUrl !== null && item.previewUrl !== "0" && (
                <audio controls>
                    <source src ={item.previewUrl} type="audio/mpeg" />
                    Audio not supported.
                </audio>
            )}
        </div>
    );
};

export default Card;
