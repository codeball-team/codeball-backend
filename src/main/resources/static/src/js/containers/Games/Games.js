import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary } from 'utils';
import { LoadableContent, GamesList } from 'components';

class Games extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    currentUserData: PropTypes.object.isRequired,
    gamesData: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions,
      currentUserData,
      gamesData,
      pitchesData,
      usersData
    } = this.props;

    refreshDataIfNecessary(currentUserData, actions.loadCurrentUser);
    refreshDataIfNecessary(gamesData, actions.loadGames);
    refreshDataIfNecessary(pitchesData, actions.loadPitches);
    refreshDataIfNecessary(usersData, actions.loadUsers);
  };

  render () {
    const {
      currentUserData,
      gamesData,
      pitchesData,
      usersData
    } = this.props;

    const { currentUser } = currentUserData;
    const { games } = gamesData;
    const { pitches } = pitchesData;
    const { users } = usersData;

    const isContentLoading = _.any([
      currentUserData.isLoading,
      gamesData.isLoading,
      pitchesData.isLoading,
      usersData.isLoading
    ]);

    return (
      <LoadableContent isLoading={isContentLoading}>
        <section>
          <GamesList
            currentUser={currentUser}
            games={games}
            pitches={pitches}
            users={users} />
        </section>
      </LoadableContent>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserData: state.currentUserData,
    gamesData: state.gamesData,
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
)(Games);
