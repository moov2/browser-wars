/**
 * GET Login method
 */

 exports.login = function (req, res) {
 	res.render('login', { title: 'Browser Wars - Login' });
 };