import { Meteor } from 'meteor/meteor';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
  Meteor.publish('events', function eventsPublication() {
    //console.log('PUBLISHING events');
    return Events.find();
  });
}

Meteor.methods({
  'addEvent': function (eventObject) {
    //console.log("NEW EVENT: " + eventObject);
    Events.insert(eventObject)
  }
})