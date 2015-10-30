//Lets load the mongoose module in our program
var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/gradecalc');

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */
//var Class = mongoose.model('Class', {className: String, marks: [{type: Number}], grades: [{type: Number}]});
//var User = mongoose.model('User', {email: String, classes: [Class] });
/**
 * Lets Use our Models
 * */

var Schema = mongoose.Schema;
var Class = mongoose.model('Class', {className: String, marks: [{type: Number}], grades: [{type: Number}]});
var User = mongoose.model('User',{
   email: String,
   classes: [ {type: Schema.Types.ObjectID, ref: 'Class'}]
 });

 var Class1 = new Class({className: 'STAC1234', marks: [72, 88, 63], grades: [30, 40, 30]});

 Class1.save(function(err, classData) {
    var User1 = new User({email: 'me@overflow.com', classes: [class1]})
    User1.classes.push(classData._id);
    User1.save(function(err, userData) {
      if (err) {
        console.log("CLASS This is the error: " + err);
      } else {
        console.log('CLASS saved successfully:', userData);
      }
    })
 });
