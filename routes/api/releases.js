var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var page = parseInt(req.params.page) || 1,
    perPage = 10;

  keystone.list('Release').model
    .find()
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate('artist')
    .sort('-publishedDate')
    .exec(function (err, results) {
      keystone.list('Release').model.count().exec(function (err, count) {
        res.json({
          totalPages: Math.ceil(count / perPage),
          currentPage: page,
          releases: results
        });
      });
  });
};