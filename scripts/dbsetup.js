/**
 * Cleans the production database and populates it with some demo documents.
 */

const MongoClient = require('mongodb').MongoClient;

const mongoURL = "mongodb+srv://test:test@paw--scanner-6lygv.gcp.mongodb.net";

var client = new MongoClient(mongoURL);
var db;

client.connect(function(err) {
    if(err === null) {
        console.log("Connected successfully to server");
        db = client;
        clean(db);
        populate(db);
        client.close();
    } else {
        console.log(err);
        client.close();
    }
});

async function clean(db) {
    return await db.db("paw-scanner").dropDatabase();
}

async function populate(db) {
    return await db.db("paw-scanner").collection("dogs").insertMany([
        {
            "name": "Bob",
            "DoB": "1-2-2015",
            "location": {
                "lat": 41.40338,
                "long": 2.174030
            },
            "color": "brown",
            "vaccinations": [
                {
                    "name": "rabies",
                    "date": "1-3-2016"
                },
                {
                    "name": "parvovirus",
                    "date": "1-3-2016",
                    "notes": "allergic reaction at injection site"
                }
            ]
        }
    ]);
}

function dog(name, color, vaccinations=[]) {
    return {
        "name": name,
        "color": color,
        "vaccinations": vaccinations
    }
}
