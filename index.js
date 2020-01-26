const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const mongoURL = "mongodb+srv://paw--scanner-6lygv.gcp.mongodb.net";
const dbName = "paw-scanner";

var dbClient;

MongoClient.connect(mongoURL, function(err, client) {
    if(err === null) {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        dbClient = client;
    } else {
        console.log("Encountered an error connecting to db:");
        console.log(err);
    }
});

function cleanup() {
    // cleanup the database connection when shutting down.
    dbClient.close();
    console.log("Closed database connection.");
}
process.on('exit', cleanup);
process.on('SIGTERM', cleanup);

const app = express()
const port = 9001

app.get("/", function(req, res) {
    res.send("Hello world!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
