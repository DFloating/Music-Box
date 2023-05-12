import axios from "axios";
import {Buffer} from "buffer";

const client_id = 'c9cf6d49f751465e83d620840d69e274';
const client_secret = '773eac77730f4e158c724ca72918b30c';

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))},
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

function MusicBox() {
  axios.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let token = body.access_token;
    }
  });

MusicBox();
  return (
    <div>
      Our MusicBox
    </div>
  );
};

export default MusicBox;