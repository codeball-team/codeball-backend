import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { refreshDataIfNecessary, sortByMany } from 'utils';
import * as codeballActions from 'actions';
import { Link } from 'react-router';
import IconAdd from 'react-icons/lib/io/plus';
import { Button, LoadableContent } from 'components/ui';
import { GamesListSection } from 'components/sections';

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
      actions: {
        currentUserLoad,
        gamesLoad,
        pitchesLoad,
        usersLoad
      },
      currentUserData,
      pitchesData,
      usersData
    } = this.props;

    gamesLoad();
    refreshDataIfNecessary(currentUserData, currentUserLoad);
    refreshDataIfNecessary(pitchesData, pitchesLoad);
    refreshDataIfNecessary(usersData, usersLoad);
  };

  render() {
    const {
      currentUserData: {
        currentUser,
        isLoading: isCurrentUserLoading
      },
      gamesData: {
        games,
        isLoading: areGamesLoading
      },
      pitchesData: {
        pitches,
        isLoading: arePitchesLoading
      },
      usersData: {
        users,
        isLoading: areUsersLoading
      }
    } = this.props;

    const gamesListProps = { currentUser, pitches, users };
    const sortedGames = sortByMany(_(games).values(), 'date').reverse();
    const upcomingGames = sortedGames.filter(game => !game.isGameOver);
    const previousGames = sortedGames.filter(game => game.isGameOver);

    const isContentLoading = [
      areGamesLoading,
      arePitchesLoading,
      areUsersLoading,
      isCurrentUserLoading
    ].some(Boolean);

    return (
      <LoadableContent
        isLoading={isContentLoading}
        render={() => (
          <section className="games">
            <GamesListSection
              className="upcoming-games"
              title={`Upcoming games (${upcomingGames.length})`}
              formatUrl={id => `/games/upcoming/${id}`}
              games={upcomingGames}
              buttons={[
                <Link key="new" to="/games/new">
                  <Button>
                    <IconAdd className="icon" />
                    <span className="label">Add</span>
                  </Button>
                </Link>
              ]}
              {...gamesListProps} />

            <GamesListSection
              title={`Previous games (${previousGames.length})`}
              formatUrl={id => `/games/previous/${id}`}
              games={previousGames}
              {...gamesListProps} />
          </section>
        )} />
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
    actions: bindActionCreators(codeballActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
