//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/gradecalc';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('users');



    //Create some users
    var user1 = {email: 'filiptodoric@gmail.com', classes: ['COMP3203', 'COMP2406', 'BIOL1902']};
    var user2 = {name: 'stodoric@gmail.com', classes: ['ENGI4500']};

    // Insert some users
    collection.insert([user1, user2], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.insertCount, result);
      }
    });

      // find users
      collection.find({email: 'filiptodoric@gmail.com'}).toArray(function (err, result) {
            if (err) {
              console.log(err);
            } else if (result.length) {
              console.log('Found:', result);
            } else {
              console.log('No document(s) found with defined "find" criteria!');
            }

      //Close connection
      db.close();
    });

  }
});
