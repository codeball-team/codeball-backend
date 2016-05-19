import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ENROLLMENT_STATUS_YES, ENROLLMENT_STATUS_MAYBE, ENROLLMENT_STATUS_NO } from 'constants/Configuration';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary } from 'utils';
import {
  LoadableContent, GameInfo, GameEnrollment, GameEnrollmentForm, GameLineup
} from 'components';

class UpcomingGame extends Component {
  static propTypes = {
    gameData: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired,
    currentUserData: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions,
      usersData,
      currentUserData,
      pitchesData
    } = this.props;

    refreshDataIfNecessary(usersData, actions.loadUsers);
    refreshDataIfNecessary(usersData, actions.loadCurrentUser);
    refreshDataIfNecessary(pitchesData, actions.loadPitches);
    actions.loadGame(1);
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

    const selectedEnrollmentStatus = _(enrolledUsers).reduce((selectedEnrollmentStatus, userIds, enrollmentStatus) => {
      return _(userIds).contains(userId) ? enrollmentStatus : selectedEnrollmentStatus;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingGame);
