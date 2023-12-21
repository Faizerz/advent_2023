const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  console.log("====", accumulateData(data));
});

const accumulateData = (data) => {
  const rows = data.split("\n");
  const totalRows = rows.length;
  const totalColumns = rows[0].length;
  console.log(totalRows);
  console.log(totalColumns);
  let accumulator = 0;

  for (let y = 0; y < totalRows; y++) {
    for (let x = 0; x < totalColumns; x++) {
      const currentLetter = rows[y][x];
      if (isSymbol(currentLetter)) {
        //
        // Check surroundings of symbol
        for (let j = -1; j <= 1; j++) {
          let checked = [];
          for (let i = -1; i <= 1; i++) {
            let innerY = y + j;
            let innerX = x + i;

            if (isValidCoordinate(i, j, innerX, innerY, totalRows)) {
              if (
                isNumber(rows[innerY][innerX]) &&
                !checked.includes(`${innerY},${innerX}`)
              ) {
                let number = rows[innerY][innerX];
                for (let z = -2; z <= 2; z++) {
                  let adj = rows?.[innerY]?.[innerX + z];
                  if (number.length > 1 && adj === ".") {
                    break;
                  }

                  if (
                    checked.includes(`${innerY},${innerX + z}`) ||
                    adj === "." ||
                    !adj
                  ) {
                    continue;
                  }

                  if (isNumber(adj)) {
                    checked = [...checked, `${innerY},${innerX + z}`];
                    if (z > 0) {
                      number = `${number}${adj}`;
                    } else if (z < 0) {
                      if (z === -1 && number.length > 1) {
                        number = `${number.split("")[0]}${adj}${
                          number.split("")[1]
                        }`;
                      } else if (
                        z === -2 &&
                        !isNumber(rows?.[innerY]?.[innerX - 1])
                      ) {
                        continue;
                      } else {
                        number = `${adj}${number}`;
                      }
                    }
                  }
                }
                console.log(number);
                accumulator += Number(number);
              }
            }
          }
          checked = [];
        }
      }
    }
  }

  return accumulator;
};

const isSymbol = (str) => isNaN(str) && str !== ".";
const isNumber = (str) => !isNaN(str);
const isValidCoordinate = (i, j, innerX, innerY, totalRows) =>
  !(
    (i === 0 && j === 0) ||
    innerY > totalRows ||
    innerY < 0 ||
    innerX >= 10 ||
    innerX < 0
  );
