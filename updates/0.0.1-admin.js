var keystone = require('keystone'),
  User = keystone.list('User');

exports = module.exports = function (done) {
  new User.model({
    name: { first: 'Dan', last: 'Quinn' },
    email: 'danthemilk@gmail.com',
    password: 'admin', // Change after first update, duh
    canAccessKeystone: true
  }).save(done);
};