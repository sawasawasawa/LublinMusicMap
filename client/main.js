import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from '../imports/ui/App.js';
import { renderRoutes } from '../imports/startup/client/routes.js';


Meteor.startup(() => {
  injectTapEventPlugin();
  render(<App />, document.getElementById('main-container'));
  // render(renderRoutes(), document.getElementById('main-container'));
  // TODO why map is not working with render routes?
});