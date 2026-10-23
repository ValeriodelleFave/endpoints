const router = require('express').Router();

router.use("/blog", require("./blog"));
router.use("/budget-management", require("./budget-management"));
router.use("/portfolio", require("./portfolio"));
// router.use("/istudy", require("./istudy"));
router.use("/jstest", require("./jstest"));
router.use("/my-vehicles", require("./my-vehicles"));

// Il fallback di solito gestisce rotte non trovate, 
// quindi puoi lasciarlo sulla root (o come preferisci gestirlo)
router.use("/", require("./fallback"));

module.exports = router;