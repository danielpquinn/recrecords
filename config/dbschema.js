var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

exports.mongoose = mongoose;

// Database connect
var mongoOptions = { db: {}};

mongoose.connect('mongodb://localhost/recrecords', mongoOptions, function (err, res) {
  if (err) {
    console.log('Error connecting to database');
  } else {
    console.log('Successfully connected to database');
  }
});

// Database schema
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// User schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  admin: { type: Boolean, required: true }
});

// Bcrypt middleware
userSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

var userModel = mongoose.model('User', userSchema);
exports.userModel = userModel;