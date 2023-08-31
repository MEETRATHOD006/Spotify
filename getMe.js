const fs = require('fs')
const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQAAfj2cjWFooNOCoPB7eXiw3vkkI2z1bXmBMmXhnmDZr17wuJXlgTIQVdWUxwBBArf5PXkJlgo6QwARPN_GlQBnRAGqs9e0-By3WOHsiKWhsDu0Jj0UojRWyZsEvERe5Cu5VceeLjKJRoxEi05fikEgloEzSfWAnz7yTIDxAhrv-KLoIFmjm2tvkojdM53OU5OiA4cInXqlGTttwmDCxZuWDGtAkU3rrIr0jLi_Tb2h2Ny9HCeuJcA_C5fycFcydxYVDNm-EGGjSfoqnED2hRhSunJWO0vwNg3opYVULxJ3iB0JqxHqsD80X4Ah-LhL_lUXwLTuBISbFpq83CbC";

app = express();
port = 8888

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/tracksData', (req, res) => {
  const tracksData = dataa; // Assuming the data is sent as JSON
  // console.log(tracksData);
  res.json(tracksData);
});

app.get('/api/searchResults', async (req, res) => {
  const query = req.query.query;
  try {
    const searchResults = await searchtracks(query);
    const searchData = searchResults.body.tracks.items;
    res.json(searchData);
  } catch (error) {
    console.error('Error getting search results:', error);
    res.status(500).json({ error: 'An error occurred while getting search results' });
  }
});


// app.get('/api/searchResults', (req, res) => {
//   const searchData = searchResults.body.tracks.items;
//   console.log(searchData); // Now you have access to the search
//   res.json(searchData)
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

let dataa;
let tracks = [];
//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
    
    let playlistTracks  = await getPlaylistTracks(playlist.id, playlist.name);
    tracks = tracks.concat(playlistTracks);

    const tracksJSON = { tracks }
    
    dataa = JSON.stringify(tracksJSON);
    // fs.writeFileSync(playlist.name+'.json', data);
  }
  for (i=0; i<JSON.parse(dataa).tracks.length; i++) {
  console.log(JSON.parse(dataa).tracks[i].name);}
  return dataa;
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    // console.log(track.name)
    // for (i=0; i < track_obj.track.artists.length; i++) {
    // console.log(" Artist " + track.artists[i].name)}
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  console.log(tracks.length)
  return tracks;
}
// let searchResults;

async function searchtracks(query) {
  try {
    const res = await spotifyApi.searchTracks(query);
    return res;
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
}

getMyData();
// searchtracks();


