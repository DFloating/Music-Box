import React from 'react';
// import './App.css';
import axios from 'axios';
import { useState } from 'react';

import MusicPlayer from './MusicPlayer';

const MusicList = () => {
    // Define state variables
    const [searchTerm, setSearchTerm] = useState('');
    const [musicList, setMusicList] = useState([]);

    // mock data for list of songs
const songsList = [
    { artist: "Adele", title: "Someone Like You", genre: "Pop" },
    { artist: "Eminem", title: "Lose Yourself", genre: "Hip-Hop" },
    { artist: "Queen", title: "Bohemian Rhapsody", genre: "Rock" },
    { artist: "Beyonce", title: "Crazy in Love", genre: "R&B" },
    { artist: "Ed Sheeran", title: "Thinking Out Loud", genre: "Pop" },
    { artist: "AC/DC", title: "Highway to Hell", genre: "Rock" }
    ];

    // Function to handle input change
const handleChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    // Function to handle search
const handleSearch = () => {
      // Call an API or fetch data from the server
      // Filter the data based on the search term
      // Set the filtered music list to the state
    };
    
    return (
      <div>
        <input type="text" value={searchTerm} onChange={handleChange} />
        <button onClick={handleSearch}>Find Track</button>
        {musicList.map((music) => (
          <div key={music.id}>
            <h3>{music.title}</h3>
            <p>{music.artist}</p>
            <p>{music.genre}</p>
          </div>
        ))}
       <MusicPlayer /> 
      </div>
    );
  };
  
export default MusicList;