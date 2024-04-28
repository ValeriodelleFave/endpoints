const router = require('express').Router();

router.get("/get-vehicles", (req, res) => {
    res.json(require("./../data/cars.json"));
});

router.get("/get-vehicle-notifications/:id", (req, res) => {
    const car = require("./../data/cars.json").find(element => element.id === Number(req.params.id))
    res.json(car);
});

router.delete("/:carId/cancel-notification/:id", (req, res) => {
    res.json(req.params)
})

router.put("/update-km", (req, res) => {
    res.json(req.body)
})


router.use("/my-vehicles", router)

module.exports = router;