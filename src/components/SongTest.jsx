import { useEffect, useState, useRef } from "react";
import {Howl} from 'howler';

const SongTest = ({supabase, songName}) => {
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
    return (

      <div className="parent">

              <div className="component card">
                <h4 className="display-6">Playing Now</h4>
                <img
                  className="musicCover"
                  src="https://picsum.photos/200/200" // to be replaced with spotify artist image
                />
                <h5 className="display-5">{songName}</h5>
                
              </div>

        <div className="main card">

              {/* <div className="information">
                  <h3 className="display-5">{songName}</h3>
                  <p className="subTitle">RoveRanger</p>
              </div> */}
                
                
                      <button className="btn btn-secondary">
                        Back
                      </button>
                        <button className="btn btn-warning btn-lg" onClick={handlePlaySong} > 
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
    );
}

export default SongTest;

