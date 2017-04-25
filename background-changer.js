var bg = [255, 255, 255]
let randomize = true

let min = 65
let max = 90

function getRandomInt () {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let randomLetter = getRandomInt
var currentLetter = getRandomInt()

var remote = require('electron').remote
let sounds = remote.getGlobal('sounds')
let play = playAudio(sounds).preload()

function ran_col () { // function name
  var color = '#' // hexadecimal starting symbol
  var letters = ['000000', 'FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0'] // Set your colors here
  color += letters[Math.floor(Math.random() * letters.length)]

  document.body.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16) // Setting the random color on your div element.
}

var celebrating = false
var prevSound

document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('msg').innerHTML = String.fromCharCode(currentLetter)
  console.log(currentLetter, document.getElementById('msg').innerHTML)
})

let onKeyPress = function onKeypress (event) {
  if (!celebrating && (event.charCode === currentLetter || event.charCode === (currentLetter + 32))) {
    celebrating = true
    element = document.getElementById(String.fromCharCode(event.charCode || event.char))

    bg.shift()
    bg.push(Number((((event.charCode || event.char) - 96) * 9.8).toFixed(0)))

    var celebrationSound = sounds.splice(Math.floor(Math.random() * (sounds.length - 1)) + 1, 1)[0]

    if (prevSound) sounds.push(prevSound)
    prevSound = celebrationSound

    var p = playAudio(celebrationSound).autoplay()
    let interval = window.setInterval(ran_col, 50)

    p.on('durationchange', function () {
      let duration = p.element().duration

      setTimeout(function () {
        clearInterval(interval)
        p.pause()
				// document.body.style.backgroundColor = 'rgb(' + bg[0] + ',' + bg[1] + ',' + bg[2] + ')';
        if (element) {
          element.style.backgroundColor = '#004f40'
					// keypress.push(record)
        }

        currentLetter = getRandomInt() // : (currentLetter <= max ? currentLetter + 1 : min)

        document.getElementById('msg').innerHTML = String.fromCharCode(currentLetter)
        celebrating = false
      }, duration * 1000)
    })
  }
}

document.addEventListener('keypress', onKeyPress, false)
