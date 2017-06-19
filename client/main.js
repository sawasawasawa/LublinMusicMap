import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
  injectTapEventPlugin();
  render(<App />, document.getElementById('main-container'));
});