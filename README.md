# The plan

## Phase 1 - CLI 
1. With OAuth
   1. Get their liked videos.
      1. Links and Titles (Try to get just Music if the type of video is specified)
      2. Put them in a file. 
   2. Create a text file and ask the user to describe their playlists in a specific format (for no parse problems). Give a dummy file with components that they can reproduce as needed. *Note this method currently can create new playlists but can't update them* `e.g`. -  
      1. you give a heading - this will become the title of the playlist)
      2. You copy lines (each line represents one item i.e. song (Link+Title)) from the file genereated before (from their liked videos) and paste them under the title (i.e. the soon to become playlist). This eases the task of parsing, since we're copying the output in it's original form. 
         1. Here we can also give them an option to search for a video, and retrieve the top result or top `k` results with links right on the terminal so that they can check which one is the correct. 
   3.  After you've created your file, you just enter a command such as 'generate'.
   4.  the playlists are generated which will soon appear on your profile. 

2. Without OAuth
   1. Ask the user to make their liked videos public for a little while (till the app extarcts the video titles and links), or clone it and make that public. 
      1. They then give the link to the parent playlist.
   2. Same as Step 2 in the `With OAuth` section above.
   3. Same as Step 3 in the `With OAuth` section above.

3. Some random features to add - 
   1. Download - using youtube-dl script 
      1. a random set of songs from a playlist or from all playlists
      2. top (or most recent) 20% songs
      3. bootom (or oldest) 20% songs
   2. Store user data in json files, make incremental changes possible, so if playlist updated shouldn't have to retrieve all of it again, APPEND 


## Phase 2 - Web-App