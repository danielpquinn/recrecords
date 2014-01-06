var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Genre = new keystone.List('Genre', {
  autokey: { from: 'name', path: 'key' }
});

Genre.add({
  name: { type: String, required: true }
});

Genre.relationship({ ref: 'Release', path: 'genres' });

Genre.addPattern('standard meta');
Genre.register();