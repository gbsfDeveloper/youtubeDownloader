const { ipcMain, app, BrowserWindow, dialog} = require('electron')
const {download} = require("./download.js");
const fs = require('fs');
var path = require('path');
var ffmpegPath = path.join(__dirname, '.', '/tools/ffmpeg/bin/ffmpeg.exe');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    },
    enableRemoteModule:true
  })

  // and load the index.html of the app.
  win.loadFile('./src/index.html')
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.on('mensaje-asincrono', (event, arg) => {
  console.log(arg);
  event.sender.send('respuesta-asincrona', 'Cancion');
})

ipcMain.on('download', (event, arg) => {
  console.log(parseInt(arg.progress.percentage));
  // event.sender.send('progress',parseInt(arg.progress.percentage));
})

ipcMain.on('showDialog',(event,arg) =>{
  
  console.log('Llego');
  dialog.showSaveDialog({
		title:'Donde quieres guardar tu archivo',
		defaultPath: path.join(__dirname,'./downloads/sample.mp3'),
		buttonLabel:'Guardar',
		filters:[
			{
				name:'MP3 files',
				extensions:['mp3']
			}
		],
		properties:[]
	}).then((file)=>{
		console.log(file.canceled);
		if (!file.canceled) {
			console.log(file.filePath.toString());
			fs.writeFile(file.filePath.toString(),'asdasdasd',(err)=>{
				if (err) {
					throw err;
				}
				console.log('Saved!');
			});
		}
  });
  
});