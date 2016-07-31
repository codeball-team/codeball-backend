import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect, findById, refreshDataIfNecessary, safeGet } from 'utils';
import { PERMISSION_EDIT_GAME_SCORE } from 'constants';
import { LoadableContent } from 'components/ui';
import { GameLineupSection, GameScoreSection } from 'components/sections';

export default function GenerateGame(getGameId) {
  class Game extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      currentUserData: PropTypes.object.isRequired,
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

    onSave = () => {
      const {
        actions: {
          gameSetScore
        },
        gameData: {
          editedGame: {
            teamAScore,
            teamBScore
          },
          game: {
            id: gameId
          }
        }
      } = this.props;
      gameSetScore(gameId, teamAScore, teamBScore);
    }

    updateData = props => {
      const {
        actions: {
          gameLoad,
          pitchesLoad,
          usersLoad
        },
        params: { gameId },
        pitchesData,
        usersData
      } = props;

      gameLoad(gameId);
      refreshDataIfNecessary(pitchesData, pitchesLoad);
      refreshDataIfNecessary(usersData, usersLoad);
    };

    render() {
      const {
        hasPermission,
        actions: {
          gameEdit,
          gameEditCancel,
          gameEditScoreA,
          gameEditScoreB
        },
        currentUserData: {
          currentUser,
          isLoading: isCurrentUserLoading
        },
        gameData: {
          editedGame,
          game,
          isEditing,
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

      const { pitchId, teamA, teamB } = game;
      const pitch = findById(pitches, pitchId);

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
              <GameScoreSection
                title="Result"
                canEdit={hasPermission(PERMISSION_EDIT_GAME_SCORE)}
                isEditable={true}
                isEditing={isEditing}
                pitch={pitch}
                game={isEditing ? Object.assign({}, game, editedGame) : game}
                onEdit={gameEdit}
                onCancel={gameEditCancel}
                onSave={this.onSave}
                onEditGameScoreA={gameEditScoreA}
                onEditGameScoreB={gameEditScoreB} />

              <GameLineupSection
                title="Lineups"
                teamA={teamA}
                teamB={teamB}
                currentUser={currentUser}
                users={users} />
            </section>
          )} />
      );
    }
  }

  return bindActionsAndConnect(Game, state => ({
    currentUserData: state.currentUserData,
    gameData: state.gameData,
    pitchesData: state.pitchesData,
    usersData: state.usersData
  }));
}
