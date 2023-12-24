const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const splitData = data.split("\n");
  const errorMargin = getErrorMargin(splitData);

  console.log("------", errorMargin);
});

const getErrorMargin = (data) => {
  const times = data[0].split(": ")[1].split(" ").filter(Boolean);
  const records = data[1].split(": ")[1].split(" ").filter(Boolean);

  let raceWinTotals = [];

  times.forEach((time, index) => {
    const recordDistance = records[index];
    const totalTimeOfRace = Number(time);

    let numberOfWins = 0;
    for (let x = 0; x < totalTimeOfRace; x++) {
      const distance = (totalTimeOfRace - x) * x;

      if (distance > recordDistance) {
        numberOfWins += 1;
      }
    }
    raceWinTotals.push(numberOfWins);
  });

  return raceWinTotals.reduce((acc, curr) => acc * curr);
};
