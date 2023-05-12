import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Buffer} from "buffer";

const client_id = 'c9cf6d49f751465e83d620840d69e274';
const client_secret = '773eac77730f4e158c724ca72918b30c';

function MusicBox() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      data: 'grant_type=client_credentials',
      // params: {
      //   grant_type: 'client_credentials',
      // },
      headers: {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios(authOptions)
      .then(response => {
        const token = response.data.access_token;
        setToken(token);
      })
      .catch(error => {
        // Handle error
      });
  }, []);

  return (
    <div>
      <p>Access Token: {token}</p>
      <p>Our MusicBox</p>
    </div>
  );
}

export default MusicBox;
