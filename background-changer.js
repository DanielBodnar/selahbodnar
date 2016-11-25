var bg = [255, 255, 255];
var currentLetter = 65;

var sounds = [
	'bottle',
	'funk',
	'glass',
	'morse',
	'pop',
	'purr',
	'submarine',
	'tink',
]


function ran_col() { //function name
	var color = '#'; // hexadecimal starting symbol
	var letters = ['000000', 'FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF', 'C0C0C0']; //Set your colors here
	color += letters[Math.floor(Math.random() * letters.length)];

	document.body.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16); // Setting the random color on your div element.
}


document.addEventListener("keypress", function onKeypress(event) {

	if (event.charCode === self.currentLetter || event.charCode === (self.currentLetter + 32)) {
		element = document.getElementById(String.fromCharCode(event.charCode || event.char));

		bg.shift();
		bg.push(Number((((event.charCode || event.char) - 96) * 9.8).toFixed(0)));

		playAudio(['./sounds/smb3_game_over.wav']).autoplay();

		let interval = window.setInterval(ran_col, 50);
		setTimeout(function () {
			clearInterval(interval);

			//document.body.style.backgroundColor = 'rgb(' + bg[0] + ',' + bg[1] + ',' + bg[2] + ')';
			if (element) {
				element.style.backgroundColor = "#004f40";
				keypress.push(record);
			}

			currentLetter++;
			document.getElementById('msg').innerHTML = String.fromCharCode(currentLetter);

		}, 2000);


	}
}, false);