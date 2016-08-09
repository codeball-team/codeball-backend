import React from 'react';
import { IndexRedirect, IndexRoute, Redirect, Route } from 'react-router';

import App from 'components/App';
import Game from 'containers/Game/Game';
import Games from 'containers/Games/Games';
import NewGame from 'containers/NewGame/NewGame';
import NewPitch from 'containers/NewPitch/NewPitch';
import NewPlayer from 'containers/NewPlayer/NewPlayer';
import NotFound from 'containers/NotFound/NotFound';
import Pitch from 'containers/Pitch/Pitch';
import Pitches from 'containers/Pitches/Pitches';
import Player from 'containers/Player/Player';
import Players from 'containers/Players/Players';
import Unauthorized from 'containers/Unauthorized/Unauthorized';
import UpcomingGame from 'containers/UpcomingGame/UpcomingGame';

export default (
  <Route key="app" path="/" component={App}>
    <IndexRedirect to="/upcoming-game" />
    <Route path="404" component={NotFound} />
    <Route path="upcoming-game" component={UpcomingGame(() => 'upcoming')} />
    <Route path="last-game" component={Game(() => 'last')} />
    <Route path="games">
      <IndexRoute component={Games} />
      <Route path="new" component={NewGame} />
      <Route path="previous/:gameId" component={Game(props => props.params.gameId)} />
      <Route path="upcoming/:gameId" component={UpcomingGame(props => props.params.gameId)} />
    </Route>
    <Route path="pitches">
      <IndexRoute component={Pitches} />
      <Route path="new" component={NewPitch} />
      <Route path=":pitchId" component={Pitch} />
    </Route>
    <Route path="players">
      <IndexRoute component={Players} />
      <Route path="new" component={NewPlayer} />
      <Route path=":userId" component={Player} />
    </Route>
    <Route path="players" component={NotFound} />
    <Route path="unauthorized" component={Unauthorized} />
    <Redirect from="*" to="/404" />
  </Route>
);
