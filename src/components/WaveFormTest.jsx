// import { useEffect, useState, useRef } from "react";
// import useSound from "use-sound";                                    // for handling the sound
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; 
// import RoveRanger from "../assets/RoveRanger.mp3"    // icons for play and pause
// import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";                // icons for next and previous track
// import { IconContext } from "react-icons";                                  // for customising the icons
// import WaveSurfer from "wavesurfer.js";
// // import "wavesurfer.js/dist/wavesurfer.css"; //Import Wavesurfer.js styles 
// // import PropTypes from "prop-types";
// // import styled from 'styled-components';

// // const [isPlaying, setIsPlaying] = useState(false);                          // store the current status of the player 
// // const [play, { pause, duration, sound }] = useSound(RoveRanger);                 // initialize the audio with play, pause, durationn and sound method
//   //-> sound will provide us with the howler.js method (research)
// const WaveFormTest = () => {
//     const [play, { pause, duration, sound }] = useSound(RoveRanger);
//     // function for handling the play/pause buttons 
    
//     const containerRef = useRef();
//     const waveFormRef = useRef({
//         isPlaying: () => false,
//     }); // Reference to the wave
    
//     const [isPlaying, setIsPlaying] = useState(false);   

//   useEffect(() => {
//     // Create Wavesurfer instance
//     const waveSurfer = WaveSurfer.create({
//       container: containerRef.current, // Use the containerRef to set the container
//     //   waveColor: "violet",
//     //   progressColor: "purple",
//     });
//     waveSurfer.load(RoveRanger);
//     // Load the audio file
//     waveSurfer.on('ready', () => {
//         waveFormRef.current = waveSurfer
//     });

//     return () => {
//       // Clean up the WaveForm instance when the component unmounts
//       waveSurfer.destroy();
//     };
//   }, [RoveRanger]);

//   // return (
//   //   <WaveSurferWrap>
//   //     <button onClick={() => {
//   //       waveFormRef.current.playPause()
//   //       toggleIsPlaying(waveFormRef.current.isPlaying())
//   //     }}
//   //     type="button">
//   //       {isPlaying ? 'pause' : 'play'}
//   //     </button>
//   //   <div ref={containerRef.current} />
//   //   </ WaveSurferWrap>
//   // );
  






// const playingButton = () => {
//     setIsPlaying(!isPlaying);
//     if (!isPlaying) {
//       play();
//       waveformRef.current.play(); // Start the waveform visualization
//     } else {
//       pause();
//       waveformRef.current.pause(); // Pause the waveform visualization
//     }
//   };


// return (
//     <div className="component">
//     <h2>Playing Now</h2>
//     <img
//       className="musicCover"
//       src="https://picsum.photos/200/200"                                   // to be replaced with spotify artist image
//     />
//     <div>
//       <h3 className="title">Jordy</h3>
//       <p className="subTitle">RoveRanger</p>
//     </div>
//     <div>
//       <button className="btn btn-danger">
//         <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
//           <BiSkipPrevious />
//         </IconContext.Provider>
//       </button>
//       {!isPlaying ? (
//         <button className="btn btn-primary btn-lg" onClick={playingButton}>
//           <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
//             <AiFillPlayCircle />
//           </IconContext.Provider>
//         </button>
//       ) : (
//         <button className="btn btn-info" onClick={playingButton}>
//           <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
//             <AiFillPauseCircle />
//           </IconContext.Provider>
//         </button>
//       )}
//       <button className="btn btn-danger">
//         <IconContext.Provider value={{ size: "3em", color: "#F0F8FF" }}>
//           <BiSkipNext />
//         </IconContext.Provider>
//       </button>
//     </div>
//     <div ref={waveFormRef}></div> {/* Render the waveform visualization */}
//   </div>                                                           
//     );
// };

// // const WaveSurferWrap = styled.div`
// // display: grid;
// // grid-template-columns: 40px 1fr;
// // align-items: center;
// // button {
// //   width: 40px;
// //   height: 40px;
// //   border: none;
// //   padding: 0;
// //   background-color: white;
// // }
// // `;

// export default WaveFormTest;

import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import WaveSurfer from "wavesurfer.js"; // Import Wavesurfer.js
// import "wavesurfer.js/dist/wavesurfer.css"; // Import Wavesurfer.js styles

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

  // const handleVolumeChange = (event) => {
  //   const newVolume = parseFloat(event.target.value);
  //   setCurrentVolume(newVolume);
  //   // sound.volume(newVolume);
  //   console.log("A", sound.volume());
  // };

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
  };

  export default WaveFormTest;

  // Referenced from https://andreidobrinski.com/blog/implementing-an-audio-waveform-with-react-hooks-and-wavesurferjs/