const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    next();
});

app.use("/", require("./routes/index"));

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});

