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

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  const calibrations = data.split("\n");
  console.log('=', sum(calibrations));
});

const sum = (calibrations) =>
  calibrations.reduce((acc, code) => {
    const letters = code.split("");

    let firstNumber = null;
    let lastNumber = null;
    let firstString = "";
    let lastString = "";

    for (x = 0; x <= letters.length; x++) {
      if (!firstNumber) {
        if (isLetterNumber(letters[x])) {
          firstNumber = letters[x];
        }

        const firstStringKey = getStringKey(firstString);
        if (firstStringKey) {
          firstNumber = STR_NUM_MAP[firstStringKey];
        } else {
          firstString += letters[x];
        }
      }

      if (!lastNumber) {
        const index = letters.length - x - 1;
        if (isLetterNumber(letters[index])) {
          lastNumber = letters[index];
        }

        const lastStringKey = getStringKey(reverseString(lastString));
        if (lastStringKey) {
          lastNumber = STR_NUM_MAP[lastStringKey];
        } else {
          lastString += letters[index];
        }
      }

      if (firstNumber && lastNumber) {
        acc += Number(`${firstNumber}${lastNumber}`);
        break;
      }
    }

    return acc;
  }, 0);

const isLetterNumber = (str) => !isNaN(str);

const reverseString = (str) => str.split("").reverse().join("");

const getStringKey = (str) => {
  if (str.length < 3) return null;
  const numberStrings = Object.keys(STR_NUM_MAP);
  const key = numberStrings.find((numberString) => str.includes(numberString));
  return key ? key : null;
};
