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
