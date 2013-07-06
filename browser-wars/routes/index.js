
/*
 * GET home page.
 */
var title = require('../references').title;

exports.index = function(req, res){
  res.render('index', { title: title, username: req.session.user.username });
};