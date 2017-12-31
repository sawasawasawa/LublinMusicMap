import { Meteor } from 'meteor/meteor'

export const Places = new Mongo.Collection('places', {idGeneration: 'MONGO'})

if (Meteor.isServer) {
  Meteor.publish('places', function placesPublication () {
    // console.log('PUBLISHING places');
    return Places.find()
  })
}

Meteor.methods({
  'addPlace': function (placeObject) {
    // console.log("NEW PLACE: " + placeObject);
    const positionOccupied = Places.findOne({position: placeObject.position})

    if (!positionOccupied) {
      Places.insert(placeObject)
    } else {
      // console.log('place already exists');
      alert('Place already exists and is occupied by ' + positionOccupied.name +
        ', multiple places at one address are not supported yet')
      // TODO inform user of place not being added
    }
  }
})
