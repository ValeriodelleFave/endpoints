const router = require('express').Router();
const fs = require("fs");

router.get("/", (req, res) => {
    res.send("Fallback page!");
});

router.get("/favicon.ico", (req, res) => {
    var img = fs.readFileSync('./public/icons/icon.ico');
    res.writeHead(200, {'Content-Type': 'image/x-icon' });
    res.end(img, 'binary');
});

module.exports = router;