
/*
 * GET home page.
 */
var references = require('../references'),
bombManagement = require('../core/bombManagement'),
title = references.title,
UserDb = require('../models/user');

exports.index = function(req, res){
	var username = req.session.user.username,
	User = UserDb.User;

	User.findByUsername(username, function (err, users) {
		if (err) {
			console.log(err);
			res.error(500);
		}
		var user = users[0];

		if(user===undefined) {
			console.log('no user!');
			res.error(500);
		}

		bombManagement.bombsForUser(user, function () {
			res.render('index', { title: title, username: user.username, bombs: user.bombs });
		});	

	});
};