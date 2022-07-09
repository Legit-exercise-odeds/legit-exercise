const express = require('express');
const router = express.Router();

router.post('/pushes', async (req, res) => {
    try {
        const { repository, ref, sender } = req.body;
        if (ref) {
            const pushTimestamp = repository.pushed_at;
            const pushDate = new Date(pushTimestamp * 1000);
            const pushHour = pushDate.getHours();
            if (pushHour >= 14 && pushHour <= 16) {
                console.warn(`We detected suspicious behavior, ${sender.login} pushed code between 14:00 - 16:00`);
            }
        }
        return res.status(200);

    }catch (e) {
        console.error(`Operation failed with error =>  ${e}`);
        return res.status(500);
    }
});

router.post('/teams', async (req, res) => {
    try {
        const {team, action, sender} = req.body;
        if (team && action === "created" && team.name.startsWith("hacker")) {
            console.warn(`We detected suspicious behavior, a team with the name: ${team.name} was created by ${sender.login}`);
        }
        return res.status(200);
    }catch (e) {
        console.error(`Operation failed with error =>  ${e}`);
        return res.status(500);
    }
});

router.post('/repositories', async (req, res) => {
    try {
        const {repository, action, sender} = req.body;
        if (action === "deleted" && repository) {
            const {created_at, updated_at, name} = repository;
            const createTimestamp = Date.parse(created_at);
            const deleteTimestamp = Date.parse(updated_at);
            const minutesBetweenTimestamps = (deleteTimestamp - createTimestamp) / 60_000;
            if (minutesBetweenTimestamps < 10) {
                console.warn(`We detected suspicious behavior, ${sender.login} created a repository with name : ${name} and deleted it in less than 10 minutes`);
            }
        }
        return res.status(200);
    }catch (e) {
        console.error(`Operation failed with error =>  ${e}`);
        return res.status(500);
    }
});

module.exports = router;