import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect, refreshDataIfNecessary, safeGet } from 'utils';
import { LoadableContent } from 'components/ui';
import { GameLineupSection, GameScoreSection } from 'components/sections';

export default function GenerateGame(getGameId) {
  class Game extends Component {
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

    onSave = () => {
      const {
        actions: {
          gameSave
        },
        gameData: {
          editedGame,
          game: {
            id: gameId
          }
        }
      } = this.props;
      gameSave(gameId, editedGame);
    }

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
      refreshDataIfNecessary(currentUserData, currentUserLoad);
      refreshDataIfNecessary(pitchesData, pitchesLoad);
      refreshDataIfNecessary(usersData, usersLoad);
    };

    render() {
      const {
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
      const pitch = pitches[pitchId];

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
