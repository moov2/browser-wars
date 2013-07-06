/*
 * User model
 */
var mongoose = require('mongoose');

exports.dbready = function () {
	var userSchema = mongoose.Schema({
		username: String
	});

	var User = mongoose.model('User', userSchema);

	User.findOne({username: 'admin'}).exec(function (err, admin) {
		if (err !== null) {
			return handleError(err);
		}
		if (admin === null) {
			console.log('Creating admin user.')
			var newAdmin = new User({username: 'admin'});
			newAdmin.save(function (err) {
				if (err !== null) {
					return handleError(err);
				}
			});
		}else{
			console.log('Admin user is already created.');
		}
	});

	exports.User = User;
};

var handleError = function (err) {
	console.log(err);
};