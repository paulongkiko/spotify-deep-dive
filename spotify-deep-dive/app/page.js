"use client";

import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from './SearchBar'
import SongCard from './SongCard';

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

  const albumsData = [
    { albumCover: '/album1.jpg', songTitle: 'Song Title 1' },
    { albumCover: '/album2.jpg', songTitle: 'Song Title 2' },
    { albumCover: '/album3.jpg', songTitle: 'Song Title 3' },
    // Add more albums data as needed
  ];

  const handleSearchEnter = (value) => {
    console.log("Pressed Enter");
  }

  return (
    <div className="bg-green-950 px-10 min-h-screen">
      <Head>
        <title>Spotify Deep Dive</title>
      </Head>
      
      <main>
        <nav className="py-2 mb-10">
          <h1 className="text-center text-3xl">Spotify Deep Dive</h1>
        </nav>
        <div className="flex items-center justify-center">
          <SearchBar onChange={handleSearchChange} onEnterPress = {handleSearchEnter} />
          <button className=" mx-1 px-2 bg-green-500 text-white rounded-md h-10">Search</button>
        </div>
        <div className="flex flex-wrap-justify-center">{/* Map over the albumsData and generate Card components */}
          {albumsData.map((album, index) => (
            <SongCard key={index} albumCover={album.albumCover} songTitle={album.songTitle} />
          ))}
          </div>
      </main>
    </div>

    )
  }
export default HomePage;