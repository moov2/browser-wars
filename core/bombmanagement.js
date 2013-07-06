/*
 * Contains methods related to bomb management
 */
var references = require('../references'),
maxBombs = references.maxBombs,
BombDb = require('../models/bomb');

exports.bombsForUser = function (user, cb) {
	var bombDiff = maxBombs - user.bombs.length;

	if (bombDiff < 1) {
		cb([]);
	} else {
		var Bomb = BombDb.Bomb,
		bombsToCreate = references.bombsToCreate(bombDiff),
		newBombs = [];
		for (var i = bombsToCreate - 1; i >= 0; i--) {
			console.log(references.generateBombTime());
			var newBomb = new Bomb({ timeLeft: references.generateBombTime() });
			newBomb.save(function(err) { 
				if (err) {
					console.log('Error saving bomb: ' + err);
				}
			});
			newBombs.push(newBomb);
			user.bombs.push(newBomb);
		};
		user.save(function(err){
			if (err) {
				console.log('Error saving user: ' + err);
			}
		});
		if (cb!==undefined) {
			cb(newBombs);
		}
	}
};