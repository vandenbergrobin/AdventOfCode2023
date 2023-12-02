const fs = require("fs");

async function readFile() {
	const input = (await fs.promises.readFile("./input.txt")).toString();
	const inputArray = input.split("\n");
	return inputArray;
}

async function solution() {
	const inputArray = await readFile();
	const numericvalues = inputArray.map((value) => {
		// regex to remove all non-numeric characters);
		return parseInt(value.replace(/[^0-9]/g, ""));
	});
	return numericvalues.map((value) => {
		const parsed = parseNumbers(value);
		console.log(parsed);
		return parsed;
	}).reduce((acc, value) => {
		return acc + value;
	});
}

function parseNumbers(value) {
	const strValue = value.toString();
	const length = strValue.length;

	if (length === 1) {
		return parseInt(`${value}${value}`);
	} else if (length === 2) {
		return value;
	} else if (length > 2) {
		return parseInt(`${strValue[0]}${strValue[strValue.length - 1]}`);
	} else {
		return parseInt(value);
	}
}


(async () => {
	console.log(await solution());
})();