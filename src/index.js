const express = require('express');
const bodyParser = require('body-parser');
const detectionRouter = require("./router");
const port = 8000;
const main = async () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    // parse application/json
    app.use(bodyParser.json());
    app.use('/detection', detectionRouter);
    app.listen(port, () => console.log(`Server is listening to port ${port}`));

}


(async () => {
    await main();
})();
