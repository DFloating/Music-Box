import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";                                    // for handling the sound
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; 
import RoveRanger from "../assets/RoveRanger.mp3"    // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";                // icons for next and previous track
import { IconContext } from "react-icons";
import WaveSurfer from "wavesurfer.js"; // Import Wavesurfer.js                                // for customising the icons
import {Howl} from 'howler';

const SongTest = ({supabase}) => {
  const [songLink, setSongLink] = useState(""); 
  const soundRef = useRef(null) ;
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);



  useEffect(() => {
    const publicUrl = supabase
    .storage
    .from('MP3')
    .getPublicUrl('Iron Cyclone Mst.mp3')
    setSongLink(publicUrl.data.publicUrl);
    console.log(publicUrl);
  }, [])

  const soundPlay = (src) => {
    soundRef.current = new Howl({
      src: songLink,
      html5: true,
      onplay: () => setIsPlaying(true),
      onend: () => setIsPlaying(false),
    });
    soundRef.current.play();
  };

  const soundPause = () => {
    if (soundRef.current) {
        soundRef.current.pause();
        setIsPlaying(false);
      }
    };

    //Below part is not in use (useEffect + prev&nextTrack constants)
    useEffect(() => {
        const fetchTracks = async () => {
          const { data, error } = await supabase.from('tracks').select('*').order('order');
          if (error) {
            console.error('Error fetching tracks:', error);
          } else {
            setTracks(data);
          }
        };
      
        fetchTracks();
      }, []);

      const playPreviousTrack = () => {
        const previousTrackIndex = currentTrackIndex - 1;
        if (previousTrackIndex >= 0) {
          setCurrentTrackIndex(previousTrackIndex);
          const previousTrack = tracks[previousTrackIndex];
          soundRef.current = new Howl({
            src: previousTrack.url, // Assuming you have a field named 'url' in the tracks table
            html5: true,
            onplay: () => setIsPlaying(true),
            onend: () => setIsPlaying(false),
          });
          soundRef.current.play();
        }
      };
      
      const playNextTrack = () => {
        const nextTrackIndex = currentTrackIndex + 1;
        if (nextTrackIndex < tracks.length) {
          setCurrentTrackIndex(nextTrackIndex);
          const nextTrack = tracks[nextTrackIndex];
          soundRef.current = new Howl({
            src: nextTrack.url, // Assuming you have a field named 'url' in the tracks table
            html5: true,
            onplay: () => setIsPlaying(true),
            onend: () => setIsPlaying(false),
          });
          soundRef.current.play();
        }
      };
      
      

  
  
    return (
      <div className="component">
        {/* <h2 className="display-6">Playing Now</h2>
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
    {/* <div className="volume-control">
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
</div>  */}

<button onClick={() => soundPlay(songLink)}>play song from supabase Url</button>
<button onClick={() => soundPause(songLink)}>pause song from supabase Url</button>

<button className="btn btn-secondary" onClick={playPreviousTrack}>
  <IconContext.Provider value={{ size: '3em', color: '#F0F8FF' }}>
    <BiSkipPrevious />
  </IconContext.Provider>
</button>

<button className="btn btn-secondary" onClick={playNextTrack}>
  <IconContext.Provider value={{ size: '3em', color: '#F0F8FF' }}>
    <BiSkipNext />
  </IconContext.Provider>
</button>
  </div>                                                           
    );
}

export default SongTest;

