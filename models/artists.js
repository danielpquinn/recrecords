var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Artist = new keystone.List('Artist', {
  autokey: { path: 'slug', from: 'name', unique: true }
});

Artist.add({
  name: { type: String, required: true }
});

Artist.register();