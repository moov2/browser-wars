
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , apiBombs = require('./routes/api/bombs')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , models = require('./models/models')
  , authentication = require('./authentication');

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
app.use(express.cookieParser('best cookie hash ever!'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  db.on('error', console.error.bind(console, 'db error:'));
}

app.get('/', authentication.restrict, routes.index);
app.get('/login', login.login);
app.post('/login', login.loginpost);

app.get('/logout', authentication.logout);


app.get('/api/bombs', authentication.restrict, apiBombs.list);
app.get('/api/bombs/new', authentication.restrict, apiBombs.newBombs);

db.once('open', models.dbready);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
