const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config()
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
    next();
});

app.use("/", require("./routes/index"));

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});

