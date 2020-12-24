require('dotenv').config();             // protect API keys 

const {google} = require('googleapis');
google.youtube('v3').search.list({
    key: process.env.API_KEY,
    part: ["snippet,contentDetails"],
    q: "pallavi",
    // playlistID:"PLLL5jGu6uy1PRBsyFjAx1IF054jhLErWx",
    maxResults: 100
}).then(res => {
    let results = res.data.items;
    results.forEach(item => {
        console.log(`\n\tTitle: ${item.snippet.title}\n\t URL: https://youtu.be/${item.id.videoId}`);
    });
}).catch(e => console.log(e));
    


// Playlist I'll be working with
// PLLL5jGu6uy1PRBsyFjAx1IF054jhLErWx

/*

This example retrieves the list of videos in a specified playlist. The request's playlistId parameter identifies the playlist.
Note that the API response does not include metadata about the playlist itself, such as the playlist's title and description. Additional metadata about the videos in the playlist can also be retrieved using the videos.list method.


https://youtube.googleapis.com/youtube/v3/playlistItems?playlistId=PLLL5jGu6uy1PRBsyFjAx1IF054jhLErWx&key=AIzaSyClitZlAZGMf3xoS_qbF_HH7z7y2Do6wHg


*/