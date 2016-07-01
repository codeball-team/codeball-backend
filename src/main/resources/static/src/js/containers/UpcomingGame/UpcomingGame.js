import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as codeballActions from 'actions';
import { refreshDataIfNecessary, renderConditionally, safeGet } from 'utils';
import { Pitch } from 'models';
import { ENROLLMENT_STATUS_YES } from 'constants/Configuration';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import IconShuffle from 'react-icons/lib/io/shuffle';
import { Button, LoadableContent } from 'components/ui';
import {
  GameEnrollmentSection,
  GameEnrollmentFormSection,
  GameInfoSection,
  GameLineupSection
} from 'components/sections';

export default function GenerateUpcomingGame(getGameId) {
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
      this.updateData({
        ...this.props,
        params: {
          ...this.props.params,
          gameId: getGameId(this.props)
        }
      });
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

      actions.gameLoad(params.gameId);
      refreshDataIfNecessary(usersData, actions.usersLoad);
      refreshDataIfNecessary(usersData, actions.currentUserLoad);
      refreshDataIfNecessary(pitchesData, actions.pitchesLoad);
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
        isGameOver,
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
                pitch={pitch}
                buttons={
                  [
                    renderConditionally({
                      when: !isEnrollmentOver,
                      render: () => (
                        <Button
                          key="close-enrollment"
                          onClick={() => actions.gameCloseEnrollment(gameId)}>
                          <IconSave className="icon" />
                          <span className="label">Close enrollment</span>
                        </Button>
                      )
                    }),
                    renderConditionally({
                      when: isEnrollmentOver && !isGameOver,
                      render: () => (
                        <Button
                          key="draw-teams"
                          onClick={() => actions.gameDrawTeams(gameId)}>
                          <IconShuffle className="icon" />
                          <span className="label">Draw teams</span>
                        </Button>
                      )
                    }),
                    renderConditionally({
                      when: isEnrollmentOver && !isGameOver,
                      render: () => (
                        <Button
                          key="end-game"
                          onClick={() => actions.gameEnd(gameId)}>
                          <IconSave className="icon" />
                          <span className="label">End game</span>
                        </Button>
                      )
                    })
                  ].filter(Boolean)
                } />

              {renderConditionally({
                when: !isEnrollmentOver,
                render: () => (
                  <GameEnrollmentFormSection
                    title="Are you going?"
                    value={selectedEnrollmentStatus}
                    onChange={enrollmentStatus => actions.gameChangeEnrollmentStatus(gameId, userId, enrollmentStatus)} />
                )
              })}

              {renderConditionally({
                when: isEnrollmentOver,
                render: () => (
                  <GameLineupSection
                    title="Lineups"
                    currentUser={currentUser}
                    users={users}
                    teamA={teamA}
                    teamB={teamB} />
                )
              })}

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
      actions: bindActionCreators(codeballActions, dispatch)
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpcomingGame);
}
