"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
fs.readFile("input.txt", "utf8", function (err, data) {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    var games = data.split("\n");
    console.log(games);
});
