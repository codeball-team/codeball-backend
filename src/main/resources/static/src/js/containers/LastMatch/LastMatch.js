import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary } from 'utils';
import { LoadableContent, MatchLineup, MatchScore } from 'components';

class LastMatch extends Component {
  static propTypes = {
    gameData: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired,
    currentUserData: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions,
      usersData,
      currentUserData,
      pitchesData
    } = this.props;

    refreshDataIfNecessary(usersData, actions.loadUsers);
    refreshDataIfNecessary(usersData, actions.loadCurrentUser);
    refreshDataIfNecessary(pitchesData, actions.loadPitches);
    actions.loadGame('last');
  };

  render () {
    const {
      gameData,
      pitchesData,
      usersData
    } = this.props;

    const { game } = gameData;
    const { pitches } = pitchesData;
    const { users } = usersData;
    const {
      date,
      time,
      pitchId,
      teamA,
      teamAScore,
      teamB,
      teamBScore
    } = game;
    const pitch = pitches[pitchId];

    return (
      <LoadableContent
        isLoading={gameData.isLoading || usersData.isLoading || pitchesData.isLoading}>
        <section>
          <MatchScore
            pitchName={pitch.name}
            date={date}
            time={time}
            teamAScore={teamAScore}
            teamBScore={teamBScore} />

          <MatchLineup
            users={users}
            teamA={teamA}
            teamB={teamB} />
        </section>
      </LoadableContent>
    );
  }
}

function mapStateToProps(state) {
  return {
    gameData: state.gameData,
    pitchesData: state.pitchesData,
    usersData: state.usersData,
    currentUserData: state.currentUserData
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
)(LastMatch);
