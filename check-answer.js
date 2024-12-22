form.addEventListener('submit', (event) => {
	event.preventDefault(); // Prevent default form submission and page refresh

	const formData = new FormData(form);

	// Access individual form values
	const input1 = formData.get('input1');
	const input2 = formData.get('input2');
	const input3 = formData.get('input3');

	const answer = [parseInt(input1), parseInt(input2), parseInt(input3)];

	console.log(typeof answer[0]);
	checkAnswer(answer);
});

function checkAnswer(answer) {
	if (input1.value === '' || input2.value === '' || input3.value === '') {
		alert('You must enter all three numbers');
	} else if (
		input1.value === input2.value ||
		input1.value === input3.value ||
		input2.value === input3.value
	) {
		alert('repetition of digits is not allowed');
	} else {
		checkWP(answer);
		if (winning) message.innerText = `Congratulations,\nyou won!`;
		else message.innerText = 'You lost... Better luck next time!';

		blackOut.classList.add('over');
		messageModal.classList.add('show');
	}
}

let winning = true;
function checkWP(answer) {
	let count = 0;
	for (let index = 0; index < answer.length; index++) {
		if (answer.includes(wPArray[index])) {
			if (answer.indexOf(wPArray[index]) != index) {
				winning = false;
				break;
			}
			count++;
		}
	}
	if (count !== 1) winning = false;
	if (winning) checkTwoCorr(answer);
}

function checkTwoCorr(answer) {
	let count = 0;
	for (let index = 0; index < answer.length; index++) {
		if (answer.includes(twoCorrArr[index])) {
			if (answer.indexOf(twoCorrArr[index]) === index) {
				winning = false;
				break;
			}
			count++;
		}
	}
	if (count !== 2) winning = false;
	if (winning) checkOneCorr(answer);
}

function checkOneCorr(answer) {
	let count = 0;
	for (let index = 0; index < answer.length; index++) {
		if (answer.includes(oneCorrArr[index])) {
			if (answer.indexOf(oneCorrArr[index]) === index) {
				winning = false;
				break;
			}
			count++;
		}
	}
	if (count !== 1) winning = false;
	if (winning) checkNoCorr(answer);
}

function checkNoCorr(answer) {
	for (let index = 0; index < answer.length; index++) {
		if (answer.includes(noCorrArr[index])) {
			winning = false;
			break;
		}
	}
}
