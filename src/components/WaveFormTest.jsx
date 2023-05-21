import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import WaveSurfer from "wavesurfer.js"; // Import Wavesurfer.js (API for waveform feature)


import RoveRanger from "../assets/RoveRanger.mp3";

const WaveFormTest = () => {
  const waveSurferRef = useRef({
    isPlaying: () => false,
  })
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound, volume }] = useSound(RoveRanger);
  const [currentVolume, setCurrentVolume] = useState(1);

  const audioRef = useRef(); // Reference to the audio element
  const waveformRef = useRef(null); // Reference to the Wavesurfer instance

  useEffect(() => {
    // Create Wavesurfer instance
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current, // Use the waveformRef to set the container
      waveColor: "violet",
      progressColor: "purple",
    });

    // Load the audio file
    wavesurfer.load(RoveRanger);
    wavesurfer.on('ready', () => {
      waveSurferRef.current = wavesurfer;
    });

    return () => {
      // Clean up the Wavesurfer instance when the component unmounts
      wavesurfer.destroy();
    };
  }, []);

  useEffect(() => {
    // Update the volume when the currentVolume state changes
    if (sound) {
      sound.volume(currentVolume/100);
      console.log("B", sound.volume());
    }
  }, [currentVolume, sound]);

  const playingButton = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      play();
      waveSurferRef.current.play(); // Start the waveform visualization
    } else {
      pause();
      waveSurferRef.current.pause(); // Pause the waveform visualization
    }
  };

  return (
    <div className="component">
      <h2>Playing Now</h2>
      <img
        className="musicCover"
        
        src="https://picsum.photos/200/200"
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
          <button
            className="btn btn-primary btn-lg"
            onClick={playingButton}
          >
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
      <div ref={waveformRef}></div> Render the waveform visualization
      <div className="volume-control">
  <input
    type="range"
    min={0}
    max={100}
    value={currentVolume}
    onChange={(e) => setCurrentVolume(e.target.value)}
  />
    </div>
    </div> 
    );
  };

  export default WaveFormTest;

  // Referenced from https://andreidobrinski.com/blog/implementing-an-audio-waveform-with-react-hooks-and-wavesurferjs/