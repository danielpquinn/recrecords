var keystone = require('keystone');

exports = module.exports = function (req, res) {
  keystone.list('Artist').model.findOne({ slug: req.params.slug }).exec(function (err, results) {
    res.json(results);
  });
};