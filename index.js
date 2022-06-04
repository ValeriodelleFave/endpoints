const express = require("express");
const app = express();
const importData = require("./data.json");
let port = process.env.PORT || 3000;

const cors = require("cors");
const corsOptions ={
   origin: '*', 
   credentials: true,
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

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