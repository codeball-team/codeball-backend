import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary } from 'utils';
import { MatchLineup, MatchScore } from 'components';
import './LastMatch.scss';

class LastMatch extends Component {
  static propTypes = {
    gameData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions,
      usersData
    } = this.props;

    refreshDataIfNecessary(usersData, actions.loadUsers);
    actions.loadGame(1);
  };

  render () {
    const {
      gameData,
      usersData
    } = this.props;

    const { game } = gameData;
    const { users } = usersData;

    const {
      date,
      time,
      pitch,
      teamA,
      teamAScore,
      teamB,
      teamBScore
    } = game;

    return (
      <section className="upcoming-match">
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
    );
  }
}

function mapStateToProps(state) {
  return {
    gameData: state.gameData,
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
)(LastMatch);
