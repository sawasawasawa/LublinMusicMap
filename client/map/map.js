import React from 'react'
import { render } from 'react-dom'
import App from '../../imports/ui/App.js'
import './map.html'
import {Template} from 'meteor/templating'

Template.map.onRendered(() => {
  render(<App />, document.getElementById('main-container'))
})
