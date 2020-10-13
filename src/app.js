let {DOM} = require('./DOMElements');// la ruta se toma desde el index.html
let {searchVideos} = require("../search.js");
let {settings} = require("../download.js");
const {ipcRenderer} = require('electron');
let defaultDownloadPath = "../downloads";

DOM.folderButton.on('click',(event) =>{
	ipcRenderer.send('selectFolder', 'Llego?');
});

ipcRenderer.on('folderPath', (event, path) => {
    defaultDownloadPath = path;
});

ipcRenderer.send('selectFolder');

function generateCard(title,description,imageURL,videoID) {
	let foundedCard = $(`
		<div class="card">
			<div class="card_infoContainer">
				<div class="card_imgContainer">
					<img class="card_image" src="${imageURL}" alt="">
				</div>
				<div class="card_text">
					<p class="card_title"><b>${title}</b></p>
					<!-- <p id="vid_${videoID}" class="card_subtitle">${description}</p> -->
					<div class="card_loadBarContainer">
						<div id="vid_${videoID}" class="card_loadBar">%0</div>
					</div>
				</div>
			</div>
			<div class="card_buttonContainer">
				<button id="${videoID}" class="card_downloadButton"><p>Descargar</p><p>Flechita</p></button>
			</div>
		</div>
	`);
	return foundedCard;
}

DOM.search_button.on('click', async ()=>{
	let videoLIST = await searchVideos(DOM.search_input.val());
	DOM.search_result.empty();
	for (const [key,video] of Object.entries(videoLIST)) {
		let title = video.title;
		let description = video.description;
		let url = video.url;
		let idVIdeo = video.id;

		// ipcRenderer.send('mensaje-asincrono', 'video encontrado');
		DOM.search_result.append(generateCard(title,description,url,idVIdeo))
		$(`#${idVIdeo}`).on('click',()=>{
			// ipcRenderer.send('download', idVIdeo);
			let YTDownload = settings(idVIdeo,defaultDownloadPath);
			console.log(idVIdeo);
			console.log(YTDownload);
			YTDownload.download(idVIdeo);
			YTDownload.on("progress", function(progress) {
				$(`#vid_${idVIdeo}`).text("%" + parseInt(JSON.stringify(progress.progress.percentage)));
				$(`#vid_${idVIdeo}`).css("width",`${parseInt(JSON.stringify(progress.progress.percentage))}%`);
			});
			YTDownload.on("error", function(err) {
				ipcRenderer.send('error',err);
			});
		});
	}
});

