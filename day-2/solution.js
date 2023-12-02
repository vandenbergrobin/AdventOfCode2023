const fs = require("fs");

async function readFile() {
	const input = (await fs.promises.readFile("./input.txt")).toString();
	const inputArray = input.split("\n");
	return inputArray;
}

async function getGameResults() {
	const inputArray = await readFile();
	const games = inputArray.map((value, index) => {
		const games = value.split(": ");
		const gameID = games[0].split(" ")[1];
		const turn = games[1].split("; ");
		const results = turn.map((colours, index) => {
			return colours.split(", ").map((colour, index) => {
				const split = colour.split(" ");
				return {
					colour: split[1],
					amount: parseInt(split[0])
				}
			})
		});

		return {
			gameID: parseInt(gameID),
			results
		};
	});
	return games;
}

function validateGameResults(games) {
	const colours = {};
	games.forEach((game) => {
		game.forEach((colour) => {
			if (colours[colour.colour] === undefined) {
				colours[colour.colour] = colour.amount;
			} else {
				if (colours[colour.colour] < colour.amount) colours[colour.colour] = colour.amount;
			}
		})
	});
	const key = Object.keys(colours);
	const power = key.reduce((acc, colour) => {
		return acc * colours[colour];
	}, 1);
	return power;
}

(async () => {
	const res = await getGameResults();
	const validGames = res.reduce((acc, game) => {
		return acc + validateGameResults(game.results)
	}, 0);
	console.log(validGames);
})();