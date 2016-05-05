import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'components/App';
import { Page } from 'components';
import UpcomingMatch from 'containers/UpcomingMatch/UpcomingMatch';
import NotFound from 'containers/NotFound/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Page(UpcomingMatch)} />
    <Route path="upcoming-match" component={Page(UpcomingMatch)} />
    <Route path="match-history" component={Page(NotFound)} />
    <Route path="list-of-players" component={Page(NotFound)} />
    <Redirect from="*" to="404" />
  </Route>
);
