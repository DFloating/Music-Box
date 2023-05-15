import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import MusicBox from "./components/MusicBox";
import MusicList from './components/MusicList';
import MusicShow from './components/MusicShow';
import MusicPlayer from './components/MusicPlayer';
import WaveFormTest from './components/WaveFormTest';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="routes">  
      <BrowserRouter>
        <nav>
          <ul className="list-group">
            <li className="list-group-item list-group-item-success"><Link to="/">Music Box</Link></li>
            <li className="list-group-item list-group-item-info"><Link to="/MusicList">Music List</Link></li>
            <li className="list-group-item list-group-item-warning"><Link to="/MusicShow">Music Show</Link></li>
            <li className="list-group-item list-group-item-danger"><Link to="/MusicPlayer">Music Player</Link></li>
            <li className="list-group-item list-group-item-danger"><Link to="/WaveFormTest">Waves</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={ <MusicBox />} />
          <Route path="/MusicList" element={ <MusicList />} />
          <Route path="/MusicShow" element={ <MusicShow />} />
          <Route path="/MusicPlayer" element={ <MusicPlayer />} />
          <Route path="/WaveFormTest" element={ <WaveFormTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App
