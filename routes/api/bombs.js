/*
 * GET api/bombs method
 */

var UserDb = require('../../models/user');

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