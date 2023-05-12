import axios from "axios";

import { useEffect, useState } from "react";

const client_id = 'c9cf6d49f751465e83d620840d69e274';
const client_secret = '773eac77730f4e158c724ca72918b30c';

function MusicBox() {

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if(!token && hash) {
      token = hash.substring(1).split("&").find(e => e.startsWith("access_token")).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);

  }, []);

  const CLIENT_ID = '5795039be3b54e30a77e1acf68fa0782';
  const REDIRECT_URI = 'http://localhost:5173';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const data = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })
    console.log(data.data.artists.items);
    setArtists(data.data.artists.items);
  };

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>no image</div>}
      </div>
      )
    );
  };

  return (
    <div>
      Our MusicBox
      {!token? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
      : <button onClick={logout}>Logout</button>
      }

      {token ? 
      <form onSubmit={searchArtists}>
        <input type="text" onChange={e => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      : <h2>Please login</h2>
      }

      {renderArtists()}
      

    </div>
  );
};

export default MusicBox;