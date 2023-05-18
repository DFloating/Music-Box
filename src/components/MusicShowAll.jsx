import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import SongTest from './SongTest';
import MusicList from './MusicList';



const MusicShowAll = ({supabase}) => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSong, setCurrentSong] = useState('');
  const [currentSongMp3, setCurrentSongMp3] = useState(null);
  const [currentSongTitle, setCurrentSongTitle] = useState('');
  const [currentSongArtist, setCurrentSongArtist] = useState('');

  const handleSongClick = (song) => {
    console.log(song);
    setCurrentSongMp3(song.mp3);
    setCurrentSongTitle(song.title);
    setCurrentSongArtist(song.artist);
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
      <div>          
          
              
              <SongTest supabase={supabase} songName={currentSong} />

           <div className="grid">
              
              <div className="musicSearch card">
              
              <MusicList />

              </div>
              <div className="musicList card">
                <h2>List of Songs</h2>
                    {songList}
                    <button onClick={() => setCurrentSong('')}>stop</button>
                    {/* {currentSong != '' && <SongTest supabase={supabase} songName={currentSong}/>} */}
              </div>
          
          </div>

      </div>
  );
};

export default MusicShowAll;


