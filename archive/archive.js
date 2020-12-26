function get_liked_videos(authkey){
    
    // get all the liked videos
    fs.writeFile("../output/"+"all_liked_videos"+".txt", "\n"+time_stamp, { flag: 'a+' }, e => console.log(e) );
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
                // fs.writeFile("../output/"+"all_liked_videos"+".txt", text__ , { flag: 'a+' }, e => console.log(e) );
            });
        })
        .catch(e => console.log(e));

    }

}

function get_channel_videos(authkey){
    
    // get all the liked videos
    // fs.writeFile("../output/"+"all_liked_videos"+".txt", "\n"+time_stamp, { flag: 'a+' }, e => console.log(e) );
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
                // fs.writeFile("../output/"+"all_liked_videos"+".txt", text__ , { flag: 'a+' }, e => console.log(e) );
            // });
        })
        .catch(e => console.log(e));

    // }

}

// const express = require("express")          // framework for servers

// const app = express();

// app.listen(process.env.PORT_BACKEND, (err) => { 
//     if(err) console.log("Error is ",err);
//     else console.log("Server is up.")
// });



/* Title and URL from a search query

google.youtube('v3').search.list({
key: process.env.API_KEY,
    part: ["snippet,contentDetails"],
    q: "pallavi",
    maxResults: 100
}).then(res => {
    let results = res.data.items;
    results.forEach(item => {
        console.log(`\n\tTitle: ${item.snippet.title}\n\t URL: https://youtu.be/${item.id.videoId}`);
    });
}).catch(e => console.log(e));

*/
