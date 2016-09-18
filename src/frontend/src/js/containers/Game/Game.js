import React, { Component, PropTypes } from 'react';
import { PERMISSION_ADD_GAME, PERMISSION_EDIT_GAME_SCORE } from 'constants';
import { gameSelector } from 'selectors/containers';
import { ContainerComponent } from 'components/base';
import { GameLineupSection, GameScoreSection } from 'components/sections';
import { GameNotLoaded } from 'components/codeball';

export default function GenerateGame(getGameId) {
  class Game extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      game: PropTypes.object.isRequired,
      hasGameLoaded: PropTypes.bool.isRequired,
      hasPermission: PropTypes.func.isRequired,
      isGameEditing: PropTypes.bool.isRequired,
      pitch: PropTypes.object.isRequired,
      teamA: PropTypes.array.isRequired,
      teamB: PropTypes.array.isRequired
    };

    onSave = () => {
      const {
        actions: {
          gameSetScore
        },
        game: {
          id: gameId,
          teamAScore,
          teamBScore
        }
      } = this.props;

      gameSetScore(gameId, teamAScore, teamBScore);
    };

    render() {
      const {
        actions: {
          gameEdit,
          gameEditCancel,
          gameEditScoreA,
          gameEditScoreB
        },
        game,
        hasGameLoaded,
        hasPermission,
        isGameEditing,
        pitch,
        teamA,
        teamB
      } = this.props;

      return (
        <section>
          <GameNotLoaded
            renderWhen={!hasGameLoaded}
            canAddNew={hasPermission(PERMISSION_ADD_GAME)} />

          <GameScoreSection
            renderWhen={hasGameLoaded}
            title="Result"
            canEdit={hasPermission(PERMISSION_EDIT_GAME_SCORE)}
            isEditable={true}
            isEditing={isGameEditing}
            pitch={pitch}
            game={game}
            onEdit={gameEdit}
            onCancel={gameEditCancel}
            onSave={this.onSave}
            onEditGameScoreA={gameEditScoreA}
            onEditGameScoreB={gameEditScoreB} />

          <GameLineupSection
            renderWhen={hasGameLoaded}
            title="Lineups"
            teamA={teamA}
            teamB={teamB} />
        </section>
      );
    }
  }

  return ContainerComponent(Game, {
    mapStateToProps: gameSelector,
    periodicDataUpdates: true,
    updateData: ({ actions, ...props }) => {
      actions.currentUserLoad();
      actions.gameLoad(getGameId(props));
      actions.pitchesLoad();
      actions.usersLoad();
    }
  });
}
