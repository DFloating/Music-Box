import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MusicBox from "./components/MusicBox";
import MusicList from './components/MusicList';
import MusicShow from './components/MusicShow';
import MusicPlayer from './components/MusicPlayer';


function App() {
  return (
    <div className="routes">  
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/">Music Box</Link></li>
            <li><Link to="/MusicList">Music List</Link></li>
            <li><Link to="/MusicShow">Music Show</Link></li>
            <li><Link to="/MusicPlayer">Music Player</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={ <MusicBox />} />
          <Route path="/MusicList" element={ <MusicList />} />
          <Route path="/MusicShow" element={ <MusicShow />} />
          <Route path="/MusicPlayer" element={ <MusicPlayer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App
