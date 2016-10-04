import React, { Component, PropTypes } from 'react';
import {
  PERMISSION_ADD_GAME, PERMISSION_CLOSE_ENROLMENT, PERMISSION_DRAW_TEAMS,
  PERMISSION_END_GAME, PERMISSION_ENROLL, PERMISSION_ENROLL_ANOTHER_USER
} from 'constants';
import { upcomingGameContainerSelector } from 'selectors/containers';
import { EnrollAnotherUserModel } from 'models';
import { ContainerComponent } from 'components/base';
import { ButtonSave, ButtonShuffle } from 'components/ui';
import {
  GameEnrollAnotherUserFormSection, GameEnrollmentFormSection,
  GameEnrollmentSection, GameInfoSection, GameLineupSection
} from 'components/sections';
import { GameNotLoaded } from 'components/codeball';

export default function GenerateUpcomingGame(getGameId) {
  class UpcomingGame extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      currentUserId: PropTypes.number,
      enrollAnotherUser: PropTypes.object.isRequired,
      enrolledUsersPerStatus: PropTypes.array.isRequired,
      game: PropTypes.object.isRequired,
      gameId: PropTypes.number,
      hasGameLoaded: PropTypes.bool.isRequired,
      hasPermission: PropTypes.func.isRequired,
      isEnrollAnotherUserEditing: PropTypes.bool.isRequired,
      numberOfEnrolledUsers: PropTypes.number.isRequired,
      pitch: PropTypes.object.isRequired,
      selectedEnrollmentStatus: PropTypes.string,
      teamA: PropTypes.array.isRequired,
      teamB: PropTypes.array.isRequired,
      unenrolledUsers: PropTypes.array.isRequired
    };

    componentWillMount = () => {
      const { actions: { gameEnrollAnotherUserReset } } = this.props;
      gameEnrollAnotherUserReset();
    };

    onCloseEnrollment = () => {
      const { actions: { gameCloseEnrollment }, gameId } = this.props;
      gameCloseEnrollment(gameId);
    };

    onDrawTeams = () => {
      const { actions: { gameDrawTeams }, gameId } = this.props;
      gameDrawTeams(gameId);
    };

    onEndGame = () => {
      const { actions: { gameEnd }, gameId } = this.props;
      gameEnd(gameId);
    };

    onEnrollAnotherUserCancel = () => {
      const { actions: { gameEnrollAnotherUserCancel } } = this.props;
      gameEnrollAnotherUserCancel();
    };

    onEnrollAnotherUserEdit = () => {
      const { actions: { gameEnrollAnotherUserEdit } } = this.props;
      gameEnrollAnotherUserEdit();
    };

    onEnrollAnotherUserSubmit = () => {
      const {
        actions: { gameEnrollAnotherUserSubmit },
        enrollAnotherUser: { userId, enrollmentStatus },
        gameId
      } = this.props;
      gameEnrollAnotherUserSubmit(gameId, userId, enrollmentStatus);
    };

    onEnrollAnotherUserIdChange = userId => {
      const { actions: { gameEnrollAnotherUserChangeUserId } } = this.props;
      gameEnrollAnotherUserChangeUserId(userId);
    };

    onEnrollmentStatusChange = enrollmentStatus => {
      const { actions: { gameChangeEnrollmentStatus }, currentUserId, gameId } = this.props;
      gameChangeEnrollmentStatus(gameId, currentUserId, enrollmentStatus);
    };

    render() {
      const {
        hasPermission,
        enrollAnotherUser,
        enrolledUsersPerStatus,
        game,
        game: {
          isEnrollmentOver,
          isGameOver
        },
        hasGameLoaded,
        isEnrollAnotherUserEditing,
        numberOfEnrolledUsers,
        pitch,
        pitch: {
          name: pitchName
        },
        selectedEnrollmentStatus,
        teamA,
        teamB,
        unenrolledUsers
      } = this.props;

      return (
        <main>
          <GameNotLoaded
            renderWhen={!hasGameLoaded}
            canAddNew={hasPermission(PERMISSION_ADD_GAME)} />

          <GameInfoSection
            renderWhen={hasGameLoaded}
            title={pitchName}
            game={game}
            pitch={pitch}
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
            enrollmentStatus={selectedEnrollmentStatus}
            onChange={this.onEnrollmentStatusChange} />

          <GameEnrollAnotherUserFormSection
            renderWhen={[
              hasGameLoaded,
              !isEnrollmentOver,
              unenrolledUsers.length > 0,
              hasPermission(PERMISSION_ENROLL_ANOTHER_USER)
            ]}
            title="Enroll another player"
            canEdit={true}
            canSubmit={EnrollAnotherUserModel.isValid(enrollAnotherUser)}
            isEditable={true}
            isEditing={isEnrollAnotherUserEditing}
            enrollAnotherUser={enrollAnotherUser}
            users={unenrolledUsers}
            onEdit={this.onEnrollAnotherUserEdit}
            onCancel={this.onEnrollAnotherUserCancel}
            onSave={this.onEnrollAnotherUserSubmit}
            onUserIdChange={this.onEnrollAnotherUserIdChange} />

          <GameLineupSection
            renderWhen={[
              hasGameLoaded,
              isEnrollmentOver
            ]}
            title="Lineups"
            teamA={teamA}
            teamB={teamB} />

          <GameEnrollmentSection
            renderWhen={hasGameLoaded}
            title={`Enrolled players (${numberOfEnrolledUsers})`}
            enrolledUsersPerStatus={enrolledUsersPerStatus} />
        </main>
      );
    }
  }

  return ContainerComponent(UpcomingGame, {
    mapStateToProps: upcomingGameContainerSelector,
    periodicDataUpdates: true,
    updateData: ({ actions, ...props }) => {
      actions.currentUserLoad();
      actions.gameLoad(getGameId(props));
      actions.pitchesLoad();
      actions.usersLoad();
    }
  });
}
