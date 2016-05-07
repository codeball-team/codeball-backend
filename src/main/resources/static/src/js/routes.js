import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'components/App';
import { Page } from 'components';
import UpcomingMatch from 'containers/UpcomingMatch/UpcomingMatch';
import NotFound from 'containers/NotFound/NotFound';
import AjaxSpinner from 'containers/AjaxSpinner/AjaxSpinner';

function decorateComponent(Component) {
  return Page(
    <AjaxSpinner />,
    Component
  );
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={decorateComponent(UpcomingMatch)} />
    <Route path="upcoming-match" component={decorateComponent(UpcomingMatch)} />
    <Route path="last-match" component={decorateComponent(NotFound)} />
    <Route path="match-history" component={decorateComponent(NotFound)} />
    <Route path="list-of-players" component={decorateComponent(NotFound)} />
    <Redirect from="*" to="404" />
  </Route>
);
