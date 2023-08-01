import React from 'react';

const SearchBar = ({ onChange, onEnterPress }) => {
    const handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            onEnterPress(event.target.value);
        }
    }
    return (
        <div className="flex items-center justify-center">
            <input
            type = "text"
            placeholder = "Search for an artist..."
            className="py-2 px-4 border bg-white border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none w-full text-gray-800"
            onChange = {onChange}
            onKeyDown = {handleKeyDown}
            />
        </div>
    );
};

export default SearchBar;