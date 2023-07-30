"use client";

import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from './SearchBar'

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

  const handleSearchEnter = (value) => {
    console.log("Pressed Enter");
  }

  return (
    <div>
      <Head>
        <title>Spotify Deep Dive</title>
      </Head>
      
      <main className="bg-blue-950 px-10">
        <nav className="py-5 mb-10">
          <h1 className="text-center text-3xl">Spotify Deep Dive</h1>
        </nav>
        <div>
          <SearchBar onChange={handleSearchChange} onEnterPress = {handleSearchEnter} />
        </div>
      </main>
    </div>

    )
  }
export default HomePage;