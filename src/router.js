const express = require('express');
const router = express.Router();

router.post('/detect', async (req,res) => {
    try {
        const bodyData = req.body;
        if (bodyData["team"] && bodyData["action"] === "created" && bodyData["team"].name.startsWith("hacker")) {
            console.warn(`We detected suspicious behavior, a team with the name: ${bodyData["team"].name} was created`);
        }
        if (bodyData["repository"]) {
            const pushTimestamp = bodyData["repository"].pushed_at;
            const pushDate = new Date(pushTimestamp * 1000);
            const pushHour = pushDate.getHours();
            console.log(pushHour)
            console.log(typeof pushHour)
        }
        res.status(200);
    }catch (e) {

    }})

module.exports = router;