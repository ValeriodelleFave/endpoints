const express = require("express");
const app = express();
let port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    next();
});

app.get("/", (req, res) => {
    res.json("Hello World");
});

app.get("/language", (req, res) => {
    const lang = req.query.language;

    switch (lang) {
        case "IT":
            res.send(require("./languages/it-language.json"));
            break;
        case "EN":
            res.send(require("./languages/en-language.json"));
            break;
        case "ES":
            res.send(require("./languages/es-language.json"));
            break;
    
        default:
            res.sendStatus(400);
            break;
    }
});

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});