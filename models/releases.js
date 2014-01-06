var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Release = new keystone.List('Release', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true }
});

Release.add({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  publishedDate: { type: Types.Date, index: true },
  image: { type: Types.Url },
  description: { type: Types.Html, wysiwyg: true, height: 150 },
  artist: { type: Types.Relationship, ref: 'Artist'},
  tracks: { type: Types.Relationship, ref: 'Track', many: true },
  genres: { type: Types.Relationship, ref: 'Genre', many: true }
});

Release.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Release.register();