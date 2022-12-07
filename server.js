const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config()
const cors = require('cors')
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: "https://valeriodellefave.github.io"
}));

app.use("/", require("./routes/index"));

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});

