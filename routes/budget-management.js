const router = require('express').Router();
const mongo = require('../mongodb-connection')

router.get("/", (req, res) => {
    res.json("Hello World");
});

router.post("/", (req, res) => {
    mongo.insertOne(req.body)
    res.json("Hello World");
});

router.use("/budget-management", router)

module.exports = router;