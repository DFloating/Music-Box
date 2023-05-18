import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import MusicPlayer from './MusicPlayer';

const supabase = createClient(
  "https://mlkeyxaswemirdbuvayj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sa2V5eGFzd2VtaXJkYnV2YXlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDEzMjIyMiwiZXhwIjoxOTk5NzA4MjIyfQ.JcfoyFRW8NWBEnmVtyj5icn4exRS0fuUWeJKzKqZhDA"
);

const MusicList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [musicList, setMusicList] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    
  };

  useEffect(() => {
    const handleSearch = async () => {
        const { data, error } = await supabase
          .from('songs')
          .select()
          .eq('title', `${searchTerm}`)
          
  
        console.log(data);
        setMusicList(data);
      
    };

    handleSearch();
  }, [searchTerm]);

  return (
    <div>
      <div class="Searchbar">
      <input type="text" value={searchTerm} onChange={handleChange} />
      </div>
      <button onClick={() => {}}>Find Track</button>
      {musicList.map((music) => (
        <div key={music.id}>
          <h3>{music.title}</h3>
          <p>{music.artist}</p>
          <p>{music.genre}</p>
        </div>
      ))}
      {/* <MusicPlayer /> */}
    </div>
  );
};

export default MusicList;