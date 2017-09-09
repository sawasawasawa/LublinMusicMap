import React from 'react'
import { render } from 'react-dom'
import App from '../../imports/ui/App.js'
import './map.html'

Template.map.onRendered(() => {
  render(<App />, document.getElementById('main-container'))
})
