import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO } from 'constants/Configuration';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary, safeGet } from 'utils';
import { LoadableContent }  from 'components/ui';
import { GameInfo, GameEnrollment, GameEnrollmentForm, GameLineup } from 'components/codeball';

export default function GenerateUpcomingGame(constantGameId) {
  class UpcomingGame extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      params: PropTypes.object.isRequired,
      gameData: PropTypes.object.isRequired,
      pitchesData: PropTypes.object.isRequired,
      usersData: PropTypes.object.isRequired,
      currentUserData: PropTypes.object.isRequired
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
      } = this.props;

      if (params) {
        actions.loadGame(constantGameId || params.gameId);
      }

      refreshDataIfNecessary(usersData, actions.loadUsers);
      refreshDataIfNecessary(usersData, actions.loadCurrentUser);
      refreshDataIfNecessary(pitchesData, actions.loadPitches);
    };

    render () {
      const {
        gameData,
        pitchesData,
        usersData,
        currentUserData,
        actions
      } = this.props;

      const { game } = gameData;
      const { pitches } = pitchesData;
      const { users } = usersData;
      const { currentUser } = currentUserData;
      const { id: userId } = currentUser;
      const {
        id: gameId,
        date,
        time,
        duration,
        pitchId,
        isEnrollmentOver,
        enrolledUsers,
        teamA,
        teamAScore,
        teamB,
        teamBScore
      } = game;
      const pitch = pitches[pitchId];

      const selectedEnrollmentStatus = _(enrolledUsers).reduce((selectedEnrollmentStatus, userIds, status) => {
        return _(userIds).contains(userId) ? status : selectedEnrollmentStatus;
      }, undefined);

      const isContentLoading = _([
        gameData.isLoading,
        usersData.isLoading,
        pitchesData.isLoading
      ]).any();

      return (
        <LoadableContent isLoading={isContentLoading}>
          <section>
            <GameInfo
              date={date}
              time={time}
              duration={duration}
              pitchName={pitch.name}
              pitchType={pitch.type}
              pitchAddress={pitch.address}
              pitchUrl={pitch.url}
              pitchMinNumberOfPlayers={pitch.minNumberOfPlayers}
              pitchMaxNumberOfPlayers={pitch.maxNumberOfPlayers} />

            {!isEnrollmentOver && (
              <GameEnrollmentForm
                value={selectedEnrollmentStatus}
                onChange={enrollmentStatus => actions.changeEnrollmentStatus(gameId, userId, enrollmentStatus)} />
            )}

            {isEnrollmentOver && (
              <GameLineup
                users={users}
                teamA={teamA}
                teamB={teamB} />
            )}

            <GameEnrollment
              users={users}
              enrolledUsers={enrolledUsers} />
          </section>
        </LoadableContent>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      gameData: state.gameData,
      pitchesData: state.pitchesData,
      usersData: state.usersData,
      currentUserData: state.currentUserData
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
  )(UpcomingGame);
}
