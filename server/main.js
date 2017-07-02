import { Meteor } from 'meteor/meteor';
import { Places } from '../imports/api/places';
import { Events } from '../imports/api/events';
import { Media } from '../imports/api/media';

Meteor.startup(() => {
  console.log('SERVER START ', new Date());
});
