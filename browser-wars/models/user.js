/*
 * User model
 */
var mongoose = require('mongoose'),
User = undefined;

exports.dbready = function () {
	var userSchema = mongoose.Schema({
		username: String
	});

	User = mongoose.model('User', userSchema);

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
};

var handleError = function (err) {
	console.log(err);
};

exports.User = User;