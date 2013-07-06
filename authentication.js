/*
 * Authentication related methods
 */

exports.restrict = function (req, res, next) {
	if (req.session.user) {
		next();
	} else {
		req.session.error = 'Access denied';
		res.redirect('/login?returnUrl='+req.url);
	}
};

exports.logout = function (req, res) {
	req.session.destroy(function () {
		res.redirect('/login');
	});
};