const router = require('express').Router();

router.get("/", (req, res) => {
    res.json("Hello World");
});

router.get("/macro-subjects", (req, res) => {
    res.json("Hello World");
});

router.get("/subjects", (req, res) => {
    res.json("Hello World");
});

router.get("/macro-arguments", (req, res) => {
    res.json("Hello World");
});

router.get("/arguments", (req, res) => {
    res.json("Hello World");
});

router.get("/lesson", (req, res) => {
    res.json("Hello World");
});

router.use("/istudy", router)

module.exports = router;