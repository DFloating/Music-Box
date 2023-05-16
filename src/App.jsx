import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MusicBox from "./components/MusicBox";
import MusicList from './components/MusicList';
import MusicShowAll from './components/MusicShowAll';
import PomodoroTimer from './components/PomodoroTimer';
import MusicPlayer from './components/MusicPlayer';
import WaveFormTest from './components/WaveFormTest';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://mlkeyxaswemirdbuvayj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sa2V5eGFzd2VtaXJkYnV2YXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxMzIyMjIsImV4cCI6MTk5OTcwODIyMn0.S7uBPYJgm3OEYg5SJzuUHQ3xkTGHkm_NTJpwovAFXJg");

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongs();
  }, []);

  async function getSongs() {
    const { data } = await supabase.from("songs").select();
    setSongs(data);
  }

  return (
    <div className="routes">  
      <BrowserRouter>
        <nav>
          <ul className="list-group">
            <li className="list-group-item list-group-item-success"><Link to="/">Music Box</Link></li>
            <li className="list-group-item list-group-item-info"><Link to="/MusicList">Music List</Link></li>
            <li className="list-group-item list-group-item-info"><Link to="/MusicList">Show All Music</Link></li>
            <li className="list-group-item list-group-item-warning"><Link to="/PomodoroTimer">Pomodoro Timer</Link></li>
            <li className="list-group-item list-group-item-danger"><Link to="/MusicPlayer">Music Player</Link></li>
            <li className="list-group-item list-group-item-danger"><Link to="/WaveFormTest">Waves</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={ <MusicBox />} />
          <Route path="/MusicList" element={ <MusicList />} />
          <Route path="/MusicShowAll" element={ <MusicShowAll />} />
          <Route path="/PomodoroTimer" element={ <PomodoroTimer />} />
          <Route path="/MusicPlayer" element={ <MusicPlayer />} />
          <Route path="/WaveFormTest" element={ <WaveFormTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App
