const express = require("express");
const app = express();
const importData = require("./data.json");
let port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
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
    res.setHeader("Content-Type", "text/html");
    res.send(importData);
});

app.get("/language", (req, res) => {
    let a = importData;
    res.setHeader("Content-Type", "text/html");

    const lang = req.query.language;

    if (lang == "IT") {
        res.send(importData);
    } else {
        res.sendStatus(400);
    }

});

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});