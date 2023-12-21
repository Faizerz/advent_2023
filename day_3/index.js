const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const { accumulator, gearAccumulator } = accumulateData(data);

  console.log("===", accumulator);
  console.log("***", gearAccumulator);
});

const accumulateData = (data) => {
  let rows = data.split("\n");
  const totalRows = rows.length;
  const totalCols = rows[0].length;
  let accumulator = 0;
  let gearAccumulator = 0;

  for (let y = 0; y < totalRows; y++) {
    for (let x = 0; x < totalCols; x++) {
      const currentLetter = rows[y][x];
      if (isSymbol(currentLetter)) {
        gearsFound = 0;
        gearNumbers = [];
        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            let innerY = y + j;
            let innerX = x + i;

            if (
              isValidCoordinate(i, j, innerX, innerY, totalRows, totalCols) &&
              isNumber(rows[innerY][innerX])
            ) {
              gearsFound += 1;
              let number = rows[innerY][innerX];
              rows[innerY] = mutateNumberToPeriod(rows, innerY, innerX);

              const oneToLeft = rows[innerY][innerX - 1];
              if (isNumber(oneToLeft)) {
                number = `${oneToLeft}${number}`;
                rows[innerY] = mutateNumberToPeriod(rows, innerY, innerX - 1);

                const twoToLeft = rows[innerY][innerX - 2];
                if (isNumber(twoToLeft)) {
                  number = `${twoToLeft}${number}`;
                  rows[innerY] = mutateNumberToPeriod(rows, innerY, innerX - 2);
                }
              }

              const oneToRight = rows[innerY][innerX + 1];
              if (isNumber(oneToRight)) {
                number = `${number}${oneToRight}`;
                rows[innerY] = mutateNumberToPeriod(rows, innerY, innerX + 1);

                const twoToRight = rows[innerY][innerX + 2];
                if (isNumber(twoToRight)) {
                  number = `${number}${twoToRight}`;
                  rows[innerY] = mutateNumberToPeriod(rows, innerY, innerX + 2);
                }
              }

              gearNumbers = [...gearNumbers, Number(number)];
              accumulator += Number(number);
            }
          }
        }

        if (isStar(currentLetter) && gearsFound === 2) {
          gearAccumulator += gearNumbers[0] * gearNumbers[1];
        }

        gearsFound = 0;
        gearNumbers = [];
      }
    }
  }

  return { accumulator, gearAccumulator };
};

const isStar = (str) => str === "*";
const isSymbol = (str) => isNaN(str) && str !== ".";
const isNumber = (str) => !isNaN(str);
const isValidCoordinate = (i, j, innerX, innerY, totalRows, totalCols) =>
  !(
    (i === 0 && j === 0) ||
    innerY >= totalRows ||
    innerY < 0 ||
    innerX >= totalCols ||
    innerX < 0
  );
const mutateNumberToPeriod = (rows, y, x) =>
  rows[y].slice(0, x) + "." + rows[y].slice(x + 1);
