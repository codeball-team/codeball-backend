import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary } from 'utils';
import { LoadableContent }  from 'components/ui';
import { GamesList } from 'components/codeball';
import './Games.scss';

class Games extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    currentUserData: PropTypes.object.isRequired,
    gamesData: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions,
      currentUserData,
      gamesData,
      pitchesData,
      usersData
    } = this.props;

    actions.loadGames();
    refreshDataIfNecessary(currentUserData, actions.loadCurrentUser);
    refreshDataIfNecessary(pitchesData, actions.loadPitches);
    refreshDataIfNecessary(usersData, actions.loadUsers);
  };

  render () {
    const {
      currentUserData,
      gamesData,
      pitchesData,
      usersData
    } = this.props;

    const { currentUser } = currentUserData;
    const { games } = gamesData;
    const { pitches } = pitchesData;
    const { users } = usersData;

    const gamesListProps = {
      currentUser,
      pitches,
      users
    };
    const sortedGames = _(games).sortBy('date').reverse();
    const upcomingGames = _(sortedGames).filter(game => !game.isGameOver);
    const previousGames = _(sortedGames).filter(game => game.isGameOver);

    const isContentLoading = _.any([
      currentUserData.isLoading,
      gamesData.isLoading,
      pitchesData.isLoading,
      usersData.isLoading
    ]);

    return (
      <LoadableContent isLoading={isContentLoading}>
        <section className="games">
          {upcomingGames.length > 0 && (
            <GamesList
              className="upcoming-games"
              title="Upcoming games"
              formatUrl={id => `games/upcoming/${id}`}
              games={upcomingGames}
              {...gamesListProps} />
          )}

          {upcomingGames.length > 0 && (
            <GamesList
              title="Previous games"
              formatUrl={id => `games/previous/${id}`}
              games={previousGames}
              {...gamesListProps} />
          )}
        </section>
      </LoadableContent>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserData: state.currentUserData,
    gamesData: state.gamesData,
    pitchesData: state.pitchesData,
    usersData: state.usersData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CodeballActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
