import React, { Component, PropTypes } from 'react';
import { _, findById, safeGet } from 'utils';
import {
  PERMISSION_ADD_GAME, PERMISSION_CLOSE_ENROLMENT, PERMISSION_DRAW_TEAMS,
  PERMISSION_END_GAME, PERMISSION_ENROLL, PERMISSION_ENROLL_ANOTHER_PLAYER,
  ENROLLMENT_STATUS_YES
} from 'constants';
import { EnrollUserModel, PitchModel } from 'models';
import { Container } from 'components/base';
import { ButtonSave, ButtonShuffle, LoadableContent } from 'components/ui';
import {
  GameEnrollmentSection, GameEnrollmentFormSection, GameEnrollPlayerFormSection,
  GameInfoSection, GameLineupSection
} from 'components/sections';
import { GameNotLoaded } from 'components/codeball';

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
      refreshDataIfNecessary: PropTypes.func.isRequired,
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
      const { actions: { gameEnrollUserChangeUserId } } = this.props;
      gameEnrollUserChangeUserId(userId);
    };

    updateData = props => {
      const {
        refreshDataIfNecessary,
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
          isLoading: isGameLoading,
          hasLoaded: hasGameLoaded
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
        <LoadableContent isLoading={isContentLoading}>
          <section>
            <GameNotLoaded
              renderWhen={!hasGameLoaded}
              canAddNewGame={hasPermission(PERMISSION_ADD_GAME)} />

            <GameInfoSection
              renderWhen={hasGameLoaded}
              title={pitchModel.name}
              date={date}
              time={time}
              duration={duration}
              pitch={pitchModel}
              buttons={[
                <ButtonSave
                  renderWhen={[
                    !isEnrollmentOver,
                    hasPermission(PERMISSION_CLOSE_ENROLMENT)
                  ]}
                  key="close-enrollment"
                  label="Close enrollment"
                  onClick={this.onCloseEnrollment} />,

                <ButtonShuffle
                  renderWhen={[
                    isEnrollmentOver,
                    !isGameOver,
                    hasPermission(PERMISSION_DRAW_TEAMS)
                  ]}
                  key="draw-teams"
                  label="Draw teams"
                  onClick={this.onDrawTeams} />,

                <ButtonSave
                  renderWhen={[
                    isEnrollmentOver,
                    !isGameOver,
                    hasPermission(PERMISSION_END_GAME)
                  ]}
                  key="end-game"
                  label="End game"
                  onClick={this.onEndGame} />
              ]} />

            <GameEnrollmentFormSection
              renderWhen={[
                hasGameLoaded,
                !isEnrollmentOver,
                hasPermission(PERMISSION_ENROLL)
              ]}
              title="Are you going?"
              value={selectedEnrollmentStatus}
              onChange={this.onEnrollmentStatusChange} />

            <GameLineupSection
              renderWhen={[
                hasGameLoaded,
                isEnrollmentOver
              ]}
              title="Lineups"
              currentUser={currentUser}
              users={users}
              teamA={teamA}
              teamB={teamB} />

            <GameEnrollmentSection
              renderWhen={hasGameLoaded}
              title={`Enrolled players (${numberOfEnrolledPlayers})`}
              users={users}
              enrolledUsers={enrolledUsers} />

            <GameEnrollPlayerFormSection
              renderWhen={[
                hasGameLoaded,
                !isEnrollmentOver,
                unenrolledUsers.length > 0,
                hasPermission(PERMISSION_ENROLL_ANOTHER_PLAYER)
              ]}
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
          </section>
        </LoadableContent>
      );
    }
  }

  return Container(UpcomingGame, state => ({
    currentUserData: state.currentUserData,
    enrollUser: state.enrollUser,
    gameData: state.gameData,
    pitchesData: state.pitchesData,
    usersData: state.usersData
  }));
}
