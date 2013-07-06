/*
* Model definitions
*/
var User = require('./user'),
Bomb = require('./bomb');

exports.dbready = function () {
	User.dbready();
	Bomb.dbready();
};