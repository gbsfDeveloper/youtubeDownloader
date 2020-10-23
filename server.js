const express = require('express');
const server = express();
const fetch = require("node-fetch");
// settings
server.set('port','4000');


// Routes
server.get("/",(req,res) => {
    res.send("perrin")
});

// functions
function searchVideo(video_id){
    return fetch(`http://localhost/download.php?video_id=${video_id}`)
    .then((response) => {
        return response.json();
    })
}

server.get("/video/:video_id",(req,res) => {
    if(req.params.video_id !== 'undefined' || req.params.video_id !==null){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        let videoID = req.params.video_id;
        // console.log(req.params.video_id);
        $URL = `https://www.yt-download.org/api/button/mp3/${videoID}`;
        fetch($URL).then((response) => {
            return response.text();
        }).then((data)=>{
            let regex1 = /(?<=<a href=")(.*?)(?=\")/g; 
            let matches = data.match(regex1);
            var MP3urlsArray = {};
            for (let url of matches) {
                let regex2 = new RegExp(`(?<=https:\/\/www.yt-download.org\/download\/${videoID}\/mp3\/)(.*?)(?=\/)`, 'g')
                let quality_match = url.match(regex2);
                let mp3_quality = quality_match[0];
                MP3urlsArray[`mp3-${mp3_quality}`] = url;
            }
            res.send(JSON.stringify(MP3urlsArray));
        });
    }
    else{
        res.send("Debes mandar un ID de un video");
    }
});

const port = server.get('port');
server.listen(port,() => {
    console.log(`Listen on port ${port}`);
});

