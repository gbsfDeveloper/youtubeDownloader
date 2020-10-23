const { ipcMain, app, BrowserWindow, dialog} = require('electron')
const {download} = require("./download.js");
require('./server');
const fs = require('fs');
var path = require('path');
var ffmpegPath = path.join(__dirname, '.', '/tools/ffmpeg/bin/ffmpeg.exe');
var folderDefaultPath = path.join(__dirname, '.', '/downloads');

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

ipcMain.on('download', (event, arg) => {
	console.log(arg);
})

ipcMain.on('error', (event, error) => {
	console.log(error);
})

ipcMain.on('selectFolder',(event,arg) =>{
	dialog.showOpenDialog({
		title: 'Selecciona una ruta donde quieras guardar tus archivos',
		defaultPath: path.join(__dirname,'./downloads'),
		buttonLabel:'Seleccionar',
		filters:[{
			name : 'Archivos MP3',
			extensions : ['mp3']
		}],
		properties : ["openDirectory","promptToCreate"]
		
	}).then((folder) => {
		if (!folder.canceled) {
			event.sender.send('folderPath',folder.filePaths.toString());
		}else{
			dialog.showErrorBox(
				"Ruta no especificada",
				"Debes asignar una ruta donde guardar tus mp3 , la ruta por defecto es la carpeta \"downloads\" en el proyecto"
			)
			event.sender.send('folderPath', folderDefaultPath);
		}
	});
});