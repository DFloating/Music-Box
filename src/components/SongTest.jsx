import { useEffect, useState, useRef } from "react";
import {Howl} from 'howler';

const SongTest = ({supabase, songName}) => {
  const [songLink, setSongLink] = useState(""); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

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
    console.log(sound.playing())
    if (!sound.playing()) {
      sound.play();
    }
  };
  const soundStop = () => {
    console.log(sound.playing())
    sound.stop();
  };
  const soundPause = () => {
      sound.pause();
  };
  
    return (
      <div className="component">
        

<button onClick={soundPlay}>play song from supabase Url</button>
<button onClick={soundPause}>pause song from supabase Url</button>
<button onClick={soundStop}>Stop song from supabase Url</button>

  </div>                                                           
    );
}

export default SongTest;

