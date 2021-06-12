require('dotenv').config();        // protect API keys
const auth__ = require('./auth__'); 
const auth = require('./auth'); 
const moment = require('moment');
const { google } = require('googleapis');
const fs = require('fs');

const API = google.youtube('v3');

let authKey="";
function getkey(authkey__){
    authKey = authkey__;
    console.log(authKey);
}
auth__.authorize(getkey)

// auth__.authorize(get_playlist_name);

// let time_stamp = "\n\n\n\n\n"+moment().format('YYYY-MM-DD HH:mm:ss');
// let playlist_id = "PLLL5jGu6uy1Ok5Mu0wQKgIVk9cdIoozZP";         // posibble values: LL: to get liked videos, LM: to get liked songs on youtube music 
// let playlist_name = "";
// let channel_name = "";
// let save__file="";

// async function get_playlist_name(authkey){
    
//     await API.playlists.list({
//         key: process.env.API_KEY,
//         auth:authkey,
//         part: "snippet",
//         id: playlist_id,
//     })
//     // get the name of the playlist
//     .then(res=>{
//         playlist_name =  res.data.items[0].snippet.title;
//         channel_name = res.data.items[0].snippet.channelTitle;
//         console.log("Playlist: "+playlist_name+" created by "+channel_name);
//         save__file  = "./output/"+playlist_name+" - "+channel_name+".txt";
//     })
//     .catch(e => { if(e) console.log("Error1: "+e);})

// }

// await get_playlist_name(authkey);

// // add video to playlist
// async function insert_to_playlist(authkey){    
//     await API.playlistItems.insert({
//         part:"snippet",
//         resource: {
//             snippet: {
//                 playlistId: "PLLL5jGu6uy1OwViOWP3znDgrFawG0y5_d",
//                 resourceId: {
//                     kind: "youtube#video",
//                     videoId: "CYm5yRqLbuM"
//                 }                
//             }
//         }
//     })
// }

// let links = [
//     ""
// ]

// links.forEach(video => {
//     inesr
// })



/*
Playlists
1. February P--A - PLLL5jGu6uy1PRBsyFjAx1IF054jhLErWx
2. My 2020 in Review - RDTMAK5uy_kjH2DUA7DggbL_933RlrEN9bpVsxbE7Wk
3. Soundtracks - PLLL5jGu6uy1N2F5F2UVS6jiTwrXw8nUVE
4. Pandas Tutorial - PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS
5. 12.03.2020 P -- A - PLLL5jGu6uy1Ok5Mu0wQKgIVk9cdIoozZP
6. To Pallav - PLLL5jGu6uy1OwViOWP3znDgrFawG0y5_d 

Videos
1. vlog - CYm5yRqLbuM
2. soem song - hz7GlXTRh-M
*/

// stackoverflow answer - https://stackoverflow.com/a/65453774/12864172