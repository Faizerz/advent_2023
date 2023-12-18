import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data: string) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  const games: string[] = data.split("\n");
  console.log(games);
});
