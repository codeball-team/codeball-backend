import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'components/App';
import { Page } from 'components';
import UpcomingGame from 'containers/UpcomingGame/UpcomingGame';
import Game from 'containers/Game/Game';
import Games from 'containers/Games/Games';
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
    <Route path="games" component={decorateComponent(Games)} />
    <Route path="games/:gameId" component={decorateComponent(Game)} />
    <Route path="list-of-players" component={decorateComponent(NotFound)} />
    <Redirect from="*" to="404" />
  </Route>
);
