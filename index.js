'use strict'

const electron = require('electron')
const fs = require('fs')
var googleTTS = require('google-tts-api')

global.letters = {}

for (let i = 65; i < 91; i++) {
  let letter = String.fromCharCode(i)
  global.letters[letter] = googleTTS(letter, 'en', 1)
}

var app = electron.app

global.sounds = fs.readdirSync('./sounds').map(s => './sounds/' + s)

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()

// prevent window being garbage collected
var mainWindow = void 0

function onClosed () {
	// dereference the window
	// for multiple windows store them in an array
  mainWindow = null
}

function createMainWindow () {
  var conf = {
    width: 1200,
    height: 1080
  }

  if (process.env.FULLSCREEN != 'false') conf.kiosk = true
  var win = new electron.BrowserWindow(conf)

  win.loadURL('file://' + __dirname + '/index.html')
  win.on('closed', onClosed)

  return win
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', function () {
  mainWindow = createMainWindow()
})
