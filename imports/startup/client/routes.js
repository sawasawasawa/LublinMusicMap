import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
// route components
import App from '../../ui/App.js';
const browserHistory = createBrowserHistory();
export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Route path="/" component={App}/>
      {/*<Route exact path="" component={App}/>*/}
      <Route path="lists/:id" component={App}/>
      {/*<Route path="signin" component={AuthPageSignIn}/>*/}
      {/*<Route path="join" component={AuthPageJoin}/>*/}
      {/*<Route path="*" component={NotFoundPage}/>*/}
    </div>
    </Router>
);