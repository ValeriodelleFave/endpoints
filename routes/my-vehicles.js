const router = require('express').Router();
const fs = require('fs');

router.get("/get-vehicles", (req, res) => {
    res.json(require("./../data/cars.json"));
});

router.get("/get-vehicle-notifications/:id", (req, res) => {
    const car = require("./../data/cars.json").find(element => element.id === Number(req.params.id))
    res.json(car);
});

router.delete("/:carId/notification/:id", (req, res) => {


    // Read the JSON file 
    let jsonData = JSON.parse(fs.readFileSync("./data/cars.json"));

    // Add or edit data 
    const car = jsonData.find(element => element.id === Number(req.params.carId))

    const notification =
        car.notifications
            .find(element => element.id === Number(req.params.id))


    car.notifications = car.notifications.filter(item => item.id !== notification.id)

    // Write the JSON file 
    fs.writeFileSync("./data/cars.json", JSON.stringify(jsonData));


    res.json(req.params)
})

router.post("/:carId/notification", (req, res) => {
    let isShuffling = true
    let idOption = Math.floor(Math.random() * 100);
    while (isShuffling) {
        idOption = Math.floor(Math.random() * 100);
        const car = require("./../data/cars.json").find(element => element.id === Number(req.params.carId))
        if (car.notifications.findIndex(element => element.id === idOption) === -1) {
            isShuffling = false;
        }
    }

    req.body.id = idOption;
    req.body.scadenza = Number(req.body.scadenza)
    req.body.ultimaRegistrazione = Number(req.body.ultimaRegistrazione)

    // Read the JSON file 
    let jsonData = JSON.parse(fs.readFileSync("./data/cars.json"));

    // Add or edit data 
    jsonData.find(element => element.id === Number(req.params.carId)).notifications.push(req.body)

    // Write the JSON file 
    fs.writeFileSync("./data/cars.json", JSON.stringify(jsonData));

    res.json(req.params)
})

router.put("/:carId/notification", (req, res) => {
    const car = require("./../data/cars.json").find(element => element.id === Number(req.params.id))
    res.json(req.params)
})

router.put("/update-km", (req, res) => {
    const car = require("./../data/cars.json").find(element => element.id === Number(req.params.id))
    res.json(req.body)
})


router.use("/my-vehicles", router)

module.exports = router;