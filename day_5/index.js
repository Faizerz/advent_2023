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
    const seed = seeds[i];
    const soil = seedToSoil?.[seed] || seed;
    const fertilizer = soilToFertalizer[soil] || soil;
    const water = fertalizerToWater[fertilizer] || fertilizer;
    const light = waterToLight[water] || water;
    const temperature = lightToTemperature[light] || light;
    const humidity = temperatureToHumidity[temperature] || temperature;
    const location = humidityToLocation[humidity] || humidity;

    console.log(location);
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

      for (let i = 0; i < rangeLength; i++) {
        acc = {
          ...acc,
          [seedRange + i]: soilRange + i,
        };
      }
      return acc;
    }, {});
  }
  return maps;
};
