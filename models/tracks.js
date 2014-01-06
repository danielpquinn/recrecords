var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Track = new keystone.List('Track', {
  map: { name: 'title' }
});

Track.add({
  title: { type: String, required: true },
  artist: { type: Types.Relationship, ref: 'Artist', index: true },
  url: { type: Types.Url }
});

Track.relationship({ ref: 'Release', path: 'tracks' });

Track.register();