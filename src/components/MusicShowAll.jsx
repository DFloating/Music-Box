import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const MusicShowAll = ({supabase}) => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    const selectAll = async () => {
      const { data, error } = await supabase.from('songs').select();
      console.log(data);
      setSongs(data);
    }     
    selectAll();
      // if (error) {
      //   console.error('Error fetching songs:', error.message);
      // } else {
      //   setSongs(songs);
      // }

  }, []);

  const songList = songs.map((song) => {
    
    return (
      <div key={song.id}>
        <h3>{song.title}</h3>
        <h4>{song.artist}</h4>
        <p>{song.genre}</p>
        <button>play {song.title}</button>
      </div>
    )
    
  })
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
    <div className="music-list">
      <input type="text" value={searchTerm} onChange={handleChange} />
        <button onClick={handleSearch}>Find Track</button>
        {musicList.map((music) => (
          <div key={music.id}>
            <h3>{music.title}</h3>
            <p>{music.artist}</p>
            <p>{music.genre}</p>
          </div>
        ))}
      <h2>List of Songs</h2>
      {songList}
      {/* <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <a href={song.url} target="_blank" rel="noopener noreferrer">
              {song.name}
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default MusicShowAll;


