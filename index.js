express = require('express');

const app = express()
const port = 9001

app.get("/", function(req, res) {
    res.send("Hello world!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
