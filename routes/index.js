var keystone = require('keystone'),
  middleware = require('./middleware'),
  importRoutes = keystone.importer(__dirname);

// Common middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function (req, res, next) {
  res.notfound();
});

// Handle other errors
keystone.set('500', function (req, res, next) {
  var title, message;
  if (err instanceof Error) {
    message = err.message;
    err = err.stack;
  }
  res.err(err, title, message);
});

// Load Routes
var routes = {
  api: importRoutes('./api'),
  views: importRoutes('./views')
}

// Bind routes
exports = module.exports = function (app) {
  app.get('/api/tracks', routes.api.tracks);
  app.get('/api/artist/:slug', routes.api.artist);
  app.get('/api/artists', routes.api.artists);
  app.get('/api/release/:slug', routes.api.release);
  app.get('/api/releases/:page?*', routes.api.releases);
  app.get('*', routes.views.index);
}