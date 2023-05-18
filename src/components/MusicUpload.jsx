import { useState } from "react";
import "./../css/MusicUpload.css"


const MusicUpload = ({supabase}) => {
  const [songEntry, setSongEntry] = useState({
    title: '',
    artist: '',
    genre: '',
    mp3: '',
  });

  const [file, setfile] = useState([]);

  const [submitStatus, setSubmitStatus ] = useState(false);

  const uploadSong = async (e) => {
    e.preventDefault();
    if (submitStatus) return alert("calm down you have already submitted");
    setSubmitStatus(true);
    const filename = `${file.name}`;

    //upload song data to supabase tables
    const {} = await supabase
      .from('songs')
      .insert({ 
        title: songEntry.title, 
        artist: songEntry.artist, 
        genre: songEntry.genre,
        mp3: songEntry.mp3 
      })

      // upload song file to supabase storage
      

      const { data, error } = await supabase.storage
      .from("MP3")
      .upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
      });
    console.log(songEntry);
    console.log(file);
  }

  const handleFileSelected = (e) => {
    setfile(e.target.files[0]);
    setSongEntry((previousValues) => {
      return {...previousValues,['mp3']: e.target.files[0].name}
    });
    };

  const handleFormText = (e) => {
    setSongEntry((previousValues) => {
      return {...previousValues,[e.target.name]: e.target.value}
    });
    };

  return(
    <div>
      <form onSubmit={uploadSong}> 
        <label>Title of Songs</label>
        <input type="text" name="title" required onChange={handleFormText} />
        <label>Artist</label>
        <input type="text" name="artist" onChange={handleFormText} />
        <label>Genre of Song</label>
        <input type="text" name="genre" onChange={handleFormText} />
        <label>File Name</label>
        <input type="file" name="mp3" accept=".mp3,audio/*" required onChange={handleFileSelected} />
        <button class="submit" type="submit">Submit Song</button>
        <p>{submitStatus && "You have submitted a song"}</p>
      </form>
    </div>
  )
}

export default MusicUpload;