require('dotenv').config();             // protect API keys 
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
var TOKEN_DIR = '\\.credentials\\';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

// Create an OAuth2 client with the given credentials, and then execute the given callback function.
export function authorize(callback) {
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
export function getNewToken(oauth2Client, callback) {
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
export function storeToken(token) {
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
