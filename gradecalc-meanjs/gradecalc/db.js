//Lets load the mongoose module in our program
var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/gradecalc');

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */
var User = mongoose.model('User', {email: String, classes: Array});

/**
 * Lets Use our Models
 * */

//Lets create a new user
var user1 = new User({email: 'testemail@some.com', classes: ['COMP1000', 'WYMN1000']});

//Some modifications in user object
user1.name = user1.email.toUpperCase();

//Lets try to print and see it. You will see _id is assigned.
console.log("Bang: " + user1);

//Lets save it
user1.save(function (err, userObj) {
  if (err) {
    console.log(err);
  } else {
    console.log('saved successfully:', userObj);
  }
});
