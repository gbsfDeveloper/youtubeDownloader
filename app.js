const {google} = require('googleapis');
const clave_API_YT = 'AIzaSyCQVQLfjrfrEm7rCvtLwyAp2HRuvJRIWD0';
// downloadVideo.download("_U46oCEEvD0");

const videos = google.youtube({
    version:'v3',
    auth:clave_API_YT
})

async function searchVideos(){

    const foundVideos = await videos.search.list({
        q:'nirvana',
        part:'id,snippet',
        maxResults:15
    });

    for (const [key,value] of Object.entries(foundVideos.data.items)) {
        if (value.id.kind === "youtube#video") {
            console.log("------------------------------------------------------------------------------------------------------");
            console.log(value.id.videoId);
            console.log(value.snippet.title);
            console.log(value.snippet.description);
            console.log(value.snippet.thumbnails.default.url);
            
        }
    }
}

searchVideos();