"use client";

import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from './SearchBar'
import SongCard from './SongCard';

const CLIENT_ID = "d4febb455f484ee5bf03438c18517601";
const CLIENT_SECRET = "c6ae03a57d6c442bb8ce73ecd3d4ea66";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchInformation, setSearchInformation] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("song"); // Searches for songs by default

  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  useEffect(() => {
    search();
  }, [selectedFilter]);

  async function search() {
    var searchParameters= {
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist,album,track', searchParameters)
      .then(response => response.json())
      .then(data=> {return data.artists.items[0].id})

    var filterType;
    if (selectedFilter === "song") {
      filterType = "track";
    } else if (selectedFilter === "album") {
      filterType = "album";
    } else if (selectedFilter === "artist") {
      filterType = "artist";
    }

    var searchUrl = `https://api.spotify.com/v1/search?q=${searchInput}&type=${filterType}`;

    var searchData = await fetch(searchUrl, searchParameters)
    .then(response => response.json())
    .then(data => {
      if (selectedFilter === "song") {
        return data.tracks.items;
      } else if (selectedFilter === "album") {
        return data.albums.items;
      } else if (selectedFilter === "artist") {
        return data.artists.items;
      }
    });

    setSearchInformation(searchData);
  }

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

  return (
    <div className="bg-green-950 px-10 min-h-screen">
      <Head>
        <title>Spotify Deep Dive</title>
      </Head>
      
      <main>
        <nav className="py-2">
          <h1 className="text-center text-3xl">Spotify Deep Dive</h1>
        </nav>
        <div className="flex items-center justify-center mt-4">
          <SearchBar onChange={handleSearchChange} onEnterPress = {search} />
          <button className=" ml-2 px-2 bg-green-500 text-white rounded-md h-10" onClick = {search}>Search</button>
        </div>
        <div className ="flex items-center justify-center py-2 ">
          <h1>Filter Type: </h1>
          <button className={`mx-1 px-2 bg-green-500 text-white rounded-md h-10 ${selectedFilter === "song" ? "bg-green-700" : ""}`}
            onClick={() => {
              setSelectedFilter("song");
              search();
              }}>
            Song
          </button>
          <button className={`mx-1 px-2 bg-green-500 text-white rounded-md h-10 ${selectedFilter === "album" ? "bg-green-700" : ""}`}
            onClick={() => {
              setSelectedFilter("album");
              search();
              }}>
            Album
          </button>
          <button className={`mx-1 px-2 bg-green-500 text-white rounded-md h-10 ${selectedFilter === "artist" ? "bg-green-700" : ""}`}
            onClick={() => {
              setSelectedFilter("artist");
              search();
              }}>
            Artist
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {searchInformation.map((currentSearch, index) => (
            <SongCard key={index} item={currentSearch} filterType={selectedFilter} />
          ))}
          </div>
      </main>
    </div>

    )
  }
export default HomePage;