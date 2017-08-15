import { Meteor } from 'meteor/meteor';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../imports/startup/client/routes.js';

Meteor.startup(() => {
  injectTapEventPlugin();
});
