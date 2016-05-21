import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'components/App';
import UpcomingGame from 'containers/UpcomingGame/UpcomingGame';
import Game from 'containers/Game/Game';
import Games from 'containers/Games/Games';
import Player from 'containers/Player/Player';
import Players from 'containers/Players/Players';
import NotFound from 'containers/NotFound/NotFound';

export default ([
  <Redirect from="/" to="upcoming-game" />,

  <Route path="/" component={App}>
    <Route path="upcoming-game" component={UpcomingGame('upcoming')} />
    <Route path="last-game" component={Game('last')} />
    <Route path="games">
      <IndexRoute component={Games} />
      <Route path="previous/:gameId" component={Game()} />
      <Route path="upcoming/:gameId" component={UpcomingGame()} />
    </Route>
    <Route path="players">
      <IndexRoute component={Players} />
      <Route path=":userId" component={Player} />
    </Route>
    <Route path="players" component={NotFound} />

    <Redirect from="*" to="404" />
  </Route>
]);
