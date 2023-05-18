import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import SongTest from './SongTest';
import MusicList from './MusicList';

const MusicShowAll = ({supabase}) => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
        <button onClick={() => handleSongClick(song)}>play {song.title}</button>
      </div>
    )
    
  })



  return (
    <div className="music-list">

      <input type="text" value={searchTerm} onChange={handleChange} />
        <button onClick={handleSearch}>Find Track</button>
      <h2>List of Songs</h2>
      {songList}
      <div>          
          <div className='grid'>
            
              <div className="music-list">
                {currentSongMp3 != null && 
                <SongTest supabase={supabase} 
                  songName={currentSongMp3} 
                  title={currentSongTitle} 
                  artist={currentSongArtist}/>
                }

              </div>
              <div className='musicSearch'>
               <MusicList/>
              </div>
              <div className='musicList'>
                <h2>List of Songs</h2>
                    {songList}
                    <button onClick={() => setCurrentSongMp3('')}>stop</button>
              </div>
          
          </div>

      </div>
    </div>
  );
};

export default MusicShowAll;