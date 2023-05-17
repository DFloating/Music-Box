import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";                                    // for handling the sound
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; 
import RoveRanger from "../assets/RoveRanger.mp3"    // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";                // icons for next and previous track
import { IconContext } from "react-icons";
import WaveSurfer from "wavesurfer.js"; // Import Wavesurfer.js                                // for customising the icons

const MusicPlayer = () => {
    const waveSurferRef = useRef({
      isPlaying: () => false,
    })
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound, volume }] = useSound(RoveRanger);
    const [currentVolume, setCurrentVolume] = useState(1);

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
      waveSurferRef.current.play(); // Start the waveform visualization
    } else {
      pause();
      waveSurferRef.current.pause(); // Pause the waveform visualization
    }
  };
  
    return (
      <div className="component">
        <h2 class="display-6">Playing Now</h2>
        <img
          className="musicCover"
          src="https://picsum.photos/300/300" // to be replaced with spotify artist image
        />
        <div>
          <h3 className="display-5">NMDA</h3>
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
          <button className="btn btn-secondary">
            <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
              <BiSkipPrevious />
            </IconContext.Provider>
          </button>
          {!isPlaying ? (
            <button
              className="btn btn-warning btn-lg"
              onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
                <AiFillPlayCircle />
                </IconContext.Provider>
         </button>
        ) : (
        <button className="btn btn-danger" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
      <button className="btn btn-secondary">
        <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
          <BiSkipNext />
        </IconContext.Provider>
      </button>
    </div>
    <div ref={waveformRef}></div> {/* Render the waveform visualization */}
    <div className="volume-control">
  <input
    type="range"
    min={0}
    max={100}
    // step={0.1}
    value={currentVolume}
    // min="0"
    // max="1"
    // step="0.1"
    // onChange={handleVolumeChange}
    onChange={(e) => setCurrentVolume(e.target.value)}
  />
</div>
  </div>                                                           
    );
}

export default MusicPlayer;

