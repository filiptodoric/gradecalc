var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');

router.get('/', function(req, res, next) {
    if (req.user == undefined) {
        res.render('../views/index');
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
    var newClassName = req.body.className;
    var newClass = {className: newClassName, grades: [], marks: []};
    if(req.user.customData.classes == undefined)    {
        req.user.customData.classes = [];
    }
    req.user.customData.classes.push(newClass);
    req.user.customData.save();
    res.sendStatus(200);
});

function loadUser(req, res)  {
    var userData = req.user.customData.classes;
    if (userData != null || userData != undefined) {
        var userData = req.user.customData.classes;
        res.send(userData);
    } else {
        res.status(200).send([]);
    }
}



module.exports = router;