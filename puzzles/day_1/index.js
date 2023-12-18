const fs = require("fs");

const STR_NUM_MAP = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

fs.readFile("input.txt", "utf8", (_, data) => {
  const calibrations = data.split("\n");

  const sum = calibrations.reduce((acc, code) => {
    const letters = code.split("");

    let firstNumber = null;
    let lastNumber = null;

    for (x = 0; x <= letters.length; x++) {
      if (!isNaN(letters[x]) && !firstNumber) {
        firstNumber = letters[x];
      }
      const index = letters.length - x;
      if (!isNaN(letters[index]) && !lastNumber) {
        lastNumber = letters[index];
      }

      if (firstNumber && lastNumber) {
        acc += Number(`${firstNumber}${lastNumber}`);
        break;
      }
    }
  });
  console.log(sum);
});

const isStringNumber = (str) => (STR_NUM_MAP?.[str] ? STR_NUM_MAP[str] : false);
