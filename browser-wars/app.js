
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , login = require('./routes/login')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , models = require('./models/models');

var app = express();

mongoose.connect('localhost', 'browserwars');
var db = mongoose.connection;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  db.on('error', console.error.bind(console, 'connection error:'));
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', login.login);

db.once('open', models.dbready);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
