const router = require('express').Router();
const fs = require("fs");

router.get("/", (req, res) => {
    res.send("Blog");
});

router.get("/getArticles", (req, res) => {
    res.json([
        { title: "Article title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. In hac habitasse platea dictumst." },
        { title: "Article title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. In hac habitasse platea dictumst." },
        { title: "Article title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. In hac habitasse platea dictumst." },
        { title: "Article title", description: "Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. In hac habitasse platea dictumst." }
    ]);
});

router.use("/blog", router)

module.exports = router;