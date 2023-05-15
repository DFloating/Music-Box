import { useEffect, useState } from "react";
import useSound from "use-sound";                                    // for handling the sound
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; 
import RoveRanger from "../assets/RoveRanger.mp3"    // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";                // icons for next and previous track
import { IconContext } from "react-icons";                                  // for customising the icons

// const [isPlaying, setIsPlaying] = useState(false);                          // store the current status of the player 
// const [play, { pause, duration, sound }] = useSound(RoveRanger);                 // initialize the audio with play, pause, durationn and sound method
  //-> sound will provide us with the howler.js method (research)


const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound }] = useSound(RoveRanger);
  
    const [currTime, setCurrTime] = useState({
      min: "",
      sec: "",
    });
  
    const [seconds, setSeconds] = useState();
  
    useEffect(() => {
      if (duration) {
        const sec = duration / 1000;
        const min = Math.floor(sec / 60);
        const secRemain = Math.floor(sec % 60);
        setCurrTime({
          min: min,
          sec: secRemain,
        });
      }
    }, [duration]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (sound) {
          setSeconds(sound.seek());
          const min = Math.floor(sound.seek() / 60);
          const sec = Math.floor(sound.seek() % 60);
          setCurrTime({
            min,
            sec,
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [sound]);
  
    const playingButton = () => {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        play();
      } else {
        pause();
      }
    };
  
    return (
      <div className="component">
        <h2>Playing Now</h2>
        <img
          className="musicCover"
          src="https://picsum.photos/200/200" // to be replaced with spotify artist image
        />
        <div>
          <h3 className="title">Jordy</h3>
          <p className="subTitle">RoveRanger</p>
        </div>
        <div>
          <div className="time">
            <p>
              {currTime.min}:{currTime.sec}
            </p>
            <p>
              {Math.floor(duration / 60000)}:
              {Math.floor((duration / 1000) % 60)}
            </p>
          </div>
          <input
            type="range"
            min="0"
            max={duration / 1000}
            defaultValue="0"
            value={seconds}
            className="timeline"
            onChange={(e) => {
              sound.seek(e.target.valueAsNumber);
            }}
          />
        </div>
        <div>
          <button className="btn btn-danger">
            <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
              <BiSkipPrevious />
            </IconContext.Provider>
          </button>
          {!isPlaying ? (
            <button
              className="btn btn-primary btn-lg"
              onClick={playingButton}
            >
              <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
                <AiFillPlayCircle />
                </IconContext.Provider>
         </button>
        ) : (
            <button className="btn btn-primary btn-lg" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
      <button className="btn btn-danger">
        <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
          <BiSkipNext />
        </IconContext.Provider>
      </button>
    </div>
  </div>                                                           
    );
}

export default MusicPlayer;

