const router = require('express').Router();
/**
 * @type {Object[]}
 */
const data = [
    { id: 1, title: "Naruto - 1° Stagione - Episodi filler", publishData: "26-06-2000", description: "Episodi: 26, 97, 101-106, 136-140, 143-219." },
    { id: 2, title: "Naruto - 2° Stagione - Episodi filler", publishData: "02-09-1999", description: "Episodi: 57-71, 91-112, 144-151, 170-171, 176-196, 223-242, 257-260, 271, 279-281, 284-295, 303-320, 347-361, 376-377, 388-390, 394-413, 416-417, 422-423, 427-450, 464-468, 480-483." },
    { id: 3, title: "Meh title", publishData: "06-10-1998", description: "Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. In hac habitasse platea dictumst." },
    { id: 4, title: "YEAH title", publishData: "12-01-2022", description: "Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing at neque quis nulla porta dapibus. In hac habitasse platea dictumst." }
]

router.get("/", (req, res) => {
    res.send("Blog");
});

router.get("/articles/:id", (req, res) => {
    const article = data.find(elem => elem.id === Number(req.params.id));
    if (article === undefined) {
        res.statusCode = 404;
    }
    res.json(article);
});

router.get("/articles", (req, res) => {
    res.json(data);
});

router.use("/blog", router)

module.exports = router;