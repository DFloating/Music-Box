import { useState } from "react";

const MusicUpload = ({supabase}) => {
  const [songEntry, setSongEntry] = useState({
    title: '',
    artist: '',
    genre: '',
    mp3: '',
  });

  const [file, setfile] = useState([]);

  const uploadSong = async (e) => {
    e.preventDefault();
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
        <input type="text" name="title" required onChange={handleFormText} />
        <input type="text" name="artist" onChange={handleFormText} />
        <input type="text" name="genre" onChange={handleFormText} />
        <input type="file" name="mp3" accept=".mp3,audio/*" required onChange={handleFileSelected} />
        <button type="submit">Submit Song</button>
      </form>
    </div>
  )
}

export default MusicUpload;