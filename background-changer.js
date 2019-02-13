var bg = [255, 255, 255]
let randomize = true

let startingLetter = 65
let endingLetter = 89
let reverse = false;

function getRandomInt(min = startingLetter, max = endingLetter) {
        return Math.floor(Math.random() * (max - min + 1)) + min
}

let randomLetter = getRandomInt
var currentLetter = startingLetter // getRandomInt()
var letter = String.fromCharCode(currentLetter)

var remote = require('electron').remote
let sounds = remote.getGlobal('sounds')
let googleTTS = remote.require('google-tts-api')
let play = playAudio(sounds).preload()

let phrases = ['Can you say the ', 'How about ', 'Where is ']
let congrats = ['Good job!', 'Well done!', 'I\'m so proud of you!', 'You\'re so smart!']

let getRandom = (arr) => arr[Math.floor(Math.random() * (arr.length - 1 + 1)) + 1]

let speechInterval

let playSound = (sound) => {
        return new Promise(function(resolve, reject) {
                let p = playAudio(sound).autoplay()
                p.on('durationchange', function() {
                        let duration = p.element().duration

                        setTimeout(function() {
                                p.pause()
                                resolve()
                        }, duration * 1000)
                })
        })
}

let speak = () => {
        if (speechInterval) {
                clearInterval(speechInterval)
        }
        googleTTS(letter, 'en', 1).then((url) => {
                return playSound(url).then(() => {
                        speechInterval = setInterval(() => playSound(url), 10000)
                        return speechInterval
                })
        })
        // .then((url) => {
        //   return playSound(url)
        // })
}
speak()

function randomColor() { // function name
        var color = '#' // hexadecimal starting symbol
        var letters = ['000000', 'FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0'] // Set your colors here
        color += letters[Math.floor(Math.random() * letters.length)]

        document.body.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16) // Setting the random color on your div element.
}

var celebrating = false
var prevSound

document.addEventListener('DOMContentLoaded', function(event) {
        document.getElementById('msg').innerHTML = String.fromCharCode(currentLetter)
        console.log(currentLetter, document.getElementById('msg').innerHTML)
})

let onKeyPress = function onKeypress(event) {
        if (!celebrating && (event.charCode === currentLetter || event.charCode === (currentLetter + 32))) {
                celebrating = true
                element = document.getElementById(String.fromCharCode(event.charCode || event.char))

                bg.shift()
                bg.push(Number((((event.charCode || event.char) - 96) * 9.8).toFixed(0)))

                var celebrationSound = sounds.splice(Math.floor(Math.random() * (sounds.length - 1)) + 1, 1)[0]

                if (prevSound) sounds.push(prevSound)
                prevSound = celebrationSound

                if (speechInterval) {
                        clearInterval(speechInterval)
                }

                let interval = window.setInterval(randomColor, 50)

                playSound(celebrationSound).then(function() {
                        clearInterval(interval)
                        if (element) {
                                element.style.backgroundColor = '#004f40'
                                // keypress.push(record)
                        }



                        if (!reverse && currentLetter == endingLetter) {
                                reverse = true;
                        } else if (reverse && currentLetter == startingLetter) {
                                reverse = false;
                        }

                        if (!reverse) {
                                currentLetter = (currentLetter < endingLetter ? currentLetter + 1 : endingLetter) // getRandomInt() // : (currentLetter <= max ? currentLetter + 1 : min)

                        } else {
                                currentLetter = (currentLetter > startingLetter ? currentLetter - 1 : startingLetter) // getRandomInt() // : (currentLetter <= max ? currentLetter + 1 : min)
                        }

                        letter = String.fromCharCode(currentLetter)
                        document.getElementById('msg').innerHTML = letter
                        celebrating = false

                        return speak(letter)
                })
                //
                // var p = playAudio(celebrationSound).autoplay()
                // let interval = window.setInterval(randomColor, 50)
                //
                // p.on('durationchange', function () {
                //   let duration = p.element().duration
                //
                //   setTimeout(function () {
                //     clearInterval(interval)
                //     p.pause()
                //   }, duration * 1000)
                // })
        }
}

document.addEventListener('keypress', onKeyPress, false)
