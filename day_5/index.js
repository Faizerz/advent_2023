const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const splitData = data.split("\n");
  const partOne = getLowestLocation(splitData);
  console.log("-----", partOne);
  // const partTwo = getLowestLocation(splitData);
  // console.log("=====", partTwo);
});

const getLowestLocation = (data) => {
  let lowestLocation = null;
  const seeds = data[0].split(": ")[1].split(" ");

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

const getValueFromMapPartTwo = (seeds, ranges) => {
  console.log("ranges", ranges);
  console.log("seeds", seeds);

  let value = 0;

  seeds.forEach((seedString, i) => {
    if (value) return;
    ranges.forEach((range) => {
      const seed = Number(seedString);
      const rangeMin = Number(range[0]);
      const rangeMax = Number(range[1]);
      const rangeDifference = Number(range[2]);

      if (i % 2 === 0) {
        // const maxSeedValue = Number(seed) + Number(seeds[i + 1]) - 1;
        // console.log(
        //   "seed",
        //   seed,
        //   "rangeMin",
        //   rangeMin,
        //   "rangeMax",
        //   rangeMax,
        //   "rangeDifference",
        //   rangeDifference
        // );
        const newValue = Number(seed) + rangeDifference;

        if (seed >= rangeMin && seed <= rangeMax && value < newValue) {
          value = seed + rangeDifference;
          return;
        }
      }
    });
  });

  console.log("value", value);
  return value;
};
