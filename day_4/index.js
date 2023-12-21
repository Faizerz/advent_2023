const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const { solution } = accumulateData(data);

  console.log("====", solution);
});

const accumulateData = (data) => {
    const numbersInPlay = data.split(': ')[1]
    
    console.log(numbersInPlay)
    return {solution: 0}
};
