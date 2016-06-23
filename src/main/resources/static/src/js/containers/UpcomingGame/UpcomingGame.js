import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary, safeGet } from 'utils';
import { Pitch } from 'models';
import { ENROLLMENT_STATUS_YES } from 'constants/Configuration';
import { LoadableContent } from 'components/ui';
import {
  GameEnrollmentSection,
  GameEnrollmentFormSection,
  GameInfoSection,
  GameLineupSection
} from 'components/sections';

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
        pitchesData,
        usersData
      } = props;

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
        teamB
      } = game;
      const pitch = Pitch(pitches[pitchId]);

      const selectedEnrollmentStatus = _(enrolledUsers).reduce((selectedEnrollmentStatus, userIds, status) => {
        return _(userIds).contains(userId) ? status : selectedEnrollmentStatus;
      }, undefined);

      const numberOfEnrolledPlayers = enrolledUsers[ENROLLMENT_STATUS_YES].length;

      const isContentLoading = _([
        gameData.isLoading,
        usersData.isLoading,
        pitchesData.isLoading
      ]).any();

      return (
        <LoadableContent
          isLoading={isContentLoading}
          render={() => (
            <section>
              <GameInfoSection
                title={pitch.name}
                date={date}
                time={time}
                duration={duration}
                pitch={pitch} />

              {!isEnrollmentOver && (
                <GameEnrollmentFormSection
                  title="Are you going?"
                  value={selectedEnrollmentStatus}
                  onChange={enrollmentStatus => actions.changeEnrollmentStatus(gameId, userId, enrollmentStatus)} />
              )}

              {isEnrollmentOver && (
                <GameLineupSection
                  title="Lineups"
                  currentUser={currentUser}
                  users={users}
                  teamA={teamA}
                  teamB={teamB} />
              )}

              <GameEnrollmentSection
                title={`Enrolled players (${numberOfEnrolledPlayers})`}
                users={users}
                enrolledUsers={enrolledUsers} />
            </section>
          )} />
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
