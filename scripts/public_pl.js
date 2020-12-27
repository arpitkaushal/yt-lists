// get songs from a playlistId 
require('dotenv').config();             // protect API keys 
const { google } = require('googleapis');
const fs = require('fs');
const moment = require('moment');

const API = google.youtube('v3');

let time_stamp = "\n"+moment().format('YYYY-MM-DD HH:mm:ss');
let playlist_id = "PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS";
let playlist_name = "";
let save__file = "";

get_playlist();

async function get_playlist(){


    await API.playlists.list({
        key: process.env.API_KEY,
        part: "snippet",
        id: playlist_id,
    })
    // get the name of the playlist
    .then(res=>{
        playlist_name +=  res.data.items[0].snippet.title;
        console.log("Playlist name is "+playlist_name);
        save__file  = "./output/"+playlist_name+".txt";
    })
    .catch(e => { if(e) console.log("Error1: "+e);})
    
    if(playlist_name=="") return;

    fs.writeFile(save__file, "" , { flag: 'a+' }, e => { if(e) console.log(e) })

    // get the items in the playlist
    let nextPageToken_ = null;
    let text__ = "";
    let i = 0;
    
    do {
        
        await API.playlistItems.list({
            key: process.env.API_KEY,
            part: "snippet",
            playlistId: playlist_id,
            maxResults: 3,
            pageToken: nextPageToken_
        })
        .then(res => {
            let results = res.data.items;
            nextPageToken_ = res.data.nextPageToken;
            results.forEach(item => {
                // console.log(`Title: ${item.snippet.title}\tURL: https://youtu.be/${item.snippet.resourceId.videoId}`)        
                text__ += "\nTitle: "+item.snippet.title+"\tURL: https://youtu.be/"+item.snippet.resourceId.videoId;
                i++
            });
            // console.log("items done: "+i+"\tnextPageToken: "+nextPageToken_);
        })
        .catch( e => {if (e) console.log(e); });
        
    } while (nextPageToken_ != null)
    
    fs.writeFile(save__file, "\n"+time_stamp+text__, { flag: 'a+' }, e => {if(e) console.log(e); })

}



// https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=<YOUR_API_KEY>&acces_token=<Auth_key>

/*
Playlists
1. February P--A - PLLL5jGu6uy1PRBsyFjAx1IF054jhLErWx
2. My 2020 in Review - RDTMAK5uy_kjH2DUA7DggbL_933RlrEN9bpVsxbE7Wk
3. Soundtracks - PLLL5jGu6uy1N2F5F2UVS6jiTwrXw8nUVE
4. My 2020 Year in Review - RDTMAK5uy_kjH2DUA7DggbL_933RlrEN9bpVsxbE7Wk
*/