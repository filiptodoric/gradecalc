var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/gradecalc';
var ObjectID = mongodb.ObjectID;
var express = require('express');
var router = express.Router();
// mongodb://localhost/gradecalc

var collection;

var connectToDBs = function(callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
      throw err;
    }
    console.log('Connection established to', url);
    collection = db.collection('users');

    if (callback) {
      callback();
    }
  });
}

// connect to the database
connectToDBs();

router.get('/getUser', function(req, res) {
    var reqUser = req.query.email
    var renderUser = function(err, userInfo) {
        if (err) {
            userInfo = [{"email": email,
                      "classes": 'there was an error styll.'}];
        }
        res.send(userInfo);
    }
    if (true) {
      updateTest();
      collection.find({email: reqUser}).toArray(renderUser);
    } else {
        res.send([{"email": email,
                  "classes": 'there was an error styll.'}]);
    }
});

function updateTest()   {
  collection.update({"email": "new@gmail.com"}, {
    $push: {
      "classes": {
        "className": "DDDD4444",
        "marks": [75, 85, 95],
        "grades": [2, 3, 5]
      }
    }
  });
}


module.exports = router;
