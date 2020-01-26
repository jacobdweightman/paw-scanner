const mongodb = require('mongodb');

const mongoURL = "mongodb+srv://test:test@paw--scanner-6lygv.gcp.mongodb.net";

var client = new mongodb.MongoClient(mongoURL);
var db;

client.connect(function(err) {
    if(err === null) {
        console.log("Connected successfully to server");
        db = client.db("paw-scanner");
    } else {
        console.log(err);
        client.close();
    }
});

// Fetches a dog from the database with the given identifier.
exports.getDog = function(objectID) {
    return new Promise((resolve, reject) => {
        return db.collection('dogs').findOne({"_id": mongodb.ObjectID.createFromHexString(objectID)}, resolver(resolve, reject));
    });
}

// Fetches all of the dogs from the database. Only for testing.
exports.getDogs = function() {
    return new Promise((resolve, reject) => {
        return db.collection('dogs').find({}).limit(10).toArray(resolver(resolve, reject));
    });
}

function resolver(resolve, reject) {
    return (err, docs) => {
        if(err === null) {
            resolve(docs);
        } else {
            console.log(err);
            reject(err);
        }
    }
}
