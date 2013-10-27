var express = require('express'),
  app = express(),
  db = require('./config/dbschema'),
  pass = require('./config/pass'),
  passport = require('passport'),
  basicRoutes = require('./routes/basic'),
  userRoutes = require('./routes/user');

// Configure Express
app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'rec records ;)' }));
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Basic pages
app.get('/', basicRoutes.index);

// User pages
app.get('/account', pass.ensureAuthenticated, userRoutes.account);
app.get('/login', userRoutes.getLogin);
app.get('/register', userRoutes.getRegister);
app.post('/login', userRoutes.postLogin);
app.post('/register', userRoutes.postRegister);
app.get('/logout', userRoutes.logout);

app.listen(3000, function () {
  console.log('server listening on port 3000');
});
