import { Meteor } from 'meteor/meteor';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { renderRoutes } from '../imports/startup/client/routes.js';

Meteor.startup(() => {
  injectTapEventPlugin();
});