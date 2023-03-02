const router = require('express').Router();
const mongo = require('../mongodb-connection')

router.post("/", async (req, res) => {
    const response = await mongo.insertOne(req.body)
    res.json("Inserimento DB");
});

router.get("/getAll", async (req, res) => {
    const re = await mongo.getAll()
    // re.forEach
    debugger
    res.json(re);
});

router.use("/budget-management", router);

module.exports = router;