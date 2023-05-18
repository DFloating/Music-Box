import { useEffect, useState, useRef } from "react";
import {Howl} from 'howler';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";  // icons for next and previous track
import { IconContext } from "react-icons"; // for customising the icons
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";  // icons for next and previous track
import { IconContext } from "react-icons"; // for customising the icons

const SongTest = ({supabase, songName, title, artist}) => {
  const [songLink, setSongLink] = useState(""); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [sound, setSound] = useState(null);

 
  useEffect(() => {
    const fetchSongLink = async () => {
      const { data, error } = await supabase.storage
        .from('MP3')
        .getPublicUrl(songName);
      if (error) {
        console.error('Error fetching song link:', error.message);
        return;
      }
      setSongLink(data.publicUrl);
    };
    fetchSongLink();
  }, [songName]);

  useEffect(() => {
    if (sound) {
      sound.stop();
      sound.unload();
    }

    if (songLink) {
      const newSound = new Howl({
        src: [songLink],
        html5: true,
        
      });
      setSound(newSound);
    }
  }, [songLink]);

  const handlePlaySong = () => {
    if (soundPlay && typeof soundPlay === 'function') {
      soundPlay();
    }
  };



  const soundPlay = () => {
    if (sound && !sound.playing()) {
      sound.play();
    }
  };

  const soundStop = () => {
    if (sound && sound.playing()) {
      sound.stop();
      setIsPlaying(false);
    }
  };

  const soundPause = () => {
    if (sound && sound.playing()) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  const fastForward = () => {
    const skipAmount = 5;
    sound.seek(Math.min(sound.seek() + skipAmount, sound.duration()));
  };

  const slowBackward = () => {
    const skipAmount = 5;
    sound.seek(Math.max(sound.seek() - skipAmount, 0));
  };

    return (
      <div className="component">
        <div>
        <div className="grid">
        <div className="component">
          <h2 className="display-6">Playing Now</h2>
          <img
            className="musicCover"
            src="https://picsum.photos/200/200" // to be replaced with spotify artist image
          />
        </div>
      <div className="main">
        <div className="information">
            <h3 className="display-5">{title}</h3>
            <p className="subTitle">{artist}</p>
        </div>
          <div>
          </div>
          <div>
            <button className="btn btn-secondary" onClick={slowBackward}>
              Rewind
            </button>
              <button className="btn btn-warning btn-lg" onClick={handlePlaySong} > 
                Play
            </button>

          <button className="btn btn-danger" onClick={soundPause} >
            Pause
            </button>
        <button className="btn btn-secondary" onClick={fastForward} >
            forward
        </button>
        <button onClick={soundStop}>Stop song</button>

      </div>
     </div>
    </div>
  </div>                  
      </div>                                                           
    );
}

export default SongTest;





