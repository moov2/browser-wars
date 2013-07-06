/*
* Model definitions
*/
var User = require('./user');

exports.dbready = function () {
	User.dbready();
};