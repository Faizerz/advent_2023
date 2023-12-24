const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

});
