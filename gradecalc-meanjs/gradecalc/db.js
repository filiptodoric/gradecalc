//Lets load the mongoose module in our program
var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/gradecalc');

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */
var Class = mongoose.model('Class', {className: String, marks: [{type: Number}], grades: [{type: Number}]});
var User = mongoose.model('User', {email: String, classes: [Class] });
/**
 * Lets Use our Models
 * */

//Lets create a new user
var class1 = new Class({className: 'TEST1234', marks: [72, 88, 63], grades: [30, 40, 30]});
var user1 = new User({email: 'stack@overflow.com', classes: [class1]});

//Some modifications in user object
//user1.name = user1.email.toUpperCase();

//Lets try to print and see it. You will see _id is assigned.
console.log("Bang: " + user1.classes.className);

//Lets save it
class1.save(function (err, classObj) {
  if (err) {
    console.log("CLASS This is the error: " + err);
  } else {
    console.log('CLASS saved successfully:', classObj);
  }
});

user1.save(function (err, userObj) {
  if (err) {
    console.log("USER This is the error: " + err);
  } else {
    console.log('USER saved successfully:', userObj);
  }
});
