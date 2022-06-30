const router = require('express').Router();

router.get("/", (req, res) => {
    res.json("Hello World");
});

router.get("/media", (req, res) => {
    res.json("Hello World");
});

router.use("/player", router)

module.exports = router;