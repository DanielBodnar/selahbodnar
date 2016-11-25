var bg = [255, 255, 255];
var currentLetter = 65;

var remote = require('electron').remote;
let sounds = remote.getGlobal('sounds');
let play = playAudio(sounds).preload();

function ran_col() { //function name
	var color = '#'; // hexadecimal starting symbol
	var letters = ['000000', 'FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0']; //Set your colors here
	color += letters[Math.floor(Math.random() * letters.length)];

	document.body.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16); // Setting the random color on your div element.
}

var celebrating = false;

document.addEventListener("keypress", function onKeypress(event) {
	if (!celebrating && (event.charCode === currentLetter || event.charCode === (currentLetter + 32))) {
		celebrating = true;
		element = document.getElementById(String.fromCharCode(event.charCode || event.char));

		bg.shift();
		bg.push(Number((((event.charCode || event.char) - 96) * 9.8).toFixed(0)));

		var celebrationSound = sounds[Math.floor(Math.random() * (sounds.length - 1)) + 1];

		var p = playAudio(celebrationSound).autoplay();
		let interval = window.setInterval(ran_col, 50);
		p.on('durationchange', function () {
			let duration = p.element().duration;

			setTimeout(function () {
				clearInterval(interval);
				p.pause();
				//document.body.style.backgroundColor = 'rgb(' + bg[0] + ',' + bg[1] + ',' + bg[2] + ')';
				if (element) {
					element.style.backgroundColor = "#004f40";
					keypress.push(record);
				}

				currentLetter++;
				document.getElementById('msg').innerHTML = String.fromCharCode(currentLetter);
				celebrating = false;
			}, duration * 1000);

		})



	}
}, false);
