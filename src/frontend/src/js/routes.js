import React from 'react';
import { IndexRedirect, IndexRoute, Redirect, Route } from 'react-router';

import App from 'components/App';
import Changelog from 'containers/Changelog/Changelog';
import Game from 'containers/Game/Game';
import Games from 'containers/Games/Games';
import NewGame from 'containers/NewGame/NewGame';
import NewPitch from 'containers/NewPitch/NewPitch';
import NewUser from 'containers/NewUser/NewUser';
import NotFound from 'containers/NotFound/NotFound';
import Pitch from 'containers/Pitch/Pitch';
import Pitches from 'containers/Pitches/Pitches';
import Unauthorized from 'containers/Unauthorized/Unauthorized';
import UpcomingGame from 'containers/UpcomingGame/UpcomingGame';
import User from 'containers/User/User';
import Users from 'containers/Users/Users';

export default (
  <Route key="app" path="/" component={App}>
    <IndexRedirect to="/upcoming-game" />
    <Route path="404" component={NotFound} />
    <Route path="changelog" component={Changelog} />
    <Route path="last-game" component={Game(() => 'last')} />
    <Route path="upcoming-game" component={UpcomingGame(() => 'upcoming')} />
    <Route path="games">
      <IndexRoute component={Games} />
      <Route path="new" component={NewGame} />
      <Route path="previous/:id" component={Game(getIdFromRoute)} />
      <Route path="upcoming/:id" component={UpcomingGame(getIdFromRoute)} />
    </Route>
    <Route path="pitches">
      <IndexRoute component={Pitches} />
      <Route path="new" component={NewPitch} />
      <Route path=":id" component={Pitch} />
    </Route>
    <Route path="players">
      <IndexRoute component={Users} />
      <Route path="new" component={NewUser} />
      <Route path=":id" component={User} />
    </Route>
    <Route path="players" component={NotFound} />
    <Route path="unauthorized" component={Unauthorized} />
    <Redirect from="*" to="/404" />
  </Route>
);

function getIdFromRoute(props) {
  return props.params.id;
}
