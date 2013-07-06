/*
 * Useful references
 */
var title = 'Browser Wars',
separator = ' - ',
titleSeparator = title + separator,
loginTitle = titleSeparator + 'Login',
maxBombs = 5,
minTime = 3000,
maxTime = 60000;

exports.title = title;
exports.loginTitle = loginTitle;
exports.maxBombs = maxBombs;
exports.minTime = minTime;
exports.maxTime = maxTime;

exports.generateBombTime = function () {
	return Math.floor((Math.random()*maxTime)+minTime);
};

exports.bombsToCreate = function (bombSpace) {
	return Math.round((Math.random()*bombSpace)+0);
};