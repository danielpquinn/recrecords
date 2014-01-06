var keystone = require('keystone');

exports = module.exports = function (req, res) {
  keystone.list('Release').model.findOne({ slug: req.params.slug }).populate('tracks artist').exec(function (err, results) {
    res.json(results);
  });
};