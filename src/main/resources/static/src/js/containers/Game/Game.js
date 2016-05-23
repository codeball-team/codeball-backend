import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary, safeGet } from 'utils';
import { LoadableContent } from 'components/ui';
import { GameLineupSection, GameScoreSection } from 'components/sections';

export default function GenerateGame(constantGameId) {
  class Game extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      params: PropTypes.object.isRequired,
      currentUserData: PropTypes.object.isRequired,
      gameData: PropTypes.object.isRequired,
      pitchesData: PropTypes.object.isRequired,
      usersData: PropTypes.object.isRequired
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
        currentUserData,
        pitchesData,
        usersData
      } = props;

      actions.loadGame(constantGameId || params.gameId);
      refreshDataIfNecessary(currentUserData, actions.loadCurrentUser);
      refreshDataIfNecessary(pitchesData, actions.loadPitches);
      refreshDataIfNecessary(usersData, actions.loadUsers);
    };

    render () {
      const {
        actions,
        currentUserData,
        gameData,
        pitchesData,
        usersData
      } = this.props;

      const { currentUser } = currentUserData;
      const { game, isEditing: isEditingGame, editedGame } = gameData;
      const { pitches } = pitchesData;
      const { users } = usersData;
      const { pitchId } = game;
      const pitch = pitches[pitchId];
      const {
        id: gameId,
        teamA,
        teamB
      } = game;

      const isContentLoading = _.any([
        gameData.isLoading,
        pitchesData.isLoading,
        usersData.isLoading,
        currentUserData.isLoading
      ]);

      return (
        <LoadableContent isLoading={isContentLoading}>
          <section>
            <GameScoreSection
              title="Result"
              isEditable={true}
              isEditing={isEditingGame}
              pitch={pitch}
              game={isEditingGame ? _({}).defaults(editedGame, game) : game}
              onEdit={actions.editGame}
              onCancel={actions.cancelEditGame}
              onSave={() => actions.saveGame(gameId, editedGame)}
              onEditGameScoreA={actions.editGameScoreA}
              onEditGameScoreB={actions.editGameScoreB} />

            <GameLineupSection
              title="Lineups"
              teamA={teamA}
              teamB={teamB}
              currentUser={currentUser}
              users={users} />
          </section>
        </LoadableContent>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      currentUserData: state.currentUserData,
      gameData: state.gameData,
      pitchesData: state.pitchesData,
      usersData: state.usersData
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
  )(Game);
}
