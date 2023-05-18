import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import SongTest from './SongTest';

const MusicShowAll = ({supabase}) => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSong, setCurrentSong] = useState(null);

  const handleSongClick = (e) => {
    setCurrentSong(null);
    setCurrentSong(e.target.value);
    console.log(e.target.value);
  }

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
        <button value={song.mp3} onClick={handleSongClick}>play {song.title}</button>
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
      <h2>List of Songs</h2>
      {songList}
      <button onClick={() => setCurrentSong(null)}>stop</button>
      <div>          
          <div className='grid'>
            
              <div className="music-list">
                {currentSong != null && <SongTest supabase={supabase} songName={currentSong}/>}

              </div>
              <div className='musicSearch'>
                <input type="text" value={searchTerm} onChange={handleChange} />
                  <button onClick={handleSearch}>Find Track</button>
              </div>
              <div className='musicList'>
                <h2>List of Songs</h2>
                    {songList}
                    <button onClick={() => setCurrentSong('')}>stop</button>
              </div>
          
          </div>

      </div>
    </div>
  );
};

export default MusicShowAll;