import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_GAME } from 'constants';
import { gamesSelector } from 'selectors/containers';
import { ContainerComponent } from 'components/base';
import { GamesListSection } from 'components/sections';
import { ButtonAddGame } from 'components/codeball';

const formatUpcomingGameUrl = id => `/games/upcoming/${id}`;
const formatPreviousGameUrl = id => `/games/previous/${id}`;

class Games extends Component {
  static propTypes = {
    hasPermission: PropTypes.func.isRequired,
    pitches: PropTypes.array.isRequired,
    previousGames: PropTypes.array.isRequired,
    upcomingGames: PropTypes.array.isRequired
  };

  render() {
    const {
      hasPermission,
      pitches,
      previousGames,
      upcomingGames
    } = this.props;

    return (
      <section>
        <GamesListSection
          className="upcoming-games"
          title={`Upcoming games (${upcomingGames.length})`}
          formatUrl={formatUpcomingGameUrl}
          games={upcomingGames}
          pitches={pitches}
          buttons={[
            <ButtonAddGame key="new" renderWhen={hasPermission(PERMISSION_ADD_GAME)} />
          ]} />

        <GamesListSection
          title={`Previous games (${previousGames.length})`}
          formatUrl={formatPreviousGameUrl}
          games={previousGames}
          pitches={pitches} />
      </section>
    );
  }
}

export default ContainerComponent(Games, {
  mapStateToProps: gamesSelector,
  updateData: ({ actions }) => {
    actions.gamesLoad();
    actions.pitchesLoad();
    actions.usersLoad();
  }
});
