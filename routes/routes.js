const router = require('express').Router();

router.get("/", (req, res) => {
    res.json("Hello World");
});

router.get("/contacts", (req, res) => {
    res.send(require("../data/contacts.json"));
});

router.get("/language", (req, res) => {
    const lang = req.query.language;
    switch (lang) {
        case "IT":
            res.send(require("../data/languages/it-language.json"));
            break;
        case "EN":
            res.send(require("../data/languages/en-language.json"));
            break;
        case "ES":
            res.send(require("../data/languages/es-language.json"));
            break;
        default:
            res.sendStatus(400);
            break;
    }
});

router.get("/skills", (req, res) => {
    res.send(require("../data/skills.json"));
});

module.exports = router;