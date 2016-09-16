import React, { Component, PropTypes } from 'react';
import {
  PERMISSION_ADD_GAME, PERMISSION_CLOSE_ENROLMENT, PERMISSION_DRAW_TEAMS,
  PERMISSION_END_GAME, PERMISSION_ENROLL, PERMISSION_ENROLL_ANOTHER_USER
} from 'constants';
import { upcomingGameSelector } from 'selectors/containers';
import { EnrollUserModel } from 'models';
import { ContainerComponent } from 'components/base';
import { ButtonSave, ButtonShuffle } from 'components/ui';
import {
  GameEnrollmentSection, GameEnrollUserFormSection, GameEnrollmentFormSection,
  GameInfoSection, GameLineupSection
} from 'components/sections';
import { GameNotLoaded } from 'components/codeball';

export default function GenerateUpcomingGame(getGameId) {
  class UpcomingGame extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      currentUserId: PropTypes.number,
      enrollUser: PropTypes.object.isRequired,
      game: PropTypes.object.isRequired,
      gameId: PropTypes.number,
      hasGameLoaded: PropTypes.bool.isRequired,
      hasPermission: PropTypes.func.isRequired,
      isEnrollUserEditing: PropTypes.bool.isRequired,
      numberOfEnrolledUsers: PropTypes.number.isRequired,
      pitch: PropTypes.object.isRequired,
      selectedEnrollmentStatus: PropTypes.string,
      teamA: PropTypes.array.isRequired,
      teamB: PropTypes.array.isRequired,
      unenrolledUsers: PropTypes.array.isRequired,
      users: PropTypes.array.isRequired
    };

    componentWillMount = () => {
      const { actions: { gameEnrollUserReset } } = this.props;
      gameEnrollUserReset();
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

    onEnrollmentStatusChange = enrollmentStatus => {
      const { actions: { gameChangeEnrollmentStatus }, currentUserId, gameId } = this.props;
      gameChangeEnrollmentStatus(gameId, currentUserId, enrollmentStatus);
    };

    onEnrollUserSubmit = () => {
      const {
        actions: { gameEnrollUserSubmit },
        gameId,
        enrollUser: { userId, enrollmentStatus }
      } = this.props;
      gameEnrollUserSubmit(gameId, userId, enrollmentStatus);
    };

    onEnrollUserIdChange = userId => {
      const { actions: { gameEnrollUserChangeUserId } } = this.props;
      gameEnrollUserChangeUserId(userId);
    };

    render() {
      const {
        hasPermission,
        actions: {
          gameEnrollUserCancel,
          gameEnrollUserEdit
        },
        enrollUser,
        game,
        game: {
          enrolledUsers,
          isEnrollmentOver,
          isGameOver
        },
        hasGameLoaded,
        isEnrollUserEditing,
        numberOfEnrolledUsers,
        pitch,
        pitch: {
          name: pitchName
        },
        selectedEnrollmentStatus,
        teamA,
        teamB,
        unenrolledUsers,
        users
      } = this.props;

      return (
        <section>
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
            value={selectedEnrollmentStatus}
            onChange={this.onEnrollmentStatusChange} />

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
            users={users}
            enrolledUsers={enrolledUsers} />

          <GameEnrollUserFormSection
            renderWhen={[
              hasGameLoaded,
              !isEnrollmentOver,
              unenrolledUsers.length > 0,
              hasPermission(PERMISSION_ENROLL_ANOTHER_USER)
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
      );
    }
  }

  return ContainerComponent(UpcomingGame, {
    mapStateToProps: upcomingGameSelector,
    updateData: ({ actions, ...props }) => {
      actions.currentUserLoad();
      actions.gameLoad(getGameId(props));
      actions.pitchesLoad();
      actions.usersLoad();
    }
  });
}
