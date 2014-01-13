var keystone = require('keystone');

keystone.init({
  'name': 'Recreational Records',
  'favicon': 'public/favicon.ico',
  'less': 'public',
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