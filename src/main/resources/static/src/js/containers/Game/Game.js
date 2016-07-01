import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as codeballActions from 'actions';
import { refreshDataIfNecessary, safeGet } from 'utils';
import { LoadableContent } from 'components/ui';
import { GameLineupSection, GameScoreSection } from 'components/sections';

export default function GenerateGame(getGameId) {
  class Game extends Component {
    static propTypes = {
      actions: PropTypes.object.isRequired,
      params: PropTypes.object.isRequired,
      currentUserData: PropTypes.object.isRequired,
      gameData: PropTypes.object.isRequired,
      pitchesData: PropTypes.object.isRequired,
      usersData: PropTypes.object.isRequired
    };

    constructor(props, context) {
      super(props, context);
    }

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
        currentUserData,
        pitchesData,
        usersData
      } = props;

      actions.gameLoad(params.gameId);
      refreshDataIfNecessary(currentUserData, actions.currentUserLoad);
      refreshDataIfNecessary(pitchesData, actions.pitchesLoad);
      refreshDataIfNecessary(usersData, actions.usersLoad);
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
      const { game, isEditing, editedGame } = gameData;
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
                onEdit={actions.gameEdit}
                onCancel={actions.gameEditCancel}
                onSave={() => actions.gameSave(gameId, editedGame)}
                onEditGameScoreA={actions.gameEditScoreA}
                onEditGameScoreB={actions.gameEditScoreB} />

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
      actions: bindActionCreators(codeballActions, dispatch)
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Game);
}
