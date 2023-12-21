const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const { solution } = accumulateData(data.split("\n"));

  console.log("====", solution);
});

const accumulateData = (games) => {
  let solution = 0;

  games.forEach((game) => {
    const numbersInPlay = game.split(": ")[1].split(" | ");
    const winningNums = numbersInPlay[0].split(" ").filter(Boolean);
    const elfsNums = numbersInPlay[1].split(" ").filter(Boolean);

    const pointsMap = winningNums.reduce(
      (acc, num, i) => ({
        ...acc,
        [num]: i,
      }),
      {}
    );

    console.log(elfsNums);

    const gameTotal = elfsNums.reduce(
      (acc, num) => (acc += pointsMap?.[num] ? pointsMap[num] : 0),
      0
    );
    console.log(pointsMap);
    console.log(gameTotal);
  });

  return { solution };
};
