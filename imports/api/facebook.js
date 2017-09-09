// TODO: sort it out
// import { Meteor } from 'meteor/meteor'
// import {Facebook, FacebookApiException} from 'fb'
//
// Meteor.methods({
//   'getEvents': function (placeId = 'sztosbistro') {
//     const options = {version: 'v2.9', appId: process.env.FB_APP_ID, appSecret: process.env.FB_SECRET}
//     const fb = new Facebook(options)
//
//     fb.api('oauth/access_token', {
//       grant_type: 'client_credentials',
//       ...options
//     }, function (res) {
//       if (!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error)
//         return
//       }
//
//       options.accessToken = res.access_token
//       console.log('accessToken', accessToken)
//     })
//
//     fb.api(placeId, { fields: ['id', 'name'] }, function (res) {
//       if (!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error)
//         return
//       }
//       console.log(res.id)
//       console.log(res.name)
//     })
//
//     return 'rabarbar'
//   }
// })
