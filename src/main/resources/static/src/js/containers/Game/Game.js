import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary, safeGet } from 'utils';
import { LoadableContent } from 'components/ui';
import { GameLineup, GameScore } from 'components/codeball';

export default function GenerateGame(constantGameId) {
  class Game extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      params: PropTypes.object.isRequired,
      currentUserData: PropTypes.object.isRequired,
      gameData: PropTypes.object.isRequired,
      pitchesData: PropTypes.object.isRequired,
      usersData: PropTypes.object.isRequired
    };

    componentWillMount = () => {
      this.updateData(this.props);
    };

    componentWillReceiveProps = (newProps) => {
      if (safeGet(newProps, 'params.gameId') !== safeGet(this.props, 'params.gameId')) {
        this.updateData(newProps);
      }
    };

    updateData = (props) => {
      const {
        actions,
        params,
        currentUserData,
        pitchesData,
        usersData
      } = props;

      actions.loadGame(constantGameId || params.gameId);
      refreshDataIfNecessary(currentUserData, actions.loadCurrentUser);
      refreshDataIfNecessary(pitchesData, actions.loadPitches);
      refreshDataIfNecessary(usersData, actions.loadUsers);
    };

    render () {
      const {
        currentUserData,
        gameData,
        pitchesData,
        usersData
      } = this.props;

      const { currentUser } = currentUserData;
      const { game } = gameData;
      const { pitches } = pitchesData;
      const { users } = usersData;
      const { pitchId } = game;
      const pitch = pitches[pitchId];
      const {
        date,
        time,
        teamA,
        teamAScore,
        teamB,
        teamBScore
      } = game;

      const isContentLoading = _.any([
        gameData.isLoading,
        pitchesData.isLoading,
        usersData.isLoading,
        currentUserData.isLoading
      ]);

      return (
        <LoadableContent isLoading={isContentLoading}>
          <section>
            <GameScore
              date={date}
              time={time}
              pitchId={pitch.id}
              pitchName={pitch.name}
              teamAScore={teamAScore}
              teamBScore={teamBScore} />

            <GameLineup
              teamA={teamA}
              teamB={teamB}
              currentUser={currentUser}
              users={users} />
          </section>
        </LoadableContent>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      currentUserData: state.currentUserData,
      gameData: state.gameData,
      pitchesData: state.pitchesData,
      usersData: state.usersData
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(CodeballActions, dispatch)
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Game);
}
