require('dotenv').config();        // protect API keys 
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');
const moment = require('moment');
const readline = require('readline');

const API = google.youtube('v3');
const scopes = [
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.upload"
]
var TOKEN_DIR = '\\.credentials1\\';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

authorize(get_liked_playlist);
// authorize(get_playlist_name);

let time_stamp = "\n\n\n\n\n"+moment().format('YYYY-MM-DD HH:mm:ss');
let channel_id = "UClRH--NY6qebbMDMkXzxOBQ"
let playlist_id = "LM"; // posibble values: LL: to get liked videos, LM: to get liked songs on youtube music 
let playlist_name = "";
let channel_name = "";
let save__file="";

async function get_playlist_name(authkey){
    
    await API.playlists.list({
        key: process.env.API_KEY,
        auth:authkey,
        part: "snippet",
        id: playlist_id,
    })
    // get the name of the playlist
    .then(res=>{
        playlist_name =  res.data.items[0].snippet.title;
        channel_name = res.data.items[0].snippet.channelTitle;
        console.log("Playlist name is "+playlist_name+" created by "+channel_name);
        save__file  = "./output/"+playlist_name+" - "+channel_name+".txt";
    })
    .catch(e => { if(e) console.log("Error1: "+e);})

}

// get all the liked videos by a channel
async function get_liked_playlist(authkey){
    
    await get_playlist_name(authkey);

    fs.writeFile(save__file, time_stamp, { flag: 'a+' }, e => { if(e) console.log(e);} );
    let nextPageToken_ = null;
    let text__ = "";
    let i = 0;

    do {

        await API.playlistItems.list({
            key: process.env.API_KEY,
            auth: authkey,
            part: "snippet",
            maxResults: 50,  // 50 is the max value
            playlistId: playlist_id, 
            pageToken: nextPageToken_
        })
        .then(res => {
            let results = res.data.items;
            nextPageToken_ = res.data.nextPageToken;
            results.forEach(item => {
                // console.log(`Title: ${item.snippet.title}\tURL: https://youtu.be/${item.snippet.resourceId.videoId}`)        
                i++;
                text__ += "\nTitle: "+item.snippet.title+"\tURL: https://youtu.be/"+item.snippet.resourceId.videoId;
            });
            // console.log("items done: "+i+"\tnextPageToken: "+nextPageToken_);
        })
        .catch( e => { if(e) console.log("Error2: " + e) })
        
    } while (nextPageToken_ != null)

    fs.writeFile(save__file, text__ , { flag: 'a+' }, e => { if(e) console.log("error with fs\t"+e); });

}

// stackoverflow answer - https://stackoverflow.com/a/65453774/12864172

// Create an OAuth2 client with the given credentials, and then execute the given callback function.
function authorize(callback) {
    var clientSecret = process.env.CLIENT_SECRET;
    var clientId = process.env.CLIENT_ID;
    var redirectUrl = process.env.REDIRECT_URL;
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
        getNewToken(oauth2Client, callback);
    } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
    }
    });
}

// Get and store new token after prompting for user authorization, and then 
// execute the given callback with the authorized OAuth2 client.
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
      });
    });
}
  
// Store token to disk be used in later program executions.
function storeToken(token) {
try {
    fs.mkdirSync(TOKEN_DIR);
} catch (err) {
    if (err.code != 'EEXIST') {
    throw err;
    }
}
fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
});
}

/*
Playlists
1. February P--A - PLLL5jGu6uy1PRBsyFjAx1IF054jhLErWx
2. My 2020 in Review - RDTMAK5uy_kjH2DUA7DggbL_933RlrEN9bpVsxbE7Wk
3. Soundtracks - PLLL5jGu6uy1N2F5F2UVS6jiTwrXw8nUVE
*/