import { Meteor } from 'meteor/meteor'

export const Media = new Mongo.Collection('media')

if (Meteor.isServer) {
  Meteor.publish('media', function mediaPublication () {
    return Media.find()
  })
}

Meteor.methods({
  'addMedia': function (mediaObject) {
    Media.insert(mediaObject)
  }
})
