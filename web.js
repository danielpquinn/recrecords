var keystone = require('keystone'),
  path = require('path');

keystone.init({
  'name': 'Recreational Records',
  'favicon': 'public/favicon.ico',
  'less': path.join(__dirname, 'public'),
  'static': 'public',
  'views': 'templates/views',
  'view engine': 'ejs',
  'auto update': true,
  'mongo': 'mongodb://localhost/recrecords',
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'chronicsinusinfectionz'
});

require('./models');
keystone.set('routes', require('./routes'));
keystone.start();