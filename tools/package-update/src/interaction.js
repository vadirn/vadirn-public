import readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export function awaitYesNoInput(text) {
	return new Promise((resolve) => {
		rl.question(text + ' (y/n) ', (answer) => {
			resolve(answer.toLowerCase() === 'y');
		});
	});
}

export function closeReadline() {
	rl.close();
}
