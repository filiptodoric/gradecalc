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
      collection.find({email: reqUser}).limit(1).toArray(renderUser);
    } else {
        res.send([{"email": email,
                  "classes": 'there was an error styll.'}]);
    }
});

function updateTest(className, email, newClass)   {
  collection.update({"email": email}, {
    $push: {
      "classes": {
        "className": className,
        "marks": [75, 85, 95],
        "grades": [2, 3, 5]
      }
    }
  });
}

var newClass = {
    className: 'CCCC3333',
    marks: [75, 85, 95],
    grades: [20, 30, 50]
};


function deleteClass(className, email)  {
  collection.update({"email": email}, {
      $pull: {
          "classes": {
              "className": className
          }
      }
  });
}


module.exports = router;




// //ERASE
// var user2 = {email:"test@gmail.com",
// classes:
// [
//   {
//     className: "TEST0001",
//     marks: [84, 45, 54],
//     grades: [30, 30, 40]
//   },
//   {
//     className: "HSS1102",
//     marks: [56, 81, 72, 100, 81],
//     grades: [30, 30, 30, 5, 5]
//   }
// ]
// }
//
// // Insert some users
// collection.insert([user2], function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.insertCount, result);
//   }
// });
// //ERASE
