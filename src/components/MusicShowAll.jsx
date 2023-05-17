import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const MusicShowAll = ({supabase}) => {
  const [songs, setSongs] = useState([]);

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
    console.log(song.inserted_at)
    
    return (
      <div key={song.id}>
        <h3>{song.title}</h3>
        <h4>{song.artist}</h4>
        <p>{song.genre}</p>
        <button>play {song.title}</button>
      </div>
    )
    
  })

  return (
    <div className="music-list">
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


