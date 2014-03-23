var _ = require('underscore'),
  keystone = require('keystone');

/**
 * Initializes the standard view locals
 * Include anything that should be initialized before route controllers are executed.
 */
exports.initLocals = function (req, res, next) {

  var locals = res.locals;
  locals.user = req.user;
  locals.env = process.env.NODE_ENV;
  next();

};

/**
 * Initializes error handler functions into 'req'
 */
exports.initErrorHandlers = function (req, res, next) {

  res.err = function(err, title, message) {
    res.status(500).render('errors/500', {
      err: err,
      errorTitle: title,
      errorMsg: message
    });
  };

  res.notfound = function (err, title) {
    res.status(404).render('errors/404', {
      errorTitle: title
    });
  };

  next();

};

/**
 * Fetches and clears the flash messages before a view is rendered
 */
exports.flashMessages = function (req, res, next) {
  var flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  res.locals.messages = _.any(flashMessages, function (msgs) { return msgs.length }) ? flashMessages : false;

  next();
};