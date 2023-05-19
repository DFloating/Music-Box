import { useEffect, useState, useRef } from "react";
import {Howl} from 'howler';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";  // icons for next and previous track
import { BsFillStopCircleFill } from "react-icons/bs";
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

      <div className="parent card">
              <div className="component">
                <h4 className="display-6">Playing Now</h4>
                  <img
                  className="musicCover"
                  src="https://picsum.photos/200/200" // to be replaced with spotify artist image
                  />
                <p className="display-5">{title}</p>
                <p className="display-7">{artist}</p>                
              </div>
        <div className="main">
                <button className="btn btn-secondary" onClick={slowBackward}>
                  <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
                  <BiSkipPrevious />
                  </IconContext.Provider>
                </button>
                <button className="btn btn-warning" onClick={handlePlaySong} > 
                  <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
                  <AiFillPlayCircle />
                  </IconContext.Provider>
                </button>
                <button className="btn btn-danger" onClick={soundPause} >
                  <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
                  <AiFillPauseCircle />
                  </IconContext.Provider>
                </button>
                <button className="btn btn-secondary" onClick={fastForward} >
                  <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
                  <BiSkipNext />
                  </IconContext.Provider>
                </button>
                <button className="btn btn-danger" onClick={soundStop}>
                  <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
                  <BsFillStopCircleFill />
                  </IconContext.Provider>
                </button>
        </div>                  
      </div>                                                        
    );
}

export default SongTest;





