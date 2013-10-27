var passport = require('passport'),
  db = require('../config/dbschema');

exports.account = function (req, res) {
  res.render('account', { user: req.user });
};

exports.getLogin = function (req, res) {
  res.render('login', { user: req.user, message: req.session.messages });
};

exports.getRegister = function (req, res) {
  res.render('register', { user: req.user, message: req.session.messages });
};

exports.postLogin = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.session.messages = [info.message];
      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.postRegister = function (req, res, next) {
  var user = new db.userModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    admin: true
  });

  user.save(function (err) {
    if (err) {
      return next(err);
    } else {
      console.log(user.username + ' saved');
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    }
  });
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};