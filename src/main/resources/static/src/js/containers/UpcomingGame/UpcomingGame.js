import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { bindActionsAndConnect, refreshDataIfNecessary, renderConditionally, safeGet } from 'utils';
import { ENROLLMENT_STATUS_YES } from 'constants';
import { PitchModel } from 'models';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import IconShuffle from 'react-icons/lib/io/shuffle';
import { Button, LoadableContent } from 'components/ui';
import {
  GameEnrollmentSection, GameEnrollmentFormSection,
  GameInfoSection, GameLineupSection
} from 'components/sections';

export default function GenerateUpcomingGame(getGameId) {
  class UpcomingGame extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      currentUserData: PropTypes.object.isRequired,
      gameData: PropTypes.object.isRequired,
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

    updateData = props => {
      const {
        actions: {
          currentUserLoad,
          gameLoad,
          pitchesLoad,
          usersLoad
        },
        currentUserData,
        params: { gameId },
        pitchesData,
        usersData
      } = props;

      gameLoad(gameId);
      refreshDataIfNecessary(usersData, usersLoad);
      refreshDataIfNecessary(currentUserData, currentUserLoad);
      refreshDataIfNecessary(pitchesData, pitchesLoad);
    };

    render() {
      const {
        currentUserData: {
          currentUser,
          isLoading: isCurrentUserLoading
        },
        gameData: {
          game: {
            date,
            duration,
            enrolledUsers,
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
      const pitch = new PitchModel(pitches[pitchId]);
      const numberOfEnrolledPlayers = enrolledUsers[ENROLLMENT_STATUS_YES].length;
      const selectedEnrollmentStatus = _(enrolledUsers).reduce(
        (enrollmentStatus, userIds, status) => (userIds.includes(userId) ? status : enrollmentStatus),
        undefined
      );

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
                          onClick={this.onCloseEnrollment}>
                          <IconSave className="icon" />
                          <span className="label">Close enrollment</span>
                        </Button>
                      )
                    }),
                    renderConditionally({
                      when: isEnrollmentOver && !isGameOver,
                      render: () => [
                        <Button
                          key="draw-teams"
                          onClick={this.onDrawTeams}>
                          <IconShuffle className="icon" />
                          <span className="label">Draw teams</span>
                        </Button>,

                        <Button
                          key="end-game"
                          onClick={this.onEndGame}>
                          <IconSave className="icon" />
                          <span className="label">End game</span>
                        </Button>
                      ]
                    })
                  ].filter(Boolean)
                } />

              {renderConditionally({
                when: !isEnrollmentOver,
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
            </section>
          )} />
      );
    }
  }

  return bindActionsAndConnect(UpcomingGame, state => ({
    gameData: state.gameData,
    pitchesData: state.pitchesData,
    usersData: state.usersData,
    currentUserData: state.currentUserData
  }));
}
