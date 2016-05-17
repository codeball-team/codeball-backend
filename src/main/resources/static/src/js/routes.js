import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'components/App';
import { Page } from 'components';
import UpcomingGame from 'containers/UpcomingGame/UpcomingGame';
import LastGame from 'containers/LastGame/LastGame';
import NotFound from 'containers/NotFound/NotFound';
import AjaxSpinner from 'containers/AjaxSpinner/AjaxSpinner';

function decorateComponent(Component) {
  return Page(
    AjaxSpinner,
    Component
  );
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={decorateComponent(UpcomingGame)} />
    <Route path="upcoming-game" component={decorateComponent(UpcomingGame)} />
    <Route path="last-game" component={decorateComponent(LastGame)} />
    <Route path="game-history" component={decorateComponent(NotFound)} />
    <Route path="list-of-players" component={decorateComponent(NotFound)} />
    <Redirect from="*" to="404" />
  </Route>
);
