
/*
 * GET home page.
 */
var references = require('../references'),
title = references.title,
maxBombs = references.maxBombs,
minTime = references.minTime,
maxTime = references.maxTime,
BombDb = require('../models/bomb'),
UserDb = require('../models/user');

exports.index = function(req, res){
	var username = req.session.user.username,
	User = UserDb.User;

	User.findByUsername(username, function (err, users) {
		if (err) {
			console.log(err);
			res.error(500);
		}
		var user = users[0],
		bombDiff = maxBombs - user.bombs.length;

		if (bombDiff > 0) {
			var Bomb = BombDb.Bomb,
			bombsToCreate = references.bombsToCreate(bombDiff);
			for (var i = bombsToCreate - 1; i >= 0; i--) {
				console.log(references.generateBombTime());
				var newBomb = new Bomb({ timeLeft: references.generateBombTime() });
				newBomb.save(function(err) { 
					if (err) {
						console.log('Error saving bomb: ' + err);
					}
				});
				user.bombs.push(newBomb);
			};
			user.save(function(err){
				if (err) {
					console.log('Error saving user: ' + err);
				}
			});
			res.render('index', { title: title, username: user.username, bombs: user.bombs });
		} else {
			res.render('index', { title: title, username: user.username, bombs: user.bombs });
		}

	});
};