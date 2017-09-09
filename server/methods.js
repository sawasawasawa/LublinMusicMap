import { Meteor } from 'meteor/meteor'
import fs from 'fs'

Meteor.methods({
  'uploadMp3File': function (fileName, fileData) {
    console.log('received file ', fileName, fileData.length)
    const filePath = `${process.env.PWD}/.images/tmp/${fileName}`
    fs.writeFile(filePath, new global.Buffer(fileData, 'binary'))
  }
})
