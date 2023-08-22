const router = require('express').Router();

function getRandomName() {
    return ["Valerio", "Chiara", "Fabio", "Teresa"][Math.floor(Math.random() * 4)];
}

function getRandomValue() {
    return Math.floor(Math.random() * 1000);
}

router.get("/events", (request, response) => { // Server Sent Events
    console.log("LOG: EVENT START")
    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Connection", "keep-alive");
    response.setHeader("Cache-Control", "no-cache");

    let i = 0;
    while (i < 10) {

        if (i == 3) {
            response.write("id:" + i + "\n");
            response.write("event:" + "special" +"\n");
            response.write("retry:" + 1000 +"\n");
            response.write("data:" + JSON.stringify({"user": getRandomName(), "number": getRandomValue()}) + "\n\n");
        } else {
            response.write("id:" + i + "\n");
            response.write("retry:" + 1000 +"\n");
            response.write("data:" + JSON.stringify({"user": getRandomName(), "number": getRandomValue()}) + "\n\n");
        }

        i++;
    }
    response.end();
})

router.use("/jstest", router);

module.exports = router;