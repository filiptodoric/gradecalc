var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/gradecalc';
var ObjectID = mongodb.ObjectID;

var collection;

var connectToDBs = function(callback) {
  MongoClient.connect('mongodb://localhost/persistent-notes', function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
      throw err;
    }
    console.log('Connection established to', url);

    var collection = db.collection('users');

    if (callback) {
      callback();
    }
  });
}

// connect to the database
connectToDBs();
