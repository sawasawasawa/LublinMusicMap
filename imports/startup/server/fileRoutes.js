import {Picker} from 'meteor/meteorhacks:picker'
const fs = require('fs')

Picker.route('/images/tmp/:filename', function (params, request, response, next) {
  const filename = params.filename
  // TODO this seems wrong
  var filePath = `${process.env.PWD}/${filename}`
  try {
    var data = fs.readFileSync(filePath)
    response.setHeader('Content-Type', 'image')
    response.statusCode = 200
    response.end(data)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found! filename:', params.filename)
    } else {
      console.log('batman: error', error)
      throw err
    }
  }
})
