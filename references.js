/*
 * Useful references
 */
var title = 'Browser Wars',
separator = ' - ',
titleSeparator = title + separator,
loginTitle = titleSeparator + 'Login',
maxBombs = 5,
minTime = 3000,
maxTime = 10000;

exports.title = title;
exports.loginTitle = loginTitle;
exports.maxBombs = maxBombs;
exports.minTime = minTime;
exports.maxTime = maxTime;

exports.generateBombTime = function () {
	var dateObj = Date.now();
	dateObj += Math.floor((Math.random()*maxTime)+minTime);
	dateObj = new Date(dateObj);
	return dateObj;
};

exports.bombsToCreate = function (bombSpace) {
	return Math.round((Math.random()*bombSpace)+0);
};