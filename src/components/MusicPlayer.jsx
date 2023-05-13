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
 
                                                // function for handling the play/pause buttons 
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
      src="https://picsum.photos/200/200"                                   // to be replaced with spotify artist image
    />
    <div>
      <h3 className="title">Jordy</h3>
      <p className="subTitle">RoveRanger</p>
    </div>
    <div>
      <button className="btn btn-danger">
        <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
          <BiSkipPrevious />
        </IconContext.Provider>
      </button>
      {!isPlaying ? (
        <button className="btn btn-primary btn-lg" onClick={playingButton}>
          <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
            <AiFillPlayCircle />
          </IconContext.Provider>
        </button>
      ) : (
        <button className="btn btn-info" onClick={playingButton}>
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

