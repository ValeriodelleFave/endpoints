const express = require("express");
const app = express();
const importData = require("./data.json");
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json("Hello World");
});

app.get("/players", (req, res) => {
    res.json(importData);
});

app.get("/match", (req, res) => {
    res.json(importData);
});

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});