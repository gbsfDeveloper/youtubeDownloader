const { ipcMain, app, BrowserWindow } = require('electron')
const {download} = require("./download.js");
var path = require('path');
var ffmpegPath = path.join(__dirname, '.', '/tools/ffmpeg/bin/ffmpeg.exe');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow);

ipcMain.on('mensaje-asincrono', (event, arg) => {
  console.log(arg);
  event.sender.send('respuesta-asincrona', 'Nirvana');
})

ipcMain.on('download', (event, arg) => {
  console.log(parseInt(arg.progress.percentage));
  // event.sender.send('progress',parseInt(arg.progress.percentage));
})