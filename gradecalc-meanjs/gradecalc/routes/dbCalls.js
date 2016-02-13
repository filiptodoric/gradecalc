var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/gradecalc';
var ObjectID = mongodb.ObjectID;
var express = require('express');
var router = express.Router();

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

router.get('/', function(req, res, next) {
  console.log("This is the session: " + req.session.email);
  if (req.session.email) {
    res.render('index');
    console.log("I'm here");
 //   getUser(req, res);
  }
  else {
    res.render('index');
  }
});

router.get('/getUser', function getUser(req, res) {
  var reqEmail = req.query.email;
  var reqPassword = req.query.password;
  var renderUser = function(err, userInfo) {
    if (err) {
      res.send([{"email": email, "classes": 'There was an error'}]);
    }
    if(userInfo[0].password == reqPassword) {
      res.send(userInfo);
      req.session.email = userInfo[0].email;
      req.session.save();
    }
    else {
      res.status(500).send("The passwords don't match.");
    }
  }
  if (true) {
    collection.find({email: reqEmail}).limit(1).toArray(renderUser);
  } else {
    res.send([{"email": email, "classes": 'There was an error'}]);
  }
});

router.get('/signup', function(req, res) {
  var reqEmail = req.query.email;
  var reqPassword = req.query.password;
  if (true) {
    // this isn't working, need to check if it exists in the db or not and then go from there
    //collection.find({email: reqEmail}).count();
    collection.insert({email: reqEmail, password: reqPassword, classes: []});
  } else {
    res.send([{"email": email, "classes": 'There was an error'}]);
  }
});

function updateTest(userEmail, className, marks, grades)   {
  collection.update({"email": userEmail}, {
    $push: {
      "classes": {
        "className": className,
        "marks": marks,
        "grades": grades
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
