import React from 'react';

const SearchBar = ({ onChange, onEnterPress }) => {
    const handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            onEnterPress(event.target.value);
        }
    }
    return (
            <input
            type = "text"
            placeholder = "Search for a song, album, or artist..."
            className="py-2 px-4 border bg-white border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none w-full text-gray-800"
            onChange = {onChange}
            onKeyDown = {handleKeyDown}
            />
    );
};

export default SearchBar;