// import React from 'react';
// // import './App.css';
// import axios from 'axios';

// const MusicList = () => {
//     return (
//         <div className='music-list'>
//             <h2>Music List coming soon....right?</h2>
//         </div>
//     );
// };

// export default MusicList;

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://mlkeyxaswemirdbuvayj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sa2V5eGFzd2VtaXJkYnV2YXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxMzIyMjIsImV4cCI6MTk5OTcwODIyMn0.S7uBPYJgm3OEYg5SJzuUHQ3xkTGHkm_NTJpwovAFXJg");

const MusicShowAll = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
        const { data: songs, error } = await supabase.storage.from('MP3').list();

      if (error) {
        console.error('Error fetching songs:', error.message);
      } else {
        setSongs(songs);
      }
    };

    fetchSongs(); //fetch songs from storage
  }, []);

  return (
    <div className="music-list">
      <h2>List of Songs</h2>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <a href={song.url} target="_blank" rel="noopener noreferrer">
              {song.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicShowAll;


