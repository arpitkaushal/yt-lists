require('dotenv').config();        // protect API keys
const auth__ = require('./auth__'); 
const moment = require('moment');
const { google } = require('googleapis');
const fs = require('fs');

const API = google.youtube('v3');

auth__.authorize(get_liked_playlist);

let time_stamp = "\n\n\n\n\n"+moment().format('YYYY-MM-DD HH:mm:ss');
let playlist_id = "PLLL5jGu6uy1MD8DpTEg8GGHTu_ZBm0Rrs";         // posibble values: LL: to get liked videos, LM: to get liked songs on youtube music 
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
        // save__file  = "./output/"+playlist_name+" - "+channel_name+".txt";
    })
    .catch(e => { if(e) console.log("Error1: "+e);})

}

// get all the liked videos by a channel
async function get_liked_playlist(authkey){
    
    await get_playlist_name(authkey);

    // fs.writeFile(save__file, time_stamp, { flag: 'a+' }, e => { if(e) console.log(e);} );
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
                console.log(`Title: ${item.snippet.title}\tURL: https://youtu.be/${item.snippet.resourceId.videoId}`)        
                i++;
                // text__ += "\nTitle: "+item.snippet.title+"\tURL: https://youtu.be/"+item.snippet.resourceId.videoId;
            });
            console.log("Items done: "+i);
        })
        .catch( e => { if(e) console.log("Error2: " + e) })
        
    } while (nextPageToken_ != null)

    // fs.writeFile(save__file, text__ , { flag: 'a+' }, e => { if(e) console.log("Error3 (fs): "+e); });

}


/*
Playlists
1. February P--A - PLLL5jGu6uy1PRBsyFjAx1IF054jhLErWx
2. My 2020 in Review - RDTMAK5uy_kjH2DUA7DggbL_933RlrEN9bpVsxbE7Wk
3. Soundtracks - PLLL5jGu6uy1N2F5F2UVS6jiTwrXw8nUVE
4. Pandas Tutorial - PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS
*/

// stackoverflow answer - https://stackoverflow.com/a/65453774/12864172