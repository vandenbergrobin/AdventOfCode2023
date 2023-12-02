const fs = require("fs");

async function readFile() {
	const input = (await fs.promises.readFile("./input.txt")).toString();
	const inputArray = input.split("\n");
	return inputArray;
}

async function solution() {
	const inputArray = await readFile();
	const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	const replaceNumbers = inputArray.map((value, index) => {
		let val = value;
		const foundNumbers = numbers.map((val) => {
			return value.indexOf(val);
		});
		const highest = getIndexHighest(foundNumbers);
		const lowest = getIndexOfLowest(foundNumbers);
		return val.replace(numbers[lowest], lowest + 1).replace(numbers[highest], highest + 1);
	});
	const numericvalues = replaceNumbers.map((value, index) => {
		return parseInt(value.replace(/[^0-9]/g, ""));
	});
	return numericvalues.map((value, index) => {
		const parsed = parseNumbers(value);
		return parsed;
	}).reduce((acc, value) => {
		return acc + value;
	});
}

function getIndexHighest(val) {
	const highest = val.reduce((acc, value) => {
		console.log('acc', acc, 'value', value)
		if (value > acc && value !== -1) {
			return value;
		}
		return acc;
	}, 0);
	console.log('highest', highest)
	return val.indexOf(highest);
}

function getIndexOfLowest(val) {
	const lowest = val.reduce((acc, value) => {
		console.log('acc', acc, 'value', value)
		if (value < acc && value !== -1) {
			return value;
		}
		return acc;
	}, 9990); /// high initialValue to avoid getting 0 as lowest
	return val.indexOf(lowest);
}

function parseNumbers(value) {
	const strValue = value.toString();
	const length = strValue.length;

	if (length === 1) {
		return parseInt(`${value}${value}`);
	} else if (length === 2) {
		return value;
	} else {
		return parseInt(`${strValue[0]}${strValue[strValue.length - 1]}`);
	}
}


(async () => {
	console.log(await solution());
})();