/*
 * Bomb model
 */
var mongoose = require('mongoose');

exports.dbready = function () {
    var bombSchema = mongoose.Schema({
        timeLeft: Number,
        detonation: Date
    });

    var Bomb = mongoose.model('Bomb', bombSchema);

    exports.Bomb = Bomb;
};