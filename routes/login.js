/**
 * GET Login method
 */

var UserDb = require('../models/user'),
title = require('../references').loginTitle;

exports.login = function (req, res) {
    if (req.session.user !== undefined) {
        res.redirect('/');
    } else {
        res.render('login', { title: title });
    }
};

/**
 * POST Login method
 */
exports.loginpost = function (req, res) {
    var User = userModel(),
    username = req.body.username;
    if (username === undefined || username === null || username.trim() === '') {
        return loginError(res, 'Username is required!');
    }
    User.findOne({username: username}, function (err, user) {
        if (err !== null) {
            return loginError (res, 'Database Error: ' + err);
        }
        if (user === null) {
            console.log('Creating user: ' +  username);
            user = createUser(username, function(err){
                return loginError (res, 'Error creating user: ' + err);
            });
        }
        console.log('Login: ' + username);
        req.session.user = user;
        if (req.query.returnUrl !== undefined) {
            res.redirect(req.query.returnUrl);
        } else {
            res.redirect('/');
        }
    });
};

var loginError = function (res, error) {
    res.render('login', { title: title, error: error });
};

var createUser = function (username, errHandle) {
    var User = userModel(),
    newUser = new User({ username: username});
    newUser.save(errHandle);
    return newUser;
};

var userModel = function () {
    return UserDb.User;
};