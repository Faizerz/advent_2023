const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const { lowestLocation } = getLowestLocation(data.split("\n"));
  console.log("-----", lowestLocation);
});

const getLowestLocation = (data) => {
  let lowestLocation = null;
  const seeds = data[0].split(": ")[1].split(" ");
  const rest = data.slice(2, data.length);
  const dataMaps = getDataMaps(rest);
  const {
    "seed-to-soil": seedToSoil,
    "soil-to-fertilizer": soilToFertalizer,
    "fertilizer-to-water": fertalizerToWater,
    "water-to-light": waterToLight,
    "light-to-temperature": lightToTemperature,
    "temperature-to-humidity": temperatureToHumidity,
    "humidity-to-location": humidityToLocation,
  } = getFormattedMaps(dataMaps);

  for (let i = 0; i < seeds.length; i++) {
    const seed = Number(seeds[i]);
    const soil = getValueFromMap(seed, seedToSoil) || seed;
    const fertilizer = getValueFromMap(soil, soilToFertalizer) || soil;
    const water = getValueFromMap(fertilizer, fertalizerToWater);
    const light = getValueFromMap(water, waterToLight);
    const temperature = getValueFromMap(light, lightToTemperature);
    const humidity = getValueFromMap(temperature, temperatureToHumidity);
    const location = getValueFromMap(humidity, humidityToLocation);

    if (location < lowestLocation || lowestLocation === null) {
      lowestLocation = location;
    }
  }

  return { lowestLocation };
};

const getDataMaps = (data) => {
  let currentMap = "seed-to-soil";

  return data.reduce((acc, line) => {
    const parsedLine = line.split(" map:");
    if (line === "") {
      currentMap = null;
    }
    if (!currentMap) {
      currentMap = parsedLine[0];
    }

    if (parsedLine?.[1] !== "" && currentMap) {
      acc = {
        ...acc,
        [currentMap]: [...(acc?.[currentMap] || []), line],
      };
    }
    return acc;
  }, {});
};

const getFormattedMaps = (dataMaps) => {
  const maps = {};

  for (const [key, value] of Object.entries(dataMaps)) {
    maps[key] = value.reduce((acc, row) => {
      const splitRow = row.split(" ");
      const soilRange = Number(splitRow[0]);
      const seedRange = Number(splitRow[1]);
      const rangeLength = Number(splitRow[2]);

      const minOfRage = seedRange;
      const maxOfRange = seedRange + rangeLength;
      const difference = soilRange - seedRange;

      return [...acc, [minOfRage, maxOfRange, difference]];
    }, []);
  }
  return maps;
};

const getValueFromMap = (x, rangeArray) => {
  let value = null;

  rangeArray.find((rangeItem) => {
    const min = Number(rangeItem[0]);
    const max = Number(rangeItem[1]);
    const difference = Number(rangeItem[2]);

    if (min <= x <= max) {
      value = Number(x) + difference;
      return;
    }
  });

  return value;
};

// if (50 >= x <= 97) {
//   return x + (soilRange - seedRange);
// }

// const getFormattedMaps = (dataMaps) => {
//   const maps = {};
//   for (const [key, value] of Object.entries(dataMaps)) {
//     maps[key] = value.reduce((acc, row) => {
//       const splitRow = row.split(" ");
//       const soilRange = Number(splitRow[0]);
//       const seedRange = Number(splitRow[1]);
//       const rangeLength = Number(splitRow[2]);

//       for (let i = 0; i < rangeLength; i++) {
//         acc = {
//           ...acc,
//           [seedRange + i]: soilRange + i,
//         };
//       }
//       return acc;
//     }, {});
//   }
//   return maps;
// };
