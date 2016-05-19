import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary } from 'utils';
import { LoadableContent, Game as GameComponent } from 'components';

class Game extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    gameId: PropTypes.any,
    currentUserData: PropTypes.object.isRequired,
    gameData: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions,
      usersData,
      currentUserData,
      params,
      pitchesData
    } = this.props;

    if (params) {
      actions.loadGame(params.gameId);
    }

    refreshDataIfNecessary(currentUserData, actions.loadCurrentUser);
    refreshDataIfNecessary(usersData, actions.loadUsers);
    refreshDataIfNecessary(pitchesData, actions.loadPitches);
  };

  render () {
    const {
      currentUserData,
      gameData,
      pitchesData,
      usersData
    } = this.props;

    const { currentUser } = currentUserData;
    const { game } = gameData;
    const { pitches } = pitchesData;
    const { users } = usersData;
    const { pitchId } = game;
    const pitch = pitches[pitchId];

    const isContentLoading = _.any([
      gameData.isLoading,
      pitchesData.isLoading,
      usersData.isLoading,
      currentUserData.isLoading
    ]);

    return (
      <LoadableContent isLoading={isContentLoading}>
        <section>
          <GameComponent
            currentUser={currentUser}
            game={game}
            pitch={pitch}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
