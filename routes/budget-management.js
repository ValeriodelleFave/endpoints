const router = require('express').Router();
const mongo = require('../mongodb-connection')

router.get("/", (req, res) => {
    res.send("Bella!");
})

router.delete("/delete/:id", async (req, res) => {
    const response = await mongo.deleteOne(req.params.id)
    res.send(response);
})

router.post("/", async (req, res) => {
    const response = await mongo.insertOne(req.body)
    res.json("Inserimento DB");
});

router.get("/getAll", async (req, res) => {
    res.json(await mongo.getAll());
});

router.get("/getLastTen", async (req, res) => {
    res.json(await mongo.getLastTen());
});

router.get("/getAllByMonth", async (req, res) => {
    res.json(await mongo.getAllByMonth());
});

router.use("/budget-management", router);

module.exports = router;