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

router.get('/getFilip', function(req, res) {
  //console.log(collection.find());
    var renderUser = function(err, userInfo) {
        if (err) {
            userInfo = [{"email": email,
                      "classes": 'there was an error styll.'}];
        }
        res.send(userInfo);
    }

    if (1 < 2) {
      //  collection.find({email: 'filiptodoric@gmail.com'}).toArray(renderUser);
      collection.find({email: 'stodoric@gmail.com'}).toArray(renderUser);
    } else {
        res.send([{"email": email,
                  "classes": 'there was an error styll.'}]);
    }


});



module.exports = router;
