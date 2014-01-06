var keystone = require('keystone');

exports = module.exports = function (req, res) {
  keystone.list('Artist').model.find().exec(function (err, results) {
    res.json(results);
  });
};