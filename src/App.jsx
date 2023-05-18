import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MusicBox from "./components/MusicBox";
import MusicList from './components/MusicList';
import MusicShowAll from './components/MusicShowAll';
import MusicPlayer from './components/MusicPlayer';
import WaveFormTest from './components/WaveFormTest';
import MusicUpload from './components/MusicUpload';
import SongTest from './components/SongTest';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://mlkeyxaswemirdbuvayj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sa2V5eGFzd2VtaXJkYnV2YXlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDEzMjIyMiwiZXhwIjoxOTk5NzA4MjIyfQ.JcfoyFRW8NWBEnmVtyj5icn4exRS0fuUWeJKzKqZhDA");

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongs();
  }, []);

  async function getSongs() {
    const { data } = await supabase.from("songs").select();
    setSongs(data);
  }

  const [file, setfile] = useState([]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  // upload image
    const filename = `${file.name}`;

  const { data, error } = await supabase.storage
  .from("MP3")
  .upload(filename, file, {
  cacheControl: "3600",
  upsert: false,
  });

  };

  const handleFileSelected = (e) => {
  setfile(e.target.files[0]);
  };

  return (
    <div className="routes">  
      <BrowserRouter>
      <div className="nav test">
        <ul className="list-group list-group-horizontal">
          
              <li className="list-group-item list-group-item-primary"><Link to="/">Music Box</Link></li>
              {/* <li className="list-group-item list-group-item-light"><Link to="/MusicList">Music List</Link></li> */}
              <li className="list-group-item list-group-item-primary"><Link to="/MusicShowAll">Home Page</Link></li>
              {/* <li className="list-group-item list-group-item-light"><Link to="/PomodoroTimer">Pomodoro Timer</Link></li> */}
              <li className="list-group-item list-group-item-primary"><Link to="/MusicPlayer">Music Player</Link></li>
              {/* <li className="list-group-item list-group-item-light"><Link to="/WaveFormTest">Waves</Link></li> */}
              <li className="list-group-item list-group-item-primary"><Link to="/MusicUpload">Music Upload</Link></li>
              {/* <li className="list-group-item list-group-item-light"><Link to="/SongTest">Song Test</Link></li> */}

          
        </ul>
      </div>  

        <Routes>
          <Route path="/" element={ <MusicBox />} />
          <Route path="/MusicList" element={ <MusicList />} />
          <Route path="/MusicShowAll" element={ <MusicShowAll supabase={supabase}/>} />
          <Route path="/MusicPlayer" element={ <MusicPlayer supabase={supabase}/>} />
          <Route path="/WaveFormTest" element={ <WaveFormTest />} />
          <Route path="/MusicUpload" element={ <MusicUpload supabase={supabase}/>} />
          <Route path="/SongTest" element={ <SongTest supabase={supabase}/>} />
        </Routes>
      </BrowserRouter>

      {/* <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleFileSelected} />
        <button type="submit">Upload image</button>
      </form> */}
    </div>
  );
};

export default App
