import { useEffect, useState, useRef } from "react";
import {Howl} from 'howler';

const SongTest = ({supabase, songName}) => {
  const [songLink, setSongLink] = useState(""); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  console.log(songName);
  useEffect(() => {
    const publicUrl = supabase
    .storage
    .from('MP3')
    .getPublicUrl(songName)
    setSongLink(publicUrl.data.publicUrl);
    console.log(publicUrl);
  }, [])

  let sound = new Howl({
    src: [songLink],
    html5: true,
  })

  const soundPlay = () => {
    if (!sound.playing()) {
      sound.play();
    }
  };
  const soundStop = () => {
    console.log(sound.playing())
    sound.stop();
    setIsPlaying(false);
  };
  const soundPause = () => {
      sound.pause();
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
            <h3 className="display-5">{songName}</h3>
            <p className="subTitle">RoveRanger</p>
        </div>
          <div>
          </div>
          <div>
            <button className="btn btn-secondary">
              Back
            </button>
              <button className="btn btn-warning btn-lg" onClick={soundPlay} > 
                Play
            </button>

          <button className="btn btn-danger" onClick={soundPause} >
            Pause
            </button>
        <button className="btn btn-secondary" >
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

