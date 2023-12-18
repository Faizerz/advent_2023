const fs = require("fs");

const limit = {
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
  console.log(accumulatePossibleRounds(games));
});

const accumulatePossibleRounds = (games) => {
  let accumulator = 0;

  games.forEach((game) => {
    const gameSplit = game.split(": ");
    const roundNumber = Number(gameSplit[0].split(" ")[1]);
    const rounds = gameSplit[1].split("; ").map((r) => r.split(", "));

    let isGameValid = true;

    rounds.forEach((round) => {
      if (!isGameValid) return;

      round.forEach((turn) => {
        const [number, colour] = turn.split(" ");
        if (number > limit[colour]) {
          isGameValid = false;
          return;
        }
      });
    });

    if (isGameValid) {
      accumulator += roundNumber;
    }

    isGameValid = true;
  });

  return accumulator;
};
