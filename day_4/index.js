const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const { solution, totalCards } = accumulateData(data.split("\n"));

  console.log("----", solution);
  console.log("====", totalCards);
});

const accumulateData = (games) => {
  let solution = 0;

  const cardCount = games.reduce(
    (acc, _, i) => ({
      ...acc,
      [i + 1]: 1,
    }),
    {}
  );

  games.forEach((game, i) => {
    const currentGame = i + 1;
    const numbersInPlay = game.split(": ")[1].split(" | ");
    const winningNums = numbersInPlay[0].split(" ").filter(Boolean);
    const elfsNums = numbersInPlay[1].split(" ").filter(Boolean);

    let wins = 0;
    elfsNums.forEach((num) => {
      if (winningNums.includes(num)) {
        wins++;
      }
    });

    if (wins > 0) {
      solution += Math.pow(2, wins - 1);
    }

    for (let idx = 1; idx <= wins; idx++) {
      const gameToAddTo = currentGame + idx;
      const numbOfCardsForGame = cardCount?.[currentGame];
      if (cardCount?.[gameToAddTo]) {
        cardCount[gameToAddTo] += numbOfCardsForGame;
      }
    }
  });

  const totalCards = Object.values(cardCount).reduce(
    (acc, count) => (acc += count),
    0
  );

  return { solution, totalCards };
};
