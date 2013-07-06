/**
 * GET Login method
 */

 var UserDb = require('../models/user'),
 title = require('../references').loginTitle;

 exports.login = function (req, res) {
    res.render('login', { title: title });
 };

 exports.loginpost = function (req, res) {
    var User = UserDb.User;
    User.findOne({username: req.body.username}, function (err, user) {
        if (err !== null) {
            return loginError (res, 'Database Error: ' + err);
        }
        if (user === null) {
            return loginError(res, 'User doesn\'t exist!');
        }
        res.redirect('/');
    });
    
 };

 var loginError = function (res, error) {
    res.render('login', { title: title, error: error });
 };