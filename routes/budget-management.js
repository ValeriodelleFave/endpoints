const router = require('express').Router();

router.get("/", (req, res) => {
    res.json("Hello World");
});

router.post("/", (req, res) => {
    debugger
    res.json("Hello World");
});

router.use("/budget-management", router)

module.exports = router;