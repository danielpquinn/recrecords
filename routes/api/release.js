var keystone = require('keystone');
var Q = require('q');

exports = module.exports = function (req, res) {
  var artistGets = [];

  keystone.list('Release').model.findOne({ slug: req.params.slug }).populate('tracks artist genres').lean().exec(function (err, release) {
    release.tracks.forEach(function (track) {
      artistGets.push(keystone.list('Artist').model.findOne({ _id: track.artist }).exec());
    });
    Q.all(artistGets)
      .then(function (artists) {
        release.tracks.forEach(function (track, i) {
          track.artist = artists[i];
        });
        res.json(release);
      });
  });
};
