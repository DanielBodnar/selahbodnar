'use strict';

var electron = require('electron');
var P = require('bluebird');
var fs = require('fs');
var app = electron.app;

global.sounds = fs.readdirSync('./sounds').map(s => './sounds/' + s);

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
var mainWindow = void 0;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	var conf = {
		width: 1200,
		height: 1080
	};

	if (process.env.FULLSCREEN != 'false') conf.kiosk = true;
	var win = new electron.BrowserWindow(conf);

	win.loadURL('file://' + __dirname + '/index.html');
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', function () {
	mainWindow = createMainWindow();
});
