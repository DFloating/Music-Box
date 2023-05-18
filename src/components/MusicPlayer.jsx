import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";          // for handling the sound
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import RoveRanger from "../assets/RoveRanger.mp3"    
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";  // icons for next and previous track
import { IconContext } from "react-icons"; // for customising the icons
import WaveSurfer from "wavesurfer.js"; //Import Wavesurfer.js
import { skipForward } from "wavesurfer";


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


    const playSong = (index) => {
      setCurrentSongIndex(index);
      setIsPlaying(true);
      play({
        onsend: () => {
          handleSkipForward();
        },
      });
      waveSurferRef.current.play();
    };

    const handleSkipForward = () => {
      if (currentSongIndex === 0) {
        setCurrentSongIndex(songs.length - 1);
      } else {
        setCurrentSongIndex(currentSongIndex -1);
      }
      setIsPlaying(false);
    };

    const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        play();
        waveSurferRef.current.play();
      } else {
        pause();
        waveSurferRef.current.pause();
      }
    }
  
  //   const playingButton = () => {
  //   setIsPlaying(!isPlaying);
  //   if (!isPlaying) {
  //     play();
  //     waveSurferRef.current.play(); // Start the waveform visualization
  //   } else {
  //     pause();
  //     waveSurferRef.current.pause(); // Pause the waveform visualization
  //   }
  // };
  
    return (
      <div>

        {/* <div className="grid"> */}

          <div className="component">
                <h2 className="display-6">Playing Now</h2>
                  <img className="musicCover" src="https://picsum.photos/200/200"/>
              {/* <div className="time">
                <p> {currTime.min}:{currTime.sec} </p>
                <p> {Math.floor(duration / 60000)}:{Math.floor((duration / 1000) % 60)} </p>
              </div> */}
              <h3 className="display-5">NMDA</h3>
                <p className="subTitle">RoveRanger</p>
          </div>
            
          <div className="main">
          
              <div className="time">
                <p> {currTime.min}:{currTime.sec} </p>
                <p> {Math.floor(duration / 60000)}:{Math.floor((duration / 1000) % 60)} </p>
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
          
            <div className="buttons">
                <button className="btn btn-secondary">
                  <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
                    <BiSkipPrevious />
                  </IconContext.Provider>
                </button>
                  {!isPlaying ? (
                <button
                  className="btn btn-warning btn-lg"
                  onClick={()=> playSong(index)}>
                  <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
                    <AiFillPlayCircle />
                  </IconContext.Provider>
                </button>
                    ) : (
                <button className="btn btn-danger" onClick={handlePlayPause}>
                  <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
                    <AiFillPauseCircle />
                  </IconContext.Provider>
                </button>
                    )}
                <button className="btn btn-secondary" onClick={skipForward}>
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
        {/* </div> */}

      </div>                                                           
    );
}

export default MusicPlayer;

