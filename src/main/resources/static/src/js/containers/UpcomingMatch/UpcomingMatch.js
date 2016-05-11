import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CodeballActions from 'actions/CodeballActions';
import { refreshDataIfNecessary } from 'utils';
import {
  LoadableContent, MatchInfo, MatchEnrollment, MatchEnrollmentForm, MatchLineup
} from 'components';

class UpcomingMatch extends Component {
  static propTypes = {
    gameData: PropTypes.object.isRequired,
    pitchesData: PropTypes.object.isRequired,
    usersData: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount = () => {
    const {
      actions,
      usersData
    } = this.props;

    refreshDataIfNecessary(usersData, actions.loadUsers);
    actions.loadGame('http://localhost:8080/api/games/2');
  };

  render () {
    const {
      gameData,
      pitchesData,
      usersData,
      actions
    } = this.props;

    const { game } = gameData;
    const { pitches } = pitchesData;
    const { users } = usersData;

    const {
      date,
      time,
      duration,
      pitchId,
      isEnrollmentOver,
      enrolledUsers,
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
          <MatchInfo
            date={date}
            time={time}
            duration={duration}
            pitchName={pitch.name}
            pitchType={pitch.type}
            pitchAddress={pitch.address}
            pitchUrl={pitch.url}
            pitchMinNumberOfPlayers={pitch.minNumberOfPlayers}
            pitchMaxNumberOfPlayers={pitch.maxNumberOfPlayers} />

          {!isEnrollmentOver && (
            <MatchEnrollmentForm />
          )}

          {isEnrollmentOver && (
            <MatchLineup
              users={users}
              teamA={teamA}
              teamB={teamB} />
          )}

          <MatchEnrollment
            users={users}
            enrolledUsers={enrolledUsers} />
        </section>
      </LoadableContent>
    );
  }
}

function mapStateToProps(state) {
  return {
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
)(UpcomingMatch);
