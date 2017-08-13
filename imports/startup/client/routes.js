import React from 'react';
import { render } from 'react-dom';
import App from '../../ui/App.js';

Router.route('/', function() {
  render(<App />, document.getElementById('main-container'));
  this.next()
});

Router.route('/elo', {
  template: 'elo'
});
