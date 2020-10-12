const {google} = require('googleapis');
const clave_API_YT = 'AIzaSyCQVQLfjrfrEm7rCvtLwyAp2HRuvJRIWD0';

const videos = google.youtube({
    version:'v3',
    auth:clave_API_YT
})

async function searchVideos(keyword="metallica"){

    const foundVideos = await videos.search.list({
        q:keyword,
        part:'id,snippet',
        maxResults:15
    });
    var videosArray = [];
    for (const [key,value] of Object.entries(foundVideos.data.items)) {
        if (value.id.kind === "youtube#video") {
            videosArray[`ID${key}`] = {
                "id":value.id.videoId,
                "title":value.snippet.title,
                "description":value.snippet.description,
                "url":value.snippet.thumbnails.default.url
            }
        }
    }
    return videosArray;
}

// searchVideos().then(function(data){
//     console.log(data);
// });

module.exports = {
    "searchVideos":searchVideos
}

