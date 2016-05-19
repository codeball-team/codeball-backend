import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'components/App';
import { Page } from 'components';
import UpcomingGame from 'containers/UpcomingGame/UpcomingGame';
import Game from 'containers/Game/Game';
import Games from 'containers/Games/Games';
import NotFound from 'containers/NotFound/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UpcomingGame} />
    <Route path="upcoming-game" component={UpcomingGame} />
    <Route path="games" component={Games} />
    <Route path="games/:gameId" component={Game} />
    <Route path="list-of-players" component={NotFound} />
    <Redirect from="*" to="404" />
  </Route>
);
