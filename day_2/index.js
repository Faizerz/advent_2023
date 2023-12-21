const fs = require("fs");

const COLOUR_LIMIT = {
  red: 12,
  green: 13,
  blue: 14,
};

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  const games = data.split("\n");
  const {accumulator, powerAccumulator} = accumulatePossibleRounds(games);
  console.log('--', accumulator)
  console.log('==', powerAccumulator)
});

const accumulatePossibleRounds = (games) => {
  let accumulator = 0;
  let powerAccumulator = 0;

  games.forEach((game, i) => {
    const gameSplit = game.split(": ");
    const roundNumber = i + 1
    const rounds = gameSplit[1].split("; ").map((r) => r.split(", "));

    let isGameValid = true;
    let minimumColours = {
      red: 0,
      green: 0,
      blue: 0
    }

    rounds.forEach((round) => {
      round.forEach((turn) => {
        const [number, colour] = turn.split(" ");
        if (number > COLOUR_LIMIT[colour]) {
          isGameValid = false;
        }

        if(Number(minimumColours[colour]) < number) {
          minimumColours[colour] = number;
        }
      });
    });

    if (isGameValid) {
      accumulator += roundNumber;
    }

    isGameValid = true;

    powerAccumulator += (minimumColours.red * minimumColours.green * minimumColours.blue)
  });

  return {accumulator, powerAccumulator};
};
