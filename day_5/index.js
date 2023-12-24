const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const splitData = data.split("\n");
  const partOne = getLowestLocation(splitData, 1);
  console.log("-----", partOne);
  // const partTwo = getLowestLocation(splitData, 2);
  // console.log("=====", partTwo);
});

const getLowestLocation = (data, part) => {
  let lowestLocation = null;
  const seeds =
    part === 1
      ? data[0].split(": ")[1].split(" ")
      : getSeedsForPartTwo(data[0].split(": ")[1].split(" "));

  const remainingData = data.slice(2, data.length);
  const dataMaps = getDataMaps(remainingData);
  const formattedMaps = getFormattedMaps(dataMaps);

  for (let i = 0; i < seeds.length; i++) {
    const seed = Number(seeds[i]);
    const soil = getValueFromMap(seed, formattedMaps["seed-to-soil"]);
    const fertilizer = getValueFromMap(
      soil,
      formattedMaps["soil-to-fertilizer"]
    );
    const water = getValueFromMap(
      fertilizer,
      formattedMaps["fertilizer-to-water"]
    );
    const light = getValueFromMap(water, formattedMaps["water-to-light"]);
    const temperature = getValueFromMap(
      light,
      formattedMaps["light-to-temperature"]
    );
    const humidity = getValueFromMap(
      temperature,
      formattedMaps["temperature-to-humidity"]
    );
    const location = getValueFromMap(
      humidity,
      formattedMaps["humidity-to-location"]
    );

    // console.log(
    //   "seed",
    //   seed,
    //   "soil",
    //   soil,
    //   "fertilizer",
    //   fertilizer,
    //   "water",
    //   water,
    //   "light",
    //   light,
    //   "temperature",
    //   temperature,
    //   "humidity",
    //   humidity,
    //   "location",
    //   location
    // );
    console.log(location);

    if (location < lowestLocation || lowestLocation === null) {
      lowestLocation = location;
    }
  }

  return lowestLocation;
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
      const destinationRange = Number(splitRow[0]);
      const sourceRange = Number(splitRow[1]);
      const rangeLength = Number(splitRow[2]);

      const minOfRage = sourceRange;
      const maxOfRange = sourceRange + rangeLength;
      const difference = destinationRange - sourceRange;

      return [...acc, [minOfRage, maxOfRange, difference]];
    }, []);
  }
  return maps;
};

const getValueFromMap = (x, rangeArray) => {
  let value = null;

  rangeArray.find((rangeItem) => {
    const min = rangeItem[0];
    const max = rangeItem[1];
    const difference = rangeItem[2];

    if (min <= x && x < max) {
      value = x + difference;
      return;
    }
  });

  return value ? value : x;
};

const getSeedsForPartTwo = (seeds) => {
  const allSeeds = seeds.reduce((acc, seed, i) => {
    if (i % 2 === 0) {
      for (let x = 0; x < seeds[i + 1]; x++) {
        acc.push(Number(seed) + x);
      }
    }
    return acc;
  }, []);

  return allSeeds;
};
