const express = require('express');
const router = express.Router();

router.post('/detect', async (req,res) => {
    try {
        const bodyData = req.body;
        if (bodyData["team"] && bodyData["action"] === "created" && bodyData["team"].name.startsWith("hacker")) {
            console.warn(`We detected suspicious behavior, a team with the name: ${bodyData["team"].name} was created`);
        }
        if (bodyData["action"] === "deleted" && bodyData["repository"]) {
            const {created_at, updated_at} = bodyData["repository"];
            const createTimestamp = Date.parse(created_at);
            const deleteTimestamp = Date.parse(updated_at);
            const minutesBetweenTimestamps = (deleteTimestamp - createTimestamp) / 60_000;
            if (minutesBetweenTimestamps < 10) {
                console.warn(`We detected suspicious behavior, someone created a repository and deleted it in less than 10 minutes`);
            }
        }
        res.status(200);
    }catch (e) {
        console.error(`Operation failed with error =>  ${e}`);
        return res.status(500);
    }});

router.post('/pushes', async (req, res) => {
    const { repository } = req.body;
    const pushTimestamp = repository.pushed_at;
    const pushDate = new Date(pushTimestamp * 1000);
    const pushHour = pushDate.getHours();
    if (pushHour >= 14 && pushHour <= 16) {
        console.warn(`We detected suspicious behavior, someone pushed code between 14:00 - 16:00`);
    }
})

module.exports = router;