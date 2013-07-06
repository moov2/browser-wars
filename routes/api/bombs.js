/*
 * GET api/bombs method
 */

var UserDb = require('../../models/user'),
bombManagement = require('../../core/bombmanagement');

exports.list = function (req, res) {
	var username = req.session.user.username,
	User = UserDb.User;

	User.findByUsername(username, function (err, users) {
		if (err) {
			console.log(err);
			res.error(500);
		}
		var user = users[0];

		res.json(user.bombs);
	});
};

exports.newBombs = function (req, res) {
	var username = req.session.user.username,
	User = UserDb.User;

	User.findByUsername(username, function (err, users) {
		if (err) {
			console.log(err);
			res.error(500);
		}
		var user = users[0];

		bombManagement.bombsForUser(user, function (newBombs) {
			res.json(newBombs);
		});
	});
};