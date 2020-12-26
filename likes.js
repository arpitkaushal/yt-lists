require('dotenv').config();             // protect API keys 
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');
const moment = require('moment');
const readline = require('readline');
const deasync = require('deasync');

const API = google.youtube('v3');
const scopes = [
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.upload"
]
var TOKEN_DIR = '\\.credentials\\';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

// authorize(get_liked_videos);
// authorize(get_channel_videos);
authorize(get_liked_playlist);

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


const time_stamp = "\n"+moment().format('YYYY-MM-DD HH:mm:ss');
const channel_id = "UClRH--NY6qebbMDMkXzxOBQ"

function get_liked_videos(authkey){
    
    // get all the liked videos
    fs.writeFile("./output/"+"all_liked_videos"+".txt", "\n"+time_stamp, { flag: 'a+' }, e => console.log(e) );
    let nextPageToken = '';

    while(nextPageToken!=null){
        
        API.videos.list({
            key: process.env.API_KEY,
            auth: authkey,
            part: ["snippet,contentDetails"],
            maxResults: 50,  // 50 is the max value
            // id: channel_id,
            // mine:true
            myRating:"like",
            pageToken: nextPageToken
        })
        .then(res => {
            console.log(res);
            nextPageToken = res.data.nextPageToken;
            console.log(nextPageToken);
            let results = res.data.items;
            let text__ = "";
            results.forEach(item => {
                console.log(`URL: https://youtu.be/${item.id}`)  
                // text__ += "\nURL: https://youtu.be/"+item.id;
                // fs.writeFile("./output/"+"all_liked_videos"+".txt", text__ , { flag: 'a+' }, e => console.log(e) );
            });
        })
        .catch(e => console.log(e));

    }

}

function get_channel_videos(authkey){
    
    // get all the liked videos
    // fs.writeFile("./output/"+"all_liked_videos"+".txt", "\n"+time_stamp, { flag: 'a+' }, e => console.log(e) );
    // let nextPageToken = '';

    // while(nextPageToken!=null){
        
        API.channels.list({
            key: process.env.API_KEY,
            auth: authkey,
            part: "snippet,contentDetails",
            maxResults: 50,  // 50 is the max value
            mine:true
            // id: channel_id,
            // pageToken: nextPageToken
        })
        .then(res => {
            console.log(res.data.items[0].snippet);
            console.log(res.data.items[0].contentDetails);
            // nextPageToken = res.data.nextPageToken;
            // console.log(nextPageToken);
            // let results = res.data.items;
            // let text__ = "";
            // results.forEach(item => {
                // console.log(`URL: https://youtu.be/${item.id}`)  
                // text__ += "\nURL: https://youtu.be/"+item.id;
                // fs.writeFile("./output/"+"all_liked_videos"+".txt", text__ , { flag: 'a+' }, e => console.log(e) );
            // });
        })
        .catch(e => console.log(e));

    // }

}

// get all the liked videos by a channel
async function get_liked_playlist(authkey){
    
    fs.writeFile("./output/"+"all_liked_videos"+".txt", "\n"+time_stamp, { flag: 'a+' }, e => console.log(e) );
    let nextPageToken_ = null;
    let text__ = "";
    let i = 0;

    do {

        await API.playlistItems.list({
            key: process.env.API_KEY,
            auth: authkey,
            part: "snippet",
            maxResults: 50,  // 50 is the max value
            playlistId: "LL",
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
        .then( fs.writeFile("./output/"+"all_liked_videos"+".txt", text__ , { flag: 'a+' }, e => { if(e) console.log("error with fs\t"+e); }) )
        .then( text__ = "" )
        .catch( e => console.log("error here\t" + e) )
        
    } while (nextPageToken_ != null)

    if(text__.length>1) fs.writeFile("./output/"+"all_liked_videos"+".txt", text__ , { flag: 'a+' }, e => { if(e) console.log("error with fs\t"+e); });

}

// stackoverflow answer - https://stackoverflow.com/a/65453774/12864172