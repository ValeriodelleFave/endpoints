const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config()
const cors = require('cors')
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
    
    res.setHeader("Access-Control-Allow-Origin", "https://valeriodellefave.github.io");
    res.setHeader("Access-Control-Allow-Origin", "https://my-endpoints.herokuapp.com");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")

    next();
});

app.use("/", require("./routes/index"));

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});

