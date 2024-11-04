// spotifyApi.js
import axios from 'axios';
import qs from 'qs';

// Replace these with your actual Client ID and Client Secret
const clientID = '740c85a0955045aca0f690b92635fbbe';  
const clientSecret = 'df6bbe67f5fa4f44b0c9c03d75981868';  

// Function to get access token
export const getAccessToken = async () => {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', 
        qs.stringify({ grant_type: 'client_credentials' }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
            }
        }
    );
    return tokenResponse.data.access_token;
};

// Function to fetch songs from a Spotify playlist
export const fetchSongsFromPlaylist = async (playlistId) => {
    const token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data.items;
};
