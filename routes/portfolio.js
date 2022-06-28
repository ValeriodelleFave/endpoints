const router = require('express').Router();

const languages = {
    it: "it-it",
    en: "en-GB",
    es: "es-Es"
}

router.get("/contacts", (req, res) => {
    res.send(require("../data/contacts.json"));
});

router.get("/language", (req, res) => {
    const lang = req.query.language;
    switch (lang) {
        case languages.it:
            res.send({
                language: languages.it,
                data: require("../data/languages/it-language.json")
            });
            break;
        case languages.en:
            res.send({
                language: languages.en,
                data: require("../data/languages/en-language.json")
            });
            break;
        case languages.es:
            res.send({
                language: languages.es,
                data: require("../data/languages/es-language.json")
            });
            break;
        default:
            res.send({
                lang: languages.en,
                data: require("../data/languages/en-language.json")
            });
            break;
    }
});

router.get("/languages", (req, res) => {
    res.send(require("../data/languages/languages.json"));
});

router.get("/skills", (req, res) => {
    res.send(require("../data/skills.json"));
});

router.use("/portfolio", router)

module.exports = router;