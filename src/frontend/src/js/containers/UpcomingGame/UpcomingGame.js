import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import {
  bindActionsAndConnect, findById, refreshDataIfNecessary, renderConditionally, safeGet
} from 'utils';
import {
  PERMISSION_CLOSE_ENROLMENT, PERMISSION_DRAW_TEAMS, PERMISSION_END_GAME,
  PERMISSION_ENROLL, PERMISSION_ENROLL_ANOTHER_PLAYER, ENROLLMENT_STATUS_YES
} from 'constants';
import { EnrollUserModel, PitchModel } from 'models';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import IconShuffle from 'react-icons/lib/io/shuffle';
import { Button, LoadableContent } from 'components/ui';
import {
  GameEnrollmentSection, GameEnrollmentFormSection,
  GameEnrollPlayerFormSection, GameInfoSection, GameLineupSection
} from 'components/sections';

export default function GenerateUpcomingGame(getGameId) {
  class UpcomingGame extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      currentUserData: PropTypes.object.isRequired,
      enrollUser: PropTypes.object.isRequired,
      gameData: PropTypes.object.isRequired,
      hasPermission: PropTypes.func.isRequired,
      params: PropTypes.object.isRequired,
      pitchesData: PropTypes.object.isRequired,
      usersData: PropTypes.object.isRequired
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

    componentWillReceiveProps = newProps => {
      const gameIdPath = ['params', 'gameId'];
      if (safeGet(newProps, gameIdPath) !== safeGet(this.props, gameIdPath)) {
        this.updateData(newProps);
      }
    };

    onCloseEnrollment = () => {
      const {
        actions: { gameCloseEnrollment },
        gameData: { game: { id: gameId } }
      } = this.props;
      gameCloseEnrollment(gameId);
    };

    onDrawTeams = () => {
      const {
        actions: { gameDrawTeams },
        gameData: { game: { id: gameId } }
      } = this.props;
      gameDrawTeams(gameId);
    };

    onEndGame = () => {
      const {
        actions: { gameEnd },
        gameData: { game: { id: gameId } }
      } = this.props;
      gameEnd(gameId);
    };

    onEnrollmentStatusChange = enrollmentStatus => {
      const {
        actions: { gameChangeEnrollmentStatus },
        currentUserData: { currentUser: { id: userId } },
        gameData: { game: { id: gameId } }
      } = this.props;
      gameChangeEnrollmentStatus(gameId, userId, enrollmentStatus);
    };

    onEnrollUserSubmit = () => {
      const {
        actions: { gameEnrollUserSubmit },
        gameData: { game: { id: gameId } },
        enrollUser: { userId, enrollmentStatus }
      } = this.props;
      gameEnrollUserSubmit(gameId, userId, enrollmentStatus);
    };

    onEnrollUserIdChange = userId => {
      const {
        actions: { gameEnrollUserChangeUserId }
      } = this.props;
      gameEnrollUserChangeUserId(userId);
    };

    updateData = props => {
      const {
        actions: {
          currentUserLoad,
          gameEnrollUserReset,
          gameLoad,
          pitchesLoad,
          usersLoad
        },
        currentUserData,
        params: { gameId },
        pitchesData,
        usersData
      } = props;

      gameEnrollUserReset();
      gameLoad(gameId);
      refreshDataIfNecessary(usersData, usersLoad);
      refreshDataIfNecessary(currentUserData, currentUserLoad);
      refreshDataIfNecessary(pitchesData, pitchesLoad);
    };

    render() {
      const {
        actions: {
          gameEnrollUserCancel,
          gameEnrollUserEdit
        },
        hasPermission,
        currentUserData: {
          currentUser,
          isLoading: isCurrentUserLoading
        },
        enrollUser,
        gameData: {
          game: {
            date,
            duration,
            enrolledUsers,
            enrolledUsersIds,
            isEnrollmentOver,
            isGameOver,
            pitchId,
            teamA,
            teamB,
            time
          },
          isLoading: isGameLoading
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

      const { id: userId } = currentUser;
      const pitch = findById(pitches, pitchId);
      const pitchModel = new PitchModel(pitch);
      const numberOfEnrolledPlayers = enrolledUsers[ENROLLMENT_STATUS_YES].length;
      const selectedEnrollmentStatus = _(enrolledUsers).reduce(
        (enrollmentStatus, userIds, status) => (userIds.includes(userId) ? status : enrollmentStatus),
        undefined
      );
      const unenrolledUsers = _(users).values()
        .filter(({ id }) => !enrolledUsersIds.includes(id));
      const { isEditing: isEnrollUserEditing } = enrollUser;

      const isContentLoading = [
        arePitchesLoading,
        areUsersLoading,
        isCurrentUserLoading,
        isGameLoading
      ].some(Boolean);

      return (
        <LoadableContent
          isLoading={isContentLoading}
          render={() => (
            <section>
              <GameInfoSection
                title={pitchModel.name}
                date={date}
                time={time}
                duration={duration}
                pitch={pitchModel}
                buttons={
                  [
                    renderConditionally({
                      when: [
                        hasPermission(PERMISSION_CLOSE_ENROLMENT),
                        !isEnrollmentOver
                      ].every(Boolean),
                      render: () => (
                        <Button
                          key="close-enrollment"
                          onClick={this.onCloseEnrollment}>
                          <IconSave className="icon" />
                          <span className="label">Close enrollment</span>
                        </Button>
                      )
                    }),
                    renderConditionally({
                      when: isEnrollmentOver && !isGameOver,
                      render: () => [
                        renderConditionally({
                          when: hasPermission(PERMISSION_DRAW_TEAMS),
                          render: () => (
                            <Button
                              key="draw-teams"
                              onClick={this.onDrawTeams}>
                              <IconShuffle className="icon" />
                              <span className="label">Draw teams</span>
                            </Button>
                          )
                        }),

                        renderConditionally({
                          when: hasPermission(PERMISSION_END_GAME),
                          render: () => (
                            <Button
                              key="end-game"
                              onClick={this.onEndGame}>
                              <IconSave className="icon" />
                              <span className="label">End game</span>
                            </Button>
                          )
                        })
                      ].filter(Boolean)
                    })
                  ].filter(Boolean)
                } />

              {renderConditionally({
                when: [
                  hasPermission(PERMISSION_ENROLL),
                  !isEnrollmentOver
                ].every(Boolean),
                render: () => (
                  <GameEnrollmentFormSection
                    title="Are you going?"
                    value={selectedEnrollmentStatus}
                    onChange={this.onEnrollmentStatusChange} />
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

              {renderConditionally({
                when: hasPermission(PERMISSION_ENROLL_ANOTHER_PLAYER) && unenrolledUsers.length > 0,
                render: () => (
                  <GameEnrollPlayerFormSection
                    title="Enroll another player"
                    canEdit={true}
                    canSubmit={EnrollUserModel.isValid(enrollUser)}
                    isEditable={true}
                    isEditing={isEnrollUserEditing}
                    enrollUser={enrollUser}
                    users={unenrolledUsers}
                    onEdit={gameEnrollUserEdit}
                    onCancel={gameEnrollUserCancel}
                    onSave={this.onEnrollUserSubmit}
                    onUserIdChange={this.onEnrollUserIdChange} />
                )
              })}
            </section>
          )} />
      );
    }
  }

  return bindActionsAndConnect(UpcomingGame, state => ({
    currentUserData: state.currentUserData,
    enrollUser: state.enrollUser,
    gameData: state.gameData,
    pitchesData: state.pitchesData,
    usersData: state.usersData
  }));
}
