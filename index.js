const express = require("express");
const app = express();
const importData = require("./data.json");
let port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get("/", (req, res) => {
    res.json("Hello World");
});

app.get("/players", (req, res) => {
    res.json(importData);
});

app.get("/match", (req, res) => {
    let a = importData;
    res.send({ body: importData })
});

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});