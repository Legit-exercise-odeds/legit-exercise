const express = require('express');
const router = express.Router();

router.post('/detect', async (req,res) => {
    try {
        const bodyData = req.body;
        if (bodyData["team"] && bodyData["action"] === "created" && bodyData["team"].name.startsWith("hacker")) {
            console.warn(`We detected suspicious behavior, a team with the name: ${bodyData["team"].name} was created`);
        }
        if (bodyData["repository"]) {
            const pushedTimestamp = bodyData["repository"].pushed_at;
            console.log(pushedTimestamp)
        }
        res.status(200);
    }catch (e) {

    }})

module.exports = router;