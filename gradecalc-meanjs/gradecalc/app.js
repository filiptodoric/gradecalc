var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var db = require('./routes/dbCalls');
//var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);
var stormpath = require('express-stormpath');
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(stormpath.init(app, {
    // Optional configuration options.
    website: true,
    apiKeyFile: '5QLUXMAJEUKGZC91E75DWYNRV',//process.env['~/.stormpath/apiKey.properties'],
    //secretKey: 'some_random_long_string_here',
    application: 'https://api.stormpath.com/v1/applications/1W002o3Q6IY8ALWNqErkAI',
    web: {
        login: {
            enabled: true,
            nextUri: "/mygrades"
        },
        register: {
            autoAuthorize: true,
            autoLogin: true,
            nextUri: '/mygrades'
        }
    },
    expand: {
        customData: true,
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/users', users);
app.use('/', db);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
