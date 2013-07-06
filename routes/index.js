
/*
 * GET home page.
 */
var title = require('../references').title,
BombDb = require('../models/bomb');

exports.index = function(req, res){
	var Bomb = BombDb.Bomb;
	res.render('index', { title: title, username: req.session.user.username });
};