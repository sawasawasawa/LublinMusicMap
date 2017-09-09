/* eslint-disable */
import { Meteor } from 'meteor/meteor'
import { Places } from '../imports/api/places' // eslint disable-line
import { Events } from '../imports/api/events'
import { Media } from '../imports/api/media'
import '../imports/startup/server/register-api'
import '../imports/startup/server/fileRoutes'
/* eslint-enable */

Meteor.startup(() => {
  console.log('SERVER START ', new Date())
})
