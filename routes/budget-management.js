const router = require('express').Router();
const mongo = require('../mongodb-connection')

router.get("/", (req, res) => {
    res.json("Hello World");
});

router.post("/", (req, res) => {
    mongo.insertOne(req.body)
    res.json("Inserimento DB");
});

router.post("/connect", (req, res) => {
    mongo.connect();
    res.json("Connessione DB")
});

router.post("/disconnect", (req, res) => {
    mongo.disconnect();
    res.json("Disconnessione DB")
});

router.use("/budget-management", router)

module.exports = router;