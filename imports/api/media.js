import { Meteor } from 'meteor/meteor';

export const Media = new Mongo.Collection('media');

if (Meteor.isServer) {
  Meteor.publish('media', function mediaPublication() {
    //console.log('PUBLISHING media');
    return Media.find();
  });
}

Meteor.methods({
  'addMedia': function (mediaObject) {
    //console.log("NEW MEDIA: " + mediaObject);
    Media.insert(mediaObject)
  }
})