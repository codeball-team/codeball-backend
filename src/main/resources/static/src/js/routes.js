import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'components/App';
import Codeball from 'containers/Codeball/Codeball';
import NotFound from 'containers/NotFound/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Codeball} />
    <Route path="404" component={NotFound} />
    <Redirect from="*" to="404" />
  </Route>
);
