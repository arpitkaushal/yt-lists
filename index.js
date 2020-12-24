require('dotenv').config();             // protect API keys 
const { google } = require('googleapis');
const fs = require('fs');
const moment = require('moment');

const API = google.youtube('v3');

let time_stamp = "\n"+moment().format('YYYY-MM-DD HH:mm:ss');
let playlist_id = "PLLL5jGu6uy1PRBsyFjAx1IF054jhLErWx"
let playlist_name = "";

API.playlists.list({
    key: process.env.API_KEY,
    part: "snippet",
    id: playlist_id,
})
// get the name of the playlist
.then(res=>{
    
    playlist_name +=  res.data.items[0].snippet.title;
    console.log(playlist_name);
    fs.writeFile("./"+playlist_name+".txt", "" , { flag: 'a+' }, e => console.log(e) );

})
// get the items in the playlist
.then(
    
    API.playlistItems.list({
        key: process.env.API_KEY,
        part: "snippet",
        playlistId: playlist_id,
        maxResults: 25
    }).then(res => {
        
        let text__="";
        let results = res.data.items;

        results.forEach(item => {
            // console.log(`Title: ${item.snippet.title}\tURL: https://youtu.be/${item.snippet.resourceId.videoId}`)        
            text__ += "\nTitle: "+item.snippet.title+"\tURL: https://youtu.be/"+item.snippet.resourceId.videoId;
        });
        fs.writeFile("./"+playlist_name+".txt", "\n"+time_stamp+text__, { flag: 'a+' }, e => console.log(e) );

}))
.catch( e => console.log(e) );







// Playlist I'll be working with
// PLLL5jGu6uy1PRBsyFjAx1IF054jhLErWx

/*

This example retrieves the list of videos in a specified playlist. The request's playlistId parameter identifies the playlist.
Note that the API response does not include metadata about the playlist itself, such as the playlist's title and description. Additional metadata about the videos in the playlist can also be retrieved using the videos.list method.


https://youtube.googleapis.com/youtube/v3/playlistItems?playlistId=PLLL5jGu6uy1PRBsyFjAx1IF054jhLErWx&key=AIzaSyClitZlAZGMf3xoS_qbF_HH7z7y2Do6wHg


*/