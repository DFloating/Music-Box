import axios from "axios";
import {Buffer} from "buffer";


const client_id = 'c9cf6d49f751465e83d620840d69e274';
const client_secret = '773eac77730f4e158c724ca72918b30c';

function MusicBox() {

  const CLIENT_ID = 'c9cf6d49f751465e83d620840d69e274';
const CLIENT_SECRET = '773eac77730f4e158c724ca72918b30c';
const REDIRECT_URI = 'http://localhost:5174';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';



  return (
    <div>
      Our MusicBox
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
    </div>
  );
};

export default MusicBox;