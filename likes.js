require('dotenv').config();             // protect API keys 
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');
const moment = require('moment');
var readline = require('readline');

const API = google.youtube('v3');
const scopes = [
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.upload"
]
var TOKEN_DIR = '\\.credentials\\';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the YouTube API.
    authorize(JSON.parse(content), maintask);
});

// Create an OAuth2 client with the given credentials, and then execute the given callback function.
function authorize(credentials, callback) {
    //   console.log(credentials);
    var clientSecret = "Sa5UmkIACl4AuVioY5fhF4cq";
    var clientId = "793088516485-feji73bafeg40ahg49vfku0fhm7m1kl6.apps.googleusercontent.com";
    //   console.log(credentials.redirect_uris)
    //   var redirectUrl = credentials.redirect_uris;
    var redirectUrl = "https://arpitkaushal.github.io";
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


const time_stamp = "\n"+moment().format('YYYY-MM-DD HH:mm:ss');
const channel_id = "UClRH--NY6qebbMDMkXzxOBQ"


function maintask(authkey){
    
    API.videos.list({
        key: process.env.API_KEY,
        auth: authkey,
        part: "contentDetails",
        maxResults: 50,  // 50 is the max value
        // id: channel_id,
        // mine:true
        myRating:"like"
    })
    // get the name of the playlist
    .then(res=>{
        // console.log(res.data.items);
        let results = res.data.items;
        let text__ = "";
        results.forEach(item => {
            // console.log(`URL: https://youtu.be/${item.id}`)        
            text__ += "URL: https://youtu.be/"+item.id;
        });
        // console.log(res.data.items[0].contentDetails.relatedPlaylists.likes);
    })
    .catch(e => console.log(e));

}
