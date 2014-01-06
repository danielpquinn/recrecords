var keystone = require('keystone');

exports = module.exports = function (req, res) {
  keystone.list('Release').model.find().populate('artist').sort('-publishedDate').exec(function (err, results) {
    res.json(results);
  });
};