const instructions = document.querySelector('#instructions');
const istructionsWrapper = document.querySelector('.instructions-wrapper');
const form = document.getElementById('puzzle-form');
let clue1 = document.getElementById('clue1');
let clue2 = document.getElementById('clue2');
let clue3 = document.getElementById('clue3');
let clue4 = document.getElementById('clue4');
let clueContainer = document.querySelector('.clue-container');
let clues = document.querySelectorAll('.clue');
const answers = document.querySelectorAll('.answer');
const buttons = document.querySelectorAll('.number');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
let activeInput = input1;
let blackOut = document.getElementById('black-out');
const messageModal = document.querySelector('.message-modal');
const message = document.querySelector('.message');
const close = document.querySelector('.close');
const playAgainBtn = document.querySelector('.play-again-btn');
const arrowDown = document.querySelector('.arrow-down');
const arrowUp = document.querySelector('.arrow-up');

let clueCodes = [
	wPArray.join(''),
	twoCorrArr.join(''),
	oneCorrArr.join(''),
	noCorrArr.join(''),
];
let clueText = [
	'One number is correct and well placed',
	'Two numbers are correct but wrongly placed',
	'One number is correct but wrongly placed',
	'Nothing is correct',
];

let clueArr = [...clues];

const shuffleClues = (arr) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

clueArr = shuffleClues(clueArr);

for (let index = 0; index < 4; index++) {
	const tempCode = document.createElement('div');
	tempCode.classList.add('clue-code');
	tempCode.innerText = clueCodes[index];
	clueArr[index].appendChild(tempCode);

	const tempText = document.createElement('div');
	tempText.classList.add('clue-text');
	tempText.innerText = clueText[index];
	clueArr[index].appendChild(tempText);
}

answers.forEach((input) => {
	input.addEventListener('click', (e) => {
		e.preventDefault();
		activeInput = input;
	});
});

answers.forEach((input) => {
	input.addEventListener('keydown', (e) => {
		alert('Please use the puzzle buttons to enter your answer')
		e.preventDefault();
		if (activeInput.value === NaN) {
			alert('Please enter a number from 0-9 only');
			activeInput.value = '';
		}
	});
});

buttons.forEach((button) => {
	button.addEventListener('click', (e) => {
		e.preventDefault();
		if (activeInput === null)
			alert('Please click on a box to enter your answer');
		activeInput.value = button.value;
		activeInput = activeInput.nextElementSibling;
	});
});

instructions.addEventListener('click', (e) => {
	console.log(`first`);
	if (istructionsWrapper.classList.contains('expand')) {
		istructionsWrapper.classList.remove('expand');
		arrowDown.style.display = 'inline';
		arrowUp.style.display = 'none';
	} else {
		istructionsWrapper.classList.add('expand');
		arrowDown.style.display = 'none';
		arrowUp.style.display = 'inline';
	}
});

close.addEventListener('click', (e) => {
	messageModal.classList.remove('show');
});

playAgainBtn.addEventListener('click', (e) => {
	input1.value = '';
	input2.value = '';
	input3.value = '';
	location.reload();
});
