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
            const pushHour = 16;
            if (pushHour >= 14 && pushHour <= 16) {
                console.warn(`We detected suspicious behavior, someone pushed code between 14:00 - 16:00`);
            }
        }
        res.status(200);
    }catch (e) {

    }})

module.exports = router;