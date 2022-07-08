const express = require('express');
const router = express.Router();

router.post('/detect', async (req,res) => {
    try {
        console.log('oded')
        res.status(200);
    }catch (e) {

    }})

module.exports = router;