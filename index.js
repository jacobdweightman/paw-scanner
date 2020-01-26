const express = require('express');
const { getDog, getDogs } = require('./database')

const app = express()
const port = 8080

app.use('/', express.static(__dirname + '/assets'));

app.get("/", function(req, res) {
    res.send("Hello world!");
});

app.get("/dogs/:objectID", function(req, res) {
    console.log(req.params.objectID);
    getDog(req.params.objectID).then(value => {
        console.log("value");
        console.log(value);
        res.send(value);
    }).catch(error => {
        console.log("error");
        console.log(error);
        res.status(404).send(error);
    });
});

app.get("/dogs", function(req, res) {
    getDogs().then(values => {
        let modifiedValues = values.map((value) => {
            // the _id field is a binary string, so convert this to a URL-safe format.
            value._id = value._id.toHexString();
            console.log(value);
            return value;
        });
        res.send(modifiedValues);
    }).catch(error => {
        res.status(404).send(error);
    });
})

app.listen(port, () => console.log(`Server listening on port ${port}`));
