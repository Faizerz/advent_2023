const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
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
    
    let wins = 0
    elfsNums.forEach((num) => {
      if (winningNums.includes(num)) {
        wins++
      }
    });

    if(wins > 0){
      solution += Math.pow(2, wins-1)
    }
   
  });

  return { solution };
};
