const fs = require('fs');
const ytdl = require('ytdl-core');

const URL = "http://www.youtube.com/watch?v=A02s8omM_hI";

function downloadVideo(URL){
    if(ytdl.validateURL(URL)){
        ytdl(URL,{ quality: 'highestaudio'})
        .pipe(fs.createWriteStream('video.mp4'));
    }
    else{
        console.log("ENlace no valido");
    }
}


downloadVideo(URL);