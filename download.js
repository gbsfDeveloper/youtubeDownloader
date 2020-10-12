var YoutubeMp3Downloader = require("youtube-mp3-downloader");

function YTSetup(videoID,ffmpegPath="./tools/ffmpeg/bin/ffmpeg.exe",downloadRoute = "./tools") {
    var YD = new YoutubeMp3Downloader({
        "ffmpegPath": ffmpegPath,        // FFmpeg binary location
        "outputPath": downloadRoute,    // Output file location (default: the home directory)
        "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
        "queueParallelism": 1,                  // Download parallelism (default: 1)
        "progressTimeout": 500,                // Interval in ms for the progress reports (default: 1000)
        "allowWebm": false                      // Enable download from WebM sources (default: false)
    });
    return YD;
    // YD.download(videoID);
    
    // YD.on("finished", function(err, data) {
    //     if (err) {
    //         console.log(JSON.stringify(err));
    //     } else {
    //         console.log(JSON.stringify(data));
    //     }
    // });
    
    // YD.on("error", function(error) {
    //     console.log(error);
    // });
    
    // YD.on("progress", function(progress) {
    //     console.log(JSON.stringify(progress));
    // });
}


module.exports ={
    "settings":YTSetup
}