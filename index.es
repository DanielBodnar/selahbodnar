'use strict';

require('babel-core/register');
require("babel-polyfill");

const electron = require('electron');
const P = require('bluebird');
const fs = P.promisifyAll(require('fs-extra'));
const app = electron.app;

global.sounds = fs.readdirSync('./sounds').map(s => './sounds/' + s);
console.log(sounds);


// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	let conf = {
		width: 1200,
		height: 1080
	};

	if (process.env.NODE_ENV === 'prod') conf.kiosk = true;
	const win = new electron.BrowserWindow(conf);

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}


app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();

});
