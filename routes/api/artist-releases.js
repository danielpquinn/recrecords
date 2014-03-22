var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var page = parseInt(req.params.page) || 1,
    perPage = 9;

  var Artist = keystone.list('Artist');

  Artist.model.findOne({slug: req.params.slug})
    .exec(function (err, result) {
      keystone.list('Release').model
          .find({artist: result._id})
          .skip((page - 1) * perPage)
          .limit(perPage)
          .populate('artist genres')
          .sort('-publishedDate')
          .exec(function (err, results) {
            keystone.list('Release').model.find({artist: result._id})
            .count()
            .exec(function (err, count) {
              res.json({
                totalPages: Math.ceil(count / perPage),
                currentPage: page,
                releases: results
              });
            });
        });
    });
};
