var passport = require('passport'),
  db = require('../config/dbschema');

exports.getUser = function (req, res) {
  res.send(JSON.stringify(req.user));
};

exports.getUsers = function (req, res) {
  db.userModel.find(function (err, users) {
    res.send(JSON.stringify(users));
    return;
  });
};

exports.postLogin = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.send(JSON.stringify(err), 400);
    }
    if (!user) {
      req.session.messages = [info.message];
      return res.send(JSON.stringify({msg: info.message}), 400);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.send(JSON.stringify({user: user}), 200);
    });
  })(req, res, next);
};

exports.postRegister = function (req, res, next) {
  var user = new db.userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      admin: true
    }),
    errors;

  req.assert('email', 'Invalid email').isEmail();
  errors = req.validationErrors();

  if (errors) {
    res.send(JSON.stringify(errors), 400);
    return;
  }

  db.userModel.find({username: user.username}, function (err, users) {
    if (users.length > 0) {
      res.send(JSON.stringify({msg: 'User already exists', param: 'username'}), 400);
      return;
    }
  });

  db.userModel.find({email: user.email}, function (err, users) {
    if (users.length > 0) {
      res.send(JSON.stringify({msg: 'Email already exists', param: 'email'}), 400);
      return;
    }
  });

  user.save(function (err) {
    if (err) {
      res.send(JSON.stringify(err), 400);
    } else {
      req.logIn(user, function (err) {
        if (err) {
          res.send(JSON.stringify(err));
        }
        res.send(JSON.stringify(user));
      });
    }
  });
};

exports.logout = function (req, res) {
  req.logout();
  // res.redirect('/');
};