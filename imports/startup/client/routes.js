import React from 'react';
import { render } from 'react-dom';
import App from '../../ui/App.js';

Router.route('/', () => {
  render(<App />, document.getElementById('main-container'));
});

Router.route('/elo', {
  template: 'elo'
});
