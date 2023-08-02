"use client";

import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from './SearchBar'
import SongCard from './SongCard';

const CLIENT_ID = process.env.NEXT_PUBLIC_clientID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_clientSecret

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
  }, []);

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
      .then(data=> {
        if (data.artists?.items?.length > 0) {
          return data.artists.items[0].id;
        } else {
          return null;
        }
      });
    
    setSearchInformation([]);
    
    var filterType;
    if (selectedFilter === "song") {
      filterType = "track";
    } else if (selectedFilter === "album") {
      filterType = "album";
    } else if (selectedFilter === "artist") {
      filterType = "artist";
    }

    if(artistID !== null) {
      var searchUrl = `https://api.spotify.com/v1/search?q=${searchInput}&type=${filterType}`;

      var searchData = await fetch(searchUrl, searchParameters)
        .then(response => response.json())
        .then(data => {
        if (selectedFilter === "song") {
          return data.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artists: track.artists,
            previewUrl: track.preview_url,
            album: track.album,
          }));
        } else if (selectedFilter === "album") {
          return data.albums.items;
        } else if (selectedFilter === "artist") {
          return data.artists.items;
        }
    });
    console.log(searchData);

    setSearchInformation(searchData);
    }
  }

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-950 px-10"> 
      <nav className="py-2">
        <h1 className="text-center font-bold text-3xl text-white">Spotify Deep Dive</h1>
      </nav>
      <div className="flex items-center justify-center mt-4">
        <SearchBar onChange={handleSearchChange} onEnterPress = {search} />
        <button className=" ml-2 px-2 bg-blue-500 text-white rounded-md h-10" onClick = {search}>Search</button>
      </div>
      <div className ="flex items-center justify-center py-2 ">
        <h1 className="text-white">Filter Type:</h1>
        <button className={`mx-1 px-2 bg-blue-500 text-white rounded-md h-10 ${selectedFilter === "song" ? "bg-blue-800 font-semibold" : ""}`}
          onClick={() => {
            setSelectedFilter("song");
            search();
            }}>
          Song
        </button>
        <button className={`mx-1 px-2 bg-blue-500 text-white rounded-md h-10 ${selectedFilter === "album" ? "bg-blue-800 font-semibold" : ""}`}
          onClick={() => {
            setSelectedFilter("album");
            search();
            }}>
          Album
        </button>
        <button className={`mx-1 px-2 bg-blue-500 text-white rounded-md h-10 ${selectedFilter === "artist" ? "bg-blue-800 font-semibold" : ""}`}
          onClick={() => {
            setSelectedFilter("artist");
            search();
            }}>
          Artist
        </button>
      </div>
      <main className="flex-1">
        <div className="flex flex-wrap justify-center gap-4">
          {searchInformation.map((currentSearch, index) => (
            <SongCard key={index} item={currentSearch} filterType={selectedFilter} />
          ))}
        </div>
      </main>
      <footer className="text-center py-4 text-white">Developed by Paul Ongkiko with Spotify Web API</footer>
    </div>

    )
  }
export default HomePage;