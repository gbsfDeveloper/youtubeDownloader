const {ipcRenderer} = require('electron');
setInterval(() => {
    console.log("Ejecutando test");
    ipcRenderer.send('getURL', '');
}, 10000);

ipcRenderer.on('actualURL', (event, URL) => {
    console.log(URL);
});