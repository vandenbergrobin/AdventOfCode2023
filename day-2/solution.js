const fs = require("fs");

async function readFile() {
	const input = (await fs.promises.readFile("./input.txt")).toString();
	const inputArray = input.split("\n");
	return inputArray;
}
const colourLimits =
{
	'red': 12,
	'green': 13,
	'blue': 14,
};
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
	const res = games.every((game) => {
		const validGame = game.every((colour) => {
			const isValid = colour.amount <= colourLimits[colour.colour];
			return isValid;
		})
		return validGame;
	});
	return res;
}

(async () => {
	const res = await getGameResults();
	const validGames = res.reduce((acc, game) => {
		if (validateGameResults(game.results) === true) {
			return acc + game.gameID;
		}
		return acc;
	}, 0);
	console.log(validGames);
})();