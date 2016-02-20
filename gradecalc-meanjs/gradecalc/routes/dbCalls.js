var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/gradecalc';
var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');


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
    if (req.user == undefined) {
        res.render('index');
    }
    else {
        res.redirect('/mygrades');
    }
});

router.get('/getUser', stormpath.loginRequired, function(req, res) {
    loadUser(req, res);
});

router.get('/mygrades', stormpath.loginRequired, function(req, res) {
    res.render('mygrades');
});

router.post('/savegrades', stormpath.loginRequired, function(req, res)  {
    var classIndex = req.body.classIndex;
    var grades = req.body.grades;
    var marks = req.body.marks;
    req.user.customData.classes[classIndex].grades = grades;
    req.user.customData.classes[classIndex].marks = marks;
    req.user.customData.save();
    res.sendStatus(200);
});

router.post('/addNewClass', stormpath.loginRequired, function(req, res)  {
    var className = req.body.className;
    var newClass = {className: className,
    grades: [],
    marks: []
    };
    req.user.customData.classes.push(newClass);
    req.user.customData.save();
    res.sendStatus(200);
});
function loadUser(req, res)  {
    var renderUser = function(err, userInfo) {
        if (err) {
            res.send([{"classes": 'There was an error here'}]);
        }
    }
    if (true) {
        var userData = req.user.customData.classes;
        res.send(userData);
    } else {
        res.send([{"classes": 'There was an error'}]);
    }
}

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