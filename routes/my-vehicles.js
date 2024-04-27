const router = require('express').Router();

router.get("/get-vehicles", (req, res) => {
    res.json(
        [{
            id: 1,
            targa: "EY001KW",
            marca: "Alfa Romeo",
            modello: "Giulietta",
            specifica: "Sprint",
            km: 134300
        }]
    );
});

router.get("/get-vehicle-notifications/:id", (req, res) => {
    res.json(
        {
            id: 1,
            targa: "EY001KW",
            marca: "Alfa Romeo",
            modello: "Giulietta",
            specifica: "Sprint",
            km: 134300,
            notifications: [
                {
                    id: 1,
                    titolo: "Tagliando",
                    scadenza: 30000,
                    ultimaRegistrazione: 130000
                },
                {
                    id: 2,
                    titolo: "Cambio olio motore",
                    scadenza: 10000,
                    ultimaRegistrazione: 12300
                },
            ]
        }
    );
});


router.use("/my-vehicles", router)

module.exports = router;